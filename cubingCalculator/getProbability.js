// Note(sethyboy0) This file contains the function that calculates the chance of getting the desired input. It also
// contains the functions that read the scraped options from the json files.

// These are all the possible kinds of input the probability calculator can look for.
const emptyInputObject = {
    percStat: 0, // At least this much % stat including % allstat lines.
    lineStat: 0, // At least this many lines of % stat including allstat lines.
    percAllStat: 0, // At least this much % all stat including 1/3rd of % STR, DEX, and LUK. For Xenons.
    lineAllStat: 0, // At least this many lines of % all stat (does not include
    percHp: 0, // At least this much % HP. For DA.
    lineHp: 0, // At least this many lines of % HP. For DA.
    percAtt: 0,// At least this much % atk.
    lineAtt: 0, // At least this many lines of % atk.
    percBoss: 0,
    lineBoss: 0,
    lineIed: 0,
    lineCritDamage: 0,
    lineMeso: 0,
    lineDrop: 0,
    lineMesoOrDrop: 0, // At least this many lines of meso OR drop.
    secCooldown: 0, // At least this many seconds of cooldown reduction.
    lineAutoSteal: 0,
}

// mapping for desired lines from submission form to categories in json data that contribute to a match
// using STR % to represent stat % for STR, LUK, INT, DEX since they all have the same rates
// using ATT % to represent both ATT and MATT % for the same reason
// Assumptions used in calculations:
// - All Stats % counts as 1 line of stat %
// - STR, DEX or LUK % each count as 1/3 All Stats %
const INPUT_CATEGORY_MAP = {
    percStat:["STR %", "All Stats %"],
    lineStat:["STR %", "All Stats %"],
    percAllStat:["All Stats %", "STR %", "DEX %", "LUK %"],
    lineAllStat:["All Stats %"],
    percHp:["Max HP %"],
    lineHp:["Max HP %"],
    percAtt:["ATT %"],
    lineAtt:["ATT %"],
    percBoss:["Boss Damage"],
    lineBoss:["Boss Damage"],
    lineIed:["Ignore Enemy Defense %"],
    lineCritDamage:["Critical Damage %"],
    lineMeso:["Meso Amount %"],
    lineDrop:["Item Drop Rate %"],
    lineMesoOrDrop:["Item Drop Rate %", "Meso Amount %"],
    secCooldown:["Skill Cooldown Reduction"],
}

// type of calculation can be total number of lines or a value sum (e.g. stat percent, CDR)
const CALC_TYPE = {
    LINE: 0,
    VAL: 1,
}

// mapping between an input requirement and a function for checking if it has been satisfied by the specified "outcome"
// where "outcome" refers to 3 lines of potential that could be rolled
const OUTCOME_MATCH_FUNCTION_MAP = {
    percStat: (outcome, requiredVal) => (_calculateTotal(outcome, "STR %", CALC_TYPE.VAL)
        + _calculateTotal(outcome, "All Stats %", CALC_TYPE.VAL)) >= requiredVal,
    lineStat: (outcome, requiredVal) => (_calculateTotal(outcome, "STR %")
        + _calculateTotal(outcome, "All Stats %")) >= requiredVal,
    percAllStat: checkPercAllStat,
    lineAllStat: (outcome, requiredVal) => _calculateTotal(outcome, "All Stats %") >= requiredVal,
    percHp: (outcome, requiredVal) => _calculateTotal(outcome, "Max HP %", CALC_TYPE.VAL) >= requiredVal,
    lineHp: (outcome, requiredVal) => _calculateTotal(outcome, "Max HP %") >= requiredVal,
    percAtt: (outcome, requiredVal) => _calculateTotal(outcome, "ATT %", CALC_TYPE.VAL) >= requiredVal,
    lineAtt: (outcome, requiredVal) => _calculateTotal(outcome, "ATT %") >= requiredVal,
    percBoss: (outcome, requiredVal) => _calculateTotal(outcome, "Boss Damage", CALC_TYPE.VAL) >= requiredVal,
    lineBoss: (outcome, requiredVal) => _calculateTotal(outcome, "Boss Damage") >= requiredVal,
    lineIed: (outcome, requiredVal) => _calculateTotal(outcome, "Ignore Enemy Defense %") >= requiredVal,
    lineCritDamage: (outcome, requiredVal) => _calculateTotal(outcome, "Critical Damage %") >= requiredVal,
    lineMeso: (outcome, requiredVal) => _calculateTotal(outcome, "Meso Amount %") >= requiredVal,
    lineDrop: (outcome, requiredVal) => _calculateTotal(outcome, "Item Drop Rate %") >= requiredVal,
    lineMesoOrDrop: (outcome, requiredVal) => _calculateTotal(outcome, "Meso Amount %")
        + _calculateTotal(outcome, "Item Drop Rate %") >= requiredVal,
    secCooldown: (outcome, requiredVal) => _calculateTotal(outcome, "Skill Cooldown Reduction", CALC_TYPE.VAL) >= requiredVal,
}

// calculate total All Stats %
// where STR, DEX or LUK % each count as 1/3 All Stats %
function checkPercAllStat(outcome, requiredVal) {
    let actualVal = 0;
    for (const [category, val, _] of outcome) {
        if (category === "All Stats %") {
            actualVal += val;
        }
        else if (["STR %", "DEX %", "LUK %"].includes(category)) {
            actualVal += val / 3;
        }
    }
    return actualVal >= requiredVal;
}

// get the total number of lines or total value of a specific category in this outcome
// calcType: specifies whether we are calculating number of lines or total value (defaults to lines if not specified)
function _calculateTotal(outcome, desiredCategory, calcType=CALC_TYPE.LINE) {
    let actualVal = 0;
    for (const [category, val, _] of outcome) {
        if (category === desiredCategory) {
            if (calcType === CALC_TYPE.VAL) {
                actualVal += val;
            }
            else if (calcType === CALC_TYPE.LINE) {
                actualVal += 1;
            }
        }
    }
    return actualVal;
}

// category of lines that have a maximum limit on how many can appear on one item
// TODO(ming) add checking for lines that can impact probability of other lines
// can only have max of 2 of these lines
// * IED
// * chance to ignore % damage
// * drop rate
// * boss damage
// * invincible for a short period of time with a certain probability when attacked
//
// can only have 1 of these lines
// * any decent skill
// * increased invincibility time after being hit
//
// if we reach the maximum number of occurrences for a category, that category is excluded for the next line(s)
// quoting from Nexon's website:
// display probability / (100% - the sum of the display probabilities of the excluded options)
// reference: https://maplestory.nexon.com/Guide/OtherProbability/cube/strange
const MAX_CATEGORY_COUNT = {
    "Decent Skill": 1,
    "Increase invincibility time after being hit": 1,
    "Ignore Enemy Defense %": 2,
    "Boss Damage": 2,
    "Item Drop Rate %": 2,
    "Chance to ignore % damage when hit": 2,
    "Chance of being invincible for seconds when hit": 2,
}

const isSpecialLine = category => (Object.keys(MAX_CATEGORY_COUNT)).includes(category);

// generate a list of relevant categories based on the input
// this will be used to consolidate entries from the list of rates prior to generating all the possible outcomes to
// calculate
function getUsefulCategories(probabilityInput) {
    let usefulCategories = [];
    for (const field in INPUT_CATEGORY_MAP) {
        if (probabilityInput[field] > 0) {
            usefulCategories = usefulCategories.concat(INPUT_CATEGORY_MAP[field]);
        }
    }
    return Array.from(new Set(usefulCategories));
}

// consolidate number of entries in the rates list to only the lines we care about
// all other categories we don't care about get lumped into a single entry for junk lines
// Note(ming) need to still keep around "special" lines which can impact the probability of 2nd or 3rd lines even
// if we don't want them
function getFilteredRates(ratesList, usefulCategories) {
    const filteredRates = [];
    let junk_rate = 0.0;
    let junk_categories = []

    for (const item of ratesList) {
        const [category, val, rate] = item;

        if (usefulCategories.includes(category) || isSpecialLine(category)) {
            filteredRates.push(item);
        }
        else if (category === "Junk") {
            junk_rate += rate;
            console.log("junk val", val);
            junk_categories = junk_categories.concat(val);
        }
        else {
            junk_rate += rate;
            junk_categories.push(`${category} (${val})`);
        }
    }

    filteredRates.push(["Junk", junk_categories, junk_rate]);
    return filteredRates;
}

// check if an outcome meets our needs
function checkRequirements(outcome, requirements) {
    for (const field in requirements) {
        if (requirements[field] > 0) {
            if (!OUTCOME_MATCH_FUNCTION_MAP[field](outcome, requirements[field])) {
                return false;
            }
        }
    }
    return true;
}

// calculate chance for an outcome to occur
// result of multiplying the rate of the item rolled on the 1st, 2nd, and 3rd line with each other
// rates of lines 2 and 3 may need to be adjusted if there are "special" lines are rolled prior
// will return null for outcomes that are impossible to obtain due to the limit on number of times a line can appear
function calculateRate(outcome, filteredRates) {
    let adjustedOutcome = [];
    console.log("original outcome", outcome);
    console.log(`[${outcome[0][0]}, ${outcome[1][0]}, ${outcome[2][0]}]`);
    // first line never changes so add it as-is
    adjustedOutcome.push(outcome[0]);

    // match format of filtered rates to outcome (list of lists) to be able to reference the same line by index
    const filteredRatesList = [filteredRates.first_line, filteredRates.second_line, filteredRates.third_line];

    // add rates for lines 2 and 3 after any necessary adjustments
    let special_lines_count = {};
    for (let i=0; i<2; i++){
        const [cat, val, rate] = outcome[i];
        console.log("Checking line", i+1);
        if (cat !== "Junk") {
            console.log(`category=${cat}, rate=${rate}, val=${val}`);
        }
        else {
            console.log(`category=${cat}, rate=${rate}`);
        }

        // update count of any special lines we've encountered
        if (isSpecialLine(cat)) {
            if (!((Object.keys(special_lines_count)).includes(cat))) {
                special_lines_count[cat] = 0;
            }
            special_lines_count[cat] += 1;
        }

        // adjust the rate of the next element of this outcome if needed
        // return null if our outcome is not possible due to limits in max count
        const next_cat = outcome[i+1][0];
        const next_val = outcome[i+1][1];
        let next_rate = outcome[i+1][2];  // may be adjusted
        let adjusted_total = 100;  // sum of all the rates in the pool (will be reduced for each item removed)
        for (const special_cat of Object.keys(special_lines_count)) {
            if ((special_lines_count[special_cat] >= MAX_CATEGORY_COUNT[special_cat])) {

                if ((special_lines_count[special_cat] > MAX_CATEGORY_COUNT[special_cat]) || (next_cat === special_cat)){
                    // not possible as it exceeds the limit
                    console.log("outcome not possible, existing early")
                    return null;
                }

                // if we have reached the limit for any special lines, remove them from the pool of options for the next
                // line. subtract the rate of any removed options from the total.
                const next_rates = filteredRatesList[i+1];
                console.log(`at limit for category=${special_cat}`);
                console.log(`check current rates for next pool (line ${i+2})`, next_rates);
                for (const [nc, _, nr] of next_rates) {
                    if (nc === special_cat) {
                        console.log(`next pool contains ${special_cat} with rate=${nr}`);
                        adjusted_total -= nr;
                        console.log("adjusted total after deducting", adjusted_total);
                    }
                }
            }
        }

        next_rate = (next_rate/adjusted_total) * 100;
        adjustedOutcome.push([next_cat, next_val, next_rate]);
    }
    console.log("final adjustedOutcome", adjustedOutcome);

    let chance = 100;
    for (const [cat, val, rate] of adjustedOutcome) {
        chance = chance * (rate / 100);
    }

    console.log("chance =", chance);
    return chance;
}

const tierNumberToText = {
    3: "legendary",
    2: "unique",
    1: "epic",
    0: "rare",
}

function convertItemType(itemType) {
    // use ring for accessory option (cubeData lists rates per specific accessory so just use ring since they are all
    // the same)
    // Note(ming) KMS website does not have badge data. mapping badge to heart for now
    if (itemType === "accessory") {
        return "ring";
    }
    else if (itemType === "badge") {
        return "heart";
    }
    else {
        return itemType;
    }
}

function getProbability(desiredTier, probabilityInput, itemType, cubeType) {
    console.log(`tier=${desiredTier}, item=${itemType}, cube=${cubeType}`);
    console.log("probability input", probabilityInput);

    // convert parts of input for easier mapping to keys in cubeRates
    const tier = tierNumberToText[desiredTier];
    const itemLabel = convertItemType(itemType);

    // get the cubing data for this input criteria from cubeRates
    const cubeData = {
        first_line: cubeRates.lvl120to200[itemLabel][cubeType][tier].first_line,
        second_line: cubeRates.lvl120to200[itemLabel][cubeType][tier].second_line,
        third_line: cubeRates.lvl120to200[itemLabel][cubeType][tier].third_line,
    };
    console.log("cubeData", cubeData);

    // generate filtered version of cubing data that only contains lines relevant for our calculation
    const usefulCategories = getUsefulCategories(probabilityInput);
    console.log("usefulCategories", usefulCategories);
    const filteredCubeData = {
        first_line: getFilteredRates(cubeData.first_line, usefulCategories),
        second_line: getFilteredRates(cubeData.second_line, usefulCategories),
        third_line: getFilteredRates(cubeData.third_line, usefulCategories),
    };
    console.log("filteredCubeData", filteredCubeData);

    // loop through all possible outcomes and sum up the rate of outcomes that match the input
    let total_chance = 0;
    let total_count = 0;
    let count_useful = 0;
    let count_invalid = 0;
    for (const line1 of filteredCubeData.first_line) {
        for (const line2 of filteredCubeData.second_line) {
            for (const line3 of filteredCubeData.third_line) {
                // check if this outcome meets our needs
                const outcome = [line1, line2, line3];
                if (checkRequirements(outcome, probabilityInput)) {
                    // calculate chance of this outcome occurring
                    console.log("=== Outcome ", total_count, "===")
                    const result = calculateRate(outcome, filteredCubeData);
                    if (result !== null) {
                        total_chance += result;
                        count_useful++;
                    }
                    else {
                        count_invalid++;
                    }
                }
                total_count++;
            }
        }
    }

    console.log("total chance: ", total_chance);
    console.log("valid matching outcomes", count_useful);
    console.log("invalid matching outcomes", count_invalid);
    console.log("total outcomes", total_count);
    return total_chance / 100;
}