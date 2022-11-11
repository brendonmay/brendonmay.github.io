// Functions and constants relating to the different cubes.

function getCubeCost(cubeType) {
    switch (cubeType) {
        case "red":
            return 12000000;
        case "black":
            return 22000000;
        case "master":
            return 7500000;
        default:
            return 0;
    }
}

function getRevealCostConstant(itemLevel) {
    if (itemLevel < 30) { return 0; }
    if (itemLevel <= 70) { return 0.5; }
    if (itemLevel <= 120) { return 2.5; }
    return 20;
}

export function cubingCost(cubeType, itemLevel, totalCubeCount) {
    const cubeCost = getCubeCost(cubeType);
    const revealCostConst = getRevealCostConstant(itemLevel);
    const revealPotentialCost = revealCostConst * itemLevel ** 2
    return cubeCost * totalCubeCount + totalCubeCount * revealPotentialCost
}

// Nexon rates: https://maplestory.nexon.com/Guide/OtherProbability/cube/strange
// GMS community calculated rates: https://docs.google.com/spreadsheets/d/1od_hep5Y6x2ljfrh4M8zj5RwlpgYDRn5uTymx4iLPyw/pubhtml#
// Nexon rates used when they match close enough to ours.
export const tier_rates = {
    "occult": {
        0: 0.009901
    },
    // Community rates are notably higher than nexon rates here. Assuming GMS is different and using those instead.
    "master": {
        0: 0.1184,
        1: 0.0381
    },
    // Community rates are notably higher than nexon rates here. Assuming GMS is different and using those instead.
    // The sample size isn't great, but anecdotes from people in twitch chats align with the community data.
    // That being said, take meister tier up rates with a grain of salt.
    "meister": {
        0: 0.1163,
        1: 0.0879,
        2: 0.0459
    },
    // Community rates notably higher than KMS rates, using them.
    "red": {
        0: 0.14,
        1: 0.06,
        2: 0.025
    },
    // Community rates notably higher than KMS rates, using them.
    "black": {
        0: 0.17,
        1: 0.11,
        2: 0.05
    }
}

// DMT is only for cash shop cubes.
export const tier_rates_DMT = {
    "occult": tier_rates.occult,
    "master": tier_rates.master,
    "meister": tier_rates.meister,
    "red": {
        0: 0.14 * 2,
        1: 0.06 * 2,
        2: 0.025 * 2
    },
    "black": {
        0: 0.17 * 2,
        1: 0.11 * 2,
        2: 0.05 * 2
    }
}

// Prime line rates for each line for each cube for the highest tier they can roll.
// In order of first, second, third.
// Assuming we have the same prime line rates as KMS (see the tier up rates link above).
export const prime_line_rates = {
    "occult": [1, 0.009901, 0.009901],
    "master": [1, 0.01858, 0.01858],
    "meister": [1, 0.001996, 0.001996],
    "red": [1, 0.1, 0.01],
    "black": [1, 0.2, 0.05]
}