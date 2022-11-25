// Update desired tier when the user changes current tier to something above it.
// Since you can't tier down, they'll have to change it regardless.
function updateDesiredTier(currentTier) {
    const $desiredTier = $('#desiredTier');

    const currentDesiredTier = parseInt($desiredTier.val());
    if (currentDesiredTier < currentTier) {
        // This doesn't trigger change handlers which is nice.
        $desiredTier.val("" + currentTier);
    }
}