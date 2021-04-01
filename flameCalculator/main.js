//to do: xenon, DA, Kanna, double sec stat classes, other weird classes check formulas

let powerful_tier_probabilities = { 3: 0.2, 4: 0.3, 5: 0.36, 6: 0.14, 7: 0 }
let eternal_tier_probabilities = { 3: 0, 4: 0.29, 5: 0.45, 6: 0.25, 7: 0.01 }

//update this
let powerful_tier_probabilities_non_adv = { 1: 0.2, 2: 0.3, 3: 0.36, 4: 0.14, 5: 0 }
let eternal_tier_probabilities_non_adv = { 1: 0, 2: 0.29, 3: 0.45, 4: 0.25, 5: 0.01 }

var stat_per_tier = { "140-159": 8, "160-179": 9, "180-199": 10, "200-219": 11 }
let combo_stat_per_tier = { "140-159": 4, "160-179": 5, "180-199": 5, "200-219": 6 }
var stat_equivalences = { "all_stat": 8, "secondary_stat": 0.1, "attack": 3 }

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

function checkRatios(maple_class) {
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
                zeroes = zeroes + 5 //here
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

function getWeaponProbability(attack, dmg, flame_type) {
    var probability = 0

    if (flame_type == "powerful") var tier_probabilities = powerful_tier_probabilities
    else var tier_probabilities = eternal_tier_probabilities

    if (dmg == 0) {
        var tier_probability = 0
        var tier_check = 3
        while (tier_check < 8) {
            if (attack <= tier_check) {
                tier_probability = tier_probability + tier_probabilities[tier_check]
            }
            tier_check++
        }
        var line_probability = combination(18, 3) / combination(19, 4)
        probability = tier_probability * line_probability
    }
    if (attack == 0) {
        //only dmg
        if ((flame_type == "powerful" && dmg <= 6) || (flame_type == "eternal" && dmg <= 7)) {
            var tier_probability = 0
            var tier_check = 3
            while (tier_check < 8) {
                if (tier_check >= dmg) {
                    tier_probability = tier_probability + tier_probabilities[tier_check]
                }
                tier_check++
            }
            var line_probability = combination(18, 3) / combination(19, 4)
            probability = probability + tier_probability * line_probability
        }
        //only boss
        if ((flame_type == "powerful" && dmg <= 12) || (flame_type == "eternal" && dmg <= 14)) {
            var tier_probability = 0
            var tier_check = 3
            while (tier_check < 8) {
                if (2 * tier_check >= dmg) {
                    tier_probability = tier_probability + tier_probabilities[tier_check]
                }
                tier_check++
            }
            var line_probability = combination(18, 3) / combination(19, 4)
            probability = probability + tier_probability * line_probability
        }
        //boss + dmg
        if ((flame_type == "powerful" && dmg <= 18) || (flame_type == "eternal" && dmg <= 21)) {
            var tier_probability = 0
            var boss_tier_check = 3
            while (boss_tier_check < 8) {
                var dmg_tier_check = 3
                while (dmg_tier_check < 8) {
                    if (2 * boss_tier_check + dmg_tier_check >= dmg) {
                        tier_probability = tier_probability + tier_probabilities[boss_tier_check] * tier_probabilities[dmg_tier_check]
                    }
                    dmg_tier_check++
                }
                boss_tier_check++
            }
            var line_probability = combination(17, 2) / combination(19, 4)
            probability = probability + tier_probability * line_probability

        }
    }
    if (attack != 0 && dmg != 0) {
        //Attack + Boss
        if ((flame_type == "powerful" && dmg <= 12) || (flame_type == "eternal" && dmg <= 14)) {
            var tier_probability = 0
            var boss_tier_check = 3
            while (boss_tier_check < 8) {
                var attack_tier_check = 3
                while (attack_tier_check < 8) {
                    if (2 * boss_tier_check >= dmg && attack_tier_check >= attack) {
                        tier_probability = tier_probability + tier_probabilities[boss_tier_check] * tier_probabilities[attack_tier_check]
                    }
                    attack_tier_check++
                }
                boss_tier_check++
            }
            var line_probability = combination(17, 2) / combination(19, 4)
            probability = probability + tier_probability * line_probability

        }
        //Attack + DMG
        if ((flame_type == "powerful" && dmg <= 6) || (flame_type == "eternal" && dmg <= 7)) {
            var tier_probability = 0
            var dmg_tier_check = 3
            while (dmg_tier_check < 8) {
                var attack_tier_check = 3
                while (attack_tier_check < 8) {
                    if (dmg_tier_check >= dmg && attack_tier_check >= attack) {
                        tier_probability = tier_probability + tier_probabilities[dmg_tier_check] * tier_probabilities[attack_tier_check]
                    }
                    attack_tier_check++
                }
                dmg_tier_check++
            }
            var line_probability = combination(17, 2) / combination(19, 4)
            probability = probability + tier_probability * line_probability

        }
        //Attack + Boss + DMG
        if ((flame_type == "powerful" && dmg <= 18) || (flame_type == "eternal" && dmg <= 21)) {
            var tier_probability = 0
            var dmg_tier_check = 3
            while (dmg_tier_check < 8) {
                var attack_tier_check = 3
                while (attack_tier_check < 8) {
                    var boss_tier_check = 3
                    while (boss_tier_check < 8) {
                        if (2 * boss_tier_check + dmg_tier_check >= dmg && attack_tier_check >= attack) {
                            tier_probability = tier_probability + tier_probabilities[dmg_tier_check] * tier_probabilities[attack_tier_check] * tier_probabilities[boss_tier_check]
                        }
                        boss_tier_check++
                    }
                    attack_tier_check++
                }
                dmg_tier_check++
            }
            var line_probability = combination(16, 1) / combination(19, 4)
            probability = probability + tier_probability * line_probability
        }

    }
    return probability
}

function possibleOutcome(main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier, main2_tier, main3_tier) {
    var list = [main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier]
    if (main2_tier && main3_tier) list = [main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier, main2_tier, main3_tier]
    var index = 0
    var total_tiers = 0
    while (index < list.length) {
        if (list[index] > 0) total_tiers++

        index++
    }
    return total_tiers <= 4
}

function numberOfLines(main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier, main2_tier, main3_tier, combo_six_tier) {
    var list = [main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier, main2_tier, main3_tier, combo_six_tier]
    var index = 0
    var number_of_lines = 0
    while (index < list.length) {
        if (list[index] > 0) number_of_lines++
        index++
    }
    return number_of_lines
}

function getTierProbability(main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, flame_type, boss_tier, dmg_tier, non_advantaged_item, main2_tier, main3_tier, combo_six_tier) {
    var list = [main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier, main2_tier, main3_tier, combo_six_tier]
    var index = 0
    var probability = 0
    if (flame_type == "powerful") {
        var tier_probabilities = powerful_tier_probabilities
        if (non_advantaged_item) {
            tier_probabilities = powerful_tier_probabilities_non_adv
        }
    }
    if (flame_type == "eternal") {
        var tier_probabilities = eternal_tier_probabilities
        if (non_advantaged_item) {
            tier_probabilities = eternal_tier_probabilities_non_adv
        }
    }
    while (index < list.length) {
        var tier = list[index];
        if (tier > 0) {
            if (probability == 0) probability = tier_probabilities[tier]
            else {
                probability = probability * tier_probabilities[tier]
            }
        }
        index++
    }
    return probability
}

function getProbability(item_level, flame_type, item_type, desired_stat, non_advantaged_item, maple_class) {
    //desired_stat = {attack_tier, dmg_percent}

    //main_tier
    //secondary_tier
    //combo_one_tier //main + sec_stat
    //combo_two_tier // main + other1
    //combo_three_tier //main + other2
    //combo_four_tier // sec + other1
    //combo_five_tier // sec + other2
    //all_stat_tier
    //attack_tier

    var solutions = []
    var upper_limit = 7
    var sec_upper_limit = 7
    var combo_four_upper_limit = 7
    var combo_five_upper_limit = 7
    var att_upper_limit = 7
    var all_stat_upper_limit = 7

    var lower_limit = 3

    if (non_advantaged_item) {
        lower_limit = 1
        upper_limit = 5
        sec_upper_limit = 5
        combo_four_upper_limit = 5
        combo_five_upper_limit = 5
        att_upper_limit = 5
        all_stat_upper_limit = 5
    }

    if (flame_type == "eternal") {
        upper_limit = 8
        sec_upper_limit = 8
        combo_four_upper_limit = 8
        combo_five_upper_limit = 8
        att_upper_limit = 8
        all_stat_upper_limit = 8

        lower_limit = 4

        if (non_advantaged_item) {
            lower_limit = 2
            upper_limit = 6
            sec_upper_limit = 6
            combo_four_upper_limit = 6
            combo_five_upper_limit = 6
            att_upper_limit = 6
            all_stat_upper_limit = 6
        }
    }

    if (item_type == "armor") {
        if (desired_stat == 0) return 1

        var ratios = checkRatios(maple_class) //here
        if (maple_class == "shadower" || maple_class == "db" || maple_class == "cadena") { }
        if (maple_class == "kanna") { }
        if (maple_class == "xenon") {
            var main_tier = 0
            while (main_tier < upper_limit) { //str
                var combo_six_tier = 0
                while (combo_six_tier < upper_limit) { // luk+dex
                    var combo_one_tier = 0
                    while (combo_one_tier < upper_limit) { // str + int
                        var combo_two_tier = 0
                        while (combo_two_tier < upper_limit) { // luk + int
                            var combo_three_tier = 0
                            while (combo_three_tier < upper_limit) { // dex + int
                                var all_stat_tier = 0
                                while (all_stat_tier < upper_limit) {
                                    var attack_tier = 0
                                    while (attack_tier < att_upper_limit) {
                                        var combo_four_tier = 0
                                        while (combo_four_tier < upper_limit) { //str + dex
                                            var combo_five_tier = 0
                                            while (combo_five_tier < upper_limit) { //str + luk
                                                var main2_tier = 0
                                                while (main2_tier < upper_limit) { //luk
                                                    var main3_tier = 0
                                                    while (main3_tier < upper_limit) { //dex
                                                        //equation here change this calculation for different classes
                                                        var stat_score = (main_tier + main2_tier + main3_tier) * stat_per_tier[item_level] + (combo_one_tier + combo_two_tier + combo_three_tier + 2 * (combo_four_tier + combo_five_tier + combo_six_tier)) * combo_stat_per_tier[item_level] + all_stat_tier * stat_equivalences["all_stat"] + attack_tier * stat_equivalences["attack"]
                                                        if (stat_score >= desired_stat) {
                                                            if (possibleOutcome(main_tier, combo_six_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, 0, 0, main2_tier, main3_tier)) {
                                                                var solution = { "main_tier": main_tier, "main2_tier": main2_tier, "main3_tier": main3_tier, "combo_one_tier": combo_one_tier, "combo_two_tier": combo_two_tier, "combo_three_tier": combo_three_tier, "combo_four_tier": combo_four_tier, "combo_five_tier": combo_five_tier, "combo_six_tier": combo_six_tier, "all_stat_tier": all_stat_tier, "attack_tier": attack_tier }
                                                                solutions[solutions.length] = solution
                                                            }
                                                        }
                                                        if (main3_tier == 0) {
                                                            var main3_tier = lower_limit
                                                        }
                                                        else {
                                                            main3_tier++
                                                        }
                                                    }
                                                    if (main2_tier == 0) {
                                                        var main2_tier = lower_limit
                                                    }
                                                    else {
                                                        main2_tier++
                                                    }
                                                }
                                                if (combo_five_tier == 0) {
                                                    var combo_five_tier = lower_limit
                                                }
                                                else {
                                                    combo_five_tier++
                                                }
                                            }
                                            if (combo_four_tier == 0) {
                                                var combo_four_tier = lower_limit
                                            }
                                            else {
                                                combo_four_tier++
                                            }
                                        }
                                        if (attack_tier == 0) {
                                            var attack_tier = lower_limit
                                        }
                                        else {
                                            attack_tier++
                                        }
                                    }
                                    if (all_stat_tier == 0) {
                                        var all_stat_tier = lower_limit
                                    }
                                    else {
                                        all_stat_tier++
                                    }
                                }
                                if (combo_three_tier == 0) {
                                    var combo_three_tier = lower_limit
                                }
                                else {
                                    combo_three_tier++
                                }
                            }
                            if (combo_two_tier == 0) {
                                var combo_two_tier = lower_limit
                            }
                            else {
                                combo_two_tier++
                            }
                        }
                        if (combo_one_tier == 0) {
                            var combo_one_tier = lower_limit
                        }
                        else {
                            combo_one_tier++
                        }
                    }
                    if (combo_six_tier == 0) {
                        var combo_six_tier = lower_limit
                    }
                    else {
                        combo_six_tier++
                    }
                }
                if (main_tier == 0) {
                    var main_tier = lower_limit
                }
                else {
                    main_tier++
                }
            }
        }
        if (maple_class == "other") {
            if (ratios.remove_all_stat == true) all_stat_upper_limit = 1
            if (ratios.remove_att == true) att_upper_limit = 1
            if (ratios.remove_sec == true) {
                sec_upper_limit = 1
                combo_four_upper_limit = 1
                combo_five_upper_limit = 1
            }

            var main_tier = 0
            while (main_tier < upper_limit) {
                var secondary_tier = 0
                while (secondary_tier < sec_upper_limit) {
                    var combo_one_tier = 0
                    while (combo_one_tier < upper_limit) {
                        var combo_two_tier = 0
                        while (combo_two_tier < upper_limit) {
                            var combo_three_tier = 0
                            while (combo_three_tier < upper_limit) {
                                var all_stat_tier = 0
                                while (all_stat_tier < all_stat_upper_limit) {
                                    var attack_tier = 0
                                    while (attack_tier < att_upper_limit) {
                                        var combo_four_tier = 0
                                        while (combo_four_tier < combo_four_upper_limit) {
                                            var combo_five_tier = 0
                                            while (combo_five_tier < combo_five_upper_limit) {
                                                //equation here change this calculation for different classes
                                                var stat_score = main_tier * stat_per_tier[item_level] + secondary_tier * stat_per_tier[item_level] * stat_equivalences["secondary_stat"] + combo_one_tier * (combo_stat_per_tier[item_level] * stat_equivalences["secondary_stat"] + combo_stat_per_tier[item_level]) + combo_two_tier * combo_stat_per_tier[item_level] + combo_three_tier * combo_stat_per_tier[item_level] + all_stat_tier * stat_equivalences["all_stat"] + attack_tier * stat_equivalences["attack"] + combo_four_tier * combo_stat_per_tier[item_level] * stat_equivalences["secondary_stat"] + combo_five_tier * combo_stat_per_tier[item_level] * stat_equivalences["secondary_stat"]
                                                if (stat_score >= desired_stat) {
                                                    if (possibleOutcome(main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, 0, 0)) {
                                                        var solution = { "main_tier": main_tier, "secondary_tier": secondary_tier, "combo_one_tier": combo_one_tier, "combo_two_tier": combo_two_tier, "combo_three_tier": combo_three_tier, "combo_four_tier": combo_four_tier, "combo_five_tier": combo_five_tier, "all_stat_tier": all_stat_tier, "attack_tier": attack_tier }
                                                        solutions[solutions.length] = solution
                                                    }
                                                }
                                                if (combo_five_tier == 0) {
                                                    var combo_five_tier = lower_limit
                                                }
                                                else {
                                                    combo_five_tier++
                                                }
                                            }
                                            if (combo_four_tier == 0) {
                                                var combo_four_tier = lower_limit
                                            }
                                            else {
                                                combo_four_tier++
                                            }
                                        }
                                        if (attack_tier == 0) {
                                            var attack_tier = lower_limit
                                        }
                                        else {
                                            attack_tier++
                                        }
                                    }
                                    if (all_stat_tier == 0) {
                                        var all_stat_tier = lower_limit
                                    }
                                    else {
                                        all_stat_tier++
                                    }
                                }
                                if (combo_three_tier == 0) {
                                    var combo_three_tier = lower_limit
                                }
                                else {
                                    combo_three_tier++
                                }
                            }
                            if (combo_two_tier == 0) {
                                var combo_two_tier = lower_limit
                            }
                            else {
                                combo_two_tier++
                            }
                        }
                        if (combo_one_tier == 0) {
                            var combo_one_tier = lower_limit
                        }
                        else {
                            combo_one_tier++
                        }
                    }
                    if (secondary_tier == 0) {
                        var secondary_tier = lower_limit
                    }
                    else {
                        secondary_tier++
                    }
                }
                if (main_tier == 0) {
                    var main_tier = lower_limit
                }
                else {
                    main_tier++
                }
            }
        }

        var probability = 0
        for (var i = 0; i < solutions.length; i++) {
            var main2_tier = 0
            var main3_tier = 0
            var combo_six_tier = 0
            var main_tier = solutions[i].main_tier
            if (maple_class != "xenon") var secondary_tier = solutions[i].secondary_tier
            var combo_one_tier = solutions[i].combo_one_tier
            var combo_two_tier = solutions[i].combo_two_tier
            var combo_three_tier = solutions[i].combo_three_tier
            var combo_four_tier = solutions[i].combo_four_tier
            var combo_five_tier = solutions[i].combo_five_tier
            var all_stat_tier = solutions[i].all_stat_tier
            var attack_tier = solutions[i].attack_tier
            if (maple_class == "xenon") {
                main2_tier = solutions[i].main2_tier
                main3_tier = solutions[i].main3_tier
                combo_six_tier = solutions[i].combo_six_tier
            }
            var number_of_lines = numberOfLines(main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, 0, 0, main2_tier, main3_tier, combo_six_tier)

            //non-flame-advantaged item line probabilities
            var non_advantaged = { 1: 0.45, 2: 0.35, 3: 0.15, 4: 0.05 }

            //hypergeometric distribution
            var number_of_zeroes = checkRatios().zeroes
            var choose_from = 10 + number_of_zeroes
            if (maple_class == "xenon") choose_from = 8
            //here
            var line_probability = combination(choose_from, 4 - number_of_lines) / combination(19, 4)
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
            var tier_probability = getTierProbability(main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, flame_type, 0, 0, non_advantaged_item, main2_tier, main3_tier, combo_six_tier)
            var event_probability = line_probability * tier_probability

            probability = probability + event_probability

        }
    }
    else if (item_type == "weapon") {
        var desired_attack_tier = desired_stat.attack_tier
        var desired_dmg_percent = desired_stat.dmg_percent

        if (desired_attack_tier == 0 && desired_dmg_percent) return 1

        var probability = getWeaponProbability(desired_attack_tier, desired_dmg_percent, flame_type)
    }
    return probability

    //     var desired_stats = 60 //desired_stat.desired_stat
    //     var item_level = "140-159" //temp
    //     var desired_attack_tier = desired_stat.attack_tier
    //     var desired_dmg_percent = desired_stat.dmg_percent

    //     var probability = 0

    //     //loop
    //     var attack_tier = 0
    //     if (desired_attack_tier >= lower_limit) attack_tier = desired_attack_tier
    //     while (attack_tier < upper_limit) {
    //         var boss_tier = 0
    //         if (desired_dmg_percent >= 8) {
    //             starting_tier = Math.round(0.5 * desired_dmg_percent) - 3
    //             if (starting_tier >= lower_limit) {
    //                 boss_tier = starting_tier

    //             }
    //         }
    //         while (boss_tier < upper_limit) {
    //             var combo_one_tier = 0
    //             while (combo_one_tier < upper_limit) {
    //                 var combo_two_tier = 0
    //                 while (combo_two_tier < upper_limit) {
    //                     var combo_three_tier = 0
    //                     while (combo_three_tier < upper_limit) {
    //                         var all_stat_tier = 0
    //                         while (all_stat_tier < upper_limit) {
    //                             var main_tier = 0
    //                             while (main_tier < upper_limit) {
    //                                 var secondary_tier = 0
    //                                 while (secondary_tier < upper_limit) {
    //                                     var dmg_tier = 0
    //                                     while (dmg_tier < upper_limit) {
    //                                         var combo_four_tier = 0
    //                                         while (combo_four_tier < upper_limit) {
    //                                             var combo_five_tier = 0
    //                                             while (combo_five_tier < upper_limit) {
    //                                                 //equation here change this calculation for different classes
    //                                                 var stat_score = main_tier * stat_per_tier[item_level] + secondary_tier * stat_per_tier[item_level] * stat_equivalences["secondary_stat"] + combo_one_tier * (combo_stat_per_tier[item_level] * stat_equivalences["secondary_stat"] + combo_stat_per_tier[item_level]) + combo_two_tier * combo_stat_per_tier[item_level] + combo_three_tier * combo_stat_per_tier[item_level] + all_stat_tier * stat_equivalences["all_stat"] + combo_four_tier * combo_stat_per_tier[item_level] * stat_equivalences["secondary_stat"] + combo_five_tier * combo_stat_per_tier[item_level] * stat_equivalences["secondary_stat"]// + attack_tier * stat_equivalences["attack"]
    //                                                 if (stat_score >= desired_stats && 2 * boss_tier + dmg_tier >= desired_dmg_percent && attack_tier >= desired_attack_tier) {
    //                                                     if (possibleOutcome(main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier)) {
    //                                                         var number_of_lines = numberOfLines(main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, boss_tier, dmg_tier)
    //                                                         var line_probability = combination(19 - number_of_lines, 4 - number_of_lines) / combination(19, 4)
    //                                                         var tier_probability = getTierProbability(main_tier, secondary_tier, combo_one_tier, combo_two_tier, combo_three_tier, combo_four_tier, combo_five_tier, all_stat_tier, attack_tier, flame_type, boss_tier, dmg_tier)
    //                                                         var event_probability = line_probability * tier_probability
    //                                                         probability = probability + event_probability
    //                                                     }
    //                                                 }
    //                                                 if (combo_five_tier == 0) {
    //                                                     var combo_five_tier = lower_limit
    //                                                 }
    //                                                 else {
    //                                                     combo_five_tier++
    //                                                 }
    //                                             }
    //                                             if (combo_four_tier == 0) {
    //                                                 var combo_four_tier = lower_limit
    //                                             }
    //                                             else {
    //                                                 combo_four_tier++
    //                                             }
    //                                         }
    //                                         if (dmg_tier == 0) {
    //                                             var dmg_tier = lower_limit
    //                                         }
    //                                         else {
    //                                             dmg_tier++
    //                                         }
    //                                     }
    //                                     if (secondary_tier == 0) {
    //                                         var secondary_tier = lower_limit
    //                                     }
    //                                     else {
    //                                         secondary_tier++
    //                                     }
    //                                 }
    //                                 if (main_tier == 0) {
    //                                     var main_tier = lower_limit
    //                                 }
    //                                 else {
    //                                     main_tier++
    //                                 }
    //                             }
    //                             if (all_stat_tier == 0) {
    //                                 var all_stat_tier = lower_limit
    //                             }
    //                             else {
    //                                 all_stat_tier++
    //                             }
    //                         }
    //                         if (combo_three_tier == 0) {
    //                             var combo_three_tier = lower_limit
    //                         }
    //                         else {
    //                             combo_three_tier++
    //                         }
    //                     }
    //                     if (combo_two_tier == 0) {
    //                         var combo_two_tier = lower_limit
    //                     }
    //                     else {
    //                         combo_two_tier++
    //                     }
    //                 }
    //                 if (combo_one_tier == 0) {
    //                     var combo_one_tier = lower_limit
    //                 }
    //                 else {
    //                     combo_one_tier++
    //                 }
    //             }
    //             if (boss_tier < lower_limit) {
    //                 var boss_tier = lower_limit
    //             }
    //             else {
    //                 boss_tier++
    //             }
    //         }
    //         if (attack_tier < lower_limit) {
    //             var attack_tier = lower_limit
    //         }
    //         else {
    //             attack_tier++
    //         }
    //     }
    // }

    // return probability
}

function geoDistrQuantile(p) {
    var mean = 1 / p

    var median = Math.log(1 - 0.5) / Math.log(1 - p)
    var seventy_fifth = Math.log(1 - 0.75) / Math.log(1 - p)
    var eighty_fifth = Math.log(1 - 0.85) / Math.log(1 - p)
    var nintey_fifth = Math.log(1 - 0.95) / Math.log(1 - p)

    return { mean: mean, median: median, seventy_fifth: seventy_fifth, eighty_fifth: eighty_fifth, nintey_fifth: nintey_fifth }
}
//test
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        $("#toast").toast('show')
    }, 1000)
    document.getElementById("item_type").addEventListener("change", function () {
        var maple_class = document.getElementById("maple_class").value
        if (document.getElementById("item_type").value == "armor") {
            if (maple_class == "kanna") {
                document.getElementById('hp_stat_div').hidden = false
                document.getElementById('luk_stat_div').hidden = false
                document.getElementById("statequivalences").hidden = false
                document.getElementById("statequivalences_title").hidden = false

                document.getElementById('str_stat_div').hidden = true
                document.getElementById('dex_stat_div').hidden = true
                document.getElementById('secondary_stat_div').hidden = true

                document.getElementById("all_stat").value = 8
                document.getElementById("attack").value = 3

            }
            else if (maple_class == "xenon") {
                document.getElementById('hp_stat_div').hidden = true
                document.getElementById('secondary_stat_div').hidden = true
                document.getElementById('luk_stat_div').hidden = true
                document.getElementById('str_stat_div').hidden = true
                document.getElementById('dex_stat_div').hidden = true

                document.getElementById("statequivalences").hidden = false
                document.getElementById("statequivalences_title").hidden = false

                document.getElementById("desired_stat_armor").value = 200
                document.getElementById("all_stat").value = 20
                document.getElementById("attack").value = 2.5
            }
            else if (maple_class == "db" || maple_class == "shadower" || maple_class == "cadena") {
                document.getElementById('hp_stat_div').hidden = true
                document.getElementById('luk_stat_div').hidden = true
                document.getElementById('secondary_stat_div').hidden = true

                document.getElementById('str_stat_div').hidden = false
                document.getElementById('dex_stat_div').hidden = false
                document.getElementById("statequivalences").hidden = false
                document.getElementById("statequivalences_title").hidden = false

                document.getElementById("all_stat").value = 8
                document.getElementById("attack").value = 3
            }
            else if (maple_class == "other") {
                document.getElementById('hp_stat_div').hidden = true
                document.getElementById('luk_stat_div').hidden = true
                document.getElementById('str_stat_div').hidden = true
                document.getElementById('dex_stat_div').hidden = true

                document.getElementById('secondary_stat_div').hidden = false
                document.getElementById("statequivalences").hidden = false
                document.getElementById("statequivalences_title").hidden = false

                document.getElementById("all_stat").value = 8
                document.getElementById("attack").value = 3
            }
            else if (maple_class == "da") {
                document.getElementById("statequivalences").hidden = true
                document.getElementById("statequivalences_title").hidden = true
            }
        }
    })
    document.getElementById("maple_class").addEventListener("change", function () {
        var maple_class = document.getElementById("maple_class").value

        if (document.getElementById("item_type").value == "armor") {
            if (maple_class == "kanna") {
                document.getElementById('hp_stat_div').hidden = false
                document.getElementById('luk_stat_div').hidden = false
                document.getElementById("statequivalences").hidden = false
                document.getElementById("statequivalences_title").hidden = false

                document.getElementById('str_stat_div').hidden = true
                document.getElementById('dex_stat_div').hidden = true
                document.getElementById('secondary_stat_div').hidden = true

                document.getElementById("all_stat").value = 8
                document.getElementById("attack").value = 3

            }
            else if (maple_class == "xenon") {
                document.getElementById('hp_stat_div').hidden = true
                document.getElementById('secondary_stat_div').hidden = true
                document.getElementById('luk_stat_div').hidden = true
                document.getElementById('str_stat_div').hidden = true
                document.getElementById('dex_stat_div').hidden = true

                document.getElementById("statequivalences").hidden = false
                document.getElementById("statequivalences_title").hidden = false

                document.getElementById("desired_stat_armor").value = 200
                document.getElementById("all_stat").value = 20
                document.getElementById("attack").value = 2.5
            }
            else if (maple_class == "db" || maple_class == "shadower" || maple_class == "cadena") {
                document.getElementById('hp_stat_div').hidden = true
                document.getElementById('luk_stat_div').hidden = true
                document.getElementById('secondary_stat_div').hidden = true

                document.getElementById('str_stat_div').hidden = false
                document.getElementById('dex_stat_div').hidden = false
                document.getElementById("statequivalences").hidden = false
                document.getElementById("statequivalences_title").hidden = false
                document.getElementById("all_stat").value = 8
                document.getElementById("attack").value = 3
            }
            else if (maple_class == "other") {
                document.getElementById('hp_stat_div').hidden = true
                document.getElementById('luk_stat_div').hidden = true
                document.getElementById('str_stat_div').hidden = true
                document.getElementById('dex_stat_div').hidden = true

                document.getElementById('secondary_stat_div').hidden = false
                document.getElementById("statequivalences").hidden = false
                document.getElementById("statequivalences_title").hidden = false
                document.getElementById("all_stat").value = 8
                document.getElementById("attack").value = 3
            }
            else if (maple_class == "da") {
                document.getElementById("statequivalences").hidden = true
                document.getElementById("statequivalences_title").hidden = true
            }
        }
    })
    document.getElementById("item_type").addEventListener("change", function () {
        var item_type = document.getElementById('item_type').value
        var flame_type = document.getElementById('flame_type').value
        if (item_type == 'armor') {
            document.getElementById('weapon_desired_stats').hidden = true;
            document.getElementById('statequivalences_title').hidden = false;
            document.getElementById('statequivalences').hidden = false;
            document.getElementById('armor_desired_stats').hidden = false;
            document.getElementById('item_level_div').hidden = false;
        }
        else {
            document.getElementById('weapon_desired_stats').hidden = false;
            document.getElementById('armor_desired_stats').hidden = true;
            document.getElementById('statequivalences').hidden = true;
            document.getElementById('statequivalences_title').hidden = true;
            document.getElementById('item_level_div').hidden = true;

            if (flame_type == 'powerful') {
                document.getElementById('attack_tier').options[5].disabled = true;

            }
        }
    })
    document.getElementById("flame_type").addEventListener("change", function () {
        var flame_type = document.getElementById('flame_type').value
        var item_type = document.getElementById('item_type').value
        if (flame_type == 'powerful') {
            if (item_type == 'weapon') {
                document.getElementById('attack_tier').options[5].disabled = true;
            }
        }
        else {
            if (item_type == 'weapon') {
                document.getElementById('attack_tier').options[5].disabled = false;
            }
        }
    })
    document.getElementById("calculateButton").addEventListener("click", function () {
        function loaderOn() {
            $('#loader1').show();
            $('#loader2').show();
            setTimeout(runCalc, 100);
        }

        function loaderOff() {
            $('#loader1').hide();
            $('#loader2').hide()
        }

        function runCalc() {
            var flame_type = document.getElementById('flame_type').value
            var item_type = document.getElementById('item_type').value
            var guild_discount = document.getElementById('guild_discount').checked
            var item_level
            var non_advantaged_item = !document.getElementById('flame-advantaged').checked
            var maple_class = document.getElementById("maple_class").value

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
            if (maple_class != "xenon") stat_equivalences.secondary_stat = 1 / document.getElementById('secondary_stat').value

            if (item_type == 'armor') {
                var desired_stat = document.getElementById('desired_stat_armor').value
                item_level = document.getElementById('item_level').value
            }
            else {
                var attack_tier = document.getElementById('attack_tier').value
                var dmg_percent = document.getElementById('dmg_percent').value
                var desired_stat = { "attack_tier": attack_tier, "dmg_percent": dmg_percent }
            }

            var p = getProbability(item_level, flame_type, item_type, desired_stat, non_advantaged_item, maple_class)
            console.log(p)
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
                Average flames: ${mean.toLocaleString()} ${flame_type} flames<br />
                Median flames: ${median.toLocaleString()} ${flame_type} flames<br />
            </p>
      </div>
      <div class=" statBox statBox4" style="background-color:#bbb;">
        <h2 style="text-align:center;">Flame Percentiles</h2>
        <p style="text-align:center;"">
            75% chance within ${seventy_fifth.toLocaleString()} ${flame_type} flames<br />
            85% chance within ${eighty_fifth.toLocaleString()} ${flame_type} flames<br />
            95% chance within ${nintey_fifth.toLocaleString()} ${flame_type} flames<br />
        </p>
      </div>
    </div>
        `
        }
        loaderOn();
        setTimeout(loaderOff, 100);
    })
})
//var p = getProbability("200-219", "powerful", "weapon", {"attack_tier": 6, "desired_stat": 40, "dmg_percent": 12})

