var information = {
    currentLevel: 0,
    currentPoints: 0,
    currentUsed: 0,
    remainder: 0,
    currentStatLevels: {
        str: 0,
        dex: 0,
        int: 0,
        luk: 0,
        hp: 0,
        mp: 0,
        demFor: 0,
        critRate: 0,
        critDmg: 0,
        ignDef: 0,
        damage: 0,
        bDamage: 0,
        statResist: 0,
        stance: 0,
        attPower: 0,
        bonusExp: 0
    },
    levelAmounts: [0, 1, 2, 4, 8, 10, 15, 20, 25, 30, 35, 50, 65, 80, 95, 110],
    levelTotals: [0, 1, 3, 7, 15, 25, 40, 60, 85, 115, 150, 200, 265, 345, 440, 550],
    //specialIncr: [0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3],
    specialIncr: [0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
};

function roundUp(number) {
    return (Math.ceil(number * 2) / 2).toFixed(1)
}

function roundDown(num) {
    let f = Math.floor(num);
    if (num - f < 0.5) {
        return f;
    }
    return f + 0.5;
}

var new_information = {
    currentLevel: 0,
    currentPoints: 0,
    currentUsed: 0,
    remainder: 0,
    currentStatLevels: {
        nstr: 0,
        ndex: 0,
        nint: 0,
        nluk: 0,
        nhp: 0,
        nmp: 0,
        ndemFor: 0,
        ncritRate: 0,
        critDmg: 0,
        nignDef: 0,
        ndamage: 0,
        nbDamage: 0,
        statResist: 0,
        nstance: 0,
        nattPower: 0,
        nbonusExp: 0
    },
    levelAmounts: [0, 1, 2, 4, 8, 10, 15, 20, 25, 30, 35, 50, 65, 80, 95, 110],
    levelTotals: [0, 1, 3, 7, 15, 25, 40, 60, 85, 115, 150, 200, 265, 345, 440, 550],
    //specialIncr: [0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3],
    specialIncr: [0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
};

function statAmount(without_perc, flat, perc, xenon_primary_bool, luk2_secondary_bool) {
    // for attack: flat = 0
    // for stat: flat sources include hyper, arcane symbols, inner ability
    //note: maple warrior adds 16% stat
    //hyper stat % applies to HP
    if (luk2_secondary_bool) {
        return { 1: (without_perc[1] - flat[1]) * (perc[1]) + flat[1], 2: (without_perc[2] - flat[2]) * (perc[2]) + flat[2] }
    }
    if (xenon_primary_bool) {
        return { 1: (without_perc[1] - flat[1]) * (perc[1]) + flat[1], 2: (without_perc[2] - flat[2]) * (perc[2]) + flat[2], 3: (without_perc[3] - flat[3]) * (perc[3]) + flat[3] }
    }
    return (without_perc - flat) * (perc) + flat
}

function damage(maple_class, attack_without_perc, attack_perc, flat_primary, primary_without_perc, primary_perc, flat_sec, sec_without_perc, sec_perc) {
    if (maple_class == "Xenon") { //flat_primary, primary_without_perc, primary_perc are all objects with keys 1, 2, 3
        var primary_stats = statAmount(primary_without_perc, flat_primary, primary_perc, true)
        var primary1 = primary_stats[1]
        var primary2 = primary_stats[2]
        var primary3 = primary_stats[3]
        var att = statAmount(attack_without_perc, 0, attack_perc)

        return (4 * primary1 + 4 * primary2 + 4 * primary3) * att
    }
    else if (maple_class == "Cadena" || maple_class == "Dual Blade" || maple_class == "Shadower") {
        var primary = statAmount(primary_without_perc, flat_primary, primary_perc)
        var secondary_stats = statAmount(sec_without_perc, flat_sec, sec_perc, false, true) //flat_sec, sec_without_perc, sec_perc are all objects with keys 1, 2
        var secondary1 = secondary_stats[1]
        var secondary2 = secondary_stats[2]
        var att = statAmount(attack_without_perc, 0, attack_perc)

        return (4 * primary + secondary1 + secondary2) * att
    }
    else if (maple_class == "Demon Avenger") {
        var level = parseInt(document.getElementById('level').value)
        var purehp = 545 + 90 * level
        var att = statAmount(attack_without_perc, 0, attack_perc)
        var str = statAmount(sec_without_perc, flat_sec, sec_perc)
        var hp = statAmount(primary_without_perc, flat_primary, primary_perc)

        return (Math.floor(purehp / 3.5) + 0.8 * Math.floor((hp - purehp) / 3.5) + str) * att
    }
    else {
        if (maple_class == "Kanna") {
            var secondary = statAmount(sec_without_perc[1], flat_sec[1], sec_perc[1])
        }
        else {
            var secondary = statAmount(sec_without_perc, flat_sec, sec_perc)
        }
        var primary = statAmount(primary_without_perc, flat_primary, primary_perc)
        var att = statAmount(attack_without_perc, 0, attack_perc)
        return (4 * primary + secondary) * att
    }

}

function determineStatEquivalences(maple_class, attack_without_perc, attack_perc, flat_primary, primary_without_perc, primary_perc, flat_sec, sec_without_perc, sec_perc) {
    var current_dmg = damage(maple_class, attack_without_perc, attack_perc, flat_primary, primary_without_perc, primary_perc, flat_sec, sec_without_perc, sec_perc)

    var att_diff = damage(maple_class, attack_without_perc + 1, attack_perc, flat_primary, primary_without_perc, primary_perc, flat_sec, sec_without_perc, sec_perc) - current_dmg

    if (maple_class == "Xenon") {
        var adjusted_perc_all = { 1: primary_perc[1] + 0.01, 2: primary_perc[2] + 0.01, 3: primary_perc[3] + 0.01 }

        var adjusted_primary_without_perc_1 = { 1: primary_without_perc[1] + 1, 2: primary_without_perc[2], 3: primary_without_perc[3] }
        var adjusted_primary_without_perc_2 = { 1: primary_without_perc[1], 2: primary_without_perc[2] + 1, 3: primary_without_perc[3] }
        var adjusted_primary_without_perc_3 = { 1: primary_without_perc[1], 2: primary_without_perc[2], 3: primary_without_perc[3] + 1 }

        var stat_diff_1 = damage(maple_class, attack_without_perc, attack_perc, flat_primary, adjusted_primary_without_perc_1, primary_perc, flat_sec, sec_without_perc, sec_perc) - current_dmg
        var stat_diff_2 = damage(maple_class, attack_without_perc, attack_perc, flat_primary, adjusted_primary_without_perc_2, primary_perc, flat_sec, sec_without_perc, sec_perc) - current_dmg
        var stat_diff_3 = damage(maple_class, attack_without_perc, attack_perc, flat_primary, adjusted_primary_without_perc_3, primary_perc, flat_sec, sec_without_perc, sec_perc) - current_dmg


        var sec_diff = 0
        var perc_all_diff = damage(maple_class, attack_without_perc, attack_perc, flat_primary, primary_without_perc, adjusted_perc_all, flat_sec, sec_without_perc, sec_perc) - current_dmg

    }
    else if (maple_class == "Shadower" || maple_class == "Dual Blade" || maple_class == "Cadena" || maple_class == "Kanna") {
        var stat_diff = damage(maple_class, attack_without_perc, attack_perc, flat_primary, primary_without_perc + 1, primary_perc, flat_sec, sec_without_perc, sec_perc) - current_dmg

        if (maple_class == "Kanna") {
            var adjusted_luk_without_perc = { 1: sec_without_perc[1] + 1, 2: sec_without_perc[2] }
            var luk_diff = damage(maple_class, attack_without_perc, attack_perc, flat_primary, primary_without_perc, primary_perc, flat_sec, adjusted_luk_without_perc, sec_perc) - current_dmg

            var old_att_gain = sec_without_perc[2] * (1 + sec_perc[2]) / 700
            var new_att_gain = (sec_without_perc[2] + 1) * (1 + sec_perc[2]) / 700
            var new_att_without_perc = attack_without_perc - old_att_gain + new_att_gain

            var hp_to_att = 700 / sec_perc[2]
            var hp_diff = damage(maple_class, new_att_without_perc, attack_perc, flat_primary, primary_without_perc, primary_perc, flat_sec, sec_without_perc, sec_perc) - current_dmg

            var sec_diff = { luk_diff, hp_diff }
            var sec_perc_adjusted = { 1: sec_perc[1] + 0.01, 2: sec_perc[2] }
        }
        else {
            var adjusted_dex_without_perc = { 1: sec_without_perc[1] + 1, 2: sec_without_perc[2] }
            var dex_diff = damage(maple_class, attack_without_perc, attack_perc, flat_primary, primary_without_perc, primary_perc, flat_sec, adjusted_dex_without_perc, sec_perc) - current_dmg

            var adjusted_str_without_perc = { 1: sec_without_perc[1], 2: sec_without_perc[2] + 1 }
            var str_diff = damage(maple_class, attack_without_perc, attack_perc, flat_primary, primary_without_perc, primary_perc, flat_sec, adjusted_str_without_perc, sec_perc) - current_dmg

            var sec_diff = { dex_diff, str_diff }

            var sec_perc_adjusted = { 1: sec_perc[1] + 0.01, 2: sec_perc[2] + 0.01 }
        }


        var perc_all_diff = damage(maple_class, attack_without_perc, attack_perc, flat_primary, primary_without_perc, primary_perc + 0.01, flat_sec, sec_without_perc, sec_perc_adjusted) - current_dmg

    }
    else {
        var stat_diff = damage(maple_class, attack_without_perc, attack_perc, flat_primary, primary_without_perc + 1, primary_perc, flat_sec, sec_without_perc, sec_perc) - current_dmg
        var sec_diff = damage(maple_class, attack_without_perc, attack_perc, flat_primary, primary_without_perc, primary_perc, flat_sec, sec_without_perc + 1, sec_perc) - current_dmg
        if (maple_class == "Demon Avenger") {
            var stat_diff = damage(maple_class, attack_without_perc, attack_perc, flat_primary, primary_without_perc + 1, primary_perc, flat_sec, sec_without_perc, sec_perc) - current_dmg
            var perc_all_diff = damage(maple_class, attack_without_perc, attack_perc, flat_primary, primary_without_perc, primary_perc, flat_sec, sec_without_perc + 0.01, sec_perc) - current_dmg
        }
        else {
            var perc_all_diff = damage(maple_class, attack_without_perc, attack_perc, flat_primary, primary_without_perc, primary_perc + 0.01, flat_sec, sec_without_perc, sec_perc + 0.01) - current_dmg
        }


    }
    // console.log(maple_class, attack_without_perc, attack_perc, flat_primary, primary_without_perc, primary_perc, flat_sec, sec_without_perc, sec_perc)
    // console.log(current_dmg)

    ////1 main stat = x
    //1 stat (DEX OR STR OR LUK) = x for Xenon
    // Demon avenger x STR = 1 att, x att = 1000 HP 
    if (maple_class == "Shadower" || maple_class == "Dual Blade" || maple_class == "Cadena") {
        var dex_equiv = dex_diff / stat_diff
        var str_equiv = str_diff / stat_diff

        var sec_equiv = { dex_equiv, str_equiv }
    }
    // else if (maple_class == "Xenon"){  
    //     var dex_equiv = stat_diff_1 / att_diff
    //     var luk_equiv = stat_diff_2 / att_diff
    //     var str_equiv = stat_diff_3 / att_diff
    //     var perc_all_equiv = perc_all_diff / att_diff

    //     return {dex_equiv, luk_equiv, str_equiv, perc_all_equiv}
    // }
    else if (maple_class == "Demon Avenger") {// Demon avenger x STR = 1 att, x att = 1000 HP 
        var att_equiv = att_diff / stat_diff

        return { att_equiv }
    }
    else if (maple_class == "Kanna") {
        var att_equiv = att_diff / stat_diff

        var luk_equiv = luk_diff / stat_diff

        var hp_equiv = hp_to_att / att_equiv

        var sec_equiv = { luk_equiv, hp_equiv }
    }
    else {
        var sec_equiv = sec_diff / stat_diff
    }
    if (maple_class != "Xenon") {
        var att_equiv = att_diff / stat_diff
        var perc_all_equiv = perc_all_diff / stat_diff
    }
    else {
        var att_equiv_1 = att_diff / stat_diff_1
        var att_equiv_2 = att_diff / stat_diff_2
        var att_equiv_3 = att_diff / stat_diff_3

        var perc_all_equiv_1 = perc_all_diff / stat_diff_1
        var perc_all_equiv_2 = perc_all_diff / stat_diff_2
        var perc_all_equiv_3 = perc_all_diff / stat_diff_3

        var perc_all_equiv = (perc_all_equiv_1 + perc_all_equiv_2 + perc_all_equiv_3) / 3
        var att_equiv = (att_equiv_1 + att_equiv_2 + att_equiv_3) / 3
    }

    return { sec_equiv, perc_all_equiv, att_equiv }
}

function loadLocalStorage() {
    //new ids to track for localstorage
    //sec_perc_2, sec_perc_2_div(hidden), sec_2_div (hidden), secondary_2_stat, sec_perc, main_stat_perc, kanna_hp_perc, kanna_hp_perc_div(hidden)

    //no longer make hp_arcane_div hidden

    //var json = event.target.result;
    var json = window.localStorage.getItem('data'); //here
    var obj = JSON.parse(json);

    var obj_values = obj.obj_values; //ex: {id1: value1, id2: value2}
    var obj_hyper_values = obj.obj_hyper_values;
    var obj_wse_level = obj.obj_wse_level; //ex: {id1: value1, id2: value2}
    var obj_wse_lines = obj.obj_wse_lines; //ex: {id1: value1, id2: value2}
    var obj_checked = obj.obj_checked; //ex: {id1: true, id2: false}
    var obj_hidden = obj.obj_hidden

    var k = 0;
    var i = 0;
    var current_obj
    while (k < 6) {
        if (k == 0) current_obj = obj_values;
        else if (k == 1) current_obj = obj_wse_level;
        else if (k == 2) current_obj = obj_checked;
        else if (k == 3) current_obj = obj_wse_lines;
        else if (k == 4) current_obj = obj_hyper_values;
        else if (k == 5) current_obj = obj_hidden;

        i = 0;
        if (current_obj) {
            var id_values = Object.keys(current_obj);
            while (i < id_values.length) {
                var id = id_values[i];
                var value = current_obj[id];
                if (id == 'level') {
                    document.getElementById(id).value = value;
                    calcHyperStatPoints();
                    var new_level = value;
                    document.getElementById('current_level').innerHTML = `${new_level}`;
                }
                if (id == 'class') {
                    document.getElementById(id).value = value;
                    var maple_class = value;
                    if (maple_class == "Kanna") {
                        document.getElementById('kanna_hp_div').hidden = false;
                        document.getElementById('kanna_hp_perc_div').hidden = false;
                        document.getElementById('DHB_div').hidden = false;
                    }
                    else {
                        document.getElementById('kanna_hp_div').hidden = true;
                        document.getElementById('kanna_hp_perc_div').hidden = true;
                        document.getElementById('DHB_div').hidden = true;
                    }

                    if (maple_class == "Zero") {
                        document.getElementById('zeromessage').hidden = false;
                    }
                    else {
                        document.getElementById('zeromessage').hidden = true;
                    }

                    var stat_types = getPrimaryAndSecondaryStatType(maple_class);
                    var primary_stat = stat_types.primaryStatType;
                    var secondary_stat = stat_types.secondaryStatType;

                    if (maple_class == "Xenon") primary_stat = "DEX"
                    document.getElementById('primary_label').innerHTML = `<label for="primary_stat"> ${primary_stat} </label>`;
                    document.getElementById('main_stat_perc_label').innerHTML = `<label for="main_stat_perc"> ${primary_stat} % on Equips</label>`;

                    if (maple_class == "Dual Blade" || maple_class == "Cadena" || maple_class == "Shadower") {
                        secondary_stat = "DEX"
                        secondary_stat_2 = "STR"

                        document.getElementById('secondary_label').innerHTML = `<label for="secondary_stat"> ${secondary_stat} </label>`;
                        document.getElementById('sec_perc_label').innerHTML = `<label for="secondary_stat_perc"> ${secondary_stat} % on Equips</label>`;

                        document.getElementById('secondary_2_label').innerHTML = `<label for="secondary_2_stat"> ${secondary_stat_2} </label>`;
                        document.getElementById('sec_perc_2_label').innerHTML = `<label for="secondary_2_stat_perc"> ${secondary_stat_2} % on Equips</label>`;
                    }
                    else {
                        document.getElementById('secondary_label').innerHTML = `<label for="secondary_stat"> ${secondary_stat} </label>`;
                        document.getElementById('sec_perc_label').innerHTML = `<label for="secondary_stat_perc"> ${secondary_stat} % on Equips</label>`;
                    }
                    document.getElementById('hp_arcane_label').innerHTML = `<label for="hp_arcane"> ${primary_stat} (From Arcane Symbols)</label>`;

                    if (maple_class == "Xenon") {
                        var primary_2 = "LUK"
                        var primary_3 = "STR"

                        document.getElementById('secondary_label').innerHTML = `<label for="secondary_stat"> ${primary_2} </label>`;
                        document.getElementById('sec_perc_label').innerHTML = `<label for="secondary_stat_perc"> ${primary_2} % on Equips</label>`;

                        document.getElementById('secondary_2_label').innerHTML = `<label for="secondary_2_stat"> ${primary_3} </label>`;
                        document.getElementById('sec_perc_2_label').innerHTML = `<label for="secondary_2_stat_perc"> ${primary_3} % on Equips</label>`;
                    }
                    else {
                        document.getElementById('secondary_stat').disabled = false;
                    }
                }
                if (k != 2 && k != 5) {
                    if (document.getElementById(id)) document.getElementById(id).value = value;
                }
                if (k == 4) {
                    document.getElementById(id).value = value;
                    updatePoints(document.getElementById(id));
                }
                if (k == 2) {
                    if (document.getElementById(id)) document.getElementById(id).checked = value;
                }
                if (k == 5) {
                    if (document.getElementById(id)) document.getElementById(id).hidden = value;
                }
                if (id == 'reboot') {
                    if (value) {
                        document.getElementById('bonusAttPerc').value = 0;
                        document.getElementById('bonusDiv').hidden = true;
                        document.getElementById('bonusTitle').hidden = true;
                    }
                }
                if (id == 'nonreboot') {
                    if (value) {
                        document.getElementById('reboot').checked = false;
                        document.getElementById('bonusDiv').hidden = false;
                        document.getElementById('bonusTitle').hidden = false;
                    }
                }
                i++;
            }

        }
        if (k == 1) {
            updateWeaponLines();
            updateSecondaryLines();
            updateEmblemLines();
        }
        k++;
    }
}
function saveToLocalStorage(maple_class) {
    var obj = {};

    //each of these will be a stored in obj which will be exported to JSON
    //key is ID, value is value
    var obj_values = {}; //ex: {id1: value1, id2: value2}
    var obj_hyper_values = {};
    var obj_wse_level = {}; //ex: {id1: value1, id2: value2}
    var obj_wse_lines = {}; //ex: {id1: value1, id2: value2}
    //key is ID, value is true or false (.checked == true)
    var obj_checked = {}; //ex: {id1: true, id2: false}
    var obj_hidden = {};

    //new ids to track for localstorage
    //sec_perc_2, sec_perc_2_div(hidden), sec_2_div (hidden), secondary_2_stat, sec_perc, main_stat_perc, kanna_hp_perc, kanna_hp_perc_div(hidden)

    //collection of IDs to collect data on
    var id_values = ['level', 'sec_perc_2', 'secondary_2_stat', 'sec_perc', 'main_stat_perc', 'kanna_hp_perc', 'class', 'weapon_type', 'upper_shown_damage', 'boss_percent', 'ied_percent', 'damage_percent', 'final_damage_percent', 'critical_damage', 'primary_stat', 'secondary_stat', 'hp_perc', 'hp_arcane', 'kanna_hp', 'familiarAttPerc', 'bonusAttPerc']
    var id_hyper_values = ['strSelect', 'dexSelect', 'lukSelect', 'intSelect', 'hpSelect', 'mpSelect', 'demForSelect', 'critRateSelect', 'critDmgSelect', 'iedSelect', 'dmgSelect', 'bossSelect', 'statResistSelect', 'stanceSelect', 'attSelect', 'bonusExpSelect', 'arcForceSelect']
    var id_checked = ['CRA', 'Dom', 'gollux', 'bt2', 'bt3', 'DHB', 'solus2', 'solus3', 'unfairAdvantage', 'empiricalKnowledge', 'thiefCunning', 'tideOfBattle', 'badge1', 'badge2', 'badge3', 'magSoul', 'demForLock', 'critRateLock', 'statResistLock', 'stanceLock', 'bonusExpLock', 'arcForceLock', 'reboot', 'nonreboot']
    var id_wse_level = ['wlevel', 'slevel', 'elevel'];
    var id_wse_lines = { 'weapon': ['wline1', 'wline2', 'wline3'], 'secondary': ['sline1', 'sline2', 'sline3'], 'emblem': ['eline1', 'eline2', 'eline3'] }
    var id_hidden = ['sec_perc_2_div', 'sec_2_div', 'kanna_hp_perc_div', 'kanna_hp_div', 'zeromessage', 'DHB_div']

    var i = 0
    while (i < id_values.length) {
        var id = id_values[i];
        if (document.getElementById(id)) {
            var value = document.getElementById(id).value;
            obj_values[id] = value;
        }
        i++;
    }
    i = 0
    while (i < id_hyper_values.length) {
        var id = id_hyper_values[i];
        var value = document.getElementById(id).value;
        obj_hyper_values[id] = value;
        i++;
    }
    i = 0
    while (i < id_hidden.length) {
        var id = id_hidden[i];
        var hidden = document.getElementById(id).hidden;
        obj_hidden[id] = hidden;
        i++;
    }
    i = 0
    while (i < id_checked.length) {
        var id = id_checked[i];
        if (document.getElementById(id)) {
            var checked = document.getElementById(id).checked;
            obj_checked[id] = checked;
        }
        i++;
    }
    i = 0
    while (i < id_wse_level.length) {
        var id = id_wse_level[i];
        var value = document.getElementById(id).value;
        obj_wse_level[id] = value;
        i++;
    }
    i = 0
    var items = Object.keys(id_wse_lines)
    while (i < items.length) {
        var item = items[i];
        var k = 0;
        var lines = id_wse_lines[item];
        while (k < lines.length) {
            var id = lines[k];
            var value = document.getElementById(id).value;;
            obj_wse_lines[id] = value;
            k++;
        }
        i++;
    }
    obj.obj_values = obj_values;
    obj.obj_hyper_values = obj_hyper_values;
    obj.obj_wse_level = obj_wse_level;
    obj.obj_wse_lines = obj_wse_lines;
    obj.obj_checked = obj_checked;
    obj.obj_hidden = obj_hidden

    window.localStorage.setItem('data', JSON.stringify(obj));
}

function calculateDamageCommon(primary, secondary, cdmg, boss, dmg, ied, att, pdr) {
    return (4 * primary + secondary) * (1.35 + cdmg) * (1.00 + boss + dmg) * att * Math.max(0, 1 - (pdr * (1 - ied)));
}
function calculateDamageLuk2(primary, secondary1, secondary2, cdmg, boss, dmg, ied, att, pdr) {
    return (4 * primary + secondary1 + secondary2) * (1.35 + cdmg) * (1.00 + boss + dmg) * att * Math.max(0, 1 - (pdr * (1 - ied)));
}
function calculateDamageXenon(primary1, primary2, primary3, cdmg, boss, dmg, ied, att, pdr) {
    return (4 * primary1 + 4 * primary2 + 4 * primary3) * (1.35 + cdmg) * (1.00 + boss + dmg) * att * Math.max(0, 1 - (pdr * (1 - ied)));
}
function calculateDamageDA(purehp, hp, str, cdmg, boss, dmg, ied, att, pdr) {
    return (Math.floor(purehp / 3.5) + 0.8 * Math.floor((hp - purehp) / 3.5) + str) * (1.35 + cdmg) * (1.00 + boss + dmg) * att * Math.max(0, 1 - (pdr * (1 - ied)));
}

function transferLockedOptions() {
    var available_points = parseInt(document.getElementById('nhyperPoints').innerHTML);
    if (arcForceLock.checked == true) {
        var value = document.getElementById('arcForce').value;
        document.getElementById('narcForce').innerHTML = `${value}`;
        document.getElementById('narcForceSelect').value = (document.getElementById('arcForceSelect').value);
        nupdatePoints(document.getElementById('narcForceSelect'));
        available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
    }
    if (bonusExpLock.checked == true) {
        var value = document.getElementById('bonusExp').value;
        document.getElementById('nbonusExp').innerHTML = `${value}`;
        document.getElementById('nbonusExpSelect').value = (document.getElementById('bonusExpSelect').value);
        nupdatePoints(document.getElementById('nbonusExpSelect'));
        available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
    }
    if (stanceLock.checked == true) {
        var value = document.getElementById('stance').value;
        document.getElementById('nstance').innerHTML = `${value}`;
        document.getElementById('nstanceSelect').value = (document.getElementById('stanceSelect').value);
        nupdatePoints(document.getElementById('nstanceSelect'));
        available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
    }
    if (demForLock.checked == true) {
        var value = document.getElementById('demFor').value;
        document.getElementById('ndemFor').innerHTML = `${value}`;
        document.getElementById('ndemForSelect').value = (document.getElementById('demForSelect').value);
        nupdatePoints(document.getElementById('ndemForSelect'));
        available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
    }
    if (critRateLock.checked == true) {
        var value = document.getElementById('critRate').value;
        document.getElementById('ncritRate').innerHTML = `${value}`;
        document.getElementById('ncritRateSelect').value = (document.getElementById('critRateSelect').value);
        nupdatePoints(document.getElementById('ncritRateSelect'));
        available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
    }
    if (statResistLock.checked == true) {
        var value = document.getElementById('statResist').value;
        document.getElementById('nstatResist').innerHTML = `${value}`;
        document.getElementById('nstatResistSelect').value = (document.getElementById('statResistSelect').value);
        nupdatePoints(document.getElementById('nstatResistSelect'));
        available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
    }
    return available_points
}

function determineBoostPerPoint(stat_type, current_hyper_stat_points, currentOutput, ied_stat, attack_stat, boss_stat, dmg_stat, crit_dmg_stat, primary_stat, secondary_stat, maple_class, level, multiplier, attack_percent, xenon_dex_points, xenon_luk_points, secondary_str_points) {
    //determine amount of points it takes to level for each stat and how much stat will be gained for raising it a level
    if (current_hyper_stat_points == 15) {
        return { 'boost_per_point': 0, 'stat_to_raise': 'N/A', 'point_cost': 1000000000 }
    }
    var cost_info = [1, 2, 4, 8, 10, 15, 20, 25, 30, 35, 50, 65, 80, 95, 110];
    var point_cost = cost_info[current_hyper_stat_points]
    var special_case = false;
    var stat_to_raise = "N/A";
    var test_value = 0

    if (stat_type == 'ied') {
        if (current_hyper_stat_points == 0) {
            //increase by 3%
            ied_stat = determineIED(ied_stat, [3]);
        }
        else {
            //remove ied from preivous level = current *3 and replace with (current + 1) * 3
            stripped_ied_percent = (ied_stat - 3) / ((-1 * 3 / 100) + 1);
            ied_stat = determineIED(stripped_ied_percent, [3]);


        }
        test_value = ied_stat;
    }
    if (stat_type == 'attack') {
        attack_stat = attack_stat + 3;
        test_value = attack_stat;
    }
    if (stat_type == 'boss') {
        if (current_hyper_stat_points < 5) {
            boss_stat = boss_stat + 3;
        }
        else {
            boss_stat = boss_stat + 4;
        }
        test_value = boss_stat;
    }
    if (stat_type == 'dmg') {
        dmg_stat = dmg_stat + 3;
        test_value = dmg_stat;
    }
    if (stat_type == 'crit_dmg') {
        crit_dmg_stat = crit_dmg_stat + 1;
        test_value = crit_dmg_stat;
    }
    if (stat_type == 'primary' && maple_class != "Demon Avenger") {
        primary_stat = primary_stat + 30;
        var stat_types = getPrimaryAndSecondaryStatType(maple_class);
        var primary_stat_type = stat_types.primaryStatType;
        stat_to_raise = primary_stat_type

        if (maple_class == "Xenon") {
            var second_point_cost = cost_info[xenon_dex_points];
            var third_point_cost = cost_info[xenon_luk_points];
            special_case = true;

            if (second_point_cost < point_cost) {
                if (second_point_cost < third_point_cost) {
                    point_cost = second_point_cost;
                    stat_to_raise = "DEX";
                }
                else {
                    point_cost = third_point_cost; //same
                    stat_to_raise = "LUK";
                }
            }

            else if (third_point_cost < point_cost) {
                point_cost = third_point_cost; //same
                stat_to_raise = "LUK";
            }

            else {
                stat_to_raise = "STR";
            }
        }
        test_value = primary_stat;
    }
    if (stat_type == 'primary' && maple_class == "Demon Avenger") {
        primary_stat = primary_stat * 1.02;
        test_value = primary_stat;
        stat_to_raise = "HP";
    }
    if (stat_type == 'secondary' && maple_class != "Xenon") {
        secondary_stat = secondary_stat + 30;
        var stat_types = getPrimaryAndSecondaryStatType(maple_class);
        var secondary_stat_type = stat_types.secondaryStatType;
        stat_to_raise = secondary_stat_type;
        if (maple_class == "Cadena" || maple_class == "Dual Blade" || maple_class == "Shadower") {
            var second_point_cost = cost_info[secondary_str_points];
            special_case = true;
            if (second_point_cost < point_cost) {
                point_cost = second_point_cost;
                stat_to_raise = "STR";
            }
            else {
                stat_to_raise = "DEX";
            }
        }
        test_value = secondary_stat;
    }

    //divide new range by amount of points
    var stat_value = getStatValue(maple_class, primary_stat, secondary_stat, level);
    var newBossDefMultiplier = getBossDefMultiplier(ied_stat);
    var newHitDamage = getTrueHitDamage(boss_stat, attack_percent, dmg_stat, crit_dmg_stat, multiplier, stat_value, attack_stat);

    var newOutput = newBossDefMultiplier * newHitDamage;

    //console.log('new stats: primary stat: ' + primary_stat + ", secondary stat: " + secondary_stat, ", ied: " + ied_stat + ", boss: " + boss_stat + ", dmg: " + dmg_stat + ", crit dmg: " + crit_dmg_stat + ', attack: ' + attack_stat + ", stat_value: " + stat_value)
    //console.log('newOutput ' + newOutput)


    var boost_per_point = (newOutput - currentOutput) / point_cost;

    currentOutput = newOutput;

    //check if special case, return the stat to gain in special case
    //console.log('stat_type: ' + stat_type + ", new stat value: " + test_value + ", point cost: " + point_cost)
    return { 'boost_per_point': boost_per_point, 'stat_to_raise': stat_to_raise, 'point_cost': point_cost, 'new_stat_amount': test_value, 'special_case': special_case, 'current_output': currentOutput }
}

function optimizeHypers(currentOutput, stripped_ied_percent, stripped_attack, stripped_boss_percent, stripped_damage_percent, stripped_crit_dmg, stripped_primary, stripped_secondary, maple_class, level, multiplier, attack_percent) {
    //compare only IED, boss, dmg, crit dmg, 
    //reset all to zero on optimization table
    document.getElementById('nstrSelect').value = 0;
    nupdatePoints(document.getElementById('nstrSelect'));

    document.getElementById('nlukSelect').value = 0;
    nupdatePoints(document.getElementById('nlukSelect'));

    document.getElementById('ndexSelect').value = 0;
    nupdatePoints(document.getElementById('ndexSelect'));

    document.getElementById('nintSelect').value = 0;
    nupdatePoints(document.getElementById('nintSelect'));

    document.getElementById('nhpSelect').value = 0;
    nupdatePoints(document.getElementById('nhpSelect'));

    document.getElementById('nmpSelect').value = 0;
    nupdatePoints(document.getElementById('nmpSelect'));

    document.getElementById('ndemForSelect').value = 0;
    nupdatePoints(document.getElementById('ndemForSelect'));

    document.getElementById('ncritRateSelect').value = 0;
    nupdatePoints(document.getElementById('ncritRateSelect'));

    document.getElementById('ncritDmgSelect').value = 0;
    nupdatePoints(document.getElementById('ncritDmgSelect'));

    document.getElementById('nignDefSelect').value = 0;
    nupdatePoints(document.getElementById('nignDefSelect'));

    document.getElementById('ndamageSelect').value = 0;
    nupdatePoints(document.getElementById('ndamageSelect'));

    document.getElementById('nbDamageSelect').value = 0;
    nupdatePoints(document.getElementById('nbDamageSelect'));

    document.getElementById('nstatResistSelect').value = 0;
    nupdatePoints(document.getElementById('nstatResistSelect'));

    document.getElementById('nstanceSelect').value = 0;
    nupdatePoints(document.getElementById('nstanceSelect'));

    document.getElementById('nattPowerSelect').value = 0;
    nupdatePoints(document.getElementById('nattPowerSelect'));

    document.getElementById('nbonusExpSelect').value = 0;
    nupdatePoints(document.getElementById('nbonusExpSelect'));

    document.getElementById('narcForceSelect').value = 0;
    nupdatePoints(document.getElementById('narcForceSelect'));

    var available_points = parseInt(document.getElementById('nhyperPoints').innerHTML);
    var ied_stat = stripped_ied_percent;
    var attack_stat = stripped_attack;
    var boss_stat = stripped_boss_percent;
    var dmg_stat = stripped_damage_percent;
    var crit_dmg_stat = stripped_crit_dmg;
    var primary_stat = stripped_primary;
    var secondary_stat = stripped_secondary;

    var hyper_ied_points = 0;
    var hyper_attack_points = 0;
    var hyper_boss_points = 0;
    var hyper_dmg_points = 0;
    var hyper_crit_dmg_points = 0;
    var hyper_primary_points = 0;
    var hyper_secondary_points = 0;

    //for xenon primary (str/dex/luk)
    var hyper_primary_points_dex = 0;
    var hyper_primary_points_luk = 0;

    //for cadena, db, shad secondary (dex/str)
    var hyper_secondary_points_str = 0;

    //lock in the ones the user wants, this is fully working for str, create a process to check over every checkbox
    available_points = transferLockedOptions();

    //begin loops
    var i = 0
    while (i < 1) {
        //determine boost/point
        var boost_per_point_ied = determineBoostPerPoint('ied', hyper_ied_points, currentOutput, ied_stat, attack_stat, boss_stat, dmg_stat, crit_dmg_stat, primary_stat, secondary_stat, maple_class, level, multiplier, attack_percent, hyper_primary_points_dex, hyper_primary_points_luk, hyper_secondary_points_str);
        var boost_per_point_attack = determineBoostPerPoint('attack', hyper_attack_points, currentOutput, ied_stat, attack_stat, boss_stat, dmg_stat, crit_dmg_stat, primary_stat, secondary_stat, maple_class, level, multiplier, attack_percent, hyper_primary_points_dex, hyper_primary_points_luk, hyper_secondary_points_str);
        var boost_per_point_boss = determineBoostPerPoint('boss', hyper_boss_points, currentOutput, ied_stat, attack_stat, boss_stat, dmg_stat, crit_dmg_stat, primary_stat, secondary_stat, maple_class, level, multiplier, attack_percent, hyper_primary_points_dex, hyper_primary_points_luk, hyper_secondary_points_str);
        var boost_per_point_dmg = determineBoostPerPoint('dmg', hyper_dmg_points, currentOutput, ied_stat, attack_stat, boss_stat, dmg_stat, crit_dmg_stat, primary_stat, secondary_stat, maple_class, level, multiplier, attack_percent, hyper_primary_points_dex, hyper_primary_points_luk, hyper_secondary_points_str);
        var boost_per_point_crit_dmg = determineBoostPerPoint('crit_dmg', hyper_crit_dmg_points, currentOutput, ied_stat, attack_stat, boss_stat, dmg_stat, crit_dmg_stat, primary_stat, secondary_stat, maple_class, level, multiplier, attack_percent, hyper_primary_points_dex, hyper_primary_points_luk, hyper_secondary_points_str);
        var boost_per_point_primary = determineBoostPerPoint('primary', hyper_primary_points, currentOutput, ied_stat, attack_stat, boss_stat, dmg_stat, crit_dmg_stat, primary_stat, secondary_stat, maple_class, level, multiplier, attack_percent, hyper_primary_points_dex, hyper_primary_points_luk, hyper_secondary_points_str);
        var boost_per_point_secondary = determineBoostPerPoint('secondary', hyper_secondary_points, currentOutput, ied_stat, attack_stat, boss_stat, dmg_stat, crit_dmg_stat, primary_stat, secondary_stat, maple_class, level, multiplier, attack_percent, hyper_primary_points_dex, hyper_primary_points_luk, hyper_secondary_points_str);

        /*console.log('ied: ' + boost_per_point_ied.boost_per_point)
        console.log('att: ' + boost_per_point_attack.boost_per_point)
        console.log('boss: ' + boost_per_point_boss.boost_per_point)
        console.log('dmg: ' + boost_per_point_dmg.boost_per_point)
        console.log('critdmg: ' + boost_per_point_crit_dmg.boost_per_point)
        console.log('primary: ' + boost_per_point_primary.boost_per_point)
        console.log('secondary: ' + boost_per_point_secondary.boost_per_point)*/

        //check which is the highest
        var obj = {
            'boost_per_point_ied': boost_per_point_ied,
            'boost_per_point_attack': boost_per_point_attack,
            'boost_per_point_boss': boost_per_point_boss,
            'boost_per_point_dmg': boost_per_point_dmg,
            'boost_per_point_crit_dmg': boost_per_point_crit_dmg,
            'boost_per_point_primary': boost_per_point_primary,
            'boost_per_point_secondary': boost_per_point_secondary
        }
        var choice_array = Object.keys(obj);
        var z = 0;
        var highest_value = 0;
        var highest_value_points = 0;
        var best_choice = 0;

        var other_options = {};

        while (z < choice_array.length) {
            var option = choice_array[z]
            var new_value = obj[option].boost_per_point
            if (new_value > highest_value) {
                var point_cost = obj[option].point_cost;
                //double check best choice is not already maxed
                if (point_cost < 111 && point_cost <= available_points) { //check that you can afford this option
                    highest_value = new_value;
                    highest_value_points = point_cost;
                    best_choice = option;
                    currentOutput = obj[option].current_output;
                }
            }
            if (new_value < highest_value) {
                var point_cost = obj[option].point_cost;
                other_options[option] = { 'point_cost': point_cost, 'value': new_value }
            }
            z++
        }
        var go = true;

        //console.log(other_options)
        //check if from other_options, summing 2 or more elements satisfy point_cost < highest_value_points and value > highest_value

        if (go) {
            if (best_choice == 'boost_per_point_ied') {
                hyper_ied_points++;
                ied_stat = obj[best_choice].new_stat_amount;

                document.getElementById('nignDefSelect').value = hyper_ied_points;
                nupdatePoints(document.getElementById('nignDefSelect'));
                available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);

            }
            if (best_choice == 'boost_per_point_attack') {
                hyper_attack_points++;
                attack_stat = obj[best_choice].new_stat_amount;

                document.getElementById('nattPowerSelect').value = hyper_attack_points;
                nupdatePoints(document.getElementById('nattPowerSelect'));
                available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
            }
            if (best_choice == 'boost_per_point_boss') {
                hyper_boss_points++;
                boss_stat = obj[best_choice].new_stat_amount;

                document.getElementById('nbDamageSelect').value = hyper_boss_points;
                nupdatePoints(document.getElementById('nbDamageSelect'));
                available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
            }
            if (best_choice == 'boost_per_point_dmg') {
                hyper_dmg_points++;
                dmg_stat = obj[best_choice].new_stat_amount;

                document.getElementById('ndamageSelect').value = hyper_dmg_points;
                nupdatePoints(document.getElementById('ndamageSelect'));
                available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
            }
            if (best_choice == 'boost_per_point_crit_dmg') {
                hyper_crit_dmg_points++;
                crit_dmg_stat = obj[best_choice].new_stat_amount;

                document.getElementById('ncritDmgSelect').value = hyper_crit_dmg_points;
                nupdatePoints(document.getElementById('ncritDmgSelect'));
                available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
            }
            if (best_choice == 'boost_per_point_primary') {
                //hyper_primary_points++;
                primary_stat = obj[best_choice].new_stat_amount;
                var stat_to_raise = obj[best_choice].stat_to_raise;

                if (stat_to_raise == "HP") {
                    hyper_primary_points++;

                    document.getElementById('nhpSelect').value = hyper_primary_points;
                    nupdatePoints(document.getElementById('nhpSelect'));
                    available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
                }
                if (stat_to_raise == "LUK") {
                    if (obj[best_choice].special_case) {
                        hyper_primary_points_luk++
                        document.getElementById('nlukSelect').value = hyper_primary_points_luk;
                    }
                    else {
                        hyper_primary_points++;
                        document.getElementById('nlukSelect').value = hyper_primary_points;
                    }
                    nupdatePoints(document.getElementById('nlukSelect'));
                    available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
                }
                if (stat_to_raise == "DEX") {
                    if (obj[best_choice].special_case) {
                        hyper_primary_points_dex++
                        document.getElementById('ndexSelect').value = hyper_primary_points_dex;
                    }
                    else {
                        hyper_primary_points++;
                        document.getElementById('ndexSelect').value = hyper_primary_points;
                    }
                    nupdatePoints(document.getElementById('nstrSelect'));
                    available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
                }
                if (stat_to_raise == "STR") {
                    hyper_primary_points++;
                    document.getElementById('nstrSelect').value = hyper_primary_points;

                    nupdatePoints(document.getElementById('nstrSelect'));
                    available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
                }
                if (stat_to_raise == "INT") {
                    hyper_primary_points++;
                    document.getElementById('nintSelect').value = hyper_primary_points;

                    nupdatePoints(document.getElementById('nintSelect'));
                    available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
                }


            }
            if (best_choice == 'boost_per_point_secondary') {
                secondary_stat = obj[best_choice].new_stat_amount;
                var stat_to_raise = obj[best_choice].stat_to_raise;

                if (stat_to_raise == "HP") {
                    hyper_secondary_points++;

                    document.getElementById('nhpSelect').value = hyper_secondary_points;
                    nupdatePoints(document.getElementById('nhpSelect'));
                    available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
                }
                if (stat_to_raise == "LUK") {
                    hyper_secondary_points++;

                    document.getElementById('nlukSelect').value = hyper_secondary_points;
                    nupdatePoints(document.getElementById('nlukSelect'));
                    available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
                }
                if (stat_to_raise == "DEX") {
                    hyper_secondary_points++;

                    document.getElementById('ndexSelect').value = hyper_secondary_points;
                    nupdatePoints(document.getElementById('ndexSelect'));
                    available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
                }
                if (stat_to_raise == "STR") {
                    if (obj[best_choice].special_case) {
                        hyper_secondary_points_str++
                        document.getElementById('nstrSelect').value = hyper_secondary_points_str;
                    }
                    else {
                        hyper_secondary_points++;
                        document.getElementById('nstrSelect').value = hyper_secondary_points;
                    }
                    nupdatePoints(document.getElementById('nstrSelect'));
                    available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
                }
                if (stat_to_raise == "INT") {
                    hyper_secondary_points++;

                    document.getElementById('nintSelect').value = hyper_secondary_points;
                    nupdatePoints(document.getElementById('nintSelect'));
                    available_points = parseInt(document.getElementById('ncurrentPoints').innerHTML);
                }

            }
        }
        if (highest_value == 0) {
            //optimization is complete, break loop, start working on results
            i = 1;
            break;
        }

    }
    var final_stat_value = getStatValue(maple_class, primary_stat, secondary_stat, level)
    var BossDefMultiplier = getBossDefMultiplier(ied_stat);
    var HitDamage = getTrueHitDamage(boss_stat, attack_percent, dmg_stat, crit_dmg_stat, multiplier, final_stat_value, attack_stat);

    var Output = BossDefMultiplier * HitDamage;

    //console.log('new stats: primary stat: ' + primary_stat + ", secondary stat: " + secondary_stat, ", ied: " + ied_stat + ", boss: " + boss_stat + ", dmg: " + dmg_stat + ", crit dmg: " + crit_dmg_stat + ', attack: ' + attack_stat + ", stat_value: " + final_stat_value)
    //console.log('newOutput ' + Output)
    return Output
}

function availableOptions() {
    var selects = document.getElementById("stats").getElementsByTagName("select");
    var options, currValue, toValue;
    for (var primCount = 0; primCount < selects.length; primCount++) {
        options = selects[primCount].options;
        currValue = information.levelTotals[selects[primCount].value];
        for (var secCount = 0; secCount < options.length; secCount++) {
            toValue = (information.levelTotals[options[secCount].value] - currValue);
            options[secCount].disabled = (information.remainder - toValue < 0);
        }
    }
}

function navailableOptions() {
    var selects = document.getElementById("nstats").getElementsByTagName("select");
    var options, currValue, toValue;
    for (var primCount = 0; primCount < selects.length; primCount++) {
        options = selects[primCount].options;
        currValue = new_information.levelTotals[selects[primCount].value];
        for (var secCount = 0; secCount < options.length; secCount++) {
            toValue = (new_information.levelTotals[options[secCount].value] - currValue);
            options[secCount].disabled = (new_information.remainder - toValue < 0);
        }
    }
}

function updateRemainder() {
    information.currentUsed = 0;
    for (var statKey in information.currentStatLevels) {
        if (information.currentStatLevels.hasOwnProperty(statKey)) {
            information.currentUsed += information.currentStatLevels[statKey];
        }
    }
    // EMCAScript 5 code which won't work on IE7 and such, so using the old method above instead.
    /*Object.keys(information.currentStatLevels).forEach(function (key) {
      information.currentUsed += information.currentStatLevels[key];
    });*/
    document.getElementById("currentPoints").innerHTML = information.remainder = (information.currentPoints - information.currentUsed);
    availableOptions();
}

function nupdateRemainder() {
    new_information.currentUsed = 0;
    for (var statKey in new_information.currentStatLevels) {
        if (new_information.currentStatLevels.hasOwnProperty(statKey)) {
            new_information.currentUsed += new_information.currentStatLevels[statKey];
        }
    }
    // EMCAScript 5 code which won't work on IE7 and such, so using the old method above instead.
    /*Object.keys(information.currentStatLevels).forEach(function (key) {
      information.currentUsed += information.currentStatLevels[key];
    });*/
    document.getElementById("ncurrentPoints").innerHTML = new_information.remainder = (new_information.currentPoints - new_information.currentUsed);
    navailableOptions();
}

function updatePoints(element, noupdate) {
    information.currentStatLevels[element.dataset.id] = information.levelTotals[element.value];
    calculateStat(element);
    if (noupdate) return;
    updateRemainder();
}

function nupdatePoints(element, noupdate) {
    new_information.currentStatLevels[element.dataset.id] = new_information.levelTotals[element.value];
    ncalculateStat(element);
    if (noupdate) return;
    nupdateRemainder();
}

function resetStats() {
    var selects = document.getElementById("stats").getElementsByTagName("select");
    for (var counter = 0; counter < selects.length; counter++) {
        options = selects[counter].value = 0;
        updatePoints(selects[counter], true);
    }
}

function nresetStats() {
    var selects = document.getElementById("stats").getElementsByTagName("select");
    for (var counter = 0; counter < selects.length; counter++) {
        options = selects[counter].value = 0;
        nupdatePoints(selects[counter], true);
    }
}

function calculateStat(element) {
    var result = 0,
        increment = 0,
        currentLevel = 0;
    switch (element.dataset.type) {
        case "0":
            if (element.dataset.id == 'bonusExp' || element.dataset.id == 'arcForce') {
                if (element.value <= 10) {
                    result = element.value * element.dataset.value;
                    break;
                }
                else {
                    var diff = element.value - 10;
                    result = 10 * element.dataset.value + (diff * element.dataset.value * 2);
                    break;
                }
            }
            else {
                result = element.value * element.dataset.value;
                break;
            }
        case "1":
            increment += parseInt(element.dataset.value);
            for (result = 0; currentLevel < element.value; result += increment, currentLevel++) {
                if (currentLevel % 5 === 0 || currentLevel === 0) {
                    if (increment < 2 && (element.dataset.id == 'critRate' || element.dataset.id == 'statResist')) {
                        increment++;
                    }
                    if (increment < 4 && element.dataset.id == 'bDamage') {
                        increment++;
                    }
                }
                //console.log(element.dataset.id + " " + increment + " " + result);
            }
            // Old, hard calculation based on a less obvious increment value./*
            /*increment = parseInt(element.dataset.value), result = 0;
            for (var loop = 1; loop <= element.value; loop++) {
              //console.log("Loop: " + loop + " Increment: " + increment + " Result: " + result);
              result += information.specialIncr[loop] + increment;
            }*/
            //result = (element.value > 0 ? information.specialIncr[element.value] + parseInt(element.dataset.value) : 0);
            //console.log(element.dataset.id + " " + result);
            break;
        case "2":
            result = element.value * element.dataset.value * 2;
            break;
        default:
            console.log("Error: Invalid Type ID: " + element.dataset.type);
    }
    document.getElementById(element.dataset.id).innerHTML = result + (element.dataset.percent !== undefined ? "%" : "");
    document.getElementById(element.dataset.id).value = result;
    //console.log(document.getElementById(element.dataset.id).value);
}

function ncalculateStat(element) {
    var result = 0,
        increment = 0,
        currentLevel = 0;
    switch (element.dataset.type) {
        case "0":
            if (element.dataset.id == 'nbonusExp' || element.dataset.id == 'narcForce') {
                if (element.value <= 10) {
                    result = element.value * element.dataset.value;
                    break;
                }
                else {
                    var diff = element.value - 10;
                    result = 10 * element.dataset.value + (diff * element.dataset.value * 2);
                    break;
                }
            }
            else {
                result = element.value * element.dataset.value;
                break;
            }
        case "1":
            increment += parseInt(element.dataset.value);
            for (result = 0; currentLevel < element.value; result += increment, currentLevel++) {
                if (currentLevel % 5 === 0 || currentLevel === 0) {
                    if (increment < 2 && (element.dataset.id == 'ncritRate' || element.dataset.id == 'nstatResist')) {
                        increment++;
                    }
                    if (increment < 4 && element.dataset.id == 'nbDamage') {
                        increment++;
                    }
                }
                //console.log(element.dataset.id + " " + increment + " " + result);
            }
            // Old, hard calculation based on a less obvious increment value./*
            /*increment = parseInt(element.dataset.value), result = 0;
            for (var loop = 1; loop <= element.value; loop++) {
              //console.log("Loop: " + loop + " Increment: " + increment + " Result: " + result);
              result += information.specialIncr[loop] + increment;
            }*/
            //result = (element.value > 0 ? information.specialIncr[element.value] + parseInt(element.dataset.value) : 0);
            //console.log(element.dataset.id + " " + result);
            break;
        case "2":
            result = element.value * element.dataset.value * 2;
            break;
        default:
            console.log("Error: Invalid Type ID: " + element.dataset.type);
    }
    document.getElementById(element.dataset.id).innerHTML = result + (element.dataset.percent !== undefined ? "%" : "");
}

function calcHyperStatPoints() {
    var inputLevel = document.getElementById("level").value;
    var checkLevel = 140;
    var increment = 3;
    for (var currentPoints = 0; checkLevel <= inputLevel; currentPoints += increment, checkLevel++) {
        if (checkLevel % 10 === 0 && checkLevel > 140) increment++;
    }
    if (information.currentLevel > inputLevel && information.currentUsed > currentPoints) resetStats();
    information.currentLevel = inputLevel;
    document.getElementById("hyperPoints").innerHTML = information.currentPoints = currentPoints;
    updateRemainder();
}

function ncalcHyperStatPoints() {
    var inputLevel = document.getElementById("level").value;
    var checkLevel = 140;
    var increment = 3;
    for (var currentPoints = 0; checkLevel <= inputLevel; currentPoints += increment, checkLevel++) {
        if (checkLevel % 10 === 0 && checkLevel > 140) increment++;
    }
    if (new_information.currentLevel > inputLevel && new_information.currentUsed > currentPoints) nresetStats();
    new_information.currentLevel = inputLevel;
    document.getElementById("nhyperPoints").innerHTML = new_information.currentPoints = currentPoints;
    nupdateRemainder();
}


function init() {
    //var levelSelection = document.getElementById("inputLevel");
    var stats = document.getElementById("stats").getElementsByTagName("select");
    var optionElement;
    // for (var countLevel = 140; countLevel < 276; countLevel++) {
    //    optionElement = document.createElement("option");
    //    optionElement.value = optionElement.text = countLevel;
    //     levelSelection.add(optionElement);
    // }
    for (var eleCounter = 0; eleCounter < stats.length; eleCounter++) {
        var maxOptions = (stats[eleCounter].dataset.maxLevel == "10" ? 11 : 16);
        for (var statLevel = 0; statLevel < maxOptions; statLevel++) {
            optionElement = document.createElement("option");
            optionElement.value = optionElement.text = statLevel;
            stats[eleCounter].add(optionElement);
        }
        calculateStat(stats[eleCounter]);
    }
    calcHyperStatPoints();
}

function ninit() {
    //var levelSelection = document.getElementById("inputLevel");
    var stats = document.getElementById("nstats").getElementsByTagName("select");
    var optionElement;
    // for (var countLevel = 140; countLevel < 276; countLevel++) {
    //    optionElement = document.createElement("option");
    //    optionElement.value = optionElement.text = countLevel;
    //     levelSelection.add(optionElement);
    // }
    for (var eleCounter = 0; eleCounter < stats.length; eleCounter++) {
        var maxOptions = (stats[eleCounter].dataset.maxLevel == "10" ? 11 : 16);
        for (var statLevel = 0; statLevel < maxOptions; statLevel++) {
            optionElement = document.createElement("option");
            optionElement.value = optionElement.text = statLevel;
            stats[eleCounter].add(optionElement);
        }
        ncalculateStat(stats[eleCounter]);
    }
    ncalcHyperStatPoints();
}

function getUpperActualDamage(attack_percent) {
    var upperActualDamage = attack_percent / 100;
    return upperActualDamage
}

function getTrueUpperActualDamage(attack_percent, multiplier, stat_value, attack) {
    var upperActualDamage = multiplier * stat_value * attack * (attack_percent / 100);
    return upperActualDamage
}

function getUpperShownDamage(attack_percent, damage_percent) {
    var upperActualDamage = getUpperActualDamage(attack_percent);
    var upperShownDamage = upperActualDamage * (1 + damage_percent / 100);
    return upperShownDamage
}

function getTrueUpperShownDamage(attack_percent, damage_percent, multiplier, stat_value, attack) {
    var upperActualDamage = getTrueUpperActualDamage(attack_percent, multiplier, stat_value, attack);
    var upperShownDamage = upperActualDamage * (1 + damage_percent / 100);
    return upperShownDamage
}

function getStatValue(maple_class, main_stat_amount, secondary_stat_amount, level) {
    var statValue = 4 * main_stat_amount + secondary_stat_amount

    if (maple_class == 'Demon Avenger') {
        var pureHP = 545 + 90 * level
        var statValue = Math.floor(pureHP / 3.5) + 0.8 * Math.floor((main_stat_amount - pureHP) / 3.5) + secondary_stat_amount
    }
    return statValue
}

function determineAttAmount(upperShownDamage, multiplier, statValue, damagePercent, finalDamagePercent) {
    //upperShownDamage = Multiplier * StatValue * attack/100
    var attack = ((((upperShownDamage / multiplier) / statValue) * 100) / (1 + damagePercent / 100)) / (1 + finalDamagePercent / 100)
    return attack
}

function getPrimaryAndSecondaryStatType(maple_class) {
    var PrimaryAndSecondaryStatType = {
        'Adele': {
            'primaryStatType': 'STR',
            'secondaryStatType': 'DEX'
        },
        'Angelic Buster': {
            'primaryStatType': 'DEX',
            'secondaryStatType': 'STR'
        },
        'Aran': {
            'primaryStatType': 'STR',
            'secondaryStatType': 'DEX'
        },
        'Ark': {
            'primaryStatType': 'STR',
            'secondaryStatType': 'DEX'
        },
        'Battle Mage': {
            'primaryStatType': 'INT',
            'secondaryStatType': 'LUK'
        },
        'Bishop': {
            'primaryStatType': 'INT',
            'secondaryStatType': 'LUK'
        },
        'Blaster': {
            'primaryStatType': 'STR',
            'secondaryStatType': 'DEX'
        },
        'Blaze Wizard': {
            'primaryStatType': 'INT',
            'secondaryStatType': 'LUK'
        },
        'Beast Tamer': {
            'primaryStatType': 'INT',
            'secondaryStatType': 'LUK'
        },
        'Bowmaster': {
            'primaryStatType': 'DEX',
            'secondaryStatType': 'STR'
        },
        'Buccaneer': {
            'primaryStatType': 'STR',
            'secondaryStatType': 'DEX'
        },
        'Cadena': {
            'primaryStatType': 'LUK',
            'secondaryStatType': 'STR + DEX'
        },
        'Cannoneer': {
            'primaryStatType': 'STR',
            'secondaryStatType': 'DEX'
        },
        'Corsair': {
            'primaryStatType': 'DEX',
            'secondaryStatType': 'STR'
        },
        'Dark Knight': {
            'primaryStatType': 'STR',
            'secondaryStatType': 'DEX'
        },
        'Dawn Warrior': {
            'primaryStatType': 'STR',
            'secondaryStatType': 'DEX'
        },
        'Demon Avenger': {
            'primaryStatType': 'HP',
            'secondaryStatType': 'STR'
        },
        'Demon Slayer': {
            'primaryStatType': 'STR',
            'secondaryStatType': 'DEX'
        },
        'Dual Blade': {
            'primaryStatType': 'LUK',
            'secondaryStatType': 'STR + DEX'
        },
        'Evan': {
            'primaryStatType': 'INT',
            'secondaryStatType': 'LUK'
        },
        'Fire Poison': {
            'primaryStatType': 'INT',
            'secondaryStatType': 'LUK'
        },
        'Hayato': {
            'primaryStatType': 'STR',
            'secondaryStatType': 'DEX'
        },
        'Hero': {
            'primaryStatType': 'STR',
            'secondaryStatType': 'DEX'
        },
        'Hoyoung': {
            'primaryStatType': 'LUK',
            'secondaryStatType': 'DEX'
        },
        'Ice Lightning': {
            'primaryStatType': 'INT',
            'secondaryStatType': 'LUK'
        },
        'Illium': {
            'primaryStatType': 'INT',
            'secondaryStatType': 'LUK'
        },
        'Jett': {
            'primaryStatType': 'DEX',
            'secondaryStatType': 'STR'
        },
        'Kain': {
            'primaryStatType': 'DEX',
            'secondaryStatType': 'STR'
        },
        'Kaiser': {
            'primaryStatType': 'STR',
            'secondaryStatType': 'DEX'
        },
        'Kanna': {
            'primaryStatType': 'INT',
            'secondaryStatType': 'LUK'
        },
        'Kinesis': {
            'primaryStatType': 'INT',
            'secondaryStatType': 'LUK'
        },
        'Lara': {
            'primaryStatType': 'INT',
            'secondaryStatType': 'LUK'
        },
        'Luminous': {
            'primaryStatType': 'INT',
            'secondaryStatType': 'LUK'
        },
        'Marksmen': {
            'primaryStatType': 'DEX',
            'secondaryStatType': 'STR'
        },
        'Mechanic': {
            'primaryStatType': 'DEX',
            'secondaryStatType': 'STR'
        },
        'Mercedes': {
            'primaryStatType': 'DEX',
            'secondaryStatType': 'STR'
        },
        'Mihile': {
            'primaryStatType': 'STR',
            'secondaryStatType': 'DEX'
        },
        'Night Lord': {
            'primaryStatType': 'LUK',
            'secondaryStatType': 'DEX'
        },
        'Night Walker': {
            'primaryStatType': 'LUK',
            'secondaryStatType': 'DEX'
        },
        'Paladin': {
            'primaryStatType': 'STR',
            'secondaryStatType': 'DEX'
        },
        'Pathfinder': {
            'primaryStatType': 'DEX',
            'secondaryStatType': 'STR'
        },
        'Phantom': {
            'primaryStatType': 'LUK',
            'secondaryStatType': 'DEX'
        },
        'Shade': {
            'primaryStatType': 'STR',
            'secondaryStatType': 'DEX'
        },
        'Shadower': {
            'primaryStatType': 'LUK',
            'secondaryStatType': 'STR + DEX'
        },
        'Thunder Breaker': {
            'primaryStatType': 'STR',
            'secondaryStatType': 'DEX'
        },
        'Wild Hunter': {
            'primaryStatType': 'DEX',
            'secondaryStatType': 'STR'
        },
        'Wind Archer': {
            'primaryStatType': 'DEX',
            'secondaryStatType': 'STR'
        },
        'Xenon': {
            'primaryStatType': 'STR + DEX + LUK',
            'secondaryStatType': 'N/A'
        },
        'Zero': {
            'primaryStatType': 'STR',
            'secondaryStatType': 'DEX'
        },
    }
    return PrimaryAndSecondaryStatType[maple_class]
}

function getMultiplier(weapon_type, maple_class) {
    var Multipliers = {
        'ancient_bow': 1.30, //good
        'arm_cannon': 1.70, //good
        'bladecaster': 1.30,//good
        'bow': 1.30, //good
        'cane': 1.30, //good
        'cannon': 1.50, //good
        'claw': 1.75, //good
        'cross_bow': 1.35, //good
        'dagger': 1.30, //good
        'desperado': 1.30, //good
        'dual_bowgun': 1.30, //good
        'energy_chain': 1.30, //good
        'fan': 1.35, //good
        'gun': 1.50, //good
        'heavy_sword': 1.49, //good
        'katana': 1.25, //good
        'knuckle': 1.70, //good
        'long_sword': 1.34, //good
        'lucent_gauntlet': 1.20, //good
        'one_hand_axe': 1.20, //good
        'one_hand_axe_hero': 1.30, //good
        'one_hand_blunt': 1.20, //good
        'one_hand_sword': 1.20, //good
        'polearm': 1.49, //good
        'psy_limiter': 1.20, //good
        'ritual_fan': 1.30, //good
        'scepter': 1.34, //good
        'shining_rod': 1.20, //good
        'soul_shooter': 1.70, //good
        'spear': 1.49, //good
        'staff': 1.00, //good
        'staff_adventure': 1.20, //good
        'two_hand_axe': 1.34, //good
        'two_hand_axe_hero': 1.44, //good
        'two_hand_blunt': 1.34, //good
        'two_hand_sword': 1.34, //good
        'wand': 1.00, //good
        'wand_adventure': 1.20, //good
        'whip_blade': 1.3125, //good
        'whispershot': 1.30, //good
    };

    if (maple_class == 'Hero') {
        if (weapon_type == "two_hand_axe") return Multipliers.two_hand_axe_hero
        else if (weapon_type == "one_hand_axe") return Multipliers.one_hand_axe_hero
        else return Multipliers[weapon_type]
    } else if (maple_class == 'Ice Lightning' || maple_class == "Fire Poison" || maple_class == 'Bishop' || maple_class == 'Blaze Wizard') {
        if (weapon_type == "wand") {
            return Multipliers.wand_adventure
        } else return Multipliers.staff_adventure
    } else {
        return Multipliers[weapon_type]
    }
}

function getHitDamage(boss_percent, attack_percent, damage_percent) {
    var upperShownDamage = getUpperShownDamage(attack_percent, damage_percent);
    var hitDamage = upperShownDamage / (1 + damage_percent / 100) * (1 + (damage_percent + boss_percent) / 100);
    return hitDamage
}

function getTrueHitDamage(boss_percent, attack_percent, damage_percent, critical_damage, multiplier, stat_value, attack) {
    var upperShownDamage = getTrueUpperShownDamage(attack_percent, damage_percent, multiplier, stat_value, attack);
    var hitDamage = upperShownDamage / (1 + damage_percent / 100) * (1 + (damage_percent + boss_percent) / 100);
    return hitDamage * (1 + critical_damage / 100)
}

function getBossDefMultiplier(ied_percent) {
    var bossDefMultipler = 1 - (300 / 100) * (1 - (ied_percent / 100))
    return bossDefMultipler
}

//Helper Functions
function determineIED(ied_percent, ied_sources) {
    var i = 0;
    var new_ied = ied_percent;

    while (i < ied_sources.length) {
        new_source = ied_sources[i];
        additional_ied = (new_source / 100) * (100 - new_ied);
        new_ied = new_ied + additional_ied;
        i++;
    }

    return new_ied
}

function AddPotentialsToStats(new_potential_list, stripped_ied_percent, stripped_attack_percent, stripped_boss_percent, stripped_damage_percent) {
    var i = 0;
    var new_ied_percent = stripped_ied_percent;
    var new_attack_percent = stripped_attack_percent;
    var new_boss_percent = stripped_boss_percent;
    var new_damage_percent = stripped_damage_percent;

    while (i < new_potential_list.length) {
        var current_potential = new_potential_list[i];

        if (current_potential == '40boss') {
            new_boss_percent = new_boss_percent + 40;
        }
        if (current_potential == '35boss') {
            new_boss_percent = new_boss_percent + 35;
        }
        if (current_potential == '30boss') {
            new_boss_percent = new_boss_percent + 30;
        }
        if (current_potential == '20boss') {
            new_boss_percent = new_boss_percent + 20;
        }


        if (current_potential == '13att') {
            new_attack_percent = new_attack_percent + 13;
        }
        if (current_potential == '12att') {
            new_attack_percent = new_attack_percent + 12;
        }
        if (current_potential == '10att') {
            new_attack_percent = new_attack_percent + 10;
        }
        if (current_potential == '9att') {
            new_attack_percent = new_attack_percent + 9;
        }

        if (current_potential == '13dmg') {
            new_damage_percent = new_damage_percent + 13;
        }
        if (current_potential == '12dmg') {
            new_damage_percent = new_damage_percent + 12;
        }
        if (current_potential == '10dmg') {
            new_damage_percent = new_damage_percent + 10;
        }
        if (current_potential == '9dmg') {
            new_damage_percent = new_damage_percent + 9;
        }


        if (current_potential == '40ied') {
            var current_ied = new_ied_percent;
            new_ied_percent = determineIED(current_ied, [40]);
        }
        if (current_potential == '35ied') {
            var current_ied = new_ied_percent;
            new_ied_percent = determineIED(current_ied, [35]);
        }
        if (current_potential == '30ied') {
            var current_ied = new_ied_percent;
            new_ied_percent = determineIED(current_ied, [30]);
        }
        i++;
    }
    return { 'new_ied_percent': new_ied_percent, 'new_attack_percent': new_attack_percent, 'new_boss_percent': new_boss_percent, 'new_damage_percent': new_damage_percent }
}

function removePotentialsFromStats(potential_list, current_ied_percent, current_attack_percent, current_boss_percent, current_damage_percent) {
    var i = 0;
    var stripped_ied_percent = current_ied_percent;
    var stripped_attack_percent = current_attack_percent;
    var stripped_boss_percent = current_boss_percent;
    var stripped_damage_percent = current_damage_percent;

    while (i < potential_list.length) {
        var current_potential = potential_list[i];

        if (current_potential == '40boss') {
            stripped_boss_percent = stripped_boss_percent - 40;
        }
        if (current_potential == '35boss') {
            stripped_boss_percent = stripped_boss_percent - 35;
        }
        if (current_potential == '30boss') {
            stripped_boss_percent = stripped_boss_percent - 30;
        }
        if (current_potential == '20boss') {
            stripped_boss_percent = stripped_boss_percent - 20;
        }

        if (current_potential == '13att') {
            stripped_attack_percent = stripped_attack_percent - 13;
        }
        if (current_potential == '12att') {
            stripped_attack_percent = stripped_attack_percent - 12;
        }
        if (current_potential == '10att') {
            stripped_attack_percent = stripped_attack_percent - 10;
        }
        if (current_potential == '9att') {
            stripped_attack_percent = stripped_attack_percent - 9;
        }

        if (current_potential == '13dmg') {
            stripped_damage_percent = stripped_damage_percent - 13;
        }
        if (current_potential == '12dmg') {
            stripped_damage_percent = stripped_damage_percent - 12;
        }
        if (current_potential == '10dmg') {
            stripped_damage_percent = stripped_damage_percent - 10;
        }
        if (current_potential == '9dmg') {
            stripped_damage_percent = stripped_damage_percent - 9;
        }

        if (current_potential == '40ied') {
            var old_ied = stripped_ied_percent;
            stripped_ied_percent = (old_ied - 40) / ((-1 * 40 / 100) + 1)
        }
        if (current_potential == '35ied') {
            var old_ied = stripped_ied_percent;
            stripped_ied_percent = (old_ied - 35) / ((-1 * 35 / 100) + 1)
        }
        if (current_potential == '30ied') {
            var old_ied = stripped_ied_percent;
            stripped_ied_percent = (old_ied - 30) / ((-1 * 30 / 100) + 1)
        }

        i++;
    }
    return { 'stripped_ied_percent': stripped_ied_percent, 'stripped_attack_percent': stripped_attack_percent, 'stripped_boss_percent': stripped_boss_percent, 'stripped_damage_percent': stripped_damage_percent }
}

function getWSEATTPercent() {
    var wep_line_1 = document.getElementById('wline1').value;
    var wep_line_2 = document.getElementById('wline2').value;
    var wep_line_3 = document.getElementById('wline3').value;

    var sec_line_1 = document.getElementById('sline1').value;
    var sec_line_2 = document.getElementById('sline2').value;
    var sec_line_3 = document.getElementById('sline3').value;

    var emb_line_1 = document.getElementById('eline1').value;
    var emb_line_2 = document.getElementById('eline2').value;
    var emb_line_3 = document.getElementById('eline3').value;

    var potential_list = [wep_line_1, wep_line_2, wep_line_3, sec_line_1, sec_line_2, sec_line_3, emb_line_1, emb_line_2, emb_line_3];

    var i = 0;
    var WSEATTPercent = 0;

    while (i < potential_list.length) {
        var current_potential = potential_list[i];

        if (current_potential == '13att') {
            WSEATTPercent = WSEATTPercent + 13;
        }
        if (current_potential == '12att') {
            WSEATTPercent = WSEATTPercent + 12;
        }
        if (current_potential == '10att') {
            WSEATTPercent = WSEATTPercent + 10;
        }
        if (current_potential == '9att') {
            WSEATTPercent = WSEATTPercent + 9;
        }
        i++;
    }

    return WSEATTPercent
}

function haveSamePotentialLines(item1, item2) {
    if (item1[0] == item2[0] || item1[0] == item2[1] || item1[0] == item2[2]) {
        if (item1[1] == item2[0] || item1[1] == item2[1] || item1[1] == item2[2]) {
            if (item1[2] == item2[0] || item1[2] == item2[1] || item1[2] == item2[2]) {
                return true
            }
        }

    }
    return false
}

function doesPlayerPossess(item_type, lines) {
    if (item_type == 'weapon') {
        var index = 0;
        var player_line1 = document.getElementById('wline1').value;
        var player_line2 = document.getElementById('wline2').value;
        var player_line3 = document.getElementById('wline3').value;
    }
    if (item_type == 'secondary') {
        var index = 1;
        var player_line1 = document.getElementById('sline1').value;
        var player_line2 = document.getElementById('sline2').value;
        var player_line3 = document.getElementById('sline3').value;
    }
    if (item_type == 'emblem') {
        var index = 2;
        var player_line1 = document.getElementById('eline1').value;
        var player_line2 = document.getElementById('eline2').value;
        var player_line3 = document.getElementById('eline3').value;
    }

    var player_combination = [player_line1, player_line2, player_line3]

    return haveSamePotentialLines(player_combination, lines[index])
}

function numberOfItemsPlayerPossesses(lines) {
    var total = 0
    if (doesPlayerPossess('weapon', lines)) {
        total++
    }
    if (doesPlayerPossess('secondary', lines)) {
        total++
    }
    if (doesPlayerPossess('emblem', lines)) {
        total++
    }
    return total
}

function generatePossibleLineCombinations(item_type, item_level, maple_class) {
    var first_lines_160 = ["40boss", "13att", "40ied"];
    var other_lines_160 = ["30boss", "10att", "30ied"];
    var first_lines_160_emblem = ["13att", "40ied"];
    var other_lines_160_emblem = ["10att", "30ied"];
    var first_lines_160_kanna = ["13att"];
    var other_lines_160_kanna = ["10att"];

    var first_lines_150 = ["40boss", "12att", "40ied"];
    var other_lines_150 = ["30boss", "9att", "30ied"];
    var first_lines_150_emblem = ["12att", "40ied"];
    var other_lines_150_emblem = ["9att", "30ied"];
    var first_lines_150_kanna = ["12att"];
    var other_lines_150_kanna = ["9att"];

    var combinations = [];

    if (item_type == 'weapon') {
        var current_line1 = document.getElementById('wline1').value;
        var current_line2 = document.getElementById('wline2').value;
        var current_line3 = document.getElementById('wline3').value;
    }
    if (item_type == 'secondary') {
        var current_line1 = document.getElementById('sline1').value;
        var current_line2 = document.getElementById('sline2').value;
        var current_line3 = document.getElementById('sline3').value;
    }
    if (item_type == 'emblem') {
        var current_line1 = document.getElementById('eline1').value;
        var current_line2 = document.getElementById('eline2').value;
        var current_line3 = document.getElementById('eline3').value;
    }

    var current_combination = [current_line1, current_line2, current_line3]
    combinations.push(current_combination);

    if (item_level >= 160) {
        if (item_type == "emblem") {
            var first_lines = first_lines_160_emblem;
            var other_lines = other_lines_160_emblem;
        }
        else {
            if (maple_class == "Kanna") {
                var first_lines = first_lines_160_kanna;
                var other_lines = other_lines_160_kanna;
            }
            else {
                var first_lines = first_lines_160;
                var other_lines = other_lines_160;
            }
        }
    }
    else {
        if (item_type == "emblem") {
            var first_lines = first_lines_150_emblem;
            var other_lines = other_lines_150_emblem;
        }
        else {
            if (maple_class == "Kanna") {
                var first_lines = first_lines_150_kanna;
                var other_lines = other_lines_150_kanna;
            }
            else {
                var first_lines = first_lines_150;
                var other_lines = other_lines_150;
            }
        }
    }
    var i = 0;
    while (i < first_lines.length) {
        var specific_combination = [];
        var line_1 = first_lines[i];
        var j = 0;
        while (j < other_lines.length) {
            var line_2 = other_lines[j];
            var k = 0;
            while (k < other_lines.length) {
                var line_3 = other_lines[k];
                specific_combination = [line_1, line_2, line_3];
                combinations.push(specific_combination);
                k++;
            }
            j++;
        }
        i++;
    }
    return combinations
}

function determineAllWSECombinations(weapon_combinations, emblem_combinations, secondary_combinations) {
    var combinations = [];

    var i = 0;
    while (i < weapon_combinations.length) {
        var specific_combination = [];
        var weapon_lines = weapon_combinations[i];
        var j = 0;
        while (j < secondary_combinations.length) {
            var secondary_lines = secondary_combinations[j];
            var k = 0;
            while (k < emblem_combinations.length) {
                var emblem_lines = emblem_combinations[k];
                specific_combination = [weapon_lines, secondary_lines, emblem_lines];
                combinations.push(specific_combination);
                k++;
            }
            j++;
        }
        i++;
    }

    return combinations
}

function determineOptimizedWSE(weapon_level, secondary_level, emblem_level, stripped_ied_percent, stripped_attack_percent, stripped_boss_percent, stripped_damage_percent, maple_class) {
    var weapon_combinations = generatePossibleLineCombinations("weapon", weapon_level, maple_class);
    var emblem_combinations = generatePossibleLineCombinations("emblem", emblem_level, maple_class);
    if (weapon_level == secondary_level && maple_class != "Kanna") {
        secondary_combinations = weapon_combinations;
    }
    else {
        var secondary_combinations = generatePossibleLineCombinations("secondary", secondary_level, maple_class);
    }

    wse_combinations = determineAllWSECombinations(weapon_combinations, emblem_combinations, secondary_combinations);
    //0 = wep, 1 = sec, 2 = emb
    var best_combination = [];
    var tied_combinations = [];
    var highest_output = 0;
    var number_of_att_lines = 10;
    var total_options = 0;
    var triple_att_weapon = false;
    var triple_att_secondary = false;
    var triple_att_emblem = true;
    var number_of_3L_att = 3;
    var numberOfItemsPlayerHas = 0;
    //var itemPossessionInCurrentSetup = false;

    var i = 0;
    while (i < wse_combinations.length) {
        var specific_wse_combination = wse_combinations[i];

        //New WSE Potentials
        var new_wep_line_1 = specific_wse_combination[0][0];
        var new_wep_line_2 = specific_wse_combination[0][1];
        var new_wep_line_3 = specific_wse_combination[0][2];

        var new_sec_line_1 = specific_wse_combination[1][0];
        var new_sec_line_2 = specific_wse_combination[1][1];
        var new_sec_line_3 = specific_wse_combination[1][2];

        var new_emb_line_1 = specific_wse_combination[2][0];
        var new_emb_line_2 = specific_wse_combination[2][1];
        var new_emb_line_3 = specific_wse_combination[2][2];

        var new_potential_list = [new_wep_line_1, new_wep_line_2, new_wep_line_3, new_sec_line_1, new_sec_line_2, new_sec_line_3, new_emb_line_1, new_emb_line_2, new_emb_line_3];

        var withNewWSEStats = AddPotentialsToStats(new_potential_list, stripped_ied_percent, stripped_attack_percent, stripped_boss_percent, stripped_damage_percent);
        var new_ied_percent = withNewWSEStats.new_ied_percent;
        var new_attack_percent = withNewWSEStats.new_attack_percent;
        var new_boss_percent = withNewWSEStats.new_boss_percent;
        var new_damage_percent = withNewWSEStats.new_damage_percent;

        //New Dmg Output
        var newBossDefMultiplier = getBossDefMultiplier(new_ied_percent)
        var newHitDamage = getHitDamage(new_boss_percent, new_attack_percent, new_damage_percent)

        var newOutput = newBossDefMultiplier * newHitDamage;

        if (newOutput == highest_output) {
            //prefer to keep the setup whereby you already have an item in possession
            var NewNumberOfItemsPlayerHas = numberOfItemsPlayerPossesses(wse_combinations[i]);
            if (NewNumberOfItemsPlayerHas >= numberOfItemsPlayerHas) {
                //suggest the one with less attack lines
                var newOutput_att_lines = determineNumberofLines(wse_combinations[i], 'att');
                if (newOutput_att_lines <= number_of_att_lines && newOutput_att_lines > 3) {
                    //exclude any that is 3 line boss or 3 line IED
                    if (!(anyTripleLineStat(wse_combinations[i], 'boss') || anyTripleLineStat(wse_combinations[i], 'ied') || determineNumberofLines(wse_combinations[i], 'ied') > 3)) {
                        var new_number_of_3L_att_items = numberOfTripleLineAtt(wse_combinations[i]);
                        //prioritize less triple attk items
                        if (new_number_of_3L_att_items <= number_of_3L_att) {
                            var attResults = anyTripleLineAtt(wse_combinations[i]);
                            //prefer to have attk lines on emblem
                            if ((attResults.weapon || attResults.secondary) && !attResults.emblem) {
                                //skip
                            }
                            else {
                                //console.log('we made so ');
                                //console.log('contender: ' + wse_combinations[i]);
                                highest_output = newOutput;
                                best_combination = wse_combinations[i];
                                number_of_att_lines = newOutput_att_lines;
                                total_options++;
                                tied_combinations.push(best_combination);

                                triple_att_weapon = attResults.weapon;
                                triple_att_secondary = attResults.secondary;
                                triple_att_emblem = attResults.emblem;
                                number_of_3L_att = new_number_of_3L_att_items;

                                numberOfItemsPlayerHas = NewNumberOfItemsPlayerHas;
                            }
                        }
                    }

                }
            }
        }

        if (newOutput > highest_output) {
            var newOutput_att_lines = determineNumberofLines(wse_combinations[i], 'att');
            //exclude any that is 3 line boss or 3 line IED
            if (!(anyTripleLineStat(wse_combinations[i], 'boss') || anyTripleLineStat(wse_combinations[i], 'ied') || determineNumberofLines(wse_combinations[i], 'ied') > 3)) {
                highest_output = newOutput;
                best_combination = wse_combinations[i];
                number_of_att_lines = newOutput_att_lines;
                total_options = 1;

                var attResults = anyTripleLineAtt(wse_combinations[i]);
                triple_att_weapon = attResults.weapon;
                triple_att_secondary = attResults.secondary;
                triple_att_emblem = attResults.emblem;
                tied_combinations = [];
                tied_combinations.push(best_combination);
                number_of_3L_att = numberOfTripleLineAtt(wse_combinations[i]);
                //console.log(best_combination);
                //console.log('the above was added as it was the best')
                //console.log('total_options reset')

                //check how many items player possesses
                numberOfItemsPlayerHas = numberOfItemsPlayerPossesses(best_combination);
                //console.log(numberOfItemsPlayerHas)
            }
        }

        i++;
    }
    //console.log(best_combination);
    //console.log(total_options);
    //console.log(tied_combinations);
    //console.log(anyTripleLineStat(best_combination, 'boss'))
    return { 'optimal_lines': best_combination, 'highest_output': highest_output }

}

function anyTripleLineStat(combination, stat) {
    var i = 0;
    while (i < combination.length) {
        var current_item = combination[i];
        var number_of_lines = 0
        var j = 0;
        while (j < current_item.length) {
            var current_line = current_item[j];
            //check if current_line contains stat
            if (current_line.includes(stat)) {
                number_of_lines++
            }
            j++;
        }

        if (number_of_lines == 3) {
            return true
        }

        i++
    }
    return false
}

function anyTripleLineAtt(combination) {
    var i = 0;
    var weapon = false;
    var secondary = false;
    var emblem = false
    while (i < combination.length) {
        var current_item = combination[i];
        var number_of_lines = 0
        var j = 0;
        while (j < current_item.length) {
            var current_line = current_item[j];
            //check if current_line contains 'att'
            if (current_line.includes('att')) {
                number_of_lines++
            }
            j++;
        }

        if (number_of_lines == 3) {
            if (i == 0) {
                weapon = true;
            }
            if (i == 1) {
                secondary = true;
            }
            if (i == 2) {
                emblem = true;
            }
        }

        i++
    }
    return { 'weapon': weapon, "secondary": secondary, "emblem": emblem }
}

function numberOfTripleLineAtt(combination) {
    var i = 0;
    var total = 0
    while (i < combination.length) {
        var current_item = combination[i];
        var number_of_lines = 0
        var j = 0;
        while (j < current_item.length) {
            var current_line = current_item[j];
            //check if current_line contains 'att'
            if (current_line.includes('att')) {
                number_of_lines++
            }
            j++;
        }

        if (number_of_lines == 3) {
            total++;
        }
        i++
    }
    return total
}

function determineNumberofLines(combination, stat) {
    var number_of_lines = 0
    var i = 0;
    while (i < combination.length) {
        var current_item = combination[i];
        var j = 0;
        while (j < current_item.length) {
            var current_line = current_item[j];
            //check if current_line contains stat
            if (current_line.includes(stat)) {
                number_of_lines++
            }
            j++;
        }
        i++
    }
    return number_of_lines

}
function getClassData(maple_class) {
    var class_data = {
        'Adele': {
            'attPercent': 14,
            'iedPercent': [20, 20, 10, 10, 5, 5, 5],
            'dmgPercent': 20,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Angelic Buster': {
            'attPercent': 4,
            'iedPercent': [20, 10, 10, 10, 20],
            'dmgPercent': 50,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Aran': {
            'attPercent': 4,
            'iedPercent': [49.5], //weighed avg
            'dmgPercent': 52, //weighed avg
            'bossPercent': 0,
            'critDmg': 0
        },

        'Ark': {
            'attPercent': 4,
            'iedPercent': [20, 20, 20],
            'dmgPercent': 20,
            'bossPercent': 50,
            'critDmg': 0
        },

        'Battle Mage': {
            'attPercent': 39,
            'iedPercent': [20, 20],
            'dmgPercent': 0,
            'bossPercent': 30,
            'critDmg': 0
        },

        'Bishop': {
            'attPercent': 4,
            'iedPercent': [20],
            'dmgPercent': 60,
            'bossPercent': 10,
            'critDmg': 0
        },

        'Blaster': {
            'attPercent': 19,
            'iedPercent': [44], //Weighed AVG
            'dmgPercent': 10,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Blaze Wizard': {
            'attPercent': 14,
            'iedPercent': [20, 20],
            'dmgPercent': 0,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Beast Tamer': {
            'attPercent': 15,
            'iedPercent': [20],
            'dmgPercent': 20,
            'bossPercent': 20,
            'critDmg': 0
        },

        'Bowmaster': {
            'attPercent': 29,
            'iedPercent': [20],
            'dmgPercent': 30,
            'bossPercent': 10,
            'critDmg': 0
        },

        'Buccaneer': {
            'attPercent': 4,
            'iedPercent': [20, 25],
            'dmgPercent': 20,
            'bossPercent': 20,
            'critDmg': 0
        },

        'Cadena': {
            'attPercent': 4,
            'iedPercent': [30, 15], //rounded
            'dmgPercent': 7, //Weighed AVG
            'bossPercent': 7, //Weighed AVG
            'critDmg': 80 //average 8 stacks (cheap shot 2) 10% each
        },

        'Cannoneer': {
            'attPercent': 4,
            'iedPercent': [20, 20, 25],
            'dmgPercent': 60,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Corsair': {
            'attPercent': 24,
            'iedPercent': [20, 25],
            'dmgPercent': 30,
            'bossPercent': 20,
            'critDmg': 0
        },

        'Dark Knight': {
            'attPercent': 4,
            'iedPercent': [30, 20, 20],
            'dmgPercent': 20,
            'bossPercent': 10,
            'critDmg': 0
        },

        'Dawn Warrior': {
            'attPercent': 14,
            'iedPercent': [20, 20],
            'dmgPercent': 20,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Demon Avenger': {
            'attPercent': 4,
            'iedPercent': [30, 30],
            'dmgPercent': 40,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Demon Slayer': {
            'attPercent': 4,
            'iedPercent': [43], //weighed avg
            'dmgPercent': 52, //weighed avg
            'bossPercent': 52, //weighed avg
            'critDmg': 0
        },

        'Dual Blade': {
            'attPercent': 4,
            'iedPercent': [80], //weighed avg
            'dmgPercent': 20,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Evan': {
            'attPercent': 39,
            'iedPercent': [20],
            'dmgPercent': 40,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Fire Poison': {
            'attPercent': 4,
            'iedPercent': [10],
            'dmgPercent': 55,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Hayato': {
            'attPercent': 4,
            'iedPercent': [20],
            'dmgPercent': -50,
            'bossPercent': 2,
            'critDmg': 49.995
        },

        'Hero': {
            'attPercent': 4,
            'iedPercent': [20],
            'dmgPercent': 45,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Hoyoung': {
            'attPercent': 14,
            'iedPercent': [20, 25],
            'dmgPercent': 0,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Ice Lightning': {
            'attPercent': 4,
            'iedPercent': [20],
            'dmgPercent': 120,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Illium': {
            'attPercent': 14,
            'iedPercent': [4, 4, 4, 20],
            'dmgPercent': 20,
            'bossPercent': 20,
            'critDmg': 0
        },

        'Jett': {
            'attPercent': 29,
            'iedPercent': [20],
            'dmgPercent': 20,
            'bossPercent': 20,
            'critDmg': 0
        },

        'Kain': {
            'attPercent': 34,
            'iedPercent': [10, 30],
            'dmgPercent': 10,
            'bossPercent': 10,
            'critDmg': 40
        },

        'Kaiser': {
            'attPercent': 34,
            'iedPercent': [40, 20],
            'dmgPercent': 10, //+ 10 weighed avg final form
            'bossPercent': 26, //+8 weighed from final form
            'critDmg': 0
        },

        'Kanna': {
            'attPercent': 4,
            'iedPercent': [20],
            'dmgPercent': 0,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Kinesis': {
            'attPercent': 14,
            'iedPercent': [20],
            'dmgPercent': 0,
            'bossPercent': 30,
            'critDmg': 0
        },

        'Lara': {
            'attPercent': 4,
            'iedPercent': [40],
            'dmgPercent': 25, // 20% base + 5% from level 2 link
            'bossPercent': 10,
            'critDmg': 20
        },

        'Luminous': {
            'attPercent': 4,
            'iedPercent': [40, 20],
            'dmgPercent': 20,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Marksmen': {
            'attPercent': 4,
            'iedPercent': [20, 50, 20],
            'dmgPercent': 20,
            'bossPercent': 10,
            'critDmg': 0
        },

        'Mechanic': {
            'attPercent': 4,
            'iedPercent': [20, 10, 2], //weighed avg
            'dmgPercent': 3, //weighed avg
            'bossPercent': 0,
            'critDmg': 0
        },

        'Mercedes': {
            'attPercent': 34,
            'iedPercent': [50, 5], //weighed avg
            'dmgPercent': 60, //weighed avg
            'bossPercent': 0,
            'critDmg': 0
        },

        'Mihile': {
            'attPercent': 4,
            'iedPercent': [20],
            'dmgPercent': 50,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Night Lord': {
            'attPercent': 4,
            'iedPercent': [30, 20],
            'dmgPercent': 20,
            'bossPercent': 20,
            'critDmg': 0
        },

        'Night Walker': {
            'attPercent': 4,
            'iedPercent': [20, 7, 7, 7, 7, 7],
            'dmgPercent': 20,
            'bossPercent': 20,
            'critDmg': 0
        },

        'Paladin': {
            'attPercent': 4,
            'iedPercent': [44, 20],
            'dmgPercent': 20,
            'bossPercent': 0
        },

        'Pathfinder': {
            'attPercent': 24,
            'iedPercent': [20],
            'dmgPercent': 20,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Phantom': {
            'attPercent': 4,
            'iedPercent': [27], //weighed avg
            'dmgPercent': 4, //weighed avg
            'bossPercent': 0,
            'critDmg': 0
        },

        'Shade': {
            'attPercent': 4,
            'iedPercent': [20],
            'dmgPercent': 40,
            'bossPercent': 20,
            'critDmg': 0
        },

        'Shadower': {
            'attPercent': 4,
            'iedPercent': [20],
            'dmgPercent': 20,
            'bossPercent': 20,
            'critDmg': 0
        },

        'Thunder Breaker': {
            'attPercent': 4,
            'iedPercent': [5, 5, 5, 5, 5, 9, 9, 9, 9, 9, 20, 6],
            'dmgPercent': 55, //weighed avg
            'bossPercent': 0,
            'critDmg': 0
        },

        'Wild Hunter': {
            'attPercent': 39,
            'iedPercent': [10, 20],
            'dmgPercent': 20,
            'bossPercent': 30,
            'critDmg': 0
        },

        'Wind Archer': {
            'attPercent': 14,
            'iedPercent': [20, 20, 15, 10],
            'dmgPercent': 35,
            'bossPercent': 30,
            'critDmg': 0
        },

        'Xenon': {
            'attPercent': 4,
            'iedPercent': [30, 10, 20],
            'dmgPercent': 20,
            'bossPercent': 0,
            'critDmg': 0
        },

        'Zero': { //assuming in beta mode
            'attPercent': 4,
            'iedPercent': [20, 50, 15], //nodes, armor split, 15% average between forms
            'dmgPercent': -14, // 10 stacks, -24 to average between modes
            'bossPercent': -15, //average between modes
            'critDmg': 25 //average between modes
        }
        //alpha: 30IED, 50% crit dmg
        //beta: 30% boss, 48% dmg
    }
    return class_data[maple_class]
}
function updateSecondaryLines() {
    var current_class = document.getElementById('class').value;
    if (current_class != 'Kanna') {
        if (document.getElementById('slevel').value == 'lesser160') {

            $('#sline1').empty();
            $('#sline1').append("<option value='40boss'>40% Boss</option>");
            $('#sline1').append("<option value='35boss'>35% Boss</option>");
            $('#sline1').append("<option value='30boss'>30% Boss</option>");
            $('#sline1').append("<option value='40ied'>40% IED</option>");
            $('#sline1').append("<option value='35ied'>35% IED</option>");
            $('#sline1').append("<option value='12att'>12% ATT</option>");
            $('#sline1').append("<option value='12dmg'>12% Damage</option>");
            $('#sline1').append("<option value='none' selected>N/A</option>");

            $('#sline2').empty();
            $('#sline2').append("<option value='40boss'>40% Boss</option>");
            $('#sline2').append("<option value='35boss'>35% Boss</option>");
            $('#sline2').append("<option value='30boss'>30% Boss</option>");
            $('#sline2').append("<option value='20boss'>20% Boss</option>");
            $('#sline2').append("<option value='40ied'>40% IED</option>");
            $('#sline2').append("<option value='35ied'>35% IED</option>");
            $('#sline2').append("<option value='30ied'>30% IED</option>");
            $('#sline2').append("<option value='12att'>12% ATT</option>");
            $('#sline2').append("<option value='9att'>9% ATT</option>");
            $('#sline2').append("<option value='12dmg'>12% Damge</option>");
            $('#sline2').append("<option value='9dmg'>9% Damge</option>");
            $('#sline2').append("<option value='none' selected>N/A</option>");

            $('#sline3').empty();
            $('#sline3').append("<option value='40boss'>40% Boss</option>");
            $('#sline3').append("<option value='35boss'>35% Boss</option>");
            $('#sline3').append("<option value='30boss'>30% Boss</option>");
            $('#sline3').append("<option value='20boss'>20% Boss</option>");
            $('#sline3').append("<option value='40ied'>40% IED</option>");
            $('#sline3').append("<option value='35ied'>35% IED</option>");
            $('#sline3').append("<option value='30ied'>30% IED</option>");
            $('#sline3').append("<option value='12att'>12% ATT</option>");
            $('#sline3').append("<option value='9att'>9% ATT</option>");
            $('#sline3').append("<option value='12dmg'>12% Damage</option>");
            $('#sline3').append("<option value='9dmg'>9% Damage</option>");
            $('#sline3').append("<option value='none' selected>N/A</option>");

        }
        else {

            $('#sline1').empty();
            $('#sline1').append("<option value='40boss'>40% Boss</option>");
            $('#sline1').append("<option value='35boss'>35% Boss</option>");
            $('#sline1').append("<option value='30boss'>30% Boss</option>");
            $('#sline1').append("<option value='40ied'>40% IED</option>");
            $('#sline1').append("<option value='35ied'>35% IED</option>");
            $('#sline1').append("<option value='13att'>13% ATT</option>");
            $('#sline1').append("<option value='13dmg'>13% Damage</option>");
            $('#sline1').append("<option value='none' selected>N/A</option>");

            $('#sline2').empty();
            $('#sline2').append("<option value='40boss'>40% Boss</option>");
            $('#sline2').append("<option value='35boss'>35% Boss</option>");
            $('#sline2').append("<option value='30boss'>30% Boss</option>");
            $('#sline2').append("<option value='20boss'>20% Boss</option>");
            $('#sline2').append("<option value='40ied'>40% IED</option>");
            $('#sline2').append("<option value='35ied'>35% IED</option>");
            $('#sline2').append("<option value='30ied'>30% IED</option>");
            $('#sline2').append("<option value='13att'>13% ATT</option>");
            $('#sline2').append("<option value='10att'>10% ATT</option>");
            $('#sline2').append("<option value='13dmg'>13% Damage</option>");
            $('#sline2').append("<option value='10dmg'>10% Damage</option>");
            $('#sline2').append("<option value='none' selected>N/A</option>");

            $('#sline3').empty();
            $('#sline3').append("<option value='40boss'>40% Boss</option>");
            $('#sline3').append("<option value='35boss'>35% Boss</option>");
            $('#sline3').append("<option value='30boss'>30% Boss</option>");
            $('#sline3').append("<option value='20boss'>20% Boss</option>");
            $('#sline3').append("<option value='40ied'>40% IED</option>");
            $('#sline3').append("<option value='35ied'>35% IED</option>");
            $('#sline3').append("<option value='30ied'>30% IED</option>");
            $('#sline3').append("<option value='13att'>13% ATT</option>");
            $('#sline3').append("<option value='10att'>10% ATT</option>");
            $('#sline3').append("<option value='13dmg'>13% Damage</option>");
            $('#sline3').append("<option value='10dmg'>10% Damage</option>");
            $('#sline3').append("<option value='none' selected>N/A</option>");
        }
    }
    else {
        if (document.getElementById('slevel').value == 'lesser160') {

            $('#sline1').empty();
            $('#sline1').append("<option value='12att'>12% ATT</option>");
            $('#sline1').append("<option value='none' selected>N/A</option>");

            $('#sline2').empty();
            $('#sline2').append("<option value='12att'>12% ATT</option>");
            $('#sline2').append("<option value='9att'>9% ATT</option>");
            $('#sline2').append("<option value='none' selected>N/A</option>");

            $('#sline3').empty();
            $('#sline3').append("<option value='12att'>12% ATT</option>");
            $('#sline3').append("<option value='9att'>9% ATT</option>");
            $('#sline3').append("<option value='none' selected>N/A</option>");

        }
        else {

            $('#sline1').empty();
            $('#sline1').append("<option value='13att'>13% ATT</option>");
            $('#sline1').append("<option value='none' selected>N/A</option>");

            $('#sline2').empty();
            $('#sline2').append("<option value='13att'>13% ATT</option>");
            $('#sline2').append("<option value='10att'>10% ATT</option>");
            $('#sline2').append("<option value='none' selected>N/A</option>");

            $('#sline3').empty();
            $('#sline3').append("<option value='13att'>13% ATT</option>");
            $('#sline3').append("<option value='10att'>10% ATT</option>");
            $('#sline3').append("<option value='none' selected>N/A</option>");
        }
    }
}
function updateEmblemLines() {
    if (document.getElementById('elevel').value == 'lesser160') {

        $('#eline1').empty();
        $('#eline1').append("<option value='40ied'>40% IED</option>");
        $('#eline1').append("<option value='35ied'>35% IED</option>");
        $('#eline1').append("<option value='12att'>12% ATT</option>");
        $('#eline1').append("<option value='12dmg'>12% Damage</option>");
        $('#eline1').append("<option value='none' selected>N/A</option>");

        $('#eline2').empty();
        $('#eline2').append("<option value='40ied'>40% IED</option>");
        $('#eline2').append("<option value='35ied'>35% IED</option>");
        $('#eline2').append("<option value='30ied'>30% IED</option>");
        $('#eline2').append("<option value='12att'>12% ATT</option>");
        $('#eline2').append("<option value='9att'>9% ATT</option>");
        $('#eline2').append("<option value='12dmg'>12% Damage</option>");
        $('#eline2').append("<option value='9dmg'>9% Damage</option>");
        $('#eline2').append("<option value='none' selected>N/A</option>");

        $('#eline3').empty();
        $('#eline3').append("<option value='40ied'>40% IED</option>");
        $('#eline3').append("<option value='35ied'>35% IED</option>");
        $('#eline3').append("<option value='30ied'>30% IED</option>");
        $('#eline3').append("<option value='12att'>12% ATT</option>");
        $('#eline3').append("<option value='9att'>9% ATT</option>");
        $('#eline3').append("<option value='12dmg'>12% Damage</option>");
        $('#eline3').append("<option value='9dmg'>9% Damage</option>");
        $('#eline3').append("<option value='none' selected>N/A</option>");

    }
    else {

        $('#eline1').empty();
        $('#eline1').append("<option value='40ied'>40% IED</option>");
        $('#eline1').append("<option value='35ied'>35% IED</option>");
        $('#eline1').append("<option value='13att'>13% ATT</option>");
        $('#eline1').append("<option value='13dmg'>13% Damage</option>");
        $('#eline1').append("<option value='none' selected>N/A</option>");

        $('#eline2').empty();
        $('#eline2').append("<option value='40ied'>40% IED</option>");
        $('#eline2').append("<option value='35ied'>35% IED</option>");
        $('#eline2').append("<option value='30ied'>30% IED</option>");
        $('#eline2').append("<option value='13att'>13% ATT</option>");
        $('#eline2').append("<option value='10att'>10% ATT</option>");
        $('#eline2').append("<option value='13dmg'>13% Damage</option>");
        $('#eline2').append("<option value='10dmg'>10% Damage</option>");
        $('#eline2').append("<option value='none' selected>N/A</option>");

        $('#eline3').empty();
        $('#eline3').append("<option value='40ied'>40% IED</option>");
        $('#eline3').append("<option value='35ied'>35% IED</option>");
        $('#eline3').append("<option value='30ied'>30% IED</option>");
        $('#eline3').append("<option value='13att'>13% ATT</option>");
        $('#eline3').append("<option value='10att'>10% ATT</option>");
        $('#eline3').append("<option value='13dmg'>13% Damage</option>");
        $('#eline3').append("<option value='10dmg'>10% Damage</option>");
        $('#eline3').append("<option value='none' selected>N/A</option>");
    }
}
function updateWeaponLines() {
    if (document.getElementById('wlevel').value == 'lesser160') {

        $('#wline1').empty();
        $('#wline1').append("<option value='40boss'>40% Boss</option>");
        $('#wline1').append("<option value='35boss'>35% Boss</option>");
        $('#wline1').append("<option value='30boss'>30% Boss</option>");
        $('#wline1').append("<option value='40ied'>40% IED</option>");
        $('#wline1').append("<option value='35ied'>35% IED</option>");
        $('#wline1').append("<option value='12att'>12% ATT</option>");
        $('#wline1').append("<option value='12dmg'>12% Damage</option>");
        $('#wline1').append("<option value='none' selected>N/A</option>");

        $('#wline2').empty();
        $('#wline2').append("<option value='40boss'>40% Boss</option>");
        $('#wline2').append("<option value='35boss'>35% Boss</option>");
        $('#wline2').append("<option value='30boss'>30% Boss</option>");
        $('#wline2').append("<option value='20boss'>20% Boss</option>");
        $('#wline2').append("<option value='40ied'>40% IED</option>");
        $('#wline2').append("<option value='35ied'>35% IED</option>");
        $('#wline2').append("<option value='30ied'>30% IED</option>");
        $('#wline2').append("<option value='12att'>12% ATT</option>");
        $('#wline2').append("<option value='9att'>9% ATT</option>");
        $('#wline2').append("<option value='12dmg'>12% Damage</option>");
        $('#wline2').append("<option value='9dmg'>9% Damage</option>");
        $('#wline2').append("<option value='none' selected>N/A</option>");

        $('#wline3').empty();
        $('#wline3').append("<option value='40boss'>40% Boss</option>");
        $('#wline3').append("<option value='35boss'>35% Boss</option>");
        $('#wline3').append("<option value='30boss'>30% Boss</option>");
        $('#wline3').append("<option value='20boss'>20% Boss</option>");
        $('#wline3').append("<option value='40ied'>40% IED</option>");
        $('#wline3').append("<option value='35ied'>35% IED</option>");
        $('#wline3').append("<option value='30ied'>30% IED</option>");
        $('#wline3').append("<option value='12att'>12% ATT</option>");
        $('#wline3').append("<option value='9att'>9% ATT</option>");
        $('#wline3').append("<option value='12dmg'>12% Damage</option>");
        $('#wline3').append("<option value='9dmg'>9% Damage</option>");
        $('#wline3').append("<option value='none' selected>N/A</option>");

    }
    else {

        $('#wline1').empty();
        $('#wline1').append("<option value='40boss'>40% Boss</option>");
        $('#wline1').append("<option value='35boss'>35% Boss</option>");
        $('#wline1').append("<option value='30boss'>30% Boss</option>");
        $('#wline1').append("<option value='40ied'>40% IED</option>");
        $('#wline1').append("<option value='35ied'>35% IED</option>");
        $('#wline1').append("<option value='13att'>13% ATT</option>");
        $('#wline1').append("<option value='13dmg'>13% Damage</option>");
        $('#wline1').append("<option value='none' selected>N/A</option>");

        $('#wline2').empty();
        $('#wline2').append("<option value='40boss'>40% Boss</option>");
        $('#wline2').append("<option value='35boss'>35% Boss</option>");
        $('#wline2').append("<option value='30boss'>30% Boss</option>");
        $('#wline2').append("<option value='20boss'>20% Boss</option>");
        $('#wline2').append("<option value='40ied'>40% IED</option>");
        $('#wline2').append("<option value='35ied'>35% IED</option>");
        $('#wline2').append("<option value='30ied'>30% IED</option>");
        $('#wline2').append("<option value='13att'>13% ATT</option>");
        $('#wline2').append("<option value='10att'>10% ATT</option>");
        $('#wline2').append("<option value='13dmg'>13% Damage</option>");
        $('#wline2').append("<option value='10dmg'>10% Damage</option>");
        $('#wline2').append("<option value='none' selected>N/A</option>");

        $('#wline3').empty();
        $('#wline3').append("<option value='40boss'>40% Boss</option>");
        $('#wline3').append("<option value='35boss'>35% Boss</option>");
        $('#wline3').append("<option value='30boss'>30% Boss</option>");
        $('#wline3').append("<option value='20boss'>20% Boss</option>");
        $('#wline3').append("<option value='40ied'>40% IED</option>");
        $('#wline3').append("<option value='35ied'>35% IED</option>");
        $('#wline3').append("<option value='30ied'>30% IED</option>");
        $('#wline3').append("<option value='13att'>13% ATT</option>");
        $('#wline3').append("<option value='10att'>10% ATT</option>");
        $('#wline3').append("<option value='13dmg'>13% Damage</option>");
        $('#wline3').append("<option value='10dmg'>10% Damage</option>");
        $('#wline3').append("<option value='none' selected>N/A</option>");
    }
}
function update_new_wlevel_lesser() {
    $('#new_wline1').empty();
    $('#new_wline1').append("<option value='40boss'>40% Boss</option>");
    $('#new_wline1').append("<option value='35boss'>35% Boss</option>");
    $('#new_wline1').append("<option value='30boss'>30% Boss</option>");
    $('#new_wline1').append("<option value='40ied'>40% IED</option>");
    $('#new_wline1').append("<option value='35ied'>35% IED</option>");
    $('#new_wline1').append("<option value='12att'>12% ATT</option>");
    $('#new_wline1').append("<option value='12dmg'>12% Damage</option>");
    $('#new_wline1').append("<option value='none' selected>N/A</option>");

    $('#new_wline2').empty();
    $('#new_wline2').append("<option value='40boss'>40% Boss</option>");
    $('#new_wline2').append("<option value='35boss'>35% Boss</option>");
    $('#new_wline2').append("<option value='30boss'>30% Boss</option>");
    $('#new_wline2').append("<option value='20boss'>20% Boss</option>");
    $('#new_wline2').append("<option value='40ied'>40% IED</option>");
    $('#new_wline2').append("<option value='35ied'>35% IED</option>");
    $('#new_wline2').append("<option value='30ied'>30% IED</option>");
    $('#new_wline2').append("<option value='12att'>12% ATT</option>");
    $('#new_wline2').append("<option value='9att'>9% ATT</option>");
    $('#new_wline2').append("<option value='12dmg'>12% Damage</option>");
    $('#new_wline2').append("<option value='9dmg'>9% Damage</option>");
    $('#new_wline2').append("<option value='none' selected>N/A</option>");

    $('#new_wline3').empty();
    $('#new_wline3').append("<option value='40boss'>40% Boss</option>");
    $('#new_wline3').append("<option value='35boss'>35% Boss</option>");
    $('#new_wline3').append("<option value='30boss'>30% Boss</option>");
    $('#new_wline3').append("<option value='20boss'>20% Boss</option>");
    $('#new_wline3').append("<option value='40ied'>40% IED</option>");
    $('#new_wline3').append("<option value='35ied'>35% IED</option>");
    $('#new_wline3').append("<option value='30ied'>30% IED</option>");
    $('#new_wline3').append("<option value='12att'>12% ATT</option>");
    $('#new_wline3').append("<option value='9att'>9% ATT</option>");
    $('#new_wline3').append("<option value='12dmg'>12% Damage</option>");
    $('#new_wline3').append("<option value='9dmg'>9% Damage</option>");
    $('#new_wline3').append("<option value='none' selected>N/A</option>");

    document.getElementById('resultSection').hidden = true;
}
function update_new_wlevel_greater() {
    $('#new_wline1').empty();
    $('#new_wline1').append("<option value='40boss'>40% Boss</option>");
    $('#new_wline1').append("<option value='35boss'>35% Boss</option>");
    $('#new_wline1').append("<option value='30boss'>30% Boss</option>");
    $('#new_wline1').append("<option value='40ied'>40% IED</option>");
    $('#new_wline1').append("<option value='35ied'>35% IED</option>");
    $('#new_wline1').append("<option value='13att'>13% ATT</option>");
    $('#new_wline1').append("<option value='13dmg'>13% Damage</option>");
    $('#new_wline1').append("<option value='none' selected>N/A</option>");

    $('#new_wline2').empty();
    $('#new_wline2').append("<option value='40boss'>40% Boss</option>");
    $('#new_wline2').append("<option value='35boss'>35% Boss</option>");
    $('#new_wline2').append("<option value='30boss'>30% Boss</option>");
    $('#new_wline2').append("<option value='20boss'>20% Boss</option>");
    $('#new_wline2').append("<option value='40ied'>40% IED</option>");
    $('#new_wline2').append("<option value='35ied'>35% IED</option>");
    $('#new_wline2').append("<option value='30ied'>30% IED</option>");
    $('#new_wline2').append("<option value='13att'>13% ATT</option>");
    $('#new_wline2').append("<option value='10att'>10% ATT</option>");
    $('#new_wline2').append("<option value='13dmg'>13% Damage</option>");
    $('#new_wline2').append("<option value='10dmg'>10% Damage</option>");
    $('#new_wline2').append("<option value='none' selected>N/A</option>");

    $('#new_wline3').empty();
    $('#new_wline3').append("<option value='40boss'>40% Boss</option>");
    $('#new_wline3').append("<option value='35boss'>35% Boss</option>");
    $('#new_wline3').append("<option value='30boss'>30% Boss</option>");
    $('#new_wline3').append("<option value='20boss'>20% Boss</option>");
    $('#new_wline3').append("<option value='40ied'>40% IED</option>");
    $('#new_wline3').append("<option value='35ied'>35% IED</option>");
    $('#new_wline3').append("<option value='30ied'>30% IED</option>");
    $('#new_wline3').append("<option value='13att'>13% ATT</option>");
    $('#new_wline3').append("<option value='10att'>10% ATT</option>");
    $('#new_wline3').append("<option value='13dmg'>13% Damage</option>");
    $('#new_wline3').append("<option value='10dmg'>10% Damage</option>");
    $('#new_wline3').append("<option value='none' selected>N/A</option>");

    document.getElementById('resultSection').hidden = true;
}

function update_new_wlevel() {
    if (document.getElementById('new_wlevel').value == 'lesser160') {
        update_new_wlevel_lesser();
    }
    else {
        update_new_wlevel_greater();
    }
}

function update_new_slevel(current_class) {
    if (current_class != "Kanna") {
        if (document.getElementById('new_slevel').value == 'lesser160') {
            $('#new_sline1').empty();
            $('#new_sline1').append("<option value='40boss'>40% Boss</option>");
            $('#new_sline1').append("<option value='35boss'>35% Boss</option>");
            $('#new_sline1').append("<option value='30boss'>30% Boss</option>");
            $('#new_sline1').append("<option value='40ied'>40% IED</option>");
            $('#new_sline1').append("<option value='35ied'>35% IED</option>");
            $('#new_sline1').append("<option value='12att'>12% ATT</option>");
            $('#new_sline1').append("<option value='12dmg'>12% Damage</option>");
            $('#new_sline1').append("<option value='none' selected>N/A</option>");

            $('#new_sline2').empty();
            $('#new_sline2').append("<option value='40boss'>40% Boss</option>");
            $('#new_sline2').append("<option value='35boss'>35% Boss</option>");
            $('#new_sline2').append("<option value='30boss'>30% Boss</option>");
            $('#new_sline2').append("<option value='20boss'>20% Boss</option>");
            $('#new_sline2').append("<option value='40ied'>40% IED</option>");
            $('#new_sline2').append("<option value='35ied'>35% IED</option>");
            $('#new_sline2').append("<option value='30ied'>30% IED</option>");
            $('#new_sline2').append("<option value='12att'>12% ATT</option>");
            $('#new_sline2').append("<option value='9att'>9% ATT</option>");
            $('#new_sline2').append("<option value='12dmg'>12% Damge</option>");
            $('#new_sline2').append("<option value='9dmg'>9% Damge</option>");
            $('#new_sline2').append("<option value='none' selected>N/A</option>");

            $('#new_sline3').empty();
            $('#new_sline3').append("<option value='40boss'>40% Boss</option>");
            $('#new_sline3').append("<option value='35boss'>35% Boss</option>");
            $('#new_sline3').append("<option value='30boss'>30% Boss</option>");
            $('#new_sline3').append("<option value='20boss'>20% Boss</option>");
            $('#new_sline3').append("<option value='40ied'>40% IED</option>");
            $('#new_sline3').append("<option value='35ied'>35% IED</option>");
            $('#new_sline3').append("<option value='30ied'>30% IED</option>");
            $('#new_sline3').append("<option value='12att'>12% ATT</option>");
            $('#new_sline3').append("<option value='9att'>9% ATT</option>");
            $('#new_sline3').append("<option value='12dmg'>12% Damage</option>");
            $('#new_sline3').append("<option value='9dmg'>9% Damage</option>");
            $('#new_sline3').append("<option value='none' selected>N/A</option>");

        }
        else {
            $('#new_sline1').empty();
            $('#new_sline1').append("<option value='40boss'>40% Boss</option>");
            $('#new_sline1').append("<option value='35boss'>35% Boss</option>");
            $('#new_sline1').append("<option value='30boss'>30% Boss</option>");
            $('#new_sline1').append("<option value='40ied'>40% IED</option>");
            $('#new_sline1').append("<option value='35ied'>35% IED</option>");
            $('#new_sline1').append("<option value='13att'>13% ATT</option>");
            $('#new_sline1').append("<option value='13dmg'>13% Damage</option>");
            $('#new_sline1').append("<option value='none' selected>N/A</option>");

            $('#new_sline2').empty();
            $('#new_sline2').append("<option value='40boss'>40% Boss</option>");
            $('#new_sline2').append("<option value='35boss'>35% Boss</option>");
            $('#new_sline2').append("<option value='30boss'>30% Boss</option>");
            $('#new_sline2').append("<option value='20boss'>20% Boss</option>");
            $('#new_sline2').append("<option value='40ied'>40% IED</option>");
            $('#new_sline2').append("<option value='35ied'>35% IED</option>");
            $('#new_sline2').append("<option value='30ied'>30% IED</option>");
            $('#new_sline2').append("<option value='13att'>13% ATT</option>");
            $('#new_sline2').append("<option value='10att'>10% ATT</option>");
            $('#new_sline2').append("<option value='13dmg'>13% Damage</option>");
            $('#new_sline2').append("<option value='10dmg'>10% Damage</option>");
            $('#new_sline2').append("<option value='none' selected>N/A</option>");

            $('#new_sline3').empty();
            $('#new_sline3').append("<option value='40boss'>40% Boss</option>");
            $('#new_sline3').append("<option value='35boss'>35% Boss</option>");
            $('#new_sline3').append("<option value='30boss'>30% Boss</option>");
            $('#new_sline3').append("<option value='20boss'>20% Boss</option>");
            $('#new_sline3').append("<option value='40ied'>40% IED</option>");
            $('#new_sline3').append("<option value='35ied'>35% IED</option>");
            $('#new_sline3').append("<option value='30ied'>30% IED</option>");
            $('#new_sline3').append("<option value='13att'>13% ATT</option>");
            $('#new_sline3').append("<option value='10att'>10% ATT</option>");
            $('#new_sline3').append("<option value='13dmg'>13% Damage</option>");
            $('#new_sline3').append("<option value='10dmg'>10% Damage</option>");
            $('#new_sline3').append("<option value='none' selected>N/A</option>");
        }
    }
    else {
        if (document.getElementById('new_slevel').value == 'lesser160') {
            $('#new_sline1').empty();
            $('#new_sline1').append("<option value='12att'>12% ATT</option>");
            $('#new_sline1').append("<option value='none' selected>N/A</option>");

            $('#new_sline2').empty();
            $('#new_sline2').append("<option value='12att'>12% ATT</option>");
            $('#new_sline2').append("<option value='9att'>9% ATT</option>");
            $('#new_sline2').append("<option value='none' selected>N/A</option>");

            $('#new_sline3').empty();
            $('#new_sline3').append("<option value='12att'>12% ATT</option>");
            $('#new_sline3').append("<option value='9att'>9% ATT</option>");
            $('#new_sline3').append("<option value='none' selected>N/A</option>");

        }
        else {
            $('#new_sline1').empty();
            $('#new_sline1').append("<option value='13att'>13% ATT</option>");
            $('#new_sline1').append("<option value='none' selected>N/A</option>");

            $('#new_sline2').empty();
            $('#new_sline2').append("<option value='13att'>13% ATT</option>");
            $('#new_sline2').append("<option value='10att'>10% ATT</option>");
            $('#new_sline2').append("<option value='none' selected>N/A</option>");

            $('#new_sline3').empty();
            $('#new_sline3').append("<option value='13att'>13% ATT</option>");
            $('#new_sline3').append("<option value='10att'>10% ATT</option>");
            $('#new_sline3').append("<option value='none' selected>N/A</option>");
        }
    }
    document.getElementById('resultSection').hidden = true;
}

function update_new_elevel() {
    if (document.getElementById('new_elevel').value == 'lesser160') {

        $('#new_eline1').empty();
        $('#new_eline1').append("<option value='40ied'>40% IED</option>");
        $('#new_eline1').append("<option value='35ied'>35% IED</option>");
        $('#new_eline1').append("<option value='12att'>12% ATT</option>");
        $('#new_eline1').append("<option value='12dmg'>12% Damage</option>");
        $('#new_eline1').append("<option value='none' selected>N/A</option>");

        $('#new_eline2').empty();
        $('#new_eline2').append("<option value='40ied'>40% IED</option>");
        $('#new_eline2').append("<option value='35ied'>35% IED</option>");
        $('#new_eline2').append("<option value='30ied'>30% IED</option>");
        $('#new_eline2').append("<option value='12att'>12% ATT</option>");
        $('#new_eline2').append("<option value='9att'>9% ATT</option>");
        $('#new_eline2').append("<option value='12dmg'>12% Damage</option>");
        $('#new_eline2').append("<option value='9dmg'>9% Damage</option>");
        $('#new_eline2').append("<option value='none' selected>N/A</option>");

        $('#new_eline3').empty();
        $('#new_eline3').append("<option value='40ied'>40% IED</option>");
        $('#new_eline3').append("<option value='35ied'>35% IED</option>");
        $('#new_eline3').append("<option value='30ied'>30% IED</option>");
        $('#new_eline3').append("<option value='12att'>12% ATT</option>");
        $('#new_eline3').append("<option value='9att'>9% ATT</option>");
        $('#new_eline3').append("<option value='12dmg'>12% Damage</option>");
        $('#new_eline3').append("<option value='9dmg'>9% Damage</option>");
        $('#new_eline3').append("<option value='none' selected>N/A</option>");

    }
    else {
        $('#new_eline1').empty();
        $('#new_eline1').append("<option value='40ied'>40% IED</option>");
        $('#new_eline1').append("<option value='35ied'>35% IED</option>");
        $('#new_eline1').append("<option value='13att'>13% ATT</option>");
        $('#new_eline1').append("<option value='13dmg'>13% Damage</option>");
        $('#new_eline1').append("<option value='none' selected>N/A</option>");

        $('#new_eline2').empty();
        $('#new_eline2').append("<option value='40ied'>40% IED</option>");
        $('#new_eline2').append("<option value='35ied'>35% IED</option>");
        $('#new_eline2').append("<option value='30ied'>30% IED</option>");
        $('#new_eline2').append("<option value='13att'>13% ATT</option>");
        $('#new_eline2').append("<option value='10att'>10% ATT</option>");
        $('#new_eline2').append("<option value='13dmg'>13% Damage</option>");
        $('#new_eline2').append("<option value='10dmg'>10% Damage</option>");
        $('#new_eline2').append("<option value='none' selected>N/A</option>");

        $('#new_eline3').empty();
        $('#new_eline3').append("<option value='40ied'>40% IED</option>");
        $('#new_eline3').append("<option value='35ied'>35% IED</option>");
        $('#new_eline3').append("<option value='30ied'>30% IED</option>");
        $('#new_eline3').append("<option value='13att'>13% ATT</option>");
        $('#new_eline3').append("<option value='10att'>10% ATT</option>");
        $('#new_eline3').append("<option value='13dmg'>13% Damage</option>");
        $('#new_eline3').append("<option value='10dmg'>10% Damage</option>");
        $('#new_eline3').append("<option value='none' selected>N/A</option>");
    }
    document.getElementById('resultSection').hidden = true;
}


//When page loaded
document.addEventListener("DOMContentLoaded", function () {
    //hyper stat table code
    init();
    //ninit();

    setTimeout(function () {
        $("#toast").toast('show')
    }, 1000)

    //initialize 
    $(function () {
        $('[data-toggle="popover"]').popover({ html: true })
        // $('[data-toggle="tooltip"]').tooltip()
        $('#damage_percent').tooltip({ 'trigger': 'hover focus', 'title': 'Damage Bonus % from the Stat Window. Do not include Boss Damage %.', 'placement': 'bottom' });
        $('#upper_shown_damage').tooltip({ 'trigger': 'hover focus', 'title': 'Fully buffed with 100% uptime buffs including familiars, while standing still.', 'placement': 'bottom' });

        $('#main_stat_perc').tooltip({ 'trigger': 'hover focus', 'title': 'Stat % from potentials and flames (All Stat % counts towards this total).', 'placement': 'bottom' });
        $('#sec_perc').tooltip({ 'trigger': 'hover focus', 'title': 'Stat % from potentials and flames (All Stat % counts towards this total).', 'placement': 'bottom' });
        $('#sec_perc_2').tooltip({ 'trigger': 'hover focus', 'title': 'Stat % from potentials and flames (All Stat % counts towards this total).', 'placement': 'bottom' });

        $('#kanna_hp_perc').tooltip({ 'trigger': 'hover focus', 'title': 'HP % and MP % total from potentials only.', 'placement': 'bottom' });
        $('#sec_perc').tooltip({ 'trigger': 'hover focus', 'title': 'Stat % from potentials and flames (All Stat % counts towards this total).', 'placement': 'bottom' });
    });

    $('.popover-dismiss').popover({
        trigger: 'focus'
    });

    if (window.localStorage.getItem('data') !== null) {
        loadLocalStorage(); //load data from localstorage //here
    }

    //checkbox behaviour
    // document.getElementById("solus2").addEventListener("click", function () {
    //     if (document.getElementById('solus2').checked == true) {
    //         document.getElementById('solus3').checked = false;
    //     }
    // });

    // document.getElementById("solus3").addEventListener("click", function () {
    //     if (document.getElementById('solus3').checked == true) {
    //         document.getElementById('solus2').checked = false;
    //     }
    // });

    document.getElementById("reboot").addEventListener("click", function () {
        if (document.getElementById('reboot').checked == true) {
            document.getElementById('nonreboot').checked = false;
            document.getElementById('bonusAttPerc').value = 0;
            document.getElementById('bonusDiv').hidden = true;
            document.getElementById('bonusTitle').hidden = true;
        }
    });

    document.getElementById("nonreboot").addEventListener("click", function () {
        if (document.getElementById('nonreboot').checked == true) {
            document.getElementById('reboot').checked = false;
            document.getElementById('bonusDiv').hidden = false;
            document.getElementById('bonusTitle').hidden = false;
        }
    });

    document.getElementById("bt2").addEventListener("click", function () {
        if (document.getElementById('bt2').checked == true) {
            document.getElementById('bt3').checked = false
        }
    });

    document.getElementById("bt3").addEventListener("click", function () {
        if (document.getElementById('bt3').checked == true) {
            document.getElementById('bt2').checked = false
        }
    });

    document.getElementById("badge1").addEventListener("click", function () {
        if (document.getElementById('badge1').checked == true) {
            document.getElementById('badge3').checked = false;
            document.getElementById('badge2').checked = false;
        }
    });

    document.getElementById("badge2").addEventListener("click", function () {
        if (document.getElementById('badge2').checked == true) {
            document.getElementById('badge1').checked = false;
            document.getElementById('badge3').checked = false;
        }
    });

    document.getElementById("badge3").addEventListener("click", function () {
        if (document.getElementById('badge3').checked == true) {
            document.getElementById('badge1').checked = false;
            document.getElementById('badge2').checked = false;
        }
    });

    //event listeners

    document.getElementById("level").addEventListener("change", function () {
        calcHyperStatPoints();
        var new_level = document.getElementById("level").value;
        document.getElementById('current_level').innerHTML = `${new_level}`;

    });



    document.getElementById("calculateButton").addEventListener("click", function () {
        optimizeWSE();
    });
    document.getElementById("wlevel").addEventListener("change", function () {
        if (document.getElementById('wlevel').value == 'lesser160') {
            $('#wline1').empty();
            $('#wline1').append("<option value='40boss'>40% Boss</option>");
            $('#wline1').append("<option value='35boss'>35% Boss</option>");
            $('#wline1').append("<option value='30boss'>30% Boss</option>");
            $('#wline1').append("<option value='40ied'>40% IED</option>");
            $('#wline1').append("<option value='35ied'>35% IED</option>");
            $('#wline1').append("<option value='12att'>12% ATT</option>");
            $('#wline1').append("<option value='12dmg'>12% Damage</option>");
            $('#wline1').append("<option value='none' selected>N/A</option>");

            $('#wline2').empty();
            $('#wline2').append("<option value='40boss'>40% Boss</option>");
            $('#wline2').append("<option value='35boss'>35% Boss</option>");
            $('#wline2').append("<option value='30boss'>30% Boss</option>");
            $('#wline2').append("<option value='20boss'>20% Boss</option>");
            $('#wline2').append("<option value='40ied'>40% IED</option>");
            $('#wline2').append("<option value='35ied'>35% IED</option>");
            $('#wline2').append("<option value='30ied'>30% IED</option>");
            $('#wline2').append("<option value='12att'>12% ATT</option>");
            $('#wline2').append("<option value='9att'>9% ATT</option>");
            $('#wline2').append("<option value='12dmg'>12% Damage</option>");
            $('#wline2').append("<option value='9dmg'>9% Damage</option>");
            $('#wline2').append("<option value='none' selected>N/A</option>");

            $('#wline3').empty();
            $('#wline3').append("<option value='40boss'>40% Boss</option>");
            $('#wline3').append("<option value='35boss'>35% Boss</option>");
            $('#wline3').append("<option value='30boss'>30% Boss</option>");
            $('#wline3').append("<option value='20boss'>20% Boss</option>");
            $('#wline3').append("<option value='40ied'>40% IED</option>");
            $('#wline3').append("<option value='35ied'>35% IED</option>");
            $('#wline3').append("<option value='30ied'>30% IED</option>");
            $('#wline3').append("<option value='12att'>12% ATT</option>");
            $('#wline3').append("<option value='9att'>9% ATT</option>");
            $('#wline3').append("<option value='12dmg'>12% Damage</option>");
            $('#wline3').append("<option value='9dmg'>9% Damage</option>");
            $('#wline3').append("<option value='none' selected>N/A</option>");

        }
        else {
            $('#wline1').empty();
            $('#wline1').append("<option value='40boss'>40% Boss</option>");
            $('#wline1').append("<option value='35boss'>35% Boss</option>");
            $('#wline1').append("<option value='30boss'>30% Boss</option>");
            $('#wline1').append("<option value='40ied'>40% IED</option>");
            $('#wline1').append("<option value='35ied'>35% IED</option>");
            $('#wline1').append("<option value='13att'>13% ATT</option>");
            $('#wline1').append("<option value='13dmg'>13% Damage</option>");
            $('#wline1').append("<option value='none' selected>N/A</option>");

            $('#wline2').empty();
            $('#wline2').append("<option value='40boss'>40% Boss</option>");
            $('#wline2').append("<option value='35boss'>35% Boss</option>");
            $('#wline2').append("<option value='30boss'>30% Boss</option>");
            $('#wline2').append("<option value='20boss'>20% Boss</option>");
            $('#wline2').append("<option value='40ied'>40% IED</option>");
            $('#wline2').append("<option value='35ied'>35% IED</option>");
            $('#wline2').append("<option value='30ied'>30% IED</option>");
            $('#wline2').append("<option value='13att'>13% ATT</option>");
            $('#wline2').append("<option value='10att'>10% ATT</option>");
            $('#wline2').append("<option value='13dmg'>13% Damage</option>");
            $('#wline2').append("<option value='10dmg'>10% Damage</option>");
            $('#wline2').append("<option value='none' selected>N/A</option>");

            $('#wline3').empty();
            $('#wline3').append("<option value='40boss'>40% Boss</option>");
            $('#wline3').append("<option value='35boss'>35% Boss</option>");
            $('#wline3').append("<option value='30boss'>30% Boss</option>");
            $('#wline3').append("<option value='20boss'>20% Boss</option>");
            $('#wline3').append("<option value='40ied'>40% IED</option>");
            $('#wline3').append("<option value='35ied'>35% IED</option>");
            $('#wline3').append("<option value='30ied'>30% IED</option>");
            $('#wline3').append("<option value='13att'>13% ATT</option>");
            $('#wline3').append("<option value='10att'>10% ATT</option>");
            $('#wline3').append("<option value='13dmg'>13% Damage</option>");
            $('#wline3').append("<option value='10dmg'>10% Damage</option>");
            $('#wline3').append("<option value='none' selected>N/A</option>");
        }
    });
    document.getElementById("slevel").addEventListener("change", function () {
        var current_class = document.getElementById('class').value;
        if (current_class != 'Kanna') {
            if (document.getElementById('slevel').value == 'lesser160') {

                $('#sline1').empty();
                $('#sline1').append("<option value='40boss'>40% Boss</option>");
                $('#sline1').append("<option value='35boss'>35% Boss</option>");
                $('#sline1').append("<option value='30boss'>30% Boss</option>");
                $('#sline1').append("<option value='40ied'>40% IED</option>");
                $('#sline1').append("<option value='35ied'>35% IED</option>");
                $('#sline1').append("<option value='12att'>12% ATT</option>");
                $('#sline1').append("<option value='12dmg'>12% Damage</option>");
                $('#sline1').append("<option value='none' selected>N/A</option>");

                $('#sline2').empty();
                $('#sline2').append("<option value='40boss'>40% Boss</option>");
                $('#sline2').append("<option value='35boss'>35% Boss</option>");
                $('#sline2').append("<option value='30boss'>30% Boss</option>");
                $('#sline2').append("<option value='20boss'>20% Boss</option>");
                $('#sline2').append("<option value='40ied'>40% IED</option>");
                $('#sline2').append("<option value='35ied'>35% IED</option>");
                $('#sline2').append("<option value='30ied'>30% IED</option>");
                $('#sline2').append("<option value='12att'>12% ATT</option>");
                $('#sline2').append("<option value='9att'>9% ATT</option>");
                $('#sline2').append("<option value='12dmg'>12% Damge</option>");
                $('#sline2').append("<option value='9dmg'>9% Damge</option>");
                $('#sline2').append("<option value='none' selected>N/A</option>");

                $('#sline3').empty();
                $('#sline3').append("<option value='40boss'>40% Boss</option>");
                $('#sline3').append("<option value='35boss'>35% Boss</option>");
                $('#sline3').append("<option value='30boss'>30% Boss</option>");
                $('#sline3').append("<option value='20boss'>20% Boss</option>");
                $('#sline3').append("<option value='40ied'>40% IED</option>");
                $('#sline3').append("<option value='35ied'>35% IED</option>");
                $('#sline3').append("<option value='30ied'>30% IED</option>");
                $('#sline3').append("<option value='12att'>12% ATT</option>");
                $('#sline3').append("<option value='9att'>9% ATT</option>");
                $('#sline3').append("<option value='12dmg'>12% Damage</option>");
                $('#sline3').append("<option value='9dmg'>9% Damage</option>");
                $('#sline3').append("<option value='none' selected>N/A</option>");

            }
            else {

                $('#sline1').empty();
                $('#sline1').append("<option value='40boss'>40% Boss</option>");
                $('#sline1').append("<option value='35boss'>35% Boss</option>");
                $('#sline1').append("<option value='30boss'>30% Boss</option>");
                $('#sline1').append("<option value='40ied'>40% IED</option>");
                $('#sline1').append("<option value='35ied'>35% IED</option>");
                $('#sline1').append("<option value='13att'>13% ATT</option>");
                $('#sline1').append("<option value='13dmg'>13% Damage</option>");
                $('#sline1').append("<option value='none' selected>N/A</option>");

                $('#sline2').empty();
                $('#sline2').append("<option value='40boss'>40% Boss</option>");
                $('#sline2').append("<option value='35boss'>35% Boss</option>");
                $('#sline2').append("<option value='30boss'>30% Boss</option>");
                $('#sline2').append("<option value='20boss'>20% Boss</option>");
                $('#sline2').append("<option value='40ied'>40% IED</option>");
                $('#sline2').append("<option value='35ied'>35% IED</option>");
                $('#sline2').append("<option value='30ied'>30% IED</option>");
                $('#sline2').append("<option value='13att'>13% ATT</option>");
                $('#sline2').append("<option value='10att'>10% ATT</option>");
                $('#sline2').append("<option value='13dmg'>13% Damage</option>");
                $('#sline2').append("<option value='10dmg'>10% Damage</option>");
                $('#sline2').append("<option value='none' selected>N/A</option>");

                $('#sline3').empty();
                $('#sline3').append("<option value='40boss'>40% Boss</option>");
                $('#sline3').append("<option value='35boss'>35% Boss</option>");
                $('#sline3').append("<option value='30boss'>30% Boss</option>");
                $('#sline3').append("<option value='20boss'>20% Boss</option>");
                $('#sline3').append("<option value='40ied'>40% IED</option>");
                $('#sline3').append("<option value='35ied'>35% IED</option>");
                $('#sline3').append("<option value='30ied'>30% IED</option>");
                $('#sline3').append("<option value='13att'>13% ATT</option>");
                $('#sline3').append("<option value='10att'>10% ATT</option>");
                $('#sline3').append("<option value='13dmg'>13% Damage</option>");
                $('#sline3').append("<option value='10dmg'>10% Damage</option>");
                $('#sline3').append("<option value='none' selected>N/A</option>");
            }
        }
        else {
            if (document.getElementById('slevel').value == 'lesser160') {

                $('#sline1').empty();
                $('#sline1').append("<option value='12att'>12% ATT</option>");
                $('#sline1').append("<option value='none' selected>N/A</option>");

                $('#sline2').empty();
                $('#sline2').append("<option value='12att'>12% ATT</option>");
                $('#sline2').append("<option value='9att'>9% ATT</option>");
                $('#sline2').append("<option value='none' selected>N/A</option>");

                $('#sline3').empty();
                $('#sline3').append("<option value='12att'>12% ATT</option>");
                $('#sline3').append("<option value='9att'>9% ATT</option>");
                $('#sline3').append("<option value='none' selected>N/A</option>");

            }
            else {

                $('#sline1').empty();
                $('#sline1').append("<option value='13att'>13% ATT</option>");
                $('#sline1').append("<option value='none' selected>N/A</option>");

                $('#sline2').empty();
                $('#sline2').append("<option value='13att'>13% ATT</option>");
                $('#sline2').append("<option value='10att'>10% ATT</option>");
                $('#sline2').append("<option value='none' selected>N/A</option>");

                $('#sline3').empty();
                $('#sline3').append("<option value='13att'>13% ATT</option>");
                $('#sline3').append("<option value='10att'>10% ATT</option>");
                $('#sline3').append("<option value='none' selected>N/A</option>");
            }
        }
    });
    document.getElementById("elevel").addEventListener("change", function () {
        if (document.getElementById('elevel').value == 'lesser160') {

            $('#eline1').empty();
            $('#eline1').append("<option value='40ied'>40% IED</option>");
            $('#eline1').append("<option value='35ied'>35% IED</option>");
            $('#eline1').append("<option value='12att'>12% ATT</option>");
            $('#eline1').append("<option value='12dmg'>12% Damage</option>");
            $('#eline1').append("<option value='none' selected>N/A</option>");

            $('#eline2').empty();
            $('#eline2').append("<option value='40ied'>40% IED</option>");
            $('#eline2').append("<option value='35ied'>35% IED</option>");
            $('#eline2').append("<option value='30ied'>30% IED</option>");
            $('#eline2').append("<option value='12att'>12% ATT</option>");
            $('#eline2').append("<option value='9att'>9% ATT</option>");
            $('#eline2').append("<option value='12dmg'>12% Damage</option>");
            $('#eline2').append("<option value='9dmg'>9% Damage</option>");
            $('#eline2').append("<option value='none' selected>N/A</option>");

            $('#eline3').empty();
            $('#eline3').append("<option value='40ied'>40% IED</option>");
            $('#eline3').append("<option value='35ied'>35% IED</option>");
            $('#eline3').append("<option value='30ied'>30% IED</option>");
            $('#eline3').append("<option value='12att'>12% ATT</option>");
            $('#eline3').append("<option value='9att'>9% ATT</option>");
            $('#eline3').append("<option value='12dmg'>12% Damage</option>");
            $('#eline3').append("<option value='9dmg'>9% Damage</option>");
            $('#eline3').append("<option value='none' selected>N/A</option>");

        }
        else {

            $('#eline1').empty();
            $('#eline1').append("<option value='40ied'>40% IED</option>");
            $('#eline1').append("<option value='35ied'>35% IED</option>");
            $('#eline1').append("<option value='13att'>13% ATT</option>");
            $('#eline1').append("<option value='13dmg'>13% Damage</option>");
            $('#eline1').append("<option value='none' selected>N/A</option>");

            $('#eline2').empty();
            $('#eline2').append("<option value='40ied'>40% IED</option>");
            $('#eline2').append("<option value='35ied'>35% IED</option>");
            $('#eline2').append("<option value='30ied'>30% IED</option>");
            $('#eline2').append("<option value='13att'>13% ATT</option>");
            $('#eline2').append("<option value='10att'>10% ATT</option>");
            $('#eline2').append("<option value='13dmg'>13% Damage</option>");
            $('#eline2').append("<option value='10dmg'>10% Damage</option>");
            $('#eline2').append("<option value='none' selected>N/A</option>");

            $('#eline3').empty();
            $('#eline3').append("<option value='40ied'>40% IED</option>");
            $('#eline3').append("<option value='35ied'>35% IED</option>");
            $('#eline3').append("<option value='30ied'>30% IED</option>");
            $('#eline3').append("<option value='13att'>13% ATT</option>");
            $('#eline3').append("<option value='10att'>10% ATT</option>");
            $('#eline3').append("<option value='13dmg'>13% Damage</option>");
            $('#eline3').append("<option value='10dmg'>10% Damage</option>");
            $('#eline3').append("<option value='none' selected>N/A</option>");
        }
    });
    document.getElementById("class").addEventListener("change", function () {
        document.getElementById('resultSection').hidden = true;
        var maple_class = document.getElementById('class').value;


        if (maple_class == "Zero") {
            document.getElementById('zeromessage').hidden = false;
        } //work here
        else {
            document.getElementById('zeromessage').hidden = true;
        }

        if (maple_class == "Kanna") {
            document.getElementById('kanna_hp_div').hidden = false;
            document.getElementById('kanna_hp_perc_div').hidden = false;
            document.getElementById('DHB_div').hidden = false;
        }
        else {

            document.getElementById('DHB_div').hidden = true;
            document.getElementById('kanna_hp_div').hidden = true;
            document.getElementById('kanna_hp_perc_div').hidden = true;
        }

        if (maple_class == "Dual Blade" || maple_class == "Cadena" || maple_class == "Shadower" || maple_class == "Xenon") {
            document.getElementById("sec_2_div").hidden = false;
            document.getElementById("sec_perc_2_div").hidden = false;

        }
        else {
            document.getElementById("sec_2_div").hidden = true;
            document.getElementById("sec_perc_2_div").hidden = true;
        }

        var stat_types = getPrimaryAndSecondaryStatType(maple_class);
        var primary_stat = stat_types.primaryStatType;
        var secondary_stat = stat_types.secondaryStatType;

        if (maple_class == "Xenon") primary_stat = "DEX"
        document.getElementById('primary_label').innerHTML = `<label for="primary_stat"> ${primary_stat} </label>`;
        document.getElementById('main_stat_perc_label').innerHTML = `<label for="main_stat_perc"> ${primary_stat} % on Equips</label>`;

        if (maple_class == "Dual Blade" || maple_class == "Cadena" || maple_class == "Shadower") {
            secondary_stat = "DEX"
            secondary_stat_2 = "STR"

            document.getElementById('secondary_label').innerHTML = `<label for="secondary_stat"> ${secondary_stat} </label>`;
            document.getElementById('sec_perc_label').innerHTML = `<label for="secondary_stat_perc"> ${secondary_stat} % on Equips</label>`;

            document.getElementById('secondary_2_label').innerHTML = `<label for="secondary_2_stat"> ${secondary_stat_2} </label>`;
            document.getElementById('sec_perc_2_label').innerHTML = `<label for="secondary_2_stat_perc"> ${secondary_stat_2} % on Equips</label>`;
        }
        else {
            document.getElementById('secondary_label').innerHTML = `<label for="secondary_stat"> ${secondary_stat} </label>`;
            document.getElementById('sec_perc_label').innerHTML = `<label for="secondary_stat_perc"> ${secondary_stat} % on Equips</label>`;
        }
        document.getElementById('hp_arcane_label').innerHTML = `<label for="hp_arcane"> ${primary_stat} (From Arcane Symbols)</label>`;
        if (maple_class == "Xenon") document.getElementById("hp_arcane").value = 5148
        else if (maple_class == "Demon Avenger") document.getElementById("hp_arcane").value = 184000 //here fix this to proper amount
        else document.getElementById("hp_arcane").value = 13200

        if (maple_class == "Xenon") {
            var primary_2 = "LUK"
            var primary_3 = "STR"

            document.getElementById('secondary_label').innerHTML = `<label for="secondary_stat"> ${primary_2} </label>`;
            document.getElementById('sec_perc_label').innerHTML = `<label for="secondary_stat_perc"> ${primary_2} % on Equips</label>`;

            document.getElementById('secondary_2_label').innerHTML = `<label for="secondary_2_stat"> ${primary_3} </label>`;
            document.getElementById('sec_perc_2_label').innerHTML = `<label for="secondary_2_stat_perc"> ${primary_3} % on Equips</label>`;
        }
        else {
            document.getElementById('secondary_stat').disabled = false;
        }

        var current_class = document.getElementById('class').value;
        document.getElementById('wline1').value = 'none';
        document.getElementById('wline2').value = 'none';
        document.getElementById('wline3').value = 'none';

        document.getElementById('eline1').value = 'none';
        document.getElementById('eline2').value = 'none';
        document.getElementById('eline3').value = 'none';

        if (current_class == 'Kanna') {
            if (document.getElementById('slevel').value == 'lesser160') {
                $('#sline1').empty();
                $('#sline1').append("<option value='12att'>12% ATT</option>");
                $('#sline1').append("<option value='none' selected>N/A</option>");

                $('#sline2').empty();
                $('#sline2').append("<option value='12att'>12% ATT</option>");
                $('#sline2').append("<option value='9att'>9% ATT</option>");
                $('#sline2').append("<option value='none' selected>N/A</option>");

                $('#sline3').empty();
                $('#sline3').append("<option value='12att'>12% ATT</option>");
                $('#sline3').append("<option value='9att'>9% ATT</option>");
                $('#sline3').append("<option value='none' selected>N/A</option>");

            }
            if (document.getElementById('slevel').value == 'greater160') {
                $('#sline1').empty();
                $('#sline1').append("<option value='13att'>13% ATT</option>");
                $('#sline1').append("<option value='none' selected>N/A</option>");

                $('#sline2').empty();
                $('#sline2').append("<option value='13att'>13% ATT</option>");
                $('#sline2').append("<option value='10att'>10% ATT</option>");
                $('#sline2').append("<option value='none' selected>N/A</option>");

                $('#sline3').empty();
                $('#sline3').append("<option value='13att'>13% ATT</option>");
                $('#sline3').append("<option value='10att'>10% ATT</option>");
                $('#sline3').append("<option value='none' selected>N/A</option>");
            }
        }
        else {
            if (document.getElementById('slevel').value == 'lesser160') {
                $('#sline1').empty();
                $('#sline1').append("<option value='40boss'>40% Boss</option>");
                $('#sline1').append("<option value='35boss'>35% Boss</option>");
                $('#sline1').append("<option value='30boss'>30% Boss</option>");
                $('#sline1').append("<option value='40ied'>40% IED</option>");
                $('#sline1').append("<option value='35ied'>35% IED</option>");
                $('#sline1').append("<option value='12att'>12% ATT</option>");
                $('#sline1').append("<option value='12dmg'>12% Damage</option>");
                $('#sline1').append("<option value='none' selected>N/A</option>");

                $('#sline2').empty();
                $('#sline2').append("<option value='40boss'>40% Boss</option>");
                $('#sline2').append("<option value='35boss'>35% Boss</option>");
                $('#sline2').append("<option value='30boss'>30% Boss</option>");
                $('#sline2').append("<option value='20boss'>20% Boss</option>");
                $('#sline2').append("<option value='40ied'>40% IED</option>");
                $('#sline2').append("<option value='35ied'>35% IED</option>");
                $('#sline2').append("<option value='30ied'>30% IED</option>");
                $('#sline2').append("<option value='12att'>12% ATT</option>");
                $('#sline2').append("<option value='9att'>9% ATT</option>");
                $('#sline2').append("<option value='12dmg'>12% Damge</option>");
                $('#sline2').append("<option value='9dmg'>9% Damge</option>");
                $('#sline2').append("<option value='none' selected>N/A</option>");

                $('#sline3').empty();
                $('#sline3').append("<option value='40boss'>40% Boss</option>");
                $('#sline3').append("<option value='35boss'>35% Boss</option>");
                $('#sline3').append("<option value='30boss'>30% Boss</option>");
                $('#sline3').append("<option value='20boss'>20% Boss</option>");
                $('#sline3').append("<option value='40ied'>40% IED</option>");
                $('#sline3').append("<option value='35ied'>35% IED</option>");
                $('#sline3').append("<option value='30ied'>30% IED</option>");
                $('#sline3').append("<option value='12att'>12% ATT</option>");
                $('#sline3').append("<option value='9att'>9% ATT</option>");
                $('#sline3').append("<option value='12dmg'>12% Damage</option>");
                $('#sline3').append("<option value='9dmg'>9% Damage</option>");
                $('#sline3').append("<option value='none' selected>N/A</option>");

            }
            if (document.getElementById('slevel').value == 'greater160') {
                $('#sline1').empty();
                $('#sline1').append("<option value='40boss'>40% Boss</option>");
                $('#sline1').append("<option value='35boss'>35% Boss</option>");
                $('#sline1').append("<option value='30boss'>30% Boss</option>");
                $('#sline1').append("<option value='40ied'>40% IED</option>");
                $('#sline1').append("<option value='35ied'>35% IED</option>");
                $('#sline1').append("<option value='13att'>13% ATT</option>");
                $('#sline1').append("<option value='13dmg'>13% Damage</option>");
                $('#sline1').append("<option value='none' selected>N/A</option>");

                $('#sline2').empty();
                $('#sline2').append("<option value='40boss'>40% Boss</option>");
                $('#sline2').append("<option value='35boss'>35% Boss</option>");
                $('#sline2').append("<option value='30boss'>30% Boss</option>");
                $('#sline2').append("<option value='20boss'>20% Boss</option>");
                $('#sline2').append("<option value='40ied'>40% IED</option>");
                $('#sline2').append("<option value='35ied'>35% IED</option>");
                $('#sline2').append("<option value='30ied'>30% IED</option>");
                $('#sline2').append("<option value='13att'>13% ATT</option>");
                $('#sline2').append("<option value='10att'>10% ATT</option>");
                $('#sline2').append("<option value='13dmg'>13% Damage</option>");
                $('#sline2').append("<option value='10dmg'>10% Damage</option>");
                $('#sline2').append("<option value='none' selected>N/A</option>");

                $('#sline3').empty();
                $('#sline3').append("<option value='40boss'>40% Boss</option>");
                $('#sline3').append("<option value='35boss'>35% Boss</option>");
                $('#sline3').append("<option value='30boss'>30% Boss</option>");
                $('#sline3').append("<option value='20boss'>20% Boss</option>");
                $('#sline3').append("<option value='40ied'>40% IED</option>");
                $('#sline3').append("<option value='35ied'>35% IED</option>");
                $('#sline3').append("<option value='30ied'>30% IED</option>");
                $('#sline3').append("<option value='13att'>13% ATT</option>");
                $('#sline3').append("<option value='10att'>10% ATT</option>");
                $('#sline3').append("<option value='13dmg'>13% Damage</option>");
                $('#sline3').append("<option value='10dmg'>10% Damage</option>");
                $('#sline3').append("<option value='none' selected>N/A</option>");
            }
        }
    });
});

//Main Function
function optimizeWSE() {
    // Stats from Stat Window
    var maple_class = document.getElementById('class').value;
    var weapon_type = document.getElementById('weapon_type').value;
    var multiplier = getMultiplier(weapon_type, maple_class);
    // var boss_percent = parseInt(document.getElementById('boss_percent').value);
    var final_damage_percent = parseInt(document.getElementById('final_damage_percent').value);

    var damage_percent = parseInt(document.getElementById('damage_percent').value);
    var primary_stat = parseInt(document.getElementById('primary_stat').value);
    var secondary_stat = parseInt(document.getElementById('secondary_stat').value);
    var attack_percent = 100;
    var level = parseInt(document.getElementById('level').value);
    var upperShownDamage = parseInt(document.getElementById('upper_shown_damage').value);

    //Link Skill Stats
    // if (document.getElementById('solus2').checked == true) {
    //     damage_percent = damage_percent + 11;
    // }

    // if (document.getElementById('solus3').checked == true) {
    //     damage_percent = damage_percent + 16;
    // }

    // if (document.getElementById('unfairAdvantage').checked == true) {
    //     damage_percent = damage_percent + 12;
    // }

    // if (document.getElementById('empiricalKnowledge').checked == true) {

    //     damage_percent = damage_percent + 9;
    // }

    // if (document.getElementById('thiefCunning').checked == true) {
    //     damage_percent = damage_percent + 18;
    // }

    // if (document.getElementById('tideOfBattle').checked == true) {
    //     damage_percent = damage_percent + 12;
    // }

    if (document.getElementById('magSoul').checked == true) {
        attack_percent = attack_percent + 3;
    }

    if (document.getElementById('badge1').checked == true) {
        attack_percent = attack_percent + 1;
    }

    if (document.getElementById('badge2').checked == true) {
        attack_percent = attack_percent + 2;
    }

    if (document.getElementById('badge3').checked == true) {
        attack_percent = attack_percent + 3;
    }

    attack_percent = attack_percent + parseInt(document.getElementById('familiarAttPerc').value)

    if (document.getElementById('bonusAttPerc')) attack_percent = attack_percent + parseInt(document.getElementById('bonusAttPerc').value);

    // class_data
    var class_data = getClassData(maple_class)

    var class_dmg = class_data.dmgPercent;
    var class_att = class_data.attPercent;

    //Current Stats With WSE
    current_damage_percent = damage_percent + class_dmg;
    //current_boss_percent = boss_percent + class_boss;

    //get ATT %
    current_attack_percent = attack_percent + class_att;
    var added_attack_percent_from_WSE = getWSEATTPercent();
    current_attack_percent = current_attack_percent + added_attack_percent_from_WSE;

    //determine Attack Amount
    var stat_value = getStatValue(maple_class, primary_stat, secondary_stat, level);
    var attack = Math.floor(determineAttAmount(upperShownDamage, multiplier, stat_value, parseInt(document.getElementById('damage_percent').value), final_damage_percent) / (current_attack_percent / 100));

    /*if (maple_class == "Kanna"){
        var total_hp = document.getElementById('kanna_hp').value;
        attack = attack + total_hp/700;
    } */


    //console.log('oldOutput ' + currentOutput)    

    //console.log('ied with Current WSE = ' + current_ied_percent);
    //console.log('attk % with current WSE = ' + current_attack_percent);
    //console.log('boss def multiplier with current WSE = ' + currentBossDefMultiplier);

    //Hyper stats
    var hyper_dmg = parseInt(document.getElementById('damage').value);
    var hyper_att = parseInt(document.getElementById('attPower').value);

    var stat_types = getPrimaryAndSecondaryStatType(maple_class);
    var primary_stat_type = stat_types.primaryStatType;
    var secondary_stat_type = stat_types.secondaryStatType;

    if (primary_stat_type == 'LUK') {
        var hyper_primary = parseInt(document.getElementById('luk').value);
    }
    if (primary_stat_type == 'INT') {
        var hyper_primary = parseInt(document.getElementById('int').value);
    }
    if (primary_stat_type == 'DEX') {
        var hyper_primary = parseInt(document.getElementById('dex').value);
    }
    if (primary_stat_type == 'STR') {
        var hyper_primary = parseInt(document.getElementById('str').value);
    }
    if (primary_stat_type == 'HP') { //percent value
        var hyper_primary = parseInt(document.getElementById('hp').value);
    }
    if (primary_stat_type == 'STR + DEX + LUK') {
        var hyper_primary = parseInt(document.getElementById('str').value) + parseInt(document.getElementById('luk').value) + parseInt(document.getElementById('dex').value)
        var hyper_primary_1 = parseInt(document.getElementById('dex').value) //here
        var hyper_primary_2 = parseInt(document.getElementById('luk').value)
        var hyper_primary_3 = parseInt(document.getElementById('str').value)
    }

    if (secondary_stat_type == 'LUK') {
        var hyper_secondary = parseInt(document.getElementById('luk').value);
    }
    if (secondary_stat_type == 'INT') {
        var hyper_secondary = parseInt(document.getElementById('int').value);
    }
    if (secondary_stat_type == 'DEX') {
        var hyper_secondary = parseInt(document.getElementById('dex').value);
    }
    if (secondary_stat_type == 'STR') {
        var hyper_secondary = parseInt(document.getElementById('str').value);
    }
    if (secondary_stat_type == 'STR + DEX') {
        var hyper_secondary = parseInt(document.getElementById('str').value) + parseInt(document.getElementById('dex').value);
        var hyper_secondary_1 = parseInt(document.getElementById('str').value) + parseInt(document.getElementById('dex').value);
        var hyper_secondary_2 = parseInt(document.getElementById('str').value) + parseInt(document.getElementById('str').value);
    }

    //Current Stats Without WSE
    //var withoutWSEStats = removePotentialsFromStats(potential_list, current_ied_percent, current_attack_percent, current_boss_percent, current_damage_percent)


    var stripped_attack = attack - hyper_att;
    if (maple_class == 'Kanna') {
        var hp_hyper = parseInt(document.getElementById('hp').value);
        var hp_percent = 1 + (parseInt(document.getElementById('kanna_hp_perc').value) + parseInt(document.getElementById('hp').value)) / 100;


        //console.log('old hp perc: ' + hp_percent)
        var new_hp_percent = (hp_percent * 100 - hp_hyper) / 100;
        //console.log('new hp perc: ' + new_hp_percent)
        var new_hp = parseInt(document.getElementById('kanna_hp').value) * (new_hp_percent) / (hp_percent);
        //console.log('new hp: ' + new_hp)
        var diff = parseInt(document.getElementById('kanna_hp').value) - new_hp;
        var att_loss = Math.floor(diff / 700);
        //console.log('attack loss: ' + att_loss)
        stripped_attack = stripped_attack - att_loss;
        //console.log('stripped att: ' + stripped_attack);


    }
    //var stripped_boss_percent = current_boss_percent - hyper_boss_dmg; //wrong
    var stripped_damage_percent = current_damage_percent - hyper_dmg; //wrong
    var flat_hp = parseInt(document.getElementById('hp_arcane').value);
    if (primary_stat_type == "HP") {
        var hp_hyper = parseInt(document.getElementById('hp').value);
        var hp_percent = 1 + (parseInt(document.getElementById('main_stat_perc').value) + parseInt(document.getElementById('hp').value)) / 100;
        console.log('hp perc: ' + hp_percent)
        var new_hp_percent = ((hp_percent * 100) - hp_hyper) / 100;
        //console.log('new hp perc: ' + new_hp_percent)
        var new_hp = flat_hp + (primary_stat - flat_hp) * (new_hp_percent) / (hp_percent);
        stripped_primary = new_hp;

        //console.log('new hp: ' + new_hp)
    }
    else {
        var stripped_primary = primary_stat - hyper_primary;
    }
    var stripped_secondary = secondary_stat - hyper_secondary;
    var stripped_stat_value = getStatValue(maple_class, stripped_primary, stripped_secondary, level)

    if (stripped_attack < 0 || stripped_damage_percent < 0) {
        //send an error message
        document.getElementById('resultSection').hidden = false;
        document.getElementById('result').innerHTML = `
                There has been an error. Please make sure you have correctly inputted your stats as they are shown within the stat window. Furthermore, ensure that you have entered your Current WSE correctly.
            `;
        window.scrollTo(0, document.body.scrollHeight);
        return false
    }



    document.getElementById('resultSection').hidden = false;
    window.scrollTo(0, document.body.scrollHeight);
    saveToLocalStorage(maple_class);


    // if (maple_class == "Cadena" || maple_class == "Dual Blade" || maple_class == "Shadower") {
    //     currentScore = calculateDamageLuk2(primary_stat, secondary_stat, 0, critical_damage / 100, current_boss_percent / 100, current_damage_percent / 100, current_ied_percent / 100, attack, pdr);
    // }
    // else if (maple_class == "Xenon") {
    //     currentScore = calculateDamageXenon(primary_stat, 0, 0, critical_damage / 100, current_boss_percent / 100, current_damage_percent / 100, current_ied_percent / 100, attack, pdr)
    // }
    // else if (maple_class == "Demon Avenger") {
    //     var pureHP = 545 + 90 * level;
    //     currentScore = calculateDamageDA(pureHP, primary_stat, secondary_stat, critical_damage / 100, current_boss_percent / 100, current_damage_percent / 100, current_ied_percent / 100, attack, pdr)
    // }
    // else if (maple_class == "Kanna") {
    //     currentScore = calculateDamageCommon(primary_stat, secondary_stat, critical_damage / 100, current_boss_percent / 100, current_damage_percent / 100, current_ied_percent / 100, attack * current_attack_percent / 100, pdr);
    // }
    // else {
    //     currentScore = calculateDamageCommon(primary_stat, secondary_stat, critical_damage / 100, current_boss_percent / 100, current_damage_percent / 100, current_ied_percent / 100, attack, pdr);
    // }

    // if (maple_class != "Kanna") {
    //     console.log('original stats: primary stat: ' + primary_stat + ", secondary stat: " + secondary_stat, ", ied: " + current_ied_percent + ", boss: " + current_boss_percent + ", dmg: " + current_damage_percent + ", crit dmg: " + critical_damage + ', attack (without %): ' + attack + ", stat_value: " + stat_value + ', attk percent: ' + current_attack_percent)
    //     console.log('old score: ' + currentScore);

    //     console.log('stripped stats: primary stat: ' + stripped_primary + ", secondary stat: " + stripped_secondary, ", ied: " + stripped_ied_percent + ", boss: " + stripped_boss_percent + ", dmg: " + stripped_damage_percent + ", crit dmg: " + stripped_crit_dmg + ', attack: ' + stripped_attack)
    // }
    // else {
    //     console.log('original stats: primary stat: ' + primary_stat + ", secondary stat: " + secondary_stat, ", ied: " + current_ied_percent + ", boss: " + current_boss_percent + ", dmg: " + current_damage_percent + ", crit dmg: " + critical_damage + ', attack (with %): ' + attack * current_attack_percent / 100 + ", stat_value: " + stat_value + ', attk percent: ' + current_attack_percent)
    //     console.log('old score: ' + currentScore);

    //     console.log('stripped stats: primary stat: ' + stripped_primary + ", secondary stat: " + stripped_secondary, ", ied: " + stripped_ied_percent + ", boss: " + stripped_boss_percent + ", dmg: " + stripped_damage_percent + ", crit dmg: " + stripped_crit_dmg + ', attack: ' + stripped_attack * current_attack_percent / 100)
    // }


    if (maple_class == "Kanna") {
        //calculate(stripped_attack * current_attack_percent / 100, stripped_damage_percent, stripped_boss_percent, stripped_ied_percent, stripped_crit_dmg, stripped_primary, stripped_secondary, maple_class, level, current_attack_percent, pdr);
    }
    else {
        //calculate(stripped_attack, stripped_damage_percent, stripped_boss_percent, stripped_ied_percent, stripped_crit_dmg, stripped_primary, stripped_secondary, maple_class, level, current_attack_percent, pdr);
    }
    var primary_perc = (100 + parseInt(document.getElementById("main_stat_perc").value)) / 100

    if (maple_class == "Demon Avenger") primary_perc = (100 + parseInt(document.getElementById("main_stat_perc").value) + hp_hyper) / 100
    if (maple_class == "Xenon") { //dex, luk, str
        var primary_1_perc = (100 + parseInt(document.getElementById("main_stat_perc").value)) / 100
        var primary_2_perc = (100 + parseInt(document.getElementById("sec_perc").value)) / 100
        var primary_3_perc = (100 + parseInt(document.getElementById("sec_perc_2").value)) / 100

        primary_perc = { 1: primary_1_perc, 2: primary_2_perc, 3: primary_3_perc }

        var flat_primary_1 = hyper_primary_1 + parseInt(document.getElementById("hp_arcane").value)
        var flat_primary_2 = hyper_primary_2 + parseInt(document.getElementById("hp_arcane").value)
        var flat_primary_3 = hyper_primary_3 + parseInt(document.getElementById("hp_arcane").value)

        var flat_primary = { 1: flat_primary_1, 2: flat_primary_2, 3: flat_primary_3 }

        var primary_stat_1 = parseInt(document.getElementById("primary_stat").value)
        var primary_stat_2 = parseInt(document.getElementById("secondary_stat").value)
        var primary_stat_3 = parseInt(document.getElementById("secondary_2_stat").value)

        var primary_1_without_perc = (primary_stat_1 - flat_primary_1) / primary_1_perc + flat_primary_1
        var primary_2_without_perc = (primary_stat_2 - flat_primary_2) / primary_2_perc + flat_primary_2
        var primary_3_without_perc = (primary_stat_3 - flat_primary_3) / primary_3_perc + flat_primary_3

        var primary_without_perc = { 1: primary_1_without_perc, 2: primary_2_without_perc, 3: primary_3_without_perc }

        sec_perc = 0
        var flat_sec = 0
        var sec_without_perc = 0

        var primary_stat = primary_stat_1 + primary_stat_2 + primary_stat_3
        var secondary_stat = 0

    }
    else if (maple_class == "Dual Blade" || maple_class == "Cadena" || maple_class == "Shadower" || maple_class == "Kanna") {

        var flat_primary = hyper_primary + parseInt(document.getElementById("hp_arcane").value)

        if (maple_class == "Kanna") {
            var flat_sec_1 = hyper_secondary
            var flat_sec_2 = 0
        }
        else {
            var flat_sec_1 = hyper_secondary_1 // collect directly (inner ability)
            var flat_sec_2 = hyper_secondary_2
        }

        var flat_sec = { 1: flat_sec_1, 2: flat_sec_2 }

        var primary_without_perc = (primary_stat - flat_primary) / primary_perc + flat_primary

        var sec_1_perc = (100 + parseInt(document.getElementById("sec_perc").value)) / 100
        if (maple_class == "Kanna") {
            var sec_2_perc = (100 + 15 + 1 + parseInt(document.getElementById('hp').value) + parseInt(document.getElementById("kanna_hp_perc").value)) / 100
            if (document.getElementById('DHB').checked) sec_2_perc = sec_2_perc + 0.4
            if (document.getElementById('CRA').checked) sec_2_perc = sec_2_perc + 0.2

            if (document.getElementById('Dom').checked) sec_2_perc = sec_2_perc + 0.1
            if (document.getElementById('gollux').checked) sec_2_perc = sec_2_perc + 0.26

            if (document.getElementById('bt2').checked) sec_2_perc = sec_2_perc + 0.04
            if (document.getElementById('bt3').checked) sec_2_perc = sec_2_perc + 0.05

        }
        else {
            var sec_2_perc = (100 + parseInt(document.getElementById("sec_perc_2").value)) / 100
        }

        var sec_perc = { 1: sec_1_perc, 2: sec_2_perc }

        var secondary_stat_1 = parseInt(document.getElementById("secondary_stat").value)
        var secondary_stat_2 = parseInt(document.getElementById("secondary_2_stat").value)

        if (maple_class == "Kanna") secondary_stat_2 = parseInt(document.getElementById("kanna_hp").value)

        var sec_1_without_perc = ((secondary_stat_1 - flat_sec_1) / sec_1_perc) + flat_sec_1
        var sec_2_without_perc = ((secondary_stat_2 - flat_sec_2) / sec_2_perc) + flat_sec_2

        var sec_without_perc = { 1: sec_1_without_perc, 2: sec_2_without_perc }

        var secondary_stat = secondary_stat_1 + secondary_stat_2
        if (maple_class == "Kanna") secondary_stat = secondary_stat_1
    }
    else {
        var sec_perc = (100 + parseInt(document.getElementById("sec_perc").value)) / 100

        var flat_primary = hyper_primary + parseInt(document.getElementById("hp_arcane").value) // collect directly (inner ability)
        if (maple_class == "Demon Avenger") {
            flat_primary = flat_hp
        }

        var flat_sec = hyper_secondary // collect directly (inner ability)
        var primary_without_perc = (primary_stat - flat_primary) / primary_perc + flat_primary
        var sec_without_perc = ((secondary_stat - flat_sec) / sec_perc) + flat_sec
    }

    var stat_value = getStatValue(maple_class, primary_stat, secondary_stat, level);
    var attack = Math.floor(determineAttAmount(upperShownDamage, multiplier, stat_value, parseInt(document.getElementById('damage_percent').value), final_damage_percent) / (current_attack_percent / 100));

    //determineStatEquivalences(maple_class, attack_without_perc, attack_perc, flat_primary, primary_without_perc, primary_perc, sec_without_perc, sec_perc)
    var statEquivalences = determineStatEquivalences(maple_class, attack, current_attack_percent / 100, flat_primary, primary_without_perc, primary_perc, flat_sec, sec_without_perc, sec_perc)

    document.getElementById('resultSection').style.display = ''
    if (maple_class == "Kanna") {
        document.getElementById('result').innerHTML =
            `
        <div id='text-center result'>
            <div class="test">1 All Stat % = ${roundUp(statEquivalences.perc_all_equiv)} Main Stat</div>
            <div class="test">1 Attack = ${roundDown(statEquivalences.att_equiv)} Main Stat</div>
            <div class="test">1 Main Stat = ${roundUp(1 / statEquivalences.sec_equiv.luk_equiv)} LUK</div>
            <div class="test">1 Main Stat = ${roundUp(statEquivalences.sec_equiv.hp_equiv)} HP</div>
        </div>
        `
    }
    else if (maple_class == "Cadena" || maple_class == "Dual Blade" || maple_class == "Shadower") {
        document.getElementById('result').innerHTML =
            `
        <div id='text-center result'>
            <div class="test">1 All Stat % = ${roundUp(statEquivalences.perc_all_equiv)} Main Stat</div>
            <div class="test">1 Attack = ${roundDown(statEquivalences.att_equiv)} Main Stat</div>
            <div class="test">1 Main Stat = ${roundUp(1 / statEquivalences.sec_equiv.dex_equiv)} DEX</div>
            <div class="test">1 Main Stat = ${roundUp(1 / statEquivalences.sec_equiv.str_equiv)} STR</div>
        </div>
        `
    }
    else if (maple_class == "Xenon") {
        document.getElementById('result').innerHTML =
            `
        <div id='text-center result'>
            <div class="test">1 All Stat % = ${roundUp(statEquivalences.perc_all_equiv)} Main Stat</div>
            <div class="test">1 Attack = ${roundDown(statEquivalences.att_equiv)} Main Stat</div>
        </div>
        `
    }
    else {
        document.getElementById('result').innerHTML =
            `
        <div id='text-center result'>
            <div class="test">1 All Stat % = ${roundUp(statEquivalences.perc_all_equiv)} Main Stat</div>
            <div class="test">1 Attack = ${roundDown(statEquivalences.att_equiv)} Main Stat</div>
            <div class="test">1 Main Stat = ${roundUp(1 / statEquivalences.sec_equiv)} Secondary Stat</div>
        </div>
        `
    }
    //console.log(statEquivalences)
    return false
}



