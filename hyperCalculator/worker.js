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

let pointCost = (level) => [0, 1, 2, 4, 8, 10, 15, 20, 25, 30, 35, 50, 65, 80, 95, 110][level];
let statGain = (level) => 30 * level;
let hpGain = (level) => 0.02 * level;
let cdmgGain = (level) => 0.01 * level;
let iedGain = (level) => 0.03 * level;
let dmgGain = (level) => 0.03 * level;

function bossGain(level, mobbing) {
    if (mobbing) {
        return 0;
    } else {
       return 0.03 * Math.min(level, 5) + 0.04 * Math.max(0, level - 5);
    }
}

function mobGain(level, mobbing) {
    if (!mobbing) {
        return 0;
    } else {
       return 0.03 * Math.min(level, 5) + 0.04 * Math.max(0, level - 5);
    }
}

// let bossGain = (level, mobbing) => 
let attGain = (level) => 3 * level;

function calculateOptimalCommon(data, progress, cb, mobbing) {
    let optimalConfig = {};
    let optimalDamage = -100.0;
    let counters = [];
    let loop = inner => () => {
        let oldPoints = data.points;
        for (let i = 0; i <= 15; ++i) {
            if (data.points - pointCost(i) < 0) break;
            data.points -= pointCost(i);
            counters.push(i);
            inner();
            counters.pop();
        }
        data.points = oldPoints;
    };

    let inner = loop(loop(loop(loop(loop(loop(() => {
        let damage = calculateDamageCommon(
            data.primary + statGain(counters[6]),
            data.secondary + statGain(counters[0]),
            data.cdmg + cdmgGain(counters[3]),
            data.boss + bossGain(counters[1], mobbing),
            data.dmg + dmgGain(counters[2]) + mobGain(counters[7], mobbing),
            (1.0 - (1.0 - data.ied) * (1.0 - iedGain(counters[4]))),
            data.att + attGain(counters[5]),
            data.pdr
        );
        if (optimalDamage < damage) {
            optimalDamage = damage;
            optimalConfig = {
                'secondary': counters[0],
                'boss': counters[1],
                'dmg': counters[2],
                'cdmg': counters[3],
                'ied': counters[4],
                'att': counters[5],
                'primary': counters[6],
                'mob': counters[7],
                'extra points': data.points,
                'score': damage,
                'primary_base': data.primary + statGain(counters[6]),
                'secondary_base': data.secondary + statGain(counters[0]),
                'cdmg_base': data.cdmg + cdmgGain(counters[3]),
                'boss_base': data.boss + bossGain(counters[1], mobbing),
                'ied_base': (1.0 - (1.0 - data.ied) * (1.0 - iedGain(counters[4]))),
                'dmg_base': data.dmg + dmgGain(counters[2]) + mobGain(counters[7], mobbing),
                'att_base':  data.att + attGain(counters[5])
            };
            cb(optimalConfig);
            // (primary, secondary, cdmg, boss, dmg, ied, att, pdr)
        }
    }))))));
    for (let j = 0; j <= data.i; ++j) {
        data.points = data.points - pointCost(j);
    }
    counters.push(data.i);
    for (let j = 0; j <= 15; ++j) {
        progress(j / 0.16);
        if (data.points - pointCost(j) < 0) break;
        data.points -= pointCost(j);
        counters.push(j);
        inner();
        counters.pop();
    }
    progress(100.0);
}

function calculateOptimalLuk2(data, progress, cb, mobbing) {
    let optimalConfig = {};
    let optimalDamage = -100.0;
    let counters = [];
    let loop = inner => () => {
        let oldPoints = data.points;
        for (let i = 0; i <= 15; ++i) {
            if (data.points - pointCost(i) < 0) break;
            data.points -= pointCost(i);
            counters.push(i);
            inner();
            counters.pop();
        }
        data.points = oldPoints;
    };

    let inner = loop(loop(loop(loop(loop(loop(() => {
        let damage = calculateDamageLuk2(
            data.primary + statGain(counters[7]),
            data.secondary1 + statGain(counters[0]),
            data.secondary2 + statGain(counters[1]),
            data.cdmg + cdmgGain(counters[4]),
            data.boss + bossGain(counters[2], mobbing),
            data.dmg + dmgGain(counters[3]),
            (1.0 - (1.0 - data.ied) * (1.0 - iedGain(counters[5]))),
            data.att + attGain(counters[6]),
            data.pdr
        );
        if (optimalDamage < damage) {
            optimalDamage = damage;
            optimalConfig = {
                'secondary1': counters[0],
                'secondary2': counters[1],
                'boss': counters[2],
                'dmg': counters[3],
                'cdmg': counters[4],
                'ied': counters[5],
                'att': counters[6],
                'primary': counters[7],
                'extra points': data.points,
                'score': damage,
            };
            cb(optimalConfig);
        }
    }))))));
    for (let j = 0; j <= data.i; ++j) {
        data.points = data.points - pointCost(j);
    }
    counters.push(data.i);
    for (let j = 0; j <= 15; ++j) {
        progress(j / 0.16);
        if (data.points - pointCost(j) < 0) break;
        data.points -= pointCost(j);
        counters.push(j);
        inner();
        counters.pop();
    }
    progress(100.0);
}

function calculateOptimalXenon(data, progress, cb, mobbing) {
    let optimalConfig = {};
    let optimalDamage = -100.0;
    let counters = [];
    let loop = inner => () => {
        let oldPoints = data.points;
        for (let i = 0; i <= 15; ++i) {
            if (data.points - pointCost(i) < 0) break;
            data.points -= pointCost(i);
            counters.push(i);
            inner();
            counters.pop();
        }
        data.points = oldPoints;
    };

    let inner = loop(loop(loop(loop(loop(loop(() => {
        let damage = calculateDamageXenon(
            data.primary1 + statGain(counters[5]),
            data.primary2 + statGain(counters[6]),
            data.primary3 + statGain(counters[7]),
            data.cdmg + cdmgGain(counters[3]),
            data.boss + bossGain(counters[1], mobbing),
            data.dmg + dmgGain(counters[2]),
            (1.0 - (1.0 - data.ied) * (1.0 - iedGain(counters[4]))),
            data.att + attGain(counters[0]),
            data.pdr
        );
        if (optimalDamage < damage) {
            optimalDamage = damage;
            optimalConfig = {
                'att': counters[0],
                'boss': counters[1],
                'dmg': counters[2],
                'cdmg': counters[3],
                'ied': counters[4],
                'primary1': counters[5],
                'primary2': counters[6],
                'primary3': counters[7],
                'extra points': data.points,
                'score': damage,
            };
            cb(optimalConfig);
        }
    }))))));
    for (let j = 0; j <= data.i; ++j) {
        data.points = data.points - pointCost(j);
    }
    counters.push(data.i);
    for (let j = 0; j <= 15; ++j) {
        progress(j / 0.16);
        if (data.points - pointCost(j) < 0) break;
        data.points -= pointCost(j);
        counters.push(j);
        inner();
        counters.pop();
    }
    progress(100.0);
}

function calculateOptimalDA(data, progress, cb, mobbing) {
    let optimalConfig = {};
    let optimalDamage = -100.0;
    let counters = [];
    let purehp = 545 + 90 * data.level; // under 4th job --> too bad.
    let loop = inner => () => {
        let oldPoints = data.points;
        for (let i = 0; i <= 15; ++i) {
            if (data.points - pointCost(i) < 0) break;
            data.points -= pointCost(i);
            counters.push(i);
            inner();
            counters.pop();
        }
        data.points = oldPoints;
    }; //purehp, hp, str, cdmg, boss, dmg, ied, att, pdr

    let inner = loop(loop(loop(loop(loop(() => {
        let damage = calculateDamageDA(
            purehp,
            (data.hp - data.flathp) / (1.00 + data.php) * (1.00 + data.php + hpGain(counters[6])) + data.flathp,
            data.str + statGain(counters[0]),
            data.cdmg + cdmgGain(counters[4]),
            data.boss + bossGain(counters[2], mobbing),
            data.dmg + dmgGain(counters[3]),
            (1.0 - (1.0 - data.ied) * (1.0 - iedGain(counters[5]))),
            data.att + attGain(counters[1]),
            data.pdr
        );
        if (optimalDamage < damage) {
            optimalDamage = damage;
            optimalConfig = {
                'str': counters[0],
                'att': counters[1],
                'boss': counters[2],
                'dmg': counters[3],
                'cdmg': counters[4],
                'ied': counters[5],
                'hp': counters[6],
                'extra points': data.points,
                'score': damage,
                'hp_base': (data.hp - data.flathp) / (1.00 + data.php) * (1.00 + data.php + hpGain(counters[6])) + data.flathp,
                'str_base': data.str + statGain(counters[0]),
                'cdmg_base': data.cdmg + cdmgGain(counters[4]),
                'boss_base': data.boss + bossGain(counters[2], mobbing),
                'dmg_base': data.dmg + dmgGain(counters[3]),
                'ied_base': (1.0 - (1.0 - data.ied) * (1.0 - iedGain(counters[5]))),
                'att_base': data.att + attGain(counters[1]),
            };
            cb(optimalConfig);
        }
    })))));
    for (let j = 0; j <= data.i; ++j) {
        data.points = data.points - pointCost(j);
    }
    counters.push(data.i);
    for (let j = 0; j <= 15; ++j) {
        progress(j / 0.16);
        if (data.points - pointCost(j) < 0) break;
        data.points -= pointCost(j);
        counters.push(j);
        inner();
        counters.pop();
    }
    progress(100.0);
}

function calculateOptimalKanna(data, progress, cb, mobbing) {
    let optimalConfig = {};
    let optimalDamage = -100.0;
    let counters = [];
    let loop = inner => () => {
        let oldPoints = data.points;
        for (let i = 0; i <= 15; ++i) {
            if (data.points - pointCost(i) < 0) break;
            data.points -= pointCost(i);
            counters.push(i);
            inner();
            counters.pop();
        }
        data.points = oldPoints;
    };

    let inner = loop(loop(loop(loop(loop(loop(() => {
        var hp_with_percent = data.hp - data.flathp;
        var att_removal = Math.floor((data.hp/700));
        var hp_without_percent = hp_with_percent / (1 + data.php);
        var new_hp = (hp_without_percent) * (1 + data.php + hpGain(counters[7])) + data.flathp;
        var att_boost = Math.floor(new_hp / 700); //come back
        let damage = calculateDamageCommon(
            data.int + statGain(counters[6]),
            data.luk + statGain(counters[0]),
            data.cdmg + cdmgGain(counters[3]),
            data.boss + bossGain(counters[1], mobbing),
            data.dmg + dmgGain(counters[2]),
            (1.0 - (1.0 - data.ied) * (1.0 - iedGain(counters[4]))),
            Math.floor(((data.att / data.patt) - att_removal + attGain(counters[5]) + att_boost) * data.patt),
            //Total attack is divided by attk percent to determine base attack. We remove the old HP att gain and replace with the new one. Also add in new hyper stat gain. Then reapply percent attack.
                
            data.pdr
        );
        if (optimalDamage < damage) {
            optimalDamage = damage;
            optimalConfig = {
                'luk': counters[0],
                'boss': counters[1],
                'dmg': counters[2],
                'cdmg': counters[3],
                'ied': counters[4],
                'att': counters[5],
                'int': counters[6],
                'hp': counters[7],
                'extra points': data.points,
                'score': damage,
                'base_int': data.int + statGain(counters[6]),
                'base_luk': data.luk + statGain(counters[0]),
                'base_cdmg': data.cdmg + cdmgGain(counters[3]),
                'base_boss': data.boss + bossGain(counters[1], mobbing),
                'base_dmg': data.dmg + dmgGain(counters[2]),
                'base_ied': (1.0 - (1.0 - data.ied) * (1.0 - iedGain(counters[4]))),
                'base_att': Math.floor((data.att + attGain(counters[5])) * data.patt + att_boost)
            };
            cb(optimalConfig);
        }
    }))))));
    for (let j = 0; j <= data.i; ++j) {
        data.points = data.points - pointCost(j);
    }
    counters.push(data.i);
    for (let j = 0; j <= 15; ++j) {
        progress(j / 0.16);
        if (data.points - pointCost(j) < 0) break;
        data.points -= pointCost(j);
        counters.push(j);
        inner();
        counters.pop();
    }
    progress(100.0);
}

self.addEventListener('message', (e) => {
    let data = e.data;
    let calculate = calculateOptimalCommon;
    if (data.type == 'luk2') {
        calculate = calculateOptimalLuk2;
    } else if (data.type == 'XENON') {
        calculate = calculateOptimalXenon;
    } else if (data.type == 'DA') {
        calculate = calculateOptimalDA;
    } else if (data.type == 'KANNA') {
        calculate = calculateOptimalKanna;
    }
    calculate(data,
        (progress) => { self.postMessage({ progress: progress, i: data.i }); },
        (result) => { self.postMessage({ result: result }); },
        data.mob
    );
});

