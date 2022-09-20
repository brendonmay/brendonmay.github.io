function loadLocalStorage() {
    //var json = event.target.result;
    var json = window.localStorage.getItem('wsedata');
    var obj = JSON.parse(json);

    var obj_values = obj.obj_values; //ex: {id1: value1, id2: value2}
    var obj_wse_level = obj.obj_wse_level; //ex: {id1: value1, id2: value2}
    var obj_wse_lines = obj.obj_wse_lines; //ex: {id1: value1, id2: value2}
    var obj_checked = obj.obj_checked; //ex: {id1: true, id2: false}

    var k = 0;
    var i = 0;
    var current_obj
    while (k < 4) {
        if (k == 0) current_obj = obj_values;
        else if (k == 1) current_obj = obj_wse_level;
        else if (k == 2) current_obj = obj_checked;
        else if (k == 3) current_obj = obj_wse_lines;
        //else if (k == 4) current_obj = obj_hyper_values;

        i = 0;
        if (current_obj) {
            var id_values = Object.keys(current_obj);
            while (i < id_values.length) {
                var id = id_values[i];
                var value = current_obj[id];
                if (id == 'level') {
                    document.getElementById(id).value = value;
                }
                if (id == 'class') {
                    document.getElementById(id).value = value;
                    var maple_class = value;

                    if (maple_class == "Zero") {
                        document.getElementById('zeromessage').hidden = false;
                    }
                    else {
                        document.getElementById('zeromessage').hidden = true;
                    }
                }
                if (k != 2) {
                    if (document.getElementById(id)) document.getElementById(id).value = value;
                }
                if (k == 2) {
                    if (document.getElementById(id)) document.getElementById(id).checked = value;
                }
                if (id == 'reboot') {
                    if (value) {
                        document.getElementById('nonreboot').checked = false;
                        document.getElementById('bonusAttPerc').value = 0;
                        document.getElementById('bonusDiv').hidden = true;
                        document.getElementById('bonusTitle').hidden = true;
                        document.getElementById('bonustable1').hidden = true;
                        document.getElementById('bonustable2').hidden = true;
                        document.getElementById('currentBonusTitle').hidden = true;

                        if (document.getElementById('optimize').checked == true) {
                            //disable
                            //Weapon
                            document.getElementById('new_wlevel').disabled = true;
                            document.getElementById('new_wline1').disabled = true;
                            document.getElementById('new_wline2').disabled = true;
                            document.getElementById('new_wline3').disabled = true;

                            //Secondary
                            document.getElementById('new_slevel').disabled = true;
                            document.getElementById('new_sline1').disabled = true;
                            document.getElementById('new_sline2').disabled = true;
                            document.getElementById('new_sline3').disabled = true;

                            //Emblem
                            document.getElementById('new_elevel').disabled = true;
                            document.getElementById('new_eline1').disabled = true;
                            document.getElementById('new_eline2').disabled = true;
                            document.getElementById('new_eline3').disabled = true;

                            document.getElementById('optimizeTitle').hidden = false;
                            document.getElementById('compareTitle').hidden = true;
                        }
                    }
                }
                if (id == 'nonreboot') {
                    if (value) {
                        document.getElementById('reboot').checked = false;
                        if (document.getElementById('compare').checked == true) {
                            document.getElementById('bonusTitle').hidden = false;
                            document.getElementById('bonustable1').hidden = false;
                            document.getElementById('bonustable2').hidden = false;

                            document.getElementById('currentBonusTitle').hidden = true;
                            document.getElementById('bonusDiv').hidden = true;
                        }
                        else {
                            document.getElementById('currentBonusTitle').hidden = false;
                            document.getElementById('bonusDiv').hidden = false;

                            document.getElementById('bonusTitle').hidden = true;
                            document.getElementById('bonustable1').hidden = true;
                            document.getElementById('bonustable2').hidden = true;


                            //disable
                            //Weapon
                            document.getElementById('new_wlevel').disabled = true;
                            document.getElementById('new_wline1').disabled = true;
                            document.getElementById('new_wline2').disabled = true;
                            document.getElementById('new_wline3').disabled = true;

                            //Secondary
                            document.getElementById('new_slevel').disabled = true;
                            document.getElementById('new_sline1').disabled = true;
                            document.getElementById('new_sline2').disabled = true;
                            document.getElementById('new_sline3').disabled = true;

                            //Emblem
                            document.getElementById('new_elevel').disabled = true;
                            document.getElementById('new_eline1').disabled = true;
                            document.getElementById('new_eline2').disabled = true;
                            document.getElementById('new_eline3').disabled = true;

                            document.getElementById('optimizeTitle').hidden = false;
                            document.getElementById('compareTitle').hidden = true;

                        }
                    }
                }
                i++;
            }

        }
        if (k == 1) {
            updateWeaponLines();
            updateSecondaryLines();
            updateEmblemLines();
            update_new_elevel();
            update_new_slevel();
            update_new_wlevel();
        }
        k++;
    }
}
function saveToLocalStorage(maple_class) {
    var obj = {};

    //each of these will be a stored in obj which will be exported to JSON
    //key is ID, value is value
    var obj_values = {}; //ex: {id1: value1, id2: value2}
    var obj_wse_level = {}; //ex: {id1: value1, id2: value2}
    var obj_wse_lines = {}; //ex: {id1: value1, id2: value2}
    //key is ID, value is true or false (.checked == true)
    var obj_checked = {}; //ex: {id1: true, id2: false}


    //collection of IDs to collect data on
    var id_values = ['class', 'boss_percent', 'ied_percent', 'damage_percent', 'familiarAttPerc', 'bonusAttPerc']
    var id_checked = ['solus2', 'solus3', 'unfairAdvantage', 'empiricalKnowledge', 'thiefCunning', 'tideOfBattle', 'badge1', 'badge2', 'badge3', 'magSoul', 'optimize', 'compare', 'reboot', 'nonreboot']
    var id_wse_level = ['wlevel', 'slevel', 'elevel', 'new_wlevel', 'new_slevel', 'new_elevel'];
    var id_wse_lines = {
        'weapon': ['wline1', 'wline2', 'wline3', 'new_wline1', 'new_wline2', 'new_wline3', 'b_wline1', 'b_wline2', 'b_wline3', 'b_new_wline1', 'b_new_wline2', 'b_new_wline3'],
        'secondary': ['sline1', 'sline2', 'sline3', 'new_sline1', 'new_sline2', 'new_sline3', 'b_sline1', 'b_sline2', 'b_sline3', 'b_new_sline1', 'b_new_sline2', 'b_new_sline3'],
        'emblem': ['eline1', 'eline2', 'eline3', 'new_eline1', 'new_eline2', 'new_eline3', 'b_eline1', 'b_eline2', 'b_eline3', 'b_new_eline1', 'b_new_eline2', 'b_new_eline3']
    }

    var i = 0
    while (i < id_values.length) {
        var id = id_values[i];
        var value = document.getElementById(id).value;
        obj_values[id] = value;
        i++;
    }
    i = 0
    while (i < id_checked.length) {
        var id = id_checked[i];
        var checked = document.getElementById(id).checked;
        obj_checked[id] = checked;
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
    obj.obj_wse_level = obj_wse_level;
    obj.obj_wse_lines = obj_wse_lines;
    obj.obj_checked = obj_checked;

    window.localStorage.setItem('wsedata', JSON.stringify(obj));
}

function updateSecondaryLines() {
    var current_class = document.getElementById('class').value;
    if (current_class != 'Kanna') {
        if (document.getElementById('slevel').value == 'lesser160') {
            if (document.getElementById('optimize').checked == true) {
                document.getElementById('new_slevel').value = 'lesser160';
                update_new_slevel(current_class);
                update_new_wlevel();
                update_new_elevel();

            }
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
            if (document.getElementById('optimize').checked == true) {
                document.getElementById('new_slevel').value = 'greater160';
                update_new_slevel(current_class);

                update_new_wlevel();
                update_new_elevel();
            }
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
            if (document.getElementById('optimize').checked == true) {
                document.getElementById('new_slevel').value = 'lesser160';
                update_new_slevel(current_class);
                update_new_wlevel();
                update_new_elevel();
            }
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
            if (document.getElementById('optimize').checked == true) {
                document.getElementById('new_slevel').value = 'greater160';
                update_new_slevel(current_class);
                update_new_wlevel();
                update_new_elevel();
            }
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
        if (document.getElementById('optimize').checked == true) {
            document.getElementById('new_elevel').value = 'lesser160';
            update_new_elevel();

            update_new_wlevel();

            var maple_class = document.getElementById('class').value;
            update_new_slevel(maple_class);
        }

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
        if (document.getElementById('optimize').checked == true) {
            document.getElementById('new_elevel').value = 'greater160';
            update_new_elevel();

            update_new_wlevel();
            var maple_class = document.getElementById('class').value;
            update_new_slevel(maple_class);
        }
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
        if (document.getElementById('optimize').checked == true) {
            document.getElementById('new_wlevel').value = 'lesser160';
            update_new_wlevel_lesser();
            update_new_elevel();
            var maple_class = document.getElementById('class').value;
            update_new_slevel(maple_class);
        }
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
        if (document.getElementById('optimize').checked == true) {
            document.getElementById('new_wlevel').value = 'greater160';
            update_new_wlevel_greater();
            update_new_elevel();
            var maple_class = document.getElementById('class').value;
            update_new_slevel(maple_class);
        }
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

function getUpperActualDamage(attack_percent) {
    var upperActualDamage = attack_percent / 100;
    return upperActualDamage
}

function getUpperShownDamage(attack_percent, damage_percent) {
    var upperActualDamage = getUpperActualDamage(attack_percent);
    var upperShownDamage = upperActualDamage * (1 + damage_percent / 100);
    return upperShownDamage

}

function getHitDamage(boss_percent, attack_percent, damage_percent) {
    var upperShownDamage = getUpperShownDamage(attack_percent, damage_percent);
    var hitDamage = upperShownDamage / (1 + damage_percent / 100) * (1 + (damage_percent + boss_percent) / 100);
    return hitDamage
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

        if (current_potential == '18boss') {
            new_boss_percent = new_boss_percent + 18;
        }
        if (current_potential == '12boss') {
            new_boss_percent = new_boss_percent + 12;
        }
        if (current_potential == '3boss') {
            new_boss_percent = new_boss_percent + 3;
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

        if (current_potential == '7att') {
            new_attack_percent = new_attack_percent + 7;
        }
        if (current_potential == '6att') {
            new_attack_percent = new_attack_percent + 6;
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

        if (current_potential == '7dmg') {
            new_damage_percent = new_damage_percent + 7;
        }
        if (current_potential == '6dmg') {
            new_damage_percent = new_damage_percent + 6;
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

        if (current_potential == '5ied') {
            var current_ied = new_ied_percent;
            new_ied_percent = determineIED(current_ied, [5]);
        }
        if (current_potential == '4ied') {
            var current_ied = new_ied_percent;
            new_ied_percent = determineIED(current_ied, [4]);
        }
        if (current_potential == '3ied') {
            var current_ied = new_ied_percent;
            new_ied_percent = determineIED(current_ied, [3]);
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

        if (current_potential == '18boss') {
            stripped_boss_percent = stripped_boss_percent - 18;
        }
        if (current_potential == '12boss') {
            stripped_boss_percent = stripped_boss_percent - 12;
        }
        if (current_potential == '3boss') {
            stripped_boss_percent = stripped_boss_percent - 3;
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

        if (current_potential == '7att') {
            stripped_attack_percent = stripped_attack_percent - 7;
        }
        if (current_potential == '6att') {
            stripped_attack_percent = stripped_attack_percent - 6;
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

        if (current_potential == '7dmg') {
            stripped_damage_percent = stripped_damage_percent - 7;
        }
        if (current_potential == '6dmg') {
            stripped_damage_percent = stripped_damage_percent - 6;
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

        if (current_potential == '5ied') {
            var old_ied = stripped_ied_percent;
            stripped_ied_percent = (old_ied - 5) / ((-1 * 5 / 100) + 1)
        }
        if (current_potential == '4ied') {
            var old_ied = stripped_ied_percent;
            stripped_ied_percent = (old_ied - 4) / ((-1 * 4 / 100) + 1)
        }
        if (current_potential == '3ied') {
            var old_ied = stripped_ied_percent;
            stripped_ied_percent = (old_ied - 3) / ((-1 * 3 / 100) + 1)
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
            'bossPercent': 0
        },

        'Angelic Buster': {
            'attPercent': 4,
            'iedPercent': [20, 10, 10, 10, 20],
            'dmgPercent': 50,
            'bossPercent': 0
        },

        'Aran': {
            'attPercent': 4,
            'iedPercent': [49.5], //weighed avg
            'dmgPercent': 52, //weighed avg
            'bossPercent': 0,
        },

        'Ark': {
            'attPercent': 4,
            'iedPercent': [20, 20, 20],
            'dmgPercent': 20,
            'bossPercent': 50
        },

        'Battle Mage': {
            'attPercent': 39,
            'iedPercent': [20, 20],
            'dmgPercent': 0,
            'bossPercent': 30
        },

        'Bishop': {
            'attPercent': 4,
            'iedPercent': [20],
            'dmgPercent': 60,
            'bossPercent': 10
        },

        'Blaster': {
            'attPercent': 19,
            'iedPercent': [44], //Weighed AVG
            'dmgPercent': 10,
            'bossPercent': 0
        },

        'Blaze Wizard': {
            'attPercent': 14,
            'iedPercent': [20, 20],
            'dmgPercent': 0,
            'bossPercent': 0
        },

        'Beast Tamer': {
            'attPercent': 15,
            'iedPercent': [20],
            'dmgPercent': 20,
            'bossPercent': 20
        },

        'Bowmaster': {
            'attPercent': 29,
            'iedPercent': [20],
            'dmgPercent': 30,
            'bossPercent': 10
        },

        'Buccaneer': {
            'attPercent': 4,
            'iedPercent': [20, 25],
            'dmgPercent': 20,
            'bossPercent': 20
        },

        'Cadena': {
            'attPercent': 4,
            'iedPercent': [30, 15], //rounded
            'dmgPercent': 7, //Weighed AVG
            'bossPercent': 7 //Weighed Avg
        },

        'Cannoneer': {
            'attPercent': 4,
            'iedPercent': [20, 20, 25],
            'dmgPercent': 60,
            'bossPercent': 0
        },

        'Corsair': {
            'attPercent': 24,
            'iedPercent': [20, 25],
            'dmgPercent': 30,
            'bossPercent': 20
        },

        'Dark Knight': {
            'attPercent': 4,
            'iedPercent': [30, 20, 20],
            'dmgPercent': 20,
            'bossPercent': 10
        },

        'Dawn Warrior': {
            'attPercent': 14,
            'iedPercent': [20, 20],
            'dmgPercent': 20,
            'bossPercent': 0
        },

        'Demon Avenger': {
            'attPercent': 4,
            'iedPercent': [30, 30],
            'dmgPercent': 40,
            'bossPercent': 0
        },

        'Demon Slayer': {
            'attPercent': 4,
            'iedPercent': [43], //weighed avg
            'dmgPercent': 52, //weighed avg
            'bossPercent': 52 //weighed avg
        },

        'Dual Blade': {
            'attPercent': 4,
            'iedPercent': [80], //weighed avg
            'dmgPercent': 20,
            'bossPercent': 0
        },

        'Evan': {
            'attPercent': 39,
            'iedPercent': [20],
            'dmgPercent': 40,
            'bossPercent': 0
        },

        'Fire Poison': {
            'attPercent': 4,
            'iedPercent': [10],
            'dmgPercent': 55,
            'bossPercent': 0
        },

        'Hayato': {
            'attPercent': 4,
            'iedPercent': [20],
            'dmgPercent': -50,
            'bossPercent': 2
        },

        'Hero': {
            'attPercent': 4,
            'iedPercent': [20],
            'dmgPercent': 45,
            'bossPercent': 0
        },

        'Hoyoung': {
            'attPercent': 14,
            'iedPercent': [20, 25],
            'dmgPercent': 0,
            'bossPercent': 0
        },

        'Ice Lightning': {
            'attPercent': 4,
            'iedPercent': [20],
            'dmgPercent': 120,
            'bossPercent': 0
        },

        'Illium': {
            'attPercent': 14,
            'iedPercent': [4, 4, 4, 20],
            'dmgPercent': 20,
            'bossPercent': 20
        },

        'Jett': {
            'attPercent': 29,
            'iedPercent': [20],
            'dmgPercent': 20,
            'bossPercent': 20
        },

        'Kain': {
            'attPercent': 34,
            'iedPercent': [10, 30],
            'dmgPercent': 10,
            'bossPercent': 10,
        },

        'Kaiser': {
            'attPercent': 34,
            'iedPercent': [40, 20],
            'dmgPercent': 10, //+ 10 weighed avg final form
            'bossPercent': 26 //+8 weighed avg from final form
        },

        'Kanna': {
            'attPercent': 4,
            'iedPercent': [20],
            'dmgPercent': 0,
            'bossPercent': 0
        },

        'Kinesis': {
            'attPercent': 14,
            'iedPercent': [20],
            'dmgPercent': 0,
            'bossPercent': 30
        },

        'Lara': {
            'attPercent': 4,
            'iedPercent': [40, 20],
            'dmgPercent': 20,
            'bossPercent': 10,
        },

        'Luminous': {
            'attPercent': 4,
            'iedPercent': [40, 20],
            'dmgPercent': 20,
            'bossPercent': 0
        },

        'Marksmen': {
            'attPercent': 4,
            'iedPercent': [20, 50, 20],
            'dmgPercent': 20,
            'bossPercent': 10
        },

        'Mechanic': {
            'attPercent': 4,
            'iedPercent': [20, 10, 2], //weighed avg
            'dmgPercent': 3, //weighed avg
            'bossPercent': 0
        },

        'Mercedes': {
            'attPercent': 34,
            'iedPercent': [50, 5], //weighed avg
            'dmgPercent': 60, //weighed avg
            'bossPercent': 0
        },

        'Mihile': {
            'attPercent': 4,
            'iedPercent': [20],
            'dmgPercent': 50,
            'bossPercent': 0
        },

        'Night Lord': {
            'attPercent': 4,
            'iedPercent': [30, 20],
            'dmgPercent': 20,
            'bossPercent': 20
        },

        'Night Walker': {
            'attPercent': 4,
            'iedPercent': [20, 7, 7, 7, 7, 7],
            'dmgPercent': 20,
            'bossPercent': 20
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
            'bossPercent': 0
        },

        'Phantom': {
            'attPercent': 4,
            'iedPercent': [27], //weighed avg
            'dmgPercent': 4, //weighed avg
            'bossPercent': 0
        },

        'Shade': {
            'attPercent': 4,
            'iedPercent': [20],
            'dmgPercent': 40,
            'bossPercent': 20
        },

        'Shadower': {
            'attPercent': 4,
            'iedPercent': [20],
            'dmgPercent': 20,
            'bossPercent': 20
        },

        'Thunder Breaker': {
            'attPercent': 4,
            'iedPercent': [5, 5, 5, 5, 5, 9, 9, 9, 9, 9, 20, 6],
            'dmgPercent': 55, //weighed avg
            'bossPercent': 0
        },

        'Wild Hunter': {
            'attPercent': 39,
            'iedPercent': [10, 20],
            'dmgPercent': 20,
            'bossPercent': 30
        },

        'Wind Archer': {
            'attPercent': 14,
            'iedPercent': [20, 20, 15, 10],
            'dmgPercent': 35,
            'bossPercent': 30
        },

        'Xenon': {
            'attPercent': 4,
            'iedPercent': [30, 10, 20],
            'dmgPercent': 20,
            'bossPercent': 0
        },

        'Zero': { //assuming in beta mode
            'attPercent': 4,
            'iedPercent': [20, 50, 15], //nodes, armor split, 15% average between forms
            'dmgPercent': -14, // 10 stacks, -24 to average between modes
            'bossPercent': -15, //average between modes
        }
    }
    return class_data[maple_class]
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
    //initialize 
    setTimeout(function () {
        $("#toast").toast('show')
    }, 1000)
    
    $(function () {
        $('[data-toggle="popover"]').popover({ html: true })

        $('#ied_percent').tooltip({ 'trigger': 'hover focus', 'title': 'Ignore Defense % from the Stat Window. You should be fully buffed with 100% uptime buffs including familiars, while standing still.', 'placement': 'bottom' });
        $('#boss_percent').tooltip({ 'trigger': 'hover focus', 'title': 'Boss Damage % from the Stat Window. You should be fully buffed with 100% uptime buffs including familiars, while standing still.', 'placement': 'bottom' });
        $('#damage_percent').tooltip({ 'trigger': 'hover focus', 'title': 'Damage Bonus % from the Stat Window. You should be fully buffed with 100% uptime buffs including familiars, while standing still.', 'placement': 'bottom' });
       
    });

    $('.popover-dismiss').popover({
        trigger: 'focus'
    });
    if (window.localStorage.getItem('wsedata') !== null) {
        loadLocalStorage();
    }

    //checkbox behaviour
    document.getElementById("solus2").addEventListener("click", function () {
        if (document.getElementById('solus2').checked == true) {
            document.getElementById('solus3').checked = false;
        }
    });

    document.getElementById("solus3").addEventListener("click", function () {
        if (document.getElementById('solus3').checked == true) {
            document.getElementById('solus2').checked = false;
        }
    });

    document.getElementById("reboot").addEventListener("click", function () {
        if (document.getElementById('reboot').checked == true) {
            document.getElementById('nonreboot').checked = false;
            document.getElementById('bonusAttPerc').value = 0;
            document.getElementById('bonusDiv').hidden = true;
            document.getElementById('bonusTitle').hidden = true;
            document.getElementById('bonustable1').hidden = true;
            document.getElementById('bonustable2').hidden = true;
            document.getElementById('currentBonusTitle').hidden = true;
        }
    });

    document.getElementById("nonreboot").addEventListener("click", function () {
        if (document.getElementById('nonreboot').checked == true) {
            document.getElementById('reboot').checked = false;
            if (document.getElementById('compare').checked == true) {
                document.getElementById('bonusTitle').hidden = false;
                document.getElementById('bonustable1').hidden = false;
                document.getElementById('bonustable2').hidden = false;

                document.getElementById('currentBonusTitle').hidden = true;
                document.getElementById('bonusDiv').hidden = true;
            }
            else {
                document.getElementById('currentBonusTitle').hidden = false;
                document.getElementById('bonusDiv').hidden = false;

                document.getElementById('bonusTitle').hidden = true;
                document.getElementById('bonustable1').hidden = true;
                document.getElementById('bonustable2').hidden = true;
            }
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
    document.getElementById("calculateButton").addEventListener("click", function () {
        optimizeWSE();
    });
    document.getElementById("new_wlevel").addEventListener("change", function () {
        if (document.getElementById('new_wlevel').value == 'lesser160') {
            update_new_wlevel_lesser()
        }
        else {
            update_new_wlevel_greater()
        }
    });
    document.getElementById("new_slevel").addEventListener("change", function () {
        var current_class = document.getElementById('class').value;
        update_new_slevel(current_class);

    });
    document.getElementById("new_elevel").addEventListener("change", function () {
        update_new_elevel()
    });
    document.getElementById("wlevel").addEventListener("change", function () {
        if (document.getElementById('wlevel').value == 'lesser160') {
            if (document.getElementById('optimize').checked == true) {
                document.getElementById('new_wlevel').value = 'lesser160';
                update_new_wlevel_lesser();
                update_new_elevel();
                var maple_class = document.getElementById('class').value;
                update_new_slevel(maple_class);
            }
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
            if (document.getElementById('optimize').checked == true) {
                document.getElementById('new_wlevel').value = 'greater160';
                update_new_wlevel_greater();
                update_new_elevel();
                var maple_class = document.getElementById('class').value;
                update_new_slevel(maple_class);
            }
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
                if (document.getElementById('optimize').checked == true) {
                    document.getElementById('new_slevel').value = 'lesser160';
                    update_new_slevel(current_class);
                    update_new_wlevel();
                    update_new_elevel();

                }
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
                if (document.getElementById('optimize').checked == true) {
                    document.getElementById('new_slevel').value = 'greater160';
                    update_new_slevel(current_class);

                    update_new_wlevel();
                    update_new_elevel();
                }
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
                if (document.getElementById('optimize').checked == true) {
                    document.getElementById('new_slevel').value = 'lesser160';
                    update_new_slevel(current_class);
                    update_new_wlevel();
                    update_new_elevel();
                }
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
                if (document.getElementById('optimize').checked == true) {
                    document.getElementById('new_slevel').value = 'greater160';
                    update_new_slevel(current_class);
                    update_new_wlevel();
                    update_new_elevel();
                }
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
            if (document.getElementById('optimize').checked == true) {
                document.getElementById('new_elevel').value = 'lesser160';
                update_new_elevel();

                update_new_wlevel();

                var maple_class = document.getElementById('class').value;
                update_new_slevel(maple_class);
            }

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
            if (document.getElementById('optimize').checked == true) {
                document.getElementById('new_elevel').value = 'greater160';
                update_new_elevel();

                update_new_wlevel();
                var maple_class = document.getElementById('class').value;
                update_new_slevel(maple_class);
            }
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
    document.getElementById("compare").addEventListener("change", function () {
        //compare calculator selected
        if (document.getElementById('nonreboot').checked == true) {
            if (document.getElementById('compare').checked == true) {
                document.getElementById('bonusTitle').hidden = false;
                document.getElementById('bonustable1').hidden = false;
                document.getElementById('bonustable2').hidden = false;

                document.getElementById('currentBonusTitle').hidden = true;
                document.getElementById('bonusDiv').hidden = true;
            }
            else {
                document.getElementById('currentBonusTitle').hidden = false;
                document.getElementById('bonusDiv').hidden = false;

                document.getElementById('bonusTitle').hidden = true;
                document.getElementById('bonustable1').hidden = true;
                document.getElementById('bonustable2').hidden = true;
            }
        }

        document.getElementById('new_wlevel').disabled = false;
        document.getElementById('new_wline1').disabled = false;
        document.getElementById('new_wline2').disabled = false;
        document.getElementById('new_wline3').disabled = false;

        document.getElementById('new_slevel').disabled = false;
        document.getElementById('new_sline1').disabled = false;
        document.getElementById('new_sline2').disabled = false;
        document.getElementById('new_sline3').disabled = false;

        document.getElementById('new_elevel').disabled = false;
        document.getElementById('new_eline1').disabled = false;
        document.getElementById('new_eline2').disabled = false;
        document.getElementById('new_eline3').disabled = false;

        document.getElementById('optimizeTitle').hidden = true;
        document.getElementById('compareTitle').hidden = false;
    });
    document.getElementById("optimize").addEventListener("change", function () {
        //optimize calculator selected
        //FIX THIS SECTION
        if (document.getElementById('nonreboot').checked == true) {
            if (document.getElementById('compare').checked == true) {
                document.getElementById('bonusTitle').hidden = false;
                document.getElementById('bonustable1').hidden = false;
                document.getElementById('bonustable2').hidden = false;

                document.getElementById('currentBonusTitle').hidden = true;
                document.getElementById('bonusDiv').hidden = true;
            }
            else {
                document.getElementById('currentBonusTitle').hidden = false;
                document.getElementById('bonusDiv').hidden = false;

                document.getElementById('bonusTitle').hidden = true;
                document.getElementById('bonustable1').hidden = true;
                document.getElementById('bonustable2').hidden = true;
            }
        }

        //Weapon
        document.getElementById('new_wlevel').disabled = true;
        document.getElementById('new_wlevel').value = document.getElementById('wlevel').value;
        if (document.getElementById('new_wlevel').value == "lesser160") {
            update_new_wlevel_lesser();
        }
        else {
            update_new_wlevel_greater();
        }

        document.getElementById('new_wline1').disabled = true;
        document.getElementById('new_wline1').value = 'none';

        document.getElementById('new_wline2').disabled = true;
        document.getElementById('new_wline2').value = 'none';

        document.getElementById('new_wline3').disabled = true;
        document.getElementById('new_wline3').value = 'none';

        //Secondary
        document.getElementById('new_slevel').disabled = true;
        document.getElementById('new_slevel').value = document.getElementById('slevel').value;
        var maple_class = document.getElementById('class').value;
        update_new_slevel(maple_class);


        document.getElementById('new_sline1').disabled = true;
        document.getElementById('new_sline1').value = 'none';

        document.getElementById('new_sline2').disabled = true;
        document.getElementById('new_sline2').value = 'none';

        document.getElementById('new_sline3').disabled = true;
        document.getElementById('new_sline3').value = 'none';

        //Emblem
        document.getElementById('new_elevel').disabled = true;
        document.getElementById('new_elevel').value = document.getElementById('elevel').value;
        update_new_elevel();

        document.getElementById('new_eline1').disabled = true;
        document.getElementById('new_eline1').value = 'none';

        document.getElementById('new_eline2').disabled = true;
        document.getElementById('new_eline2').value = 'none';

        document.getElementById('new_eline3').disabled = true;
        document.getElementById('new_eline3').value = 'none';

        document.getElementById('optimizeTitle').hidden = false;
        document.getElementById('compareTitle').hidden = true;

    });
    document.getElementById("class").addEventListener("change", function () {
        document.getElementById('resultSection').hidden = true;
        var maple_class = document.getElementById('class').value;
        update_new_elevel();
        update_new_slevel(maple_class);
        update_new_wlevel();

        if (maple_class == "Zero") {
            document.getElementById('zeromessage').hidden = false;
        }
        else {
            document.getElementById('zeromessage').hidden = true;
        }

        var current_class = document.getElementById('class').value;
        document.getElementById('wline1').value = 'none';
        document.getElementById('wline2').value = 'none';
        document.getElementById('wline3').value = 'none';

        document.getElementById('eline1').value = 'none';
        document.getElementById('eline2').value = 'none';
        document.getElementById('eline3').value = 'none';

        if (current_class == 'Kanna') {
            //fix bonus pot
            $('#b_sline1').empty();
            $('#b_sline1').append("<option value='13att'>13% ATT</option>");
            $('#b_sline1').append("<option value='12att'>12% ATT</option>");
            $('#b_sline1').append("<option value='10att'>10% ATT</option>");
            $('#b_sline1').append("<option value='9att'>9% ATT</option>");
            $('#b_sline1').append("<option value='none' selected>N/A</option>");

            $('#b_sline2').empty();
            $('#b_sline2').append("<option value='13att'>13% ATT</option>");
            $('#b_sline2').append("<option value='12att'>12% ATT</option>");
            $('#b_sline2').append("<option value='10att'>10% ATT</option>");
            $('#b_sline2').append("<option value='9att'>9% ATT</option>");
            $('#b_sline2').append("<option value='7att'>7% ATT</option>");
            $('#b_sline2').append("<option value='6att'>6% ATT</option>");
            $('#b_sline2').append("<option value='none' selected>N/A</option>");

            $('#b_sline3').empty();
            $('#b_sline3').append("<option value='13att'>13% ATT</option>");
            $('#b_sline3').append("<option value='12att'>12% ATT</option>");
            $('#b_sline3').append("<option value='10att'>10% ATT</option>");
            $('#b_sline3').append("<option value='9att'>9% ATT</option>");
            $('#b_sline3').append("<option value='7att'>7% ATT</option>");
            $('#b_sline3').append("<option value='6att'>6% ATT</option>");
            $('#b_sline3').append("<option value='none' selected>N/A</option>");

            ////////////////////////////////////////////////////////////////////
            $('#b_new_sline1').empty();
            $('#b_new_sline1').append("<option value='13att'>13% ATT</option>");
            $('#b_new_sline1').append("<option value='12att'>12% ATT</option>");
            $('#b_new_sline1').append("<option value='10att'>10% ATT</option>");
            $('#b_new_sline1').append("<option value='9att'>9% ATT</option>");
            $('#b_new_sline1').append("<option value='none' selected>N/A</option>");

            $('#b_new_sline2').empty();
            $('#b_new_sline2').append("<option value='13att'>13% ATT</option>");
            $('#b_new_sline2').append("<option value='12att'>12% ATT</option>");
            $('#b_new_sline2').append("<option value='10att'>10% ATT</option>");
            $('#b_new_sline2').append("<option value='9att'>9% ATT</option>");
            $('#b_new_sline2').append("<option value='7att'>7% ATT</option>");
            $('#b_new_sline2').append("<option value='6att'>6% ATT</option>");
            $('#b_new_sline2').append("<option value='none' selected>N/A</option>");

            $('#b_new_sline3').empty();
            $('#b_new_sline3').append("<option value='13att'>13% ATT</option>");
            $('#b_new_sline3').append("<option value='12att'>12% ATT</option>");
            $('#b_new_sline3').append("<option value='10att'>10% ATT</option>");
            $('#b_new_sline3').append("<option value='9att'>9% ATT</option>");
            $('#b_new_sline3').append("<option value='7att'>7% ATT</option>");
            $('#b_new_sline3').append("<option value='6att'>6% ATT</option>");
            $('#b_new_sline3').append("<option value='none' selected>N/A</option>");

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
            if (document.getElementById('new_slevel').value == 'greater160') {
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
        else {
            //fix bonus pot
            $('#b_sline1').empty();
            $('#b_sline1').append("<option value='18boss'>18% Boss</option>");
            $('#b_sline1').append("<option value='12boss'>12% Boss</option>");
            $('#b_sline1').append("<option value='3boss'>3% Boss</option>");
            $('#b_sline1').append("<option value='5ied'>5% IED</option>");
            $('#b_sline1').append("<option value='4ied'>4% IED</option>");
            $('#b_sline1').append("<option value='3ied'>3% IED</option>");
            $('#b_sline1').append("<option value='13att'>13% ATT</option>");
            $('#b_sline1').append("<option value='12att'>12% ATT</option>");
            $('#b_sline1').append("<option value='10att'>10% ATT</option>");
            $('#b_sline1').append("<option value='9att'>9% ATT</option>");
            $('#b_sline1').append("<option value='13dmg'>13% Damage</option>");
            $('#b_sline1').append("<option value='12dmg'>12% Damage</option>");
            $('#b_sline1').append("<option value='10dmg'>10% Damage</option>");
            $('#b_sline1').append("<option value='9dmg'>9% Damage</option>");
            $('#b_sline1').append("<option value='none' selected>N/A</option>");


            $('#b_sline2').empty();
            $('#b_sline2').append("<option value='18boss'>18% Boss</option>");
            $('#b_sline2').append("<option value='12boss'>12% Boss</option>");
            $('#b_sline2').append("<option value='3boss'>3% Boss</option>");
            $('#b_sline2').append("<option value='5ied'>5% IED</option>");
            $('#b_sline2').append("<option value='4ied'>4% IED</option>");
            $('#b_sline2').append("<option value='3ied'>3% IED</option>");
            $('#b_sline2').append("<option value='13att'>13% ATT</option>");
            $('#b_sline2').append("<option value='12att'>12% ATT</option>");
            $('#b_sline2').append("<option value='10att'>10% ATT</option>");
            $('#b_sline2').append("<option value='9att'>9% ATT</option>");
            $('#b_sline2').append("<option value='7att'>7% ATT</option>");
            $('#b_sline2').append("<option value='6att'>6% ATT</option>");
            $('#b_sline2').append("<option value='13dmg'>13% Damage</option>");
            $('#b_sline2').append("<option value='12dmg'>12% Damage</option>");
            $('#b_sline2').append("<option value='10dmg'>10% Damage</option>");
            $('#b_sline2').append("<option value='9dmg'>9% Damage</option>");
            $('#b_sline2').append("<option value='7dmg'>7% Damage</option>");
            $('#b_sline2').append("<option value='6dmg'>6% Damage</option>");
            $('#b_sline2').append("<option value='none' selected>N/A</option>");

            $('#b_sline3').empty();
            $('#b_sline3').append("<option value='18boss'>18% Boss</option>");
            $('#b_sline3').append("<option value='12boss'>12% Boss</option>");
            $('#b_sline3').append("<option value='3boss'>3% Boss</option>");
            $('#b_sline3').append("<option value='5ied'>5% IED</option>");
            $('#b_sline3').append("<option value='4ied'>4% IED</option>");
            $('#b_sline3').append("<option value='3ied'>3% IED</option>");
            $('#b_sline3').append("<option value='13att'>13% ATT</option>");
            $('#b_sline3').append("<option value='12att'>12% ATT</option>");
            $('#b_sline3').append("<option value='10att'>10% ATT</option>");
            $('#b_sline3').append("<option value='9att'>9% ATT</option>");
            $('#b_sline3').append("<option value='7att'>7% ATT</option>");
            $('#b_sline3').append("<option value='6att'>6% ATT</option>");
            $('#b_sline3').append("<option value='13dmg'>13% Damage</option>");
            $('#b_sline3').append("<option value='12dmg'>12% Damage</option>");
            $('#b_sline3').append("<option value='10dmg'>10% Damage</option>");
            $('#b_sline3').append("<option value='9dmg'>9% Damage</option>");
            $('#b_sline3').append("<option value='7dmg'>7% Damage</option>");
            $('#b_sline3').append("<option value='6dmg'>6% Damage</option>");
            $('#b_sline3').append("<option value='none' selected>N/A</option>");

            /////////////////////////////////////////////////////////////////
            $('#b_new_sline1').empty();
            $('#b_new_sline1').append("<option value='18boss'>18% Boss</option>");
            $('#b_new_sline1').append("<option value='12boss'>12% Boss</option>");
            $('#b_new_sline1').append("<option value='3boss'>3% Boss</option>");
            $('#b_new_sline1').append("<option value='5ied'>5% IED</option>");
            $('#b_new_sline1').append("<option value='4ied'>4% IED</option>");
            $('#b_new_sline1').append("<option value='3ied'>3% IED</option>");
            $('#b_new_sline1').append("<option value='13att'>13% ATT</option>");
            $('#b_new_sline1').append("<option value='12att'>12% ATT</option>");
            $('#b_new_sline1').append("<option value='10att'>10% ATT</option>");
            $('#b_new_sline1').append("<option value='9att'>9% ATT</option>");
            $('#b_new_sline1').append("<option value='13dmg'>13% Damage</option>");
            $('#b_new_sline1').append("<option value='12dmg'>12% Damage</option>");
            $('#b_new_sline1').append("<option value='10dmg'>10% Damage</option>");
            $('#b_new_sline1').append("<option value='9dmg'>9% Damage</option>");
            $('#b_new_sline1').append("<option value='none' selected>N/A</option>");


            $('#b_new_sline2').empty();
            $('#b_new_sline2').append("<option value='18boss'>18% Boss</option>");
            $('#b_new_sline2').append("<option value='12boss'>12% Boss</option>");
            $('#b_new_sline2').append("<option value='3boss'>3% Boss</option>");
            $('#b_new_sline2').append("<option value='5ied'>5% IED</option>");
            $('#b_new_sline2').append("<option value='4ied'>4% IED</option>");
            $('#b_new_sline2').append("<option value='3ied'>3% IED</option>");
            $('#b_new_sline2').append("<option value='13att'>13% ATT</option>");
            $('#b_new_sline2').append("<option value='12att'>12% ATT</option>");
            $('#b_new_sline2').append("<option value='10att'>10% ATT</option>");
            $('#b_new_sline2').append("<option value='9att'>9% ATT</option>");
            $('#b_new_sline2').append("<option value='7att'>7% ATT</option>");
            $('#b_new_sline2').append("<option value='6att'>6% ATT</option>");
            $('#b_new_sline2').append("<option value='13dmg'>13% Damage</option>");
            $('#b_new_sline2').append("<option value='12dmg'>12% Damage</option>");
            $('#b_new_sline2').append("<option value='10dmg'>10% Damage</option>");
            $('#b_new_sline2').append("<option value='9dmg'>9% Damage</option>");
            $('#b_new_sline2').append("<option value='7dmg'>7% Damage</option>");
            $('#b_new_sline2').append("<option value='6dmg'>6% Damage</option>");
            $('#b_new_sline2').append("<option value='none' selected>N/A</option>");

            $('#b_new_sline3').empty();
            $('#b_new_sline3').append("<option value='18boss'>18% Boss</option>");
            $('#b_new_sline3').append("<option value='12boss'>12% Boss</option>");
            $('#b_new_sline3').append("<option value='3boss'>3% Boss</option>");
            $('#b_new_sline3').append("<option value='5ied'>5% IED</option>");
            $('#b_new_sline3').append("<option value='4ied'>4% IED</option>");
            $('#b_new_sline3').append("<option value='3ied'>3% IED</option>");
            $('#b_new_sline3').append("<option value='13att'>13% ATT</option>");
            $('#b_new_sline3').append("<option value='12att'>12% ATT</option>");
            $('#b_new_sline3').append("<option value='10att'>10% ATT</option>");
            $('#b_new_sline3').append("<option value='9att'>9% ATT</option>");
            $('#b_new_sline3').append("<option value='7att'>7% ATT</option>");
            $('#b_new_sline3').append("<option value='6att'>6% ATT</option>");
            $('#b_new_sline3').append("<option value='13dmg'>13% Damage</option>");
            $('#b_new_sline3').append("<option value='12dmg'>12% Damage</option>");
            $('#b_new_sline3').append("<option value='10dmg'>10% Damage</option>");
            $('#b_new_sline3').append("<option value='9dmg'>9% Damage</option>");
            $('#b_new_sline3').append("<option value='7dmg'>7% Damage</option>");
            $('#b_new_sline3').append("<option value='6dmg'>6% Damage</option>");
            $('#b_new_sline3').append("<option value='none' selected>N/A</option>");

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
            if (document.getElementById('new_slevel').value == 'greater160') {
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
    });
});

//Main Function
function optimizeWSE() {
    //ied source
    var ied_sources = [];
    var pro_mode = false;

    // Stats from Stat Window
    var maple_class = document.getElementById('class').value;
    var boss_percent = parseInt(document.getElementById('boss_percent').value);
    var ied_percent = document.getElementById('ied_percent').value - 0.5; //due to rounding up in game
    if (document.getElementById('ied_percent').value.includes('.')) {
        pro_mode = true;
        ied_percent = parseFloat(document.getElementById('ied_percent').value);
    }
    var damage_percent = parseInt(document.getElementById('damage_percent').value);
    var attack_percent = 100;

    //Link Skill Stats
    if (document.getElementById('solus2').checked == true) {
        damage_percent = damage_percent + 11;
    }

    if (document.getElementById('solus3').checked == true) {
        damage_percent = damage_percent + 16;
    }

    if (document.getElementById('unfairAdvantage').checked == true) {
        damage_percent = damage_percent + 12;
    }

    if (document.getElementById('empiricalKnowledge').checked == true) {
        var empiricalKnowledgeIED = [3, 3, 3];
        ied_sources = ied_sources.concat(empiricalKnowledgeIED);
        damage_percent = damage_percent + 9;
    }

    if (document.getElementById('thiefCunning').checked == true) {
        damage_percent = damage_percent + 18;
    }

    if (document.getElementById('tideOfBattle').checked == true) {
        damage_percent = damage_percent + 12;
    }

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

    attack_percent = attack_percent + parseInt(document.getElementById('familiarAttPerc').value);

    // class_data
    var class_data = getClassData(maple_class)

    var class_ied = class_data.iedPercent;
    var class_dmg = class_data.dmgPercent;
    var class_att = class_data.attPercent;
    var class_boss = class_data.bossPercent;

    //update ied_sources
    if (pro_mode == false) {
        ied_sources = ied_sources.concat(class_ied);
    }

    //Current Stats With WSE
    current_damage_percent = damage_percent + class_dmg;
    current_boss_percent = boss_percent + class_boss;
    current_ied_percent = determineIED(ied_percent, ied_sources);

    //get ATT %
    current_attack_percent = attack_percent + class_att;
    var added_attack_percent_from_WSE = getWSEATTPercent();
    current_attack_percent = current_attack_percent + added_attack_percent_from_WSE;

    if (document.getElementById('optimize').checked && document.getElementById('nonreboot').checked) {
        current_attack_percent = current_attack_percent + parseInt(document.getElementById('bonusAttPerc').value);
    }

    //Determine Damage Output
    var currentBossDefMultiplier = getBossDefMultiplier(current_ied_percent)
    var currentHitDamage = getHitDamage(current_boss_percent, current_attack_percent, current_damage_percent)

    var currentOutput = currentBossDefMultiplier * currentHitDamage;

    //console.log('ied with Current WSE = ' + current_ied_percent);
    //console.log('attk % with current WSE = ' + current_attack_percent);
    //console.log('boss def multiplier with current WSE = ' + currentBossDefMultiplier);

    //WSE Potentials
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

    //Current Stats Without WSE
    var withoutWSEStats = removePotentialsFromStats(potential_list, current_ied_percent, current_attack_percent, current_boss_percent, current_damage_percent)

    var stripped_ied_percent = withoutWSEStats.stripped_ied_percent;
    var stripped_attack_percent = withoutWSEStats.stripped_attack_percent;
    var stripped_boss_percent = withoutWSEStats.stripped_boss_percent;
    var stripped_damage_percent = withoutWSEStats.stripped_damage_percent;

    //strip bonus pots
    if (document.getElementById('nonreboot').checked && document.getElementById('compare').checked) {
        var b_wep_line_1 = document.getElementById('b_wline1').value;
        var b_wep_line_2 = document.getElementById('b_wline2').value;
        var b_wep_line_3 = document.getElementById('b_wline3').value;

        var b_sec_line_1 = document.getElementById('b_sline1').value;
        var b_sec_line_2 = document.getElementById('b_sline2').value;
        var b_sec_line_3 = document.getElementById('b_sline3').value;

        var b_emb_line_1 = document.getElementById('b_eline1').value;
        var b_emb_line_2 = document.getElementById('b_eline2').value;
        var b_emb_line_3 = document.getElementById('b_eline3').value;

        //here
        //if Kanna and secondary != ATT, set equal to 'none' isATT
        if (maple_class == "Kanna") {
            if (b_sec_line_1 != '6att' && b_sec_line_1 != '7att' && b_sec_line_1 != '9att' && b_sec_line_1 != '10att' && b_sec_line_1 != '12att' && b_sec_line_1 != '13att') {
                b_sec_line_1 = 'none';
            }
            if (b_sec_line_2 != '6att' && b_sec_line_2 != '7att' && b_sec_line_2 != '9att' && b_sec_line_2 != '10att' && b_sec_line_2 != '12att' && b_sec_line_2 != '13att') {
                b_sec_line_2 = 'none';
            }
            if (b_sec_line_3 != '6att' && b_sec_line_3 != '7att' && b_sec_line_3 != '9att' && b_sec_line_3 != '10att' && b_sec_line_3 != '12att' && b_sec_line_3 != '13att') {
                b_sec_line_3 = 'none';
            }
        }

        var b_potential_list = [b_wep_line_1, b_wep_line_2, b_wep_line_3, b_sec_line_1, b_sec_line_2, b_sec_line_3, b_emb_line_1, b_emb_line_2, b_emb_line_3];

        var b_withoutWSEStats = removePotentialsFromStats(b_potential_list, stripped_ied_percent, stripped_attack_percent, stripped_boss_percent, stripped_damage_percent)

        stripped_ied_percent = b_withoutWSEStats.stripped_ied_percent;
        stripped_attack_percent = b_withoutWSEStats.stripped_attack_percent;
        stripped_boss_percent = b_withoutWSEStats.stripped_boss_percent;
        stripped_damage_percent = b_withoutWSEStats.stripped_damage_percent;
    }

    if (stripped_ied_percent < 0 || stripped_attack_percent < 0 || stripped_boss_percent < 0 || stripped_damage_percent < 0) {
        //send an error message
        document.getElementById('resultSection').hidden = false;
        document.getElementById('result').innerHTML = `
                There has been an error. Please make sure you have correctly inputted your stats as they are shown within the stat window. Furthermore, ensure that you have entered your Current WSE correctly.
            `;
        window.scrollTo(0, document.body.scrollHeight);
        return false
    }

    if (document.getElementById('compare').checked == true) {
        //New WSE Potentials
        var new_wep_line_1 = document.getElementById('new_wline1').value;
        var new_wep_line_2 = document.getElementById('new_wline2').value;
        var new_wep_line_3 = document.getElementById('new_wline3').value;

        var new_sec_line_1 = document.getElementById('new_sline1').value;
        var new_sec_line_2 = document.getElementById('new_sline2').value;
        var new_sec_line_3 = document.getElementById('new_sline3').value;

        var new_emb_line_1 = document.getElementById('new_eline1').value;
        var new_emb_line_2 = document.getElementById('new_eline2').value;
        var new_emb_line_3 = document.getElementById('new_eline3').value;

        var new_potential_list = [new_wep_line_1, new_wep_line_2, new_wep_line_3, new_sec_line_1, new_sec_line_2, new_sec_line_3, new_emb_line_1, new_emb_line_2, new_emb_line_3];

        var withNewWSEStats = AddPotentialsToStats(new_potential_list, stripped_ied_percent, stripped_attack_percent, stripped_boss_percent, stripped_damage_percent);
        var new_ied_percent = withNewWSEStats.new_ied_percent;
        var new_attack_percent = withNewWSEStats.new_attack_percent;
        var new_boss_percent = withNewWSEStats.new_boss_percent;
        var new_damage_percent = withNewWSEStats.new_damage_percent;

        //check if non-reboot
        if (document.getElementById('nonreboot').checked) {
            var b_new_wep_line_1 = document.getElementById('b_new_wline1').value;
            var b_new_wep_line_2 = document.getElementById('b_new_wline2').value;
            var b_new_wep_line_3 = document.getElementById('b_new_wline3').value;

            var b_new_sec_line_1 = document.getElementById('b_new_sline1').value;
            var b_new_sec_line_2 = document.getElementById('b_new_sline2').value;
            var b_new_sec_line_3 = document.getElementById('b_new_sline3').value;

            var b_new_emb_line_1 = document.getElementById('b_new_eline1').value;
            var b_new_emb_line_2 = document.getElementById('b_new_eline2').value;
            var b_new_emb_line_3 = document.getElementById('b_new_eline3').value;

            if (maple_class == "Kanna") {
                if (b_new_sec_line_1 != '6att' && b_new_sec_line_1 != '7att' && b_new_sec_line_1 != '9att' && b_new_sec_line_1 != '10att' && b_new_sec_line_1 != '12att' && b_new_sec_line_1 != '13att') {
                    b_new_sec_line_1 = 'none';
                }
                if (b_new_sec_line_2 != '6att' && b_new_sec_line_2 != '7att' && b_new_sec_line_2 != '9att' && b_new_sec_line_2 != '10att' && b_new_sec_line_2 != '12att' && b_new_sec_line_2 != '13att') {
                    b_new_sec_line_2 = 'none';
                }
                if (b_new_sec_line_3 != '6att' && b_new_sec_line_3 != '7att' && b_new_sec_line_3 != '9att' && b_new_sec_line_3 != '10att' && b_new_sec_line_3 != '12att' && b_new_sec_line_3 != '13att') {
                    b_new_sec_line_3 = 'none';
                }
            }

            var b_new_potential_list = [b_new_wep_line_1, b_new_wep_line_2, b_new_wep_line_3, b_new_sec_line_1, b_new_sec_line_2, b_new_sec_line_3, b_new_emb_line_1, b_new_emb_line_2, b_new_emb_line_3];

            var b_withNewWSEStats = AddPotentialsToStats(b_new_potential_list, new_ied_percent, new_attack_percent, new_boss_percent, new_damage_percent);
            new_ied_percent = b_withNewWSEStats.new_ied_percent;
            new_attack_percent = b_withNewWSEStats.new_attack_percent;
            new_boss_percent = b_withNewWSEStats.new_boss_percent;
            new_damage_percent = b_withNewWSEStats.new_damage_percent;
        }

        //New Dmg Output
        var newBossDefMultiplier = getBossDefMultiplier(new_ied_percent)
        var newHitDamage = getHitDamage(new_boss_percent, new_attack_percent, new_damage_percent)

        var newOutput = newBossDefMultiplier * newHitDamage;

        //console.log('ied with New WSE = ' + new_ied_percent);
        //console.log('attk % with new WSE = ' + new_attack_percent);
        //console.log('boss def multiplier with new WSE = ' + newBossDefMultiplier);

        var dmgRatio = newOutput / currentOutput;
        //console.log(dmgRatio)
        var dmgIncrease = ((dmgRatio - 1) * 100).toFixed(2);

        if (dmgRatio == 1 || dmgIncrease == '0.00') {
            document.getElementById('resultSection').hidden = false;
            document.getElementById('result').innerHTML = `
                Hit Damage on Bosses will <strong>not change</strong>.
            `;
            window.scrollTo(0, document.body.scrollHeight);
        }
        else if (dmgRatio > 1) {
            var output_increase = ((dmgRatio - 1) * 100).toFixed(2);
            document.getElementById('resultSection').hidden = false;
            document.getElementById('result').innerHTML = `
                Hit Damage on Bosses will <span style='color:green'><strong>increase</strong></span> by ${output_increase}%.
            `;
            window.scrollTo(0, document.body.scrollHeight);
        }
        else if (dmgRatio < 1) {
            var output_decrease = ((1 - dmgRatio) * 100).toFixed(2);
            document.getElementById('resultSection').hidden = false;
            document.getElementById('result').innerHTML = `
                Hit Damage on Bosses will <span style='color:red'><strong>decrease</strong></span> by ${output_decrease}%.
            `;
            window.scrollTo(0, document.body.scrollHeight);
        }
        saveToLocalStorage();

    }
    if (document.getElementById('optimize').checked == true) {
        var weapon_level = 160;
        var secondary_level = 160;
        var emblem_level = 160;

        //get item levels
        if (document.getElementById('wlevel').value == 'lesser160') {
            //console.log('weapon is less than 160');
            var weapon_level = 150;
        }
        if (document.getElementById('slevel').value == 'lesser160') {
            //console.log('secondary is less than 160');
            var secondary_level = 150;
        }
        if (document.getElementById('elevel').value == 'lesser160') {
            //console.log('emblem is less than 160');
            var emblem_level = 150;
        }


        var results = determineOptimizedWSE(weapon_level, secondary_level, emblem_level, stripped_ied_percent, stripped_attack_percent, stripped_boss_percent, stripped_damage_percent, maple_class);
        var optimal_lines = results.optimal_lines;
        var optimal_output = results.highest_output;

        //console.log(optimal_lines)

        //update UI with optimized Lines
        document.getElementById('new_wline1').value = optimal_lines[0][0];
        document.getElementById('new_wline2').value = optimal_lines[0][1];
        document.getElementById('new_wline3').value = optimal_lines[0][2];

        document.getElementById('new_sline1').value = optimal_lines[1][0];
        document.getElementById('new_sline2').value = optimal_lines[1][1];
        document.getElementById('new_sline3').value = optimal_lines[1][2];

        document.getElementById('new_eline1').value = optimal_lines[2][0];
        document.getElementById('new_eline2').value = optimal_lines[2][1];
        document.getElementById('new_eline3').value = optimal_lines[2][2];

        //determine damage increase
        var dmgRatio = optimal_output / currentOutput;
        var dmgIncrease = ((dmgRatio - 1) * 100).toFixed(2);

        if (dmgRatio == 1 || dmgIncrease == '0.00') {
            document.getElementById('resultSection').hidden = false;
            document.getElementById('result').innerHTML = `
                You already obtain a fully optimized WSE!
            `;
            window.scrollTo(0, document.body.scrollHeight);
        }

        else if (dmgRatio > 1) {
            var output_increase = ((dmgRatio - 1) * 100).toFixed(2);
            document.getElementById('resultSection').hidden = false;
            document.getElementById('result').innerHTML = `
                Hit Damage on Bosses will <span style='color:green !important'><strong>increase</strong></span> by ${output_increase}%.
            `;
            window.scrollTo(0, document.body.scrollHeight);
        }

        else if (dmgRatio < 1) {
            var output_decrease = ((1 - dmgRatio) * 100).toFixed(2);
            document.getElementById('resultSection').hidden = false;
            document.getElementById('result').innerHTML = `
                You already obtain a fully optimized WSE!
            `;

            document.getElementById('new_wline1').value = document.getElementById('wline1').value
            document.getElementById('new_wline2').value = document.getElementById('wline2').value
            document.getElementById('new_wline3').value = document.getElementById('wline3').value

            document.getElementById('new_sline1').value = document.getElementById('sline1').value
            document.getElementById('new_sline2').value = document.getElementById('sline2').value
            document.getElementById('new_sline3').value = document.getElementById('sline3').value

            document.getElementById('new_eline1').value = document.getElementById('eline1').value
            document.getElementById('new_eline2').value = document.getElementById('eline2').value
            document.getElementById('new_eline3').value = document.getElementById('eline3').value

            window.scrollTo(0, document.body.scrollHeight);
        }
        saveToLocalStorage();

        return false
    }
}