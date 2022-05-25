function getPrimeLineValue(itemLevel, desiredTier, type) {
    const levelBonus = itemLevel >= 160 && !(type === "hp") ? 1 : 0;
    const base = type === "all" ? 0 : 3;

    return base + (3 * desiredTier) + levelBonus;
}

function get3LStatOptionAmounts(prime) {
    const ppp = prime * 3;
    const ppn = ppp - 3;
    const pnn = ppp - 6;
    const pna = ppp - 9; // This doesn't work for max HP legendary but the 3 DAs won't complain.
    const paa = ppp - 12;
    const aaa = ppp - 15;
    // -15 is the lowest we go since in epic tier we're down to 3%.
    // Most people don't care for lower values in unique/legendary anyway.
    return [aaa,
        paa,
        pna,
        pnn,
        ppn,
        ppp];
}

function get2LStatOptionAmounts(prime) {
    // For when we want to do stuff like 2L + boss.
    const pp = prime * 2;
    const pn = pp - 3;
    const nn = pp - 6;
    return [nn,
        pn,
        pp];
}

export const $desiredStats = $('#desiredStats');

function removeGroupIfExists(id) {
    if (document.getElementById(id)) {
        $(`#${id}`).remove();
    }
}

function addNormalOptionGroup(prefix, valueText, textText, groupLabel, optionAmounts) {
    // If the optgroup already exists, update the values and text in case the user changed the item level.
    if (document.getElementById(`${prefix}Group`)) {
        optionAmounts.forEach((val, i) => {
            const $option = $(`#${prefix}${i}`);
            $option.attr("value", `${val}${valueText}`);
            $option.text(`${val}%+ ${textText}`);
        });
    } else {
        // Create the optgroup and options.
        $desiredStats.append(`<optgroup id='${prefix}Group' label='${groupLabel}'></optgroup>`);
        const $statGroup = $(`#${prefix}Group`);
        optionAmounts.forEach((val, i) => $statGroup.append(
            `<option id='${prefix}${i}' value='${val}${valueText}'>${val}%+ ${textText}</option>`));
    }
}

function addNormalStatOptions(itemLevel, desiredTier) {
    const regPrime = getPrimeLineValue(itemLevel, desiredTier)
    const regOptionAmounts = get3LStatOptionAmounts(regPrime);
    addNormalOptionGroup("regStat",
        "PercLUK",
        "Stat",
        "Regular Stat",
        regOptionAmounts);

    const hpPrime = getPrimeLineValue(itemLevel, desiredTier, "hp");
    const hpOptionAmounts = get3LStatOptionAmounts(hpPrime);
    addNormalOptionGroup("hpStat",
        "PercHP",
        "Max HP",
        "Max HP (Demon Avenger)",
        hpOptionAmounts);

    const allStatPrime = getPrimeLineValue(itemLevel, desiredTier, "all");

    const allStatOptionAmounts = desiredTier === 1 ?
        // Not enough all stat lines to use 3L options lol.
        // Instead, we add some values corresponding to all stat + some regular stat lines.
        [1, 3, 4, 5, 6, 9] :
        get3LStatOptionAmounts(allStatPrime);
    addNormalOptionGroup("allStat",
        "PercALL",
        "All Stat",
        "All Stat (For Xenon)",
        allStatOptionAmounts);
}

function removeNormalStatOptions() {
    removeGroupIfExists("regStatGroup");
    removeGroupIfExists("hpStatGroup");
    removeGroupIfExists("allStatGroup");
}

function addCommonWSEOptions(itemLevel, desiredTier) {
    const prime = getPrimeLineValue(itemLevel, desiredTier);
    const optionAmounts = get3LStatOptionAmounts(prime);
    addNormalOptionGroup("attack",
        "PercATT",
        "Attack",
        "Attack",
        optionAmounts);

    const IEDOptionAmounts = get2LStatOptionAmounts(prime);
    addNormalOptionGroup("attackAndIED",
        "ATTandIED",
        "Attack and IED",
        "Attack With 1 Line of IED",
        IEDOptionAmounts);
}

function removeCommonWSEOptions() {
    removeGroupIfExists("attackGroup");
    removeGroupIfExists("attackAndIEDGroup");
}

function removeCommonSEOptions() {
    removeGroupIfExists("attackAndBossGroup");
}

function addCommonSEOptions(itemLevel, desiredTier) {
    const prime = getPrimeLineValue(itemLevel, desiredTier);
    const [_, pn, pp] = get2LStatOptionAmounts(prime);

    // To avoid having to figure out which lines to change when changing potential tier.
    removeCommonSEOptions();

    // Epic
    if (desiredTier === 1) {
        // No boss damage in epic.
        return;
    }

    $desiredStats.append(`<optgroup id='attackAndBossGroup' label='Attack and Boss Damage'></optgroup>`);
    const $attackAndBossGroup = $('#attackAndBossGroup');
    $attackAndBossGroup.append("<option id='1Att1Boss' value='1ATTand1BOSS'>1 Line Attack% + 1 Line Boss%</option>");
    $attackAndBossGroup.append("<option id='1Att2Boss' value='1ATTand2BOSS'>1 Line Attack% + 2 Line Boss%</option>");
    $attackAndBossGroup.append("<option id='2Att1Boss' value='2ATTand1BOSS'>2 Line Attack% + 1 Line Boss%</option>");

    $attackAndBossGroup.append(`<option id='$PNATT30BOSS' value='${pn}ATT30BOSS'>${pn}%+ Attack and 30%+ Boss</option>`);
    if (desiredTier === 3) {
        // Unique doesn't have more than 30% boss
        $attackAndBossGroup.append(`<option id='$PNATT35BOSS' value='${pn}ATT35BOSS'>${pn}%+ Attack and 35%+ Boss</option>`);
        $attackAndBossGroup.append(`<option id='$PNATT40BOSS' value='${pn}ATT40BOSS'>${pn}%+ Attack and 40%+ Boss</option>`);
    }
    $attackAndBossGroup.append(`<option id='$PPATT30BOSS' value='${pp}ATT30BOSS'>${pp}%+ Attack and 30%+ Boss</option>`);
}

function removeCritDamageOptions() {
    removeGroupIfExists("critDamageGroup");
}

function addCritDamageOptions(desiredTier) {
    if (desiredTier !== 3) {
        removeCritDamageOptions();
        return;
    }
    if (!document.getElementById(`critDamageGroup`)) {
        $desiredStats.append(`<optgroup id='critDamageGroup' label='Crit Damage'></optgroup>`);
        const $critDamageGroup = $('#critDamageGroup');
        $critDamageGroup.append("<option id='gloves' value='1LCrit'>1 Line Crit Dmg%</option>");

        $critDamageGroup.append("<option id='gloves1' value='1LCritAndStat'>1 Line Crit Dmg% and Stat%</option>");
        $critDamageGroup.append("<option id='gloves2' value='1LCritAndALL'>1 Line Crit Dmg% and All Stat%</option>");
        $critDamageGroup.append("<option id='gloves3' value='1LCritandHP'>1 Line Crit Dmg% and MaxHP%</option>");

        $critDamageGroup.append("<option id='gloves8' value='1LCritAnd2Stat'>1 Line Crit Dmg% and 2L Stat%</option>");
        $critDamageGroup.append("<option id='gloves9' value='1LCritAnd2ALL'>1 Line Crit Dmg% and 2L All Stat%</option>");
        $critDamageGroup.append("<option id='gloves10' value='1LCritand2HP'>1 Line Crit Dmg% and 2L MaxHP%</option>");

        $critDamageGroup.append("<option id='gloves4' value='2LCrit'>2 Line Crit Dmg%</option>");

        $critDamageGroup.append("<option id='gloves5' value='2LCritAndStat'>2 Line Crit Dmg% and Stat%</option>");
        $critDamageGroup.append("<option id='gloves6' value='2LCritAndALL'>2 Line Crit Dmg% and All Stat%</option>");
        $critDamageGroup.append("<option id='gloves7' value='2CritandHP'>2 Line Crit Dmg% and MaxHP%</option>");

        $critDamageGroup.append("<option id='gloves8' value='3LCrit'>3 Line Crit Dmg%</option>");
    }
}

function removeDropAndMesoOptions() {
    removeGroupIfExists("dropMesoGroup");
}

function addDropAndMesoOptions(desiredTier) {
    if (desiredTier !== 3) {
        removeDropAndMesoOptions();
        return;
    }
    if (!document.getElementById(`dropMesoGroup`)) {
        $desiredStats.append(`<optgroup id='dropMesoGroup' label='Drop/Meso'></optgroup>`);
        const $dropMesoGroup = $('#dropMesoGroup');
        $dropMesoGroup.append("<option id='accessory3' value='1LMeso'>1 Line Mesos Obtained%</option>");
        $dropMesoGroup.append("<option id='accessory4' value='1LDrop'>1 Line Item Drop%</option>");
        $dropMesoGroup.append("<option id='accessory5' value='1LDropOrMeso'>1 Line of Item Drop% or Mesos Obtained%</option>");

        $dropMesoGroup.append("<option id='accessory6' value='1LMesoAndStat'>1 Line Mesos Obtained% and Stat%</option>");
        $dropMesoGroup.append("<option id='accessory7' value='1LMesoAndALL'>1 Line Mesos Obtained% and All Stat%</option>");
        $dropMesoGroup.append("<option id='accessory8' value='1LMesoAndHP'>1 Line Mesos Obtained% and MaxHP%</option>");

        $dropMesoGroup.append("<option id='accessory9' value='1LDropAndStat'>1 Line Item Drop% and Stat%</option>");
        $dropMesoGroup.append("<option id='accessory10' value='1LDropAndALL'>1 Line Item Drop% and All Stat%</option>");
        $dropMesoGroup.append("<option id='accessory11' value='1LDropAndHP'>1 Line Item Drop% and MaxHP%</option>");

        $dropMesoGroup.append("<option id='accessory12' value='1LDropOrMesoAndStat'>1 Line of (Item Drop% or Mesos Obtained%) with Stat%</option>");
        $dropMesoGroup.append("<option id='accessory13' value='1LDropOrMesoAndALL'>1 Line of (Item Drop% or Mesos Obtained%) with All Stat%</option>");
        $dropMesoGroup.append("<option id='accessory14' value='1LDropOrMesoAndHP'>1 Line of (Item Drop% or Mesos Obtained%) with MaxHP%</option>");

        $dropMesoGroup.append("<option id='accessory' value='2LMeso'>2 Line Mesos Obtained%</option>");
        $dropMesoGroup.append("<option id='accessory1' value='2LDrop'>2 Line Item Drop%</option>");
        $dropMesoGroup.append("<option id='accessory2' value='2LDropOrMeso'>2 Lines Involving Item Drop% or Mesos Obtained%</option>");

        $dropMesoGroup.append("<option id='accessory' value='3LMeso'>3 Line Mesos Obtained%</option>");
    }
}

function removeCDOptions() {
    removeGroupIfExists("CDGroup");
}

function addCDOptions(desiredTier) {
    if (desiredTier !== 3) {
        removeCDOptions();
        return;
    }
    if (!document.getElementById(`CDGroup`)) {
        ////2SecCD, 3SecCD, 4SecCD, 2SecCDAndStat, 2SecCDAndHP, 2SecCDAndALL, 2SecCDAnd2Stat, 2SecCDAnd2HP, 2SecCDAnd2ALL, 3SecCDAndStat, 3SecCDAndHP, 3SecCDAndALL, 4SecCDAndStat, 4SecCDAndHP, 4SecCDAndALL
        $desiredStats.append(`<optgroup id='CDGroup' label='Cooldown'></optgroup>`);
        const $CDGroup = $('#CDGroup');
        $CDGroup.append("<option id='hat' value='2SecCD'>-2sec+ CD Reduction</option>");
        $CDGroup.append("<option id='hat1' value='3SecCD'>-3sec+ CD Reduction</option>");
        $CDGroup.append("<option id='hat2' value='4SecCD'>-4sec+ CD Reduction</option>");
        $CDGroup.append("<option id='hat15' value='5SecCD'>-5sec+ CD Reduction</option>");
        $CDGroup.append("<option id='hat16' value='6SecCD'>-6sec+ CD Reduction</option>");

        $CDGroup.append("<option id='hat3' value='2SecCDAndStat'>-2sec+ CD Reduction and Stat%</option>");
        $CDGroup.append("<option id='hat4' value='2SecCDAndHP'>-2sec+ CD Reduction and MaxHP%</option>");
        $CDGroup.append("<option id='hat5' value='2SecCDAndALL'>-2sec+ CD Reduction and All Stat%</option>");

        $CDGroup.append("<option id='hat6' value='2SecCDAnd2Stat'>-2sec+ CD Reduction and 2 Line Stat%</option>");
        $CDGroup.append("<option id='hat7' value='2SecCDAnd2HP'>-2sec+ CD Reduction and 2 Line Max HP%</option>");
        $CDGroup.append("<option id='hat8' value='2SecCDAnd2ALL'>-2sec+ CD Reduction and 2 Line All Stat%</option>");

        $CDGroup.append("<option id='hat9' value='3SecCDAndStat'>-3sec+ CD Reduction and Stat%</option>");
        $CDGroup.append("<option id='hat10' value='3SecCDAndHP'>-3sec+ CD Reduction and Max HP%</option>");
        $CDGroup.append("<option id='hat11' value='3SecCDAndALL'>-3sec+ CD Reduction and All Stat%</option>");

        $CDGroup.append("<option id='hat12' value='4SecCDAndStat'>-4sec+ CD Reduction and Stat%</option>");
        $CDGroup.append("<option id='hat13' value='4SecCDAndHP'>-4sec+ CD Reduction and Max HP%</option>");
        $CDGroup.append("<option id='hat14' value='4SecCDAndALL'>-4sec+ CD Reduction and All Stat%</option>");
    }
}

export function updateDesiredStats() {
    const itemType = document.getElementById('itemType').value;
    const itemLevel = parseInt(document.getElementById('itemLevel').value);
    const desiredTier = parseInt(document.getElementById('desiredTier').value);

    if (itemType === 'weapon' || itemType === 'secondary' || itemType === 'emblem') {
        removeNormalStatOptions();
        addCommonWSEOptions(itemLevel, desiredTier);

        if (itemType !== 'emblem') {
            addCommonSEOptions(itemLevel, desiredTier);
        } else {
            removeCommonSEOptions()
        }
    } else {
        addNormalStatOptions(itemLevel, desiredTier);
        removeCommonWSEOptions();
        removeCommonSEOptions();
    }

    if (itemType === 'gloves') {
        addCritDamageOptions(desiredTier);
    } else {
        removeCritDamageOptions();
    }

    if (itemType === 'accessory') {
        addDropAndMesoOptions(desiredTier);
    } else {
        removeDropAndMesoOptions();
    }

    if (itemType === 'hat') {
        addCDOptions(desiredTier);
    } else {
        removeCDOptions();
    }
}