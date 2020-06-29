//need to include case where maple_class == 'Xenon'
function getStatValue(maple_class, main_stat_amount, secondary_stat_amount, level) {
    var statValue = 4 * main_stat_amount + secondary_stat_amount

    if (maple_class == 'Demon Avenger') {
        var pureHP = 545 + 90 * level
        var statValue = Math.floor(pureHP / 3.5) + 0.8 * Math.floor((main_stat_amount - pureHP) / 3.5) + secondary_stat_amount
    }
    return statValue
}

function getUpperActualDamage(weapon_type, maple_class, main_stat_amount, secondary_stat_amount, level, attack_percent) {
    //Att amount is being omitted for ease of use. Ratios will still be the same.
    var multiplier = getMultiplier(weapon_type, maple_class)
    var statValue = getStatValue(maple_class, main_stat_amount, secondary_stat_amount, level)
    var upperActualDamage = multiplier * statValue * attack_percent / 100
    return upperActualDamage
}

function getUpperShownDamage(upperActualDamage, damage_percent, final_damage_percent) {
    var upperShownDamage = Math.floor(upperActualDamage * (1 + damage_percent / 100) * (1 + final_damage_percent / 100))
    if (upperShownDamage > 99999999) {
        return 99999999
    } else {
        return upperShownDamage
    }
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
            'primaryStatType': 'DEX',
            'secondaryStatType': 'STR'
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
            'secondaryStatType': 'DEX + STR'
        },
        'Cannoner': {
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
            'secondaryStatType': 'DEK'
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

function getHitDamage(upperShownDamage, boss_percent, total_damage_percent) {
    var hitDamage = upperShownDamage / (1 + total_damage_percent / 100) * (1 + (total_damage_percent + boss_percent) / 100)
    return hitDamage
}

function getBossDefMultiplier(ied_percent) {
    var bossDefMultipler = 1 - (300 / 100) * (1 - (ied_percent / 100))
    return bossDefMultipler
}


//Helper Functions
function getMultiplier(weapon_type, maple_class) {
    var Multipliers = {
        'claw': 1.75,
        'arm_cannon': 1.70,
        'knuckle': 1.70,
        'soul_shooter': 1.70,
        'cannon': 1.50,
        'gun': 1.50,
        'spear': 1.49,
        'polearm': 1.49,
        'great_sword': 1.49,
        'cross_bow': 1.35,
        'fan': 1.35,
        'two_hand_sword': 1.34,
        'whip_blade': 1.3125,
        'bow': 1.30,
        'dagger': 1.30,
        'katara': 1.30,
        'dual_bowgun': 1.30,
        'cane': 1.30,
        'desperado': 1.30,
        'energy_chain': 1.30,
        'ancient_bow': 1.30,
        'ritual_fan': 1.30,
        'bladecaster': 1.30,
        'katana': 1.25,
        'one_hand_sword': 1.20,
        'one_hand_axe': 1.20,
        'one_hand_axe_hero': 1.30,
        'two-hand_axe': 1.34,
        'two_hand_axe_hero': 1.44,
        'one_hand_blunt': 1.20,
        'shining_rod': 1.20,
        'psy_limiter': 1.20,
        'lucent_gauntlet': 1.20,
        'wand_adventure': 1.20,
        'staff_adventure': 1.20,
        'wand': 1.00,
        'staff': 1.00,
    };

    if (maple_class == 'hero') {
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

//When page loaded
document.addEventListener("DOMContentLoaded", function () {
    //initialize 
    $(function () {
        $('[data-toggle="popover"]').popover()
    })
    
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })

    //event listeners
    document.getElementById("calculateButton").addEventListener("click", function () {
        optimizeWSE();
    });
    document.getElementById("wlevel").addEventListener("change", function () {
        //doStuff
    });
    document.getElementById("slevel").addEventListener("change", function () {
        //doStuff
    });
    document.getElementById("elevel").addEventListener("change", function () {
        //doStuff
    });
    document.getElementById("class").addEventListener("change", function () {
        //doStuff
    });
    document.getElementById("compare").addEventListener("change", function () {
        //compare calculator selected
    });
    document.getElementById("optimize").addEventListener("change", function () {
        //optimize calculator selected
    });
});

//Main Function
function optimizeWSE() {

    // form variables
    var weapon_type = document.getElementById('weapon_type').value;
    var maple_class = document.getElementById('class').value;
    var level = parseInt(document.getElementById('level').value);
    var attack_percent = document.getElementById('attack_percent').value;
    var boss_percent = parseInt(document.getElementById('boss_percent').value);
    var ied_percent = document.getElementById('ied_percent').value;
    var damage_percent = parseInt(document.getElementById('damage_percent').value);
    var final_damage_percent = document.getElementById('final_damage_percent').value;
    var main_stat_amount = parseInt(document.getElementById('main_stat_amount').value);
    var secondary_stat_amount = parseInt(document.getElementById('secondary_stat_amount').value);

    // function variables
    var total_damage_percent = boss_percent + damage_percent;
    var multiplier = getMultiplier(weapon_type, maple_class);
    var statValue = getStatValue(maple_class, main_stat_amount, secondary_stat_amount, level);
    var upperActualDamage = getUpperActualDamage(weapon_type, maple_class, main_stat_amount, secondary_stat_amount, level, attack_percent)
    var upperShownDamage = getUpperShownDamage(upperActualDamage, damage_percent, final_damage_percent);
    var primaryStatType = getPrimaryAndSecondaryStatType(maple_class).primaryStatType;
    var secondaryStatType = getPrimaryAndSecondaryStatType(maple_class).secondaryStatType;
    var hitDamage = getHitDamage(upperShownDamage, boss_percent, total_damage_percent);
    var bossDefMultipler = getBossDefMultiplier(ied_percent);

    //test form variables
    //console.log('Your main stat amount is: ' + main_stat_amount);
    //console.log('Your level is: ' + level);
    //console.log('Your main class is ' + maple_class);
    //console.log('Your secondary stat is ' + secondary_stat_amount);
    //console.log('Your damage percent is: ' + damage_percent);
    //console.log('Your final damage percent is: ' + final_damage_percent);

    //test function variables
    console.log('The mutliplier for ' + maple_class + "'s " + weapon_type + " is " + multiplier);
    console.log('Your statValue is: ' + statValue);
    console.log('Your upperActualDamage is: ' + upperActualDamage);
    console.log('Your upperShownDamage is: ' + upperShownDamage);
    console.log('Your primary stat type is: ' + primaryStatType);
    console.log('Your secondary stat type is: ' + secondaryStatType);
    console.log('Your total damage percent is: ' + total_damage_percent);
    console.log('Your Hit Damage On Bosses is: ' + hitDamage);
    console.log('Your Boss Def Multipler is: ' + bossDefMultipler);
}

//Testing Functions
