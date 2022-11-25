// You can't tier down, so we hide lower desired tiers for convenience.
function updateDesiredTierOptions(currentTier) {
    const $desiredTier = $('#desiredTier');
    const $desiredTierOptions = $desiredTier.find("option");

    // Update selected option before hiding the others.
    // Doing it the other way around breaks things.
    const currentDesiredTier = parseInt($desiredTier.val());
    if (currentDesiredTier < currentTier) {
        $desiredTier.val("" + currentTier);
    }

    for (const o of $desiredTierOptions) {
        const $option = $(o);
        const v = parseInt($option.val());
        const relevantOption = v >= currentTier;
        $option.prop("disabled", !relevantOption);
        $option.toggle(relevantOption);
    }
}