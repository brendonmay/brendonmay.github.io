function updateAttackTierOptions(flame_type, flame_advantage) {
    // Tier 1 and 2 are skipped, so index 1 is tier 3.
    let maxTierIndex = 2;
    if (flame_type === 'eternal') {
        maxTierIndex += 1;
    }
    if (flame_advantage) {
        maxTierIndex += 2;
    }
    // No need to disable tier 4+ and under, they're always valid.
    const attackTierSelect = document.getElementById('attack_tier');
    for (let i = 3; i <= 5; i++) {
        attackTierSelect.options[i].disabled = i > maxTierIndex;
    }
}

const DA_ATTACK_TIER_SELECTOR = '#da_attack_tier';
const HP_TIER_SELECTOR = '#hp_tier';
function updateDAOptions(flame_type, flame_advantage) {
    const $attackTier = $(DA_ATTACK_TIER_SELECTOR);
    const $hpTier = $(HP_TIER_SELECTOR);

    $attackTier.empty();
    $hpTier.empty();

    $attackTier.append("<option value=0>Tier 0+</option>");
    $hpTier.append("<option value=0>Tier 0+</option>");

    const base = flame_type === 'powerful' ? 1 : 2;
    const min = base + flame_advantage ? 2 : 0;
    const max = min + 3;

    for (let i = min; i <= max; i++) {
        const extra = i !== max ? "+" : "";
        $attackTier.append(`<option value=${i}>Tier ${i}${extra}</option>`);
        $hpTier.append(`<option value=${i}>Tier ${i}${extra}</option>`);
    }
}

function showArmorInputsForClass(maple_class) {
    const isKanna = maple_class === "kanna";
    const isXenon = maple_class === "xenon";
    const isDualStat = maple_class === "db" || maple_class === "shadower" || maple_class === "cadena";
    const isDA = maple_class === "da";
    const isOther = maple_class === "other";

    document.getElementById("statequivalences").hidden = isDA;
    document.getElementById("statequivalences_title").hidden = isDA;

    document.getElementById("da_desired_stats").hidden = !isDA;
    document.getElementById("armor_desired_stats").hidden = isDA

    document.getElementById('hp_stat_div').hidden = !isKanna;
    document.getElementById('luk_stat_div').hidden = !isKanna;
    document.getElementById('str_stat_div').hidden = !isDualStat;
    document.getElementById('dex_stat_div').hidden = !isDualStat;
    document.getElementById('secondary_stat_div').hidden = !isOther;

    if (isKanna) {
        document.getElementById("all_stat").value = 8
        document.getElementById("attack").value = 3
    } else if (isXenon) {
        document.getElementById("desired_stat_armor").value = 200
        document.getElementById("all_stat").value = 19
        document.getElementById("attack").value = 8
    } else if (isDualStat) {
        document.getElementById("all_stat").value = 8
        document.getElementById("attack").value = 3
    } else if (isOther) {
        document.getElementById("all_stat").value = 8
        document.getElementById("attack").value = 3
    }
}

function onItemTypeChange() {
    var maple_class = document.getElementById("maple_class").value
    var item_type = document.getElementById('item_type').value
    var flame_type = document.getElementById('flame_type').value
    var flame_advantage = document.getElementById('flame-advantaged').checked
    if (item_type === 'armor') {
        if (maple_class === "da") {
            updateDAOptions(flame_type, flame_advantage)
        }
        updateItemLevels(maple_class);
        showArmorInputsForClass(maple_class);
        document.getElementById('weapon_desired_stats').hidden = true;
        document.getElementById('item_level_div').hidden = false;
    } else {
        document.getElementById('weapon_desired_stats').hidden = false;
        document.getElementById('armor_desired_stats').hidden = true;
        document.getElementById('statequivalences').hidden = true;
        document.getElementById('statequivalences_title').hidden = true;
        document.getElementById('item_level_div').hidden = true;
        document.getElementById("da_desired_stats").hidden = true

        updateAttackTierOptions(flame_type, flame_advantage);
    }
}

function onClassChange() {
    var maple_class = document.getElementById("maple_class").value
    var flame_type = document.getElementById("flame_type").value
    var flame_advantage = document.getElementById('flame-advantaged')

    if (document.getElementById("item_type").value === "armor") {
        if (maple_class === "da") {
            updateDAOptions(flame_type, flame_advantage);
        }
        updateItemLevels(maple_class);
        showArmorInputsForClass(maple_class);
    }
}

function onFlameAdvantagedChange() {
    var flame_type = document.getElementById('flame_type').value
    var item_type = document.getElementById('item_type').value
    var maple_class = document.getElementById('maple_class').value
    var flame_advantage = document.getElementById('flame-advantaged').checked
    if (item_type === 'weapon') {
        updateAttackTierOptions(flame_type, flame_advantage);
    }
    if (maple_class === "da" && item_type === 'armor') {
        updateDAOptions(flame_type, flame_advantage);
    }
}

function onFlameTypeChange() {
    var flame_type = document.getElementById('flame_type').value
    var item_type = document.getElementById('item_type').value
    var maple_class = document.getElementById('maple_class').value
    var flame_advantage = document.getElementById('flame-advantaged').checked
    if (item_type === 'weapon') {
        updateAttackTierOptions(flame_type, flame_advantage);
    }
    if (maple_class === 'da') {
        updateDAOptions(flame_type, flame_advantage);
    }
}