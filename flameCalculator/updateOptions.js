const DA_ATTACK_TIER_SELECTOR = '#da_attack_tier';
const HP_TIER_SELECTOR = '#hp_tier';
const ITEM_LEVEL_SELECTOR = '#item_level';

function updateAttackTierOptions(flame_type, flame_advantage) {
    const maxAttackTierIndex = getUpperTierLimit(flame_type, !flame_advantage) - 1;
    const attackTierSelect = document.getElementById('attack_tier');
    for (let i = 0; i <= 7; i++) {
        attackTierSelect.options[i].disabled = i > maxAttackTierIndex;
    }
}

function getUpperTierLimit(flame_type, non_advantaged_item) {
    const flameAdvantageAdjustment = non_advantaged_item ? 2 : 0;
    for (let i = 8; i >= 3; i--) {
        if (TIER_PROBABILITIES[flame_type][i] > 0) {
            // +1 because the loop uses < and not <=
            return i - flameAdvantageAdjustment + 1;
        }
    }
    return 8;
}

function getLowerTierLimit(flame_type, non_advantaged_item) {
    const flameAdvantageAdjustment = non_advantaged_item ? 2 : 0;
    for (let i = 3; i <= 8; i++) {
        if (TIER_PROBABILITIES[flame_type][i] > 0) {
            return i - flameAdvantageAdjustment;
        }
    }
    return 3;
}

function updateItemLevels(maple_class) {
    const $itemLevel = $(ITEM_LEVEL_SELECTOR);
    const isArmor = document.getElementById("item_type").value === "armor";
    const isDA = maple_class === "da";
    document.getElementById("item_level_div").hidden = isArmor && isDA;
    $itemLevel.empty()
    if (maple_class == "kanna" || maple_class == 'da') {
        $itemLevel.append("<option value='120-129'>120-129</option>")
        $itemLevel.append("<option value='130-139'>130-139</option>")
        $itemLevel.append("<option value='140-149'>140-149</option>")
        $itemLevel.append("<option value='150-159'>150-159</option>")
        $itemLevel.append("<option value='160-169'>160-169</option>")
        $itemLevel.append("<option value='170-179'>170-179</option>")
        $itemLevel.append("<option value='180-189'>180-189</option>")
        $itemLevel.append("<option value='190-199'>190-199</option>")
        $itemLevel.append("<option value='200-209'>200-209</option>")
        $itemLevel.append("<option value='210-219'>210-219</option>")
        $itemLevel.append("<option value='220-229'>220-229</option>")
        $itemLevel.append("<option value='230-239'>230-239</option>")
        $itemLevel.append("<option value='240-249'>240-249</option>")
        $itemLevel.append("<option value='250+'>250+</option>")
    }
    else {
        $itemLevel.append("<option value='120-139'>120-139</option>")
        $itemLevel.append("<option value='140-159'>140-159</option>")
        $itemLevel.append("<option value='160-179'>160-179</option>")
        $itemLevel.append("<option value='180-199'>180-199</option>")
        $itemLevel.append("<option value='200-229'>200-229</option>")
        $itemLevel.append("<option value='230-249'>230-249</option>")
        $itemLevel.append("<option value='250+'>250+</option>")
    }
}
function updateDAOptions(flame_type, flame_advantage) {
    const $attackTier = $(DA_ATTACK_TIER_SELECTOR);
    const $hpTier = $(HP_TIER_SELECTOR);

    $attackTier.empty();
    $hpTier.empty();

    $attackTier.append("<option value=0>Tier 0+</option>");
    $hpTier.append("<option value=0>Tier 0+</option>");


    const maxTierIndex = getUpperTierLimit(flame_type, !flame_advantage);
    const minTierIndex = getLowerTierLimit(flame_type, !flame_advantage);

    for (let i = minTierIndex; i < maxTierIndex; i++) {
        const extra = i !== maxTierIndex ? "+" : "";
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
    const isDb = maple_class === "db"
    const isShad = maple_class === "shadower"
    const isCadena = maple_class === "cadena"

    var item_type = document.getElementById('item_type').value

    document.getElementById("statequivalences").hidden = false;
    document.getElementById("statequivalences_title").hidden = false;

    document.getElementById("da_desired_stats").hidden = !isDA;
    document.getElementById("armor_desired_stats").hidden = false

    document.getElementById('hp_stat_div').hidden = !isKanna;
    document.getElementById('luk_stat_div').hidden = !isKanna;
    document.getElementById('str_stat_div').hidden = !isDualStat;
    document.getElementById('dex_stat_div').hidden = !isDualStat;
    document.getElementById('secondary_stat_div').hidden = !isOther;

    if (document.getElementById('flamescorecheck').checked) {
        document.getElementById('hp_flame_div').hidden = !isKanna;
        document.getElementById('luk_flame_div').hidden = !isKanna;
        document.getElementById('str_flame_div').hidden = !isDualStat;
        document.getElementById('dex_flame_div').hidden = !isDualStat;
        document.getElementById('sec_flame_div').hidden = !isOther;
        document.getElementById('all_flame_div').hidden = false
        
        document.getElementById('all_flame_div').hidden = false
        document.getElementById('dmg_flame_div').hidden = false
        document.getElementById('boss_flame_div').hidden = false
        document.getElementById('att_flame_div').hidden = false
        document.getElementById('main_flame_div').hidden = false

        document.getElementById('flamebutton_div').hidden = false
        document.getElementById('flamescore_div').hidden = false
        document.getElementById('main_flame_div').hidden = false
        document.getElementById('dahp_flame_div').hidden = true
        

        if (item_type == 'armor') {
            document.getElementById('dmg_flame_div').hidden = true
            document.getElementById('boss_flame_div').hidden = true
        }

        if (maple_class == 'da') {
            document.getElementById('all_flame_div').hidden = true
            document.getElementById('main_flame_div').hidden = true
            document.getElementById('dahp_flame_div').hidden = false
        }
    }

    const baseAttack = document.getElementById('base_attack_div');
    baseAttack.style.display = 'none';

    const wepLevel = document.getElementById('w_level_div');
    wepLevel.style.display = 'none';

    if (isKanna) {
        document.getElementById("all_stat").value = 10
        document.getElementById("attack").value = 2
        document.getElementById("boss_stat").value = 18
        document.getElementById("hp_stat").value = 350
        document.getElementById("luk_stat").value = 11
        document.getElementById("desired_stat_armor").value = 100
        if (item_type == 'weapon') document.getElementById("desired_stat_armor").value = 400

    } else if (isXenon) {
        document.getElementById("all_stat").value = 25
        document.getElementById("attack").value = 6
        document.getElementById("boss_stat").value = 30
        document.getElementById("desired_stat_armor").value = 230
        if (item_type == 'weapon') document.getElementById("desired_stat_armor").value = 700

    } else if (isShad || isDb || isCadena) {
        document.getElementById("all_stat").value = 10
        document.getElementById("attack").value = 3
        document.getElementById("boss_stat").value = 13
        document.getElementById("dex_stat").value = 12
        document.getElementById("str_stat").value = 12
        document.getElementById("desired_stat_armor").value = 100
        if (item_type == 'weapon') document.getElementById("desired_stat_armor").value = 500
    } 
    else if (isOther) {
        document.getElementById("all_stat").value = 10
        document.getElementById("attack").value = 3
        document.getElementById("boss_stat").value = 15
        document.getElementById("secondary_stat").value = 12
        document.getElementById("desired_stat_armor").value = 100
        if (item_type == 'weapon') document.getElementById("desired_stat_armor").value = 500
    }
    else if(isDA) {
        document.getElementById("attack").value = 78
        document.getElementById("boss_stat").value = 390
        document.getElementById("desired_stat_armor").value = 3000
        if (item_type == 'weapon') document.getElementById("desired_stat_armor").value = 15000
    }
}

function onItemTypeChange() {
    var maple_class = document.getElementById("maple_class").value
    var item_type = document.getElementById('item_type').value
    var flame_type = document.getElementById('flame_type').value
    var flame_advantage = document.getElementById('flame-advantaged').checked
    // if (maple_class != "da") {
        updateItemLevels(maple_class);
        showArmorInputsForClass(maple_class);
        document.getElementById('weapon_desired_stats').hidden = true;
        document.getElementById('item_level_div').hidden = false;
        document.getElementById('boss_stat_div').hidden = true;
        document.getElementById("da_desired_stats").hidden = true
        document.getElementById("all_stat_div").hidden = false

        if (maple_class == "da") document.getElementById("all_stat_div").hidden = true

        if (item_type === 'weapon') {
            document.getElementById('boss_stat_div').hidden = false;
            const baseAttack = document.getElementById('base_attack_div');
            baseAttack.style.display = 'block';

            if (maple_class != 'da' && maple_class != 'kanna'){
                const wepLevel = document.getElementById('w_level_div');
                wepLevel.style.display = 'block';
                document.getElementById('item_level_div').hidden = true;
            }

            
        }
    // }
    // else {
    //     document.getElementById('item_level_div').hidden = true;
    //     if (item_type === 'armor') {
    //         updateDAOptions(flame_type, flame_advantage)
    //         document.getElementById("da_desired_stats").hidden = false
    //         document.getElementById('weapon_desired_stats').hidden = true;
    //         document.getElementById('armor_desired_stats').hidden = true;
    //     }
    //     else {
    //         document.getElementById('weapon_desired_stats').hidden = false;
    //         document.getElementById('armor_desired_stats').hidden = true;
    //         document.getElementById('statequivalences').hidden = true;
    //         document.getElementById('statequivalences_title').hidden = true;
    //         document.getElementById("da_desired_stats").hidden = true

    //         updateAttackTierOptions(flame_type, flame_advantage);
    //     }
    // }
}

function onClassChange() {
    var maple_class = document.getElementById("maple_class").value
    var flame_type = document.getElementById("flame_type").value
    var flame_advantage = document.getElementById('flame-advantaged')
    var item_type = document.getElementById('item_type').value

    // if (maple_class === "da") {

    //     document.getElementById('item_level_div').hidden = true;
    //     document.getElementById('flamescore_div').hidden = true
    //     document.getElementById('all_flame_div').hidden = true
    //     document.getElementById('dmg_flame_div').hidden = true
    //     document.getElementById('boss_flame_div').hidden = true
    //     document.getElementById('att_flame_div').hidden = true
    //     document.getElementById('hp_flame_div').hidden = true
    //     document.getElementById('luk_flame_div').hidden = true
    //     document.getElementById('str_flame_div').hidden = true
    //     document.getElementById('dex_flame_div').hidden = true
    //     document.getElementById('sec_flame_div').hidden = true
    //     document.getElementById('main_flame_div').hidden = true
    //     document.getElementById('flamebutton_div').hidden = true

    //     if (item_type === 'armor') {
    //         updateDAOptions(flame_type, flame_advantage)
    //         document.getElementById("da_desired_stats").hidden = false
    //         document.getElementById('weapon_desired_stats').hidden = true
    //         document.getElementById('statequivalences').hidden = true
    //         document.getElementById('statequivalences_title').hidden = true
    //         document.getElementById('armor_desired_stats').hidden = true;
    //     }

    //     else {
    //         document.getElementById('weapon_desired_stats').hidden = false;
    //         document.getElementById('armor_desired_stats').hidden = true;
    //         document.getElementById('statequivalences').hidden = true;
    //         document.getElementById('statequivalences_title').hidden = true;
    //         document.getElementById("da_desired_stats").hidden = true

    //         updateAttackTierOptions(flame_type, flame_advantage);
    //     }
    // }

    // else {
        updateItemLevels(maple_class);
        showArmorInputsForClass(maple_class);
        document.getElementById("da_desired_stats").hidden = true
        document.getElementById('weapon_desired_stats').hidden = true;
        document.getElementById('item_level_div').hidden = false;
        document.getElementById('boss_stat_div').hidden = true;
        document.getElementById("all_stat_div").hidden = false

        if (maple_class == "da"){
            document.getElementById("all_stat_div").hidden = true
        }


        if (item_type === 'weapon') {
            document.getElementById('boss_stat_div').hidden = false;
            const baseAttack = document.getElementById('base_attack_div');
            baseAttack.style.display = 'block';

            if (maple_class != 'da' && maple_class != 'kanna'){
                const wepLevel = document.getElementById('w_level_div');
                wepLevel.style.display = 'block';
                document.getElementById('item_level_div').hidden = true;
            }
        }
    // }
}

function onFlameAdvantagedChange() {
    var flame_type = document.getElementById('flame_type').value
    var item_type = document.getElementById('item_type').value
    var maple_class = document.getElementById('maple_class').value
    var flame_advantage = document.getElementById('flame-advantaged').checked
    // if (maple_class === "da" && item_type === 'weapon') {
    //     updateAttackTierOptions(flame_type, flame_advantage);
    // }
    // if (maple_class === "da" && item_type === 'armor') {
    //     updateDAOptions(flame_type, flame_advantage);
    // }
}

function onFlameTypeChange() {
    var flame_type = document.getElementById('flame_type').value
    var item_type = document.getElementById('item_type').value
    var maple_class = document.getElementById('maple_class').value
    var flame_advantage = document.getElementById('flame-advantaged').checked
    // if (item_type === 'weapon') {
    //     updateAttackTierOptions(flame_type, flame_advantage);
    // }
    // if (maple_class === 'da') {
    //     updateDAOptions(flame_type, flame_advantage);
    // }
}