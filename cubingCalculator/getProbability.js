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


const SPECIAL_CATEGORY_MAX_1 = [
    "Decent Skill",
    "Increase invincibility time after being hit",
]

const SPECIAL_CATEGORY_MAX_2 = [
    "Ignore Enemy Defense %",
    "Boss Damage",
    "Item Drop Rate %",
    "Chance to ignore % damage when hit",
    "Chance of being invincible for seconds when hit",
]

// TODO(ming) add checking for lines that can impact probability of other lines
function isSpecialLine(category) {
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

    // some of the category labels:
    // "Increase invincibility time after being hit"
    // "Chance of being invincible for seconds when hit"
    // "Chance to ignore % damage when hit"
    return SPECIAL_CATEGORY_MAX_2.concat(SPECIAL_CATEGORY_MAX_1).includes(category);
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
// TODO(ming) account for special categories and their impact on rates for subsequent lines
function calculateRate(outcome, filteredRates) {
    const l1 = outcome[0][2];
    const l2 = outcome[1][2];
    const l3 = outcome[2][2];
    console.log("l1: ", outcome[0][0], "val=", outcome[0][1], "rate=", l1);
    console.log("l2: ", outcome[1][0], "val=", outcome[1][1], "rate=", l2);
    console.log("l3: ", outcome[2][0], "val=", outcome[2][1], "rate=", l3);
    const chance = outcome[0][2] / 100 * outcome[1][2] / 100 * outcome [2][2] / 100 *100;
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
    for (const line1 of filteredCubeData.first_line) {
        for (const line2 of filteredCubeData.second_line) {
            for (const line3 of filteredCubeData.third_line) {
                // check if this outcome meets our needs
                const outcome = [line1, line2, line3];
                if (checkRequirements(outcome, probabilityInput)) {
                    // calculate chance of this outcome occurring
                    console.log("=== Outcome ", total_count, "===")
                    total_chance += calculateRate(outcome, filteredCubeData);
                    count_useful++;
                }
                total_count++;
            }
        }
    }

    console.log("total chance: ", total_chance);
    console.log("outcomes matching requirements:", count_useful, "out of", total_count);
    return total_chance / 100;
}