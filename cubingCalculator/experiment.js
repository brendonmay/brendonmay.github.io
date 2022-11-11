import {geoDistrQuantile, median, percentile} from "./statistics.js";
import C from "./c.js";
import Game from "./game.js";
import {cubingCost} from "./cubes.js";
import {getOldProbability} from "./getOldProbability.js";

// Note(sethyboy0) This file contains old code from when the calculator used simulation instead of math.
// I'll let Brendon decide if he wants to keep it around or not.

// Old code in the runCalculator function.
function runCalculator() {
    //console.log(repeatExperiment('red', 150, 'weapon', '2LATT', 1, 3, 3))
    // Highcharts.chart('container', {
    //   title: {
    //     text: 'Frequency Histogram'
    //   },

    //   xAxis: [{
    //     title: {
    //       text: ''
    //     },
    //     alignTicks: false,
    //     visible: false,
    //     opposite: true
    //   }, {
    //     title: {
    //       text: 'Meso Cost (in Billions)'
    //     },
    //     alignTicks: false,
    //     opposite: false
    //   }],

    //   yAxis: [{
    //     title: {
    //       text: ''
    //     },
    //     visible: false,
    //     opposite: true
    //   }, {
    //     title: {
    //       text: 'Frequency'
    //     },
    //     opposite: false
    //   }],

    //   plotOptions: {
    //     histogram: {
    //       accessibility: {
    //         pointDescriptionFormatter: function (point) {
    //           var ix = point.index + 1,
    //             x1 = point.x.toFixed(3),
    //             x2 = point.x2.toFixed(3),
    //             val = point.y;
    //           return ix + '. ' + x1 + ' to ' + x2 + ', ' + val + '.';
    //         }
    //       }
    //     }
    //   },

    //   series: [{
    //     name: 'Histogram',
    //     type: 'histogram',
    //     color: '#135273',
    //     xAxis: 1,
    //     yAxis: 1,
    //     baseSeries: 's1',
    //     zIndex: -1
    //   }, {
    //     name: '',
    //     type: 'scatter',
    //     visible: false,
    //     data: mesoDataForGraph,
    //     id: 's1',
    //     marker: {
    //       radius: 0
    //     }
    //   }]
    // });
    //document.getElementById("graphhere").style.display = '';
}


function atLeastTwoLines(boolLine1, boolLine2, boolLine3) {
    if (boolLine1 && boolLine2) return {
        'isTrue': true,
        'nonLine': 3
    }
    else if (boolLine1 && boolLine3) return {
        'isTrue': true,
        'nonLine': 2
    }
    else if (boolLine2 && boolLine3) return {
        'isTrue': true,
        'nonLine': 1
    }
    else return {
            'isTrue': false,
            'nonLine': []
        }
}

function atLeastOneLine(line1, line2, line3) {
    return line1 || line2 || line3
}

function percentAmount(potLine) {
    var start = potLine.lastIndexOf('+') + 1;
    var end = potLine.lastIndexOf('%');
    return parseInt(potLine.substring(start, end));
}

function isLUKPercent(potLine) {
    return potLine.includes('LUK') && potLine.slice(-1) == '%'
}

function isINTPercent(potLine) {
    return potLine.includes('INT') && potLine.slice(-1) == '%'
}

function isSTRPercent(potLine) {
    return potLine.includes('STR') && potLine.slice(-1) == '%'
}

function isDEXPercent(potLine) {
    return potLine.includes('DEX') && potLine.slice(-1) == '%'
}

function isHPPercent(potLine) {
    return potLine.includes('MaxHP') && potLine.slice(-1) == '%'
}

function isALLPercent(potLine) {
    return potLine.includes('All Stats') && potLine.slice(-1) == '%'
}

function isSTATPercent(potLine, stat) {
    if (stat == 'LUK') {
        return isLUKPercent(potLine) || isALLPercent(potLine)
    }
    if (stat == 'DEX') {
        return isDEXPercent(potLine) || isALLPercent(potLine)
    }
    if (stat == 'STR') {
        return isSTRPercent(potLine) || isALLPercent(potLine)
    }
    if (stat == 'INT') {
        return isINTPercent(potLine) || isALLPercent(potLine)
    }
    if (stat == 'ALL') {
        return isALLPercent(potLine)
    }
}

function isAttackPercent(potLine) {
    return potLine.includes('ATT') && potLine.slice(-1) == '%' && !(potLine.includes('Magic'))
}

function isTwoSecReduction(potLine) {
    return potLine.includes('Skill Cooldown') && potLine.includes('2 sec')
}

function isOneSecReduction(potLine) {
    return potLine.includes('Skill Cooldown') && potLine.includes('1 sec')
}

function atLeastTwoSecCD(firstLine, secondLine, thirdLine) {
    return (isTwoSecReduction(firstLine) || isTwoSecReduction(secondLine) || isTwoSecReduction(thirdLine)) || (atLeastTwoLines(isOneSecReduction(firstLine), isOneSecReduction(secondLine), isOneSecReduction(thirdLine)).isTrue)
}

function atLeastThreeSecCD(firstLine, secondLine, thirdLine) {
    return atLeastFourSecCD(firstLine, secondLine, thirdLine) || (isOneSecReduction(firstLine) && isOneSecReduction(secondLine) && isOneSecReduction(thirdLine)) || (atLeastOneLine(isTwoSecReduction(firstLine), isTwoSecReduction(secondLine), isTwoSecReduction(thirdLine)) && (atLeastOneLine(isOneSecReduction(firstLine), isOneSecReduction(secondLine), isOneSecReduction(thirdLine))));

}

function atLeastFourSecCD(firstLine, secondLine, thirdLine) {
    return (atLeastTwoLines(isOneSecReduction(firstLine), isOneSecReduction(secondLine), isOneSecReduction(thirdLine)).isTrue && (isTwoSecReduction(firstLine) || isTwoSecReduction(secondLine) || isTwoSecReduction(thirdLine))) || (atLeastTwoLines(isTwoSecReduction(firstLine), isTwoSecReduction(secondLine), isTwoSecReduction(thirdLine)).isTrue)
}

function isMesoDrop(potLine) {
    return potLine.includes('Mesos')
}

function isItemDrop(potLine) {
    return potLine.includes('Item Drop Rate')
}

function isMesoOrDrop(potLine) {
    return isItemDrop(potLine) || isMesoDrop(potLine)
}

function isMagicAttackPercent(potLine) {
    return potLine.includes('Magic ATT') && potLine.slice(-1) == '%'
}

function isCritRate(potLine) {
    return potLine.includes('Critical Damage')
}

function isBossLine(potLine) {
    return potLine.includes('Boss Monster Damage')
}

function isIEDLine(potLine) {
    return potLine.includes('Ignore Monster DEF')
}

function performExperiment(cubeType, itemLevel, itemCategory, desiredResult, startingTier, desiredTier) {
    if (startingTier >= desiredTier && desiredResult == 'any') {
        return [0, 0]
    }
    var cubeCount = 0;
    var tierRate;
    var primeRate;
    var currentTier = startingTier;

    //data supporting conditional probability:
    //https://www.reddit.com/r/Maplestory/comments/84jb2e/gms_cube_probability_distributions_and_expected/

    //difficulty multipliers (these constants produce values very close to experimental data):

    var diffMultLine2 = 1.5;
    var diffMultLine3 = 1.6;
    var diffMultReduct = 0.725;

    if (cubeType == 'red') {
        primeRate = C.lineTierRate;
        if (document.getElementById('DMT').checked == true) {
            //DMT Tier rate
            tierRate = C.redCubeTierRateDMT;
        } else {
            tierRate = C.redCubeTierRate;
        }
    } else {
        primeRate = C.lineTierRateBlack;
        if (document.getElementById('DMT').checked == true) {
            //DMT Tier Rate
            tierRate = C.blackCubeTierRateDMT;
        } else {
            tierRate = C.blackCubeTierRate;
        }
    }
    var notSuccessful = true;
    while (notSuccessful) {
        var newPot = Game.getP(currentTier, tierRate, false, itemLevel, C.category[itemCategory], primeRate);
        cubeCount++;

        if (newPot.tieredUp) {
            currentTier++
        }
        if (currentTier >= desiredTier) {
            if (desiredResult == 'any') {
                notSuccessful = false;
                break;
            }
            var firstLine = newPot.lines[0];
            var secondLine = newPot.lines[1];
            var thirdLine = newPot.lines[2];


            if (desiredResult == '3LATT') {
                if (isAttackPercent(firstLine) && isAttackPercent(secondLine) && isAttackPercent(thirdLine)) {
                    notSuccessful = false;
                    if (itemCategory != 'secondary' && itemCategory != 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3);
                    if (itemCategory == 'secondary' || itemCategory == 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3 * diffMultReduct);
                }
            }
            if (desiredResult == '3LMATT') {
                if (isMagicAttackPercent(firstLine) && isMagicAttackPercent(secondLine) && isMagicAttackPercent(thirdLine)) {
                    notSuccessful = false;
                }
            }
            if (desiredResult == '2LMATT') {
                if (atLeastTwoLines(isMagicAttackPercent(firstLine), isMagicAttackPercent(secondLine), isMagicAttackPercent(thirdLine)).isTrue) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '2LATT') {
                if (atLeastTwoLines(isAttackPercent(firstLine), isAttackPercent(secondLine), isAttackPercent(thirdLine)).isTrue) {
                    notSuccessful = false;
                    cubeCount = Math.round(cubeCount * 1.4);
                    break;
                }

            }//1LCrit, 1LCritAndStat, 1LCritAndALL, 1LCritandHP, 2LCritAndStat, 2LCritAndALL, 2LCritandHP
            if (desiredResult == '1LCrit') {
                if (isCritRate(firstLine) || isCritRate(secondLine) || isCritRate(thirdLine)) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '2CritandHP') {
                if ((atLeastTwoLines(isCritRate(firstLine), isCritRate(secondLine), isCritRate(thirdLine)).isTrue) && (isHPPercent(firstLine) || isHPPercent(secondLine) || isHPPercent(thirdLine))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '2LCritAndALL') {
                if ((atLeastTwoLines(isCritRate(firstLine), isCritRate(secondLine), isCritRate(thirdLine)).isTrue) && (isALLPercent(firstLine) || isALLPercent(secondLine) || isALLPercent(thirdLine))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '2LCritAndStat') {
                if ((atLeastTwoLines(isCritRate(firstLine), isCritRate(secondLine), isCritRate(thirdLine)).isTrue) && ((isSTATPercent(firstLine, 'LUK') || isSTATPercent(secondLine, 'LUK') || isSTATPercent(thirdLine, 'LUK')))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '1LCritand2HP') {
                if ((isCritRate(firstLine) || isCritRate(secondLine) || isCritRate(thirdLine)) && (atLeastTwoLines(isHPPercent(firstLine), isHPPercent(secondLine), isHPPercent(thirdLine)).isTrue)) {
                    break;
                }
            }
            if (desiredResult == '1LCritAnd2ALL') {
                if ((isCritRate(firstLine) || isCritRate(secondLine) || isCritRate(thirdLine)) && (atLeastTwoLines(isALLPercent(firstLine), isALLPercent(secondLine), isALLPercent(thirdLine)).isTrue)) {
                    break;
                }
            }
            if (desiredResult == '1LCritAnd2Stat') {
                if ((isCritRate(firstLine) || isCritRate(secondLine) || isCritRate(thirdLine)) && (atLeastTwoLines(isSTATPercent(firstLine, 'LUK'), isSTATPercent(secondLine, 'LUK'), isSTATPercent(thirdLine, 'LUK')).isTrue)) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '1LCritandHP') {
                if ((isCritRate(firstLine) || isCritRate(secondLine) || isCritRate(thirdLine)) && (isHPPercent(firstLine) || isHPPercent(secondLine) || isHPPercent(thirdLine))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '1LCritAndALL') {
                if ((isCritRate(firstLine) || isCritRate(secondLine) || isCritRate(thirdLine)) && (isALLPercent(firstLine) || isALLPercent(secondLine) || isALLPercent(thirdLine))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '1LCritAndStat') {
                if ((isCritRate(firstLine) || isCritRate(secondLine) || isCritRate(thirdLine)) && ((isSTATPercent(firstLine, 'LUK') || isSTATPercent(secondLine, 'LUK') || isSTATPercent(thirdLine, 'LUK')))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '2LCrit') {
                if (atLeastTwoLines(isCritRate(firstLine), isCritRate(secondLine), isCritRate(thirdLine)).isTrue) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '2ATTand1IED') {
                var potObj = atLeastTwoLines(isAttackPercent(firstLine), isAttackPercent(secondLine), isAttackPercent(thirdLine));
                var hasTwoATTLines = potObj.isTrue;
                if (hasTwoATTLines) {
                    var otherLine = potObj.nonLine;
                    if (otherLine == 3 && isIEDLine(thirdLine)) {
                        notSuccessful = false;
                        if (itemCategory != 'secondary' && itemCategory != 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3);
                        if (itemCategory == 'secondary' || itemCategory == 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3 * diffMultReduct);
                        break;
                    }
                    if (otherLine == 2 && isIEDLine(secondLine)) {
                        notSuccessful = false;
                        if (itemCategory != 'secondary' && itemCategory != 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3);
                        if (itemCategory == 'secondary' || itemCategory == 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3 * diffMultReduct);
                        break;
                    }
                    if (otherLine == 1 && isIEDLine(firstLine)) {
                        notSuccessful = false;
                        if (itemCategory != 'secondary' && itemCategory != 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3);
                        if (itemCategory == 'secondary' || itemCategory == 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3 * diffMultReduct);
                        break;
                    }
                }
            }
            if (desiredResult == '2ATTand1BOSS') {
                var potObj = atLeastTwoLines(isAttackPercent(firstLine), isAttackPercent(secondLine), isAttackPercent(thirdLine));
                var hasTwoATTLines = potObj.isTrue;
                if (hasTwoATTLines) {
                    var otherLine = potObj.nonLine;
                    if (otherLine == 3 && isBossLine(thirdLine)) {
                        notSuccessful = false;
                        if (itemCategory != 'secondary' && itemCategory != 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3);
                        if (itemCategory == 'secondary' || itemCategory == 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3 * diffMultReduct);
                        break;
                    }
                    if (otherLine == 2 && isBossLine(secondLine)) {
                        notSuccessful = false;
                        if (itemCategory != 'secondary' && itemCategory != 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3);
                        if (itemCategory == 'secondary' || itemCategory == 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3 * diffMultReduct);
                        break;
                    }
                    if (otherLine == 1 && isBossLine(firstLine)) {
                        notSuccessful = false;
                        if (itemCategory != 'secondary' && itemCategory != 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3);
                        if (itemCategory == 'secondary' || itemCategory == 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3 * diffMultReduct);
                        break;
                    }
                }
            }
            if (desiredResult == '1ATTand2BOSS') {
                //1ATTand2BOSS * 1.5*1.75
                var potObj = atLeastTwoLines(isBossLine(firstLine), isBossLine(secondLine), isBossLine(thirdLine));
                var hasTwoBOSSLines = potObj.isTrue;
                if (hasTwoBOSSLines) {
                    var otherLine = potObj.nonLine;
                    if (otherLine == 3 && isAttackPercent(thirdLine)) {
                        notSuccessful = false;
                        if (itemCategory != 'secondary' && itemCategory != 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3);
                        if (itemCategory == 'secondary' || itemCategory == 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3 * diffMultReduct);
                        break;
                    }
                    if (otherLine == 2 && isAttackPercent(secondLine)) {
                        notSuccessful = false;
                        if (itemCategory != 'secondary' && itemCategory != 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3);
                        if (itemCategory == 'secondary' || itemCategory == 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3 * diffMultReduct);
                        break;
                    }
                    if (otherLine == 1 && isAttackPercent(firstLine)) {
                        notSuccessful = false;
                        if (itemCategory != 'secondary' && itemCategory != 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3);
                        if (itemCategory == 'secondary' || itemCategory == 'shield') cubeCount = Math.round(cubeCount * diffMultLine2 * diffMultLine3 * diffMultReduct);
                        break;
                    }
                }
            }
            //this is excludes HP
            if (desiredResult.includes('Perc')) { //21PercLUK, 24PercALL for Example (21) can be any stat 15%+
                var desiredPercent = parseInt(desiredResult.slice(0, 2));
                var desiredStat = desiredResult.slice(desiredResult.length - 3, desiredResult.length);
                var potentialStat = 0;
                if (isSTATPercent(firstLine, desiredStat)) {
                    var percent_amount = percentAmount(firstLine);
                    potentialStat = potentialStat + percent_amount;
                    if (percent_amount >= desiredPercent) {
                        notSuccessful = false;
                        break;
                    }
                }
                if (isSTATPercent(secondLine, desiredStat)) {
                    var percent_amount = percentAmount(secondLine);
                    potentialStat = potentialStat + percent_amount;
                    if (potentialStat >= desiredPercent) {
                        notSuccessful = false;
                        break;
                    }
                }
                if (isSTATPercent(thirdLine, desiredStat)) {
                    var percent_amount = percentAmount(thirdLine);
                    potentialStat = potentialStat + percent_amount;
                    if (potentialStat >= desiredPercent) {
                        notSuccessful = false;
                        break;
                    }
                }
                if (potentialStat >= desiredPercent) notSuccessful = false;
            }
            if (desiredResult == '2LMeso') {
                if (atLeastTwoLines(isMesoDrop(firstLine), isMesoDrop(secondLine), isMesoDrop(thirdLine)).isTrue) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '2LDrop') {
                if (atLeastTwoLines(isItemDrop(firstLine), isItemDrop(secondLine), isItemDrop(thirdLine)).isTrue) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '2LDropOrMeso') {
                if (atLeastTwoLines(isMesoOrDrop(firstLine), isMesoOrDrop(secondLine), isMesoOrDrop(thirdLine)).isTrue) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '1LMeso') {
                if (isMesoDrop(firstLine) || isMesoDrop(secondLine) || isMesoDrop(thirdLine)) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '1LDrop') {
                if (isItemDrop(firstLine) || isItemDrop(secondLine) || isItemDrop(thirdLine)) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '1LDropOrMeso') {
                if (isMesoOrDrop(firstLine) || isMesoOrDrop(secondLine) || isMesoOrDrop(thirdLine)) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '1LMesoAndStat') {
                if ((isMesoDrop(firstLine) || isMesoDrop(secondLine) || isMesoDrop(thirdLine)) && (isSTATPercent(firstLine, 'LUK') || isSTATPercent(secondLine, 'LUK') || isSTATPercent(thirdLine, 'LUK'))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '1LMesoAndHP') {
                if ((isMesoDrop(firstLine) || isMesoDrop(secondLine) || isMesoDrop(thirdLine)) && (isHPPercent(firstLine) || isHPPercent(secondLine) || isHPPercent(thirdLine))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '1LMesoAndALL') {
                if ((isMesoDrop(firstLine) || isMesoDrop(secondLine) || isMesoDrop(thirdLine)) && (isALLPercent(firstLine) || isALLPercent(secondLine) || isALLPercent(thirdLine))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '1LDropAndStat') {
                if ((isItemDrop(firstLine) || isItemDrop(secondLine) || isItemDrop(thirdLine)) && (isSTATPercent(firstLine, 'LUK') || isSTATPercent(secondLine, 'LUK') || isSTATPercent(thirdLine, 'LUK'))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '1LDropAndHP') {
                if ((isItemDrop(firstLine) || isItemDrop(secondLine) || isItemDrop(thirdLine)) && (isHPPercent(firstLine) || isHPPercent(secondLine) || isHPPercent(thirdLine))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '1LDropAndALL') {
                if ((isItemDrop(firstLine) || isItemDrop(secondLine) || isItemDrop(thirdLine)) && (isALLPercent(firstLine) || isALLPercent(secondLine) || isALLPercent(thirdLine))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '1LDropOrMesoAndStat') {
                if ((isMesoOrDrop(firstLine) || isMesoOrDrop(secondLine) || isMesoOrDrop(thirdLine)) && (isSTATPercent(firstLine, 'LUK') || isSTATPercent(secondLine, 'LUK') || isSTATPercent(thirdLine, 'LUK'))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '1LDropOrMesoAndHP') {
                if ((isMesoOrDrop(firstLine) || isMesoOrDrop(secondLine) || isMesoOrDrop(thirdLine)) && (isHPPercent(firstLine) || isHPPercent(secondLine) || isHPPercent(thirdLine))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '1LDropOrMesoAndALL') {
                if ((isMesoOrDrop(firstLine) || isMesoOrDrop(secondLine) || isMesoOrDrop(thirdLine)) && (isALLPercent(firstLine) || isALLPercent(secondLine) || isALLPercent(thirdLine))) {
                    notSuccessful = false;
                    break;
                }
            }
            //-------------------------------Hat-------------------------------//
            if (desiredResult == '2SecCD') {
                if (atLeastTwoSecCD(firstLine, secondLine, thirdLine)) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '3SecCD') {
                if (atLeastThreeSecCD(firstLine, secondLine, thirdLine)) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '4SecCD') {
                if (atLeastFourSecCD(firstLine, secondLine, thirdLine)) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '4SecCDAndStat') {
                if (atLeastFourSecCD(firstLine, secondLine, thirdLine) && (isSTATPercent(firstLine, 'LUK') || isSTATPercent(secondLine, 'LUK') || isSTATPercent(thirdLine, 'LUK'))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '4SecCDAndHP') {
                if (atLeastFourSecCD(firstLine, secondLine, thirdLine) && (isHPPercent(firstLine) || isHPPercent(secondLine) || isHPPercent(thirdLine))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '4SecCDAndALL') {
                if (atLeastFourSecCD(firstLine, secondLine, thirdLine) && (isALLPercent(firstLine) || isALLPercent(secondLine) || isALLPercent(thirdLine))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '3SecCDAndStat') {
                if (atLeastThreeSecCD(firstLine, secondLine, thirdLine) && (isSTATPercent(firstLine, 'LUK') || isSTATPercent(secondLine, 'LUK') || isSTATPercent(thirdLine, 'LUK'))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '3SecCDAndHP') {
                if (atLeastThreeSecCD(firstLine, secondLine, thirdLine) && (isHPPercent(firstLine) || isHPPercent(secondLine) || isHPPercent(thirdLine))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '3SecCDAndALL') {
                if (atLeastThreeSecCD(firstLine, secondLine, thirdLine) && (isALLPercent(firstLine) || isALLPercent(secondLine) || isALLPercent(thirdLine))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '2SecCDAndStat') {
                if (atLeastTwoSecCD(firstLine, secondLine, thirdLine) && (isSTATPercent(firstLine, 'LUK') || isSTATPercent(secondLine, 'LUK') || isSTATPercent(thirdLine, 'LUK'))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '2SecCDAndHP') {
                if (atLeastTwoSecCD(firstLine, secondLine, thirdLine) && (isHPPercent(firstLine) || isHPPercent(secondLine) || isHPPercent(thirdLine))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '2SecCDAndALL') {
                if (atLeastTwoSecCD(firstLine, secondLine, thirdLine) && (isALLPercent(firstLine) || isALLPercent(secondLine) || isALLPercent(thirdLine))) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '2SecCDAnd2Stat') {
                if (atLeastTwoSecCD(firstLine, secondLine, thirdLine) && (atLeastTwoLines(isSTATPercent(firstLine, 'LUK'), isSTATPercent(secondLine, 'LUK'), isSTATPercent(thirdLine, 'LUK')).isTrue)) {
                    notSuccessful = false;
                    break;
                }
            }
            if (desiredResult == '2SecCDAnd2HP') {
                if (atLeastTwoSecCD(firstLine, secondLine, thirdLine) && (atLeastTwoLines(isHPPercent(firstLine), isHPPercent(secondLine), isHPPercent(thirdLine)).isTrue)) {
                    break;
                }
            }
            if (desiredResult == '2SecCDAnd2ALL') {
                if (atLeastTwoSecCD(firstLine, secondLine, thirdLine) && (atLeastTwoLines(isALLPercent(firstLine), isALLPercent(secondLine), isALLPercent(thirdLine)).isTrue)) {
                    break;
                }
            }
        }

    }
    if (itemCategory == 'hat' || itemCategory == 'gloves') cubeCount = Math.round(cubeCount * diffMultReduct);
    return [cubeCount, cubingCost(cubeType, itemLevel, cubeCount)]


}

function repeatExperiment(cubeType, itemLevel, itemCategory, desiredResult, totalTrials, startingTier, desiredTier) {
    var results = [];
    var mesoResults = [];
    var meso_result_list_divided = [];
    var trialNumber = 0;
    while (trialNumber < totalTrials) {
        trialResult = performExperiment(cubeType, itemLevel, itemCategory, desiredResult, startingTier, desiredTier);
        results.push(trialResult[0]);
        mesoResults.push(trialResult[1]);
        meso_result_list_divided.push(trialResult[1] / 1000000000);
        trialNumber++;
    }
    var minCubeCount = Math.min.apply(Math, results)
    var maxCubeCount = Math.max.apply(Math, results)

    var minCost = (Math.min.apply(Math, mesoResults).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var maxCost = (Math.max.apply(Math, mesoResults).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var averageCubeCount = Math.round(results.reduce(reducer) / results.length);
    var averageCost = (Math.round(mesoResults.reduce(reducer) / mesoResults.length).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var medianCubeCount = median(results);
    var medianCost = (median(mesoResults).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var seventy_five_percentile = (percentile(mesoResults, 0.75).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var eighty_five_percentile = (percentile(mesoResults, 0.85).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var ninty_five_percentile = (percentile(mesoResults, 0.95).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var cube_seventy_five_percentile = (percentile(results, 0.75).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var cube_eighty_five_percentile = (percentile(results, 0.85).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var cube_ninty_five_percentile = (percentile(results, 0.95).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return {
        'minCubeCount': minCubeCount,
        'maxCubeCount': maxCubeCount,
        'minCost': minCost,
        'maxCost': maxCost,
        'averageCubeCount': averageCubeCount,
        'averageCost': averageCost,
        'medianCost': medianCost,
        'medianCubeCount': medianCubeCount,
        'mesoDataForGraph': meso_result_list_divided,
        'costSevenFive': seventy_five_percentile,
        'costEightFive': eighty_five_percentile,
        'costNineFive': ninty_five_percentile,
        'cubeSevenFive': cube_seventy_five_percentile,
        'cubeEightFive': cube_eighty_five_percentile,
        'cubeNineFive': cube_ninty_five_percentile
    }
}

function findStatLines(boolLine1, boolLine2, boolLine3) {
    if (boolLine1 && boolLine2 && boolLine3) return {
        'isTrue': true,
        'sumLines': [1, 2, 3]
    }
    else if (boolLine1 && boolLine2 && !boolLine3) return {
        'isTrue': true,
        'sumLines': [1, 2]
    }
    else if (boolLine1 && !boolLine2 && boolLine3) return {
        'isTrue': true,
        'sumLines': [1, 3]
    }
    else if (!boolLine1 && boolLine2 && boolLine3) return {
        'isTrue': true,
        'sumLines': [2, 3]
    }
    else return {
            'isTrue': false,
            'sumLines': []
        }
}