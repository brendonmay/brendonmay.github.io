//here update homepage, update navbar, also include stat equivalence calc in both
let line_probabilities = {
    'rare': 0.8,
    'epic': 0.15,
    'unique': 0.05,
    'uniquep': 0.05,
    'legendaryp': 1,
    "legendary": 1
}

let chaos_prob = 0.1

let not_repeatable = ['passive_skill', 'att_speed']

let abilities_honor =
{
    'normal_dmg':
    {
        'epic': 0.025662,
        'unique': 0.017241,
        'uniquep': 0.017241 * 0.25,
        'legendaryp': 0.017761 * 0.6,
        "legendary": 0.017761
    },
    'abnormal_dmg':
    {
        'epic': 0.025662,
        'unique': 0.017241,
        'uniquep': 0.017241 * 0.25,
        'legendaryp': 0.017761 * 0.6,
        "legendary": 0.017761
    },
    'buff_duration':
    {
        'epic': 0.012831,
        'unique': 0.00862,
        'uniquep': 0.00862 * 0.1,
        'legendaryp': 0.00888 * 0.1,
        "legendary": 0.00888
    },
    'item_drop':
    {
        'epic': 0.025662,
        'unique': 0.017241,
        'uniquep': 0.017241 * 0.25,
        'legendaryp': 0.017761 * 0.25,
        "legendary": 0.017761
    },
    'meso_drop':
    {
        'epic': 0.025662,
        'unique': 0.017241,
        'uniquep': 0.017241 * 0.25,
        'legendaryp': 0.017761 * 0.25,
        "legendary": 0.017761
    },
    'w_attk':
    {
        'epic': 0.017108,
        'unique': 0.012931,
        'uniquep': 0.012931 * 0.25,
        'legendaryp': 0.022202 * 0.4,
        "legendary": 0.022202
    },
    'm_attk':
    {
        'epic': 0.017108,
        'unique': 0.012931,
        'uniquep': 0.012931 * 0.25,
        'legendaryp': 0.022202 * 0.4,
        "legendary": 0.022202
    },
    'crit_rate':
    {
        'epic': 0,
        'unique': 0.00431,
        'uniquep': 0.00431 * 0.1,
        'legendaryp': 0.00444 * 0.1,
        "legendary": 0.00444
    },
    'boss':
    {
        'epic': 0,
        'unique': 0.00862,
        'uniquep': 0.00862 * 0.1,
        'legendaryp': 0.022202 * 0.1,
        "legendary": 0.022202
    },
    'att_speed':
    {
        'epic': 0,
        'unique': 0,
        'uniquep': 0,
        'legendaryp': 0.00444,
        "legendary": 0.00444
    },
    'passive_skill':
    {
        'epic': 0,
        'unique': 0,
        'uniquep': 0,
        'legendaryp': 0.007104,
        "legendary": 0.007104
    },
    'cd_skip':
    {
        'epic': 0,
        'unique': 0.017241,
        'uniquep': 0.017241 * 0.1,
        'legendaryp': 0.017761 * 0.1,
        "legendary": 0.017761
    }
}

let abilities_circulator =
{
    'normal_dmg':
    {
        'epic': 0.026223,
        'unique': 0.017391,
        'uniquep': 0.017391,
        "legendaryp": 0.017761,
        "legendary": 0.017761
    },
    'abnormal_dmg':
    {
        'epic': 0.026223,
        'unique': 0.017391,
        'uniquep': 0.017391,
        "legendaryp": 0.017761,
        "legendary": 0.017761
    },
    'buff_duration':
    {
        'epic': 0.013111,
        'unique': 0.008695,
        'uniquep': 0.008695,
        "legendaryp": 0.00888,
        "legendary": 0.00888
    },
    'item_drop':
    {
        'epic': 0.026223,
        'unique': 0.017391,
        'uniquep': 0.017391,
        "legendaryp": 0.017761,
        "legendary": 0.017761
    },
    'meso_drop':
    {
        'epic': 0.026223,
        'unique': 0.017391,
        'uniquep': 0.017391,
        "legendaryp": 0.017761,
        "legendary": 0.017761
    },
    'w_attk':
    {
        'epic': 0.026223,
        'unique': 0.021739,
        'uniquep': 0.021739,
        "legendaryp": 0.022202,
        "legendary": 0.022202
    },
    'm_attk':
    {
        'epic': 0.026223,
        'unique': 0.021739,
        'uniquep': 0.021739,
        "legendaryp": 0.022202,
        "legendary": 0.022202
    },
    'crit_rate':
    {
        'epic': 0.017482,
        'unique': 0.008695,
        'uniquep': 0.008695,
        "legendaryp": 0.00444,
        "legendary": 0.00444
    },
    'boss':
    {
        'epic': 0,
        'unique': 0.021739,
        'uniquep': 0.021739,
        "legendaryp": 0.022202,
        "legendary": 0.022202
    },
    'att_speed':
    {
        'epic': 0,
        'unique': 0,
        'uniquep': 0,
        'legendaryp': 0.00444,
        "legendary": 0.00444
    },
    'passive_skill':
    {
        'epic': 0,
        'unique': 0,
        'uniquep': 0,
        'legendaryp': 0.007104,
        "legendary": 0.007104
    },
    'cd_skip':
    {
        'epic': 0,
        'unique': 0.017391,
        'uniquep': 0.017391,
        "legendaryp": 0.017761,
        "legendary": 0.017761
    }
}

let chaos_circulator =
{
    'normal_dmg':
    {
        'unique': 1,
        'uniquep': 0.25,
        "legendaryp": 0.6,
        "legendary": 1
    },
    'abnormal_dmg':
    {
        'unique': 1,
        'uniquep': 0.25,
        "legendaryp": 0.6,
        "legendary": 1
    },
    'buff_duration':
    {
        'unique': 1,
        'uniquep': 0.1,
        "legendaryp": 0.1,
        "legendary": 1
    },
    'item_drop':
    {
        'unique': 1,
        'uniquep': 0.25,
        "legendaryp": 0.25,
        "legendary": 1
    },
    'meso_drop':
    {
        'unique': 1,
        'uniquep': 0.25,
        "legendaryp": 0.25,
        "legendary": 1
    },
    'w_attk':
    {
        'unique': 1,
        'uniquep': 0.25,
        "legendaryp": 0.4,
        "legendary": 1
    },
    'm_attk':
    {
        'unique': 1,
        'uniquep': 0.25,
        "legendaryp": 0.4,
        "legendary": 1
    },
    'crit_rate':
    {
        'unique': 1,
        'uniquep': 0.1,
        "legendaryp": 0.1,
        "legendary": 1
    },
    'boss':
    {
        'unique': 1,
        'uniquep': 0.1,
        "legendaryp": 0.1,
        "legendary": 1
    },
    'att_speed':
    {
        'unique': 1,
        'uniquep': 1,
        'legendaryp': 1,
        "legendary": 1
    },
    'passive_skill':
    {
        'unique': 1,
        'uniquep': 1,
        'legendaryp': 1,
        "legendary": 1
    },
    'cd_skip':
    {
        'unique': 1,
        'uniquep': 0.1,
        "legendaryp": 0.1,
        "legendary": 1
    }
}

function honor_cost(lock_info) {
    if (lock_info == 0) return 8000
    else if (lock_info == 1) return 11000
    else if (lock_info == 2) return 16000
}

function isPerfect(line_rank) {
    return line_rank.slice(-1) == 'p'
}

function circProb(line_type, line_rank) {
    console.log(line_type, line_rank)
    if (line_type == "N/A" || line_rank == "N/A") return 1
    if (line_rank == "epic") { //here
        abilities_circulator[line_type][line_rank] * line_probabilities[line_rank] + abilities_circulator[line_type]['unique'] * line_probabilities['unique']
    }
    return abilities_circulator[line_type][line_rank] * line_probabilities[line_rank]
}

function reroll_or_lock(current_lines, desired_lines) {
    //arguments are lists length 3, ("m_attk*legendary", "meso_drop*unique", "N/A")

    lines = {
        1: false,
        2: false,
        3: false,
        'reroll': { "choice": false, "line": 2 },
        "line_probabilities": { 1: 0, 2: 0, 3: 0 },
        "lines": { 1: "N/A", 2: "N/A", 3: "N/A" },
        "locked_lines": [],
        "line_types": {}
    }

    var line = 0
    var lines_to_roll = 3
    var line_probabilities = { 1: 0, 2: 0, 3: 0 }
    var desired_NAs = 0
    var locked_lines = []
    var repeated_lock_check = []
    var repeated_roll_check = []

    while (line < 3) {
        var current_line = current_lines[line]
        var desired_line = 0
        while (desired_line < 3) {
            var index = desired_line + 1
            if (current_line == desired_lines[desired_line] || current_line.substring(0, current_line.length - 1) == desired_lines[desired_line]) {
                lines[index] = true
                if (current_line != "N/A" && !repeated_lock_check.includes(index)) {
                    repeated_lock_check.push(index)
                    locked_lines.push(index)

                }
                if (!repeated_roll_check.includes(index)) {
                    lines_to_roll--
                    repeated_roll_check.push(index)
                }

            }
            if (desired_lines[desired_line] == "N/A") {
                var probability_for_desired_line = 1
                lines[index] = true
                desired_NAs++
                if (!repeated_roll_check.includes(index)) {
                    lines_to_roll--
                    repeated_roll_check.push(index)
                }
            }
            else {
                var line_type = desired_lines[desired_line].substring(0, desired_lines[desired_line].indexOf('*'))
                var line_rank = desired_lines[desired_line].substring(desired_lines[desired_line].indexOf('*') + 1, desired_lines[desired_line].length)
                var probability_for_desired_line = abilities_honor[line_type][line_rank]
                lines.lines[index] = line_rank
                lines.line_types[index] = line_type

            }
            line_probabilities[index] = probability_for_desired_line
            desired_line++
        }

        line++
    }
    console.log("lines to roll: " + lines_to_roll)
    if (lines_to_roll == 0) return "done"
    else if (lines_to_roll == 1 || lines_to_roll == 2) {
        var line_type2 = lines.line_types[2]
        var line_rank2 = lines.lines[2]
        var line_type3 = lines.line_types[3]
        var line_rank3 = lines.lines[3]
        console.log(line_type2, line_rank2, line_type3, line_rank3)
        var circ_line_prob2 = circProb(line_type2, line_rank2)
        var circ_line_prob3 = circProb(line_type3, line_rank3)
        var perfectline2 = isPerfect(line_rank2)
        var perfectline3 = isPerfect(line_rank3)
        console.log(circ_line_prob2, circ_line_prob3)
        if ((lines[1] == false && lines_to_roll == 1) || (lines[2] && (circ_line_prob2 < circ_line_prob3) && (perfectline2 || !perfectline3)) || (lines[3] && (circ_line_prob2 > circ_line_prob3) && (perfectline3 || !perfectline2))) {
            lines.reroll.choice = false
        }
        else {
            lines.reroll.choice = true
            if ((circ_line_prob2 < circ_line_prob3) && (perfectline2 || !perfectline3)) lines.reroll.line = 2
            else lines.reroll.line = 3
        }

    }
    else if (lines_to_roll == 3) {
        lines.reroll.choice = true
        var line_type2 = lines.line_types[2]
        var line_rank2 = lines.lines[2]
        var line_type3 = lines.line_types[3]
        var line_rank3 = lines.lines[3]
        console.log(line_type2, line_rank2, line_type3, line_rank3)
        var circ_line_prob2 = circProb(line_type2, line_rank2)
        var circ_line_prob3 = circProb(line_type3, line_rank3)
        var perfectline2 = isPerfect(line_rank2)
        var perfectline3 = isPerfect(line_rank3)
        console.log(circ_line_prob2, circ_line_prob3)
        if ((circ_line_prob2 < circ_line_prob3) && (perfectline2 || !perfectline3)) lines.reroll.line = 2
        else lines.reroll.line = 3
    }

    lines.locked_lines = locked_lines
    lines.line_probabilities = line_probabilities
    lines.desired_NAs = desired_NAs / 3
    lines.lines_to_roll = lines_to_roll

    return lines
}

function getLineSuccess(line_rank, line_type, line_probability, rank_probability) {
    if (line_rank == "epic") {
        var unique_probability = line_probabilities["unique"]
        var unique_line_probability = abilities_honor[line_type].unique

        var line_success = line_probability * rank_probability + unique_probability * unique_line_probability
    }

    else {
        var line_success = line_probability * rank_probability
    }

    return line_success
}

function adjust_probability(line_rank, line_prob, locked_lines) {
    if (line_rank == "rare") var total = 31
    else if (line_rank == "epic") var total = 34
    else if (line_rank == "unique" || line_rank == "uniquep") var total = 40
    else if (line_rank == "legendary" || line_rank == "legendaryp") var total = 43

    return (line_prob * total) / (total - locked_lines)
}

function probabilitySuccess(probabilities, line_ranks, line_types, locked_lines, locked_lines_list) {
    var number_of_successful_outcomes = line_ranks.length
    var line_successes = {}

    if (number_of_successful_outcomes == 1) {
        var line_rank = line_ranks[0]
        var line_type = line_types[0]
        var rank_probability = line_probabilities[line_rank]
        var line_probability = probabilities[0]

        var original_line_success = getLineSuccess(line_rank, line_type, line_probability, rank_probability)
        var line_success = adjust_probability(line_rank, original_line_success, locked_lines)
        var line_failure = 1 - line_success

        if (line_ranks[0] == "legendary" || line_ranks[0] == "legendaryp") {
            var p = line_success
        }
        else {
            console.log(locked_lines_list)
            if (locked_lines_list.includes(2) || locked_lines_list.includes(3)) var p = line_success
            else var p = line_success + line_failure * adjust_probability(line_rank, original_line_success, locked_lines + 1)

        }
    }
    if (number_of_successful_outcomes == 2) {
        var line1_rank = line_ranks[0]
        var line1_type = line_types[0]
        var rank1_probability = line_probabilities[line1_rank]
        var line1_probability = probabilities[0]
        var original_line1_success = getLineSuccess(line1_rank, line1_type, line1_probability, rank1_probability)
        var line1_success = adjust_probability(line1_rank, original_line1_success, locked_lines)
        var line1_failure = 1 - line1_success

        var line2_rank = line_ranks[1]
        var line2_type = line_types[1]
        var rank2_probability = line_probabilities[line2_rank]
        var line2_probability = probabilities[1]
        var original_line2_success = getLineSuccess(line2_rank, line2_type, line2_probability, rank2_probability)
        var line2_success = adjust_probability(line2_rank, original_line2_success, locked_lines)
        var line2_failure = 1 - line2_success

        var both_failure = 1 - line1_success - line2_success
        console.log(line_ranks)

        if (line_ranks[0] == "legendary" || line_ranks[0] == "legendaryp") {
            if (not_repeatable.includes(line1_type)) {
                //12 + 1(not2)2, 1(not2)(not2), (not1)2 + (not1)(not2)2
                var case1 = line1_success * line2_success + line1_success * line2_failure * adjust_probability(line2_rank, original_line2_success, locked_lines + 1)
                var case2 = line1_success * line2_failure * (1 - adjust_probability(line2_rank, original_line2_success, locked_lines + 1))
                var case3 = line1_failure * line2_success + line1_failure * line2_failure * adjust_probability(line2_rank, original_line2_success, locked_lines + 1)

                if (locked_lines_list.includes(2) || locked_lines_list.includes(3)) {
                    case1 = line1_success * line2_success
                    case2 = line1_success * line2_failure
                    case3 = line1_failure * line2_success
                }
                var p = case1 + case2 + case3
            }
            else {
                //1 not2 2 + 12, 1 not2, not1 not2 2 + not1 2
                var case1 = line1_success * adjust_probability(line2_rank, original_line2_success, locked_lines + 1) + line1_success * (1 - adjust_probability(line2_rank, original_line2_success, locked_lines + 1)) * adjust_probability(line2_rank, original_line2_success, locked_lines + 2)
                var case2 = line1_success * (1 - adjust_probability(line2_rank, original_line2_success, locked_lines + 1)) * (1 - adjust_probability(line2_rank, original_line2_success, locked_lines + 2))
                var case3 = line1_failure * (1 - adjust_probability(line2_rank, original_line2_success, locked_lines + 1)) * adjust_probability(line2_rank, original_line2_success, locked_lines + 2) + line1_failure * adjust_probability(line2_rank, original_line2_success, locked_lines + 1)

                if (locked_lines_list.includes(2) || locked_lines_list.includes(3)) {
                    case1 = line1_success * adjust_probability(line2_rank, original_line2_success, locked_lines + 1)
                    case2 = line1_success * (1 - adjust_probability(line2_rank, original_line2_success, locked_lines + 1))
                    case3 = line1_failure * adjust_probability(line2_rank, original_line2_success, locked_lines + 1)
                }
                var p = case1 + case2 + case3
            }
        }

        else {
            //12 + 21, 1(not2) + (not12)1, 2(not1) + (not12)2
            var case1 = line1_success * adjust_probability(line2_rank, original_line2_success, locked_lines + 1) + line2_success * adjust_probability(line1_rank, original_line1_success, locked_lines + 1)
            var case2 = line1_success * (1 - adjust_probability(line2_rank, original_line2_success, locked_lines + 1)) + both_failure * adjust_probability(line1_rank, original_line1_success, locked_lines + 1)
            var case3 = line2_success * (1 - adjust_probability(line1_rank, original_line1_success, locked_lines + 1)) + both_failure * adjust_probability(line2_rank, original_line2_success, locked_lines + 1)

            var p = case1 + case2 + case3
        }

        line_successes[1] = case2
        line_successes[2] = case3
        line_successes.all = case1
    }
    if (number_of_successful_outcomes == 3) {
        var line1_rank = line_ranks[0]
        var line1_type = line_types[0]
        var rank1_probability = line_probabilities[line1_rank]
        var line1_probability = probabilities[0]
        var original_line1_success = getLineSuccess(line1_rank, line1_type, line1_probability, rank1_probability)
        var line1_success = adjust_probability(line1_rank, original_line1_success, locked_lines)
        var line1_failure = 1 - line1_success

        var line2_rank = line_ranks[1]
        var line2_type = line_types[1]
        var rank2_probability = line_probabilities[line2_rank]
        var line2_probability = probabilities[1]
        var original_line2_success = getLineSuccess(line2_rank, line2_type, line2_probability, rank2_probability)
        var line2_success = adjust_probability(line2_rank, original_line2_success, locked_lines)

        var line3_rank = line_ranks[2]
        var line3_type = line_types[2]
        var rank3_probability = line_probabilities[line3_rank]
        var line3_probability = probabilities[2]
        var original_line3_success = getLineSuccess(line3_rank, line3_type, line3_probability, rank3_probability)
        var line3_success = adjust_probability(line3_rank, original_line3_success, locked_lines)

        var both_failure = 1 - line2_success - line3_success


        if (not_repeatable.includes(line1_type)) {
            //123 + 132
            var case1 = line1_success * line2_success * adjust_probability(line3_rank, original_line3_success, locked_lines + 1) + line1_success * line3_success * adjust_probability(line2_rank, original_line2_success, locked_lines + 1)

            //12(not3) + 1(not23)2
            var case2 = line1_success * line2_success * (1 - adjust_probability(line3_rank, original_line3_success, locked_lines + 1)) + line1_success * both_failure * adjust_probability(line2_rank, original_line2_success, locked_lines + 1)

            //13(not2) + 1(not23)3
            var case3 = line1_success * line3_success * (1 - adjust_probability(line2_rank, original_line2_success, locked_lines + 1)) + line1_success * both_failure * adjust_probability(line3_rank, original_line3_success, locked_lines + 1)

            //(not1)23 + (not1)32
            var case4 = line1_failure * line2_success * adjust_probability(line3_rank, original_line3_success, locked_lines + 1) + line1_failure * line3_success * adjust_probability(line2_rank, original_line2_success, locked_lines + 1)

            //1(not23)(not23)
            var case5 = line1_success * both_failure * (1 - adjust_probability(line2_rank, original_line2_success, locked_lines + 1) - adjust_probability(line3_rank, original_line3_success, locked_lines + 1))

            //(not1)2(not3) + (not1)(not23)2
            var case6 = line1_failure * (line2_success * (1 - adjust_probability(line3_rank, original_line3_success, locked_lines + 1)) + both_failure * adjust_probability(line2_rank, original_line2_success, locked_lines + 1))

            //(not1)3(not2) + (not1)(not23)3
            var case7 = line1_failure * (line3_success * (1 - adjust_probability(line2_rank, original_line2_success, locked_lines + 1)) + both_failure * adjust_probability(line3_rank, original_line3_success, locked_lines + 1))


            var p = case1 + case2 + case3 + case4 + case5 + case6 + case7

        }
        else {
            //123 + 132
            var case1 = line1_success * adjust_probability(line2_rank, original_line2_success, locked_lines + 1) * adjust_probability(line3_rank, original_line3_success, locked_lines + 2) + line1_success * adjust_probability(line3_rank, original_line3_success, locked_lines + 1) * adjust_probability(line2_rank, original_line2_success, locked_lines + 2)

            //12(not3) + 1(not23)2
            var case2 = line1_success * adjust_probability(line2_rank, original_line2_success, locked_lines + 1) * (1 - adjust_probability(line3_rank, original_line3_success, locked_lines + 2)) + line1_success * (1 - adjust_probability(line3_rank, original_line3_success, locked_lines + 1) - adjust_probability(line2_rank, original_line2_success, locked_lines + 1)) * adjust_probability(line2_rank, original_line2_success, locked_lines + 2)

            //13(not2) + 1(not23)3
            var case3 = line1_success * adjust_probability(line3_rank, original_line3_success, locked_lines + 1) * (1 - adjust_probability(line2_rank, original_line2_success, locked_lines + 2)) + line1_success * (1 - adjust_probability(line3_rank, original_line3_success, locked_lines + 1) - adjust_probability(line2_rank, original_line2_success, locked_lines + 1)) * adjust_probability(line3_rank, original_line3_success, locked_lines + 2)

            //(not1)23 + (not1)32
            var case4 = line1_failure * adjust_probability(line2_rank, original_line2_success, locked_lines + 1) * adjust_probability(line3_rank, original_line3_success, locked_lines + 2) + line1_failure * adjust_probability(line3_rank, original_line3_success, locked_lines + 1) * adjust_probability(line2_rank, original_line2_success, locked_lines + 2)

            //1(not23)(not23)
            var case5 = line1_success * (1 - adjust_probability(line3_rank, original_line3_success, locked_lines + 1) - adjust_probability(line2_rank, original_line2_success, locked_lines + 1)) * (1 - adjust_probability(line2_rank, original_line2_success, locked_lines + 2) - adjust_probability(line3_rank, original_line3_success, locked_lines + 2))

            //(not1)2(not3) + (not1)(not23)2
            var case6 = line1_failure * (adjust_probability(line2_rank, original_line2_success, locked_lines + 1) * (1 - adjust_probability(line3_rank, original_line3_success, locked_lines + 2)) + (1 - adjust_probability(line3_rank, original_line3_success, locked_lines + 1) - adjust_probability(line2_rank, original_line2_success, locked_lines + 1)) * adjust_probability(line2_rank, original_line2_success, locked_lines + 2))

            //(not1)3(not2) + (not1)(not23)3
            var case7 = line1_failure * (adjust_probability(line3_rank, original_line3_success, locked_lines + 1) * (1 - adjust_probability(line2_rank, original_line2_success, locked_lines + 2)) + (1 - adjust_probability(line3_rank, original_line3_success, locked_lines + 1) - adjust_probability(line2_rank, original_line2_success, locked_lines + 1)) * adjust_probability(line3_rank, original_line3_success, locked_lines + 2))


            var p = case1 + case2 + case3 + case4 + case5 + case6 + case7
        }

        line_successes[1] = case5
        line_successes[2] = case6
        line_successes[3] = case7
        line_successes[12] = case2
        line_successes[13] = case3
        line_successes[23] = case4
        line_successes.all = case1
    }
    return { p: p, line_successes: line_successes }

}

function circulatorsSpent(compare_lines, line_to_roll) {
    var line_ranks = [compare_lines.lines[line_to_roll]]
    var line_types = [compare_lines.line_types[line_to_roll]]
    var locked_lines_list = []
    var probabilities = [abilities_circulator[line_types[0]][line_ranks[0]]]
    var number_of_locked_lines = 0

    //console.log("probabilities: " + probabilities, ", line_ranks: " + line_ranks, ", line_types: " + line_types)

    var p = probabilitySuccess(probabilities, line_ranks, line_types, number_of_locked_lines, locked_lines_list).p
    console.log("probabilities: " + probabilities, ", line_ranks: " + line_ranks, ", line_types: " + line_types, ", number_of_locked_lines: " + number_of_locked_lines)
    console.log("p: " + p)

    var median_rolls = geoDistrQuantile(p).median
    var rolls_25 = geoDistrQuantile(p).twenty_fifth
    var rolls_75 = geoDistrQuantile(p).seventy_fifth

    return { median_rolls: median_rolls, rolls_25: rolls_25, rolls_75: rolls_75 }
}

function cloneArray(array) {
    var i = 0
    var clone = []

    while (i < array.length) {
        clone[i] = array[i]
        i++
    }

    return clone
}

function pureHonorSpent(compare_lines) {
    var locked_lines_list = compare_lines.locked_lines
    var number_of_locked_lines = compare_lines.locked_lines.length
    var desired_NAs = compare_lines.desired_NAs
    var lines_to_roll = 3 - number_of_locked_lines - desired_NAs
    console.log("lines to roll: " + lines_to_roll, ", number of locked lines:" + number_of_locked_lines)

    var honor_spent_median = 0
    var honor_spent_25 = 0
    var honor_spent_75 = 0
    var probabilities = []
    var line_ranks = []
    var line_types = []

    var x = 1

    while (x < 4) {
        if (compare_lines[x] == false) {
            probabilities.push(compare_lines.line_probabilities[x])
            line_ranks.push(compare_lines.lines[x])
            line_types.push(compare_lines.line_types[x])
        }
        x++
    }
    //console.log("probabilities: " + probabilities, ", line_ranks: " + line_ranks, ", line_types: " + line_types)

    if (lines_to_roll == 3) {
        var success_info = probabilitySuccess(probabilities, line_ranks, line_types, number_of_locked_lines, locked_lines_list)
        var p = success_info.p
        var avg_rolls = 1 / p
        honor_spent += honor_cost(number_of_locked_lines) * avg_rolls

        var outcome_1_info = probabilitySuccess([probabilities[1], probabilities[2]], [line_ranks[1], line_ranks[2]], [line_types[1], line_types[2]], number_of_locked_lines + 1, locked_lines_list) //line 1 previously successful
        var outcome_1 = outcome_1_info.p

        var outcome_2_info = probabilitySuccess([probabilities[0], probabilities[2]], [line_ranks[0], line_ranks[2]], [line_types[0], line_types[2]], number_of_locked_lines + 1, locked_lines_list) //line 2 previously successful
        var outcome_2 = outcome_2_info.p

        var outcome_3_info = probabilitySuccess([probabilities[0], probabilities[1]], [line_ranks[0], line_ranks[1]], [line_types[0], line_types[1]], number_of_locked_lines + 1, locked_lines_list) //line 3 previously successful
        var outcome_3 = outcome_3_info.p

        var outcome_12_info = probabilitySuccess([probabilities[2]], [line_ranks[2]], [line_types[2]], number_of_locked_lines + 2, locked_lines_list) //line 1&2 previously successful
        var outcome_12 = outcome_12_info.p

        var outcome_13_info = probabilitySuccess([probabilities[1]], [line_ranks[1]], [line_types[1]], number_of_locked_lines + 2, locked_lines_list) //line 1&3 previously successful
        var outcome_13 = outcome_13_info.p

        var outcome_23_info = probabilitySuccess([probabilities[0]], [line_ranks[0]], [line_types[0]], number_of_locked_lines + 2, locked_lines_list) //line 2&3 previously successful
        var outcome_23 = outcome_23_info.p

        var new_p = (success_info.line_successes[1] / p) * (outcome_1) + (success_info.line_successes[2] / p) * (outcome_2) + (success_info.line_successes[3] / p) * (outcome_3) + (success_info.line_successes[12] / p) * (outcome_12) + (success_info.line_successes[13] / p) * (outcome_13) + (success_info.line_successes[23] / p) * (outcome_23) + (success_info.line_successes.all) / p
        avg_rolls = 1 / new_p
        honor_spent += honor_cost(number_of_locked_lines.length + 1) * avg_rolls

        var newer_p_1 = ((success_info.line_successes[1] / p) * (outcome_1) / new_p) * (probabilitySuccess([probabilities[1]], [line_ranks[1]], [line_types[1]], number_of_locked_lines + 2, locked_lines_list).p + probabilitySuccess([probabilities[2]], [line_ranks[2]], [line_types[2]], number_of_locked_lines + 2, locked_lines_list).p)
        var newer_p_2 = ((success_info.line_successes[2] / p) * (outcome_2) / new_p) * (probabilitySuccess([probabilities[0]], [line_ranks[0]], [line_types[0]], number_of_locked_lines + 2, locked_lines_list).p + probabilitySuccess([probabilities[2]], [line_ranks[2]], [line_types[2]], number_of_locked_lines + 2, locked_lines_list).p)
        var newer_p_3 = ((success_info.line_successes[3] / p) * (outcome_3) / new_p) * (probabilitySuccess([probabilities[1]], [line_ranks[1]], [line_types[1]], number_of_locked_lines + 2, locked_lines_list).p + probabilitySuccess([probabilities[0]], [line_ranks[0]], [line_types[0]], number_of_locked_lines + 2, locked_lines_list).p)
        var newer_p_12 = ((success_info.line_successes[12] / p) * (outcome_12) / new_p) //* (probabilitySuccess([probabilities[2]], [line_ranks[2]], [line_types[2]], number_of_locked_lines + 2).p)
        var newer_p_13 = ((success_info.line_successes[13] / p) * (outcome_13) / new_p) //* (probabilitySuccess([probabilities[1]], [line_ranks[1]], [line_types[1]], number_of_locked_lines + 2).p)
        var newer_p_23 = ((success_info.line_successes[23] / p) * (outcome_23) / new_p) //* (probabilitySuccess([probabilities[0]], [line_ranks[0]], [line_types[0]], number_of_locked_lines + 2).p)

        var newer_p = newer_p_1 + newer_p_2 + newer_p_3 + newer_p_12 + newer_p_13 + newer_p_23
        avg_rolls = 1 / newer_p
        honor_spent += honor_cost(number_of_locked_lines + 2) * avg_rolls

    }
    if (lines_to_roll == 2) {
        var success_info = probabilitySuccess(probabilities, line_ranks, line_types, number_of_locked_lines, locked_lines_list)
        var p = success_info.p
        console.log("p(rolling line2 or line3 = " + p)
        var median_rolls = geoDistrQuantile(p).median
        var rolls_25 = geoDistrQuantile(p).twenty_fifth
        var rolls_75 = geoDistrQuantile(p).seventy_fifth

        honor_spent_median += honor_cost(number_of_locked_lines) * median_rolls
        honor_spent_25 += honor_cost(number_of_locked_lines) * rolls_25
        honor_spent_75 += honor_cost(number_of_locked_lines) * rolls_75

        var locked_lines_list1 = cloneArray(locked_lines_list)
        var locked_lines_list2 = cloneArray(locked_lines_list)

        if (line_ranks[0] == "legendary" || line_ranks[0] == "legendaryp") {
            locked_lines_list2.push(2)
            locked_lines_list1.push(1)
        }
        else {
            locked_lines_list2.push(3)
            locked_lines_list1.push(2)
        }

        var outcome_1 = probabilitySuccess([probabilities[0]], [line_ranks[0]], [line_types[0]], number_of_locked_lines + 1, locked_lines_list2).p //line 2 previously successful
        var outcome_2 = probabilitySuccess([probabilities[1]], [line_ranks[1]], [line_types[1]], number_of_locked_lines + 1, locked_lines_list1).p // line 1 previously successful
        var new_p = (success_info.line_successes[2] / p) * (outcome_1) + (success_info.line_successes[1] / p) * (outcome_2) + (success_info.line_successes.all) / p

        console.log("probabilities: " + probabilities[0], ", line_ranks: " + line_ranks[0], ", line_types: " + line_types[0], ", number_of_locked_lines: " + number_of_locked_lines)
        console.log("line1 = " + line_types[0], ", line2 = " + line_types[1])
        console.log("p(rolling1|2) = " + (outcome_1), ", percentage of time line 2 occurs before line 2 = " + (success_info.line_successes[2] / p) * 100 + "%")
        console.log("p(rolling2|1) = " + (outcome_2), ", percentage of time line 1 occurs before line 2 = " + (success_info.line_successes[1] / p) * 100 + "%")
        console.log("p(rolling 1 and 2) = " + (success_info.line_successes.all) / p * 100 + "%")

        console.log(new_p)
        median_rolls = geoDistrQuantile(new_p).median
        var rolls_25 = geoDistrQuantile(new_p).twenty_fifth
        var rolls_75 = geoDistrQuantile(new_p).seventy_fifth

        honor_spent_median += honor_cost(number_of_locked_lines + 1) * median_rolls
        honor_spent_25 += honor_cost(number_of_locked_lines) * rolls_25
        honor_spent_75 += honor_cost(number_of_locked_lines) * rolls_75
    }
    if (lines_to_roll == 1) {
        var p = probabilitySuccess(probabilities, line_ranks, line_types, number_of_locked_lines, locked_lines_list).p
        console.log("probabilities: " + probabilities, ", line_ranks: " + line_ranks, ", line_types: " + line_types, ", number_of_locked_lines: " + number_of_locked_lines)
        console.log("p: " + p)

        var median_rolls = geoDistrQuantile(p).median
        var rolls_25 = geoDistrQuantile(p).twenty_fifth
        var rolls_75 = geoDistrQuantile(p).seventy_fifth

        honor_spent_median += honor_cost(number_of_locked_lines) * median_rolls
        honor_spent_25 += honor_cost(number_of_locked_lines) * rolls_25
        honor_spent_75 += honor_cost(number_of_locked_lines) * rolls_75

        //var skewness = getSkewness(p) //appears to be = 2, same skew as an exponential function
        // console.log("skewness: " + skewness)
        //console.log("median rolls = " + median_rolls)

    }
    return { honor_spent_median: honor_spent_median, honor_spent_25: honor_spent_25, honor_spent_75: honor_spent_75 }
}

function run_calculation(current_lines, desired_lines, only_honor) {
    var compare_lines = reroll_or_lock(current_lines, desired_lines)
    console.log(compare_lines)
    if (compare_lines == "done") {
        console.log("No computation needed.")
        return 0
    }
    if (compare_lines.lines_to_roll == 3 && only_honor) {
        console.log("Recommend they use circulators. This calculation is too high.")
        return 99
    }
    var reroll_choice = compare_lines.reroll.choice
    if (only_honor) reroll_choice = false

    if (reroll_choice) {
        if (compare_lines.lines[1] != "N/A") compare_lines[1] = false
        if (compare_lines.lines[2] != "N/A") compare_lines[2] = false
        if (compare_lines.lines[3] != "N/A") compare_lines[3] = false
        var line_to_roll = compare_lines.reroll.line
        var circulators_spent = circulatorsSpent(compare_lines, line_to_roll)

        compare_lines[line_to_roll] = true
        compare_lines.locked_lines = [line_to_roll]
        var honor_spent = pureHonorSpent(compare_lines)
    }
    else {
        var honor_spent = pureHonorSpent(compare_lines)
        var circulators_spent = 0
    }
    return { "honor": honor_spent, "circulators": circulators_spent, "line_to_roll": line_to_roll }
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

function getSkewness(p) {
    return (2 - p) / (Math.sqrt(1 - p))
}

function geoDistrQuantile(p) {
    var mean = 1 / p

    var median = Math.log(1 - 0.5) / Math.log(1 - p)
    var seventy_fifth = Math.log(1 - 0.75) / Math.log(1 - p)
    var twenty_fifth = Math.log(1 - 0.25) / Math.log(1 - p)

    return { mean: mean, median: median, seventy_fifth: seventy_fifth, twenty_fifth: twenty_fifth }
}

function isValidCombination(current_lines, desired_lines, useChaos) {
    console.log(current_lines)
    console.log(desired_lines)
    var i = 0
    var current_line_types = []
    var desired_line_types = []
    var same_lines = 0
    var identical_lines = 0

    while (i < 3) {
        if (current_lines[i] != "N/A") {
            var line_type = current_lines[i].substring(0, current_lines[i].indexOf('*'))
            if (current_line_types.includes(line_type)) return false
            else current_line_types.push(line_type)

        }
        if (useChaos) {
            var current_line_type = current_lines[i].substring(0, current_lines[i].indexOf('*'))
            var current_line_rank = current_lines[i].substring(current_lines[i].indexOf('*') + 1, current_lines[i].length)
            var z = 0
            while (z < 3) {
                var desired_line_type = desired_lines[z].substring(0, desired_lines[z].indexOf('*'))
                var desired_line_rank = desired_lines[z].substring(desired_lines[z].indexOf('*') + 1, desired_lines[z].length)
                if (current_line_type == desired_line_type) {
                    if (current_line_rank.substring(0, current_line_rank.length - 1) == desired_line_rank || current_line_rank == desired_line_rank.substring(0, desired_line_rank.length - 1) || current_line_rank == desired_line_rank) {
                        same_lines++
                    }
                    if (current_line_rank == desired_line_rank) {
                        identical_lines++
                    }
                }
                z++
            }
        }
        i++
    }
    i = 0
    while (i < 3) {
        if (desired_lines[i] != "N/A") {
            var line_type = desired_lines[i].substring(0, desired_lines[i].indexOf('*'))
            if (desired_line_types.includes(line_type)) return false
            else desired_line_types.push(line_type)
        }
        i++
    }
    if (useChaos && same_lines != 3) return "chaos_error"

    if (useChaos && identical_lines == 3) return "identical"

    return true
}

function numberPerfectLines(desired_lines, current_lines) {
    var i = 0
    var perfect_lines = []
    var ranks = []
    var perfect_current = []
    var roll = false

    while (i < 3) {
        if (current_lines[i].slice(-1) == 'p') {
            perfect_current.push(current_lines[i].substring(0, current_lines[i].indexOf('*')))
        }
        i++
    }

    i = 0

    while (i < 3) {
        if (desired_lines[i].slice(-1) == 'p') {
            if (!perfect_current.includes(desired_lines[i].substring(0, desired_lines[i].indexOf('*')))) roll = true
            perfect_lines.push(desired_lines[i].substring(0, desired_lines[i].indexOf('*')))
            ranks.push(desired_lines[i].substring(desired_lines[i].indexOf('*') + 1, desired_lines[i].length))
        }
        i++
    }


    if (perfect_current.length == 3 || roll == false) return 0
    return { lines: perfect_lines, ranks: ranks }
}

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        $("#toast").toast('show')
    }, 1000)
    document.getElementById("chaos").addEventListener("click", function () {
        if (document.getElementById("chaos").checked == true) {
            document.getElementById('only_honor').checked = false
            document.getElementById('only_honor').disabled = true

            document.getElementById('fifty').checked = false
            document.getElementById('fifty').disabled = true
        }
        else {
            document.getElementById('only_honor').checked = false
            document.getElementById('only_honor').disabled = false

            document.getElementById('fifty').checked = false
            document.getElementById('fifty').disabled = false
        }
    })
    document.getElementById("only_honor").addEventListener("click", function () {
        if (document.getElementById("only_honor").checked == true) {
            document.getElementById('chaos').checked = false
            document.getElementById('chaos').disabled = true
        }
        if (document.getElementById("only_honor").checked == false && document.getElementById("fifty").checked == false) {
            document.getElementById('chaos').checked = false
            document.getElementById('chaos').disabled = false
        }
    })
    document.getElementById("fifty").addEventListener("click", function () {
        if (document.getElementById("fifty").checked == true) {
            document.getElementById('chaos').checked = false
            document.getElementById('chaos').disabled = true
        }
        if (document.getElementById("only_honor").checked == false && document.getElementById("fifty").checked == false) {
            document.getElementById('chaos').checked = false
            document.getElementById('chaos').disabled = false
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
            var line_1 = document.getElementById("line_1").value
            var line_2 = document.getElementById("line_2").value
            var line_3 = document.getElementById("line_3").value

            var desired_line_1 = document.getElementById("desired_line_1").value
            var desired_line_2 = document.getElementById("desired_line_2").value
            var desired_line_3 = document.getElementById("desired_line_3").value

            var current_lines = [line_1, line_2, line_3]
            var desired_lines = [desired_line_1, desired_line_2, desired_line_3]

            var useChaos = document.getElementById('chaos').checked

            var isValid = isValidCombination(current_lines, desired_lines, useChaos)
            console.log(isValid)

            var send_msg = false

            if (useChaos && isValid != false) {
                document.getElementById('result').style.display = '';
                document.getElementById('error-container').style.display = 'none';

                document.getElementById('result').innerHTML =
                    `
                <div class="container secondarycon">
                <div class=" statBox statBox1" style="background-color:#aaa;">
                    <h2 style="text-align:center;">Expected Chaos Circulators</h2>
                        <p style="text-align:center;"">
                        0 Chaos Circulators<br />
                        </p>
                </div>
                </div>
                `

                if (isValid == "identical") { //here

                }

                else if (isValid == "chaos_error") {
                    document.getElementById('result').innerHTML =
                        `
                    <div class="container secondarycon">
                        <div class=" statBox statBox1" style="background-color:#aaa;">
                            <h2 style="text-align:center;">Error</h2>
                                <p style="text-align:center;"">
                                    You have inputted an invalid combination of lines.<br />
                                When using Chaos Circulators, your desired line types must match that of your current line types.<br />
                                Furthermore, the rank of each line must be the same.
                                </p>
                        </div>
                    </div>
                        `
                }

                else if (isValid == true) {
                    var number_of_perfect_lines = numberPerfectLines(desired_lines, current_lines)
                    console.log(number_of_perfect_lines)
                    var p = 1
                    var i = 0
                    if (number_of_perfect_lines.lines != 0) {
                        while (i < number_of_perfect_lines.lines.length) {
                            var line_type = number_of_perfect_lines.lines[i]
                            var line_rank = number_of_perfect_lines.ranks[i]
                            var chaos_prob = chaos_circulator[line_type][line_rank]
                            p *= chaos_prob
                            console.log(line_type, line_rank, chaos_prob, p)
                            i++
                        }
                    }
                    var expected_chaos = Math.ceil(1 / p)
                    if (number_of_perfect_lines.lines.length == 0) expected_chaos = 0

                    document.getElementById('result').innerHTML =
                        `
                    <div class="container secondarycon">
                    <div class=" statBox statBox1" style="background-color:#aaa;">
                        <h2 style="text-align:center;">Expected Chaos Circulators</h2>
                            <p style="text-align:center;"">
                            ${expected_chaos.toLocaleString()} Chaos Circulators<br />
                            </p>
                    </div>
                    </div>
                    `
                }
            }
            else if (isValid == true) {
                var only_honor = document.getElementById("only_honor").checked
                var fifty_off = document.getElementById("fifty").checked

                var expected_data = run_calculation(current_lines, desired_lines, only_honor)
                console.log(expected_data)
                if (expected_data == 0) {
                    var expected_honor = 0
                    var expected_circulators = 0

                    var honor_spent_median = 0
                    var honor_spent_25 = 0
                    var honor_spent_75 = 0
                }
                else if (expected_data == 99) send_msg = true
                else {
                    var expected_honor = expected_data.honor
                    var expected_circulators = expected_data.circulators

                    var honor_spent_median = Math.ceil(expected_honor.honor_spent_median)
                    var honor_spent_25 = Math.ceil(expected_honor.honor_spent_25)
                    var honor_spent_75 = Math.ceil(expected_honor.honor_spent_75)

                    var circulators_median = Math.ceil(expected_circulators.median_rolls)
                    var circulators_25 = Math.ceil(expected_circulators.rolls_25)
                    var circulators_75 = Math.ceil(expected_circulators.rolls_75)

                }

                console.log(expected_honor, expected_circulators)

                if (fifty_off == true) {
                    honor_spent_median = Math.ceil(honor_spent_median / 2)
                    honor_spent_25 = Math.ceil(honor_spent_25 / 2)
                    honor_spent_75 = Math.ceil(honor_spent_75 / 2)
                }

                if (expected_circulators != 0) var line_to_roll = expected_data.line_to_roll

                document.getElementById('result').style.display = '';
                document.getElementById('error-container').style.display = 'none';
                if (send_msg) {
                    document.getElementById('result').innerHTML =
                        `
                    <div class="container secondarycon">
                    <div class=" statBox statBox1" style="background-color:#aaa;">
                        <h2 style="text-align:center;">Results</h2>
                            <p style="text-align:center;"">
                                It is not recommended to only use Honor Exp in this instance.<br>The calculation is quite complex and has not been fully programmed.
                            </p>
                    </div>
                    </div>
        `
                }
                else {
                    if (expected_circulators != 0) {
                        var expected_median = circulators_median * 19000000
                        var expected_25 = circulators_25 * 19000000
                        var expected_75 = circulators_75 * 19000000
                        document.getElementById('result').innerHTML =
                            `
                    <div class="container secondarycon">
                        <div class=" statBoxs statBox1" style="background-color:#aaa;">
                            <h2 style="text-align:center;">Miracle Circulator Cost</h2>
                                <p style="text-align:center;"">
                                    You are expected to use between:<br>
                                    ${circulators_25.toLocaleString()} and ${circulators_75.toLocaleString()} Miracle Circulators<br />
    
                                    <i>(${expected_25.toLocaleString()} - ${expected_75.toLocaleString()} mesos)<br /></i><br>

                                    <b>Median: ${circulators_median.toLocaleString()} Miracle Circulators<br>
                                    <i>(${expected_median.toLocaleString()} mesos)<br /></i><br>

                                    Goal: Rolling for Line ${line_to_roll}</b>
                                </p>
                        </div>

                        <div class=" statBoxs statBox1" style="background-color:#aaa;">
                            <h2 style="text-align:center;">Honor Cost</h2>
                                <p style="text-align:center;"">
                                You are expected to use between:<br>
                                ${honor_spent_25.toLocaleString()} and ${honor_spent_75.toLocaleString()} Honor Exp<br><br><br>

                                <b>Median: ${honor_spent_median.toLocaleString()} Honor Exp<br><br><br>
                                    Goal: Rolling Remaining Lines</b>
                                </p>
                        </div>
                    </div>
        `
                    }
                    else {
                        document.getElementById('result').innerHTML =
                            `
                    <div class="container secondarycon">
                    <div class=" statBox statBox1" style="background-color:#aaa;">
                        <h2 style="text-align:center;">Honor Cost</h2>
                            <p style="text-align:center;"">
                            You are expected to use between:<br>
                            ${honor_spent_25.toLocaleString()} and ${honor_spent_75.toLocaleString()} Honor Exp<br><br>

                            <b>Median: ${honor_spent_median.toLocaleString()} Honor Exp
                            </p>
                            </p>
                    </div>
                    </div>
        `
                    }
                }
            }

            else {
                document.getElementById('result').style.display = '';
                document.getElementById('error-container').style.display = 'none';
                document.getElementById('result').innerHTML =
                    `
                    <div class="container secondarycon">
                        <div class=" statBox statBox1" style="background-color:#aaa;">
                            <h2 style="text-align:center;">Error</h2>
                                <p style="text-align:center;"">
                                    You have inputted an invalid combination of lines.<br />
                                You cannot have the same type of line appearing more than once.<br />
                                </p>
                        </div>
                    </div>
                        `

            }
        }
        loaderOn();
        setTimeout(loaderOff, 100);
    })
})