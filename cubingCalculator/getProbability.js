// Note(sethyboy0) This file contains the function that calculates the chance of getting the desired input. It also
// contains the functions that read the scraped options from the json files.

// These are all the possible kinds of input the probability calculator can look for.
export const emptyInputObject = {
    stat: 0, // At least this much % stat including % allstat lines.
    lineStat: 0, // At least this many lines of % stat including allstat lines.
    allStat: 0, // At least this much % all stat including 1/3rd of % STR, DEX, and LUK. For Xenons.
    hp: 0, // At least this much % HP. For DA.
    lineHp: 0, // At least this many lines of % HP. For DA.
    atk: 0,// At least this much % atk.
    lineAtk: 0, // At least this many lines of % atk.
    boss: 0,
    lineBoss: 0,
    lineIed: 0,
    lineCritDamage: 0,
    lineMeso: 0,
    lineDrop: 0,
    lineMesoOrDrop: 0, // At least this many lines of meso OR drop.
    cooldown: 0, // At least this many seconds of cooldown reduction.
}
