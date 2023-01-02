function updateAttackTierOptions(flame_type, flame_advantage) {
    // Tier 1 and 2 are skipped, so index 1 is tier 3.
    let maxTierIndex = 2;
    if (flame_type == 'eternal') {
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

function onItemTypeChange() {
    var maple_class = document.getElementById("maple_class").value
    var item_type = document.getElementById('item_type').value
    var flame_type = document.getElementById('flame_type').value
    var flame_advantage = document.getElementById('flame-advantaged').checked
    if (item_type == 'armor') {
        if (maple_class == "da") {
            document.getElementById("armor_desired_stats").hidden = true

            document.getElementById("da_desired_stats").hidden = false

            if (flame_type == "powerful") {
                $('#da_attack_tier').empty()
                $('#hp_tier').empty()

                $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
                $('#da_attack_tier').append("<option value=1>Tier 1+</option>")
                $('#da_attack_tier').append("<option value=2>Tier 2+</option>")
                $('#da_attack_tier').append("<option value=3>Tier 3+</option>")
                $('#da_attack_tier').append("<option value=4>Tier 4+</option>")

                $('#hp_tier').append("<option value=0>Tier 0+</option>")
                $('#hp_tier').append("<option value=1>Tier 1+</option>")
                $('#hp_tier').append("<option value=2>Tier 2+</option>")
                $('#hp_tier').append("<option value=3>Tier 3+</option>")
                $('#hp_tier').append("<option value=4>Tier 4+</option>")
            } else {
                $('#da_attack_tier').empty()
                $('#hp_tier').empty()

                $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
                $('#da_attack_tier').append("<option value=2>Tier 2+</option>")
                $('#da_attack_tier').append("<option value=3>Tier 3+</option>")
                $('#da_attack_tier').append("<option value=4>Tier 4+</option>")
                $('#da_attack_tier').append("<option value=5>Tier 5+</option>")

                $('#hp_tier').append("<option value=0>Tier 0+</option>")
                $('#hp_tier').append("<option value=2>Tier 2+</option>")
                $('#hp_tier').append("<option value=3>Tier 3+</option>")
                $('#hp_tier').append("<option value=4>Tier 4+</option>")
                $('#hp_tier').append("<option value=5>Tier 5+</option>")
            }
        } else {
            document.getElementById("armor_desired_stats").hidden = false

            document.getElementById("da_desired_stats").hidden = true
        }
        document.getElementById('weapon_desired_stats').hidden = true;
        document.getElementById('statequivalences_title').hidden = false;
        document.getElementById('statequivalences').hidden = false;
        document.getElementById('item_level_div').hidden = false;
    } else {
        document.getElementById('weapon_desired_stats').hidden = false;
        document.getElementById('armor_desired_stats').hidden = true;
        document.getElementById('statequivalences').hidden = true;
        document.getElementById('statequivalences_title').hidden = true;
        document.getElementById('item_level_div').hidden = true;

        updateAttackTierOptions(flame_type, flame_advantage);
    }
    if (document.getElementById("item_type").value == "armor") {
        updateItemLevels(maple_class);
        if (maple_class == "kanna") {
            document.getElementById('hp_stat_div').hidden = false
            document.getElementById('luk_stat_div').hidden = false
            document.getElementById("statequivalences").hidden = false
            document.getElementById("statequivalences_title").hidden = false

            document.getElementById('str_stat_div').hidden = true
            document.getElementById('dex_stat_div').hidden = true
            document.getElementById('secondary_stat_div').hidden = true

            document.getElementById("all_stat").value = 8
            document.getElementById("attack").value = 3

        } else if (maple_class == "xenon") {
            document.getElementById('hp_stat_div').hidden = true
            document.getElementById('secondary_stat_div').hidden = true
            document.getElementById('luk_stat_div').hidden = true
            document.getElementById('str_stat_div').hidden = true
            document.getElementById('dex_stat_div').hidden = true

            document.getElementById("statequivalences").hidden = false
            document.getElementById("statequivalences_title").hidden = false

            document.getElementById("desired_stat_armor").value = 200
            document.getElementById("all_stat").value = 19
            document.getElementById("attack").value = 8
        } else if (maple_class == "db" || maple_class == "shadower" || maple_class == "cadena") {
            document.getElementById('hp_stat_div').hidden = true
            document.getElementById('luk_stat_div').hidden = true
            document.getElementById('secondary_stat_div').hidden = true

            document.getElementById('str_stat_div').hidden = false
            document.getElementById('dex_stat_div').hidden = false
            document.getElementById("statequivalences").hidden = false
            document.getElementById("statequivalences_title").hidden = false

            document.getElementById("all_stat").value = 8
            document.getElementById("attack").value = 3
        } else if (maple_class == "other") {
            document.getElementById('hp_stat_div').hidden = true
            document.getElementById('luk_stat_div').hidden = true
            document.getElementById('str_stat_div').hidden = true
            document.getElementById('dex_stat_div').hidden = true

            document.getElementById('secondary_stat_div').hidden = false
            document.getElementById("statequivalences").hidden = false
            document.getElementById("statequivalences_title").hidden = false

            document.getElementById("all_stat").value = 8
            document.getElementById("attack").value = 3
        } else if (maple_class == "da") {
            document.getElementById("statequivalences").hidden = true
            document.getElementById("statequivalences_title").hidden = true

            document.getElementById("da_desired_stats").hidden = false

            if (flame_type == 'powerful') {
                if (flame_advantage) {
                    $('#da_attack_tier').empty()
                    $('#hp_tier').empty()

                    $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
                    $('#da_attack_tier').append("<option value=3>Tier 3+</option>")
                    $('#da_attack_tier').append("<option value=4>Tier 4+</option>")
                    $('#da_attack_tier').append("<option value=5>Tier 5+</option>")
                    $('#da_attack_tier').append("<option value=6>Tier 6</option>")

                    $('#hp_tier').append("<option value=0>Tier 0+</option>")
                    $('#hp_tier').append("<option value=3>Tier 3+</option>")
                    $('#hp_tier').append("<option value=4>Tier 4+</option>")
                    $('#hp_tier').append("<option value=5>Tier 5+</option>")
                    $('#hp_tier').append("<option value=6>Tier 6</option>")
                } else {
                    $('#da_attack_tier').empty()
                    $('#hp_tier').empty()

                    $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
                    $('#da_attack_tier').append("<option value=1>Tier 1+</option>")
                    $('#da_attack_tier').append("<option value=2>Tier 2+</option>")
                    $('#da_attack_tier').append("<option value=3>Tier 3+</option>")
                    $('#da_attack_tier').append("<option value=4>Tier 4</option>")

                    $('#hp_tier').append("<option value=0>Tier 0+</option>")
                    $('#hp_tier').append("<option value=1>Tier 1+</option>")
                    $('#hp_tier').append("<option value=2>Tier 2+</option>")
                    $('#hp_tier').append("<option value=3>Tier 3+</option>")
                    $('#hp_tier').append("<option value=4>Tier 4</option>")
                }
            }
            if (flame_type == 'eternal') {
                if (maple_class == 'da') {
                    if (flame_advantage) {
                        $('#da_attack_tier').empty()
                        $('#hp_tier').empty()

                        $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
                        $('#da_attack_tier').append("<option value=4>Tier 4+</option>")
                        $('#da_attack_tier').append("<option value=5>Tier 5+</option>")
                        $('#da_attack_tier').append("<option value=6>Tier 6+</option>")
                        $('#da_attack_tier').append("<option value=7>Tier 7</option>")

                        $('#hp_tier').append("<option value=0>Tier 0+</option>")
                        $('#hp_tier').append("<option value=4>Tier 4+</option>")
                        $('#hp_tier').append("<option value=5>Tier 5+</option>")
                        $('#hp_tier').append("<option value=6>Tier 6+</option>")
                        $('#hp_tier').append("<option value=7>Tier 7</option>")
                    } else {
                        $('#da_attack_tier').empty()
                        $('#hp_tier').empty()

                        $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
                        $('#da_attack_tier').append("<option value=2>Tier 2+</option>")
                        $('#da_attack_tier').append("<option value=3>Tier 3+</option>")
                        $('#da_attack_tier').append("<option value=4>Tier 4+</option>")
                        $('#da_attack_tier').append("<option value=5>Tier 5</option>")

                        $('#hp_tier').append("<option value=0>Tier 0+</option>")
                        $('#hp_tier').append("<option value=2>Tier 2+</option>")
                        $('#hp_tier').append("<option value=3>Tier 3+</option>")
                        $('#hp_tier').append("<option value=4>Tier 4+</option>")
                        $('#hp_tier').append("<option value=5>Tier 5</option>")
                    }

                }
            }

        }
    } else {
        document.getElementById("da_desired_stats").hidden = true
    }
}

function onClassChange() {
    var maple_class = document.getElementById("maple_class").value
    var flame_type = document.getElementById("flame_type").value
    var flame_advantage = document.getElementById('flame-advantaged')

    if (document.getElementById("item_type").value == "armor") {
        updateItemLevels(maple_class);
        if (maple_class == "da") {
            document.getElementById("armor_desired_stats").hidden = true

            document.getElementById("da_desired_stats").hidden = false
            if (flame_type == 'powerful') {
                if (flame_advantage) {
                    $('#da_attack_tier').empty()
                    $('#hp_tier').empty()

                    $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
                    $('#da_attack_tier').append("<option value=3>Tier 3+</option>")
                    $('#da_attack_tier').append("<option value=4>Tier 4+</option>")
                    $('#da_attack_tier').append("<option value=5>Tier 5+</option>")
                    $('#da_attack_tier').append("<option value=6>Tier 6</option>")

                    $('#hp_tier').append("<option value=0>Tier 0+</option>")
                    $('#hp_tier').append("<option value=3>Tier 3+</option>")
                    $('#hp_tier').append("<option value=4>Tier 4+</option>")
                    $('#hp_tier').append("<option value=5>Tier 5+</option>")
                    $('#hp_tier').append("<option value=6>Tier 6</option>")
                } else {
                    $('#da_attack_tier').empty()
                    $('#hp_tier').empty()

                    $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
                    $('#da_attack_tier').append("<option value=1>Tier 1+</option>")
                    $('#da_attack_tier').append("<option value=2>Tier 2+</option>")
                    $('#da_attack_tier').append("<option value=3>Tier 3+</option>")
                    $('#da_attack_tier').append("<option value=4>Tier 4</option>")

                    $('#hp_tier').append("<option value=0>Tier 0+</option>")
                    $('#hp_tier').append("<option value=1>Tier 1+</option>")
                    $('#hp_tier').append("<option value=2>Tier 2+</option>")
                    $('#hp_tier').append("<option value=3>Tier 3+</option>")
                    $('#hp_tier').append("<option value=4>Tier 4</option>")
                }
            }
            if (flame_type == 'eternal') {
                if (maple_class == 'da') {
                    if (flame_advantage) {
                        $('#da_attack_tier').empty()
                        $('#hp_tier').empty()

                        $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
                        $('#da_attack_tier').append("<option value=4>Tier 4+</option>")
                        $('#da_attack_tier').append("<option value=5>Tier 5+</option>")
                        $('#da_attack_tier').append("<option value=6>Tier 6+</option>")
                        $('#da_attack_tier').append("<option value=7>Tier 7</option>")

                        $('#hp_tier').append("<option value=0>Tier 0+</option>")
                        $('#hp_tier').append("<option value=4>Tier 4+</option>")
                        $('#hp_tier').append("<option value=5>Tier 5+</option>")
                        $('#hp_tier').append("<option value=6>Tier 6+</option>")
                        $('#hp_tier').append("<option value=7>Tier 7</option>")
                    } else {
                        $('#da_attack_tier').empty()
                        $('#hp_tier').empty()

                        $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
                        $('#da_attack_tier').append("<option value=2>Tier 2+</option>")
                        $('#da_attack_tier').append("<option value=3>Tier 3+</option>")
                        $('#da_attack_tier').append("<option value=4>Tier 4+</option>")
                        $('#da_attack_tier').append("<option value=5>Tier 5</option>")

                        $('#hp_tier').append("<option value=0>Tier 0+</option>")
                        $('#hp_tier').append("<option value=2>Tier 2+</option>")
                        $('#hp_tier').append("<option value=3>Tier 3+</option>")
                        $('#hp_tier').append("<option value=4>Tier 4+</option>")
                        $('#hp_tier').append("<option value=5>Tier 5</option>")
                    }

                }
            }
        } else {
            document.getElementById("armor_desired_stats").hidden = false

            document.getElementById("da_desired_stats").hidden = true
        }
        if (maple_class == "kanna") {
            document.getElementById('hp_stat_div').hidden = false
            document.getElementById('luk_stat_div').hidden = false
            document.getElementById("statequivalences").hidden = false
            document.getElementById("statequivalences_title").hidden = false

            document.getElementById('str_stat_div').hidden = true
            document.getElementById('dex_stat_div').hidden = true
            document.getElementById('secondary_stat_div').hidden = true

            document.getElementById("all_stat").value = 8
            document.getElementById("attack").value = 3

        } else if (maple_class == "xenon") {
            document.getElementById('hp_stat_div').hidden = true
            document.getElementById('secondary_stat_div').hidden = true
            document.getElementById('luk_stat_div').hidden = true
            document.getElementById('str_stat_div').hidden = true
            document.getElementById('dex_stat_div').hidden = true

            document.getElementById("statequivalences").hidden = false
            document.getElementById("statequivalences_title").hidden = false

            document.getElementById("desired_stat_armor").value = 200
            document.getElementById("all_stat").value = 19
            document.getElementById("attack").value = 8
        } else if (maple_class == "db" || maple_class == "shadower" || maple_class == "cadena") {
            document.getElementById('hp_stat_div').hidden = true
            document.getElementById('luk_stat_div').hidden = true
            document.getElementById('secondary_stat_div').hidden = true

            document.getElementById('str_stat_div').hidden = false
            document.getElementById('dex_stat_div').hidden = false
            document.getElementById("statequivalences").hidden = false
            document.getElementById("statequivalences_title").hidden = false
            document.getElementById("all_stat").value = 8
            document.getElementById("attack").value = 3
        } else if (maple_class == "other") {
            document.getElementById('hp_stat_div').hidden = true
            document.getElementById('luk_stat_div').hidden = true
            document.getElementById('str_stat_div').hidden = true
            document.getElementById('dex_stat_div').hidden = true

            document.getElementById('secondary_stat_div').hidden = false
            document.getElementById("statequivalences").hidden = false
            document.getElementById("statequivalences_title").hidden = false
            document.getElementById("all_stat").value = 8
            document.getElementById("attack").value = 3
        } else if (maple_class == "da") {
            document.getElementById("statequivalences").hidden = true
            document.getElementById("statequivalences_title").hidden = true
            document.getElementById("armor_desired_stats").hidden = true

            document.getElementById("da_desired_stats").hidden = false
        }
    }
}

function onFlameAdvantagedChange() {
    var flame_type = document.getElementById('flame_type').value
    var item_type = document.getElementById('item_type').value
    var maple_class = document.getElementById('maple_class').value
    var flame_advantage = document.getElementById('flame-advantaged').checked
    if (item_type == 'weapon') {
        updateAttackTierOptions(flame_type, flame_advantage);
    }
    if (flame_type == 'powerful' && maple_class == "da" && item_type == 'armor') {
        if (flame_advantage) {
            $('#da_attack_tier').empty()
            $('#hp_tier').empty()

            $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
            $('#da_attack_tier').append("<option value=3>Tier 3+</option>")
            $('#da_attack_tier').append("<option value=4>Tier 4+</option>")
            $('#da_attack_tier').append("<option value=5>Tier 5+</option>")
            $('#da_attack_tier').append("<option value=6>Tier 6</option>")

            $('#hp_tier').append("<option value=0>Tier 0+</option>")
            $('#hp_tier').append("<option value=3>Tier 3+</option>")
            $('#hp_tier').append("<option value=4>Tier 4+</option>")
            $('#hp_tier').append("<option value=5>Tier 5+</option>")
            $('#hp_tier').append("<option value=6>Tier 6</option>")
        } else {
            $('#da_attack_tier').empty()
            $('#hp_tier').empty()

            $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
            $('#da_attack_tier').append("<option value=1>Tier 1+</option>")
            $('#da_attack_tier').append("<option value=2>Tier 2+</option>")
            $('#da_attack_tier').append("<option value=3>Tier 3+</option>")
            $('#da_attack_tier').append("<option value=4>Tier 4</option>")

            $('#hp_tier').append("<option value=0>Tier 0+</option>")
            $('#hp_tier').append("<option value=1>Tier 1+</option>")
            $('#hp_tier').append("<option value=2>Tier 2+</option>")
            $('#hp_tier').append("<option value=3>Tier 3+</option>")
            $('#hp_tier').append("<option value=4>Tier 4</option>")
        }
    }
    if (flame_type == 'eternal' && maple_class == "da" && item_type == 'armor') {
        if (maple_class == 'da') {
            if (flame_advantage) {
                $('#da_attack_tier').empty()
                $('#hp_tier').empty()

                $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
                $('#da_attack_tier').append("<option value=4>Tier 4+</option>")
                $('#da_attack_tier').append("<option value=5>Tier 5+</option>")
                $('#da_attack_tier').append("<option value=6>Tier 6+</option>")
                $('#da_attack_tier').append("<option value=7>Tier 7</option>")

                $('#hp_tier').append("<option value=0>Tier 0+</option>")
                $('#hp_tier').append("<option value=4>Tier 4+</option>")
                $('#hp_tier').append("<option value=5>Tier 5+</option>")
                $('#hp_tier').append("<option value=6>Tier 6+</option>")
                $('#hp_tier').append("<option value=7>Tier 7</option>")
            } else {
                $('#da_attack_tier').empty()
                $('#hp_tier').empty()

                $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
                $('#da_attack_tier').append("<option value=2>Tier 2+</option>")
                $('#da_attack_tier').append("<option value=3>Tier 3+</option>")
                $('#da_attack_tier').append("<option value=4>Tier 4+</option>")
                $('#da_attack_tier').append("<option value=5>Tier 5</option>")

                $('#hp_tier').append("<option value=0>Tier 0+</option>")
                $('#hp_tier').append("<option value=2>Tier 2+</option>")
                $('#hp_tier').append("<option value=3>Tier 3+</option>")
                $('#hp_tier').append("<option value=4>Tier 4+</option>")
                $('#hp_tier').append("<option value=5>Tier 5</option>")
            }

        }
    }
}

function onFlameTypeChange() {
    var flame_type = document.getElementById('flame_type').value
    var item_type = document.getElementById('item_type').value
    var maple_class = document.getElementById('maple_class').value
    var flame_advantage = document.getElementById('flame-advantaged').checked
    if (item_type == 'weapon') {
        updateAttackTierOptions(flame_type, flame_advantage);
    }
    if (flame_type == 'powerful') {
        if (maple_class == 'da') {
            if (flame_advantage) {
                $('#da_attack_tier').empty()
                $('#hp_tier').empty()

                $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
                $('#da_attack_tier').append("<option value=3>Tier 3+</option>")
                $('#da_attack_tier').append("<option value=4>Tier 4+</option>")
                $('#da_attack_tier').append("<option value=5>Tier 5+</option>")
                $('#da_attack_tier').append("<option value=6>Tier 6</option>")

                $('#hp_tier').append("<option value=0>Tier 0+</option>")
                $('#hp_tier').append("<option value=3>Tier 3+</option>")
                $('#hp_tier').append("<option value=4>Tier 4+</option>")
                $('#hp_tier').append("<option value=5>Tier 5+</option>")
                $('#hp_tier').append("<option value=6>Tier 6</option>")
            } else {
                $('#da_attack_tier').empty()
                $('#hp_tier').empty()

                $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
                $('#da_attack_tier').append("<option value=1>Tier 1+</option>")
                $('#da_attack_tier').append("<option value=2>Tier 2+</option>")
                $('#da_attack_tier').append("<option value=3>Tier 3+</option>")
                $('#da_attack_tier').append("<option value=4>Tier 4</option>")

                $('#hp_tier').append("<option value=0>Tier 0+</option>")
                $('#hp_tier').append("<option value=1>Tier 1+</option>")
                $('#hp_tier').append("<option value=2>Tier 2+</option>")
                $('#hp_tier').append("<option value=3>Tier 3+</option>")
                $('#hp_tier').append("<option value=4>Tier 4</option>")
            }

        }
    } else {
        if (maple_class == 'da') {
            if (flame_advantage) {
                $('#da_attack_tier').empty()
                $('#hp_tier').empty()

                $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
                $('#da_attack_tier').append("<option value=4>Tier 4+</option>")
                $('#da_attack_tier').append("<option value=5>Tier 5+</option>")
                $('#da_attack_tier').append("<option value=6>Tier 6+</option>")
                $('#da_attack_tier').append("<option value=7>Tier 7</option>")

                $('#hp_tier').append("<option value=0>Tier 0+</option>")
                $('#hp_tier').append("<option value=4>Tier 4+</option>")
                $('#hp_tier').append("<option value=5>Tier 5+</option>")
                $('#hp_tier').append("<option value=6>Tier 6+</option>")
                $('#hp_tier').append("<option value=7>Tier 7</option>")
            } else {
                $('#da_attack_tier').empty()
                $('#hp_tier').empty()

                $('#da_attack_tier').append("<option value=0>Tier 0+</option>")
                $('#da_attack_tier').append("<option value=2>Tier 2+</option>")
                $('#da_attack_tier').append("<option value=3>Tier 3+</option>")
                $('#da_attack_tier').append("<option value=4>Tier 4+</option>")
                $('#da_attack_tier').append("<option value=5>Tier 5</option>")

                $('#hp_tier').append("<option value=0>Tier 0+</option>")
                $('#hp_tier').append("<option value=2>Tier 2+</option>")
                $('#hp_tier').append("<option value=3>Tier 3+</option>")
                $('#hp_tier').append("<option value=4>Tier 4+</option>")
                $('#hp_tier').append("<option value=5>Tier 5</option>")
            }

        }
    }
}