//here make a note on the main page that this assumes youre already legendary
let line_probabilities = {
    'rare': 0.8,
    'epic': 0.15,
    'unique': 0.05,
    "legendary": 1
}

let not_repeatable = ['passive_skill', 'att_speed']

let abilities_honor =
{
    'normal_dmg':
    {
        'epic': 0.025662,
        'unique': 0.017241,
        "legendary": 0.017761
    },
    'abnormal_dmg':
    {
        'epic': 0.025662,
        'unique': 0.017241,
        "legendary": 0.017761
    },
    'buff_duration':
    {
        'epic': 0.012831,
        'unique': 0.00862,
        "legendary": 0.00888
    },
    'item_drop':
    {
        'epic': 0.025662,
        'unique': 0.017241,
        "legendary": 0.017761
    },
    'meso_drop':
    {
        'epic': 0.025662,
        'unique': 0.017241,
        "legendary": 0.017761
    },
    'w_attk':
    {
        'epic': 0.017108,
        'unique': 0.012931,
        "legendary": 0.022202
    },
    'm_attk':
    {
        'epic': 0.017108,
        'unique': 0.012931,
        "legendary": 0.022202
    },
    'crit_rate':
    {
        'epic': 0,
        'unique': 0.00431,
        "legendary": 0.00444
    },
    'boss':
    {
        'epic': 0,
        'unique': 0.00862,
        "legendary": 0.022202
    },
    'att_speed':
    {
        'epic': 0,
        'unique': 0,
        "legendary": 0.00444
    },
    'passive_skill':
    {
        'epic': 0,
        'unique': 0,
        "legendary": 0.007104
    },
    'cd_skip':
    {
        'epic': 0,
        'unique': 0.017241,
        "legendary": 0.017761
    }
}

function honor_cost(lock_info) {
    if (lock_info == 0) return 10100
    else if (lock_info == 1) return 13100
    else if (lock_info == 2) return 18100
}

function reroll_or_lock(current_lines, desired_lines) {
    //arguments are lists length 3, ("m_attk*legendary", "meso_drop*unique", "N/A")

    lines = {
        1: false,
        2: false,
        3: false,
        'reroll': { "choice": true, "line": 2 },
        "line_probabilities": { 1: 0, 2: 0, 3: 0 },
        "lines": { 1: "N/A", 2: "N/A", 3: "N/A" },
        "locked_lines": 0,
        "line_types": [],
        'probabilities': [],
        'line_ranks': []
    }

    var line = 0
    var lines_to_roll = 3
    var line_probabilities = { 1: 0, 2: 0, 3: 0 }
    var desired_NAs = 0
    var locked_lines = 0
    var repeated_lock_check = []
    var repeated_roll_check = []
    var recorded_rank_type = { 0: false, 1: false, 2: false }
    var recorded_prob = { 0: false, 1: false, 2: false }

    while (line < 3) {
        var current_line = current_lines[line]
        var desired_line = 0
        while (desired_line < 3) {
            var index = desired_line + 1
            if (current_line == desired_lines[desired_line]) {
                lines[index] = true
                if (current_line != "N/A" && !repeated_lock_check.includes(index)) {
                    repeated_lock_check.push(index)
                    locked_lines++
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
                if (recorded_rank_type[desired_line] == false) {
                    lines.line_ranks.push(line_rank)
                    lines.line_types.push(line_type)
                    recorded_rank_type[desired_line] = true
                }
            }
            line_probabilities[index] = probability_for_desired_line
            if (recorded_prob[desired_line] == false) {
                if (probability_for_desired_line != 1) {
                    lines.probabilities.push(probability_for_desired_line)
                    recorded_prob[desired_line] = true
                }
            }
            desired_line++
        }

        line++
    }
    console.log("lines to roll: " + lines_to_roll)
    if (lines_to_roll == 0) return "done"
    else if (lines_to_roll == 1 || lines_to_roll == 2) {
        if (lines[2] || lines[3]) { //here fix this logic, circulators should be used to get the hardest one
            lines.reroll.choice = false
        }
        else {
            if (line_probabilities[2] > line_probabilities[3]) lines.reroll.line = 3
        }

    }
    else if (lines_to_roll == 3) {
        lines.reroll.choice = true
    }

    lines.locked_lines = locked_lines
    lines.line_probabilities = line_probabilities
    lines.desired_NAs = desired_NAs / 3

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
    else if (line_rank == "unique") var total = 40
    else if (line_rank == "legendary") var total = 43

    return (line_prob * total) / (total - locked_lines)
}

function probabilitySuccess(probabilities, line_ranks, line_types, locked_lines) { //here link_ranks must have legendary first if there is one
    var number_of_successful_outcomes = line_ranks.length
    var line_successes = {}

    if (number_of_successful_outcomes == 1) {
        var line_rank = line_ranks[0]
        var line_type = line_types[0]
        var rank_probability = line_probabilities[line_rank]
        var line_probability = probabilities[0]
        console.log(line_rank, line_type, rank_probability, line_probability)

        var original_line_success = getLineSuccess(line_rank, line_type, line_probability, rank_probability)
        var line_success = adjust_probability(line_rank, original_line_success, locked_lines)
        var line_failure = 1 - line_success

        if (line_ranks[0] == "legendary") {
            var p = line_success
        }
        else {
            var p = line_success + line_failure * adjust_probability(line_rank, original_line_success, locked_lines + 1)

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

        if (line_ranks[0] == "legendary") {
            if (not_repeatable.includes(line1_type)) {
                //12, 1 not2, 2 not1
                var case1 = line1_success * line2_success
                var case2 = line1_success * line2_failure
                var case3 = line1_failure * line2_success

                var p = case1 + case2 + case3
            }
            else {
                //12, 1 not2, 2 not1
                var case1 = line1_success * adjust_probability(line2_rank, original_line2_success, locked_lines + 1)
                var case2 = line1_success * (1 - adjust_probability(line2_rank, original_line2_success, locked_lines + 1))
                var case3 = line1_failure * adjust_probability(line2_rank, original_line2_success, locked_lines + 1)

                var p = case1 + case2 + case3
            }
        }

        else {
            //12, 1 not2, 2 not1
            var case1 = line1_success * adjust_probability(line2_rank, original_line2_success, locked_lines + 1) + line2_success * adjust_probability(line1_rank, original_line1_success, locked_lines + 1)
            var case2 = line1_success * (1 - adjust_probability(line2_rank, original_line2_success, locked_lines + 1)) + both_failure * adjust_probability(line1_rank, original_line1_success, locked_lines + 1)
            var case3 = line2_success * (1 - adjust_probability(line1_rank, original_line1_success, locked_lines + 1)) + both_failure * adjust_probability(line2_rank, original_line2_success, locked_lines + 1)

            var p = case1 + case2 + case3
        }

        line_successes[1] = case2
        line_successes[2] = case3
        line_successes.all = case1
    }
    if (number_of_successful_outcomes == 3) { //here
        var line1_rank = line_ranks[0]
        var line1_type = line_types[0]
        var rank1_probability = line_probabilities[line1_rank]
        var line1_probability = probabilities[0]

        var line2_rank = line_ranks[1]
        var line2_type = line_types[1]
        var rank2_probability = line_probabilities[line2_rank]
        var line2_probability = probabilities[1]

        var line3_rank = line_ranks[2]
        var line3_type = line_types[2]
        var rank3_probability = line_probabilities[line3_rank]
        var line3_probability = probabilities[2]

        //123, 12 not3, 13 not 2, 23 not 1, 1 not23, 2 not13, 3 not 12
        var case1
        var case2
        var case3
        var case4
        var case5
        var case6
        var case7

        var p = case1 + case2 + case3 + case4 + case5 + case6 + case7
    }
    return { p: p, line_successes: line_successes }

}

function pureHonorSpent(compare_lines) {
    var number_of_locked_lines = compare_lines.locked_lines
    var desired_NAs = compare_lines.desired_NAs
    var lines_to_roll = 3 - number_of_locked_lines - desired_NAs
    console.log("lines to roll: " + lines_to_roll, ", number of locked lines:" + number_of_locked_lines)

    var honor_spent = 0

    var line_rank_1 = compare_lines.lines[1]
    var line_rank_2 = compare_lines.lines[2]
    var line_rank_3 = compare_lines.lines[3]

    var all_probabilities = compare_lines.probabilities //line prob obj
    var all_line_ranks = compare_lines.line_ranks //line_ranks obj
    var all_line_types = compare_lines.line_types //line_types

    var probabilities = []
    var line_ranks = []
    var line_types = []

    var x = 1
    while (x < 4) {
        if (compare_lines[x] == false) {
            probabilities.push(all_probabilities[x - 1])
            line_ranks.push(all_line_ranks[x - 1])
            line_types.push(all_line_types[x - 1])
        }
        x++
    }
    console.log(line_ranks)

    if (lines_to_roll == 3) { //here
        var p = compare_lines.line_probabilities[1] + compare_lines.line_probabilities[2] + compare_lines.line_probabilities[3]
        var avg_rolls = 1 / p
        honor_spent += honor_cost(number_of_locked_lines) * avg_rolls

        var adj_line_1 = adjust_probability(line_rank_1, compare_lines.line_probabilities[1], number_of_locked_lines + 1)
        var adj_line_2 = adjust_probability(line_rank_2, compare_lines.line_probabilities[2], number_of_locked_lines + 1)
        var adj_line_3 = adjust_probability(line_rank_3, compare_lines.line_probabilities[3], number_of_locked_lines + 1)
        var new_p = (compare_lines.line_probabilities[1] / p) * (adj_line_2 + adj_line_3) + (compare_lines.line_probabilities[2] / p) * (adj_line_1 + adj_line_3) + (compare_lines.line_probabilities[3] / p) * (adj_line_2 + adj_line_1)
        avg_rolls = 1 / new_p
        honor_spent += honor_cost(number_of_locked_lines + 1) * avg_rolls

        var new_adj_line_1 = adjust_probability(line_rank_1, compare_lines.line_probabilities[1], number_of_locked_lines + 2)
        var new_adj_line_2 = adjust_probability(line_rank_2, compare_lines.line_probabilities[2], number_of_locked_lines + 2)
        var new_adj_line_3 = adjust_probability(line_rank_3, compare_lines.line_probabilities[3], number_of_locked_lines + 2)
        var case_one = (compare_lines.line_probabilities[1] / p) * (adj_line_2 / new_p) * new_adj_line_3 + (compare_lines.line_probabilities[1] / p) * (adj_line_3 / new_p) * new_adj_line_2
        var case_two = (compare_lines.line_probabilities[2] / p) * (adj_line_1 / new_p) * new_adj_line_3 + (compare_lines.line_probabilities[2] / p) * (adj_line_3 / new_p) * new_adj_line_1
        var case_three = (compare_lines.line_probabilities[3] / p) * (adj_line_2 / new_p) * new_adj_line_1 + (compare_lines.line_probabilities[3] / p) * (adj_line_1 / new_p) * new_adj_line_2
        avg_rolls = 1 / (case_one + case_two + case_three)
        honor_spent += honor_cost(number_of_locked_lines + 2) * avg_rolls
    }
    if (lines_to_roll == 2) {
        var success_info = probabilitySuccess(probabilities, line_ranks, line_types, number_of_locked_lines)
        var p = success_info.p
        var avg_rolls = 1 / p
        honor_spent += honor_cost(number_of_locked_lines) * avg_rolls

        var outcome_1 = probabilitySuccess([probabilities[0]], [line_ranks[0]], [line_types[0]], number_of_locked_lines + 1).p //line 2 previously successful
        var outcome_2 = probabilitySuccess([probabilities[1]], [line_ranks[1]], [line_types[1]],number_of_locked_lines + 1).p // line 1 previously successful
        var new_p = (success_info.line_successes[2] / p) * (outcome_1) + (success_info.line_successes[1] / p) * (outcome_2) + (success_info.line_successes.all) / p

        console.log(outcome_1, outcome_2, new_p)
        avg_rolls = 1 / new_p
        honor_spent += honor_cost(number_of_locked_lines + 1) * avg_rolls
    }
    if (lines_to_roll == 1) {
        var p = probabilitySuccess(probabilities, line_ranks, line_types, number_of_locked_lines).p
        var avg_rolls = 1 / p
        honor_spent += honor_cost(number_of_locked_lines) * avg_rolls
    }
    return honor_spent
}

function run_calculation(current_lines, desired_lines, only_honor) {
    var compare_lines = reroll_or_lock(current_lines, desired_lines)
    console.log(compare_lines)
    if (compare_lines == "done") {
        console.log("No computation needed.")
        return 0
    }
    var reroll_choice = compare_lines.reroll.choice
    if (only_honor) reroll_choice = false

    if (reroll_choice) {
        line_to_roll = compare_lines.reroll.line
    }
    else {
        var honor_spent = Math.ceil(pureHonorSpent(compare_lines))
    }
    return honor_spent
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

function geoDistrQuantile(p) {
    var mean = 1 / p

    var median = Math.log(1 - 0.5) / Math.log(1 - p)
    var seventy_fifth = Math.log(1 - 0.75) / Math.log(1 - p)
    var eighty_fifth = Math.log(1 - 0.85) / Math.log(1 - p)
    var nintey_fifth = Math.log(1 - 0.95) / Math.log(1 - p)

    return { mean: mean, median: median, seventy_fifth: seventy_fifth, eighty_fifth: eighty_fifth, nintey_fifth: nintey_fifth }
}

function isValidCombination(current_lines, desired_lines) {
    var i = 0
    var current_line_types = []
    var desired_line_types = []
    while (i < 3) {
        if (current_lines[i] != "N/A") {
            var line_type = current_lines[i].substring(0, current_lines[i].indexOf('*'))
            if (current_line_types.includes(line_type)) return false
            else current_line_types.push(line_type)
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

    return true
}

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        $("#toast").toast('show')
    }, 1000)
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

            var isValid = isValidCombination(current_lines, desired_lines)

            if (isValid) {
                var only_honor = document.getElementById("only_honor").checked
                var fifty_off = false //here fix this

                var targetted_line //here identify which line to target with circulators

                var expected_honor = run_calculation(current_lines, desired_lines, only_honor)
                var expected_circulators = 0 //here

                console.log(expected_honor)

                if (fifty_off == true) {
                    expected_honor = Math.ceil(expected_honor / 2)
                }

                document.getElementById('result').style.display = '';
                document.getElementById('error-container').style.display = 'none';
                document.getElementById('result').innerHTML =
                    `
                    <div class="container secondarycon">
                    <div class=" statBox statBox1" style="background-color:#aaa;">
                        <h2 style="text-align:center;">Results</h2>
                            <p style="text-align:center;"">
                                Expected Miracle Circulators: ${expected_circulators.toLocaleString()}<br />
                            Expected Honor Exp: ${expected_honor.toLocaleString()}<br />
                            </p>
                    </div>
                    </div>
        `
            }

            else {
                document.getElementById('result').style.display = '';
                document.getElementById('error-container').style.display = 'none';
                document.getElementById('result').innerHTML =
                    `
                    <div class="container secondarycon">
                    <div class=" statBox statBox1" style="background-color:#aaa;">
                        <h2 style="text-align:center;">Results</h2>
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