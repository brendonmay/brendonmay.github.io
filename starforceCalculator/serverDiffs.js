//
// Server cost functions
// Values taken from https://strategywiki.org/wiki/MapleStory/Spell_Trace_and_Star_Force#Meso_Cost
//

function kmsCost(current_star, item_level) {
    if (current_star >= 15) {
        return 1000 + item_level ** 3 * ((current_star + 1) ** 2.7) / 200;
    }
    if (current_star >= 10) {
        return 1000 + item_level ** 3 * ((current_star + 1) ** 2.7) / 400;
    }
    return 1000 + item_level ** 3 * (current_star + 1) / 25;
}

function tmsRegCost(current_star, item_level) {
    if (current_star >= 20) {
        return 1000 + item_level ** 3 * ((current_star + 1) ** 2.7) / 40;
    }
    if (current_star >= 15) {
        return 1000 + item_level ** 3 * ((current_star + 1) ** 2.7) / 50;
    }
    if (current_star >= 11) {
        return 1000 + item_level ** 3 * ((current_star + 1) ** 2.7) / 66.66;
    }
    if (current_star >= 10) {
        return 1000 + item_level ** 3 * ((current_star + 1) ** 2.7) / 200;
    }
    return 1000 + item_level ** 3 * (current_star + 1) / 25;
}

function tmsRebootCost(current_star, item_level) {
    const adjusted_level = item_level > 150 ? 150 : item_level;
    return kmsCost(current_star, adjusted_level);
}

// Map from server input value to the associated cost function.
// As of the ignition update GMS uses KMS starforce prices.
const SERVER_COST_FUNCTIONS = {
    "kms": kmsCost,
    "gms": kmsCost,
    "tms": tmsRegCost,
    "tmsr": tmsRebootCost,
}

function getBaseCost(server, current_star, item_level) {
    const costFn = SERVER_COST_FUNCTIONS[server];
    const attempt_cost = costFn(current_star, item_level);
    // The game rounds to the nearest 100.
    return Math.round(attempt_cost / 100) * 100;
}