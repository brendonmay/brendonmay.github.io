//function l(what) {return document.getElementById(what);}
import {getProbability} from "./getProbability.js";
import C from "./c.js";
import Game from "./game.js";
import {geoDistrQuantile} from "./statistics.js";
import {cubingCost} from "./cubes.js";

function asset(what) {
  return "url(" + C.assetsDir + what + ")";
}

function soundasset(what) {
  return C.soundDir + what + "?raw=true";
}


let tier_rates = {
  "red": {
    0: 0.14,
    1: 0.06,
    2: 0.025
  },
  "black": {
    0: 0.17,
    1: 0.11,
    2: 0.05
  }
}

let tier_rates_DMT = {
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

function get3LStatOptionAmounts(prime) {
  const ppp = prime * 3;
  const ppn = ppp - 3;
  const pnn = ppp - 6;
  const pna = ppp - 9; // This doesn't work for max HP legendary but the 3 DAs won't complain.
  const paa = ppp - 12;
  const aaa = ppp - 15;
  // -15 is the lowest we go since in epic tier we're down to 3%.
  // Most people don't care for lower values in unique/legendary anyway.
  return [aaa,
    paa,
    pna,
    pnn,
    ppn,
    ppp];
}

function get2LStatOptionAmounts(prime) {
  // For when we want to do stuff like 2L + boss.
  const pp = prime * 2;
  const pn = pp - 3;
  const nn = pp - 6;
  return [nn,
    pn,
    pp];
}

const $desiredStats = $('#desiredStats');

function removeGroupIfExists(id) {
  if (document.getElementById(id)) {
    $(`#${id}`).remove();
  }
}

function addNormalOptionGroup(prefix, valueText, textText, groupLabel, optionAmounts) {
  // If the optgroup already exists, update the values and text in case the user changed the item level.
  if (document.getElementById(`${prefix}Group`)) {
    optionAmounts.forEach((val, i) => {
      const $option = $(`#${prefix}${i}`);
      $option.attr("value", `${val}${valueText}`);
      $option.text(`${val}%+ ${textText}`);
    });
  } else {
    // Create the optgroup and options.
    $desiredStats.append(`<optgroup id='${prefix}Group' label='${groupLabel}'></optgroup>`);
    const $statGroup = $(`#${prefix}Group`);
    optionAmounts.forEach((val, i) => $statGroup.append(
        `<option id='${prefix}${i}' value='${val}${valueText}'>${val}%+ ${textText}</option>`));
  }
}

function addNormalStatOptions(itemLevel) {
  const levelBonus = itemLevel >= 160 ? 1 : 0;

  const regPrime = 12 + levelBonus;
  const regOptionAmounts = get3LStatOptionAmounts(regPrime);
  addNormalOptionGroup("regStat",
      "PercLUK",
      "Stat",
      "Regular Stat",
      regOptionAmounts);

  const hpPrime = 12;
  const hpOptionAmounts = get3LStatOptionAmounts(hpPrime);
  addNormalOptionGroup("hpStat",
      "PercHP",
      "Max HP",
      "Max HP (Demon Avenger)",
      hpOptionAmounts);

  const allStatPrime = 9 + levelBonus;
  const allStatOptionAmounts = get3LStatOptionAmounts(allStatPrime);
  addNormalOptionGroup("allStat",
      "PercALL",
      "All Stat",
      "All Stat (For Xenon)",
      allStatOptionAmounts);
}

function removeNormalStatOptions() {
  removeGroupIfExists("regStatGroup");
  removeGroupIfExists("hpStatGroup");
  removeGroupIfExists("allStatGroup");
}

function addCommonWSEOptions(itemLevel) {
  const levelBonus = itemLevel >= 160 ? 1 : 0;

  const prime = 12 + levelBonus;
  const optionAmounts = get3LStatOptionAmounts(prime);
  addNormalOptionGroup("attack",
      "PercATT",
      "Attack",
      "Attack",
      optionAmounts);

  const IEDOptionAmounts = get2LStatOptionAmounts(prime);
  addNormalOptionGroup("attackAndIED",
      "ATTandIED",
      "Attack and IED",
      "Attack With 1 Line of IED",
      IEDOptionAmounts);
}

function removeCommonWSEOptions() {
  removeGroupIfExists("attackGroup");
  removeGroupIfExists("attackAndIEDGroup");
}

function addCommonSEOptions(itemLevel) {
  const levelBonus = itemLevel >= 160 ? 1 : 0;

  const prime = 12 + levelBonus;
  const [_, pn, pp] = get2LStatOptionAmounts(prime);

  if (document.getElementById(`attackAndBossGroup`)) {
    const PNATT30BOSS = $("#PNATT30BOSS");
    const PNATT35BOSS = $("#PNATT35BOSS");
    const PNATT40BOSS = $("#PNATT40BOSS");
    const PPATT30BOSS = $("#PPATT30BOSS");

    PNATT30BOSS.attr("value", `${pn}ATT30BOSS`);
    PNATT35BOSS.attr("value", `${pn}ATT35BOSS`);
    PNATT40BOSS.attr("value", `${pn}ATT40BOSS`);
    PPATT30BOSS.attr("value", `${pp}ATT30BOSS`);

    PNATT30BOSS.text(`${pn}%+ Attack and 30%+ Boss`);
    PNATT35BOSS.text(`${pn}%+ Attack and 35%+ Boss`);
    PNATT40BOSS.text(`${pn}%+ Attack and 40%+ Boss`);
    PPATT30BOSS.text(`${pp}%+ Attack and 30%+ Boss`);
  } else {
    $desiredStats.append(`<optgroup id='attackAndBossGroup' label='Attack and Boss Damage'></optgroup>`);
    const $attackAndBossGroup = $('#attackAndBossGroup');
    $attackAndBossGroup.append("<option id='1Att1Boss' value='1ATTand1BOSS'>1 Line Attack% + 1 Line Boss%</option>");
    $attackAndBossGroup.append("<option id='1Att2Boss' value='1ATTand2BOSS'>1 Line Attack% + 2 Line Boss%</option>");
    $attackAndBossGroup.append("<option id='2Att1Boss' value='2ATTand1BOSS'>2 Line Attack% + 1 Line Boss%</option>");

    $attackAndBossGroup.append(`<option id='$PNATT30BOSS' value='${pn}ATT30BOSS'>${pn}%+ Attack and 30%+ Boss</option>`);
    $attackAndBossGroup.append(`<option id='$PNATT35BOSS' value='${pn}ATT35BOSS'>${pn}%+ Attack and 35%+ Boss</option>`);
    $attackAndBossGroup.append(`<option id='$PNATT40BOSS' value='${pn}ATT40BOSS'>${pn}%+ Attack and 40%+ Boss</option>`);
    $attackAndBossGroup.append(`<option id='$PPATT30BOSS' value='${pp}ATT30BOSS'>${pp}%+ Attack and 30%+ Boss</option>`);
  }
}

function removeCommonSEOptions() {
  removeGroupIfExists("attackAndBossGroup");
}

function addCritDamageOptions() {
  if (document.getElementById(`critDamageGroup`)) {
  } else {
    $desiredStats.append(`<optgroup id='critDamageGroup' label='Crit Damage'></optgroup>`);
    const $critDamageGroup = $('#critDamageGroup');
    $critDamageGroup.append("<option id='gloves' value='1LCrit'>1 Line Crit Dmg%</option>");

    $critDamageGroup.append("<option id='gloves1' value='1LCritAndStat'>1 Line Crit Dmg% and Stat%</option>");
    $critDamageGroup.append("<option id='gloves2' value='1LCritAndALL'>1 Line Crit Dmg% and All Stat%</option>");
    $critDamageGroup.append("<option id='gloves3' value='1LCritandHP'>1 Line Crit Dmg% and MaxHP%</option>");

    $critDamageGroup.append("<option id='gloves8' value='1LCritAnd2Stat'>1 Line Crit Dmg% and 2L Stat%</option>");
    $critDamageGroup.append("<option id='gloves9' value='1LCritAnd2ALL'>1 Line Crit Dmg% and 2L All Stat%</option>");
    $critDamageGroup.append("<option id='gloves10' value='1LCritand2HP'>1 Line Crit Dmg% and 2L MaxHP%</option>");

    $critDamageGroup.append("<option id='gloves4' value='2LCrit'>2 Line Crit Dmg%</option>");

    $critDamageGroup.append("<option id='gloves5' value='2LCritAndStat'>2 Line Crit Dmg% and Stat%</option>");
    $critDamageGroup.append("<option id='gloves6' value='2LCritAndALL'>2 Line Crit Dmg% and All Stat%</option>");
    $critDamageGroup.append("<option id='gloves7' value='2CritandHP'>2 Line Crit Dmg% and MaxHP%</option>");

    $critDamageGroup.append("<option id='gloves8' value='3LCrit'>3 Line Crit Dmg%</option>");
  }
}

function removeCritDamageOptions() {
  removeGroupIfExists("critDamageGroup");
}

function addDropAndMesoOptions() {
  if (document.getElementById(`dropMesoGroup`)) {
  } else {
    $desiredStats.append(`<optgroup id='dropMesoGroup' label='Crit Damage'></optgroup>`);
    const $dropMesoGroup = $('#dropMesoGroup');
    $dropMesoGroup.append("<option id='accessory3' value='1LMeso'>1 Line Mesos Obtained%</option>");
    $dropMesoGroup.append("<option id='accessory4' value='1LDrop'>1 Line Item Drop%</option>");
    $dropMesoGroup.append("<option id='accessory5' value='1LDropOrMeso'>1 Line of Item Drop% or Mesos Obtained%</option>");

    $dropMesoGroup.append("<option id='accessory6' value='1LMesoAndStat'>1 Line Mesos Obtained% and Stat%</option>");
    $dropMesoGroup.append("<option id='accessory7' value='1LMesoAndALL'>1 Line Mesos Obtained% and All Stat%</option>");
    $dropMesoGroup.append("<option id='accessory8' value='1LMesoAndHP'>1 Line Mesos Obtained% and MaxHP%</option>");

    $dropMesoGroup.append("<option id='accessory9' value='1LDropAndStat'>1 Line Item Drop% and Stat%</option>");
    $dropMesoGroup.append("<option id='accessory10' value='1LDropAndALL'>1 Line Item Drop% and All Stat%</option>");
    $dropMesoGroup.append("<option id='accessory11' value='1LDropAndHP'>1 Line Item Drop% and MaxHP%</option>");

    $dropMesoGroup.append("<option id='accessory12' value='1LDropOrMesoAndStat'>1 Line of (Item Drop% or Mesos Obtained%) with Stat%</option>");
    $dropMesoGroup.append("<option id='accessory13' value='1LDropOrMesoAndALL'>1 Line of (Item Drop% or Mesos Obtained%) with All Stat%</option>");
    $dropMesoGroup.append("<option id='accessory14' value='1LDropOrMesoAndHP'>1 Line of (Item Drop% or Mesos Obtained%) with MaxHP%</option>");

    $dropMesoGroup.append("<option id='accessory' value='2LMeso'>2 Line Mesos Obtained%</option>");
    $dropMesoGroup.append("<option id='accessory1' value='2LDrop'>2 Line Item Drop%</option>");
    $dropMesoGroup.append("<option id='accessory2' value='2LDropOrMeso'>2 Lines Involving Item Drop% or Mesos Obtained%</option>");

    $dropMesoGroup.append("<option id='accessory' value='3LMeso'>3 Line Mesos Obtained%</option>");
  }
}

function removeDropAndMesoOptions() {
  removeGroupIfExists("dropMesoGroup");
}

function updateDesiredStats() {
  var itemType = document.getElementById('itemType').value;
  var itemLevel = parseInt(document.getElementById('itemLevel').value);

  if (itemType === 'weapon' || itemType === 'secondary' || itemType === 'emblem') {
    removeNormalStatOptions();
    addCommonWSEOptions(itemLevel);

    if (itemType !== 'emblem') {
      addCommonSEOptions(itemLevel);
    } else {
      removeCommonSEOptions()
    }
  } else {
    addNormalStatOptions(itemLevel);
    removeCommonWSEOptions();
    removeCommonSEOptions();
  }

  if (itemType === 'gloves') {
    addCritDamageOptions();
  } else {
    removeCritDamageOptions();
  }

  if (itemType === 'accessory') {
    addDropAndMesoOptions();
  } else {
    removeDropAndMesoOptions();
  }
  ////2SecCD, 3SecCD, 4SecCD, 2SecCDAndStat, 2SecCDAndHP, 2SecCDAndALL, 2SecCDAnd2Stat, 2SecCDAnd2HP, 2SecCDAnd2ALL, 3SecCDAndStat, 3SecCDAndHP, 3SecCDAndALL, 4SecCDAndStat, 4SecCDAndHP, 4SecCDAndALL
  if (itemType == 'hat') {
    if (document.getElementById('accessory') === null) {
      $('#desiredStats').append("<option id='hat' value='2SecCD'>-2sec+ CD Reduction</option>");
      $('#desiredStats').append("<option id='hat1' value='3SecCD'>-3sec+ CD Reduction</option>");
      $('#desiredStats').append("<option id='hat2' value='4SecCD'>-4sec+ CD Reduction</option>");
      $('#desiredStats').append("<option id='hat15' value='5SecCD'>-5sec+ CD Reduction</option>");
      $('#desiredStats').append("<option id='hat16' value='6SecCD'>-6sec+ CD Reduction</option>");

      $('#desiredStats').append("<option id='hat3' value='2SecCDAndStat'>-2sec+ CD Reduction and Stat%</option>");
      $('#desiredStats').append("<option id='hat4' value='2SecCDAndHP'>-2sec+ CD Reduction and MaxHP%</option>");
      $('#desiredStats').append("<option id='hat5' value='2SecCDAndALL'>-2sec+ CD Reduction and All Stat%</option>");

      $('#desiredStats').append("<option id='hat6' value='2SecCDAnd2Stat'>-2sec+ CD Reduction and 2 Line Stat%</option>");
      $('#desiredStats').append("<option id='hat7' value='2SecCDAnd2HP'>-2sec+ CD Reduction and 2 Line Max HP%</option>");
      $('#desiredStats').append("<option id='hat8' value='2SecCDAnd2ALL'>-2sec+ CD Reduction and 2 Line All Stat%</option>");

      $('#desiredStats').append("<option id='hat9' value='3SecCDAndStat'>-3sec+ CD Reduction and Stat%</option>");
      $('#desiredStats').append("<option id='hat10' value='3SecCDAndHP'>-3sec+ CD Reduction and Max HP%</option>");
      $('#desiredStats').append("<option id='hat11' value='3SecCDAndALL'>-3sec+ CD Reduction and All Stat%</option>");

      $('#desiredStats').append("<option id='hat12' value='4SecCDAndStat'>-4sec+ CD Reduction and Stat%</option>");
      $('#desiredStats').append("<option id='hat13' value='4SecCDAndHP'>-4sec+ CD Reduction and Max HP%</option>");
      $('#desiredStats').append("<option id='hat14' value='4SecCDAndALL'>-4sec+ CD Reduction and All Stat%</option>");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    $("#toast").toast('show')
  }, 1000)

  // setTimeout(function(){
  //   $("#toast").toast('hide')
  // }, 3000)
  document.getElementById("currentTier").addEventListener("change", function () {
    var currentTier = $(this).val();
    $('#desiredTier').empty();

    if (currentTier == 0) {
      $('#desiredTier').append("<option value=1>Epic</option>");
      $('#desiredTier').append("<option value=2>Unique</option>");
      $('#desiredTier').append("<option value=3 selected>Legendary</option>");
    } else if (currentTier == 1) {
      $('#desiredTier').append("<option value=2>Unique</option>");
      $('#desiredTier').append("<option value=3 selected>Legendary</option>");
    } else if (currentTier == 2 || currentTier == 3) {
      $('#desiredTier').append("<option value=3 selected>Legendary</option>");
    }

    if (currentTier != 3){
      document.getElementById("desiredStats").disabled = true
      document.getElementById("desiredStats").value = "any"
      
    }
    else {
      document.getElementById("desiredStats").disabled = false
    }
  });

  document.getElementById('desiredTier').addEventListener("change", function () {
    var desiredTier = $(this).val();

    if (desiredTier == 3) {
      updateDesiredStats()
    }
    else {
      $('#desiredStats').empty();
      $('#desiredStats').append("<option id='any' value='any'>Any</option>");
    }
  });

  document.getElementById("itemType").addEventListener("change", function () {
    // document.getElementById('error-container').style.display = '';
    var desiredTier = document.getElementById('desiredTier').value
    if (desiredTier == 3) {
      updateDesiredStats();
      document.getElementById("desiredStats").selectedIndex = 0; //Option 10
    }
  });

  // document.getElementById("totalTrials").addEventListener("change", function () {
  //   document.getElementById('error-container').style.display = '';
  // });

  // document.getElementById("desiredStats").addEventListener("change", function () {
  //   document.getElementById('error-container').style.display = '';
  // });

  document.getElementById("itemLevel").addEventListener("change", function () {
    // Set selected option as variable
    var itemLevel = parseInt($(this).val());
    var itemType = document.getElementById('itemType').value;
    var desiredTier = document.getElementById('desiredTier').value

    if (itemLevel < 71 || itemLevel > 200) {
      $desiredStats.empty();
      $desiredStats.append("<option value='N/A' disabled selected>Your item level must be between 71 and 200</option>");
      document.getElementById('calculateButton').disabled = true;
    } else {
      updateDesiredStats();
      document.getElementById('calculateButton').disabled = false;
    }


  });

  document.getElementById("calculateButton").addEventListener("click", function () {
    function loaderOn() {
      $('#loader1').show();
      $('#loader2').show();
      setTimeout(runCalculator, 100);
    }

    function loaderOff() {
      $('#loader1').hide();
      $('#loader2').hide()
    }

    function getTierCosts(currentTier, desiredTier, cubeType, DMT) {
      var tier_up_rates = tier_rates
      if (DMT) tier_up_rates = tier_rates_DMT
      if (currentTier == 3) return {mean: 0, median: 0, seventy_fifth: 0, eighty_fifth: 0, nintey_fifth: 0}
      if (currentTier == 2) {
        var p = tier_up_rates[cubeType][currentTier]
        var stats = geoDistrQuantile(p)
        var mean = Math.round(stats.mean)
        var median = Math.round(stats.median)
        var seventy_fifth = Math.round(stats.seventy_fifth)
        var eighty_fifth = Math.round(stats.eighty_fifth)
        var nintey_fifth = Math.round(stats.nintey_fifth)

        return {mean: mean, median: median, seventy_fifth: seventy_fifth, eighty_fifth: eighty_fifth, nintey_fifth: nintey_fifth}
      }
      if (currentTier == 1) {
        var p = tier_up_rates[cubeType][currentTier]
        var stats = geoDistrQuantile(p)
        var mean = Math.round(stats.mean)
        var median = Math.round(stats.median)
        var seventy_fifth = Math.round(stats.seventy_fifth)
        var eighty_fifth = Math.round(stats.eighty_fifth)
        var nintey_fifth = Math.round(stats.nintey_fifth)

        var p = tier_up_rates[cubeType][currentTier + 1]
        var stats = geoDistrQuantile(p)
        mean += Math.round(stats.mean)
        median += Math.round(stats.median)
        seventy_fifth += Math.round(stats.seventy_fifth)
        eighty_fifth += Math.round(stats.eighty_fifth)
        nintey_fifth += Math.round(stats.nintey_fifth)

        return {mean: mean, median: median, seventy_fifth: seventy_fifth, eighty_fifth: eighty_fifth, nintey_fifth: nintey_fifth}
      }
      if (currentTier == 0) {
        var p = tier_up_rates[cubeType][currentTier]
        var stats = geoDistrQuantile(p)
        var mean = Math.round(stats.mean)
        var median = Math.round(stats.median)
        var seventy_fifth = Math.round(stats.seventy_fifth)
        var eighty_fifth = Math.round(stats.eighty_fifth)
        var nintey_fifth = Math.round(stats.nintey_fifth)

        var p = tier_up_rates[cubeType][currentTier + 1]
        var stats = geoDistrQuantile(p)
        mean += Math.round(stats.mean)
        median += Math.round(stats.median)
        seventy_fifth += Math.round(stats.seventy_fifth)
        eighty_fifth += Math.round(stats.eighty_fifth)
        nintey_fifth += Math.round(stats.nintey_fifth)

        var p = tier_up_rates[cubeType][currentTier + 2]
        var stats = geoDistrQuantile(p)
        mean += Math.round(stats.mean)
        median += Math.round(stats.median)
        seventy_fifth += Math.round(stats.seventy_fifth)
        eighty_fifth += Math.round(stats.eighty_fifth)
        nintey_fifth += Math.round(stats.nintey_fifth)

        return {mean: mean, median: median, seventy_fifth: seventy_fifth, eighty_fifth: eighty_fifth, nintey_fifth: nintey_fifth}
      }
    }

    function runCalculator() {
      var itemType = document.getElementById('itemType').value;
      var cubeType = document.getElementById('cubeType').value;
      var currentTier = parseInt(document.getElementById('currentTier').value);
      //var totalTrials = parseInt(document.getElementById('totalTrials').value);
      var itemLevel = parseInt(document.getElementById('itemLevel').value);
      var desiredTier = parseInt(document.getElementById('desiredTier').value);
      var DMT = document.getElementById('DMT').checked

      //Todo: meso/drop/CDhat/
      var desiredStat = document.getElementById('desiredStats').value;

      //insert logic here
      var p = getProbability(itemType, desiredStat, cubeType, currentTier, desiredTier, itemLevel)
      var tier_up = getTierCosts(currentTier, desiredTier, cubeType, DMT)
      var stats = geoDistrQuantile(p)

      if (desiredStat == "any") {
        stats.mean = 0
        stats.median = 0
        stats.seventy_fifth = 0
        stats.eighty_fifth = 0
        stats.nintey_fifth = 0
      }

      var mean = Math.round(stats.mean) + tier_up.mean
      var median = Math.round(stats.median) + tier_up.median
      var seventy_fifth = Math.round(stats.seventy_fifth) + tier_up.seventy_fifth
      var eighty_fifth = Math.round(stats.eighty_fifth) + tier_up.eighty_fifth
      var nintey_fifth = Math.round(stats.nintey_fifth) + tier_up.nintey_fifth

      var mean_cost = cubingCost(cubeType, itemLevel, mean)
      var median_cost = cubingCost(cubeType, itemLevel, median)
      var seventy_fifth_cost = cubingCost(cubeType, itemLevel, seventy_fifth)
      var eighty_fifth_cost = cubingCost(cubeType, itemLevel, eighty_fifth)
      var ninety_fifth_cost = cubingCost(cubeType, itemLevel, nintey_fifth)


      //new logic ends here


      //var results = repeatExperiment(cubeType, itemLevel, itemType, desiredStat, totalTrials, currentTier, desiredTier);

      var averageCubeCount = mean //results.averageCubeCount
      var averageCost = mean_cost //results.averageCost
      var medianCost = median_cost //results.medianCost
      var medianCubeCount = median //results.medianCubeCount
      //var mesoDataForGraph = results.mesoDataForGraph
      var costSevenFive = seventy_fifth_cost //results.costSevenFive
      var costEightFive = eighty_fifth_cost //results.costEightFive
      var costNineFive = ninety_fifth_cost //results.costNineFive
      var cubeSevenFive = seventy_fifth //results.cubeSevenFive
      var cubeEightFive = eighty_fifth //results.cubeEightFive
      var cubeNineFive = nintey_fifth //results.cubeNineFive

      //console.log(repeatExperiment('red', 150, 'weapon', '2LATT', 1, 3, 3))
      // Highcharts.chart('container', {
      //   title: {
      //     text: 'Frequency Histogram'
      //   },

      //   xAxis: [{
      //     title: {
      //       text: ''
      //     },
      //     alignTicks: false,
      //     visible: false,
      //     opposite: true
      //   }, {
      //     title: {
      //       text: 'Meso Cost (in Billions)'
      //     },
      //     alignTicks: false,
      //     opposite: false
      //   }],

      //   yAxis: [{
      //     title: {
      //       text: ''
      //     },
      //     visible: false,
      //     opposite: true
      //   }, {
      //     title: {
      //       text: 'Frequency'
      //     },
      //     opposite: false
      //   }],

      //   plotOptions: {
      //     histogram: {
      //       accessibility: {
      //         pointDescriptionFormatter: function (point) {
      //           var ix = point.index + 1,
      //             x1 = point.x.toFixed(3),
      //             x2 = point.x2.toFixed(3),
      //             val = point.y;
      //           return ix + '. ' + x1 + ' to ' + x2 + ', ' + val + '.';
      //         }
      //       }
      //     }
      //   },

      //   series: [{
      //     name: 'Histogram',
      //     type: 'histogram',
      //     color: '#135273',
      //     xAxis: 1,
      //     yAxis: 1,
      //     baseSeries: 's1',
      //     zIndex: -1
      //   }, {
      //     name: '',
      //     type: 'scatter',
      //     visible: false,
      //     data: mesoDataForGraph,
      //     id: 's1',
      //     marker: {
      //       radius: 0
      //     }
      //   }]
      // });
      //document.getElementById("graphhere").style.display = '';
      document.getElementById('result').style.display = '';
      // document.getElementById('error-container').style.display = 'none';
      document.getElementById('result').innerHTML =
        `
    <div class="container secondarycon">
      <div class=" statBox statBox1" style="background-color:#aaa;">
        <h2 style="text-align:center;">Mesos Stats</h2>
            <p style="text-align:center;"">
                Average cost: ${averageCost.toLocaleString()}<br />
            Median cost: ${medianCost.toLocaleString()}<br />
            </p>
      </div>
      <div class=" statBox statBox2" style="background-color:#bbb;">
        <h2 style="text-align:center;">Mesos Percentiles</h2>
        <p style="text-align:center;"">
            75% chance within ${costSevenFive.toLocaleString()} mesos<br />
            85% chance within ${costEightFive.toLocaleString()} mesos<br />
            95% chance within ${costNineFive.toLocaleString()} mesos<br />
        </p>
      </div>
      
      <div class=" statBox statBox3" style="background-color:#aaa;">
        <h2 style="text-align:center;"">Cube Stats</h2>
            <p style="text-align:center;"">
                Average cubes: ${averageCubeCount.toLocaleString()} ${cubeType} cubes<br />
                Median cubes: ${medianCubeCount.toLocaleString()} ${cubeType} cubes<br />
            </p>
      </div>
      <div class=" statBox statBox4" style="background-color:#bbb;">
        <h2 style="text-align:center;">Cube Percentiles</h2>
        <p style="text-align:center;"">
            75% chance within ${cubeSevenFive.toLocaleString()} ${cubeType} cubes<br />
            85% chance within ${cubeEightFive.toLocaleString()} ${cubeType} cubes<br />
            95% chance within ${cubeNineFive.toLocaleString()} ${cubeType} cubes<br />
        </p>
      </div>
    </div>
        `
    }
    loaderOn();
    setTimeout(loaderOff, 100);

    //console.log(performExperiment('black', 150, 'earring', '2LDropOrMeso', 3, 3))

    //console.log(repeatExperiment('black', 150, 'hat', '3SecCD', 100, 3, 3))
  });
}, false);

// Populate the select options:
updateDesiredStats();

Game.init();
