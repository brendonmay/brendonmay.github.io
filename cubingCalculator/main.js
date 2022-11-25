//function l(what) {return document.getElementById(what);}

function asset(what) {
  return "url(" + C.assetsDir + what + ")";
}

function soundasset(what) {
  return C.soundDir + what + "?raw=true";
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

function outputStatsToUi(stats, tier_up, cubeType, itemLevel) {
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

  const probabilityInputObject = translateInputToObject(desiredStat);
  const prob = getProbability(desiredTier, probabilityInputObject, itemType, cubeType);
  console.log(prob);
  const newStats = geoDistrQuantile(prob || 1);
  console.log(newStats);

  //insert logic here
  var p = prob;
  var tier_up = getTierCosts(currentTier, desiredTier, cubeType, DMT)
  var stats = geoDistrQuantile(p)

  if (desiredStat === "any") {
    stats.mean = 0
    stats.median = 0
    stats.seventy_fifth = 0
    stats.eighty_fifth = 0
    stats.nintey_fifth = 0
  }

  outputStatsToUi(stats, tier_up, cubeType, itemLevel)
}


const calculateResults = function () {
  loaderOn();
  setTimeout(loaderOff, 100);
};


document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    $("#toast").toast('show')
  }, 1000)

  document.getElementById("currentTier").addEventListener("change", function () {
    const currentTier = parseInt($(this).val());
    updateDesiredTier(currentTier);
    const desiredTier = parseInt($('#desiredTier').val());

    const desiredStatsElement = document.getElementById("desiredStats");
    if (currentTier !== desiredTier){
      desiredStatsElement.disabled = true
      desiredStatsElement.value = "any"
    }
    else {
      updateDesiredStatsOptions();
      desiredStatsElement.disabled = false;
    }
  });

  const $desiredStats = $('#desiredStats');
  document.getElementById('desiredTier').addEventListener("change", function () {
    const desiredTier = parseInt($(this).val());
    const currentTier = parseInt($('#currentTier').val());
    const desiredStatsElement = document.getElementById("desiredStats");
    updateCubeType(desiredTier);
    updateCurrentTier(desiredTier)

    if (currentTier === desiredTier) {
      updateDesiredStatsOptions();
      desiredStatsElement.disabled = false;
    }
    else {
      $desiredStats.empty();
      $desiredStats.append("<option id='any' value='any'>Any</option>");
      desiredStatsElement.disabled = true;
    }
  });

  document.getElementById("itemType").addEventListener("change", function () {
    var desiredTier = document.getElementById('desiredTier').value
    if (desiredTier !== 0) {
      updateDesiredStatsOptions();
      document.getElementById("desiredStats").selectedIndex = 0; //Option 10
    }
  });

  document.getElementById("itemLevel").addEventListener("change", function () {
    // Set selected option as variable
    var itemLevel = parseInt($(this).val());

    if (itemLevel < 71 || itemLevel > 200) {
      $desiredStats.empty();
      $desiredStats.append("<option value='N/A' disabled selected>Your item level must be between 71 and 200</option>");
      document.getElementById('calculateButton').disabled = true;
    } else {
      updateDesiredStatsOptions();
      document.getElementById('calculateButton').disabled = false;
    }


  });

  document.getElementById("calculateButton").addEventListener("click", calculateResults);

  // Populate the select options:
  updateDesiredStatsOptions();
}, false);

Game.init();
