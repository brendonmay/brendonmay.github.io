// Note(sethyboy0) This file contains the functions that update the options in the desired stats dropdown as the user
// configures everything else. It also contains the function that translates between the <select> <option> values and
// the object that the probability calculator uses.

/**
 * This function translates the string that comes from the select element to the object that the probability calculator
 * uses. To make it simple to add more options to the calculator I'm going with the following system for <select>
 * <option> values:
 *
 * Each <option>'s value will be a string that looks like v1&v2&v3, where each v looks like "s+n". s is the name of the
 * stat and n is a number for how much of it we want. Each v is separated by & to make it easy to parse. s and n are
 * likewise separated by + so they are easy to parse and unambiguous.
 *
 * For what the possible stats are, see emptyInputObject in getProbability.js
 *
 * @param webInput (string) The value from the HTML element.
 */
function translateInputToObject(webInput) {
    const vals = webInput.split("&");
    const output = Object.assign({}, emptyInputObject);
    for (const val of vals) {
        const [stat, amount] = val.split("+");
        output[stat] += parseInt(amount);
    }
    return output;
}

function getPrimeLineValue(itemLevel, desiredTier, type) {
    const levelBonus = itemLevel >= 160 && !(type === "hp") ? 1 : 0;
    const base = type === "all" ? 0 : 3;

    return base + (3 * desiredTier) + levelBonus;
}

function get3LStatOptionAmounts(prime) {
    // To keep things understandable -> p = prime, n = nonprime, a = allstat.
    const ppp = prime * 3;
    const ppn = ppp - 3;
    const pnn = ppp - 6;
    const pna = ppp - 9; // This doesn't work for max HP legendary, but it's not worth a special case.
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

function removeGroupIfExists(id) {
    if (document.getElementById(id)) {
        $(`#${id}`).remove();
    }
}

function addNormalOptionGroup(prefix, statValueName, displayText, groupLabel, optionAmounts) {
    // If the optgroup already exists, update the values and text in case the user changed the item level.
    if (document.getElementById(`${prefix}Group`)) {
        optionAmounts.forEach((val, i) => {
            const $option = $(`#${prefix}${i}`);
            $option.attr("value", `${statValueName}+${val}`);
            $option.text(`${val}%+ ${displayText}`);
        });
    } else {
        // Create the optgroup and options.
        $('#desiredStats').append(`<optgroup id='${prefix}Group' label='${groupLabel}'></optgroup>`);
        const $statGroup = $(`#${prefix}Group`);
        optionAmounts.forEach((val, i) => $statGroup.append(
            `<option id='${prefix}${i}' value='${statValueName}+${val}'>${val}%+ ${displayText}</option>`));
    }
}

function addNormalStatOptions(itemLevel, desiredTier) {
    const regPrime = getPrimeLineValue(itemLevel, desiredTier)
    const regOptionAmounts = get3LStatOptionAmounts(regPrime);
    addNormalOptionGroup("regStat",
        "percStat",
        "Stat",
        "Regular Stat",
        regOptionAmounts);

    const hpPrime = getPrimeLineValue(itemLevel, desiredTier, "hp");
    const hpOptionAmounts = get3LStatOptionAmounts(hpPrime);
    addNormalOptionGroup("hpStat",
        "percHp",
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
        "percAllStat",
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
        "percAtt",
        "Attack",
        "Attack",
        optionAmounts);

    const IEDOptionAmounts = get2LStatOptionAmounts(prime);
    addNormalOptionGroup("attackAndIED",
        "lineIed+1&percAtt",
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

    $('#desiredStats').append(`<optgroup id='attackAndBossGroup' label='Attack and Boss Damage'></optgroup>`);
    const $attackAndBossGroup = $('#attackAndBossGroup');
    $attackAndBossGroup.append("<option id='percAtt+1&percBoss+1' value='lineAtt+1&lineBoss+1'>1 Line Attack% + 1 Line Boss%</option>");
    $attackAndBossGroup.append("<option id='percAtt+1&percBoss+2' value='lineAtt+1&lineBoss+2'>1 Line Attack% + 2 Line Boss%</option>");
    $attackAndBossGroup.append("<option id='percAtt+2&percBoss+1' value='lineAtt+2&lineBoss+1'>2 Line Attack% + 1 Line Boss%</option>");

    $attackAndBossGroup.append(`<option id='$PNATT30BOSS' value='percAtt+${pn}&percBoss+30'>${pn}%+ Attack and 30%+ Boss</option>`);
    if (desiredTier === 3) {
        // Unique doesn't have more than 30% boss
        $attackAndBossGroup.append(`<option id='$PNATT35BOSS' value='percAtt+${pn}&percBoss+35'>${pn}%+ Attack and 35%+ Boss</option>`);
        $attackAndBossGroup.append(`<option id='$PNATT40BOSS' value='percAtt+${pn}&percBoss+40'>${pn}%+ Attack and 40%+ Boss</option>`);
    }
    $attackAndBossGroup.append(`<option id='$PPATT30BOSS' value='percAtt+${pp}&percBoss+30'>${pp}%+ Attack and 30%+ Boss</option>`);
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
        $('#desiredStats').append(`<optgroup id='critDamageGroup' label='Crit Damage'></optgroup>`);
        const $critDamageGroup = $('#critDamageGroup');
        $critDamageGroup.append("<option id='gloves' value='lineCritDamage+1'>1 Line Crit Dmg%</option>");

        $critDamageGroup.append("<option id='gloves1' value='lineCritDamage+1&lineStat+1'>1 Line Crit Dmg% and Stat%</option>");
        $critDamageGroup.append("<option id='gloves2' value='lineCritDamage+1&lineAllStat+1'>1 Line Crit Dmg% and All Stat%</option>");
        $critDamageGroup.append("<option id='gloves3' value='lineCritDamage+1&lineHp+1'>1 Line Crit Dmg% and MaxHP%</option>");

        $critDamageGroup.append("<option id='gloves8' value='lineCritDamage+1&lineStat+2'>1 Line Crit Dmg% and 2L Stat%</option>");
        $critDamageGroup.append("<option id='gloves9' value='lineCritDamage+1&lineAllStat+2'>1 Line Crit Dmg% and 2L All Stat%</option>");
        $critDamageGroup.append("<option id='gloves10' value='lineCritDamage+1&lineHp+2'>1 Line Crit Dmg% and 2L MaxHP%</option>");

        $critDamageGroup.append("<option id='gloves4' value='lineCritDamage+2'>2 Line Crit Dmg%</option>");

        $critDamageGroup.append("<option id='gloves5' value='lineCritDamage+2&lineStat+1'>2 Line Crit Dmg% and Stat%</option>");
        $critDamageGroup.append("<option id='gloves6' value='lineCritDamage+2&lineAllStat+1'>2 Line Crit Dmg% and All Stat%</option>");
        $critDamageGroup.append("<option id='gloves7' value='lineCritDamage+2&lineHp+1'>2 Line Crit Dmg% and MaxHP%</option>");

        $critDamageGroup.append("<option id='gloves8' value='lineCritDamage+3'>3 Line Crit Dmg%</option>");
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
        $('#desiredStats').append(`<optgroup id='dropMesoGroup' label='Drop/Meso'></optgroup>`);
        const $dropMesoGroup = $('#dropMesoGroup');
        $dropMesoGroup.append("<option id='accessory3' value='lineMeso+1'>1 Line Mesos Obtained%</option>");
        $dropMesoGroup.append("<option id='accessory4' value='lineDrop+1'>1 Line Item Drop%</option>");
        $dropMesoGroup.append("<option id='accessory5' value='lineMesoOrDrop+1'>1 Line of Item Drop% or Mesos Obtained%</option>");

        $dropMesoGroup.append("<option id='accessory6' value='lineMeso+1&lineStat+1'>1 Line Mesos Obtained% and Stat%</option>");
        $dropMesoGroup.append("<option id='accessory7' value='lineMeso+1&lineAllStat+1'>1 Line Mesos Obtained% and All Stat%</option>");
        $dropMesoGroup.append("<option id='accessory8' value='lineMeso+1&lineHp+1'>1 Line Mesos Obtained% and MaxHP%</option>");

        $dropMesoGroup.append("<option id='accessory9' value='lineDrop+1&lineStat+1'>1 Line Item Drop% and Stat%</option>");
        $dropMesoGroup.append("<option id='accessory10' value='lineDrop+1&lineAllStat+1'>1 Line Item Drop% and All Stat%</option>");
        $dropMesoGroup.append("<option id='accessory11' value='lineDrop+1&lineHp+1'>1 Line Item Drop% and MaxHP%</option>");

        $dropMesoGroup.append("<option id='accessory12' value='lineMesoOrDrop+1&lineStat+1'>1 Line of (Item Drop% or Mesos Obtained%) with Stat%</option>");
        $dropMesoGroup.append("<option id='accessory13' value='lineMesoOrDrop+1&lineAllStat+1'>1 Line of (Item Drop% or Mesos Obtained%) with All Stat%</option>");
        $dropMesoGroup.append("<option id='accessory14' value='lineMesoOrDrop+1&lineHp+1'>1 Line of (Item Drop% or Mesos Obtained%) with MaxHP%</option>");

        $dropMesoGroup.append("<option id='accessory' value='lineMeso+2'>2 Line Mesos Obtained%</option>");
        $dropMesoGroup.append("<option id='accessory1' value='lineDrop+2'>2 Line Item Drop%</option>");
        $dropMesoGroup.append("<option id='accessory2' value='lineMesoOrDrop+2'>2 Lines Involving Item Drop% or Mesos Obtained%</option>");

        $dropMesoGroup.append("<option id='accessory' value='lineMeso+3'>3 Line Mesos Obtained%</option>");
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
        ////secCooldown+2, secCooldown+3, secCooldown+4, secCooldown+2&lineStat+1, secCooldown+2&lineHp+1, secCooldown+2&lineAllStat+1, secCooldown+2&lineStat+2, secCooldown+2&lineHp+2, secCooldown+2&lineAllStat+2, secCooldown+3&lineStat+1, secCooldown+3&lineHp+1, secCooldown+3&lineAllStat+1, secCooldown+4&lineStat+1, secCooldown+4&lineHp+1, secCooldown+4&lineAllStat+1
        $('#desiredStats').append(`<optgroup id='CDGroup' label='Cooldown'></optgroup>`);
        const $CDGroup = $('#CDGroup');
        $CDGroup.append("<option id='hat' value='secCooldown+2'>-2sec+ CD Reduction</option>");
        $CDGroup.append("<option id='hat1' value='secCooldown+3'>-3sec+ CD Reduction</option>");
        $CDGroup.append("<option id='hat2' value='secCooldown+4'>-4sec+ CD Reduction</option>");
        $CDGroup.append("<option id='hat15' value='secCooldown+5'>-5sec+ CD Reduction</option>");
        $CDGroup.append("<option id='hat16' value='secCooldown+6'>-6sec+ CD Reduction</option>");

        $CDGroup.append("<option id='hat3' value='secCooldown+2&lineStat+1'>-2sec+ CD Reduction and Stat%</option>");
        $CDGroup.append("<option id='hat4' value='secCooldown+2&lineHp+1'>-2sec+ CD Reduction and MaxHP%</option>");
        $CDGroup.append("<option id='hat5' value='secCooldown+2&lineAllStat+1'>-2sec+ CD Reduction and All Stat%</option>");

        $CDGroup.append("<option id='hat6' value='secCooldown+2&lineStat+2'>-2sec+ CD Reduction and 2 Line Stat%</option>");
        $CDGroup.append("<option id='hat7' value='secCooldown+2&lineHp+2'>-2sec+ CD Reduction and 2 Line Max HP%</option>");
        $CDGroup.append("<option id='hat8' value='secCooldown+2&lineAllStat+2'>-2sec+ CD Reduction and 2 Line All Stat%</option>");

        $CDGroup.append("<option id='hat9' value='secCooldown+3&lineStat+1'>-3sec+ CD Reduction and Stat%</option>");
        $CDGroup.append("<option id='hat10' value='secCooldown+3&lineHp+1'>-3sec+ CD Reduction and Max HP%</option>");
        $CDGroup.append("<option id='hat11' value='secCooldown+3&lineAllStat+1'>-3sec+ CD Reduction and All Stat%</option>");

        $CDGroup.append("<option id='hat12' value='secCooldown+4&lineStat+1'>-4sec+ CD Reduction and Stat%</option>");
        $CDGroup.append("<option id='hat13' value='secCooldown+4&lineHp+1'>-4sec+ CD Reduction and Max HP%</option>");
        $CDGroup.append("<option id='hat14' value='secCooldown+4&lineAllStat+1'>-4sec+ CD Reduction and All Stat%</option>");
    }
}

function updateDesiredStatsOptions() {
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