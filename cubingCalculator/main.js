function loaderOn() {
  $('#loader1').show();
  $('#loader2').show();
  setTimeout(runCalculator, 100);
}

function loaderOff() {
  $('#loader1').hide();
  $('#loader2').hide()
}

function runCalculator() {
  var itemType = document.getElementById('itemType').value;
  var cubeType = document.getElementById('cubeType').value;
  var currentTier = parseInt(document.getElementById('currentTier').value);
  var itemLevel = parseInt(document.getElementById('itemLevel').value);
  var desiredTier = parseInt(document.getElementById('desiredTier').value);
  var DMT = document.getElementById('DMT').checked

  var desiredStat = document.getElementById('desiredStats').value;

  const anyStats = desiredStat === "any";
  const probabilityInputObject = translateInputToObject(desiredStat);
  const p = anyStats ? 1 : getProbability(desiredTier, probabilityInputObject, itemType, cubeType, itemLevel);
  var tier_up = getTierCosts(currentTier, desiredTier, cubeType, DMT)
  var stats = geoDistrQuantile(p)

  if (anyStats) {
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
    const desiredTier = updateDesiredTier(currentTier);
    updateCubeType(desiredTier, currentTier);

    updateDesiredStats();
  });

  const $desiredStats = $('#desiredStats');
  document.getElementById('desiredTier').addEventListener("change", function () {
    const desiredTier = parseInt($(this).val());
    const currentTier = updateCurrentTier(desiredTier);
    updateCubeType(desiredTier, currentTier);
    updateDesiredStats();
  });

  document.getElementById("itemType").addEventListener("change", function () {
    var desiredTier = document.getElementById('desiredTier').value
    if (desiredTier !== 0) {
      updateDesiredStats();
    }
  });

  document.getElementById("cubeType").addEventListener("change", function () {
    const desiredTier = parseInt($('#desiredTier').val());
    if (desiredTier !== 0) {
      updateDesiredStats();
    }
  });

  document.getElementById("statType").addEventListener("change", function () {
    const desiredTier = parseInt($('#desiredTier').val());
    if (desiredTier !== 0) {
      updateDesiredStats();
    }
  });


  document.getElementById("itemLevel").addEventListener("change", function () {
    var itemLevel = parseInt($(this).val());

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

  // Populate the select options:
  updateDesiredStatsOptions();
}, false);
