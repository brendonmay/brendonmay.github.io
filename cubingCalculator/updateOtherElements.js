// These functions update options when the user selects something else incompatible to save a few clicks.
function updateCubeType(desiredTier, currentTier) {
    const $cubeType = $('#cubeType');
    const currentCubeType = $cubeType.val();
    const tieringUp = currentTier !== desiredTier;

    if (tieringUp) {
        // Can the currently selected cube work?
        if (maxCubeTier[currentCubeType] >= desiredTier) {
            return currentCubeType;
        }

        // The user is trying to tier up, so pick the best cube for the job.
        if (desiredTier === 1) {
            $cubeType.val("master");
        }
        else {
            $cubeType.val("black");
        }
    }
    // User is trying to roll lines, so give them an appropriate cube.
    else {
        if (desiredTier === 1) {
            $cubeType.val("occult");
        }
        else if (desiredTier === 2) {
            $cubeType.val("master");
        }
        else if (desiredTier === 3) {
            $cubeType.val("red");
        }
    }
    return $cubeType.val();
}

// Update the desired tier if it needs updating and return whatever value it has afterwards.
function updateDesiredTier(currentTier) {
    const $desiredTier = $('#desiredTier');
    const currentDesiredTier = parseInt($desiredTier.val());
    if (currentDesiredTier < currentTier) {
        // This doesn't trigger change handlers which is nice.
        $desiredTier.val("" + currentTier);
        return currentTier;
    }
    return currentDesiredTier;
}

// Update the current tier if it needs updating and return whatever value it has afterwards.
function updateCurrentTier(desiredTier) {
    const $currentTier = $('#currentTier');
    const currentTierVal = parseInt($currentTier.val());
    if (currentTierVal > desiredTier) {
        // This doesn't trigger change handlers which is nice.
        $currentTier.val("" + desiredTier);
        return desiredTier
    }
    return currentTierVal;
}

function updateDesiredStats() {
    const cubeType = $('#cubeType').val();
    const currentTier = parseInt($('#currentTier').val());
    const desiredTier = parseInt($('#desiredTier').val());

    const cubeTypeMatches = maxCubeTier[cubeType] === desiredTier;
    const canPickStat = currentTier === desiredTier && cubeTypeMatches;
    const $desiredStats = $('#desiredStats');
    $desiredStats.attr("disabled", !canPickStat);
    if (canPickStat) {
        updateDesiredStatsOptions();
    }
    else {
        $desiredStats.empty();
        $desiredStats.append("<option id='any' value='any'>Any</option>");
    }
}