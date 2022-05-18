// Functions and constants relating to the different cubes.

export function cubingCost(cubeType, itemLevel, totalCubeCount) {
    if (cubeType == 'red') {
        cubeCost = 12000000;
    } else {
        cubeCost = 22000000;
    }
    var revealPotentialCost = 20 * itemLevel ** 2
    return cubeCost * totalCubeCount + totalCubeCount * revealPotentialCost
}