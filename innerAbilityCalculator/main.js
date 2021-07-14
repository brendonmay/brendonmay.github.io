//lines
let abilities_honor =
{
    'normal_dmg':
    {
        'epic_only': 0.025662,
        'epic': 0.025662 + 0.017241,
        'unique': 0.017241,
        "legendary": 0.017761
    },
    'abnormal_dmg':
    {
        'epic_only': 0.025662,
        'epic': 0.025662 + 0.017241,
        'unique': 0.017241,
        "legendary": 0.017761
    },
    'buff_duration':
    {
        'epic_only': 0.012831,
        'epic': 0.012831 + 0.008622,
        'unique': 0.00862,
        "legendary": 0.00888
    },
    'item_drop':
    {
        'epic_only': 0.025662,
        'epic': 0.025662 + 0.017241,
        'unique': 0.017241,
        "legendary": 0.017761
    },
    'meso_drop':
    {
        'epic_only': 0.025662,
        'epic': 0.025662 + 0.017241,
        'unique': 0.017241,
        "legendary": 0.017761
    },
    'w_attk':
    {
        'epic_only': 0.017108,
        'epic': 0.017108 + 0.012931,
        'unique': 0.012931,
        "legendary": 0.022202
    },
    'm_attk':
    {
        'epic_only': 0.017108,
        'epic': 0.017108 + 0.012931,
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
    if (lock_info == "none") return 100
    else if (lock_info == "rank_lock") return 10100
    else if (lock_info == "rank_and_line") return 13100
    else if (lock_info == "rank_and_two_line") return 18100
}

function adjust_probability(line_rank, line_prob, locked_lines) {
    if (line_rank == "rare") var total = 31
    else if (line_rank == "epic") var total = 34
    else if (line_rank == "unique") var total = 40
    else if (line_rank == "legendary") var total = 43

    return (line_prob * total) / (total - locked_lines)
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
        "locked_lines": 0
    }

    var line = 0
    var lines_to_roll = 3
    var line_probabilities = { 1: 0, 2: 0, 3: 0 }
    var desired_NAs = 0

    while (line < 3) {
        var current_line = current_lines[line]
        var desired_line = 0
        while (desired_line < 3) {
            var index = desired_line + 1
            if (current_line == desired_lines[desired_line]) {
                lines_to_roll--
                if (current_line != "N/A") {
                    lines[index] = true
                }
                else lines[index] = "N/A"
            }
            if (desired_lines[desired_line] == "N/A") {
                var probability_for_desired_line = 1
                lines[index] = true
                desired_NAs++
            }
            else {
                var line_type = desired_lines[desired_line].substring(0, desired_lines[desired_line].indexOf('*'))
                var line_rank = desired_lines[desired_line].substring(desired_lines[desired_line].indexOf('*') + 1, desired_lines[desired_line].length)
                var probability_for_desired_line = abilities_honor[line_type][line_rank]
                lines.lines[index] = line_rank
            }
            line_probabilities[index] = probability_for_desired_line
            desired_line++
        }
        line++
    }
    if (lines_to_roll == 0 || lines_to_roll - desired_NAs/3 == 0) return "done"
    else if (lines_to_roll == 1 || lines_to_roll == 2) {
        if (lines[2] || lines[3]) {
            lines['reroll'] = false
        }
        else {
            if (line_probabilities[2] > line_probabilities[3]) lines.reroll.line = 3
        }

    }
    else if (lines_to_roll == 3) {
        lines['reroll'] = true
    }

    lines.locked_lines = 3 - lines_to_roll
    lines.line_probabilities = line_probabilities
    lines.desired_NAs = desired_NAs/3

    return lines
}

function pureHonorSpent(compare_lines) {
    var number_of_locked_lines = compare_lines.locked_lines
    var desired_NAs = compare_lines.desired_NAs
    var lines_to_roll = 3 - number_of_locked_lines - desired_NAs

    var honor_spent = 0

    var line_rank_1 = compare_lines.lines[1]
    var line_rank_2 = compare_lines.lines[2]
    var line_rank_3 = compare_lines.lines[3]
    if (lines_to_roll == 3) {
        var p = compare_lines.line_probabilities[1] + compare_lines.line_probabilities[2] + compare_lines.line_probabilities[3]
        var avg_rolls = 1 / p
        console.log(avg_rolls)
        honor_spent += honor_cost("rank_lock") * avg_rolls

        var adj_line_1 = adjust_probability(line_rank_1, compare_lines.line_probabilities[1], 1)
        var adj_line_2 = adjust_probability(line_rank_2, compare_lines.line_probabilities[2], 1)
        var adj_line_3 = adjust_probability(line_rank_3, compare_lines.line_probabilities[3], 1)
        var new_p = (compare_lines.line_probabilities[1] / p) * (adj_line_2 + adj_line_3) + (compare_lines.line_probabilities[2] / p) * (adj_line_1 + adj_line_3) + (compare_lines.line_probabilities[3] / p) * (adj_line_2 + adj_line_1)
        avg_rolls = 1 / new_p
        console.log(avg_rolls)
        honor_spent += honor_cost("rank_and_line") * avg_rolls

        var new_adj_line_1 = adjust_probability(line_rank_1, compare_lines.line_probabilities[1], 2)
        var new_adj_line_2 = adjust_probability(line_rank_2, compare_lines.line_probabilities[2], 2)
        var new_adj_line_3 = adjust_probability(line_rank_3, compare_lines.line_probabilities[3], 2)
        var case_one = (compare_lines.line_probabilities[1] / p) * (adj_line_2 / new_p) * new_adj_line_3 + (compare_lines.line_probabilities[1] / p) * (adj_line_3 / new_p) * new_adj_line_2
        var case_two = (compare_lines.line_probabilities[2] / p) * (adj_line_1 / new_p) * new_adj_line_3 + (compare_lines.line_probabilities[2] / p) * (adj_line_3 / new_p) * new_adj_line_1
        var case_three = (compare_lines.line_probabilities[3] / p) * (adj_line_2 / new_p) * new_adj_line_1 + (compare_lines.line_probabilities[3] / p) * (adj_line_1 / new_p) * new_adj_line_2
        avg_rolls = 1 / (case_one + case_two + case_three)
        console.log(avg_rolls)
        honor_spent += honor_cost("rank_and_two_line") * avg_rolls
    }
    if (lines_to_roll == 2) {
        var line_one
        var line_two
        if (compare_lines[1] == true) {
            line_one = 2
            line_two = 3

            line_rank_1 = compare_lines.lines[2]
            line_rank_2 = compare_lines.lines[3]
        }
        else if (compare_lines[2] == true) {
            line_one = 1
            line_two = 3

            line_rank_1 = compare_lines.lines[1]
            line_rank_2 = compare_lines.lines[3]
        }
        else {
            line_one = 1
            line_two = 2

            line_rank_1 = compare_lines.lines[1]
            line_rank_2 = compare_lines.lines[2]
        }
        var adj_line_1 = adjust_probability(line_rank_1, compare_lines.line_probabilities[line_one], 1)
        var adj_line_2 = adjust_probability(line_rank_2, compare_lines.line_probabilities[line_two], 1)

        var p = adj_line_1 + adj_line_2
        var avg_rolls = 1 / p
        honor_spent += honor_cost("rank_and_line") * avg_rolls

        var new_adj_line_1 = adjust_probability(line_rank_1, compare_lines.line_probabilities[line_one], 2)
        var new_adj_line_2 = adjust_probability(line_rank_2, compare_lines.line_probabilities[line_two], 2)
        var new_p = (compare_lines.line_probabilities[line_one] / p) * (new_adj_line_2) + (compare_lines.line_probabilities[line_two] / p) * (new_adj_line_1)
        avg_rolls = 1 / new_p
        honor_spent += honor_cost("rank_and_two_line") * avg_rolls
    }
    if (lines_to_roll == 1) {
        var line_one
        if (compare_lines[1] == false) {
            line_one = 1
            line_rank_1 = compare_lines.lines[1]
        }
        else if (compare_lines[2] == false) {
            line_one = 2
            line_rank_1 = compare_lines.lines[2]
        }
        else {
            line_one = 3
            line_rank_1 = compare_lines.lines[3]
        }
        var adj_line_1 = adjust_probability(line_rank_1, compare_lines.line_probabilities[line_one], 2)
        var avg_rolls = 1 / adj_line_1
        honor_spent += honor_cost("rank_and_two_line") * avg_rolls
    }
    //here make sure this is working when N/A is thrown into the mix
    return honor_spent
}

function run_calculation(current_lines, desired_lines, only_honor) {
    var compare_lines = reroll_or_lock(current_lines, desired_lines)
    if (compare_lines == "done") {
        //we are done, nothing to compute
        return 0
    }
    console.log(compare_lines)
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

//test
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

            var only_honor = document.getElementById("only_honor").checked
            var fifty_off = false //here fix this

            var targetted_line //here identify which line to target with circulators

            var current_lines = [line_1, line_2, line_3]
            var desired_lines = [desired_line_1, desired_line_2, desired_line_3]

            var expected_honor = run_calculation(current_lines, desired_lines, only_honor)
            var expected_circulators = 0 //here

            console.log(expected_honor)

            if (fifty_off == true) {
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
        loaderOn();
        setTimeout(loaderOff, 100);
    })
})

