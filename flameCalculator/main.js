//to do: xenon, DA, Kanna, double sec stat classes, other weird classes check formulas

// Data from https://strategywiki.org/wiki/MapleStory/Bonus_Stats#Flame_Advantage
// Number of lines on non-advantaged gear
const non_advantaged = { 1: 0.40, 2: 0.40, 3: 0.15, 4: 0.05 }

const TIER_PROBABILITIES = {
    drop: { 3: 0.25, 4: 0.3, 5: 0.3, 6: 0.14, 7: 0.01 },
    powerful: { 3: 0.2, 4: 0.3, 5: 0.36, 6: 0.14, 7: 0 },
    eternal: { 3: 0, 4: 0.29, 5: 0.45, 6: 0.25, 7: 0.01 },
    fusion: { 3: 0.5, 4: 0.4, 5: 0.1, 6: 0, 7: 0 },
    masterFusion: { 3: 0.25, 4: 0.35, 5: 0.3, 6: 0.1, 7: 0 },
    meisterFusion: { 3: 0, 4: 0.4, 5: 0.45, 6: 0.14, 7: 0.01 },
};

var stat_equivalences = { "all_stat": 9, "secondary_stat": 0.0909, "attack": 3, "dmg": 15 }

var stat_per_tier = {
    "120-139": 7,
    "140-159": 8,
    "160-179": 9,
    "180-199": 10,
    "200-229": 11,
    "230-249": 12,
    "250+": 12,
}
let combo_stat_per_tier = {
    "120-139": 4,
    "140-159": 4,
    "160-179": 5,
    "180-199": 5,
    "200-229": 6,
    "230-249": 6,
    "250+": 7,
}

let hp_stat_per_tier = {
    "120-129": 360,
    "130-139": 390,
    "140-149": 420,
    "150-159": 450,
    "160-169": 480,
    "170-179": 510,
    "180-189": 540,
    "190-199": 570,
    "200-209": 600,
    "210-219": 620,
    "220-229": 640,
    "230-239": 660,
    "240-249": 680,
    "250+": 700,
}

function getProbability(item_level, flame_type, item_type, desired_stat, non_advantaged_item, maple_class, solutions) {
    if (maple_class != "da") {
        var probability = 0
        for (var i = 0; i < solutions.length; i++) {
            var main2_tier = 0
            var main3_tier = 0
            var combo_six_tier = 0
            var main_tier = solutions[i].main_tier
            if (maple_class == "other" || maple_class == "kanna") var secondary_tier = solutions[i].secondary_tier
            var combo_one_tier = solutions[i].combo_one_tier
            var combo_two_tier = solutions[i].combo_two_tier
            var combo_three_tier = solutions[i].combo_three_tier
            var combo_four_tier = solutions[i].combo_four_tier
            var combo_five_tier = solutions[i].combo_five_tier
            var all_stat_tier = solutions[i].all_stat_tier
            var attack_tier = solutions[i].attack_tier
            var boss_tier = solutions[i].boss_tier
            var dmg_tier = solutions[i].dmg_tier

            if (maple_class == "kanna") {
                hp_tier = solutions[i].hp_tier
                //function numberOfLines(main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier, main2_tier, main3_tier) {
                var number_of_lines = numberOfLines(main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier, 0, hp_tier)
            }
            else if (maple_class == "xenon") {
                main2_tier = solutions[i].main2_tier
                main3_tier = solutions[i].main3_tier
                combo_six_tier = solutions[i].combo_six_tier
                var number_of_lines = numberOfLines(main_tier, combo_six_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier, main2_tier, main3_tier)
            }
            else if (maple_class == "db" || maple_class == "shadower" || maple_class == "cadena") {
                var sec1_tier = solutions[i].sec1_tier
                var sec2_tier = solutions[i].sec2_tier
                combo_six_tier = solutions[i].combo_six_tier
                var number_of_lines = numberOfLines(main_tier, combo_six_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier, sec1_tier, sec2_tier)
            }
            else {
                var number_of_lines = numberOfLines(main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier, 0, 0)
            }
            if (number_of_lines > 4) {
                console.log("More than 4 lines")
            }

            //determine probability
            var choose_from = 10
            if (maple_class == "xenon" || maple_class == "db" || maple_class == "shadower" || maple_class == "cadena") choose_from = 8
            if (maple_class == "kanna") choose_from = 9

            //here
            var line_probability = getLineProbability(choose_from, number_of_lines, non_advantaged_item, item_type)
            var tier_probability = getTierProbability(main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, flame_type, boss_tier, dmg_tier, non_advantaged_item, main2_tier, main3_tier, combo_six_tier)
            var event_probability = line_probability * tier_probability

            probability = probability + event_probability

        }
    }
    else if (item_type == "weapon" && maple_class == "da") {
        var desired_attack_tier = desired_stat.attack_tier
        var desired_dmg_percent = desired_stat.dmg_percent

        if (desired_attack_tier == 0 && desired_dmg_percent) return 1

        var probability = getWeaponProbability(desired_attack_tier, desired_dmg_percent, flame_type, non_advantaged_item)
    }

    return probability
}

function geoDistrQuantile(p) {
    var mean = 1 / p

    var median = Math.log(1 - 0.5) / Math.log(1 - p)
    var seventy_fifth = Math.log(1 - 0.75) / Math.log(1 - p)
    var eighty_fifth = Math.log(1 - 0.85) / Math.log(1 - p)
    var nintey_fifth = Math.log(1 - 0.95) / Math.log(1 - p)

    return { mean: mean, median: median, seventy_fifth: seventy_fifth, eighty_fifth: eighty_fifth, nintey_fifth: nintey_fifth }
}

// Translate the flame type into appropriate text to show for the averages.
function getFlameTypeText(flameType) {
    if (flameType === "drop") {
        return "drops";
    }
    if (["fusion", "masterFusion", "meisterFusion"].includes(flameType)) {
        return "fuses";
    }
    return `${flameType} flames`;
}

function factorial(number) {
    var value = number;
    for (var i = number; i > 1; i--)
        value *= i - 1;
    return value;
};

function combination(n, r) {
    if (n == r) return 1;
    if (r == 0) return 1;
    return factorial(n) / (factorial(r) * factorial(n - r));
};

function getWeaponProbability(attack, dmg, flame_type, non_advantaged_item) {
    var probability = 0

    var tier_probabilities = getTierProbabilities(flame_type, non_advantaged_item);
    var minTier = non_advantaged_item ? 1 : 3;
    var maxTier = non_advantaged_item ? 5 : 7;

    if (dmg == 0) {
        var tier_probability = 0
        var tier_check = minTier
        while (tier_check <= maxTier) {
            if (attack <= tier_check) {
                tier_probability = tier_probability + tier_probabilities[tier_check]
            }
            tier_check++
        }
        var line_probability = getLineProbability(18, 1, non_advantaged_item)
        probability = tier_probability * line_probability
    }
    if (attack == 0) {
        //only dmg
        if ((flame_type == "powerful" && dmg <= 6) || (flame_type == "eternal" && dmg <= 7)) {
            var tier_probability = 0
            var tier_check = minTier
            while (tier_check <= maxTier) {
                if (tier_check >= dmg) {
                    tier_probability = tier_probability + tier_probabilities[tier_check]
                }
                tier_check++
            }
            var line_probability = getLineProbability(18, 1, non_advantaged_item)
            probability = probability + tier_probability * line_probability
        }
        //only boss
        if ((flame_type == "powerful" && dmg <= 12) || (flame_type == "eternal" && dmg <= 14)) {
            var tier_probability = 0
            var tier_check = minTier
            while (tier_check <= maxTier) {
                if (2 * tier_check >= dmg) {
                    tier_probability = tier_probability + tier_probabilities[tier_check]
                }
                tier_check++
            }
            var line_probability = getLineProbability(18, 1, non_advantaged_item)
            probability = probability + tier_probability * line_probability
        }
        //boss + dmg
        if ((flame_type == "powerful" && dmg <= 18) || (flame_type == "eternal" && dmg <= 21)) {
            var tier_probability = 0
            var boss_tier_check = minTier
            while (boss_tier_check <= maxTier) {
                var dmg_tier_check = minTier
                while (dmg_tier_check <= maxTier) {
                    if (2 * boss_tier_check + dmg_tier_check >= dmg) {
                        tier_probability = tier_probability + tier_probabilities[boss_tier_check] * tier_probabilities[dmg_tier_check]
                    }
                    dmg_tier_check++
                }
                boss_tier_check++
            }
            var line_probability = getLineProbability(17, 2, non_advantaged_item)
            probability = probability + tier_probability * line_probability

        }
    }
    if (attack != 0 && dmg != 0) {
        //Attack + Boss
        if ((flame_type == "powerful" && dmg <= 12) || (flame_type == "eternal" && dmg <= 14)) {
            var tier_probability = 0
            var boss_tier_check = minTier
            while (boss_tier_check <= maxTier) {
                var attack_tier_check = minTier
                while (attack_tier_check <= maxTier) {
                    if (2 * boss_tier_check >= dmg && attack_tier_check >= attack) {
                        tier_probability = tier_probability + tier_probabilities[boss_tier_check] * tier_probabilities[attack_tier_check]
                    }
                    attack_tier_check++
                }
                boss_tier_check++
            }
            var line_probability = getLineProbability(16, 2, non_advantaged_item) //exclude DMG
            probability = probability + tier_probability * line_probability

        }
        //Attack + DMG
        if ((flame_type == "powerful" && dmg <= 6) || (flame_type == "eternal" && dmg <= 7)) {
            var tier_probability = 0
            var dmg_tier_check = minTier
            while (dmg_tier_check <= maxTier) {
                var attack_tier_check = minTier
                while (attack_tier_check <= maxTier) {
                    if (dmg_tier_check >= dmg && attack_tier_check >= attack) {
                        tier_probability = tier_probability + tier_probabilities[dmg_tier_check] * tier_probabilities[attack_tier_check]
                    }
                    attack_tier_check++
                }
                dmg_tier_check++
            }
            var line_probability = getLineProbability(16, 2, non_advantaged_item) //exclude boss
            probability = probability + tier_probability * line_probability

        }
        //Attack + Boss + DMG
        if ((flame_type == "powerful" && dmg <= 18) || (flame_type == "eternal" && dmg <= 21)) {
            var tier_probability = 0
            var dmg_tier_check = minTier
            while (dmg_tier_check <= maxTier) {
                var attack_tier_check = minTier
                while (attack_tier_check <= maxTier) {
                    var boss_tier_check = minTier
                    while (boss_tier_check <= maxTier) {
                        if (2 * boss_tier_check + dmg_tier_check >= dmg && attack_tier_check >= attack) {
                            tier_probability = tier_probability + tier_probabilities[dmg_tier_check] * tier_probabilities[attack_tier_check] * tier_probabilities[boss_tier_check]
                        }
                        boss_tier_check++
                    }
                    attack_tier_check++
                }
                dmg_tier_check++
            }
            var line_probability = getLineProbability(16, 3, non_advantaged_item)
            probability = probability + tier_probability * line_probability
        }

    }
    return probability
}

function makeNonAdvantaged(probabilities) {
    const updated = {};
    for (const [tier, probability] of Object.entries(probabilities)) {
        updated[tier - 2] = probability;
    }
    return updated;
}

function getLineProbability(choose_from, number_of_lines, non_advantaged_item, item_type) {
    var line_probability = combination(choose_from, 4 - number_of_lines) / combination(19, 4)
    if (item_type == "weapon") line_probability = combination(choose_from + 2, 4 - number_of_lines) / combination(21, 4)

    if (non_advantaged_item) {
        if (number_of_lines == 1) {
            line_probability = non_advantaged[1] / combination(19, 1) + non_advantaged[2] * combination(choose_from, 1) / combination(19, 2) + non_advantaged[3] * combination(choose_from, 2) / combination(19, 3) + non_advantaged[4] * combination(choose_from, 3) / combination(19, 4)
        }
        else if (number_of_lines == 2) {
            line_probability = non_advantaged[2] / combination(19, 2) + non_advantaged[3] * combination(choose_from, 1) / combination(19, 3) + non_advantaged[4] * combination(choose_from, 2) / combination(19, 4)
        }
        else if (number_of_lines == 3) {
            line_probability = non_advantaged[3] / combination(19, 3) + non_advantaged[4] * combination(choose_from, 1) / combination(19, 4)
        }
        else if (number_of_lines == 4) {
            line_probability = non_advantaged[4] / combination(19, 4)
        }
        else {
            line_probability = 0
        }
    }
    return line_probability
}

function getDAProbability(desired_attack, desired_hp, flame_type, non_advantaged_item) {
    var probability = 0

    var tier_probabilities = getTierProbabilities(flame_type, non_advantaged_item);

    if (desired_attack == 0 || desired_hp == 0) { // only hp
        var stat = desired_hp
        if (desired_hp == 0) stat = desired_attack
        var tier_probability = 0
        var tier_check = 3
        var tier_limit = 8
        if (non_advantaged_item) {
            tier_check = 1
            tier_limit = 6
        }
        while (tier_check < tier_limit) {
            if (stat <= tier_check) {
                tier_probability = tier_probability + tier_probabilities[tier_check]
            }
            tier_check++
        }

        if (non_advantaged_item) {
            var line_probability = non_advantaged[1] / 19 + non_advantaged[2] * combination(17, 1) / combination(19, 2) + non_advantaged[3] * combination(17, 2) / combination(19, 3) + non_advantaged[4] * combination(17, 3) / combination(19, 4)
        }
        else {
            var line_probability = combination(18, 3) / combination(19, 4)
        }
        probability = tier_probability * line_probability
    }
    else { // hp and attack
        var tier_probability = 0
        var att_tier_check = desired_attack
        var tier_limit = 8
        if (non_advantaged_item) tier_limit = 6

        while (att_tier_check < tier_limit) {
            var hp_tier_check = desired_hp
            while (hp_tier_check < tier_limit) {
                tier_probability = tier_probability + tier_probabilities[att_tier_check] * tier_probabilities[hp_tier_check]
                hp_tier_check++
            }
            att_tier_check++
        }

        if (non_advantaged_item) {
            var line_probability = non_advantaged[2] / combination(19, 2) + non_advantaged[3] * combination(17, 1) / combination(19, 3) + non_advantaged[4] * combination(17, 2) / combination(19, 4)
        }
        else {
            var line_probability = combination(17, 2) / combination(19, 4)
        }
        probability = tier_probability * line_probability
    }
    return probability
}

function getTierProbabilities(flame_type, non_advantaged_item) {
    const advantagedProbabilities = TIER_PROBABILITIES[flame_type];
    if (non_advantaged_item) {
        return makeNonAdvantaged(advantagedProbabilities);
    }
    return advantagedProbabilities;
}

function getTierProbability(main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, flame_type, boss_tier, dmg_tier, non_advantaged_item, main2_tier, main3_tier, combo_six_tier) {
    var list = [main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier, main2_tier, main3_tier, combo_six_tier]
    var index = 0
    var probability = 1
    var tier_probabilities = getTierProbabilities(flame_type, non_advantaged_item);
    while (index < list.length) {
        var tier = list[index];
        if (tier > 0) {
            probability = probability * tier_probabilities[tier]
        }
        index++
    }
    return probability
}

function numberOfLines(main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier, main2_tier, main3_tier) {
    var list = [main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier, main2_tier, main3_tier]
    var index = 0
    var number_of_lines = 0
    while (index < list.length) {
        if (list[index] > 0) number_of_lines++
        index++
    }
    return number_of_lines
}

function getLowerTierLimit(flame_type, non_advantaged_item) {
    const flameAdvantageAdjustment = non_advantaged_item ? 2 : 0;
    for (let i = 3; i <= 8; i++) {
        if (TIER_PROBABILITIES[flame_type][i] > 0) {
            return i - flameAdvantageAdjustment;
        }
    }
    return 3;
}

function possibleOutcome(main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier, main2_tier, main3_tier) {
    list = [main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier, main2_tier, main3_tier]

    var index = 0
    var total_tiers = 0
    while (index < list.length) {
        if (list[index] > 0) total_tiers++

        index++
    }
    return total_tiers <= 4
}

function getUpperTierLimit(flame_type, non_advantaged_item) {
    const flameAdvantageAdjustment = non_advantaged_item ? 2 : 0;
    for (let i = 8; i >= 3; i--) {
        if (TIER_PROBABILITIES[flame_type][i] > 0) {
            // +1 because the loop uses < and not <=
            return i - flameAdvantageAdjustment + 1;
        }
    }
    return 8;
}

function checkRatios(maple_class, stat_equivalences) {
    var zeroes = 0
    var remove_all_stat = false
    var remove_sec = false
    var remove_att = false
    var remove_dex = false
    var remove_str = false
    var remove_luk = false
    var remove_hp = false

    if (maple_class == "other") {
        if (stat_equivalences.secondary_stat == 0) {
            zeroes = zeroes + 3
            remove_sec = true
        }
    }
    if (maple_class == "shadower" || maple_class == "db" || maple_class == "cadena") {
        if (stat_equivalences.dex_stat == 0) {
            if (stat_equivalences.str_stat == 0) {
                zeroes = zeroes + 5
                remove_str = true
            }
            else {
                zeroes = zeroes + 2
            }
            remove_dex = true
        }
        if (stat_equivalences.str_stat == 0 && remove_dex == false) {
            remove_str = true
            zeroes = zeroes + 2
        }
    }
    if (maple_class == "kanna") {
        if (stat_equivalences.luk_stat == 0) {
            zeroes = zeroes + 3
            remove_luk = true
        }
        if (stat_equivalences.hp_stat == 0) {
            zeroes = zeroes++
            remove_hp = true
        }
    }
    if (stat_equivalences.all_stat == 0) {
        zeroes++
        remove_all_stat = true;
    }
    if (stat_equivalences.attack == 0) {
        zeroes++
        remove_att = true
    }

    return { zeroes, remove_all_stat, remove_sec, remove_att }
}

//test
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        $("#toast").toast('show')
    }, 1000)
    document.getElementById("item_type").addEventListener("change", onItemTypeChange)
    document.getElementById("maple_class").addEventListener("change", onClassChange)
    document.getElementById("flame-advantaged").addEventListener("change", onFlameAdvantagedChange)
    document.getElementById("flame_type").addEventListener("change", onFlameTypeChange)
    document.getElementById("calculateButton").addEventListener("click", function () {
        function loaderOn() {
            $('#loader1').show();
            $('#loader2').show();
        }

        function loaderOff() {
            $('#loader1').hide();
            $('#loader2').hide()
        }
        function progressOn() {
            const progressDiv = document.getElementById('progress_div');
            progressDiv.style.display = 'block';
        }

        function progressOff() {
            const progressDiv = document.getElementById('progress_div');
            progressDiv.style.display = 'none';
        }

        function runCalc() {
            progressOn();
            var flame_type = document.getElementById('flame_type').value
            var item_type = document.getElementById('item_type').value
            var guild_discount = document.getElementById('guild_discount').checked
            var item_level
            var non_advantaged_item = !document.getElementById('flame-advantaged').checked
            var maple_class = document.getElementById("maple_class").value
            var w_level = document.getElementById("w_level").value
            var base_attack = document.getElementById("base_attack").value

            if (maple_class == "kanna") {
                stat_equivalences.hp_stat = 1 / document.getElementById('hp_stat').value
                stat_equivalences.luk_stat = 1 / document.getElementById('luk_stat').value
            }
            if (maple_class == "db" || maple_class == "shadower" || maple_class == "cadena") {
                stat_equivalences.dex_stat = 1 / document.getElementById('dex_stat').value
                stat_equivalences.str_stat = 1 / document.getElementById('str_stat').value
            }

            stat_equivalences.all_stat = document.getElementById('all_stat').value
            stat_equivalences.attack = document.getElementById('attack').value
            stat_equivalences.dmg = document.getElementById('boss_stat').value

            if (maple_class != "xenon") stat_equivalences.secondary_stat = 1 / document.getElementById('secondary_stat').value

            if (maple_class == "da") {
                if (item_type == 'armor') {
                    var attack_tier = document.getElementById('da_attack_tier').value
                    var hp_tier = document.getElementById('hp_tier').value
                    var desired_stat = { "attack_tier": attack_tier, "hp_tier": hp_tier }
                }
                else {
                    var attack_tier = document.getElementById('attack_tier').value
                    var dmg_percent = document.getElementById('dmg_percent').value
                    var desired_stat = { "attack_tier": attack_tier, "dmg_percent": dmg_percent }
                }
            }

            else {
                var desired_stat = document.getElementById('desired_stat_armor').value
                item_level = document.getElementById('item_level').value
            }

            // Worker logic
            function runParallelTasks() {
                const numWorkers = 5
                var upper_limit = getUpperTierLimit(flame_type, non_advantaged_item);
                var lower_limit = getLowerTierLimit(flame_type, non_advantaged_item);
                const chunkSize = Math.floor((upper_limit - lower_limit) / numWorkers);
                const workerPromises = [];
                const progressArray = new Array(numWorkers).fill(0);
                const progressElement = document.getElementById('progress');

                for (let i = 0; i < numWorkers; i++) {
                    if (i == 0) {
                        var start = 0
                        var end = lower_limit
                    }
                    else {
                        var start = lower_limit + (i-1);
                        var end = lower_limit + i
                    }
                    // console.log('start for chunk #', i, ' = ', start)
                    // console.log('end for chunk #', i, ' = ', end)

                    const workerPromise = new Promise((resolve) => {
                        const worker = new Worker('worker.js');

                        worker.postMessage({
                            start,
                            end,
                            item_level,
                            flame_type,
                            item_type,
                            desired_stat,
                            non_advantaged_item,
                            maple_class,
                            stat_equivalences,
                            w_level,
                            base_attack

                        });

                        worker.onmessage = (event) => {
                            if (event.data.progress !== undefined) {
                                // Update progress for the specific worker
                                progressArray[i] = event.data.progress;

                                // Calculate overall progress based on individual worker progress
                                const overallProgress = (progressArray.reduce((acc, val) => acc + val, 0) / (numWorkers)) * 100;

                                // Update your UI with the overall progress percentage
                                progressElement.innerHTML = `<p>Progress = ${overallProgress.toFixed(2)}%</p>`;
                            } else {
                                // Resolve when the worker completes its task
                                resolve(event.data);
                                worker.terminate();
                            }
                        };
                    });

                    workerPromises.push(workerPromise);
                }

                Promise.all(workerPromises)
                    .then((workerResults) => {
                        if (maple_class == 'da') {
                            results = workerResults.flat()
                            p = results[0]
                        }
                        else {
                            const arrangements = workerResults.flat();
                            var p = getProbability(item_level, flame_type, item_type, desired_stat, non_advantaged_item, maple_class, arrangements)
                            //console.log(p)
                        }
                        // The rest of your result handling logic goes here
                        var stats = geoDistrQuantile(p)

                        var mean = Math.round(stats.mean)
                        var median = Math.round(stats.median)
                        var seventy_fifth = Math.round(stats.seventy_fifth)
                        var eighty_fifth = Math.round(stats.eighty_fifth)
                        var nintey_fifth = Math.round(stats.nintey_fifth)

                        var mean_cost = "N/A"
                        var median_cost = "N/A"
                        var seventy_fifth_cost = "N/A"
                        var eighty_fifth_cost = "N/A"
                        var ninety_fifth_cost = "N/A"

                        if (flame_type == "powerful") {
                            if (!guild_discount) {
                                var mean_cost = mean * 9500000
                                var median_cost = median * 9500000
                                var seventy_fifth_cost = seventy_fifth * 9500000
                                var eighty_fifth_cost = eighty_fifth * 9500000
                                var ninety_fifth_cost = nintey_fifth * 9500000
                            }
                            else {
                                var mean_cost = mean * 9120000
                                var median_cost = median * 9120000
                                var seventy_fifth_cost = seventy_fifth * 9120000
                                var eighty_fifth_cost = eighty_fifth * 9120000
                                var ninety_fifth_cost = nintey_fifth * 9120000
                            }
                        }

                        const flameTypeText = getFlameTypeText(flame_type);

                        document.getElementById('result').style.display = '';
                        document.getElementById('error-container').style.display = 'none';
                        document.getElementById('result').innerHTML =
                            `
                        <div class="container secondarycon">
                          <div class=" statBox statBox1" style="background-color:#aaa;">
                            <h2 style="text-align:center;">Mesos Stats</h2>
                                <p style="text-align:center;"">
                                    Average cost: ${mean_cost.toLocaleString()}<br />
                                Median cost: ${median_cost.toLocaleString()}<br />
                                </p>
                          </div>
                          <div class=" statBox statBox2" style="background-color:#bbb;">
                            <h2 style="text-align:center;">Mesos Percentiles</h2>
                            <p style="text-align:center;"">
                                75% chance within ${seventy_fifth_cost.toLocaleString()} mesos<br />
                                85% chance within ${eighty_fifth_cost.toLocaleString()} mesos<br />
                                95% chance within ${ninety_fifth_cost.toLocaleString()} mesos<br />
                            </p>
                          </div>

                          <div class=" statBox statBox3" style="background-color:#aaa;">
                            <h2 style="text-align:center;"">Flame Stats</h2>
                                <p style="text-align:center;"">
                                    Average: ${mean.toLocaleString()} ${flameTypeText}<br />
                                    Median: ${median.toLocaleString()} ${flameTypeText}<br />
                                </p>
                          </div>
                          <div class=" statBox statBox4" style="background-color:#bbb;">
                            <h2 style="text-align:center;">Flame Percentiles</h2>
                            <p style="text-align:center;"">
                                75% chance within ${seventy_fifth.toLocaleString()} ${flameTypeText}<br />
                                85% chance within ${eighty_fifth.toLocaleString()} ${flameTypeText}<br />
                                95% chance within ${nintey_fifth.toLocaleString()} ${flameTypeText}<br />
                            </p>
                          </div>
                        </div>
                            `
                        //hide progress
                        progressOff();
                        //loaderOff();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }

            runParallelTasks();


            //         var worker = new Worker('worker.js');

            //         // Send data to the worker
            //         //var p = getProbability(item_level, flame_type, item_type, desired_stat, non_advantaged_item, maple_class)
            //         var inputData = {
            //             item_level,
            //             flame_type,
            //             item_type,
            //             desired_stat,
            //             non_advantaged_item,
            //             maple_class,
            //             stat_equivalences

            //             // Include all the necessary data for optimization
            //             // Example: item_level, flame_type, item_type, desired_stat, non_advantaged_item, maple_class, etc.
            //         };

            //         worker.postMessage(inputData);

            //         // Receive result from the worker
            //         worker.addEventListener('message', function (e) {
            //             var p = e.data;
            //             // Handle the result as needed
            //             console.log(p);
            //             var stats = geoDistrQuantile(p)

            //             var mean = Math.round(stats.mean)
            //             var median = Math.round(stats.median)
            //             var seventy_fifth = Math.round(stats.seventy_fifth)
            //             var eighty_fifth = Math.round(stats.eighty_fifth)
            //             var nintey_fifth = Math.round(stats.nintey_fifth)

            //             var mean_cost = "N/A"
            //             var median_cost = "N/A"
            //             var seventy_fifth_cost = "N/A"
            //             var eighty_fifth_cost = "N/A"
            //             var ninety_fifth_cost = "N/A"

            //             if (flame_type == "powerful") {
            //                 if (!guild_discount) {
            //                     var mean_cost = mean * 9500000
            //                     var median_cost = median * 9500000
            //                     var seventy_fifth_cost = seventy_fifth * 9500000
            //                     var eighty_fifth_cost = eighty_fifth * 9500000
            //                     var ninety_fifth_cost = nintey_fifth * 9500000
            //                 }
            //                 else {
            //                     var mean_cost = mean * 9120000
            //                     var median_cost = median * 9120000
            //                     var seventy_fifth_cost = seventy_fifth * 9120000
            //                     var eighty_fifth_cost = eighty_fifth * 9120000
            //                     var ninety_fifth_cost = nintey_fifth * 9120000
            //                 }
            //             }

            //             const flameTypeText = getFlameTypeText(flame_type);

            //             document.getElementById('result').style.display = '';
            //             document.getElementById('error-container').style.display = 'none';
            //             document.getElementById('result').innerHTML =
            //                 `
            // <div class="container secondarycon">
            //   <div class=" statBox statBox1" style="background-color:#aaa;">
            //     <h2 style="text-align:center;">Mesos Stats</h2>
            //         <p style="text-align:center;"">
            //             Average cost: ${mean_cost.toLocaleString()}<br />
            //         Median cost: ${median_cost.toLocaleString()}<br />
            //         </p>
            //   </div>
            //   <div class=" statBox statBox2" style="background-color:#bbb;">
            //     <h2 style="text-align:center;">Mesos Percentiles</h2>
            //     <p style="text-align:center;"">
            //         75% chance within ${seventy_fifth_cost.toLocaleString()} mesos<br />
            //         85% chance within ${eighty_fifth_cost.toLocaleString()} mesos<br />
            //         95% chance within ${ninety_fifth_cost.toLocaleString()} mesos<br />
            //     </p>
            //   </div>

            //   <div class=" statBox statBox3" style="background-color:#aaa;">
            //     <h2 style="text-align:center;"">Flame Stats</h2>
            //         <p style="text-align:center;"">
            //             Average: ${mean.toLocaleString()} ${flameTypeText}<br />
            //             Median: ${median.toLocaleString()} ${flameTypeText}<br />
            //         </p>
            //   </div>
            //   <div class=" statBox statBox4" style="background-color:#bbb;">
            //     <h2 style="text-align:center;">Flame Percentiles</h2>
            //     <p style="text-align:center;"">
            //         75% chance within ${seventy_fifth.toLocaleString()} ${flameTypeText}<br />
            //         85% chance within ${eighty_fifth.toLocaleString()} ${flameTypeText}<br />
            //         95% chance within ${nintey_fifth.toLocaleString()} ${flameTypeText}<br />
            //     </p>
            //   </div>
            // </div>
            //     `
            //             loaderOff();
            //             // Terminate the worker when done
            //             worker.terminate();
            //         }, false);

            //         // Error handling
            //         worker.addEventListener('error', function (e) {
            //             console.error('Error in worker:', e.message);
            //             loaderOff();
            //         }, false);

            //         //console.log(p)

        }
        //loaderOn();
        //show progress
        progressOn();

        setTimeout(runCalc, 100);
    })
})
//var p = getProbability("200-219", "powerful", "weapon", {"attack_tier": 6, "desired_stat": 40, "dmg_percent": 12})

