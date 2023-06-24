//
// Server cost functions
// Values taken from https://strategywiki.org/wiki/MapleStory/Spell_Trace_and_Star_Force#Meso_Cost
//

function makeMesoFn(divisor, currentStarExp = 2.7, extraMult = 1) {
    return (currentStar, itemLevel) => 100 * Math.round(extraMult * itemLevel ** 3 * ((currentStar + 1) ** currentStarExp) / divisor + 10);
}

function preSaviorMesoFn(current_star) {
    if (current_star >= 15) {
        return makeMesoFn(20000);
    }
    if (current_star >= 10) {
        return makeMesoFn(40000)
    }
    return makeMesoFn(2500, 1);
}

function preSaviorCost(current_star, item_level) {
    const mesoFn = preSaviorMesoFn(current_star);
    return mesoFn(current_star, item_level);
}

function saviorMesoFn(current_star) {
    switch (current_star) {
        case 11:
            return makeMesoFn(22000);
        case 12:
            return makeMesoFn(15000);
        case 13:
            return makeMesoFn(11000);
        case 14:
            return makeMesoFn(7500);
        default:
            return preSaviorMesoFn(current_star);
    }
}

function saviorCost(current_star, item_level) {
    const mesoFn = saviorMesoFn(current_star);
    return mesoFn(current_star, item_level);
}

function tmsRegMesoFn(current_star) {
    if (current_star >= 20) {
        return makeMesoFn(4000);
    }
    if (current_star >= 15) {
        return makeMesoFn(5000);
    }
    if (current_star >= 11) {
        return makeMesoFn(20000, 2.7, 3);
    }
    if (current_star >= 10) {
        return makeMesoFn(20000);
    }
    return makeMesoFn(2500, 1);
}

function tmsRegCost(current_star, item_level) {
    const mesoFn = tmsRegMesoFn(current_star);
    return mesoFn(current_star, item_level);
}

function tmsRebootCost(current_star, item_level) {
    const adjusted_level = item_level > 150 ? 150 : item_level;
    return preSaviorCost(current_star, adjusted_level);
}

// Map from server input value to the associated cost function.
// As of the ignition update GMS uses KMS starforce prices.
// The Savior update increases cost for 11-15 but removes downgrading/booming.
const SERVER_COST_FUNCTIONS = {
    "kms": saviorCost,
    // Leaving this in for players who want to compare.
    "old": preSaviorCost,
    "tms": tmsRegCost,
    "tmsr": tmsRebootCost,
}

function getBaseCost(server, current_star, item_level) {
    const costFn = SERVER_COST_FUNCTIONS[server];
    return costFn(current_star, item_level);
}

// { currentStar: [success, maintain, decrease, boom] }
const preSaviorRates = {
    0: [0.95, 0.05, 0, 0],
    1: [0.9, 0.1, 0, 0],
    2: [0.85, 0.15, 0, 0],
    3: [0.85, 0.15, 0, 0],
    4: [0.80, 0.2, 0, 0],
    5: [0.75, 0.25, 0, 0],
    6: [0.7, 0.3, 0, 0],
    7: [0.65, 0.35, 0, 0],
    8: [0.6, 0.4, 0, 0],
    9: [0.55, 0.45, 0, 0],
    10: [0.5, 0.5, 0, 0],
    11: [0.45, 0, 0.55, 0],
    12: [0.4, 0.0, 0.594, 0.006],
    13: [0.35, 0.0, 0.637, 0.013],
    14: [0.3, 0.0, 0.686, 0.014],
    15: [0.3, 0.679, 0, 0.021],
    16: [0.3, 0.0, 0.679, 0.021],
    17: [0.3, 0.0, 0.679, 0.021],
    18: [0.3, 0.0, 0.672, 0.028],
    19: [0.3, 0.0, 0.672, 0.028],
    20: [0.3, 0.63, 0, 0.07],
    21: [0.3, 0, 0.63, 0.07],
    22: [0.03, 0.0, 0.776, 0.194],
    23: [0.02, 0.0, 0.686, 0.294],
    24: [0.01, 0.0, 0.594, 0.396]
}

const saviorRates = {
    ...preSaviorRates,
    11: [0.45, 0.55, 0.0, 0.0],
    12: [0.4, 0.6, 0.0, 0.0],
    13: [0.35, 0.65, 0.0, 0.0],
    14: [0.3, 0.7, 0.0, 0.0],
}

// Source: https://tw.beanfun.com/beanfuncommon/EventAD_Mobile/EventAD.aspx?EventADID=8388
// Big oof.
const TMSRates = {
    ...saviorRates,
    15: [0.3, 0.595, 0, 0.1],
    16: [0.3, 0.0, 0.56, 0.14],
    17: [0.3, 0.0, 0.49, 0.21],
    18: [0.3, 0.0, 0.42, 0.28],
    19: [0.3, 0.0, 0.42, 0.28],
    20: [0.3, 0.35, 0, 0.35],
    21: [0.3, 0, 0.35, 0.35],
    22: [0.03, 0.0, 0.388, 0.582],
    23: [0.02, 0.0, 0.392, 0.588],
    24: [0.01, 0.0, 0.396, 0.594]
}

const tyrantAEERates = {
    0: [1, 0, 0, 0],
    1: [0.9, 0.1, 0, 0],
    2: [0.8, 0.2, 0, 0],
    3: [0.7, 0.3, 0, 0],
    4: [0.6, 0.4, 0, 0],
    5: [0.5, 0.5, 0, 0],
    6: [0.4, 0.6, 0, 0],
    7: [0.3, 0.7, 0, 0],
    8: [0.2, 0.8, 0, 0],
    9: [0.1, 0.9, 0, 0],
    10: [0.05, 0.95, 0, 0],
    11: [0.04, 0.96, 0, 0],
    12: [0.03, 0.97, 0, 0],
    13: [0.02, 0.98, 0, 0],
    14: [0.01, 0.99, 0, 0],
}

const tyrantRates = {
   0: [0.5, 0.5, 0, 0],
   1: [0.5, 0, 0.5, 0],
   2: [0.45, 0, 0.55, 0],
   3: [0.4, 0, 0.6, 0],
   4: [0.4, 0, 0.6, 0],
   5: [0.4, 0, 0.582, 0.018],
   6: [0.4, 0, 0.57, 0.03],
   7: [0.4, 0, 0.558, 0.042],
   8: [0.4, 0, 0.54, 0.06],
   9:  [0.37, 0, 0.5355, 0.0945],
   10: [0.35, 0, 0.52, 0.13],
   11: [0.35, 0, 0.4875, 0.1625],
   12: [0.03, 0, 0.485, 0.485],
   13: [0.02, 0, 0.49, 0.49],
   14: [0.01, 0, 0.495, 0.495],
}

// Map from server input value to the associated starforcing rates.
const SERVER_RATES = {
    "kms": saviorRates,
    // Leaving this in for players who want to compare.
    "old": preSaviorRates,
    "tms": TMSRates,
    "tmsr": TMSRates,
}

function getRates(server, itemType, useAEE) {
    if (itemType === "tyrant") {
        return useAEE ? tyrantAEERates : tyrantRates;
    }
    return SERVER_RATES[server];
}

function getSafeguardMultiplierIncrease(current_star, sauna, server) {
    if (server === "old" && !sauna && current_star >= 12 && current_star <= 16) {
        return 1;
    }
    if (current_star >= 15 && current_star <= 16) {
        return 1;
    }
    return 0
}