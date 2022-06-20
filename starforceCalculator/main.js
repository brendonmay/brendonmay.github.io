// Returns the value at a given percentile in a sorted numeric array.
// "Linear interpolation between closest ranks" method
function loaderOn() {
    $('#loader1').show();
    $('#loader2').show();
    setTimeout(do_stuff, 100);
  }

  function loaderOff() {
    $('#loader1').hide();
    $('#loader2').hide()
  }

function percentile(arr, p) {
    if (arr.length === 0) return 0;
    if (typeof p !== 'number') throw new TypeError('p must be a number');
    if (p <= 0) return arr[0];
    if (p >= 1) return arr[arr.length - 1];

    var index = (arr.length - 1) * p,
        lower = Math.floor(index),
        upper = lower + 1,
        weight = index % 1;

    if (upper >= arr.length) return arr[lower];
    return arr[lower] * (1 - weight) + arr[upper] * weight;
}

// Returns the percentile of the given value in a sorted numeric array.
function percentRank(arr, v) {
    if (typeof v !== 'number') throw new TypeError('v must be a number');
    for (var i = 0, l = arr.length; i < l; i++) {
        if (v <= arr[i]) {
            while (i < l && v === arr[i]) i++;
            if (i === 0) return 0;
            if (v !== arr[i - 1]) {
                i += (v - arr[i - 1]) / (arr[i] - arr[i - 1]);
            }
            return i / l;
        }
    }
    return 1;
}

function standardDeviation(values) {
    var avg = average(values);

    var squareDiffs = values.map(function(value) {
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });

    var avgSquareDiff = average(squareDiffs);

    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}

function average(data) {
    var sum = data.reduce(function(sum, value) {
        return sum + value;
    }, 0);

    var avg = sum / data.length;
    return avg;
}

function median(values) {

    values.sort(function(a, b) {
        return a - b;
    });

    var half = Math.floor(values.length / 2);

    if (values.length % 2)
        return values[half];
    else
        return (values[half - 1] + values[half]) / 2.0;
}

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

function gmsCost(current_star, item_level) {
    // The GMS starforce changes in Destiny just multiplied the costs by 0.78 for all the parts where we were paying extra.
    if (current_star >= 20) {
        return 0.78 * (1000 + item_level ** 3 * ((current_star + 1) ** 2.7) / 100);
    }
    if (current_star >= 18) {
        return 0.78 * (1000 + item_level ** 3 * ((current_star + 1) ** 2.7) / 110);
    }
    if (current_star >= 15) {
        return 0.78 * (1000 + item_level ** 3 * ((current_star + 1) ** 2.7) / 120);
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
const SERVER_COST_FUNCTIONS = {
    "gms": gmsCost,
    "kms": kmsCost,
    "tms": tmsRegCost,
    "tmsr": tmsRebootCost,
}

function getBaseCost(server, current_star, item_level) {
    const costFn = SERVER_COST_FUNCTIONS[server];
    const attempt_cost = costFn(current_star, item_level);
    // The game rounds to the nearest 100.
    return Math.round(attempt_cost / 100) * 100;
}

function attemptCost(current_star, item_level, boom_protect, thirty_off, sauna, silver, gold, diamond, five_ten_fifteen, chance_time, item_type, server) {
    if (item_type == "tyrant"){
        var attempt_cost = item_level**3.56;
        return parseFloat(attempt_cost.toFixed(0))
    }
    else{
        var multiplier = 1;

        if (boom_protect && !(five_ten_fifteen && current_star == 15) && !(chance_time)) {
            if (sauna) {
                if (current_star >= 15 && current_star <= 16) {
                    multiplier = multiplier + 1;
                }
            }
            else {
                if (current_star >= 12 && current_star <= 16) {
                    multiplier = multiplier + 1;
                }
            }
        }
        if (silver && current_star <= 15) {
            multiplier = multiplier - 0.03;
        }
        if (gold && current_star <= 15) {
            multiplier = multiplier - 0.05;
        }
        if (diamond && current_star <= 15) {
            multiplier = multiplier - 0.1;
        }
        if (thirty_off) {
            multiplier = multiplier - 0.3;
        }
        const attempt_cost = getBaseCost(server, current_star, item_level) * multiplier;
        return parseFloat(attempt_cost.toFixed(0))
    }
}

function checkChanceTime(decrease_count) {
    return decrease_count == 2
}

function determineOutcome(current_star, rates, star_catch, boom_protect, five_ten_fifteen, sauna, item_type) {
    /** returns either "Success", "Maintain", "Decrease", or "Boom" */
    if (five_ten_fifteen) {
        if (current_star == 5 || current_star == 10 || current_star == 15) {
            return "Success"
        }
    }

    var outcome = Math.random();

    var probability_success = rates[current_star][0];
    var probability_maintain = rates[current_star][1];
    var probability_decrease = rates[current_star][2];
    var probability_boom = rates[current_star][3];

    if (sauna) {
        if ((current_star >= 12 && current_star <= 14) || (item_type == 'tyrant' && (current_star >= 5 && current_star <= 7))) {
            probability_decrease = probability_decrease + probability_boom;
            probability_boom = 0;
        }
    }
    if (boom_protect && current_star <= 16) { //boom protection enabled
        probability_decrease = probability_decrease + probability_boom;
        probability_boom = 0;
    }

    if (star_catch) { //star catch adjustment
        probability_success = probability_success * 1.045;
        var left_over = 1 - probability_success;

        if (probability_decrease == 0) {
            probability_maintain = probability_maintain * (left_over) / (probability_maintain + probability_boom);
            probability_boom = left_over - probability_maintain;
            //console.log('prob of maintain = ' + probability_maintain + ' and prob of boom = ' + probability_boom);


        } else {
            probability_decrease = probability_decrease * (left_over) / (probability_decrease + probability_boom);
            probability_boom = left_over - probability_decrease;
            //console.log('prob of decrease = ' + probability_decrease + ' and prob of boom = ' + probability_boom);
        }
    }
    if (outcome <= probability_success) {
        //console.log("Success");
        return "Success"
    } else if (probability_success < outcome && outcome < probability_success + probability_maintain) {
        //console.log("Maintain");
        return "Maintain"
    } else if (probability_success + probability_maintain < outcome && outcome < probability_success + probability_maintain + probability_decrease) {
        //console.log("Decrease");
        return "Decrease"
    } else if (probability_success + probability_maintain + probability_decrease < outcome && outcome < probability_success + probability_maintain + probability_decrease + probability_boom) {
        //console.log("Boom");
        return "Boom"
    } else {
        //console.log("Case not caputured");
        return "Success"
    }
}

function performExperiment(current_stars, desired_star, rates, item_level, boom_protect, thirty_off, star_catch, five_ten_fifteen, sauna, silver, gold, diamond, item_type, two_plus, useAEE, server) {
    /** returns [total_mesos, total_booms]  or [AEE_amount, total_booms]*/
    var current_star = current_stars;
    var total_mesos = 0;
    var total_booms = 0;
    var decrease_count = 0;

    while (current_star < desired_star) {
        if (useAEE){
            total_mesos++;
            var chanceTime = false;
        }
        else{
            var chanceTime = checkChanceTime(decrease_count); 
            total_mesos = total_mesos + attemptCost(current_star, item_level, boom_protect, thirty_off, sauna, silver, gold, diamond, five_ten_fifteen, chanceTime, item_type, server);
        }

        if (chanceTime) {
            var outcome = "Success";
            decrease_count = 0;
            if (two_plus && current_star <= 10){
                current_star = current_star + 2;
            }
            else{
                current_star++
            }
        } 
        else {
            var outcome = determineOutcome(current_star, rates, star_catch, boom_protect, five_ten_fifteen, sauna, item_type);

            if (outcome == "Success") {
                decrease_count = 0;
                if (two_plus && current_star <= 10){
                    current_star = current_star + 2;
                }
                else{
                    current_star++
                }
            } else if (outcome == "Decrease") {
                decrease_count++;
                current_star--;
            } else if (outcome == "Maintain") {
                decrease_count = 0;
            } else if (outcome == "Boom" && item_type == 'normal') {
                decrease_count = 0;
                current_star = 12;
                total_booms++;
            } else if (outcome == "Boom" && item_type == 'tyrant') {
                decrease_count = 0;
                current_star = 0;
                total_booms++;
            }
        }
    }

    return [total_mesos, total_booms]
}

function repeatExperiment(total_trials, current_star, desired_star, rates, item_level, boom_protect, thirty_off, star_catch, five_ten_fifteen, sauna, silver, gold, diamond, item_type, two_plus, useAEE, server) {
    //* return [average_cost, average_booms, meso_result_list, boom_result_list] */
    var total_mesos = 0;
    var total_booms = 0;
    var current_trial = 0;
    var meso_result_list = [];
    var boom_result_list = [];
    var meso_result_list_divided = [];

    while (current_trial < total_trials) {
        var trial_mesos = performExperiment(current_star, desired_star, rates, item_level, boom_protect, thirty_off, star_catch, five_ten_fifteen, sauna, silver, gold, diamond, item_type, two_plus, useAEE, server)[0];
        meso_result_list.push(trial_mesos);
        meso_result_list_divided.push(trial_mesos / 1000000000);

        var trial_booms = performExperiment(current_star, desired_star, rates, item_level, boom_protect, thirty_off, star_catch, five_ten_fifteen, sauna, silver, gold, diamond, item_type, two_plus, useAEE, server)[1];
        boom_result_list.push(trial_booms);

        total_mesos = total_mesos + trial_mesos;
        total_booms = total_booms + trial_booms;
        current_trial++;
    }
    var average_cost = parseFloat((total_mesos / total_trials).toFixed(0));
    var average_booms = parseFloat((total_booms / total_trials).toFixed(2));

    var median_cost = median(meso_result_list);
    var median_booms = median(boom_result_list);

    var max_cost = Math.max.apply(Math, meso_result_list);
    var max_booms = Math.max.apply(Math, boom_result_list);

    var min_cost = Math.min.apply(Math, meso_result_list);
    var min_booms = Math.min.apply(Math, boom_result_list);

    var meso_std = 0 //parseFloat(standardDeviation(meso_result_list).toFixed(0));
    var boom_std = 0 //parseFloat(standardDeviation(boom_result_list).toFixed(2));

    return [average_cost, average_booms, meso_result_list, boom_result_list, median_cost, median_booms, max_cost, min_cost, max_booms, min_booms, meso_std, boom_std, meso_result_list_divided]
}
//(successRate, maintainRate, decreaseRate, boomRate)

function do_stuff() {
    var rates = [
        [0.95, 0.05, 0, 0], //0 stars
        [0.9, 0.1, 0, 0], //1 stars
        [0.85, 0.15, 0, 0], //2 stars
        [0.85, 0.15, 0, 0], //3 stars
        [0.80, 0.2, 0, 0], //4 stars
        [0.75, 0.25, 0, 0], //5 stars
        [0.7, 0.3, 0, 0], //6 stars
        [0.65, 0.35, 0, 0], //7 stars
        [0.6, 0.4, 0, 0], //8 stars
        [0.55, 0.45, 0, 0], //9 stars
        [0.5, 0.5, 0, 0], //10 stars
        [0.45, 0, 0.55, 0], //11 stars
        [0.4, 0.0, 0.594, 0.006], //12 stars
        [0.35, 0.0, 0.637, 0.013], //13 stars
        [0.3, 0.0, 0.686, 0.014], //14 stars
        [0.3, 0.679, 0, 0.021], //15 stars
        [0.3, 0.0, 0.679, 0.021], //16 stars
        [0.3, 0.0, 0.679, 0.021], //17 stars
        [0.3, 0.0, 0.672, 0.028], //18 stars
        [0.3, 0.0, 0.672, 0.028], //19 stars
        [0.3, 0.63, 0, 0.07], //20 stars
        [0.3, 0, 0.63, 0.07], //21 stars
        [0.03, 0.0, 0.776, 0.194], //22 stars
        [0.02, 0.0, 0.686, 0.294], //23 stars
        [0.01, 0.0, 0.594, 0.396] //24 stars
    ]

    let item_level = parseInt(document.getElementById('level').value);
    let item_type = document.getElementById('item_type').value;
    let current_star = parseInt(document.getElementById('cur_stars').value);
    let desired_star = parseInt(document.getElementById('target_stars').value);
    
    if (item_type == 'normal' && (desired_star > 25 || desired_star < 0 || current_star < 0)){
    		document.getElementById('result').style.display='none';
        document.getElementById('graphhere').style.display='none';
        document.getElementById('error-container').style.display='';
        document.getElementById('error-msg').innerHTML =
            `<p style="color:#8b3687">Error: Minimum Star Value is 0 and Maximum Star Value is 25.</p>`
        return false
    }
    if (item_type == 'tyrant' && (desired_star > 15 || desired_star < 0 || current_star < 0)){
    		document.getElementById('result').style.display='none';
        document.getElementById('graphhere').style.display='none';
        document.getElementById('error-container').style.display='';
        document.getElementById('error-msg').innerHTML =
            `<p style="color:#8b3687">Error: Minimum Star Value is 0 and Maximum Star Value is 15.</p>`
        return false
    }
    var boom_protect = document.getElementById('safeguard').value == 'yes';
    var star_catch_value = document.getElementById('starcatching').value;
    var mvp = document.getElementById('mvp').value;
    var total_trials = document.getElementById('trials').value;
    var thirty_off = document.getElementById('30').checked;
    var five_ten_fifteen = document.getElementById('5_10_15').checked;
    var sauna = document.getElementById('sauna').checked;
    var two_plus = document.getElementById('plus2').checked;
    var useAEE = document.getElementById('AEE').checked;
    let server = document.getElementById('server').value;

    var silver = false;
    var gold = false;
    var diamond = false;
    var star_catch = false;

    if (item_type == 'tyrant'){
        if(useAEE){
            rates = [ 
                [1, 0, 0, 0], //0 stars
                [0.9, 0.1, 0, 0], //1 stars
                [0.8, 0.2, 0, 0], //2 stars
                [0.7, 0.3, 0, 0], //3 stars
                [0.6, 0.4, 0, 0], //4 stars
                [0.5, 0.5, 0, 0], //5 stars
                [0.4, 0.6, 0, 0], //6 stars
                [0.3, 0.7, 0, 0], //7 stars
                [0.2, 0.8, 0, 0], //8 stars
                [0.1, 0.9, 0, 0], //9 stars
                [0.05, 0.95, 0, 0], //10 stars
                [0.04, 0.96, 0, 0], //11 stars
                [0.03, 0.97, 0, 0], //12 stars
                [0.02, 0.98, 0, 0], //13 stars
                [0.01, 0.99, 0, 0], //14 stars
            ]
        }
        else{
            rates = [
                [0.5, 0.5, 0, 0], //0 stars
                [0.5, 0, 0.5, 0], //1 stars
                [0.45, 0, 0.55, 0], //2 stars
                [0.4, 0, 0.6, 0], //3 stars
                [0.4, 0, 0.6, 0], //4 stars
                [0.4, 0, 0.582, 0.018], //5 stars
                [0.4, 0, 0.57, 0.03], //6 stars
                [0.4, 0, 0.558, 0.042], //7 stars
                [0.4, 0, 0.54, 0.06], //8 stars
                [0.37, 0, 0.5355, 0.0945], //9 stars
                [0.35, 0, 0.52, 0.13], //10 stars
                [0.35, 0, 0.4875, 0.1625], //11 stars
                [0.03, 0, 0.485, 0.485], //12 stars
                [0.02, 0, 0.49, 0.49], //13 stars
                [0.01, 0, 0.495, 0.495], //14 stars
            ]
        }
    }

    if (star_catch_value == "mult") {
        star_catch = true;
    }
    if (mvp == "silver") {
        silver = true;
    }
    if (mvp == "gold") {
        gold = true;
    }
    if (mvp == "diamond") {
        diamond = true;
    }
		
    var result = repeatExperiment(total_trials, current_star, desired_star, rates, item_level, boom_protect, thirty_off, star_catch, five_ten_fifteen, sauna, silver, gold, diamond, item_type, two_plus, useAEE, server);
    //result = [average_cost, average_booms, meso_result_list, boom_result_list, median_cost, median_booms, max_cost, min_cost, max_booms, min_booms, meso_std, boom_std, meso_result_list_divided]
    var average_mesos = result[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var average_booms = result[1];

    var median_cost = result[4].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var median_booms = result[5];

    var meso_result_list = result[2];
    var meso_result_list_divided = result[12];
    var boom_result_list = result[3];

    var max_cost = result[6].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var min_cost = result[7].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var max_booms = result[8];
    var min_booms = result[9];

    var seventy_fifth_percentile = (percentile(meso_result_list, 0.75).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var eighty_fifth_percentile = (percentile(meso_result_list, 0.85).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var ninty_fifth_percentile = (percentile(meso_result_list, 0.95).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var seventy_fifth_percentile_boom = (percentile(boom_result_list, 0.75).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var eighty_fifth_percentile_boom = (percentile(boom_result_list, 0.85).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var ninty_fifth_percentile_boom = (percentile(boom_result_list, 0.95).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (useAEE){ //here
        var x_axis = 'Number of AEEs';
        var bar_data = meso_result_list;
        var stat_title = 'AEE Stats';
        var percentile_title = 'AEE Percentiles';
        var currency = 'AEEs'
    }
    else{
        var x_axis = 'Meso Cost (in Billions)';
        var bar_data = meso_result_list_divided;
        var stat_title = 'Mesos Stats';
        var percentile_title = 'Mesos Percentiles';
        var currency = 'mesos'
    }
    Highcharts.chart('container', {
        title: {
            text: 'Frequency Histogram'
        },

        xAxis: [{
            title: {
                text: ''
            },
            alignTicks: false,
            visible: false,
            opposite: true
        }, {
            title: {
                text: x_axis
            },
            alignTicks: false,
            opposite: false
        }],

        yAxis: [{
            title: {
                text: ''
            },
            visible: false,
            opposite: true
        }, {
            title: {
                text: 'Frequency'
            },
            opposite: false
        }],

        plotOptions: {
            histogram: {
                accessibility: {
                    pointDescriptionFormatter: function(point) {
                        var ix = point.index + 1,
                            x1 = point.x.toFixed(3),
                            x2 = point.x2.toFixed(3),
                            val = point.y;
                        return ix + '. ' + x1 + ' to ' + x2 + ', ' + val + '.';
                    }
                }
            }
        },

        series: [{
            name: 'Histogram',
            type: 'histogram',
            color: '#8b3687',
            xAxis: 1,
            yAxis: 1,
            baseSeries: 's1',
            zIndex: -1
        }, {
            name: '',
            type: 'scatter',
            visible: false,
            data: bar_data,
            id: 's1',
            marker: {
                radius: 0
            }
        }]
    });
		document.getElementById("graphhere").style.display = '';
    document.getElementById('result').style.display='';
    document.getElementById('error-container').style.display='none';

    if(!useAEE){
        document.getElementById('result').innerHTML =
        `
<div class="container secondarycon">
  <div class=" statBox statBox1" style="background-color:#aaa;">
    <h2 style="text-align:center;">${stat_title}</h2>
    	<p style="text-align:center;"">
    		Average cost: ${average_mesos}<br />
        Median cost: ${median_cost}<br />
        Range of cost: ${min_cost} - ${max_cost}<br />
    	</p>
  </div>
  <div class=" statBox statBox2" style="background-color:#bbb;">
    <h2 style="text-align:center;">${percentile_title}</h2>
    <p style="text-align:center;"">
    	75% chance within ${seventy_fifth_percentile} ${currency}<br />
    	85% chance within ${eighty_fifth_percentile} ${currency}<br />
    	95% chance within ${ninty_fifth_percentile} ${currency}<br />
    </p>
  </div>
  
  <div class=" statBox statBox3" style="background-color:#aaa;">
    <h2 style="text-align:center;"">Boom Stats</h2>
    	<p style="text-align:center;"">
    		Average booms: ${average_booms}<br />
    		Median booms: ${median_booms}<br />
    		Range of booms: ${min_booms} - ${max_booms}<br />
    	</p>
  </div>
  <div class=" statBox statBox4" style="background-color:#bbb;">
    <h2 style="text-align:center;">Boom Percentiles</h2>
    <p style="text-align:center;"">
    	75% chance within ${seventy_fifth_percentile_boom} booms<br />
    	85% chance within ${eighty_fifth_percentile_boom} booms<br />
    	95% chance within ${ninty_fifth_percentile_boom} booms<br />
    </p>
  </div>
</div>
    `
    }
    else{
        document.getElementById('result').innerHTML =
        `
<div class="container secondarycon">
  <div class=" statBox statBox1" style="background-color:#aaa;">
    <h2 style="text-align:center;">${stat_title}</h2>
    	<p style="text-align:center;"">
    		Average cost: ${average_mesos}<br />
        Median cost: ${median_cost}<br />
        Range of cost: ${min_cost} - ${max_cost}<br />
    	</p>
  </div>
  <div class=" statBox statBox2" style="background-color:#bbb;">
    <h2 style="text-align:center;">${percentile_title}</h2>
    <p style="text-align:center;"">
    	75% chance within ${seventy_fifth_percentile} ${currency}<br />
    	85% chance within ${eighty_fifth_percentile} ${currency}<br />
    	95% chance within ${ninty_fifth_percentile} ${currency}<br />
    </p>
  </div>
</div>
    `
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculateButton").addEventListener("click", function() {
        loaderOn();
      setTimeout(loaderOff, 100);
    });
    setTimeout(function(){
        $("#toast").toast('show')
      }, 1000)
    //add event listener for when AEE is clicked, disable starcatching (no star catching)
    document.getElementById('AEE').addEventListener('change', function(){
        if (document.getElementById('AEE').checked){
            document.getElementById('starcatching').disabled = true;
            document.getElementById('starcatching').value = 'none';
            document.getElementById('sauna').checked = false;
            document.getElementById('sauna').disabled = true;
            document.getElementById('trials').value = 10000;

        }
        else{
            document.getElementById('starcatching').disabled = false;
            document.getElementById('sauna').disabled = false;
            document.getElementById('trials').value = 1000;
        }
    })
    $('#item_type').on('change', function() {
        if (document.getElementById("tyrant").selected){
            //enable AEE checkbox to be clicked
            document.getElementById('AEE').disabled = false;
            document.getElementById("safeguard").disabled = true;
            document.getElementById("safeguard").value = 'no';
    
            document.getElementById("mvp").disabled = true;
            document.getElementById("mvp").value = 'none';
    
            document.getElementById("level").disabled = true;
            document.getElementById("level").value = 150;
    
            document.getElementById("5_10_15").disabled = true;
            document.getElementById("5_10_15").checked = false;
    
            document.getElementById("30").disabled = true;
            document.getElementById("30").checked = false;

            document.getElementById('target_stars').value = 12;
    
            // document.getElementById("sauna").disabled = true;
            // document.getElementById("sauna").checked = false;
            document.getElementById("sauna-text").innerText="No Boom Event (Up to 8 stars) ";
    
            document.getElementById("plus2").disabled = true;
            document.getElementById("plus2").checked = false;
                    document.getElementById('error-container').style.display = '';
            document.getElementById('error-msg').innerHTML =
                `<p style="color:#8b3687">Note: Getting above 12 stars on Tyrant gear is nearly impossible. The calculator may crash if you attempt going above 12 stars.</p>`;
    
        }
        if (document.getElementById("normal").selected){
            //disable AEE checkbox from being clicked
            document.getElementById('AEE').disabled = true;
            document.getElementById("safeguard").disabled = false;
    
            document.getElementById("mvp").disabled = false;

            document.getElementById('target_stars').value = 22;
    
            document.getElementById("level").disabled = false;
    
            document.getElementById("5_10_15").disabled = false;
            document.getElementById("30").disabled = false;
            document.getElementById("sauna").disabled = false;
            document.getElementById("sauna-text").innerText="No Boom Event (Up to 15 stars) ";
            document.getElementById("plus2").disabled = false;
            document.getElementById('error-container').style.display = '';
            document.getElementById('error-msg').innerHTML =
                `<p style="color:#8b3687">Note: Getting above 22 stars on Normal gear is very unlikely. The calculator may crash if you attempt going above 22 stars.</p>`;
        }
    }).change();
});