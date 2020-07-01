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
function determineIED(ied_percent, ied_sources){
    var i = 0;
    var new_ied = ied_percent;

    while (i < ied_sources.length){
        new_source = ied_sources[i];
        additional_ied = (new_source / 100) * (100 - new_ied);
        new_ied = new_ied + additional_ied;
        i++;
    }

    return new_ied
}

function AddPotentialsToStats(new_potential_list, stripped_ied_percent, stripped_attack_percent, stripped_boss_percent, stripped_damage_percent){
    var i = 0;
    var new_ied_percent = stripped_ied_percent;
    var new_attack_percent = stripped_attack_percent;
    var new_boss_percent = stripped_boss_percent;
    var new_damage_percent = stripped_damage_percent;

    while (i < new_potential_list.length){
        var current_potential = new_potential_list[i];

        if(current_potential == '40boss'){
            new_boss_percent = new_boss_percent + 40;
        }
        if(current_potential == '35boss'){
            new_boss_percent = new_boss_percent + 35;
        }
        if(current_potential == '30boss'){
            new_boss_percent = new_boss_percent + 30;
        }
        if(current_potential == '20boss'){
            new_boss_percent = new_boss_percent + 20;
        }
        

        if(current_potential == '13att'){
            new_attack_percent = new_attack_percent + 13;
        }
        if(current_potential == '12att'){
            new_attack_percent = new_attack_percent + 12;
        }
        if(current_potential == '10att'){
            new_attack_percent = new_attack_percent + 10;
        }
        if(current_potential == '9att'){
            new_attack_percent = new_attack_percent + 9;
        }

        if(current_potential == '13dmg'){
            new_damage_percent = new_damage_percent + 13;
        }
        if(current_potential == '12dmg'){
            new_damage_percent = new_damage_percent + 12;
        }
        if(current_potential == '10dmg'){
            new_damage_percent = new_damage_percent + 10;
        }
        if(current_potential == '9dmg'){
            new_damage_percent = new_damage_percent + 9;
        }


        if(current_potential == '40ied'){
            var current_ied = new_ied_percent;
            new_ied_percent = determineIED(current_ied, [40]);
        }
        if(current_potential == '35ied'){
            var current_ied = new_ied_percent;
            new_ied_percent = determineIED(current_ied, [35]);
        }
        if(current_potential == '30ied'){
            var current_ied = new_ied_percent;
            new_ied_percent = determineIED(current_ied, [30]);
        }
        i++;
    }
    return {'new_ied_percent': new_ied_percent, 'new_attack_percent': new_attack_percent, 'new_boss_percent': new_boss_percent, 'new_damage_percent': new_damage_percent}
}

function removePotentialsFromStats(potential_list, current_ied_percent, current_attack_percent, current_boss_percent, current_damage_percent){
    var i = 0;
    var stripped_ied_percent = current_ied_percent;
    var stripped_attack_percent = current_attack_percent;
    var stripped_boss_percent = current_boss_percent;
    var stripped_damage_percent = current_damage_percent;

    while (i < potential_list.length){
        var current_potential = potential_list[i];
        
        if(current_potential == '40boss'){
            stripped_boss_percent = stripped_boss_percent - 40;
        }
        if(current_potential == '35boss'){
            stripped_boss_percent = stripped_boss_percent - 35;
        }
        if(current_potential == '30boss'){
            stripped_boss_percent = stripped_boss_percent - 30;
        }
        if(current_potential == '20boss'){
            stripped_boss_percent = stripped_boss_percent - 20;
        }

        if(current_potential == '13att'){
            stripped_attack_percent = stripped_attack_percent - 13;
        }
        if(current_potential == '12att'){
            stripped_attack_percent = stripped_attack_percent - 12;
        }
        if(current_potential == '10att'){
            stripped_attack_percent = stripped_attack_percent - 10;
        }
        if(current_potential == '9att'){
            stripped_attack_percent = stripped_attack_percent - 9;
        }

        if(current_potential == '13dmg'){
            stripped_damage_percent = stripped_damage_percent - 13;
        }
        if(current_potential == '12dmg'){
            stripped_damage_percent = stripped_damage_percent - 12;
        }
        if(current_potential == '10dmg'){
            stripped_damage_percent = stripped_damage_percent - 10;
        }
        if(current_potential == '9dmg'){
            stripped_damage_percent = stripped_damage_percent - 9;
        }

        if(current_potential == '40ied'){
            var old_ied = stripped_ied_percent;
            stripped_ied_percent = (old_ied - 40) / ((-1 * 40 / 100) + 1)
        }
        if(current_potential == '35ied'){
            var old_ied = stripped_ied_percent;
            stripped_ied_percent = (old_ied - 35) / ((-1 * 35 / 100) + 1)
        }
        if(current_potential == '30ied'){
            var old_ied = stripped_ied_percent;
            stripped_ied_percent = (old_ied - 30) / ((-1 * 30 / 100) + 1)
        }

        i++;
    }
    return {'stripped_ied_percent': stripped_ied_percent, 'stripped_attack_percent': stripped_attack_percent, 'stripped_boss_percent': stripped_boss_percent, 'stripped_damage_percent': stripped_damage_percent}
}

function getWSEATTPercent(){
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

    while (i < potential_list.length){
        var current_potential = potential_list[i];

        if(current_potential == '13att'){
            WSEATTPercent = WSEATTPercent + 13;
        }
        if(current_potential == '12att'){
            WSEATTPercent = WSEATTPercent + 12;
        }
        if(current_potential == '10att'){
            WSEATTPercent = WSEATTPercent + 10;
        }
        if(current_potential == '9att'){
            WSEATTPercent = WSEATTPercent + 9;
        }
        i++;
    }

    return WSEATTPercent
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
            'dmgPercent': [52], //weighed avg
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
            'iedPercent': [43],
            'dmgPercent': 52,
            'bossPercent': 52
            },
            
            'Dual Blade': {
            'attPercent': 4,
            'iedPercent': [80],
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
            'attPercent': 10,
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
            'iedPercent': [12, 20],
            'dmgPercent': 20,
            'bossPercent': 20
            },
            
            'Jett': {
            'attPercent': 29,
            'iedPercent': [20],
            'dmgPercent': 20,
            'bossPercent': 20
            },
            
            'Kaiser': {
            'attPercent': 34,
            'iedPercent':[40, 20],
            'dmgPercent': 0,
            'bossPercent': 18
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
            'iedPercent': [50, 5],
            'dmgPercent': 60,
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
            'dmgPercent': 55, //avg
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
            }
    }
    return class_data[maple_class]
}

//When page loaded
document.addEventListener("DOMContentLoaded", function () {
    //initialize 
    $(function () {
        $('[data-toggle="popover"]').popover()
    });
    
    $('.popover-dismiss').popover({
        trigger: 'focus'
    });

    //checkbox behaviour
    document.getElementById("solus2").addEventListener("click", function () {
        if (document.getElementById('solus2').checked == true){
            document.getElementById('solus3').checked = false;
        }
    });

    document.getElementById("solus3").addEventListener("click", function () {
        if (document.getElementById('solus3').checked == true){
            document.getElementById('solus2').checked = false;
        }
    });

    //event listeners
    document.getElementById("calculateButton").addEventListener("click", function () {
        optimizeWSE();
    });
    document.getElementById("new_wlevel").addEventListener("change", function () {
        if (document.getElementById('new_wlevel').value == 'lesser160'){
            $('#new_wline1').empty();
            $('#new_wline1').append("<option value='40boss' selected>40% Boss</option>");
            $('#new_wline1').append("<option value='35boss'>35% Boss</option>");
            $('#new_wline1').append("<option value='30boss'>30% Boss</option>");
            $('#new_wline1').append("<option value='40ied'>40% IED</option>");
            $('#new_wline1').append("<option value='35ied'>35% IED</option>");
            $('#new_wline1').append("<option value='12att'>12% ATT</option>");
            $('#new_wline1').append("<option value='12dmg'>12% Damage</option>");
            $('#new_wline1').append("<option value='none'>N/A</option>");

            $('#new_wline2').empty();
            $('#new_wline2').append("<option value='40boss'>40% Boss</option>");
            $('#new_wline2').append("<option value='35boss'>35% Boss</option>");
            $('#new_wline2').append("<option value='30boss'>30% Boss</option>");
            $('#new_wline2').append("<option value='20boss'>20% Boss</option>");
            $('#new_wline2').append("<option value='40ied'>40% IED</option>");
            $('#new_wline2').append("<option value='35ied'>35% IED</option>");
            $('#new_wline2').append("<option value='30ied' selected>30% IED</option>");
            $('#new_wline2').append("<option value='12att'>12% ATT</option>");
            $('#new_wline2').append("<option value='9att'>9% ATT</option>");
            $('#new_wline2').append("<option value='12dmg'>12% Damage</option>");
            $('#new_wline2').append("<option value='9dmg'>9% Damage</option>");
            $('#new_wline2').append("<option value='none'>N/A</option>");

            $('#new_wline3').empty();
            $('#new_wline3').append("<option value='40boss'>40% Boss</option>");
            $('#new_wline3').append("<option value='35boss'>35% Boss</option>");
            $('#new_wline3').append("<option value='30boss'>30% Boss</option>");
            $('#new_wline3').append("<option value='20boss'>20% Boss</option>");
            $('#new_wline3').append("<option value='40ied'>40% IED</option>");
            $('#new_wline3').append("<option value='35ied'>35% IED</option>");
            $('#new_wline3').append("<option value='30ied'>30% IED</option>");
            $('#new_wline3').append("<option value='12att'>12% ATT</option>");
            $('#new_wline3').append("<option value='9att' selected>9% ATT</option>");
            $('#new_wline3').append("<option value='12dmg'>12% Damage</option>");
            $('#new_wline3').append("<option value='9dmg'>9% Damage</option>");
            $('#new_wline3').append("<option value='none'>N/A</option>");

        }
        else{
            $('#new_wline1').empty();
            $('#new_wline1').append("<option value='40boss' selected>40% Boss</option>");
            $('#new_wline1').append("<option value='35boss'>35% Boss</option>");
            $('#new_wline1').append("<option value='30boss'>30% Boss</option>");
            $('#new_wline1').append("<option value='40ied'>40% IED</option>");
            $('#new_wline1').append("<option value='35ied'>35% IED</option>");
            $('#new_wline1').append("<option value='13att'>13% ATT</option>");
            $('#new_wline1').append("<option value='13dmg'>13% Damage</option>");
            $('#new_wline1').append("<option value='none'>N/A</option>");

            $('#new_wline2').empty();
            $('#new_wline2').append("<option value='40boss'>40% Boss</option>");
            $('#new_wline2').append("<option value='35boss'>35% Boss</option>");
            $('#new_wline2').append("<option value='30boss'>30% Boss</option>");
            $('#new_wline2').append("<option value='20boss'>20% Boss</option>");
            $('#new_wline2').append("<option value='40ied'>40% IED</option>");
            $('#new_wline2').append("<option value='35ied'>35% IED</option>");
            $('#new_wline2').append("<option value='30ied' selected>30% IED</option>");
            $('#new_wline2').append("<option value='13att'>13% ATT</option>");
            $('#new_wline2').append("<option value='10att'>10% ATT</option>");
            $('#new_wline2').append("<option value='13dmg'>13% Damage</option>");
            $('#new_wline2').append("<option value='10dmg'>10% Damage</option>");
            $('#new_wline2').append("<option value='none'>N/A</option>");

            $('#new_wline3').empty();
            $('#new_wline3').append("<option value='40boss'>40% Boss</option>");
            $('#new_wline3').append("<option value='35boss'>35% Boss</option>");
            $('#new_wline3').append("<option value='30boss'>30% Boss</option>");
            $('#new_wline3').append("<option value='20boss'>20% Boss</option>");
            $('#new_wline3').append("<option value='40ied'>40% IED</option>");
            $('#new_wline3').append("<option value='35ied'>35% IED</option>");
            $('#new_wline3').append("<option value='30ied'>30% IED</option>");
            $('#new_wline3').append("<option value='13att'>13% ATT</option>");
            $('#new_wline3').append("<option value='10att' selected>10% ATT</option>");
            $('#new_wline3').append("<option value='13dmg'>13% Damage</option>");
            $('#new_wline3').append("<option value='10dmg'>10% Damage</option>");
            $('#new_wline3').append("<option value='none'>N/A</option>");
        }
    });
    document.getElementById("new_slevel").addEventListener("change", function () {
        if (document.getElementById('new_slevel').value == 'lesser160'){
            $('#new_sline1').empty();
            $('#new_sline1').append("<option value='40boss'>40% Boss</option>");
            $('#new_sline1').append("<option value='35boss' selected>35% Boss</option>");
            $('#new_sline1').append("<option value='30boss'>30% Boss</option>");
            $('#new_sline1').append("<option value='40ied'>40% IED</option>");
            $('#new_sline1').append("<option value='35ied'>35% IED</option>");
            $('#new_sline1').append("<option value='12att'>12% ATT</option>");
            $('#new_sline1').append("<option value='12dmg'>12% Damage</option>");
            $('#new_sline1').append("<option value='none'>N/A</option>");

            $('#new_sline2').empty();
            $('#new_sline2').append("<option value='40boss'>40% Boss</option>");
            $('#new_sline2').append("<option value='35boss'>35% Boss</option>");
            $('#new_sline2').append("<option value='30boss'>30% Boss</option>");
            $('#new_sline2').append("<option value='20boss'>20% Boss</option>");
            $('#new_sline2').append("<option value='40ied'>40% IED</option>");
            $('#new_sline2').append("<option value='35ied' selected>35% IED</option>");
            $('#new_sline2').append("<option value='30ied'>30% IED</option>");
            $('#new_sline2').append("<option value='12att'>12% ATT</option>");
            $('#new_sline2').append("<option value='9att'>9% ATT</option>");
            $('#new_sline2').append("<option value='12dmg'>12% Damge</option>");
            $('#new_sline2').append("<option value='9dmg'>9% Damge</option>");
            $('#new_sline2').append("<option value='none'>N/A</option>");

            $('#new_sline3').empty();
            $('#new_sline3').append("<option value='40boss'>40% Boss</option>");
            $('#new_sline3').append("<option value='35boss'>35% Boss</option>");
            $('#new_sline3').append("<option value='30boss'>30% Boss</option>");
            $('#new_sline3').append("<option value='20boss'>20% Boss</option>");
            $('#new_sline3').append("<option value='40ied'>40% IED</option>");
            $('#new_sline3').append("<option value='35ied'>35% IED</option>");
            $('#new_sline3').append("<option value='30ied' selected>30% IED</option>");
            $('#new_sline3').append("<option value='12att'>12% ATT</option>");
            $('#new_sline3').append("<option value='9att'>9% ATT</option>");
            $('#new_sline3').append("<option value='12dmg'>12% Damage</option>");
            $('#new_sline3').append("<option value='9dmg'>9% Damage</option>");
            $('#new_sline3').append("<option value='none'>N/A</option>");

        }
        else{
            $('#new_sline1').empty();
            $('#new_sline1').append("<option value='40boss'>40% Boss</option>");
            $('#new_sline1').append("<option value='35boss'>35% Boss</option>");
            $('#new_sline1').append("<option value='30boss' selected>30% Boss</option>");
            $('#new_sline1').append("<option value='40ied'>40% IED</option>");
            $('#new_sline1').append("<option value='35ied'>35% IED</option>");
            $('#new_sline1').append("<option value='13att'>13% ATT</option>");
            $('#new_sline1').append("<option value='13dmg'>13% Damage</option>");
            $('#new_sline1').append("<option value='none'>N/A</option>");

            $('#new_sline2').empty();
            $('#new_sline2').append("<option value='40boss'>40% Boss</option>");
            $('#new_sline2').append("<option value='35boss'>35% Boss</option>");
            $('#new_sline2').append("<option value='30boss'>30% Boss</option>");
            $('#new_sline2').append("<option value='20boss'>20% Boss</option>");
            $('#new_sline2').append("<option value='40ied'>40% IED</option>");
            $('#new_sline2').append("<option value='35ied'>35% IED</option>");
            $('#new_sline2').append("<option value='30ied' selected>30% IED</option>");
            $('#new_sline2').append("<option value='13att'>13% ATT</option>");
            $('#new_sline2').append("<option value='10att'>10% ATT</option>");
            $('#new_sline2').append("<option value='13dmg'>13% Damage</option>");
            $('#new_sline2').append("<option value='10dmg'>10% Damage</option>");
            $('#new_sline2').append("<option value='none'>N/A</option>");

            $('#new_sline3').empty();
            $('#new_sline3').append("<option value='40boss'>40% Boss</option>");
            $('#new_sline3').append("<option value='35boss'>35% Boss</option>");
            $('#new_sline3').append("<option value='30boss'>30% Boss</option>");
            $('#new_sline3').append("<option value='20boss'>20% Boss</option>");
            $('#new_sline3').append("<option value='40ied'>40% IED</option>");
            $('#new_sline3').append("<option value='35ied'>35% IED</option>");
            $('#new_sline3').append("<option value='30ied'>30% IED</option>");
            $('#new_sline3').append("<option value='13att' selected>13% ATT</option>");
            $('#new_sline3').append("<option value='10att'>10% ATT</option>");
            $('#new_sline3').append("<option value='13dmg'>13% Damage</option>");
            $('#new_sline3').append("<option value='10dmg'>10% Damage</option>");
            $('#new_sline3').append("<option value='none'>N/A</option>");
        }
    });
    document.getElementById("new_elevel").addEventListener("change", function () {
        if (document.getElementById('new_elevel').value == 'lesser160'){
            
            $('#new_eline1').empty();
            $('#new_eline1').append("<option value='40ied'>40% IED</option>");
            $('#new_eline1').append("<option value='35ied'>35% IED</option>");
            $('#new_eline1').append("<option value='12att' selected>12% ATT</option>");
            $('#new_eline1').append("<option value='12dmg'>12% Damage</option>");
            $('#new_eline1').append("<option value='none'>N/A</option>");

            $('#new_eline2').empty();
            $('#new_eline2').append("<option value='40ied'>40% IED</option>");
            $('#new_eline2').append("<option value='35ied'>35% IED</option>");
            $('#new_eline2').append("<option value='30ied'>30% IED</option>");
            $('#new_eline2').append("<option value='12att'>12% ATT</option>");
            $('#new_eline2').append("<option value='9att' selected>9% ATT</option>");
            $('#new_eline2').append("<option value='12dmg'>12% Damage</option>");
            $('#new_eline2').append("<option value='9dmg'>9% Damage</option>");
            $('#new_eline2').append("<option value='none'>N/A</option>");

            $('#new_eline3').empty();
            $('#new_eline3').append("<option value='40ied'>40% IED</option>");
            $('#new_eline3').append("<option value='35ied'>35% IED</option>");
            $('#new_eline3').append("<option value='30ied'>30% IED</option>");
            $('#new_eline3').append("<option value='12att'>12% ATT</option>");
            $('#new_eline3').append("<option value='9att' selected>9% ATT</option>");
            $('#new_eline3').append("<option value='12dmg'>12% Damage</option>");
            $('#new_eline3').append("<option value='9dmg'>9% Damage</option>");
            $('#new_eline3').append("<option value='none'>N/A</option>");

        }
        else{
            $('#new_eline1').empty();
            $('#new_eline1').append("<option value='40ied'>40% IED</option>");
            $('#new_eline1').append("<option value='35ied'>35% IED</option>");
            $('#new_eline1').append("<option value='13att' selected>13% ATT</option>");
            $('#new_eline1').append("<option value='13dmg'>13% Damage</option>");
            $('#new_eline1').append("<option value='none'>N/A</option>");

            $('#new_eline2').empty();
            $('#new_eline2').append("<option value='40ied'>40% IED</option>");
            $('#new_eline2').append("<option value='35ied' selected>35% IED</option>");
            $('#new_eline2').append("<option value='30ied'>30% IED</option>");
            $('#new_eline2').append("<option value='13att'>13% ATT</option>");
            $('#new_eline2').append("<option value='10att'>10% ATT</option>");
            $('#new_eline2').append("<option value='13dmg'>13% Damage</option>");
            $('#new_eline2').append("<option value='10dmg'>10% Damage</option>");
            $('#new_eline2').append("<option value='none'>N/A</option>");

            $('#new_eline3').empty();
            $('#new_eline3').append("<option value='40ied'>40% IED</option>");
            $('#new_eline3').append("<option value='35ied'>35% IED</option>");
            $('#new_eline3').append("<option value='30ied' selected>30% IED</option>");
            $('#new_eline3').append("<option value='13att'>13% ATT</option>");
            $('#new_eline3').append("<option value='10att'>10% ATT</option>");
            $('#new_eline3').append("<option value='13dmg'>13% Damage</option>");
            $('#new_eline3').append("<option value='10dmg'>10% Damage</option>");
            $('#new_eline3').append("<option value='none'>N/A</option>");
        }
    });
    document.getElementById("wlevel").addEventListener("change", function () {
        if (document.getElementById('wlevel').value == 'lesser160'){
            $('#wline1').empty();
            $('#wline1').append("<option value='40boss' selected>40% Boss</option>");
            $('#wline1').append("<option value='35boss'>35% Boss</option>");
            $('#wline1').append("<option value='30boss'>30% Boss</option>");
            $('#wline1').append("<option value='40ied'>40% IED</option>");
            $('#wline1').append("<option value='35ied'>35% IED</option>");
            $('#wline1').append("<option value='12att'>12% ATT</option>");
            $('#wline1').append("<option value='12dmg'>12% Damage</option>");
            $('#wline1').append("<option value='none'>N/A</option>");

            $('#wline2').empty();
            $('#wline2').append("<option value='40boss'>40% Boss</option>");
            $('#wline2').append("<option value='35boss'>35% Boss</option>");
            $('#wline2').append("<option value='30boss'>30% Boss</option>");
            $('#wline2').append("<option value='20boss'>20% Boss</option>");
            $('#wline2').append("<option value='40ied'>40% IED</option>");
            $('#wline2').append("<option value='35ied'>35% IED</option>");
            $('#wline2').append("<option value='30ied' selected>30% IED</option>");
            $('#wline2').append("<option value='12att'>12% ATT</option>");
            $('#wline2').append("<option value='9att'>9% ATT</option>");
            $('#wline2').append("<option value='12dmg'>12% Damage</option>");
            $('#wline2').append("<option value='9dmg'>9% Damage</option>");
            $('#wline2').append("<option value='none'>N/A</option>");

            $('#wline3').empty();
            $('#wline3').append("<option value='40boss'>40% Boss</option>");
            $('#wline3').append("<option value='35boss'>35% Boss</option>");
            $('#wline3').append("<option value='30boss'>30% Boss</option>");
            $('#wline3').append("<option value='20boss'>20% Boss</option>");
            $('#wline3').append("<option value='40ied'>40% IED</option>");
            $('#wline3').append("<option value='35ied'>35% IED</option>");
            $('#wline3').append("<option value='30ied'>30% IED</option>");
            $('#wline3').append("<option value='12att'>12% ATT</option>");
            $('#wline3').append("<option value='9att' selected>9% ATT</option>");
            $('#wline3').append("<option value='12dmg'>12% Damage</option>");
            $('#wline3').append("<option value='9dmg'>9% Damage</option>");
            $('#wline3').append("<option value='none'>N/A</option>");

        }
        else{
            $('#wline1').empty();
            $('#wline1').append("<option value='40boss' selected>40% Boss</option>");
            $('#wline1').append("<option value='35boss'>35% Boss</option>");
            $('#wline1').append("<option value='30boss'>30% Boss</option>");
            $('#wline1').append("<option value='40ied'>40% IED</option>");
            $('#wline1').append("<option value='35ied'>35% IED</option>");
            $('#wline1').append("<option value='13att'>13% ATT</option>");
            $('#wline1').append("<option value='13dmg'>13% Damage</option>");
            $('#wline1').append("<option value='none'>N/A</option>");

            $('#wline2').empty();
            $('#wline2').append("<option value='40boss'>40% Boss</option>");
            $('#wline2').append("<option value='35boss'>35% Boss</option>");
            $('#wline2').append("<option value='30boss'>30% Boss</option>");
            $('#wline2').append("<option value='20boss'>20% Boss</option>");
            $('#wline2').append("<option value='40ied'>40% IED</option>");
            $('#wline2').append("<option value='35ied'>35% IED</option>");
            $('#wline2').append("<option value='30ied' selected>30% IED</option>");
            $('#wline2').append("<option value='13att'>13% ATT</option>");
            $('#wline2').append("<option value='10att'>10% ATT</option>");
            $('#wline2').append("<option value='13dmg'>13% Damage</option>");
            $('#wline2').append("<option value='10dmg'>10% Damage</option>");
            $('#wline2').append("<option value='none'>N/A</option>");

            $('#wline3').empty();
            $('#wline3').append("<option value='40boss'>40% Boss</option>");
            $('#wline3').append("<option value='35boss'>35% Boss</option>");
            $('#wline3').append("<option value='30boss'>30% Boss</option>");
            $('#wline3').append("<option value='20boss'>20% Boss</option>");
            $('#wline3').append("<option value='40ied'>40% IED</option>");
            $('#wline3').append("<option value='35ied'>35% IED</option>");
            $('#wline3').append("<option value='30ied'>30% IED</option>");
            $('#wline3').append("<option value='13att'>13% ATT</option>");
            $('#wline3').append("<option value='10att' selected>10% ATT</option>");
            $('#wline3').append("<option value='13dmg'>13% Damage</option>");
            $('#wline3').append("<option value='10dmg'>10% Damage</option>");
            $('#wline3').append("<option value='none'>N/A</option>");
        }
    });
    document.getElementById("slevel").addEventListener("change", function () {
        if (document.getElementById('slevel').value == 'lesser160'){
            $('#sline1').empty();
            $('#sline1').append("<option value='40boss'>40% Boss</option>");
            $('#sline1').append("<option value='35boss' selected>35% Boss</option>");
            $('#sline1').append("<option value='30boss'>30% Boss</option>");
            $('#sline1').append("<option value='40ied'>40% IED</option>");
            $('#sline1').append("<option value='35ied'>35% IED</option>");
            $('#sline1').append("<option value='12att'>12% ATT</option>");
            $('#sline1').append("<option value='12dmg'>12% Damage</option>");
            $('#sline1').append("<option value='none'>N/A</option>");

            $('#sline2').empty();
            $('#sline2').append("<option value='40boss'>40% Boss</option>");
            $('#sline2').append("<option value='35boss'>35% Boss</option>");
            $('#sline2').append("<option value='30boss'>30% Boss</option>");
            $('#sline2').append("<option value='20boss'>20% Boss</option>");
            $('#sline2').append("<option value='40ied'>40% IED</option>");
            $('#sline2').append("<option value='35ied' selected>35% IED</option>");
            $('#sline2').append("<option value='30ied'>30% IED</option>");
            $('#sline2').append("<option value='12att'>12% ATT</option>");
            $('#sline2').append("<option value='9att'>9% ATT</option>");
            $('#sline2').append("<option value='12dmg'>12% Damge</option>");
            $('#sline2').append("<option value='9dmg'>9% Damge</option>");
            $('#sline2').append("<option value='none'>N/A</option>");

            $('#sline3').empty();
            $('#sline3').append("<option value='40boss'>40% Boss</option>");
            $('#sline3').append("<option value='35boss'>35% Boss</option>");
            $('#sline3').append("<option value='30boss'>30% Boss</option>");
            $('#sline3').append("<option value='20boss'>20% Boss</option>");
            $('#sline3').append("<option value='40ied'>40% IED</option>");
            $('#sline3').append("<option value='35ied'>35% IED</option>");
            $('#sline3').append("<option value='30ied' selected>30% IED</option>");
            $('#sline3').append("<option value='12att'>12% ATT</option>");
            $('#sline3').append("<option value='9att'>9% ATT</option>");
            $('#sline3').append("<option value='12dmg'>12% Damage</option>");
            $('#sline3').append("<option value='9dmg'>9% Damage</option>");
            $('#sline3').append("<option value='none'>N/A</option>");

        }
        else{
            $('#sline1').empty();
            $('#sline1').append("<option value='40boss'>40% Boss</option>");
            $('#sline1').append("<option value='35boss'>35% Boss</option>");
            $('#sline1').append("<option value='30boss' selected>30% Boss</option>");
            $('#sline1').append("<option value='40ied'>40% IED</option>");
            $('#sline1').append("<option value='35ied'>35% IED</option>");
            $('#sline1').append("<option value='13att'>13% ATT</option>");
            $('#sline1').append("<option value='13dmg'>13% Damage</option>");
            $('#sline1').append("<option value='none'>N/A</option>");

            $('#sline2').empty();
            $('#sline2').append("<option value='40boss'>40% Boss</option>");
            $('#sline2').append("<option value='35boss'>35% Boss</option>");
            $('#sline2').append("<option value='30boss'>30% Boss</option>");
            $('#sline2').append("<option value='20boss'>20% Boss</option>");
            $('#sline2').append("<option value='40ied'>40% IED</option>");
            $('#sline2').append("<option value='35ied'>35% IED</option>");
            $('#sline2').append("<option value='30ied' selected>30% IED</option>");
            $('#sline2').append("<option value='13att'>13% ATT</option>");
            $('#sline2').append("<option value='10att'>10% ATT</option>");
            $('#sline2').append("<option value='13dmg'>13% Damage</option>");
            $('#sline2').append("<option value='10dmg'>10% Damage</option>");
            $('#sline2').append("<option value='none'>N/A</option>");

            $('#sline3').empty();
            $('#sline3').append("<option value='40boss'>40% Boss</option>");
            $('#sline3').append("<option value='35boss'>35% Boss</option>");
            $('#sline3').append("<option value='30boss'>30% Boss</option>");
            $('#sline3').append("<option value='20boss'>20% Boss</option>");
            $('#sline3').append("<option value='40ied'>40% IED</option>");
            $('#sline3').append("<option value='35ied'>35% IED</option>");
            $('#sline3').append("<option value='30ied'>30% IED</option>");
            $('#sline3').append("<option value='13att' selected>13% ATT</option>");
            $('#sline3').append("<option value='10att'>10% ATT</option>");
            $('#sline3').append("<option value='13dmg'>13% Damage</option>");
            $('#sline3').append("<option value='10dmg'>10% Damage</option>");
            $('#sline3').append("<option value='none'>N/A</option>");
        }
    });
    document.getElementById("elevel").addEventListener("change", function () {
        if (document.getElementById('elevel').value == 'lesser160'){
            
            $('#eline1').empty();
            $('#eline1').append("<option value='40ied'>40% IED</option>");
            $('#eline1').append("<option value='35ied'>35% IED</option>");
            $('#eline1').append("<option value='12att' selected>12% ATT</option>");
            $('#eline1').append("<option value='12dmg'>12% Damage</option>");
            $('#eline1').append("<option value='none'>N/A</option>");

            $('#eline2').empty();
            $('#eline2').append("<option value='40ied'>40% IED</option>");
            $('#eline2').append("<option value='35ied'>35% IED</option>");
            $('#eline2').append("<option value='30ied'>30% IED</option>");
            $('#eline2').append("<option value='12att'>12% ATT</option>");
            $('#eline2').append("<option value='9att' selected>9% ATT</option>");
            $('#eline2').append("<option value='12dmg'>12% Damage</option>");
            $('#eline2').append("<option value='9dmg'>9% Damage</option>");
            $('#eline2').append("<option value='none'>N/A</option>");

            $('#eline3').empty();
            $('#eline3').append("<option value='40ied'>40% IED</option>");
            $('#eline3').append("<option value='35ied'>35% IED</option>");
            $('#eline3').append("<option value='30ied'>30% IED</option>");
            $('#eline3').append("<option value='12att'>12% ATT</option>");
            $('#eline3').append("<option value='9att' selected>9% ATT</option>");
            $('#eline3').append("<option value='12dmg'>12% Damage</option>");
            $('#eline3').append("<option value='9dmg'>9% Damage</option>");
            $('#eline3').append("<option value='none'>N/A</option>");

        }
        else{
            $('#eline1').empty();
            $('#eline1').append("<option value='40ied'>40% IED</option>");
            $('#eline1').append("<option value='35ied'>35% IED</option>");
            $('#eline1').append("<option value='13att' selected>13% ATT</option>");
            $('#eline1').append("<option value='13dmg'>13% Damage</option>");
            $('#eline1').append("<option value='none'>N/A</option>");

            $('#eline2').empty();
            $('#eline2').append("<option value='40ied'>40% IED</option>");
            $('#eline2').append("<option value='35ied' selected>35% IED</option>");
            $('#eline2').append("<option value='30ied'>30% IED</option>");
            $('#eline2').append("<option value='13att'>13% ATT</option>");
            $('#eline2').append("<option value='10att'>10% ATT</option>");
            $('#eline2').append("<option value='13dmg'>13% Damage</option>");
            $('#eline2').append("<option value='10dmg'>10% Damage</option>");
            $('#eline2').append("<option value='none'>N/A</option>");

            $('#eline3').empty();
            $('#eline3').append("<option value='40ied'>40% IED</option>");
            $('#eline3').append("<option value='35ied'>35% IED</option>");
            $('#eline3').append("<option value='30ied' selected>30% IED</option>");
            $('#eline3').append("<option value='13att'>13% ATT</option>");
            $('#eline3').append("<option value='10att'>10% ATT</option>");
            $('#eline3').append("<option value='13dmg'>13% Damage</option>");
            $('#eline3').append("<option value='10dmg'>10% Damage</option>");
            $('#eline3').append("<option value='none'>N/A</option>");
        }
    });
    document.getElementById("compare").addEventListener("change", function () {
        //compare calculator selected
        //console.log('compare calculator selected');
        document.getElementById('compareTable').hidden = false;
        document.getElementById('compareTitle').hidden = false;
    });
    document.getElementById("optimize").addEventListener("change", function () {
        //optimize calculator selected
        
        document.getElementById('compareTable').hidden = true;
        document.getElementById('compareTitle').hidden = true;
    });
});

//Main Function
function optimizeWSE() {
    //ied source
    var ied_sources = [];

    // Stats from Stat Window
    var maple_class = document.getElementById('class').value;
    var boss_percent = parseInt(document.getElementById('boss_percent').value);
    var ied_percent = parseInt(document.getElementById('ied_percent').value) - 0.5; //due to rounding up in game
    var damage_percent = parseInt(document.getElementById('damage_percent').value);
    var attack_percent = 0;

    //Link Skill Stats
    if (document.getElementById('solus2').checked == true){
        damage_percent = damage_percent + 11;
    }

    if (document.getElementById('solus3').checked == true){
        damage_percent = damage_percent + 16;
    }

    if (document.getElementById('unfairAdvantage').checked == true){
        damage_percent = damage_percent + 12;
    }

    if (document.getElementById('empiricalKnowledge').checked == true){
        var empiricalKnowledgeIED = [3, 3, 3];
        ied_sources = ied_sources.concat(empiricalKnowledgeIED);
        damage_percent = damage_percent + 9;
    }

    if (document.getElementById('thiefCunning').checked == true){
        damage_percent = damage_percent + 18;
    }

    if (document.getElementById('tideOfBattle').checked == true){
        damage_percent = damage_percent + 12;
    }

    if (document.getElementById('magSoul').checked == true){
        attack_percent = attack_percent + 3;
    }

    // class_data
    var class_data = getClassData(maple_class)

    var class_ied = class_data.iedPercent;
    var class_dmg = class_data.dmgPercent;
    var class_att = class_data.attPercent;
    var class_boss = class_data.bossPercent;

    //update ied_sources
    ied_sources = ied_sources.concat(class_ied);

    //Current Stats With WSE
    current_damage_percent = damage_percent + class_dmg;
    current_boss_percent = boss_percent + class_boss;
    current_ied_percent = determineIED(ied_percent, ied_sources);

    //get ATT %
    current_attack_percent = attack_percent + class_att;
    var added_attack_percent_from_WSE = getWSEATTPercent();
    current_attack_percent = current_attack_percent + added_attack_percent_from_WSE;

    //Determine Damage Output
    var currentBossDefMultiplier = getBossDefMultiplier(current_ied_percent)
    var currentHitDamage = getHitDamage(current_boss_percent, current_attack_percent, current_damage_percent)

    var currentOutput = currentBossDefMultiplier * currentHitDamage;

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
    console.log('stripped_damage_percent:' + stripped_damage_percent)

    if (stripped_ied_percent < 0 || stripped_attack_percent < 0 || stripped_boss_percent < 0 || stripped_damage_percent < 0){
        //send an error message
        document.getElementById('resultSection').hidden = false;
        document.getElementById('result').innerHTML = `
                There has been an error. Please make sure you have correctly inputted your stats as they are shown within the stat window. Furthermore, ensure that you have entered your Current WSE correctly.
            `;
        window.scrollTo(0,document.body.scrollHeight);
        return false
    }

    if (document.getElementById('compare').checked == true){
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

        console.log('new_damage_percent:' + new_damage_percent)

        //New Dmg Output
        var newBossDefMultiplier = getBossDefMultiplier(new_ied_percent)
        var newHitDamage = getHitDamage(new_boss_percent, new_attack_percent, new_damage_percent)

        var newOutput = newBossDefMultiplier * newHitDamage;

        var dmgRatio = newOutput / currentOutput;

        if (dmgRatio == 1){
            document.getElementById('resultSection').hidden = false;
            document.getElementById('result').innerHTML = `
                Hit Damage on Bosses will <strong>not change</strong>.
            `;
            window.scrollTo(0,document.body.scrollHeight);
        }
        else if(dmgRatio > 1){
            var output_increase = ((dmgRatio - 1) * 100).toFixed(2);
            document.getElementById('resultSection').hidden = false;
            document.getElementById('result').innerHTML = `
                Hit Damage on Bosses will <strong>increase</strong> by ${output_increase}%.
            `;
            window.scrollTo(0,document.body.scrollHeight);
        }
        else if(dmgRatio < 1){
            var output_decrease = ((1 - dmgRatio) * 100).toFixed(2);
            document.getElementById('resultSection').hidden = false;
            document.getElementById('result').innerHTML = `
                Hit Damage on Bosses will <strong>decrease</strong> by ${output_decrease}%.
            `;
            window.scrollTo(0,document.body.scrollHeight);
        }

    }
    if (document.getElementById('optimize').checked == true){
        document.getElementById('resultSection').hidden = false;
        document.getElementById('result').innerHTML = `
                The Optimize WSE Calculator has not been coded yet. Please use the Compare WSE Calculator.
            `;
        window.scrollTo(0,document.body.scrollHeight);
        return false
    }
}