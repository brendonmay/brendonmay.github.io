// These functions update options when the user selects something else incompatible to save a few clicks.
function updateCubeType(desiredTier) {
    const $cubeType = $('#cubeType');

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

function updateDesiredTier(currentTier) {
    const $desiredTier = $('#desiredTier');
    const currentDesiredTier = parseInt($desiredTier.val());
    if (currentDesiredTier < currentTier) {
        // This doesn't trigger change handlers which is nice.
        $desiredTier.val("" + currentTier);
        updateCubeType(currentTier);
    }
}

function updateCurrentTier(desiredTier) {
    const $currentTier = $('#currentTier');
    const currentTierVal = parseInt($currentTier.val());
    if (currentTierVal > desiredTier) {
        // This doesn't trigger change handlers which is nice.
        $currentTier.val("" + desiredTier);
    }
}