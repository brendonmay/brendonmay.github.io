//function l(what) {return document.getElementById(what);}
import {getProbability} from "./getProbability.js";
import C from "./c.js";
import Game from "./game.js";
import {geoDistrQuantile} from "./statistics.js";
import {cubingCost, tier_rates, tier_rates_DMT} from "./cubes.js";
import {$desiredStats, updateDesiredStats} from "./updateDesiredStats.js";

function asset(what) {
  return "url(" + C.assetsDir + what + ")";
}

function soundasset(what) {
  return C.soundDir + what + "?raw=true";
}

const $desiredTier = $('#desiredTier');

function updateDesiredTierOptions(currentTier) {
  $desiredTier.empty();

  if (currentTier <= 1) {
    $desiredTier.append("<option value=1>Epic</option>");
  }
  if (currentTier <= 2) {
    $desiredTier.append("<option value=2>Unique</option>");
  }
  $desiredTier.append("<option value=3 selected>Legendary</option>");
}

const $cubeType = $('#cubeType');

function updateCubeTypeOptions(desiredTier) {
  $cubeType.empty();

  if (desiredTier <= 1) {
    $cubeType.append("<option value='occult'>Occult</option>");
  }
  if (desiredTier <= 2) {
    $cubeType.append("<option value='master'>Master</option>");
  }
  $cubeType.append("<option value='meister'>Meister</option>");
  $cubeType.append("<option value='red'>Red</option>");
  $cubeType.append("<option value='black' selected>Black</option>");
}

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
  const tier_up_rates = (DMT) ? tier_rates_DMT: tier_rates;
  let mean = 0, median = 0, seventy_fifth = 0, eighty_fifth = 0, nintey_fifth = 0;
  for (let i = currentTier; i < desiredTier; i++) {
    const p = tier_up_rates[cubeType][currentTier];
    const stats = geoDistrQuantile(p);
    mean += Math.round(stats.mean);
    median += Math.round(stats.median);
    seventy_fifth += Math.round(stats.seventy_fifth);
    eighty_fifth += Math.round(stats.eighty_fifth);
    nintey_fifth += Math.round(stats.nintey_fifth);
  }
  return {
    mean,
    median,
    seventy_fifth,
    eighty_fifth,
    nintey_fifth
  };
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


const calculateResults = function () {
  loaderOn();
  setTimeout(loaderOff, 100);

  //console.log(performExperiment('black', 150, 'earring', '2LDropOrMeso', 3, 3))

  //console.log(repeatExperiment('black', 150, 'hat', '3SecCD', 100, 3, 3))
};


document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    $("#toast").toast('show')
  }, 1000)

  // setTimeout(function(){
  //   $("#toast").toast('hide')
  // }, 3000)
  document.getElementById("currentTier").addEventListener("change", function () {
    const currentTier = parseInt($(this).val());
    const desiredTier = parseInt($desiredTier.val());

    updateDesiredTierOptions(currentTier);
    updateCubeTypeOptions(desiredTier);

    const desiredStatsElement = document.getElementById("desiredStats");
    if (currentTier !== desiredTier){
      desiredStatsElement.disabled = true
      desiredStatsElement.value = "any"
    }
    else {
      updateDesiredStats();
      desiredStatsElement.disabled = false;
    }
  });

  document.getElementById('desiredTier').addEventListener("change", function () {
    const desiredTier = $(this).val();
    const currentTier = $('#currentTier').val();
    const desiredStatsElement = document.getElementById("desiredStats");
    updateCubeTypeOptions(desiredTier);

    if (currentTier === desiredTier) {
      updateDesiredStats();
      desiredStatsElement.disabled = false;
    }
    else {
      $desiredStats.empty();
      $desiredStats.append("<option id='any' value='any'>Any</option>");
      desiredStatsElement.disabled = true;
    }
  });

  document.getElementById("itemType").addEventListener("change", function () {
    // document.getElementById('error-container').style.display = '';
    var desiredTier = document.getElementById('desiredTier').value
    if (desiredTier !== 0) {
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
    const desiredTier = document.getElementById('desiredTier').value
    const currentTier = document.getElementById('currentTier').value

    if (itemLevel < 71 || itemLevel > 200) {
      $desiredStats.empty();
      $desiredStats.append("<option value='N/A' disabled selected>Your item level must be between 71 and 200</option>");
      document.getElementById('calculateButton').disabled = true;
    } else {
      updateDesiredStats();
      document.getElementById('calculateButton').disabled = false;
    }


  });

  document.getElementById("calculateButton").addEventListener("click", calculateResults);
}, false);

// Populate the select options:
updateDesiredStats();

Game.init();
