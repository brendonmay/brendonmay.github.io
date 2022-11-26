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

    var costSevenFive = seventy_fifth_cost //results.costSevenFive
    var costEightFive = eighty_fifth_cost //results.costEightFive
    var costNineFive = ninety_fifth_cost //results.costNineFive
    var cubeSevenFive = seventy_fifth //results.cubeSevenFive
    var cubeEightFive = eighty_fifth //results.cubeEightFive
    var cubeNineFive = nintey_fifth //results.cubeNineFive


    document.getElementById('result').style.display = '';
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