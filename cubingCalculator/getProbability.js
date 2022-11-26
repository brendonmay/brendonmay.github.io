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
    lineAttOrBoss: 0,
    lineAttOrBossOrIed: 0,
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

// type of calculation can be total number of lines or a value sum (e.g. stat %, seconds of CDR)
const CALC_TYPE = {
    LINE: 0,
    VAL: 1,
}

// mapping between an input requirement and a function for checking if it has been satisfied by the specified "outcome"
// where "outcome" refers to the 3 lines of potential rolled
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
    let junk_categories = []  // list of categories we lumped into Junk for debugging purposes

    for (const item of ratesList) {
        const [category, val, rate] = item;

        if (usefulCategories.includes(category) || isSpecialLine(category)) {
            filteredRates.push(item);
        }
        else if (category === "Junk") {
            // using concat here since "Junk" is already a category that exists in the json data.
            // we're expanding it here with additional "contextual junk" based on the user input, so we want to preserve
            // the old list of junk categories too
            junk_rate += rate;
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

// check if an outcome meets our requirements (from input)
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

// Mapping of "special" categories and the maximum occurrence they can have per item.
// we can only have max of 2 of these lines:
// * IED
// * chance to ignore % damage
// * drop rate
// * boss damage
// * invincible for a short period of time with a certain probability when attacked
//
// we can only have 1 of these lines:
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

// calculate the adjusted rate for a line in the outcome based on previous special lines, current pool of possibilities
function getAdjustedRate(currentLine, previousLines, currentPool){
    const current_rate = currentLine[2];

    // the first line will never have its rates adjusted
    if (previousLines.length === 0) {
        return current_rate;
    }

    // special categories that we've reached the limit on in previous lines, so need to be removed from current pool
    let to_be_removed = [];

    // populate map of special lines and their count
    // if any of them exceed the max allowed count, exit early with rate of 0 as this outcome is not possible
    let special_lines_count = {};
    for (const [cat, val, rate] of [...previousLines, currentLine]) {
        if (isSpecialLine(cat)) {
            if (!((Object.keys(special_lines_count)).includes(cat))) {
                special_lines_count[cat] = 0;
            }
            special_lines_count[cat] += 1;

            if (special_lines_count[cat] > MAX_CATEGORY_COUNT[cat]) {
                return 0;
            }
            else if (special_lines_count[cat] === MAX_CATEGORY_COUNT[cat]) {
                to_be_removed.push(cat);
            }
        }
    }

    let adjusted_total = 100;
    for (const [cat, val, rate] of currentPool) {
        if (to_be_removed.includes(cat)) {
            adjusted_total -= rate;
        }
    }

    return current_rate/adjusted_total * 100;
}

// calculate chance for an outcome to occur (the set of potential lines resulting from a cube roll)
// obtained by multiplying of the rates of the item rolled on the 1st, 2nd, and 3rd line with each other
// Note(ming) rates of lines 2 and 3 may need to be adjusted if there are "special" lines are rolled prior
function calculateRate(outcome, filteredRates) {
    console.log("original outcome", outcome);
    console.log(`[${outcome[0][0]}, ${outcome[1][0]}, ${outcome[2][0]}]`);

    // a version of outcome with rates adjusted for lines 2 and 3 if applicable
    const adjustedOutcome = [
        getAdjustedRate(outcome[0], [], filteredRates.first_line),
        getAdjustedRate(outcome[1], [outcome[0]], filteredRates.second_line),
        getAdjustedRate(outcome[2], [outcome[0], outcome[1]], filteredRates.third_line),
    ]

    console.log("final adjustedOutcome", adjustedOutcome);

    let chance = 100;
    for (const rate of adjustedOutcome) {
        chance = chance * (rate / 100);
    }

    console.log("chance =", chance);
    return chance;
}



// functions to convert UI input to corresponding labels used in the json data for easier reference
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

// calculates the probability of achieving the set of desired criteria specified by user input
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
                    total_chance += result;

                    if (result === 0) {
                        count_invalid++;
                    }
                    else {
                        count_useful++;
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