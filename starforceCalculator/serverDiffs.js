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

function saviorCost(current_star, item_level) {
    return preSaviorCost(current_star, item_level);
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
    "gms": preSaviorCost,
    "tms": tmsRegCost,
    "tmsr": tmsRebootCost,
}

function getBaseCost(server, current_star, item_level) {
    const costFn = SERVER_COST_FUNCTIONS[server];
    return costFn(current_star, item_level);
}