function getUpperActualDamage(attack_percent) {
    var upperActualDamage = attack_percent / 100
    return upperActualDamage
}

function getUpperShownDamage(upperActualDamage, damage_percent) {
    var upperShownDamage = Math.floor(upperActualDamage * (1 + damage_percent / 100))
    if (upperShownDamage > 99999999) {
        return 99999999
    } else {
        return upperShownDamage
    }
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
function getPassiveIEDandATTPercent(maple_class) {
    var PassiveIEDandATTPercent = {
        'Adele': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Angelic Buster': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Aran': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Ark': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Battle Mage': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Bishop': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Blaster': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Blaze Wizard': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Beast Tamer': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Bowmaster': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Buccaneer': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Cadena': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Cannoner': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Corsair': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Dark Knight': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Dawn Warrior': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Demon Avenger': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Demon Slayer': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Dual Blade': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Evan': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Fire Poison': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Hayato': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Hero': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Hoyoung': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Ice Lightning': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Illium': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Jett': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Kaiser': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Kanna': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Kinesis': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Luminous': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Marksmen': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Mechanic': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Mercedes': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Mihile': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Night Lord': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Night Walker': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Paladin': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Pathfinder': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Phantom': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Shade': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Shadower': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Thunder Breaker': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Wild Hunter': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Wind Archer': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Xenon': {
            'attPercent': 4,
            'iedPercent': []
        },
        'Zero': {
            'attPercent': 4,
            'iedPercent': []
        },
    }
    return PassiveIEDandATTPercent[maple_class]
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
    var maple_class = document.getElementById('class').value;
    var attack_percent = document.getElementById('attack_percent').value;
    var boss_percent = parseInt(document.getElementById('boss_percent').value);
    var ied_percent = document.getElementById('ied_percent').value;
    var damage_percent = parseInt(document.getElementById('damage_percent').value);

    // function variables
    var total_damage_percent = boss_percent + damage_percent;
    var upperActualDamage = getUpperActualDamage(weapon_type, maple_class, main_stat_amount, secondary_stat_amount, level, attack_percent)
    var upperShownDamage = getUpperShownDamage(upperActualDamage, damage_percent, final_damage_percent);
    var hitDamage = getHitDamage(upperShownDamage, boss_percent, total_damage_percent);
    var bossDefMultipler = getBossDefMultiplier(ied_percent);

    //test form variables
    //console.log('Your main class is ' + maple_class);
    //console.log('Your damage percent is: ' + damage_percent);
    //console.log('Your final damage percent is: ' + final_damage_percent);

    //test function variables
    //console.log('Your upperActualDamage is: ' + upperActualDamage);
    //console.log('Your upperShownDamage is: ' + upperShownDamage);
    //console.log('Your total damage percent is: ' + total_damage_percent);
    //console.log('Your Hit Damage On Bosses is: ' + hitDamage);
    //console.log('Your Boss Def Multipler is: ' + bossDefMultipler);
}