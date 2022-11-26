// Note(sethyboy0) This file contains the functions that update the options in the desired stats dropdown as the user
// configures everything else. It also contains the function that translates between the <select> <option> values and
// the object that the probability calculator uses.

const STAT_OPTIONS = {
    normal: {
        statValueName: "Stat",
        displayText: "Stat",
    },
    hp: {
        statValueName: "Hp",
        displayText: "Max HP",
    },
    allStat: {
        statValueName: "AllStat",
        displayText: "All Stat",
    }
}

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
    const base = type === "allStat" ? 0 : 3;

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
    const idkman = ppp - 18;
    // Only keep non-zero entries since epic tier will get down to 0 with this.
    return [idkman,
        aaa,
        paa,
        pna,
        pnn,
        ppn,
        ppp].filter((x) => x > 0);
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

function removeElementIfExists(id) {
    if (document.getElementById(id)) {
        $(`#${id}`).remove();
    }
}

// Update an existing option with the given value and text.
function updateOption($option, value, text) {
    const currentVal = $option.val();
    const currentText = $option.text();
    if (currentVal !== value) {
        $option.text(text);
    }
    if (currentText !== text) {
        $option.attr("value", value);
    }
}

// Checks if an option with the given ID exists. If so, updates it with the given value and text. If not, creates it
// under the given optGroup with the given ID, value, and text.
function updateOrCreateOption(id, value, text, $optGroup) {
    const $existingOp = $(`#${id}`);
    const exists = $existingOp.length > 0;
    if (exists) {
        updateOption($existingOp, value, text);
    }
    else {
        $optGroup.append(`<option id='${id}' value='${value}'>${text}</option>`);
    }
}

// For adding simple % targets.
function addNormalOptionGroup(prefix, statValueName, displayText, groupLabel, optionAmounts) {
    // If the optgroup already exists, update the values and text in case the user changed the item level or stat.
    const optGroupSelector = `#${prefix}Group`
    let $optGroup = $(optGroupSelector);
    if ($optGroup.length !== 0) {
        const $options = $optGroup.find("option");
        $options.each((i, option) => {
            // Grab each option and update it.
            // Remove it from the array so we can delete the extras. They can appear when switching down to epic.
            const $option = $(option);
            if (i === optionAmounts.length) {
                // Remove any extra options (can happen when switching to epic since it has less stat options).
                $option.remove();
            }
            else {
                const val = optionAmounts[i];
                updateOption($option, `${statValueName}+${val}`, `${val}%+ ${displayText}`);
            }
        });
    } else {
        // Create the optgroup and options.
        $('#desiredStats').append(`<optgroup id='${prefix}Group' label='${groupLabel}'></optgroup>`);
        $optGroup= $(optGroupSelector);
        optionAmounts.forEach((val, i) => $optGroup.append(
            `<option id='${prefix}${i}' value='${statValueName}+${val}'>${val}%+ ${displayText}</option>`));
    }
}

function addNormalStatOptions(itemLevel, desiredTier, statType) {
    const primeLineValue = getPrimeLineValue(itemLevel, desiredTier, statType);
    const needSpecialAmounts = statType === "allStat" && desiredTier === 1;
    const optionAmounts = needSpecialAmounts ?
        // Not enough all stat lines to use 3L options lol.
        // Instead, we add some values corresponding to all stat + some regular stat lines.
        [1, 3, 4, 5, 6, 9] :
        get3LStatOptionAmounts(primeLineValue);
    const { statValueName, displayText } = STAT_OPTIONS[statType];
    addNormalOptionGroup("stat",
        `perc${statValueName}`,
        displayText,
        "Stat",
        optionAmounts);
}

function removeNormalStatOptions() {
    removeElementIfExists("statGroup");
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
    removeElementIfExists("attackGroup");
    removeElementIfExists("attackAndIEDGroup");
}

function removeCommonSEOptions() {
    removeElementIfExists("attackAndBossGroup");
    removeElementIfExists("attackOrBossGroup");
    removeElementIfExists("attackOrBossOrIedGroup");
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

    const $desiredStats = $('#desiredStats');
    $desiredStats.append(`<optgroup id='attackAndBossGroup' label='Attack and Boss Damage'></optgroup>`);
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

    $desiredStats.append(`<optgroup id='attackOrBossGroup' label='Attack or Boss Damage'></optgroup>`);
    const $attackOrBossGroup = $('#attackOrBossGroup');
    for (let i = 1; i <= 3; i++) {
        $attackOrBossGroup.append(`<option id='lab${i}' value='lineAttOrBoss+${i}'>${i} Line Attack% or Boss%</option>`);
    }

    $desiredStats.append(`<optgroup id='attackOrBossOrIedGroup' label='Attack or Boss Damage or IED'></optgroup>`);
    const $attackOrBossOrIedGroup = $('#attackOrBossOrIedGroup');
    for (let i = 1; i <= 3; i++) {
        $attackOrBossOrIedGroup.append(`<option id='labi${i}' value='lineAttOrBossOrIed+${i}'>${i} Line Attack% or Boss% or IED</option>`);
    }
}

function removeCritDamageOptions() {
    removeElementIfExists("critDamageGroup");
}

function addCritDamageOptions(desiredTier, statType) {
    if (desiredTier !== 3) {
        removeCritDamageOptions();
        return;
    }
    const critDamageSelector = '#critDamageGroup';
    let $critDamageGroup = $(critDamageSelector);
    const { statValueName, displayText } = STAT_OPTIONS[statType];
    if ($critDamageGroup.length === 0) {
        $('#desiredStats').append(`<optgroup id='critDamageGroup' label='Crit Damage'></optgroup>`);
        $critDamageGroup = $(critDamageSelector);
        for (let i = 1; i <= 3; i++){
            $critDamageGroup.append(`<option id='glovesC${i}' value='lineCritDamage+${i}'>${i} Line Crit Dmg%</option>`);
        }
    }
    // Update these lines in case the user changed stat type.
    updateOrCreateOption("glovesC4", `lineCritDamage+1&line${statValueName}+1`, `1 Line Crit Dmg% and 1 line ${displayText}`, $critDamageGroup);
    updateOrCreateOption("glovesC5", `lineCritDamage+1&line${statValueName}+2`, `1 Line Crit Dmg% and 2 line ${displayText}`, $critDamageGroup);
    updateOrCreateOption("glovesC6", `lineCritDamage+2&line${statValueName}+1`, `2 Line Crit Dmg% and 1 line ${displayText}`, $critDamageGroup);
}

function removeAutoStealOptions() {
    removeElementIfExists("autoStealGroup");
}

function addAutoStealOptions(desiredTier, statType, cubeType) {
    const validCubeType = cubeType === "master" || cubeType === "meister";
    if (desiredTier < 2 || !validCubeType) {
        removeAutoStealOptions();
        return;
    }
    const autoStealSelector = '#autoStealGroup';
    let $autoStealGroup = $(autoStealSelector);
    const { statValueName, displayText } = STAT_OPTIONS[statType];
    if ($autoStealGroup.length === 0) {
        $('#desiredStats').append(`<optgroup id='autoStealGroup' label='Auto Steal'></optgroup>`);
        $autoStealGroup = $(autoStealSelector);
        for (let i = 1; i <= 3; i++){
            $autoStealGroup.append(`<option id='glovesA${i}' value='lineAutoSteal+${i}'>${i} Line Auto Steal%</option>`);
        }
    }
    // Update these lines in case the user changed stat type.
    updateOrCreateOption("glovesA4", `lineAutoSteal+1&line${statValueName}+1`, `1 Line Auto Steal% and 1 line ${displayText}`, $autoStealGroup);
    updateOrCreateOption("glovesA5", `lineAutoSteal+1&line${statValueName}+2`, `1 Line Auto Steal% and 2 line ${displayText}`, $autoStealGroup);
    updateOrCreateOption("glovesA6", `lineAutoSteal+2&line${statValueName}+1`, `2 Line Auto Steal% and 1 line ${displayText}`, $autoStealGroup);
}

// Crit damage AND auto steal wow such good much amazing.
function removeWomboComboOptions() {
    removeElementIfExists("womboComboGroup");
}

function addWomboComboOptions(desiredTier, statType, cubeType) {
    const validCubeType = cubeType === "meister";
    if (desiredTier !== 3 || !validCubeType) {
        removeWomboComboOptions();
        return;
    }
    const womboComboSelector = '#womboComboGroup';
    let $womboComboGroup = $(womboComboSelector);
    if ($womboComboGroup.length === 0) {
        $('#desiredStats').append(`<optgroup id='womboComboGroup' label='Wombo Combo'></optgroup>`);
        $womboComboGroup = $(womboComboSelector);
        for (let i = 1; i <= 2; i++){
            for (let j = 1; j <= 2; j++) {
                if (i + j > 3) {
                    continue;
                }
                $womboComboGroup.append(`<option id='glovesA${i}C{j}' value='lineAutoSteal+${i}&lineCritDamage+${j}'>${i} Line Auto Steal% and ${j} Line Crit Dmg%</option>`);
            }
        }
    }
}

function removeDropAndMesoOptions() {
    removeElementIfExists("dropMesoGroup");
}

function addDropAndMesoOptions(desiredTier, statType) {
    if (desiredTier !== 3) {
        removeDropAndMesoOptions();
        return;
    }
    const dropMesoSelector = '#dropMesoGroup';
    let $dropMesoGroup = $(dropMesoSelector);
    const { statValueName, displayText } = STAT_OPTIONS[statType];
    if ($dropMesoGroup.length === 0) {
        $('#desiredStats').append(`<optgroup id='dropMesoGroup' label='Drop/Meso'></optgroup>`);
        $dropMesoGroup = $(dropMesoSelector);
        $dropMesoGroup.append("<option id='accessory1' value='lineMeso+1'>1 Line Mesos Obtained%</option>");
        $dropMesoGroup.append("<option id='accessory2' value='lineDrop+1'>1 Line Item Drop%</option>");
        $dropMesoGroup.append("<option id='accessory3' value='lineMesoOrDrop+1'>1 Line of Item Drop% or Mesos Obtained%</option>");

        $dropMesoGroup.append("<option id='accessory4' value='lineMeso+2'>2 Line Mesos Obtained%</option>");
        $dropMesoGroup.append("<option id='accessory5' value='lineDrop+2'>2 Line Item Drop%</option>");
        $dropMesoGroup.append("<option id='accessory6' value='lineMesoOrDrop+2'>2 Lines Involving Item Drop% or Mesos Obtained%</option>");

        $dropMesoGroup.append("<option id='accessory7' value='lineMeso+3'>3 Line Mesos Obtained%</option>");
    }
    // Update these lines in case the user changed stat type.
    updateOrCreateOption("accessory8", `lineMeso+1&line${statValueName}+1`, `1 Line Mesos Obtained% and 1 line ${displayText}`, $dropMesoGroup);
    updateOrCreateOption("accessory9", `lineDrop+1&line${statValueName}+1`, `1 Line Item Drop% and 1 line ${displayText}`, $dropMesoGroup);
    updateOrCreateOption("accessory10", `lineMesoOrDrop+1&line${statValueName}+1`, `1 Line of (Item Drop% or Mesos Obtained%) with 1 line ${displayText}`, $dropMesoGroup);
}

function removeCDOptions() {
    removeElementIfExists("CDGroup");
}

function addCDOptions(desiredTier, statType) {
    if (desiredTier !== 3) {
        removeCDOptions();
        return;
    }
    const CDSelector = '#CDGroup';
    let $CDGroup = $(CDSelector);
    const { statValueName, displayText } = STAT_OPTIONS[statType];
    if ($CDGroup.length === 0) {
        $('#desiredStats').append(`<optgroup id='CDGroup' label='Cooldown'></optgroup>`);
        $CDGroup = $('#CDGroup');
        $CDGroup.append("<option id='hat1' value='secCooldown+2'>-2sec+ CD Reduction</option>");
        $CDGroup.append("<option id='hat2' value='secCooldown+3'>-3sec+ CD Reduction</option>");
        $CDGroup.append("<option id='hat3' value='secCooldown+4'>-4sec+ CD Reduction</option>");
        $CDGroup.append("<option id='hat4' value='secCooldown+5'>-5sec+ CD Reduction</option>");
        $CDGroup.append("<option id='hat5' value='secCooldown+6'>-6sec+ CD Reduction</option>");
    }
    // Update these lines in case the user changed stat type.
    updateOrCreateOption("hat6", `secCooldown+2&line${statValueName}+1`, `-2sec+ CD Reduction and 1 Line ${displayText}`, $CDGroup);
    updateOrCreateOption("hat7", `secCooldown+2&line${statValueName}+2`, `-2sec+ CD Reduction and 2 Line ${displayText}`, $CDGroup);
    updateOrCreateOption("hat8", `secCooldown+3&line${statValueName}+1`, `-3sec+ CD Reduction and 1 Line ${displayText}`, $CDGroup);
    updateOrCreateOption("hat9", `secCooldown+4&line${statValueName}+1`, `-4sec+ CD Reduction and 1 Line ${displayText}`, $CDGroup);
}

function updateDesiredStatsOptions() {
    const itemType = document.getElementById('itemType').value;
    const itemLevel = parseInt(document.getElementById('itemLevel').value);
    const desiredTier = parseInt(document.getElementById('desiredTier').value);
    const cubeType = document.getElementById('cubeType').value;
    const statType = document.getElementById('statType').value;

    if (itemType === 'weapon' || itemType === 'secondary' || itemType === 'emblem') {
        addCommonWSEOptions(itemLevel, desiredTier);
        removeNormalStatOptions();
        if (itemType !== 'emblem') {
            addCommonSEOptions(itemLevel, desiredTier);
        } else {
            removeCommonSEOptions()
        }
    } else {
        addNormalStatOptions(itemLevel, desiredTier, statType);
        removeCommonWSEOptions();
        removeCommonSEOptions();
    }

    if (itemType === 'gloves') {
        addCritDamageOptions(desiredTier, statType);
        addAutoStealOptions(desiredTier, statType, cubeType);
        addWomboComboOptions(desiredTier, statType, cubeType);
    } else {
        removeCritDamageOptions();
        removeAutoStealOptions();
        removeWomboComboOptions();
    }

    if (itemType === 'accessory') {
        addDropAndMesoOptions(desiredTier, statType);
    } else {
        removeDropAndMesoOptions();
    }

    if (itemType === 'hat') {
        addCDOptions(desiredTier, statType);
    } else {
        removeCDOptions();
    }
}