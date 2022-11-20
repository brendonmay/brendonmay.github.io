// Note(sethyboy0) This file contains the function that calculates the chance of getting the desired input. It also
// contains the functions that read the scraped options from the json files.

// These are all the possible kinds of input the probability calculator can look for.
export const emptyInputObject = {
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

// Note(sethyboy0) This is the function that causes everything to be async because it uses fetch. To not use async, we'd
// need to split runCalculator into 2 parts and call the second part in fetch's .then();
// The other option is to generate a file when generating the jsons that imports all of the data and contains a function
// to get the data you need for the itemType and cubeType.
export async function readCubingData(itemType, cubeType) {
    const data = await fetch(`./cubing_data_scraper/data/cubing_data/${itemType}/${cubeType}_cube.json`);
    return data.json();
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

export async function getProbability(desiredTier, probabilityInput, itemType, cubeType) {
    const [primeLines, nonPrimeLines] = await getCubeLines(desiredTier, itemType, cubeType);
}