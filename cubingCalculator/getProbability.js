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
}


function checkPercStat(outcome, requiredVal) {
    return (_getTotalVal("STR %", outcome) + _getTotalVal("All Stats %", outcome)) >= requiredVal;
    // return _getTotalVal("STR %", outcome) >= requiredVal;
}

function checkPercAllStat(outcome, requiredVal) {
    let actualVal = 0;
    for (const [category, val, _] in outcome) {
        if (category === "All Stats %") {
            actualVal += val;
        }
        else if (["STR %", "DEX %", "LUK %"].includes(category)) {
            actualVal += val / 3;
        }
    }
    return actualVal >= requiredVal;
}

function checkLineStat(outcome, requiredVal) {
    // console.log("Desired category=STR % with val=", requiredVal);
    // console.log("Actual categories are: [", outcome[0][0], ",", outcome[1][0], ",", outcome[2][0], "]");
    return (_getNumLines("STR %", outcome) + _getNumLines("All Stats %", outcome)) >= requiredVal;
    // return _getNumLines("STR %", outcome) >= requiredVal;
}

function checkLineAllStat(outcome, requiredVal) {
    return _getNumLines("All Stats %", outcome) >= requiredVal;
}

function checkPercHp(outcome, requiredVal) {
    return _getTotalVal("Max HP %", outcome) >= requiredVal;
}

function checkLineMesoOrDrop(outcome, requiredVal) {
    return (_getNumLines("Meso Amount %", outcome) + _getNumLines("Item Drop Rate %", outcome)) >= requiredVal;
}

function checkSecCooldown(outcome, requiredVal) {
    return _getTotalVal("Skill Cooldown Reduction", outcome) >= requiredVal;
}

function _getTotalVal(desiredCategory, outcome) {
    let actualVal = 0;
    for (const [category, val, _] of outcome) {
        // console.log("desiredCategory:", desiredCategory, "category:", category, "val:", val)
        if (category === desiredCategory) {
            actualVal += val;
        }
    }

    // console.log("calculating total val for: ", desiredCategory, "result is: ", actualVal);
    return actualVal;
}

function _getNumLines(desiredCategory, outcome) {
    let actualVal = 0;
    for (const [category, val, _] of outcome) {
        if (category === desiredCategory) {
            actualVal += 1;
        }
    }
    return actualVal;
}


const tierNumberToText = {
    3: "legendary",
    2: "unique",
    1: "epic",
    0: "rare",
}

async function getCubeLines(desiredTier, itemType, cubeType) {
    const rawData = await readCubingData(itemType, cubeType);
    const primeTextKey = tierNumberToText[desiredTier];
    const nonPrimeTextKey = tierNumberToText[desiredTier - 1];
    return [rawData[primeTextKey], rawData[nonPrimeTextKey]];
}


// TODO(ming) enforce consistency between these input options and what users are able to choose on the website
// make a single data structure/class to hold the values and the categories that meet them instead of keeping two separate objects
// we need to make sure this matches
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

const INPUT_FIELDS_FUNCTION_MAP = {
    "percStat": checkPercStat,
    "lineStat": checkLineStat,
    "percAllStat": checkPercAllStat,
    // "lineAllStat",
    // "percHp",
    // "lineHp",
    // "percAtt",
    // "lineAtt",
    // "percBoss",
    // "lineBoss",
    // "lineIed",
    // "lineCritDamage",
    // "lineMeso",
    // "lineDrop",
    // "lineMesoOrDrop",
    // "secCooldown",
}


function getUsefulCategories(probabilityInput) {
    let usefulCategories = [];
    for (const field in INPUT_CATEGORY_MAP) {
        if (probabilityInput[field] > 0) {
            usefulCategories = usefulCategories.concat(INPUT_CATEGORY_MAP[field]);
        }
    }
    return Array.from(new Set(usefulCategories));
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

// Note(ming) need to still keep around "special" lines which can impact the probability of 2nd or 3rd lines even
// if we don't want them
function getFilteredRates(desiredCategories, ratesList) {
    const filteredRates = [];
    let junk_rate = 0.0;

    for (const item of ratesList) {
        const [category, val, rate] = item;

        if (desiredCategories.includes(category) || isSpecialLine(category)) {
            filteredRates.push(item);
        }
        else {
            junk_rate += rate;
        }
    }

    filteredRates.push(["Junk", [], junk_rate]);
    return filteredRates;
}

// check if an outcome meets our needs
function checkRequirements(outcome, requirements) {
    for (const field in requirements) {
        if (requirements[field] > 0) {
            let result = INPUT_FIELDS_FUNCTION_MAP[field](outcome, requirements[field]);
            if (!result) {
                // console.log("doesn't meet requirements for desired field:", field, "with val of:", requirements[field]);
                return false;
            }
            // console.log("meets requirements for desired field:", field, "with val of:", requirements[field]);
            console.log("Meets desired category=STR % with val=", requirements[field]);
            console.log("categories are: [", outcome[0][0], ",", outcome[1][0], ",", outcome[2][0], "]");

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

function getProbability(desiredTier, probabilityInput, itemType, cubeType) {
    console.log("tier: ", desiredTier, "item: ", itemType, "cube: ", cubeType);
    const tier = tierNumberToText[desiredTier];

    const l1 = cubeRates.lvl120to200[itemType][cubeType][tier].first_line;
    const l2 = cubeRates.lvl120to200[itemType][cubeType][tier].second_line;
    const l3 = cubeRates.lvl120to200[itemType][cubeType][tier].third_line;
    console.log("first line", l1);
    console.log("second line", l2);
    console.log("third line", l3);

    // get the desired criteria
    const desiredLines = probabilityInput;
    console.log("desired lines", desiredLines);
    const usefulCategories = getUsefulCategories(desiredLines);
    console.log("useful categories", usefulCategories);

    // generate filtered rates list for first, second, third lines that we deem useful based on our input list
    // we still include any "special" lines that affect rates of subsequent lines even if we don't want them
    // anything else is not useful nor affect calculations, so they all get lumped into a single junk entry
    const filteredRates = [];
    filteredRates.push(getFilteredRates(usefulCategories, l1));
    filteredRates.push(getFilteredRates(usefulCategories, l2));
    filteredRates.push(getFilteredRates(usefulCategories, l3));
    console.log("filtered rates: ", filteredRates);

    // loop through all possible permutations using these filtered rates lists
    let total_chance = 0;
    let total_count = 1;
    let count_useful = 0;
    for (const line1 of filteredRates[0]) {
        for (const line2 of filteredRates[1]) {
            for (const line3 of filteredRates[2]) {
                // check if this outcome meets our needs
                const outcome = [line1, line2, line3];
                if (checkRequirements(outcome, desiredLines)) {
                    // calculate chance of this outcome occurring
                    console.log("=== Outcome ", total_count, "===")
                    total_chance += calculateRate(outcome, filteredRates);
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