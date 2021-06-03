//function l(what) {return document.getElementById(what);}
function choose(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function asset(what) {
  return "url(" + C.assetsDir + what + ")";
}

function soundasset(what) {
  return C.soundDir + what + "?raw=true";
}

function geoDistrQuantile(p) {
  var mean = 1 / p

  var median = Math.log(1 - 0.5) / Math.log(1 - p)
  var seventy_fifth = Math.log(1 - 0.75) / Math.log(1 - p)
  var eighty_fifth = Math.log(1 - 0.85) / Math.log(1 - p)
  var nintey_fifth = Math.log(1 - 0.95) / Math.log(1 - p)

  return { mean: mean, median: median, seventy_fifth: seventy_fifth, eighty_fifth: eighty_fifth, nintey_fifth: nintey_fifth }
}

C = {};
C.inventoryX = 50;
C.inventoryY = 50;
C.inventoryOrigX = 10;
C.inventoryOrigY = 36;
C.inventorySpaceX = 36;
C.inventorySpaceY = 35;
C.equipmentX = 230;
C.equipmentY = 50;
C.equipmentOrigX = 22;
C.equipmentOrigY = 42;
C.equipmentSpaceX = 41;
C.equipmentSpaceY = 41;
C.tooltipImageX = 38;
C.tooltipImageY = 57;
C.equiptooltipImageX = 46;
C.equiptooltipImageY = 97;
C.cubeItemX = 86;
C.cubeItemY = 101;

C.noCube = {
  id: "noCube"
};
C.redCube = {
  id: "redCube",
  name: "Red Cube"
};
C.blackCube = {
  id: "blackCube",
  name: "Black Cube"
};
C.bonusCube = {
  id: "bonusCube",
  name: "Bonus Potential Cube"
};
C.bonusScroll = {
  id: "bonusScroll",
  name: "Miraculous Bonus Potential Scroll"
};

C.redCube.desc = "A beautifully crafted cube that randomly reconfigures the Potential on a piece of equipment.<br><b>Only usable on items from Rare to Legendary.<br>Max Result: Legendary</b>";
C.blackCube.desc = "An elegant cube that randomly configures the Potential on a piece of equipment. The Black Cube offers you the chance to decide whether or not to <b>apply the new Potential to your item</b>. However, it does not influence Bonus Potentials.<br><b>Only usable on items from Rare to Legendary.<br>Max Result: Legendary</b> Black Cubes have a higher chance to raise your Potential rank than Red Cubes do.";
C.bonusCube.desc = "A powerful cube that reconfigures a piece of equipment's Bonus Potential. Does not affect existing regular Potentials.<br><b>Only usable on items from Rare to Legendary<br>Max Result: Legendary<b>";
C.bonusScroll.desc = "Adds 3 lines of Rare Bonus Potential to ALL equipped items.<br>Double-click or click and drag it onto an equipped item to use it. Item is consumed upon use. <br><b>Success Rate: 100%.</b>";

C.rare = 0;
C.epic = 1;
C.unique = 2;
C.legendary = 3;

C.rarities = ["Rare", "Epic", "Unique", "Legendary"];
C.rarityColors = ["#66FFFF", "#9966FF", "#FFCC00", "#CCFF00"];
C.rarityOutlineColors = ["#55AAFF", "#CC66FF", "#FFCC00", "#00FF00"];

//Data supporting Prime Line Rate
//https://www.reddit.com/r/Maplestory/comments/6pisgw/details_on_when_its_more_costefficient_to_use/
C.lineTierRate = [1, 0.1, 0.05]; //P(>1PrimeRED) = 14%
C.lineTierRateBlack = [1, 0.2, 0.1]; //P(>1PrimeBLACK) = 26%

C.noTierRate = [0, 0, 0, 0];

C.redCubeTierRate = [0.1, 0.05, 0.025, 0];
C.blackCubeTierRate = [0.2, 0.1, 0.05, 0];

C.redCubeTierRateDMT = [0.2, 0.1, 0.05, 0];
C.blackCubeTierRateDMT = [0.4, 0.2, 0.1, 0];

C.category = {};
C.category.hat = 0;
C.category.top = 1;
C.category.bottom = 2;
C.category.overall = 3;
C.category.shoulder = 4;
C.category.face = 5;
//C.category.eye = 6;
C.category.accessory = 6;
C.category.earring = 7;
C.category.pendant = 8;
C.category.pendant2 = 9;
C.category.ring = 10;
C.category.ring2 = 11;
C.category.ring3 = 12;
C.category.ring4 = 13;
C.category.shoes = 14;
C.category.gloves = 15;
C.category.cape = 16;
C.category.belt = 17;
C.category.heart = 18;
C.category.badge = 19;
C.category.weapon = 20;
C.category.secondary = 21;
C.category.shield = 22;
C.category.emblem = 23;

C.categories = ["Hat", "Top", "Bottom", "Overall", "Shoulder Decoration", "Face Accessory", "Eye Accessory", "Earring", "Pendant", "Pendant", "Ring", "Ring", "Ring", "Ring", "Shoes", "Glove", "Cape", "Belt", "Mechanical Heart", "Badge", "Weapon", "Secondary Weapon", "Shield", "Emblem"];

C.categoryGridX = [2, 2, 2, 2, 3, 2, 2, 3, 1, 1, 0, 0, 0, 0, 2, 3, 4, 1, 4, 4, 1, 4, 4, 4];
C.categoryGridY = [0, 3, 4, 3, 3, 1, 2, 2, 2, 1, 0, 1, 2, 3, 5, 4, 4, 4, 5, 1, 3, 3, 3, 0];

C.optionTypes = ["10", "11", "20", "40", "51", "52", "53", "54", "55"];
C.optionArr = [
  //  1     3     5     7     9    11    13    15    17    19    21    23
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], //10
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], //11
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0], //20
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //40
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //51
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //52
  [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //53
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], //54
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] //55
];

C.emptyTop = {
  id: "emptyTop",
  name: "emptyTop",
  category: C.category.top,
  reqLevel: 200
};
C.emptyBottom = {
  id: "emptyBottom",
  name: "emptyBottom",
  category: C.category.bottom,
  reqLevel: 200
};

C._1002603 = {
  id: "_1002603",
  name: "White Maple Bandana",
  category: C.category.hat,
  reqLevel: 0
};

C.categoryItemPool = [0, 1, 2, 1, 4, 5, 6, 7, 8, 8, 10, 10, 10, 10, 14, 15, 16, 17, 18, 19, 20, 21, 21, 23];

C.itemPools = [
  /* 0 */
  [C._1002603, C._1002357, C._1003797, C._1003798, C._1003799, C._1003800, C._1003801, C._1003976, C._1004422, C._1004423, C._1004424, C._1004425, C._1004426],
  /* 1 */
  [C._1040002, C._1041113, C._1042254, C._1042255, C._1042256, C._1042257, C._1042258, C._1050018, C._1051017, C._1052198, C._1052527, C._1052669, C._1052882, C._1052887, C._1052888, C._1052889, C._1052890],
  /* 2 */
  [C._1062001, C._1060132, C._1061154, C._1062165, C._1062166, C._1062167, C._1062168, C._1062169],
  /* 3 */
  [null],
  /* 4 */
  [C._1152124, C._1152170, C._1152108, C._1152174, C._1152174_2, C._1152174_3, C._1152174_4, C._1152174_5],
  /* 5 */
  [C._1012076, C._1012106, C._1012058, C._1012189, C._1012191, C._1012478, C._1012438],
  /* 6 */
  [C._1022060, C._1022082, C._1022231, C._1022211],
  /* 7 */
  [C._1032003, C._1032013, C._1032022, C._1032183, C._1032222, C._1032223],
  /* 8 */
  [C._1122007, C._1122266, C._1122267],
  /* 9 */
  [null],
  /* 10 */
  [C._1113075, C._1113074, C._1113073, C._1113072, C._1113020, C._1113132, C._1113269, C._1112951, C._1112952, C._1112579, C._1113185],
  /* 11 */
  [null],
  /* 12 */
  [null],
  /* 13 */
  [null],
  /* 14 */
  [C._1072005, C._1072018, C._1072238, C._1072743, C._1072743_2, C._1072743_3, C._1072743_4, C._1072743_5, C._1072870, C._1073030, C._1073030_2, C._1073030_3, C._1073030_4, C._1073030_5],
  /* 15 */
  [C._1082002, C._1082173, C._1082222, C._1082488, C._1082489, C._1082543, C._1082543_2, C._1082543_3, C._1082543_4, C._1082543_5, C._1082556, C._1082636, C._1082636_2, C._1082636_3, C._1082636_4, C._1082636_5],
  /* 16 */
  [C._1102053, C._1102041, C._1102206, C._1102481, C._1102481_2, C._1102481_3, C._1102481_4, C._1102481_5, C._1102623, C._1102775, C._1102775_2, C._1102775_3, C._1102775_4, C._1102775_5],
  /* 17 */
  [C._1132016, C._1132215, C._1132245, C._1132246, C._1132174, C._1132174_2, C._1132174_3, C._1132174_4, C._1132174_5],
  /* 18 */
  [C._1672003, C._1672007, C._1672034, C._1672007_2, C._1672040, C._1672069],
  /* 19 */
  [C._1182060],
  /* 20 */
  [C._1212063, C._1222058, C._1232057, C._1242060, C._1252015, C._1302275, C._1312153, C._1322203, C._1332225, C._1362090, C._1372177, C._1382208, C._1402196, C._1412135, C._1422140, C._1432167, C._1442223, C._1452205, C._1462193, C._1472214, C._1482168, C._1492179, C._1522094, C._1532098, C._1542063, C._1552061, C._1262016, C._1582016, C._1212089, C._1222084, C._1232084, C._1242090, C._1252033, C._1302297, C._1312173, C._1322223, C._1332247, C._1362109, C._1372195, C._1382231, C._1402220, C._1412152, C._1422158, C._1432187, C._1442242, C._1452226, C._1462213, C._1472235, C._1482189, C._1492199, C._1522113, C._1532118, C._1542072, C._1552072, C._1262029, C._1582025, C._1572007],
  /* 21 */
  [C._1092008, C._1098003, C._1099004, C._1352003, C._1352103, C._1352202, C._1352212, C._1352222, C._1352232, C._1352242, C._1352252, C._1352262, C._1352272, C._1352282, C._1352292, C._1352403, C._1352503, C._1352604, C._1352703, C._1352803, C._1352813, C._1352823, C._1352902, C._1352912, C._1352922, C._1353004, C._1352932, C._1352942, C._1352952, C._1352962, C._1352972, C._1353103, C._1353203, C._1353403, C._1092049, C._1092079, C._1342082, C._1552061_2, C._1342090, C._1552072_2, C._1092113, C._1562007],
  /* 22 */
  [null],
  /* 23 */
  [C._1190301, C._1190401, C._1190001, C._1190101, C._1190201, C._1190521, C._1190601, C._1190701, C._1190801, C._1191001]
];

Game = {};
Game.isDragging = false;
Game.dragID = null;
Game.mouseX = 0;
Game.mouseY = 0;
Game.P = {
  pot: [],
  bpot: []
};
Game.E = []; //equips
Game.disableCube = false;
Game.lastCubed = null;
Game.lastCube = null;
Game.usedBonusScroll = false;
Game.equipListCategory = null;

Game.unequipTop = null;
Game.unequipBottom = null;
Game.usingOverall = false;

Game.getPLine = function (tier, isBonus, level, category) {
  var valid = [];
  var list = isBonus ? Game.P.bpot : Game.P.pot;
  var leveltier = Math.max(0, Math.floor((level - 1) / 10));

  for (var i = 0; i < list.length; i++) {
    var o = list[i];
    if (o.tier == tier &&
      (!o.optionType || C.optionArr[C.optionTypes.indexOf(o.optionType)][category]) &&
      (!o.reqLevel || level >= o.reqLevel)) {
      // exceptions
      var subid = parseInt(o.id.substring(3));
      var emblembl = [601, 602, 603, 551];
      if (category == C.category.emblem && emblembl.indexOf(subid) > -1) continue;

      if (!isBonus) {
        var tier2bl = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 351, 352, 353, 81];
        if (tier >= 2 && o.id[2] != 1 && tier2bl.indexOf(subid) > -1) continue;
        valid.push(o.level[leveltier]);
        //console.log(o.level, leveltier);
      } else {
        for (var w = 0; w < o.weight; w++) {
          valid.push(o.level[leveltier]);
        }
      }
    }
  }

  //console.log(valid);
  return choose(valid);
}

Game.getP = function (rarity, tierRate, isBonus, level, category, primeRate) {
  var res = {};

  if (Math.random() < tierRate[rarity]) {
    res.tieredUp = true;
    res.rarity = rarity + 1;
  } else {
    res.tieredUp = false;
    res.rarity = rarity;
  }

  res.lines = [];
  for (var i = 0; i < primeRate.length; i++) {
    var newLine;
    if (Math.random() < primeRate[i])
      newLine = Game.getPLine(res.rarity + 1, isBonus, level, category);
    else
      newLine = Game.getPLine(res.rarity, isBonus, level, category);

    newLine = newLine.replace("<", "&lt;").replace(">", "&gt;").replace("\\n", " ");
    res.lines.push(newLine);
  }

  return res;
}

Game.parseP = function () {
  for (var i = 0; i < P.imgdir.imgdir.length; i++) {
    var node = P.imgdir.imgdir[i];
    var tier = node["-name"][1];
    var bonus = node["-name"][2] == 2;

    var obj = {};
    obj.id = node["-name"];
    obj.tier = tier;
    obj.bonus = bonus;

    if (node.imgdir[0].int)
      if (Array.isArray(node.imgdir[0].int)) {
        for (var j = 0; j < node.imgdir[0].int.length; j++)
          obj[node.imgdir[0].int[j]["-name"]] = node.imgdir[0].int[j]["-value"];
      }
      else {
        obj[node.imgdir[0].int["-name"]] = node.imgdir[0].int["-value"];
      }

    // skip
    if (obj.optionBlock) continue;

    if (node.imgdir[0].string) //always an object
      obj.string = node.imgdir[0].string["-value"];

    obj.level = [];
    for (var k = 0; k < node.imgdir[1].imgdir.length; k++) {
      var int = node.imgdir[1].imgdir[k].int;
      var res = obj.string;
      if (Array.isArray(int)) {
        for (var l = 0; l < int.length; l++)
          res = res.replace("#" + int[l]["-name"], int[l]["-value"]);
      } else {
        res = res.replace("#" + int["-name"], int["-value"]);
      }
      obj.level.push(res);
    }

    if (!bonus) {
      Game.P.pot.push(obj);
    } else {
      Game.P.bpot.push(obj);
    }
  }
}

//alt = true;

Game.init = function () {
  Game.parseP();
}

function percentile(arr, p) {
  if (arr.length === 0) return 0;
  if (typeof p !== 'number') throw new TypeError('p must be a number');
  if (p <= 0) return arr[0];
  if (p >= 1) return arr[arr.length - 1];

  var index = (arr.length - 1) * p,
    lower = Math.floor(index),
    upper = lower + 1,
    weight = index % 1;

  if (upper >= arr.length) return arr[lower];
  return arr[lower] * (1 - weight) + arr[upper] * weight;
}

// Returns the percentile of the given value in a sorted numeric array.
function percentRank(arr, v) {
  if (typeof v !== 'number') throw new TypeError('v must be a number');
  for (var i = 0, l = arr.length; i < l; i++) {
    if (v <= arr[i]) {
      while (i < l && v === arr[i]) i++;
      if (i === 0) return 0;
      if (v !== arr[i - 1]) {
        i += (v - arr[i - 1]) / (arr[i] - arr[i - 1]);
      }
      return i / l;
    }
  }
  return 1;
}

function standardDeviation(values) {
  var avg = average(values);

  var squareDiffs = values.map(function (value) {
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });

  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data) {
  var sum = data.reduce(function (sum, value) {
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}

function median(values) {

  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2)
    return values[half];
  else
    return (values[half - 1] + values[half]) / 2.0;
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

function cubingCost(cubeType, itemLevel, totalCubeCount) {
  if (cubeType == 'red') {
    cubeCost = 12000000;
  } else {
    cubeCost = 22000000;
  }
  var revealPotentialCost = 20 * itemLevel ** 2
  return cubeCost * totalCubeCount + totalCubeCount * revealPotentialCost
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
    }
    else {
      tierRate = C.redCubeTierRate;
    }
  } else {
    primeRate = C.lineTierRateBlack;
    if (document.getElementById('DMT').checked == true) {
      //DMT Tier Rate
      tierRate = C.blackCubeTierRateDMT;
    }
    else {
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

function getProbability(item_type, desired_outcome, cube_type, currentTier, desiredTier, itemLevel) {
  var probabilities = {
    'weapon': {
      "line_1":
      {
        "attack": { "red": 0.04878, "black": 0.04878 },
        "12_attack": { "red": 0.04878, "black": 0.04878 },
        "40_boss": { "red": 0.04878, "black": 0.04878 },
        "35_boss": { "red": 0.04878, "black": 0.04878 },
        "30_boss": { "red": 0.04878, "black": 0.04878 },
        "boss": { "red": 0.04878 + 0.04878 + 0.04878, "black": 0.04878 + 0.04878 + 0.04878 },
        "ied": { "red": 0.04878 + 0.04878, "black": 0.04878 + 0.04878 }
      },
      "line_2":
      {
        "attack": { "red": 0.004878 + 0.06, "black": 0.009756 + 0.053333 },
        "12_attack": { "red": 0.004878, "black": 0.009756 },
        "9_attack": { "red": 0.06, "black": 0.053333 },
        "40_boss": { "red": 0.004878, "black": 0.009756 },
        "35_boss": { "red": 0.004878, "black": 0.009756 },
        "30_boss": { "red": 0.004878 + 0.04, "black": 0.009756 + 0.035556 },
        "boss": { "red": 0.004878 + 0.004878 + 0.004878 + 0.04 + 0.06, "black": 0.009756 + 0.009756 + 0.009756 + 0.035556 + 0.053333 },
        "ied": { "red": 0.004878 + 0.004878 + 0.06, "black": 0.009756 + 0.009756 + 0.053333 }
      },
      "line_3":
      {
        "attack": { "red": 0.000488 + 0.066, "black": 0.002439 + 0.063333 },
        "boss": { "red": 0.000488 + 0.000488 + 0.000488 + 0.044 + 0.066, "black": 0.002439 + 0.002439 + 0.002439 + 0.042222 + 0.063333 },
        "12_attack": { "red": 0.000488, "black": 0.002439 },
        "9_attack": { "red": 0.066, "black": 0.063333 },
        "40_boss": { "red": 0.000488, "black": 0.002439 },
        "35_boss": { "red": 0.000488, "black": 0.002439 },
        "30_boss": { "red": 0.000488 + 0.044, "black": 0.002439 + 0.042222 },
        "ied": { "red": 0.000488 + 0.000488 + 0.066, "black": 0.002439 + 0.002439 + 0.063333 }
      }
    },
    'secondary': {
      "line_1":
      {
        "attack": { "red": 0.042553, "black": 0.042553 },
        "boss": { "red": 0.042553 * 3, "black": 0.042553 * 3 },
        "12_attack": { "red": 0.042553, "black": 0.042553 },
        "40_boss": { "red": 0.042553, "black": 0.042553 },
        "35_boss": { "red": 0.042553, "black": 0.042553 },
        "30_boss": { "red": 0.042553, "black": 0.042553 },
        "ied": { "red": 0.042553 * 2, "black": 0.042553 * 2 }
      },
      "line_2":
      {
        "attack": { "red": 0.004255 + 0.050943, "black": 0.008511 + 0.045283 },
        "boss": { "red": 0.004255 * 2 + 0.004255 + 0.033962 + 0.050943, "black": 0.008511 * 2 + 0.008511 + 0.30189 + 0.045283 },
        "12_attack": { "red": 0.004255, "black": 0.008511 },
        "9_attack": { "red": 0.050943, "black": 0.045283 },
        "40_boss": { "red": 0.004255, "black": 0.008511 },
        "35_boss": { "red": 0.004255, "black": 0.008511 },
        "30_boss": { "red": 0.004255 + 0.033962, "black": 0.008511 + 0.30189 },
        "ied": { "red": 0.004255 * 2 + 0.050943, "black": 0.008511 * 2 + 0.045283 }
      },
      "line_3":
      {
        "attack": { "red": 0.000426 + 0.056038, "black": 0.002128 + 0.053774 },
        "boss": { "red": 0.000426 * 2 + 0.000426 + 0.037358 + 0.056038, "black": 0.002128 * 2 + 0.002128 + 0.035849 + 0.053774 },
        "12_attack": { "red": 0.000426, "black": 0.002128 },
        "9_attack": { "red": 0.056038, "black": 0.053774 },
        "40_boss": { "red": 0.000426, "black": 0.002128 },
        "35_boss": { "red": 0.000426, "black": 0.002128 },
        "30_boss": { "red": 0.000426 + 0.037358, "black": 0.002128 + 0.035849 },
        "ied": { "red": 0.000426 * 2 + 0.056038, "black": 0.002128 * 2 + 0.053774 }
      }
    },
    'emblem': {
      "line_1":
      {
        "attack": { "red": 0.057143, "black": 0.057143 },
        "12_attack": { "red": 0.057143, "black": 0.057143 },
        "ied": { "red": 0.057143 * 2, "black": 0.057143 * 2 }
      },
      "line_2":
      {
        "attack": { "red": 0.005714 + 0.0675, "black": 0.011429 + 0.06 },
        "12_attack": { "red": 0.005714, "black": 0.011429 },
        "9_attack": { "red": 0.0675, "black": 0.06 },
        "ied": { "red": 0.005714 * 2 + 0.0675, "black": 0.011429 * 2 + 0.06 }
      },
      "line_3":
      {
        "attack": { "red": 0.000571 + 0.07425, "black": 0.002857 + 0.07125 },
        "12_attack": { "red": 0.000571, "black": 0.002857 },
        "9_attack": { "red": 0.07425, "black": 0.07125 },
        "ied": { "red": 0.000571 * 2 + 0.07425, "black": 0.002857 * 2 + 0.07125 }
      }
    },
    'top':
    {
      "line_1":
      {
        "12_stat": { 'black': 0.088889, 'red': 0.088889 },
        "9_all": { 'black': 0.066667, 'red': 0.066667 },
        "12_hp": { 'black': 0.088889, 'red': 0.088889 }
      },
      "line_2":
      {
        "12_stat": { 'black': 0.017778, 'red': 0.008889 },
        "9_all": { 'black': 0.013333, 'red': 0.006667 },
        "9_stat": { 'black': 0.060606, 'red': 0.068182 },
        "6_all": { 'black': 0.048485, 'red': 0.054545 },
        "12_hp": { 'black': 0.017778, 'red': 0.008889 },
        "9_hp": { 'black': 0.072727, 'red': 0.081818 }
      },
      "line_3":
      {
        "12_stat": { 'black': 0.004444, 'red': 0.000889 },
        "9_all": { 'black': 0.003333, 'red': 0.000667 },
        "9_stat": { 'black': 0.07197, 'red': 0.075 },
        "6_all": { 'black': 0.057576, 'red': 0.06 },
        "12_hp": { 'black': 0.004444, 'red': 0.000889 },
        "9_hp": { 'black': 0.086364, 'red': 0.09 }
      }
    },
    'bottom':
    {
      "line_1":
      {
        "12_stat": { 'black': 0.102564, 'red': 0.102564 },
        "9_all": { 'black': 0.076923, 'red': 0.076923 },
        "12_hp": { 'black': 0.102564, 'red': 0.102564 }
      },
      "line_2":
      {
        "12_stat": { 'black': 0.020513, 'red': 0.010256 },
        "9_all": { 'black': 0.015385, 'red': 0.007692 },
        "9_stat": { 'black': 0.071429, 'red': 0.080357 },
        "6_all": { 'black': 0.057143, 'red': 0.064286 },
        "12_hp": { 'black': 0.020513, 'red': 0.010256 },
        "9_hp": { 'black': 0.085714, 'red': 0.096429 }
      },
      "line_3":
      {
        "12_stat": { 'black': 0.005128, 'red': 0.001026 },
        "9_all": { 'black': 0.003846, 'red': 0.000769 },
        "9_stat": { 'black': 0.084821, 'red': 0.088393 },
        "6_all": { 'black': 0.067857, 'red': 0.070714 },
        "12_hp": { 'black': 0.005128, 'red': 0.001026 },
        "9_hp": { 'black': 0.101786, 'red': 0.106071 }
      }
    },
    "shoes":
    {
      "line_1":
      {
        "12_stat": { 'black': 0.1, 'red': 0.1 },
        "9_all": { 'black': 0.075, 'red': 0.075 },
        "12_hp": { 'black': 0.1, 'red': 0.1 }
      },
      "line_2":
      {
        "12_stat": { 'black': 0.02, 'red': 0.01 },
        "9_all": { 'black': 0.015, 'red': 0.0075 },
        "9_stat": { 'black': 0.071429, 'red': 0.080357 },
        "6_all": { 'black': 0.057143, 'red': 0.064286 },
        "12_hp": { 'black': 0.02, 'red': 0.01 },
        "9_hp": { 'black': 0.085714, 'red': 0.096429 }
      },
      "line_3":
      {
        "12_stat": { 'black': 0.005, 'red': 0.001 },
        "9_all": { 'black': 0.00375, 'red': 0.00075 },
        "9_stat": { 'black': 0.084821, 'red': 0.088393 },
        "6_all": { 'black': 0.067857, 'red': 0.070714 },
        "12_hp": { 'black': 0.005, 'red': 0.001 },
        "9_hp": { 'black': 0.101786, 'red': 0.106071 }
      }
    },
    'cape': //same as belt and shoulder
    {
      "line_1":
      {
        "12_stat": { 'black': 0.108108, 'red': 0.108108 },
        "9_all": { 'black': 0.081081, 'red': 0.081081 },
        "12_hp": { 'black': 0.108108, 'red': 0.108108 }
      },
      "line_2":
      {
        "12_stat": { 'black': 0.021622, 'red': 0.010811 },
        "9_all": { 'black': 0.016216, 'red': 0.008108 },
        "9_stat": { 'black': 0.076923, 'red': 0.086538 },
        "6_all": { 'black': 0.061538, 'red': 0.069231 },
        "12_hp": { 'black': 0.021622, 'red': 0.010811 },
        "9_hp": { 'black': 0.092308, 'red': 0.103846 }
      },
      "line_3":
      {
        "12_stat": { 'black': 0.005405, 'red': 0.001081 },
        "9_all": { 'black': 0.004054, 'red': 0.000811 },
        "9_stat": { 'black': 0.091346, 'red': 0.095192 },
        "6_all": { 'black': 0.073077, 'red': 0.076154 },
        "12_hp": { 'black': 0.005405, 'red': 0.001081 },
        "9_hp": { 'black': 0.109615, 'red': 0.114231 }
      }
    },
    "belt": //same as cape and shoulder
    {
      "line_1":
      {
        "12_stat": { 'black': 0.108108, 'red': 0.108108 },
        "9_all": { 'black': 0.081081, 'red': 0.081081 },
        "12_hp": { 'black': 0.108108, 'red': 0.108108 }
      },
      "line_2":
      {
        "12_stat": { 'black': 0.021622, 'red': 0.010811 },
        "9_all": { 'black': 0.016216, 'red': 0.008108 },
        "9_stat": { 'black': 0.076923, 'red': 0.086538 },
        "6_all": { 'black': 0.061538, 'red': 0.069231 },
        "12_hp": { 'black': 0.021622, 'red': 0.010811 },
        "9_hp": { 'black': 0.092308, 'red': 0.103846 }
      },
      "line_3":
      {
        "12_stat": { 'black': 0.005405, 'red': 0.001081 },
        "9_all": { 'black': 0.004054, 'red': 0.000811 },
        "9_stat": { 'black': 0.091346, 'red': 0.095192 },
        "6_all": { 'black': 0.073077, 'red': 0.076154 },
        "12_hp": { 'black': 0.005405, 'red': 0.001081 },
        "9_hp": { 'black': 0.109615, 'red': 0.114231 }
      }
    },
    "shoulder": //same as cape and belt
    {
      "line_1":
      {
        "12_stat": { 'black': 0.108108, 'red': 0.108108 },
        "9_all": { 'black': 0.081081, 'red': 0.081081 },
        "12_hp": { 'black': 0.108108, 'red': 0.108108 }
      },
      "line_2":
      {
        "12_stat": { 'black': 0.021622, 'red': 0.010811 },
        "9_all": { 'black': 0.016216, 'red': 0.008108 },
        "9_stat": { 'black': 0.076923, 'red': 0.086538 },
        "6_all": { 'black': 0.061538, 'red': 0.069231 },
        "12_hp": { 'black': 0.021622, 'red': 0.010811 },
        "9_hp": { 'black': 0.092308, 'red': 0.103846 }
      },
      "line_3":
      {
        "12_stat": { 'black': 0.005405, 'red': 0.001081 },
        "9_all": { 'black': 0.004054, 'red': 0.000811 },
        "9_stat": { 'black': 0.091346, 'red': 0.095192 },
        "6_all": { 'black': 0.073077, 'red': 0.076154 },
        "12_hp": { 'black': 0.005405, 'red': 0.001081 },
        "9_hp": { 'black': 0.109615, 'red': 0.114231 }
      }
    },
    'heart':
    {
      "line_1":
      {
        "12_stat": { 'black': 0.129032, 'red': 0.129032 },
        "9_all": { 'black': 0.096774, 'red': 0.096774 },
        "12_hp": { 'black': 0.129032, 'red': 0.129032 }
      },
      "line_2":
      {
        "12_stat": { 'black': 0.025806, 'red': 0.012903 },
        "9_all": { 'black': 0.019355, 'red': 0.009677 },
        "9_stat": { 'black': 0.090909, 'red': 0.102273 },
        "6_all": { 'black': 0.072727, 'red': 0.081818 },
        "12_hp": { 'black': 0.025806, 'red': 0.012903 },
        "9_hp": { 'black': 0.109091, 'red': 0.122727 }
      },
      "line_3":
      {
        "12_stat": { 'black': 0.006452, 'red': 0.00129 },
        "9_all": { 'black': 0.004839, 'red': 0.000968 },
        "9_stat": { 'black': 0.107955, 'red': 0.1125 },
        "6_all": { 'black': 0.086364, 'red': 0.09 },
        "12_hp": { 'black': 0.006452, 'red': 0.00129 },
        "9_hp": { 'black': 0.129545, 'red': 0.135 }
      }
    },
    'badge': //should be easier than heart, this is a guess
    {
      "line_1":
      {
        "12_stat": { 'black': 0.13, 'red': 0.13 },
        "9_all": { 'black': 0.1, 'red': 0.1 },
        "12_hp": { 'black': 0.13, 'red': 0.13 }
      },
      "line_2":
      {
        "12_stat": { 'black': 0.03, 'red': 0.013 },
        "9_all": { 'black': 0.02, 'red': 0.01 },
        "9_stat": { 'black': 0.1, 'red': 0.11 },
        "6_all": { 'black': 0.08, 'red': 0.085 },
        "12_hp": { 'black': 0.26, 'red': 0.13 },
        "9_hp": { 'black': 0.11, 'red': 0.125 }
      },
      "line_3":
      {
        "12_stat": { 'black': 0.01, 'red': 0.0015 },
        "9_all": { 'black': 0.005, 'red': 0.001 },
        "9_stat": { 'black': 0.11, 'red': 0.115 },
        "6_all": { 'black': 0.09, 'red': 0.095 },
        "12_hp": { 'black': 0.01, 'red': 0.005 },
        "9_hp": { 'black': 0.13, 'red': 0.14 }
      }
    },
    'gloves':
    {
      "line_1":
      {
        "12_stat": { 'black': 0.090909, 'red': 0.090909 },
        "9_all": { 'black': 0.068182, 'red': 0.068182 },
        "crit": { 'black': 0.090909, 'red': 0.090909 },
        "12_hp": { 'black': 0.090909, 'red': 0.090909 }
      },
      "line_2":
      {
        "12_stat": { 'black': 0.018182, 'red': 0.009091 },
        "9_all": { 'black': 0.013636, 'red': 0.006818 },
        "crit": { 'black': 0.018182, 'red': 0.009091 },
        "9_stat": { 'black': 0.066667, 'red': 0.075 },
        "6_all": { 'black': 0.053333, 'red': 0.053333 },
        "12_hp": { 'black': 0.018182, 'red': 0.009091 },
        "9_hp": { 'black': 0.08, 'red': 0.09 }
      },
      "line_3":
      {
        "12_stat": { 'black': 0.004545, 'red': 0.000909 },
        "9_all": { 'black': 0.003409, 'red': 0.000682 },
        "crit": { 'black': 0.004545, 'red': 0.000909 },
        "9_stat": { 'black': 0.079167, 'red': 0.0825 },
        "6_all": { 'black': 0.063333, 'red': 0.066 },
        "12_hp": { 'black': 0.004545, 'red': 0.000909 },
        "9_hp": { 'black': 0.095, 'red': 0.099 }
      }
    },
    'accessory':
    {
      "line_1":
      {
        "12_stat": { 'black': 0.093023, 'red': 0.093023 },
        "9_all": { 'black': 0.069767, 'red': 0.069767 },
        "drop": { 'black': 0.069767, 'red': 0.069767 },
        "meso": { 'black': 0.069767, 'red': 0.069767 },
        "12_hp": { 'black': 0.093023, 'red': 0.093023 }
      },
      "line_2":
      {
        "12_stat": { 'black': 0.018605, 'red': 0.009302 },
        "9_all": { 'black': 0.013953, 'red': 0.006977 },
        "drop": { 'black': 0.013953, 'red': 0.006977 },
        "meso": { 'black': 0.013953, 'red': 0.006977 },
        "9_stat": { 'black': 0.090909, 'red': 0.102273 },
        "6_all": { 'black': 0.072727, 'red': 0.081818 },
        "12_hp": { 'black': 0.018605, 'red': 0.009302 },
        "9_hp": { 'black': 0.109091, 'red': 0.122727 }
      },
      "line_3":
      {
        "12_stat": { 'black': 0.004651, 'red': 0.00093 },
        "9_all": { 'black': 0.003488, 'red': 0.000698 },
        "drop": { 'black': 0.003488, 'red': 0.000698 },
        "meso": { 'black': 0.003488, 'red': 0.000698 },
        "9_stat": { 'black': 0.107955, 'red': 0.1125 },
        "6_all": { 'black': 0.086364, 'red': 0.09 },
        "12_hp": { 'black': 0.004651, 'red': 0.00093 },
        "9_hp": { 'black': 0.129545, 'red': 0.135 }
      }
    },
    'hat': {
      "line_1":
      {
        "12_stat": { 'black': 0.08, 'red': 0.08 },
        "9_all": { 'black': 0.06, 'red': 0.06 },
        "cd_2": { 'black': 0.04, 'red': 0.04 },
        "cd_1": { 'black': 0.06, 'red': 0.06 },
        "12_hp": { 'black': 0.08, 'red': 0.08 }
      },
      "line_2":
      {
        "12_stat": { 'black': 0.016, 'red': 0.008 },
        "9_all": { 'black': 0.012, 'red': 0.006 },
        "cd_2": { 'black': 0.008, 'red': 0.004 },
        "cd_1": { 'black': 0.012, 'red': 0.006 },
        "9_stat": { 'black': 0.064516, 'red': 0.072581 },
        "6_all": { 'black': 0.051613, 'red': 0.058065 },
        "12_hp": { 'black': 0.016, 'red': 0.008 },
        "9_hp": { 'black': 0.077419, 'red': 0.087097 }
      },
      "line_3":
      {
        "12_stat": { 'black': 0.004, 'red': 0.0008 },
        "9_all": { 'black': 0.003, 'red': 0.0006 },
        "cd_2": { 'black': 0.002, 'red': 0.0004 },
        "cd_1": { 'black': 0.003, 'red': 0.0006 },
        "9_stat": { 'black': 0.076613, 'red': 0.079839 },
        "6_all": { 'black': 0.06129, 'red': 0.063871 },
        "12_hp": { 'black': 0.004, 'red': 0.0008 },
        "9_hp": { 'black': 0.091935, 'red': 0.095806 }
      }
    }

  }

  function prob_meso_drop(line, boss_and_drop, probabilities, cube_type, item_type) {
    if (boss_and_drop) {
      return probabilities[item_type][line].drop[cube_type] * 2
    }
    else {
      return probabilities[item_type][line].drop[cube_type]
    }
  }
  function prob_line(line, line_type, probabilities, cube_type, item_type, amount_of_stat) {
    if (line_type == "att") {
      if (line == "line_1") { }
      else {
      }
    }

    if (line_type == "stat") {
      if (line == "line_1") {
        if (amount_of_stat == 12) return probabilities[item_type][line]["12_stat"][cube_type]
        if (amount_of_stat == 9) return probabilities[item_type][line]["9_all"][cube_type]
        return probabilities[item_type][line]["12_stat"][cube_type] + probabilities[item_type][line]["9_all"][cube_type]
      }
      else {
        if (amount_of_stat == 12) return probabilities[item_type][line]["12_stat"][cube_type]
        if (amount_of_stat == 9) return probabilities[item_type][line]["9_all"][cube_type] + probabilities[item_type][line]["9_stat"][cube_type]
        return probabilities[item_type][line]["12_stat"][cube_type] + probabilities[item_type][line]["9_all"][cube_type] + probabilities[item_type][line]["9_stat"][cube_type] + probabilities[item_type][line]["6_all"][cube_type]
      }
    }

    if (line_type == "all") {
      if (line == "line_1") {
        return probabilities[item_type][line]["9_all"][cube_type]
      }
      else {
        if (amount_of_stat == 12) return probabilities[item_type][line]["9_all"][cube_type]
        if (amount_of_stat == 9) return probabilities[item_type][line]["6_all"][cube_type]
        return probabilities[item_type][line]["9_all"][cube_type] + probabilities[item_type][line]["6_all"][cube_type]
      }
    }

    if (line_type == "hp") {
      if (line == "line_1") {
        return probabilities[item_type][line]["12_hp"][cube_type]
      }
      else {
        if (amount_of_stat == 12) return probabilities[item_type][line]["12_hp"][cube_type]
        if (amount_of_stat == 9) return probabilities[item_type][line]["9_hp"][cube_type]
        return probabilities[item_type][line]["12_hp"][cube_type] + probabilities[item_type][line]["9_hp"][cube_type]
      }
    }
    return probabilities[item_type][line][line_type][cube_type]
  }
  //hat

  if (desired_outcome == "4SecCD" || desired_outcome == "3SecCD" || desired_outcome == "2SecCD" || desired_outcome == "5SecCD" || desired_outcome == "6SecCD") {
    var prob_2sec_line_1 = prob_line("line_1", "cd_2", probabilities, cube_type, item_type)
    var prob_2sec_line_2 = prob_line("line_2", "cd_2", probabilities, cube_type, item_type)
    var prob_2sec_line_3 = prob_line("line_3", "cd_2", probabilities, cube_type, item_type)

    var prob_1sec_line_1 = prob_line("line_1", "cd_1", probabilities, cube_type, item_type)
    var prob_1sec_line_2 = prob_line("line_2", "cd_1", probabilities, cube_type, item_type)
    var prob_1sec_line_3 = prob_line("line_3", "cd_1", probabilities, cube_type, item_type)

    var prob_other_line_1 = 1 - prob_2sec_line_1 - prob_1sec_line_1
    var prob_other_line_2 = 1 - prob_2sec_line_2 - prob_1sec_line_2
    var prob_other_line_3 = 1 - prob_2sec_line_3 - prob_1sec_line_3

    var probability = 0

    if (desired_outcome == "2SecCD") {
      //2 O O 
      probability = probability + prob_2sec_line_1 * prob_other_line_2 * prob_other_line_3
      //O 2 O
      probability = probability + prob_2sec_line_2 * prob_other_line_1 * prob_other_line_3
      //O O 2
      probability = probability + prob_2sec_line_3 * prob_other_line_2 * prob_other_line_1

      //1 1 O
      probability = probability + prob_1sec_line_1 * prob_1sec_line_2 * prob_other_line_3
      //1 O 1
      probability = probability + prob_1sec_line_1 * prob_1sec_line_3 * prob_other_line_2
      //O 1 1
      probability = probability + prob_1sec_line_3 * prob_1sec_line_2 * prob_other_line_1
    }
    if (desired_outcome == "3SecCD" || desired_outcome == "2SecCD") {
      //2 O 1
      probability = probability + prob_2sec_line_1 * prob_other_line_2 * prob_1sec_line_3
      //2 1 O
      probability = probability + prob_2sec_line_1 * prob_other_line_3 * prob_1sec_line_2
      //1 2 O
      probability = probability + prob_2sec_line_2 * prob_other_line_3 * prob_1sec_line_1
      //1 O 2
      probability = probability + prob_2sec_line_3 * prob_other_line_2 * prob_1sec_line_1
      //O 1 2
      probability = probability + prob_2sec_line_3 * prob_other_line_1 * prob_1sec_line_2
      //O 2 1
      probability = probability + prob_2sec_line_2 * prob_other_line_1 * prob_1sec_line_3
      //1 1 1
      probability = probability + prob_1sec_line_1 * prob_1sec_line_2 * prob_1sec_line_3
    }
    ////////4sec+
    //2 2 2
    probability = probability + prob_2sec_line_1 * prob_2sec_line_2 * prob_2sec_line_3

    if (desired_outcome != "6SecCD") {
      //2 2 1
      probability = probability + prob_2sec_line_1 * prob_2sec_line_2 * prob_1sec_line_3
      //2 1 2
      probability = probability + prob_2sec_line_1 * prob_1sec_line_2 * prob_2sec_line_3
      //1 2 2
      probability = probability + prob_1sec_line_1 * prob_2sec_line_2 * prob_2sec_line_3
    }

    if (desired_outcome != "5SecCD" && desired_outcome != "6SecCD" ) {
      //2 1 1
      probability = probability + prob_2sec_line_1 * prob_1sec_line_2 * prob_1sec_line_3
      //1 2 1
      probability = probability + prob_1sec_line_1 * prob_2sec_line_2 * prob_1sec_line_3
      //1 1 2
      probability = probability + prob_1sec_line_1 * prob_1sec_line_2 * prob_2sec_line_3

      //2 2 O
      probability = probability + prob_2sec_line_1 * prob_2sec_line_2 * prob_other_line_3
      //2 O 2
      probability = probability + prob_2sec_line_1 * prob_2sec_line_3 * prob_other_line_2
      //O 2 2
      probability = probability + prob_2sec_line_3 * prob_2sec_line_2 * prob_other_line_1
    }
  }

  //here
  if (desired_outcome == "2SecCDAnd2Stat" || desired_outcome == "2SecCDAnd2HP" || desired_outcome == "2SecCDAnd2ALL") {
    var stat = "stat"
    if (desired_outcome == "2SecCDAnd2HP") stat = "hp"
    if (desired_outcome == "2SecCDAnd2ALL") stat = "all"

    var cd_line_1 = probabilities[item_type]["line_1"]["cd_2"][cube_type]
    var cd_line_2 = probabilities[item_type]["line_2"]["cd_2"][cube_type]
    var cd_line_3 = probabilities[item_type]["line_3"]["cd_2"][cube_type]

    var stat_line_1 = prob_line("line_1", stat, probabilities, cube_type, item_type)
    var stat_line_2 = prob_line("line_2", stat, probabilities, cube_type, item_type)
    var stat_line_3 = prob_line("line_3", stat, probabilities, cube_type, item_type)

    var probability = 0

    //CD S S
    probability = probability + cd_line_1 * stat_line_2 * stat_line_3
    //S CD S
    probability = probability + cd_line_2 * stat_line_1 * stat_line_3
    //S S CD
    probability = probability + cd_line_3 * stat_line_2 * stat_line_1
  }

  if (desired_outcome == "4SecCDAndStat" || desired_outcome == "4SecCDAndHP" || desired_outcome == "4SecCDAndALL" || desired_outcome == "2SecCDAndStat" || desired_outcome == "2SecCDAndHP" || desired_outcome == "2SecCDAndALL" || desired_outcome == "3SecCDAndStat" || desired_outcome == "3SecCDAndHP" || desired_outcome == "3SecCDAndALL") {
    if (desired_outcome == "4SecCDAndStat" || desired_outcome == "3SecCDAndStat" || desired_outcome == "2SecCDAndStat") var stat = "stat"
    if (desired_outcome == "4SecCDAndHP" || desired_outcome == "3SecCDAndHP" || desired_outcome == "2SecCDAndHP") var stat = "hp"
    if (desired_outcome == "4SecCDAndALL" || desired_outcome == "3SecCDAndALL" || desired_outcome == "2SecCDAndALL") var stat = "all"

    var prob_2sec_line_1 = prob_line("line_1", "cd_2", probabilities, cube_type, item_type)
    var prob_2sec_line_2 = prob_line("line_2", "cd_2", probabilities, cube_type, item_type)
    var prob_2sec_line_3 = prob_line("line_3", "cd_2", probabilities, cube_type, item_type)

    var prob_stat_line_1 = prob_line("line_1", stat, probabilities, cube_type, item_type)
    var prob_stat_line_2 = prob_line("line_2", stat, probabilities, cube_type, item_type)
    var prob_stat_line_3 = prob_line("line_3", stat, probabilities, cube_type, item_type)

    var prob_1sec_line_1 = prob_line("line_1", "cd_1", probabilities, cube_type, item_type)
    var prob_1sec_line_2 = prob_line("line_2", "cd_1", probabilities, cube_type, item_type)
    var prob_1sec_line_3 = prob_line("line_3", "cd_1", probabilities, cube_type, item_type)

    var prob_other_line_1 = 1 - prob_2sec_line_1 - prob_1sec_line_1
    var prob_other_line_2 = 1 - prob_2sec_line_2 - prob_1sec_line_2
    var prob_other_line_3 = 1 - prob_2sec_line_3 - prob_1sec_line_3

    var probability = 0

    if (desired_outcome == "2SecCDAndStat" || desired_outcome == "2SecCDAndHP" || desired_outcome == "2SecCDAndALL") {
      //2 O S
      probability = probability + prob_2sec_line_1 * prob_other_line_2 * prob_stat_line_3
      //2 S O
      probability = probability + prob_2sec_line_1 * prob_other_line_3 * prob_stat_line_2
      //S 2 O
      probability = probability + prob_2sec_line_2 * prob_other_line_3 * prob_stat_line_1
      //S O 2
      probability = probability + prob_2sec_line_3 * prob_other_line_2 * prob_stat_line_1
      //O S 2
      probability = probability + prob_2sec_line_3 * prob_other_line_1 * prob_stat_line_2
      //O 2 S
      probability = probability + prob_2sec_line_2 * prob_other_line_1 * prob_stat_line_3

      //1 1 S
      probability = probability + prob_1sec_line_1 * prob_1sec_line_2 * prob_stat_line_3
      //1 S 1
      probability = probability + prob_1sec_line_1 * prob_1sec_line_3 * prob_stat_line_2
      //S 1 1
      probability = probability + prob_1sec_line_2 * prob_1sec_line_3 * prob_stat_line_1
    }

    if (desired_outcome == "3SecCDAndStat" || desired_outcome == "3SecCDAndHP" || desired_outcome == "3SecCDAndALL" || desired_outcome == "2SecCDAndStat" || desired_outcome == "2SecCDAndHP" || desired_outcome == "2SecCDAndALL") {
      //2 1 S
      probability = probability + prob_2sec_line_1 * prob_1sec_line_2 * prob_stat_line_3
      //2 S 1
      probability = probability + prob_2sec_line_1 * prob_1sec_line_3 * prob_stat_line_2
      //S 1 2
      probability = probability + prob_2sec_line_3 * prob_1sec_line_2 * prob_stat_line_1
      //S 2 1 
      probability = probability + prob_2sec_line_2 * prob_1sec_line_3 * prob_stat_line_1
      //1 2 S
      probability = probability + prob_2sec_line_2 * prob_1sec_line_1 * prob_stat_line_3
      //1 S 2
      probability = probability + prob_2sec_line_3 * prob_1sec_line_1 * prob_stat_line_2
    }

    //2 2 S
    probability = probability + prob_2sec_line_1 * prob_2sec_line_2 * prob_stat_line_3
    //2 S 2
    probability = probability + prob_2sec_line_1 * prob_2sec_line_3 * prob_stat_line_2
    //S 2 2
    probability = probability + prob_2sec_line_3 * prob_2sec_line_2 * prob_stat_line_1
  }

  //accessory
  if (desired_outcome == "1LMeso" || desired_outcome == "1LDrop") {
    var prob_meso_line_1 = prob_meso_drop("line_1", false, probabilities, cube_type, item_type)
    var prob_meso_line_2 = prob_meso_drop("line_2", false, probabilities, cube_type, item_type)
    var prob_meso_line_3 = prob_meso_drop("line_3", false, probabilities, cube_type, item_type)
    //MMM
    var probability_1 = prob_meso_line_1 * prob_meso_line_2 * prob_meso_line_3
    if (desired_outcome == "1LDrop") { //3l drop not possible
      probability_1 = 0
    }

    //MMO
    var probability_2 = prob_meso_line_1 * prob_meso_line_2 * (1 - prob_meso_line_1 * prob_meso_line_3)
    if (desired_outcome == "1LDrop") { //3l drop not possible
      probability_2 = prob_meso_line_1 * prob_meso_line_2
    }
    //MOM
    var probability_3 = prob_meso_line_1 * (1 - prob_meso_line_2) * prob_meso_line_3
    //OMM
    var probability_4 = (1 - prob_meso_line_1) * prob_meso_line_2 * prob_meso_line_3

    //OOM
    var probability_5 = (1 - prob_meso_line_1) * (1 - prob_meso_line_2) * prob_meso_line_3
    //OMO
    var probability_6 = (1 - prob_meso_line_1) * prob_meso_line_2 * (1 - prob_meso_line_3)
    //MOO
    var probability_7 = prob_meso_line_1 * (1 - prob_meso_line_2) * (1 - prob_meso_line_3)

    var probability = probability_1 + probability_2 + probability_3 + probability_4 + probability_5 + probability_6 + probability_7
  }
  if (desired_outcome == "1LDropOrMeso") {
    //similar to above but 2*P(M) = P(M or D)
    var prob_meso_line_1 = prob_meso_drop("line_1", true, probabilities, cube_type, item_type)
    var prob_meso_line_2 = prob_meso_drop("line_2", true, probabilities, cube_type, item_type)
    var prob_meso_line_3 = prob_meso_drop("line_3", true, probabilities, cube_type, item_type)

    //MMM
    //here this needs to be fixed in the case first two lines are drop
    var probability_1 = prob_meso_line_1 * prob_meso_line_2 * prob_meso_line_3

    //MMO
    //here this needs to be fixed in the case first two lines are drop
    var probability_2 = prob_meso_line_1 * prob_meso_line_2 * (1 - prob_meso_line_1 * prob_meso_line_3)
    //MOM
    var probability_3 = prob_meso_line_1 * (1 - prob_meso_line_2) * prob_meso_line_3
    //OMM
    var probability_4 = (1 - prob_meso_line_1) * prob_meso_line_2 * prob_meso_line_3

    //OOM
    var probability_5 = (1 - prob_meso_line_1) * (1 - prob_meso_line_2) * prob_meso_line_3
    //OMO
    var probability_6 = (1 - prob_meso_line_1) * prob_meso_line_2 * (1 - prob_meso_line_3)
    //MOO
    var probability_7 = prob_meso_line_1 * (1 - prob_meso_line_2) * (1 - prob_meso_line_3)

    var probability = probability_1 + probability_2 + probability_3 + probability_4 + probability_5 + probability_6 + probability_7

  }

  if (desired_outcome == "1LDropOrMesoAndHP" || desired_outcome == "1LDropOrMesoAndALL" || desired_outcome == "1LDropOrMesoAndStat" || desired_outcome == "1LMesoAndStat" || desired_outcome == "1LDropAndStat" || desired_outcome == "1LMesoAndALL" || desired_outcome == "1LDropAndALL" || desired_outcome == "1LMesoAndHP" || desired_outcome == "1LDropAndHP") {
    var stat
    var meso_and_drop = true

    if (desired_outcome == "1LDropOrMesoAndHP") stat = "hp"
    if (desired_outcome == "1LDropOrMesoAndALL") stat = "all"
    if (desired_outcome == "1LDropOrMesoAndStat") stat = "stat"
    if (desired_outcome == "1LMesoAndStat" || desired_outcome == "1LDropAndStat") {
      stat = "stat"
      meso_and_drop = false
    }
    if (desired_outcome == "1LMesoAndALL" || desired_outcome == "1LDropAndALL") {
      stat = "all"
      meso_and_drop = false
    }
    if (desired_outcome == "1LMesoAndHP" || desired_outcome == "1LDropAndHP") {
      stat = "hp"
      meso_and_drop = false
    }

    var prob_meso_line_1 = prob_meso_drop("line_1", meso_and_drop, probabilities, cube_type, item_type)
    var prob_meso_line_2 = prob_meso_drop("line_2", meso_and_drop, probabilities, cube_type, item_type)
    var prob_meso_line_3 = prob_meso_drop("line_3", meso_and_drop, probabilities, cube_type, item_type)

    var prob_stat_line_1 = prob_line("line_1", stat, probabilities, cube_type, item_type)
    var prob_stat_line_2 = prob_line("line_2", stat, probabilities, cube_type, item_type)
    var prob_stat_line_3 = prob_line("line_3", stat, probabilities, cube_type, item_type)

    var prob_other_line_1 = 1 - prob_meso_line_1 - prob_stat_line_1
    var prob_other_line_2 = 1 - prob_meso_line_2 - prob_stat_line_2
    var prob_other_line_3 = 1 - prob_meso_line_3 - prob_stat_line_3

    //MMS
    //here adjust 3rd line in the event first 2 events are drop
    var probability_1 = prob_meso_line_1 * prob_meso_line_2 * prob_stat_line_3
    //MSM
    var probability_2 = prob_meso_line_1 * prob_stat_line_2 * prob_meso_line_3
    //SMM
    var probability_3 = prob_stat_line_1 * prob_meso_line_2 * prob_meso_line_3

    //MSS
    var probability_4 = prob_meso_line_1 * prob_stat_line_2 * prob_stat_line_3
    //SMS
    var probability_5 = prob_stat_line_1 * prob_meso_line_2 * prob_stat_line_3
    //SSM
    var probability_6 = prob_stat_line_1 * prob_stat_line_2 * prob_meso_line_3

    //MSO
    var probability_7 = prob_meso_line_1 * prob_stat_line_2 * prob_other_line_3
    //MOS
    var probability_8 = prob_meso_line_1 * prob_other_line_2 * prob_stat_line_3

    //SOM
    var probability_9 = prob_stat_line_1 * prob_other_line_2 * prob_meso_line_3
    //SMO
    var probability_10 = prob_stat_line_1 * prob_meso_line_2 * prob_other_line_3
    //OSM
    var probability_11 = prob_other_line_1 * prob_stat_line_2 * prob_meso_line_3
    //OMS
    var probability_12 = prob_stat_line_1 * prob_meso_line_2 * prob_stat_line_3

    var probability = probability_1 + probability_2 + probability_3 + probability_4 + probability_5 + probability_6 + probability_7 + probability_8 + probability_9 + probability_10 + probability_11 + probability_12
  }


  if (desired_outcome == "2LMeso" || desired_outcome == "2LDrop" || desired_outcome == "2LDropOrMeso") {
    var meso_and_drop = false
    if (desired_outcome == "2LDropOrMeso") meso_and_drop = true

    var prob_meso_line_1 = prob_meso_drop("line_1", meso_and_drop, probabilities, cube_type, item_type)
    var prob_meso_line_2 = prob_meso_drop("line_2", meso_and_drop, probabilities, cube_type, item_type)
    var prob_meso_line_3 = prob_meso_drop("line_3", meso_and_drop, probabilities, cube_type, item_type)

    //MMM
    var probability_1 = prob_meso_line_1 * prob_meso_line_2 * prob_meso_line_3
    if (desired_outcome == "2LDrop") { //3l drop not possible
      probability_1 = 0
    }

    //MMO
    var probability_2 = prob_meso_line_1 * prob_meso_line_2 * (1 - prob_meso_line_3)
    if (desired_outcome == "2LDrop") { //3l drop not possible
      probability_2 = prob_meso_line_1 * prob_meso_line_2
    }
    //MOM
    var probability_3 = prob_meso_line_1 * (1 - prob_meso_line_2) * prob_meso_line_3
    //OMM
    var probability_4 = (1 - prob_meso_line_1) * prob_meso_line_2 * prob_meso_line_3

    var probability = probability_1 + probability_2 + probability_3 + probability_4
  }

  //gloves
  if (desired_outcome == "1LCrit") {
    //COO
    var probability_5 = probabilities[item_type].line_1.crit[cube_type] * (1 - probabilities[item_type].line_2.crit[cube_type]) * (1 - probabilities[item_type].line_3.crit[cube_type])

    //OCO
    var probability_6 = (1 - probabilities[item_type].line_1.crit[cube_type]) * probabilities[item_type].line_2.crit[cube_type] * (1 - probabilities[item_type].line_3.crit[cube_type])

    //OOC
    var probability_7 = (1 - probabilities[item_type].line_1.crit[cube_type]) * (1 - probabilities[item_type].line_2.crit[cube_type]) * probabilities[item_type].line_3.crit[cube_type]

    //////////////////
    //2L CRIT+
    //CCO
    var probability_1 = probabilities[item_type].line_1.crit[cube_type] * probabilities[item_type].line_2.crit[cube_type] * (1 - probabilities[item_type].line_3.crit[cube_type])

    //COC
    var probability_2 = probabilities[item_type].line_1.crit[cube_type] * (1 - probabilities[item_type].line_2.crit[cube_type]) * probabilities[item_type].line_3.crit[cube_type]

    //OCC
    var probability_3 = (1 - probabilities[item_type].line_1.crit[cube_type]) * probabilities[item_type].line_2.crit[cube_type] * probabilities[item_type].line_3.crit[cube_type]

    //CCC
    var probability_4 = probabilities[item_type].line_1.crit[cube_type] * probabilities[item_type].line_2.crit[cube_type] * probabilities[item_type].line_3.crit[cube_type]

    var probability = probability_1 + probability_2 + probability_3 + probability_4 + probability_5 + probability_6 + probability_7

  }

  if (desired_outcome == "1LCritAndStat") {
    //C S OTHER
    var probability_7 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_2["12_stat"][cube_type] + probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]) * (1 - probabilities[item_type].line_3.crit[cube_type] - (probabilities[item_type].line_3["12_stat"][cube_type] + probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type]))

    //C OTHER S
    var probability_8 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_3["12_stat"][cube_type] + probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type]) * (1 - probabilities[item_type].line_2.crit[cube_type] - (probabilities[item_type].line_2["12_stat"][cube_type] + probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]))

    //OTHER C S
    var probability_11 = probabilities[item_type].line_2.crit[cube_type] * (probabilities[item_type].line_3["12_stat"][cube_type] + probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type]) * (1 - probabilities[item_type].line_1.crit[cube_type] - (probabilities[item_type].line_1["12_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]))

    //OTHER S C
    var probability_12 = probabilities[item_type].line_3.crit[cube_type] * (probabilities[item_type].line_2["12_stat"][cube_type] + probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]) * (1 - probabilities[item_type].line_1.crit[cube_type] - (probabilities[item_type].line_1["12_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]))

    //S OTHER C
    var probability_9 = probabilities[item_type].line_3.crit[cube_type] * (probabilities[item_type].line_1["12_stat"][cube_type] + probabilities[item_type].line_1["9_all"][cube_type]) * (1 - probabilities[item_type].line_2.crit[cube_type] - (probabilities[item_type].line_2["12_stat"][cube_type] + probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]))

    //S C OTHER
    var probability_10 = probabilities[item_type].line_2.crit[cube_type] * (probabilities[item_type].line_1["12_stat"][cube_type] + probabilities[item_type].line_1["9_all"][cube_type]) * (1 - probabilities[item_type].line_3.crit[cube_type] - (probabilities[item_type].line_3["12_stat"][cube_type] + probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type]))

    ///////////////
    //SCC
    var probability_1 = (probabilities[item_type].line_1["12_stat"][cube_type] + probabilities[item_type].line_1["9_all"][cube_type]) * probabilities[item_type].line_2.crit[cube_type] * probabilities[item_type].line_3.crit[cube_type]

    //CSC
    var probability_2 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_2["12_stat"][cube_type] + probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]) * probabilities[item_type].line_3.crit[cube_type]

    //CCS
    var probability_3 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_3["12_stat"][cube_type] + probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type]) * probabilities[item_type].line_2.crit[cube_type]

    /////////////////
    //CSS
    var probability_4 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_2["12_stat"][cube_type] + probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]) * (probabilities[item_type].line_3["12_stat"][cube_type] + probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type])

    //SCS
    var probability_5 = probabilities[item_type].line_2.crit[cube_type] * (probabilities[item_type].line_1["12_stat"][cube_type] + probabilities[item_type].line_1["9_all"][cube_type]) * (probabilities[item_type].line_3["12_stat"][cube_type] + probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type])

    //SSC
    var probability_6 = probabilities[item_type].line_3.crit[cube_type] * (probabilities[item_type].line_2["12_stat"][cube_type] + probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]) * (probabilities[item_type].line_1["12_stat"][cube_type] + probabilities[item_type].line_1["9_all"][cube_type])

    var probability = probability_1 + probability_2 + probability_3 + probability_4 + probability_5 + probability_6 + probability_7 + probability_8 + probability_9 + probability_10 + probability_11 + probability_12

  }
  if (desired_outcome == "1LCritAndALL") {
    //C S OTHER
    var probability_7 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]) * (1 - probabilities[item_type].line_3.crit[cube_type] - (probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type]))

    //C OTHER S
    var probability_8 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type]) * (1 - probabilities[item_type].line_2.crit[cube_type] - (probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]))

    //OTHER C S
    var probability_11 = probabilities[item_type].line_2.crit[cube_type] * (probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type]) * (1 - probabilities[item_type].line_1.crit[cube_type] - (probabilities[item_type].line_2["9_all"][cube_type]))

    //OTHER S C
    var probability_12 = probabilities[item_type].line_3.crit[cube_type] * (probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]) * (1 - probabilities[item_type].line_1.crit[cube_type] - (probabilities[item_type].line_2["9_all"][cube_type]))

    //S OTHER C
    var probability_9 = probabilities[item_type].line_3.crit[cube_type] * (probabilities[item_type].line_1["9_all"][cube_type]) * (1 - probabilities[item_type].line_2.crit[cube_type] - (probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]))

    //S C OTHER
    var probability_10 = probabilities[item_type].line_2.crit[cube_type] * (probabilities[item_type].line_1["9_all"][cube_type]) * (1 - probabilities[item_type].line_3.crit[cube_type] - (probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type]))

    ///////////////
    //SCC
    var probability_1 = (probabilities[item_type].line_1["9_all"][cube_type]) * probabilities[item_type].line_2.crit[cube_type] * probabilities[item_type].line_3.crit[cube_type]

    //CSC
    var probability_2 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]) * probabilities[item_type].line_3.crit[cube_type]

    //CCS
    var probability_3 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type]) * probabilities[item_type].line_2.crit[cube_type]

    /////////////////
    //CSS
    var probability_4 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]) * (probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type])

    //SCS
    var probability_5 = probabilities[item_type].line_2.crit[cube_type] * (probabilities[item_type].line_1["9_all"][cube_type]) * (probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type])

    //SSC
    var probability_6 = probabilities[item_type].line_3.crit[cube_type] * (probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]) * (probabilities[item_type].line_1["9_all"][cube_type])

    var probability = probability_1 + probability_2 + probability_3 + probability_4 + probability_5 + probability_6 + probability_7 + probability_8 + probability_9 + probability_10 + probability_11 + probability_12

  }
  if (desired_outcome == "1LCritandHP") {
    //C S OTHER
    var probability_7 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_2["12_hp"][cube_type] + probabilities[item_type].line_2["9_hp"][cube_type]) * (1 - probabilities[item_type].line_3.crit[cube_type] - (probabilities[item_type].line_3["12_hp"][cube_type] + probabilities[item_type].line_3["9_hp"][cube_type]))

    //C OTHER S
    var probability_8 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_3["12_hp"][cube_type] + probabilities[item_type].line_3["9_hp"][cube_type]) * (1 - probabilities[item_type].line_2.crit[cube_type] - (probabilities[item_type].line_2["12_hp"][cube_type] + probabilities[item_type].line_2["9_hp"][cube_type]))

    //OTHER C S
    var probability_11 = probabilities[item_type].line_2.crit[cube_type] * (probabilities[item_type].line_3["12_hp"][cube_type] + probabilities[item_type].line_3["9_hp"][cube_type]) * (1 - probabilities[item_type].line_1.crit[cube_type] - (probabilities[item_type].line_2["12_hp"][cube_type]))

    //OTHER S C
    var probability_12 = probabilities[item_type].line_3.crit[cube_type] * (probabilities[item_type].line_2["12_hp"][cube_type] + probabilities[item_type].line_2["9_hp"][cube_type]) * (1 - probabilities[item_type].line_1.crit[cube_type] - (probabilities[item_type].line_2["12_hp"][cube_type]))

    //S OTHER C
    var probability_9 = probabilities[item_type].line_3.crit[cube_type] * (probabilities[item_type].line_1["12_hp"][cube_type]) * (1 - probabilities[item_type].line_2.crit[cube_type] - (probabilities[item_type].line_2["12_hp"][cube_type] + probabilities[item_type].line_2["9_hp"][cube_type]))

    //S C OTHER
    var probability_10 = probabilities[item_type].line_2.crit[cube_type] * (probabilities[item_type].line_1["12_hp"][cube_type]) * (1 - probabilities[item_type].line_3.crit[cube_type] - (probabilities[item_type].line_3["12_hp"][cube_type] + probabilities[item_type].line_3["9_hp"][cube_type]))

    ///////////////
    //SCC
    var probability_1 = (probabilities[item_type].line_1["12_hp"][cube_type]) * probabilities[item_type].line_2.crit[cube_type] * probabilities[item_type].line_3.crit[cube_type]

    //CSC
    var probability_2 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_2["12_hp"][cube_type] + probabilities[item_type].line_2["9_hp"][cube_type]) * probabilities[item_type].line_3.crit[cube_type]

    //CCS
    var probability_3 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_3["12_hp"][cube_type] + probabilities[item_type].line_3["9_hp"][cube_type]) * probabilities[item_type].line_2.crit[cube_type]

    /////////////////
    //CSS
    var probability_4 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_2["12_hp"][cube_type] + probabilities[item_type].line_2["9_hp"][cube_type]) * (probabilities[item_type].line_3["12_hp"][cube_type] + probabilities[item_type].line_3["9_hp"][cube_type])

    //SCS
    var probability_5 = probabilities[item_type].line_2.crit[cube_type] * (probabilities[item_type].line_1["12_hp"][cube_type]) * (probabilities[item_type].line_3["12_hp"][cube_type] + probabilities[item_type].line_3["9_hp"][cube_type])

    //SSC
    var probability_6 = probabilities[item_type].line_3.crit[cube_type] * (probabilities[item_type].line_2["12_hp"][cube_type] + probabilities[item_type].line_2["9_hp"][cube_type]) * (probabilities[item_type].line_1["12_hp"][cube_type])

    var probability = probability_1 + probability_2 + probability_3 + probability_4 + probability_5 + probability_6 + probability_7 + probability_8 + probability_9 + probability_10 + probability_11 + probability_12

  }

  if (desired_outcome == "1LCritAnd2Stat") {
    //CSS
    var probability_1 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_2["12_stat"][cube_type] + probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]) * (probabilities[item_type].line_3["12_stat"][cube_type] + probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type])

    //SCS
    var probability_2 = probabilities[item_type].line_2.crit[cube_type] * (probabilities[item_type].line_1["12_stat"][cube_type] + probabilities[item_type].line_1["9_all"][cube_type]) * (probabilities[item_type].line_3["12_stat"][cube_type] + probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type])

    //SSC
    var probability_3 = probabilities[item_type].line_3.crit[cube_type] * (probabilities[item_type].line_2["12_stat"][cube_type] + probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]) * (probabilities[item_type].line_1["12_stat"][cube_type] + probabilities[item_type].line_1["9_all"][cube_type])

    var probability = probability_1 + probability_2 + probability_3
  }
  if (desired_outcome == "1LCritAnd2ALL") {
    //CAA
    var probability_1 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]) * (probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type])

    //ACA
    var probability_2 = probabilities[item_type].line_2.crit[cube_type] * (probabilities[item_type].line_1["9_all"][cube_type]) * (probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type])

    //AAC
    var probability_3 = probabilities[item_type].line_3.crit[cube_type] * (probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]) * (probabilities[item_type].line_1["9_all"][cube_type])

    var probability = probability_1 + probability_2 + probability_3
  }
  if (desired_outcome == "1LCritand2HP") {
    //C,H,H
    var probability_1 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_2["12_hp"][cube_type] + probabilities[item_type].line_2["9_hp"][cube_type]) * (probabilities[item_type].line_3["12_hp"][cube_type] + probabilities[item_type].line_3["9_hp"][cube_type])

    //H,C,H
    var probability_2 = probabilities[item_type].line_2.crit[cube_type] * (probabilities[item_type].line_1["12_hp"][cube_type]) * (probabilities[item_type].line_3["12_hp"][cube_type] + probabilities[item_type].line_3["9_hp"][cube_type])

    //H,H,C
    var probability_3 = probabilities[item_type].line_3.crit[cube_type] * (probabilities[item_type].line_2["12_hp"][cube_type] + probabilities[item_type].line_2["9_hp"][cube_type]) * (probabilities[item_type].line_1["12_hp"][cube_type])

    var probability = probability_1 + probability_2 + probability_3
  }

  if (desired_outcome == "2LCrit") {
    //CCO
    var probability_1 = probabilities[item_type].line_1.crit[cube_type] * probabilities[item_type].line_2.crit[cube_type] * (1 - probabilities[item_type].line_3.crit[cube_type])

    //COC
    var probability_2 = probabilities[item_type].line_1.crit[cube_type] * (1 - probabilities[item_type].line_2.crit[cube_type]) * probabilities[item_type].line_3.crit[cube_type]

    //OCC
    var probability_3 = (1 - probabilities[item_type].line_1.crit[cube_type]) * probabilities[item_type].line_2.crit[cube_type] * probabilities[item_type].line_3.crit[cube_type]

    //CCC
    var probability_4 = probabilities[item_type].line_1.crit[cube_type] * probabilities[item_type].line_2.crit[cube_type] * probabilities[item_type].line_3.crit[cube_type]

    var probability = probability_1 + probability_2 + probability_3 + probability_4
  }

  if (desired_outcome == "3LCrit") {
    //CCC
    var probability = probabilities[item_type].line_1.crit[cube_type] * probabilities[item_type].line_2.crit[cube_type] * probabilities[item_type].line_3.crit[cube_type]
  }

  if (desired_outcome == "2LCritAndStat") {
    //SCC
    var probability_1 = (probabilities[item_type].line_1["12_stat"][cube_type] + probabilities[item_type].line_1["9_all"][cube_type]) * probabilities[item_type].line_2.crit[cube_type] * probabilities[item_type].line_3.crit[cube_type]

    //CSC
    var probability_2 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_2["12_stat"][cube_type] + probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]) * probabilities[item_type].line_3.crit[cube_type]

    //CCS
    var probability_3 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_3["12_stat"][cube_type] + probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type]) * probabilities[item_type].line_2.crit[cube_type]

    var probability = probability_1 + probability_2 + probability_3
  }

  if (desired_outcome == "2LCritAndALL") {
    //ACC
    var probability_1 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2.crit[cube_type] * probabilities[item_type].line_3.crit[cube_type]

    //CAC
    var probability_2 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_2["9_all"][cube_type] + probabilities[item_type].line_2["6_all"][cube_type]) * probabilities[item_type].line_3.crit[cube_type]

    //CCA
    var probability_3 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_3["9_all"][cube_type] + probabilities[item_type].line_3["6_all"][cube_type]) * probabilities[item_type].line_2.crit[cube_type]

    var probability = probability_1 + probability_2 + probability_3
  }

  if (desired_outcome == "2CritandHP") {
    //HCC
    var probability_1 = probabilities[item_type].line_1["12_hp"][cube_type] * probabilities[item_type].line_2.crit[cube_type] * probabilities[item_type].line_3.crit[cube_type]

    //CHC
    var probability_2 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_2["12_hp"][cube_type] + probabilities[item_type].line_2["9_hp"][cube_type]) * probabilities[item_type].line_3.crit[cube_type]

    //CCH
    var probability_3 = probabilities[item_type].line_1.crit[cube_type] * (probabilities[item_type].line_3["12_hp"][cube_type] + probabilities[item_type].line_3["9_hp"][cube_type]) * probabilities[item_type].line_2.crit[cube_type]

    var probability = probability_1 + probability_2 + probability_3
  }

  //WSE
  if (desired_outcome == "21ATT30BOSS" || desired_outcome == "21ATT35BOSS" || desired_outcome == "21ATT40BOSS" || desired_outcome == "24ATT30BOSS" || desired_outcome == "21ATTandIED" || desired_outcome == "24ATTandIED") {
    var stat = "30_boss"
    var att = 21
    if (desired_outcome == "24ATTandIED" || desired_outcome == "24ATT30BOSS") att = 24
    if (desired_outcome == "21ATT35BOSS") stat = "35_boss"
    if (desired_outcome == "21ATT40BOSS") stat = "40_boss"
    if (desired_outcome == "21ATTandIED" || desired_outcome == "24ATTandIED") stat = "ied"

    var prob_12_att_line_1 = probabilities[item_type].line_1["12_attack"][cube_type]
    var prob_12_att_line_2 = probabilities[item_type].line_2["12_attack"][cube_type]
    var prob_12_att_line_3 = probabilities[item_type].line_3["12_attack"][cube_type]

    var prob_9_att_line_2 = probabilities[item_type].line_2["9_attack"][cube_type]
    var prob_9_att_line_3 = probabilities[item_type].line_3["9_attack"][cube_type]

    if (stat == "ied") {
      var prob_stat_line_1 = probabilities[item_type].line_1[stat][cube_type]
      var prob_stat_line_2 = probabilities[item_type].line_2[stat][cube_type]
      var prob_stat_line_3 = probabilities[item_type].line_3[stat][cube_type]
    }
    else {
      var prob_stat_line_1 = probabilities[item_type].line_1["40_boss"][cube_type]
      var prob_stat_line_2 = probabilities[item_type].line_2["40_boss"][cube_type]
      var prob_stat_line_3 = probabilities[item_type].line_3["40_boss"][cube_type]
    }
    if (stat == "30_boss" || stat == "35_boss") {
      prob_stat_line_1 = prob_stat_line_1 + probabilities[item_type].line_1["35_boss"][cube_type]
      prob_stat_line_2 = prob_stat_line_2 + probabilities[item_type].line_2["35_boss"][cube_type]
      prob_stat_line_3 = prob_stat_line_3 + probabilities[item_type].line_3["35_boss"][cube_type]
    }
    if (stat == "30_boss") {
      prob_stat_line_1 = prob_stat_line_1 + probabilities[item_type].line_1["30_boss"][cube_type]
      prob_stat_line_2 = prob_stat_line_2 + probabilities[item_type].line_2["30_boss"][cube_type]
      prob_stat_line_3 = prob_stat_line_3 + probabilities[item_type].line_3["30_boss"][cube_type]
    }

    var probability = 0

    console.log(prob_stat_line_1, prob_stat_line_2, prob_stat_line_3)

    if (att == 21) {
      //12A 9A S
      probability = probability + prob_12_att_line_1 * prob_9_att_line_2 * prob_stat_line_3
      //12A S 9A
      probability = probability + prob_12_att_line_1 * prob_9_att_line_3 * prob_stat_line_2
      //S 12A 9A
      probability = probability + prob_9_att_line_3 * prob_12_att_line_2 * prob_stat_line_1
      //S 9A 12A
      probability = probability + prob_12_att_line_3 * prob_9_att_line_2 * prob_stat_line_1
    }

    //12A 12A S
    probability = probability + prob_12_att_line_1 * prob_12_att_line_2 * prob_stat_line_3
    //12A S 12A
    probability = probability + prob_12_att_line_1 * prob_12_att_line_3 * prob_stat_line_2
    //S 12A 12A
    probability = probability + prob_12_att_line_3 * prob_12_att_line_2 * prob_stat_line_1
    
  }
  if (desired_outcome == "2LATT") {
    //12 OR 13 OR 23 OR 123
    var probability_1 = probabilities[item_type].line_1.attack[cube_type] * probabilities[item_type].line_2.attack[cube_type] * (1 - probabilities[item_type].line_3.attack[cube_type])
    var probability_2 = probabilities[item_type].line_1.attack[cube_type] * probabilities[item_type].line_3.attack[cube_type] * (1 - probabilities[item_type].line_2.attack[cube_type])
    var probability_3 = probabilities[item_type].line_2.attack[cube_type] * probabilities[item_type].line_3.attack[cube_type] * (1 - probabilities[item_type].line_1.attack[cube_type])
    var probability_4 = probabilities[item_type].line_1.attack[cube_type] * probabilities[item_type].line_2.attack[cube_type] * probabilities[item_type].line_3.attack[cube_type]

    var probability = probability_1 + probability_2 + probability_3 + probability_4
  }
  if (desired_outcome == "2ATTand1IED") {
    //ATT = 12 OR 13 OR 23
    var probability_1 = probabilities[item_type].line_1.attack[cube_type] * probabilities[item_type].line_2.attack[cube_type] * probabilities[item_type].line_3.ied[cube_type]
    var probability_2 = probabilities[item_type].line_1.attack[cube_type] * probabilities[item_type].line_2.ied[cube_type] * probabilities[item_type].line_3.attack[cube_type]
    var probability_3 = probabilities[item_type].line_1.ied[cube_type] * probabilities[item_type].line_2.attack[cube_type] * probabilities[item_type].line_3.attack[cube_type]
    var probability = probability_1 + probability_2 + probability_3
  }
  if (desired_outcome == "3LATT") {
    var probability = probabilities[item_type].line_1.attack[cube_type] * probabilities[item_type].line_2.attack[cube_type] * probabilities[item_type].line_3.attack[cube_type]
  }
  if (desired_outcome == "1ATTand2BOSS") {
    var probability_1 = probabilities[item_type].line_1.boss[cube_type] * probabilities[item_type].line_2.boss[cube_type] * (100 * probabilities[item_type].line_3.attack[cube_type]) / (100 - 100 * probabilities[item_type].line_3.boss[cube_type])
    var probability_2 = probabilities[item_type].line_1.boss[cube_type] * probabilities[item_type].line_2.attack[cube_type] * probabilities[item_type].line_3.boss[cube_type]
    var probability_3 = probabilities[item_type].line_1.attack[cube_type] * probabilities[item_type].line_2.boss[cube_type] * probabilities[item_type].line_3.boss[cube_type]
    var probability = probability_1 + probability_2 + probability_3
  }
  if (desired_outcome == "2ATTand1BOSS") {
    var probability_1 = probabilities[item_type].line_1.attack[cube_type] * probabilities[item_type].line_2.attack[cube_type] * probabilities[item_type].line_3.boss[cube_type]
    var probability_2 = probabilities[item_type].line_1.attack[cube_type] * probabilities[item_type].line_2.boss[cube_type] * probabilities[item_type].line_3.attack[cube_type]
    var probability_3 = probabilities[item_type].line_1.boss[cube_type] * probabilities[item_type].line_2.attack[cube_type] * probabilities[item_type].line_3.attack[cube_type]
    var probability = probability_1 + probability_2 + probability_3
  }
  //item_level >= 151
  if (desired_outcome == "26PercLUK") {
    //12+12+OTHER (would be ommited = 26)
    var probability_18 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * (1 - probabilities[item_type].line_3["12_stat"][cube_type] - probabilities[item_type].line_3["9_stat"][cube_type] - probabilities[item_type].line_3["9_all"][cube_type] - probabilities[item_type].line_3["6_all"][cube_type])

    //12+Other+12 (would be ommited = 26)
    var probability_19 = probabilities[item_type].line_1["12_stat"][cube_type] * (1 - probabilities[item_type].line_2["12_stat"][cube_type] - probabilities[item_type].line_2["9_stat"][cube_type] - probabilities[item_type].line_2["9_all"][cube_type] - probabilities[item_type].line_2["6_all"][cube_type]) * probabilities[item_type].line_3["12_stat"][cube_type]

    //Other+12+12 (would be ommited = 26)
    var probability_20 = (1 - probabilities[item_type].line_3["12_stat"][cube_type] - probabilities[item_type].line_3["9_all"][cube_type]) * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //12+6+6
    var probability_15 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * probabilities[item_type].line_3["6_all"][cube_type]

    //9+9+6
    var probability_16 = probabilities[item_type].line_1["9_all"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["6_all"][cube_type]

    //9+6+9
    var probability_17 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    ///////////////////////////////////////
    //add in all the 27percluk
    //12+9+6
    var probability_10 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["6_all"][cube_type]

    //12+6+9
    var probability_11 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])


    //9+9+9
    var probability_12 = probabilities[item_type].line_1["9_all"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //9+12+6
    var probability_13 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["6_all"][cube_type]

    //9+6+12
    var probability_14 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    ////////////////////////////////////////////
    //add in all the 30percluk
    var probability_1 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //12+12+9
    var probability_2 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //12+9+12
    var probability_3 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["12_stat"][cube_type]

    //12+12+12
    var probability_4 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //12+12+6
    var probability_5 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["6_all"][cube_type]

    //12+6+12
    var probability_6 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+12+12
    var probability_7 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+9+12
    var probability_8 = probabilities[item_type].line_1["9_all"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+12+9
    var probability_9 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    var probability = probability_1 + probability_2 + probability_3 + probability_4 + probability_5 + probability_6 + probability_7 + probability_8 + probability_9 + probability_10 + probability_11 + probability_12 + probability_13 + probability_14 + probability_15 + probability_16 + probability_17 + probability_18 + probability_19 + probability_20

  }
  if (desired_outcome == "27PercLUK" && itemLevel >= 151) {
    //12+6+6
    var probability_15 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * probabilities[item_type].line_3["6_all"][cube_type]

    //9+9+6
    var probability_16 = probabilities[item_type].line_1["9_all"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["6_all"][cube_type]

    //9+6+9
    var probability_17 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    ///////////////////////////////////////
    //add in all the 27percluk
    //12+9+6
    var probability_10 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["6_all"][cube_type]

    //12+6+9
    var probability_11 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])


    //9+9+9
    var probability_12 = probabilities[item_type].line_1["9_all"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //9+12+6
    var probability_13 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["6_all"][cube_type]

    //9+6+12
    var probability_14 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    ////////////////////////////////////////////
    //add in all the 30percluk
    var probability_1 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //12+12+9
    var probability_2 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //12+9+12
    var probability_3 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["12_stat"][cube_type]

    //12+12+12
    var probability_4 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //12+12+6
    var probability_5 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["6_all"][cube_type]

    //12+6+12
    var probability_6 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+12+12
    var probability_7 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+9+12
    var probability_8 = probabilities[item_type].line_1["9_all"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+12+9
    var probability_9 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    var probability = probability_1 + probability_2 + probability_3 + probability_4 + probability_5 + probability_6 + probability_7 + probability_8 + probability_9 + probability_10 + probability_11 + probability_12 + probability_13 + probability_14 + probability_15 + probability_16 + probability_17

  }

  //item_level < 151
  //HP will follow same logic as ALL Stat
  if (desired_outcome == "15PercALL" || desired_outcome == "17PercALL" || desired_outcome == "21PercHP") {
    if (desired_outcome == "15PercALL" || desired_outcome == "17PercALL") {
      var prime = '9_all'
      var sub = '6_all'
    }
    else {
      var prime = '12_hp'
      var sub = '9_hp'
    }
    //9+6+other
    var probability_8 = probabilities[item_type].line_1[prime][cube_type] * probabilities[item_type].line_2[sub][cube_type] * (1 - probabilities[item_type].line_3[sub][cube_type] - probabilities[item_type].line_3[prime][cube_type])

    //9+other+6
    var probability_9 = probabilities[item_type].line_1[prime][cube_type] * (1 - probabilities[item_type].line_2[sub][cube_type] - probabilities[item_type].line_2[prime][cube_type]) * probabilities[item_type].line_3[sub][cube_type]

    //other+9+6
    var probability_10 = (1 - probabilities[item_type].line_1[prime][cube_type]) * probabilities[item_type].line_2[prime][cube_type] * probabilities[item_type].line_3[sub][cube_type]

    //other+6+9
    var probability_11 = (1 - probabilities[item_type].line_1[prime][cube_type]) * probabilities[item_type].line_2[sub][cube_type] * probabilities[item_type].line_3[prime][cube_type]

    /////////////////
    //18PercALL
    // 9+9+other
    var probability_5 = probabilities[item_type].line_1[prime][cube_type] * probabilities[item_type].line_2[prime][cube_type] * (1 - probabilities[item_type].line_3[sub][cube_type] - probabilities[item_type].line_3[prime][cube_type])

    //9+other+9
    var probability_6 = probabilities[item_type].line_1[prime][cube_type] * (1 - probabilities[item_type].line_2[sub][cube_type] - probabilities[item_type].line_2[prime][cube_type]) * probabilities[item_type].line_3[prime][cube_type]

    //other+9+9
    var probability_7 = (1 - probabilities[item_type].line_1[prime][cube_type]) * probabilities[item_type].line_2[prime][cube_type] * probabilities[item_type].line_3[prime][cube_type]

    ///////////////////
    //21percALL
    //9 + 6 + 6
    var probability_1 = probabilities[item_type].line_1[prime][cube_type] * probabilities[item_type].line_2[sub][cube_type] * probabilities[item_type].line_3[sub][cube_type]

    //9 + 9 + 6
    var probability_2 = probabilities[item_type].line_1[prime][cube_type] * probabilities[item_type].line_2[prime][cube_type] * probabilities[item_type].line_3[sub][cube_type]

    //9 + 6 + 9
    var probability_3 = probabilities[item_type].line_1[prime][cube_type] * probabilities[item_type].line_2[sub][cube_type] * probabilities[item_type].line_3[prime][cube_type]

    //9 + 9 + 9
    var probability_4 = probabilities[item_type].line_1[prime][cube_type] * probabilities[item_type].line_2[prime][cube_type] * probabilities[item_type].line_3[prime][cube_type]

    var probability = probability_1 + probability_2 + probability_3 + probability_4 + probability_5 + probability_6 + probability_7 + probability_8 + probability_9 + probability_10 + probability_11
  }
  //HP will follow same logic and Perc ALL
  if (desired_outcome == "18PercALL" || desired_outcome == "20PercALL" || desired_outcome == "24PercHP") {
    if (desired_outcome == "18PercALL" || desired_outcome == "20PercALL") {
      var prime = '9_all'
      var sub = '6_all'
    }
    else {
      var prime = '12_hp'
      var sub = '9_hp'
    }

    // 9+9+other
    var probability_5 = probabilities[item_type].line_1[prime][cube_type] * probabilities[item_type].line_2[prime][cube_type] * (1 - probabilities[item_type].line_3[sub][cube_type] - probabilities[item_type].line_3[prime][cube_type])

    //9+other+9
    var probability_6 = probabilities[item_type].line_1[prime][cube_type] * (1 - probabilities[item_type].line_2[sub][cube_type] - probabilities[item_type].line_2[prime][cube_type]) * probabilities[item_type].line_3[prime][cube_type]

    //other+9+9
    var probability_7 = (1 - probabilities[item_type].line_1[prime][cube_type]) * probabilities[item_type].line_2[prime][cube_type] * probabilities[item_type].line_3[prime][cube_type]

    ///////////////////
    //21percALL
    //9 + 6 + 6
    var probability_1 = probabilities[item_type].line_1[prime][cube_type] * probabilities[item_type].line_2[sub][cube_type] * probabilities[item_type].line_3[sub][cube_type]

    //9 + 9 + 6
    var probability_2 = probabilities[item_type].line_1[prime][cube_type] * probabilities[item_type].line_2[prime][cube_type] * probabilities[item_type].line_3[sub][cube_type]

    //9 + 6 + 9
    var probability_3 = probabilities[item_type].line_1[prime][cube_type] * probabilities[item_type].line_2[sub][cube_type] * probabilities[item_type].line_3[prime][cube_type]

    //9 + 9 + 9
    var probability_4 = probabilities[item_type].line_1[prime][cube_type] * probabilities[item_type].line_2[prime][cube_type] * probabilities[item_type].line_3[prime][cube_type]

    var probability = probability_1 + probability_2 + probability_3 + probability_4 + probability_5 + probability_6 + probability_7
  }
  //HP will follow same logic and PercALL
  if (desired_outcome == "21PercALL" || desired_outcome == "24PercALL" || desired_outcome == "30PercHP") {
    if (desired_outcome == "21PercALL" || desired_outcome == "24PercALL") {
      var prime = '9_all'
      var sub = '6_all'
    }
    else {
      var prime = '12_hp'
      var sub = '9_hp'
    }
    //9 + 6 + 6
    var probability_1 = probabilities[item_type].line_1[prime][cube_type] * probabilities[item_type].line_2[sub][cube_type] * probabilities[item_type].line_3[sub][cube_type]

    //9 + 9 + 6
    var probability_2 = probabilities[item_type].line_1[prime][cube_type] * probabilities[item_type].line_2[prime][cube_type] * probabilities[item_type].line_3[sub][cube_type]

    //9 + 6 + 9
    var probability_3 = probabilities[item_type].line_1[prime][cube_type] * probabilities[item_type].line_2[sub][cube_type] * probabilities[item_type].line_3[prime][cube_type]

    //9 + 9 + 9
    var probability_4 = probabilities[item_type].line_1[prime][cube_type] * probabilities[item_type].line_2[prime][cube_type] * probabilities[item_type].line_3[prime][cube_type]

    var probability = probability_1 + probability_2 + probability_3 + probability_4
  }
  if (desired_outcome == "21PercLUK" || desired_outcome == "23PercLUK") {
    //12+9+OTHER
    var probability_21 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * (1 - probabilities[item_type].line_3["12_stat"][cube_type] - probabilities[item_type].line_3["9_stat"][cube_type] - probabilities[item_type].line_3["9_all"][cube_type] - probabilities[item_type].line_3["6_all"][cube_type])

    //12+OTHER+9
    var probability_22 = probabilities[item_type].line_1["12_stat"][cube_type] * (1 - probabilities[item_type].line_2["12_stat"][cube_type] - probabilities[item_type].line_2["9_stat"][cube_type] - probabilities[item_type].line_2["9_all"][cube_type] - probabilities[item_type].line_2["6_all"][cube_type]) * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //9+12+OTHER
    var probability_23 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * (1 - probabilities[item_type].line_3["12_stat"][cube_type] - probabilities[item_type].line_3["9_stat"][cube_type] - probabilities[item_type].line_3["9_all"][cube_type] - probabilities[item_type].line_3["6_all"][cube_type])

    //9+OTHER+12
    var probability_24 = probabilities[item_type].line_1["9_all"][cube_type] * (1 - probabilities[item_type].line_2["12_stat"][cube_type] - probabilities[item_type].line_2["9_stat"][cube_type] - probabilities[item_type].line_2["9_all"][cube_type] - probabilities[item_type].line_2["6_all"][cube_type]) * probabilities[item_type].line_3["12_stat"][cube_type]


    //9+6+6
    var probability_25 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * probabilities[item_type].line_3["6_all"][cube_type]

    //Other+12+9
    var probability_26 = (1 - probabilities[item_type].line_1["12_stat"][cube_type] - probabilities[item_type].line_1["9_all"][cube_type]) * probabilities[item_type].line_2["12_stat"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //Other+9+12
    var probability_27 = (1 - probabilities[item_type].line_1["12_stat"][cube_type] - probabilities[item_type].line_1["9_all"][cube_type]) * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["12_stat"][cube_type]

    //////////////////////////////////////
    //add in all 24percluk
    //12+12+OTHER
    var probability_18 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * (1 - probabilities[item_type].line_3["12_stat"][cube_type] - probabilities[item_type].line_3["9_stat"][cube_type] - probabilities[item_type].line_3["9_all"][cube_type] - probabilities[item_type].line_3["6_all"][cube_type])

    //12+Other+12
    var probability_19 = probabilities[item_type].line_1["12_stat"][cube_type] * (1 - probabilities[item_type].line_2["12_stat"][cube_type] - probabilities[item_type].line_2["9_stat"][cube_type] - probabilities[item_type].line_2["9_all"][cube_type] - probabilities[item_type].line_2["6_all"][cube_type]) * probabilities[item_type].line_3["12_stat"][cube_type]

    //Other+12+12
    var probability_20 = (1 - probabilities[item_type].line_1["12_stat"][cube_type] - probabilities[item_type].line_1["9_all"][cube_type]) * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //12+6+6
    var probability_15 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * probabilities[item_type].line_3["6_all"][cube_type]

    //9+9+6
    var probability_16 = probabilities[item_type].line_1["9_all"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["6_all"][cube_type]

    //9+6+9
    var probability_17 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    ///////////////////////////////////////
    //add in all the 27percluk
    //12+9+6
    var probability_10 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["6_all"][cube_type]

    //12+6+9
    var probability_11 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])


    //9+9+9
    var probability_12 = probabilities[item_type].line_1["9_all"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //9+12+6
    var probability_13 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["6_all"][cube_type]

    //9+6+12
    var probability_14 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    ////////////////////////////////////////////
    //add in all the 30percluk
    var probability_1 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //12+12+9
    var probability_2 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //12+9+12
    var probability_3 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["12_stat"][cube_type]

    //12+12+12
    var probability_4 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //12+12+6
    var probability_5 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["6_all"][cube_type]

    //12+6+12
    var probability_6 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+12+12
    var probability_7 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+9+12
    var probability_8 = probabilities[item_type].line_1["9_all"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+12+9
    var probability_9 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    var probability = probability_1 + probability_2 + probability_3 + probability_4 + probability_5 + probability_6 + probability_7 + probability_8 + probability_9 + probability_10 + probability_11 + probability_12 + probability_13 + probability_14 + probability_15 + probability_16 + probability_17 + probability_18 + probability_19 + probability_20 + probability_21 + probability_22 + probability_23 + probability_24 + probability_25 + probability_26 + probability_27

  }
  if (desired_outcome == "24PercLUK" && itemLevel < 151) {
    //12+12+OTHER (would be ommited = 26)
    var probability_18 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * (1 - probabilities[item_type].line_3["12_stat"][cube_type] - probabilities[item_type].line_3["9_stat"][cube_type] - probabilities[item_type].line_3["9_all"][cube_type] - probabilities[item_type].line_3["6_all"][cube_type])

    //12+Other+12 (would be ommited = 26)
    var probability_19 = probabilities[item_type].line_1["12_stat"][cube_type] * (1 - probabilities[item_type].line_2["12_stat"][cube_type] - probabilities[item_type].line_2["9_stat"][cube_type] - probabilities[item_type].line_2["9_all"][cube_type] - probabilities[item_type].line_2["6_all"][cube_type]) * probabilities[item_type].line_3["12_stat"][cube_type]

    //Other+12+12 (would be ommited = 26)
    var probability_20 = (1 - probabilities[item_type].line_3["12_stat"][cube_type] - probabilities[item_type].line_3["9_all"][cube_type]) * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //12+6+6
    var probability_15 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * probabilities[item_type].line_3["6_all"][cube_type]

    //9+9+6
    var probability_16 = probabilities[item_type].line_1["9_all"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["6_all"][cube_type]

    //9+6+9
    var probability_17 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    ///////////////////////////////////////
    //add in all the 27percluk
    //12+9+6
    var probability_10 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["6_all"][cube_type]

    //12+6+9
    var probability_11 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])


    //9+9+9
    var probability_12 = probabilities[item_type].line_1["9_all"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //9+12+6
    var probability_13 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["6_all"][cube_type]

    //9+6+12
    var probability_14 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    ////////////////////////////////////////////
    //add in all the 30percluk
    var probability_1 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //12+12+9
    var probability_2 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //12+9+12
    var probability_3 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["12_stat"][cube_type]

    //12+12+12
    var probability_4 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //12+12+6
    var probability_5 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["6_all"][cube_type]

    //12+6+12
    var probability_6 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+12+12
    var probability_7 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+9+12
    var probability_8 = probabilities[item_type].line_1["9_all"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+12+9
    var probability_9 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    var probability = probability_1 + probability_2 + probability_3 + probability_4 + probability_5 + probability_6 + probability_7 + probability_8 + probability_9 + probability_10 + probability_11 + probability_12 + probability_13 + probability_14 + probability_15 + probability_16 + probability_17 + probability_18 + probability_19 + probability_20

  }
  if ((desired_outcome == "27PercLUK" && itemLevel < 151) || (desired_outcome == "30PercLUK" && itemLevel >= 151)) {
    //12+9+6
    var probability_10 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["6_all"][cube_type]

    //12+6+9
    var probability_11 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])


    //9+9+9
    var probability_12 = probabilities[item_type].line_1["9_all"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //9+12+6
    var probability_13 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["6_all"][cube_type]

    //9+6+12
    var probability_14 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    ////////////////////////////////////////////
    //add in all the 30percluk
    var probability_1 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //12+12+9
    var probability_2 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //12+9+12
    var probability_3 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["12_stat"][cube_type]

    //12+12+12
    var probability_4 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //12+12+6
    var probability_5 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["6_all"][cube_type]

    //12+6+12
    var probability_6 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+12+12
    var probability_7 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+9+12
    var probability_8 = probabilities[item_type].line_1["9_all"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+12+9
    var probability_9 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    var probability = probability_1 + probability_2 + probability_3 + probability_4 + probability_5 + probability_6 + probability_7 + probability_8 + probability_9 + probability_10 + probability_11 + probability_12 + probability_13 + probability_14

  }
  if ((desired_outcome == "30PercLUK" && itemLevel < 151) || (desired_outcome == "33PercLUK" && itemLevel >= 151)) {
    //12+9+9
    var probability_1 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //12+12+9
    var probability_2 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    //12+9+12
    var probability_3 = probabilities[item_type].line_1["12_stat"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["12_stat"][cube_type]

    //12+12+12
    var probability_4 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //12+12+6
    var probability_5 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["6_all"][cube_type]

    //12+6+12
    var probability_6 = probabilities[item_type].line_1["12_stat"][cube_type] * probabilities[item_type].line_2["6_all"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+12+12
    var probability_7 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+9+12
    var probability_8 = probabilities[item_type].line_1["9_all"][cube_type] * (probabilities[item_type].line_2["9_stat"][cube_type] + probabilities[item_type].line_2["9_all"][cube_type]) * probabilities[item_type].line_3["12_stat"][cube_type]

    //9+12+9
    var probability_9 = probabilities[item_type].line_1["9_all"][cube_type] * probabilities[item_type].line_2["12_stat"][cube_type] * (probabilities[item_type].line_3["9_stat"][cube_type] + probabilities[item_type].line_3["9_all"][cube_type])

    var probability = probability_1 + probability_2 + probability_3 + probability_4 + probability_5 + probability_6 + probability_7 + probability_8 + probability_9
  }
  if ((desired_outcome == "36PercLUK") || (desired_outcome == "27PercALL") || (desired_outcome == "33PercLUK" && itemLevel <= 150) || desired_outcome == "33PercHP" || (desired_outcome == "24PercALL" && itemLevel <= 150)) {
    if (desired_outcome == "36PercLUK" || desired_outcome == "33PercLUK") var stat = "stat"
    else if (desired_outcome == "36PercHP" || desired_outcome == "33PercHP") var stat = "hp"
    else var stat = "all"
    var prob_12_line_1 = prob_line("line_1", stat, probabilities, cube_type, item_type, 12)
    var prob_12_line_2 = prob_line("line_2", stat, probabilities, cube_type, item_type, 12)
    var prob_12_line_3 = prob_line("line_3", stat, probabilities, cube_type, item_type, 12)

    var prob_9_line_2 = prob_line("line_2", stat, probabilities, cube_type, item_type, 9)
    var prob_9_line_3 = prob_line("line_3", stat, probabilities, cube_type, item_type, 9)

    var probability = 0

    //12 12 12
    probability = probability + prob_12_line_1 * prob_12_line_2 * prob_12_line_3

    //12 12 9
    probability = probability + prob_12_line_1 * prob_12_line_2 * prob_9_line_3

    //12 9 12
    probability = probability + prob_12_line_1 * prob_9_line_2 * prob_12_line_3

  }
  return probability
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

function updatedDesiredStats() {
  var itemType = document.getElementById('itemType').value;
  var itemLevel = parseInt(document.getElementById('itemLevel').value);
  var length = document.getElementById('desiredStats').options.length;
  var i = 0;
  var ids_to_remove = [];
  var ids_to_keep = [];

  while (i < length) {
    var current_id = document.getElementById('desiredStats').options[i].id;
    if (current_id.includes(itemType) || current_id.includes('any')) {
      ids_to_keep.push(current_id);
      i++
    } else {
      ids_to_remove.push(current_id);
      i++
    }
  }
  i = 0;
  while (i < ids_to_remove.length) {
    var current_id = ids_to_remove[i];
    //document.getElementById(current_id).remove();
    $('#' + current_id).remove();
    i++
  }

  if (itemType != 'weapon' && itemType != 'secondary' && itemType != 'emblem') {
    if (itemLevel < 151) {
      if (!document.getElementById('any1')) {
        $('#desiredStats').append("<option id='any1' value='21PercLUK'>21%+ Stat</option>");
        $('#desiredStats').append("<option id='any2' value='24PercLUK'>24%+ Stat</option>");
        $('#desiredStats').append("<option id='any3' value='27PercLUK'>27%+ Stat</option>");
        $('#desiredStats').append("<option id='any4' value='30PercLUK'>30%+ Stat</option>");
        $('#desiredStats').append("<option id='any22' value='33PercLUK'>33%+ Stat</option>");

        $('#desiredStats').append("<option id='any16' value='21PercHP'>21%+ Max HP</option>");
        $('#desiredStats').append("<option id='any17' value='24PercHP'>24%+ Max HP</option>");
        $('#desiredStats').append("<option id='any18' value='30PercHP'>30%+ Max HP</option>");
        $('#desiredStats').append("<option id='any23' value='33PercHP'>33%+ Max HP</option>");

        $('#desiredStats').append("<option id='any5' value='15PercALL'>15%+ All Stat (For Xenon)</option>");
        $('#desiredStats').append("<option id='any6' value='18PercALL'>18%+ All Stat (For Xenon)</option>");
        $('#desiredStats').append("<option id='any7' value='21PercALL'>21%+ All Stat (For Xenon)</option>");
        $('#desiredStats').append("<option id='any24' value='24PercALL'>24%+ All Stat (For Xenon)</option>");
      }

    }
    else {
      if (!document.getElementById('any8')) {
        $('#desiredStats').append("<option id='any8' value='23PercLUK'>23%+ Stat</option>");
        $('#desiredStats').append("<option id='any9' value='26PercLUK'>26%+ Stat</option>");
        $('#desiredStats').append("<option id='any10' value='27PercLUK'>27%+ Stat</option>");
        $('#desiredStats').append("<option id='any11' value='30PercLUK'>30%+ Stat</option>");
        $('#desiredStats').append("<option id='any12' value='33PercLUK'>33%+ Stat</option>");
        $('#desiredStats').append("<option id='any25' value='36PercLUK'>36%+ Stat</option>");

        $('#desiredStats').append("<option id='any19' value='21PercHP'>21%+ Max HP</option>");
        $('#desiredStats').append("<option id='any20' value='24PercHP'>24%+ Max HP</option>");
        $('#desiredStats').append("<option id='any21' value='30PercHP'>30%+ Max HP</option>");
        $('#desiredStats').append("<option id='any26' value='33PercHP'>33%+ Max HP</option>");

        $('#desiredStats').append("<option id='any13' value='17PercALL'>17%+ All Stat (For Xenon)</option>");
        $('#desiredStats').append("<option id='any14' value='20PercALL'>20%+ All Stat (For Xenon)</option>");
        $('#desiredStats').append("<option id='any15' value='24PercALL'>24%+ All Stat (For Xenon)</option>");
        $('#desiredStats').append("<option id='any27' value='27PercALL'>27%+ All Stat (For Xenon)</option>");
      }
    }
  }

  if (itemType == 'weapon' || itemType == 'secondary') {
    if (itemLevel < 151) {
      if (document.getElementById('any1')) {
        $('#any1').remove();
        $('#any2').remove();
        $('#any3').remove();
        $('#any4').remove();
        $('#any5').remove();
        $('#any6').remove();
        $('#any7').remove();

        $('#any16').remove();
        $('#any17').remove();
        $('#any18').remove();

        $('#any22').remove();
        $('#any23').remove();
        $('#any24').remove();
      }
    }
    else {
      if (document.getElementById('any8')) {
        $('#any8').remove();
        $('#any9').remove();
        $('#any10').remove();
        $('#any11').remove();
        $('#any12').remove();
        $('#any13').remove();
        $('#any14').remove();
        $('#any15').remove();

        $('#any19').remove();
        $('#any20').remove();
        $('#any21').remove();

        $('#any25').remove();
        $('#any26').remove();
        $('#any27').remove();
      }
    }

    if (document.getElementById('weaponsecondaryshield') === null) {
      $('#desiredStats').append("<option id='weaponsecondaryshield' value='2LATT'>2 Line Attack%</option>");
      $('#desiredStats').append("<option id='weaponsecondaryshield2' value='3LATT'>3 Line Attack%</option>");

    }
    if (document.getElementById('weaponsecondaryshield1') === null) {
      $('#desiredStats').append("<option id='weaponsecondaryshield1' value='2ATTand1IED'>2 Line Attack% + 1 Line IED%</option>");
      $('#desiredStats').append("<option id='weaponsecondaryshield9' value='21ATTandIED'>21%+ Attack and IED</option>");
      $('#desiredStats').append("<option id='weaponsecondaryshield10' value='24ATTandIED'>24%+ Attack and IED</option>");

    }
    if (document.getElementById('weaponsecondaryshield3') === null) {
      $('#desiredStats').append("<option id='weaponsecondaryshield3' value='1ATTand2BOSS'>1 Line Attack% + 2 Line Boss%</option>");

    }
    if (document.getElementById('weaponsecondaryshield4') === null) {
      $('#desiredStats').append("<option id='weaponsecondaryshield4' value='2ATTand1BOSS'>2 Line Attack% + 1 Line Boss%</option>");

      $('#desiredStats').append("<option id='weaponsecondaryshield5' value='21ATT30BOSS'>21%+ Attack and 30%+ Boss</option>");
      $('#desiredStats').append("<option id='weaponsecondaryshield6' value='21ATT35BOSS'>21%+ Attack and 35%+ Boss</option>");
      $('#desiredStats').append("<option id='weaponsecondaryshield7' value='21ATT40BOSS'>21%+ Attack and 40%+ Boss</option>");
      $('#desiredStats').append("<option id='weaponsecondaryshield8' value='24ATT30BOSS'>24%+ Attack and 30%+ Boss</option>");
    }

  }

  else if (itemType == 'emblem') {
    if (itemLevel < 151) {
      if (document.getElementById('any1')) {
        $('#any1').remove();
        $('#any2').remove();
        $('#any3').remove();
        $('#any4').remove();
        $('#any5').remove();
        $('#any6').remove();
        $('#any7').remove();

        $('#any16').remove();
        $('#any17').remove();
        $('#any18').remove();

        $('#any22').remove();
        $('#any23').remove();
        $('#any24').remove();
      }
    }
    else {
      if (document.getElementById('any8')) {
        $('#any8').remove();
        $('#any9').remove();
        $('#any10').remove();
        $('#any11').remove();
        $('#any12').remove();
        $('#any13').remove();
        $('#any14').remove();
        $('#any15').remove();

        $('#any19').remove();
        $('#any20').remove();
        $('#any21').remove();

        $('#any25').remove();
        $('#any26').remove();
        $('#any27').remove();
      }
    }
    if (document.getElementById('emblem') === null) {
      $('#desiredStats').append("<option id='emblem' value='2LATT'>2 Line Attack%</option>");
      $('#desiredStats').append("<option id='emblem2' value='3LATT'>3 Line Attack%</option>");
    }
    if (document.getElementById('emblem1') === null) {
      $('#desiredStats').append("<option id='emblem1' value='2ATTand1IED'>2 Line Attack% + 1 Line IED%</option>");
    }
    if (document.getElementById('emblem7') === null) {
      $('#desiredStats').append("<option id='emblem7' value='21ATTandIED'>21%+ Attack and IED</option>");
      $('#desiredStats').append("<option id='emblem8' value='24ATTandIED'>24%+ Attack and IED</option>");
    }
  }

  else if (itemType == 'gloves') {//1LCritandHP, 2LCritAndStat, 2LCritAndALL, 2LCritandHP
    if (document.getElementById('gloves') === null) {
      $('#desiredStats').append("<option id='gloves' value='1LCrit'>1 Line Crit Dmg%</option>");

      $('#desiredStats').append("<option id='gloves1' value='1LCritAndStat'>1 Line Crit Dmg% and Stat%</option>");
      $('#desiredStats').append("<option id='gloves2' value='1LCritAndALL'>1 Line Crit Dmg% and All Stat%</option>");
      $('#desiredStats').append("<option id='gloves3' value='1LCritandHP'>1 Line Crit Dmg% and MaxHP%</option>");

      $('#desiredStats').append("<option id='gloves8' value='1LCritAnd2Stat'>1 Line Crit Dmg% and 2L Stat%</option>");
      $('#desiredStats').append("<option id='gloves9' value='1LCritAnd2ALL'>1 Line Crit Dmg% and 2L All Stat%</option>");
      $('#desiredStats').append("<option id='gloves10' value='1LCritand2HP'>1 Line Crit Dmg% and 2L MaxHP%</option>");

      $('#desiredStats').append("<option id='gloves4' value='2LCrit'>2 Line Crit Dmg%</option>");

      $('#desiredStats').append("<option id='gloves5' value='2LCritAndStat'>2 Line Crit Dmg% and Stat%</option>");
      $('#desiredStats').append("<option id='gloves6' value='2LCritAndALL'>2 Line Crit Dmg% and All Stat%</option>");
      $('#desiredStats').append("<option id='gloves7' value='2CritandHP'>2 Line Crit Dmg% and MaxHP%</option>");

      $('#desiredStats').append("<option id='gloves8' value='3LCrit'>3 Line Crit Dmg%</option>");
    }
  }

  else if (itemType == 'accessory') {
    if (document.getElementById('accessory') === null) {
      $('#desiredStats').append("<option id='accessory3' value='1LMeso'>1 Line Mesos Obtained%</option>");
      $('#desiredStats').append("<option id='accessory4' value='1LDrop'>1 Line Item Drop%</option>");
      $('#desiredStats').append("<option id='accessory5' value='1LDropOrMeso'>1 Line of Item Drop% or Mesos Obtained%</option>");

      $('#desiredStats').append("<option id='accessory6' value='1LMesoAndStat'>1 Line Mesos Obtained% and Stat%</option>");
      $('#desiredStats').append("<option id='accessory7' value='1LMesoAndALL'>1 Line Mesos Obtained% and All Stat%</option>");
      $('#desiredStats').append("<option id='accessory8' value='1LMesoAndHP'>1 Line Mesos Obtained% and MaxHP%</option>");

      $('#desiredStats').append("<option id='accessory9' value='1LDropAndStat'>1 Line Item Drop% and Stat%</option>");
      $('#desiredStats').append("<option id='accessory10' value='1LDropAndALL'>1 Line Item Drop% and All Stat%</option>");
      $('#desiredStats').append("<option id='accessory11' value='1LDropAndHP'>1 Line Item Drop% and MaxHP%</option>");

      $('#desiredStats').append("<option id='accessory12' value='1LDropOrMesoAndStat'>1 Line of (Item Drop% or Mesos Obtained%) with Stat%</option>");
      $('#desiredStats').append("<option id='accessory13' value='1LDropOrMesoAndALL'>1 Line of (Item Drop% or Mesos Obtained%) with All Stat%</option>");
      $('#desiredStats').append("<option id='accessory14' value='1LDropOrMesoAndHP'>1 Line of (Item Drop% or Mesos Obtained%) with MaxHP%</option>");

      $('#desiredStats').append("<option id='accessory' value='2LMeso'>2 Line Mesos Obtained%</option>");
      $('#desiredStats').append("<option id='accessory1' value='2LDrop'>2 Line Item Drop%</option>");
      $('#desiredStats').append("<option id='accessory2' value='2LDropOrMeso'>2 Lines Involving Item Drop% or Mesos Obtained%</option>");
    }
  }
  ////2SecCD, 3SecCD, 4SecCD, 2SecCDAndStat, 2SecCDAndHP, 2SecCDAndALL, 2SecCDAnd2Stat, 2SecCDAnd2HP, 2SecCDAnd2ALL, 3SecCDAndStat, 3SecCDAndHP, 3SecCDAndALL, 4SecCDAndStat, 4SecCDAndHP, 4SecCDAndALL
  else if (itemType == 'hat') {
    if (document.getElementById('accessory') === null) {
      $('#desiredStats').append("<option id='hat' value='2SecCD'>-2sec+ CD Reduction</option>");
      $('#desiredStats').append("<option id='hat1' value='3SecCD'>-3sec+ CD Reduction</option>");
      $('#desiredStats').append("<option id='hat2' value='4SecCD'>-4sec+ CD Reduction</option>");
      $('#desiredStats').append("<option id='hat15' value='5SecCD'>-5sec+ CD Reduction</option>");
      $('#desiredStats').append("<option id='hat16' value='6SecCD'>-6sec+ CD Reduction</option>");

      $('#desiredStats').append("<option id='hat3' value='2SecCDAndStat'>-2sec+ CD Reduction and Stat%</option>");
      $('#desiredStats').append("<option id='hat4' value='2SecCDAndHP'>-2sec+ CD Reduction and MaxHP%</option>");
      $('#desiredStats').append("<option id='hat5' value='2SecCDAndALL'>-2sec+ CD Reduction and All Stat%</option>");

      $('#desiredStats').append("<option id='hat6' value='2SecCDAnd2Stat'>-2sec+ CD Reduction and 2 Line Stat%</option>");
      $('#desiredStats').append("<option id='hat7' value='2SecCDAnd2HP'>-2sec+ CD Reduction and 2 Line Max HP%</option>");
      $('#desiredStats').append("<option id='hat8' value='2SecCDAnd2ALL'>-2sec+ CD Reduction and 2 Line All Stat%</option>");

      $('#desiredStats').append("<option id='hat9' value='3SecCDAndStat'>-3sec+ CD Reduction and Stat%</option>");
      $('#desiredStats').append("<option id='hat10' value='3SecCDAndHP'>-3sec+ CD Reduction and Max HP%</option>");
      $('#desiredStats').append("<option id='hat11' value='3SecCDAndALL'>-3sec+ CD Reduction and All Stat%</option>");

      $('#desiredStats').append("<option id='hat12' value='4SecCDAndStat'>-4sec+ CD Reduction and Stat%</option>");
      $('#desiredStats').append("<option id='hat13' value='4SecCDAndHP'>-4sec+ CD Reduction and Max HP%</option>");
      $('#desiredStats').append("<option id='hat14' value='4SecCDAndALL'>-4sec+ CD Reduction and All Stat%</option>");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    $("#toast").toast('show')
  }, 1000)

  // setTimeout(function(){
  //   $("#toast").toast('hide')
  // }, 3000)
  document.getElementById("currentTier").addEventListener("change", function () {
    var currentTier = $(this).val();
    $('#desiredTier').empty();

    if (currentTier == 0) {
      $('#desiredTier').append("<option value=1>Epic</option>");
      $('#desiredTier').append("<option value=2>Unique</option>");
      $('#desiredTier').append("<option value=3 selected>Legendary</option>");
    } else if (currentTier == 1) {
      $('#desiredTier').append("<option value=2>Unique</option>");
      $('#desiredTier').append("<option value=3 selected>Legendary</option>");
    } else if (currentTier == 2 || currentTier == 3) {
      $('#desiredTier').append("<option value=3 selected>Legendary</option>");
    }
  });

  document.getElementById('desiredTier').addEventListener("change", function () {
    var desiredTier = $(this).val();

    if (desiredTier == 3) {
      updatedDesiredStats()
    }
    else {
      $('#desiredStats').empty();
      $('#desiredStats').append("<option id='any' value='any'>Any</option>");
    }
  });

  document.getElementById("itemType").addEventListener("change", function () {
    // document.getElementById('error-container').style.display = '';
    var desiredTier = document.getElementById('desiredTier').value
    if (desiredTier == 3) {
      updatedDesiredStats();
      document.getElementById("desiredStats").selectedIndex = 0; //Option 10
    }
  });

  // document.getElementById("totalTrials").addEventListener("change", function () {
  //   document.getElementById('error-container').style.display = '';
  // });

  // document.getElementById("desiredStats").addEventListener("change", function () {
  //   document.getElementById('error-container').style.display = '';
  // });

  document.getElementById("itemLevel").addEventListener("change", function () {
    // Set selected option as variable
    var itemLevel = parseInt($(this).val());
    var itemType = document.getElementById('itemType').value;
    var desiredTier = document.getElementById('desiredTier').value

    if (desiredTier == 3) {
      // Empty the desiredStats select option list
      $('#desiredStats').empty();

      if (itemLevel < 71 || itemLevel > 200) {
        $('#desiredStats').append("<option value='N/A' disabled selected>Your item level must be between 71 and 200</option>");
        document.getElementById('calculateButton').disabled = true;
      } else if (itemLevel >= 71 && itemLevel < 151) {
        $('#desiredStats').append("<option id='any' value='any'>Any</option>");
        $('#desiredStats').append("<option id='any1' value='21PercLUK'>21%+ Stat</option>");
        $('#desiredStats').append("<option id='any2' value='24PercLUK'>24%+ Stat</option>");
        $('#desiredStats').append("<option id='any3' value='27PercLUK'>27%+ Stat</option>");
        $('#desiredStats').append("<option id='any4' value='30PercLUK'>30%+ Stat</option>");
        $('#desiredStats').append("<option id='any22' value='33PercLUK'>33%+ Stat</option>");

        $('#desiredStats').append("<option id='any16' value='21PercHP'>21%+ Max HP</option>");
        $('#desiredStats').append("<option id='any17' value='24PercHP'>24%+ Max HP</option>");
        $('#desiredStats').append("<option id='any18' value='30PercHP'>30%+ Max HP</option>");
        $('#desiredStats').append("<option id='any23' value='33PercHP'>33%+ Max HP</option>");

        $('#desiredStats').append("<option id='any5' value='15PercALL'>15%+ All Stat (For Xenon)</option>");
        $('#desiredStats').append("<option id='any6' value='18PercALL'>18%+ All Stat (For Xenon)</option>");
        $('#desiredStats').append("<option id='any7' value='21PercALL'>21%+ All Stat (For Xenon)</option>");
        $('#desiredStats').append("<option id='any24' value='24PercALL'>24%+ All Stat (For Xenon)</option>");
        document.getElementById('calculateButton').disabled = false;
      } else if (itemLevel >= 151 && itemLevel <= 200) {
        $('#desiredStats').append("<option id='any' value='any'>Any</option>");
        $('#desiredStats').append("<option id='any8' value='23PercLUK'>23%+ Stat</option>");
        $('#desiredStats').append("<option id='any9' value='26PercLUK'>26%+ Stat</option>");
        $('#desiredStats').append("<option id='any10' value='27PercLUK'>27%+ Stat</option>");
        $('#desiredStats').append("<option id='any11' value='30PercLUK'>30%+ Stat</option>");
        $('#desiredStats').append("<option id='any12' value='33PercLUK'>33%+ Stat</option>");
        $('#desiredStats').append("<option id='any25' value='36PercLUK'>36%+ Stat</option>");

        $('#desiredStats').append("<option id='any19' value='21PercHP'>21%+ Max HP</option>");
        $('#desiredStats').append("<option id='any20' value='24PercHP'>24%+ Max HP</option>");
        $('#desiredStats').append("<option id='any21' value='30PercHP'>30%+ Max HP</option>");
        $('#desiredStats').append("<option id='any26' value='33PercHP'>33%+ Max HP</option>");

        $('#desiredStats').append("<option id='any13' value='17PercALL'>17%+ All Stat (For Xenon)</option>");
        $('#desiredStats').append("<option id='any14' value='20PercALL'>20%+ All Stat (For Xenon)</option>");
        $('#desiredStats').append("<option id='any15' value='24PercALL'>24%+ All Stat (For Xenon)</option>");
        $('#desiredStats').append("<option id='any27' value='27PercALL'>27%+ All Stat (For Xenon)</option>");
        document.getElementById('calculateButton').disabled = false;
      }
      updatedDesiredStats();
    }


  });

  document.getElementById("calculateButton").addEventListener("click", function () {
    function loaderOn() {
      $('#loader1').show();
      $('#loader2').show();
      setTimeout(runCalculator, 100);
    }

    function loaderOff() {
      $('#loader1').hide();
      $('#loader2').hide()
    }

    function runCalculator() {
      var itemType = document.getElementById('itemType').value;
      var cubeType = document.getElementById('cubeType').value;
      var currentTier = parseInt(document.getElementById('currentTier').value);
      //var totalTrials = parseInt(document.getElementById('totalTrials').value);
      var itemLevel = parseInt(document.getElementById('itemLevel').value);
      var desiredTier = parseInt(document.getElementById('desiredTier').value);

      //Todo: meso/drop/CDhat/
      var desiredStat = document.getElementById('desiredStats').value;

      //insert logic here
      var p = getProbability(itemType, desiredStat, cubeType, currentTier, desiredTier, itemLevel)
      var stats = geoDistrQuantile(p)

      var mean = Math.round(stats.mean)
      var median = Math.round(stats.median)
      var seventy_fifth = Math.round(stats.seventy_fifth)
      var eighty_fifth = Math.round(stats.eighty_fifth)
      var nintey_fifth = Math.round(stats.nintey_fifth)

      var mean_cost = cubingCost(cubeType, itemLevel, mean)
      var median_cost = cubingCost(cubeType, itemLevel, median)
      var seventy_fifth_cost = cubingCost(cubeType, itemLevel, seventy_fifth)
      var eighty_fifth_cost = cubingCost(cubeType, itemLevel, eighty_fifth)
      var ninety_fifth_cost = cubingCost(cubeType, itemLevel, nintey_fifth)

      if (currentTier == desiredTier && desiredStat == "any") {
        mean = 0
        median = 0
        seventy_fifth = 0
        eighty_fifth = 0
        nintey_fifth = 0

        mean_cost = 0
        median_cost = 0
        seventy_fifth_cost = 0
        eighty_fifth_cost = 0
        ninety_fifth_cost = 0
      }

      //new logic ends here


      //var results = repeatExperiment(cubeType, itemLevel, itemType, desiredStat, totalTrials, currentTier, desiredTier);

      var averageCubeCount = mean //results.averageCubeCount
      var averageCost = mean_cost //results.averageCost
      var medianCost = median_cost //results.medianCost
      var medianCubeCount = median //results.medianCubeCount
      //var mesoDataForGraph = results.mesoDataForGraph
      var costSevenFive = seventy_fifth_cost //results.costSevenFive
      var costEightFive = eighty_fifth_cost //results.costEightFive
      var costNineFive = ninety_fifth_cost //results.costNineFive
      var cubeSevenFive = seventy_fifth //results.cubeSevenFive
      var cubeEightFive = eighty_fifth //results.cubeEightFive
      var cubeNineFive = nintey_fifth //results.cubeNineFive

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
      document.getElementById('result').style.display = '';
      // document.getElementById('error-container').style.display = 'none';
      document.getElementById('result').innerHTML =
        `
    <div class="container secondarycon">
      <div class=" statBox statBox1" style="background-color:#aaa;">
        <h2 style="text-align:center;">Mesos Stats</h2>
            <p style="text-align:center;"">
                Average cost: ${averageCost.toLocaleString()}<br />
            Median cost: ${medianCost.toLocaleString()}<br />
            </p>
      </div>
      <div class=" statBox statBox2" style="background-color:#bbb;">
        <h2 style="text-align:center;">Mesos Percentiles</h2>
        <p style="text-align:center;"">
            75% chance within ${costSevenFive.toLocaleString()} mesos<br />
            85% chance within ${costEightFive.toLocaleString()} mesos<br />
            95% chance within ${costNineFive.toLocaleString()} mesos<br />
        </p>
      </div>
      
      <div class=" statBox statBox3" style="background-color:#aaa;">
        <h2 style="text-align:center;"">Cube Stats</h2>
            <p style="text-align:center;"">
                Average cubes: ${averageCubeCount.toLocaleString()} ${cubeType} cubes<br />
                Median cubes: ${medianCubeCount.toLocaleString()} ${cubeType} cubes<br />
            </p>
      </div>
      <div class=" statBox statBox4" style="background-color:#bbb;">
        <h2 style="text-align:center;">Cube Percentiles</h2>
        <p style="text-align:center;"">
            75% chance within ${cubeSevenFive.toLocaleString()} ${cubeType} cubes<br />
            85% chance within ${cubeEightFive.toLocaleString()} ${cubeType} cubes<br />
            95% chance within ${cubeNineFive.toLocaleString()} ${cubeType} cubes<br />
        </p>
      </div>
    </div>
        `
    }
    loaderOn();
    setTimeout(loaderOff, 100);

    //console.log(performExperiment('black', 150, 'earring', '2LDropOrMeso', 3, 3))

    //console.log(repeatExperiment('black', 150, 'hat', '3SecCD', 100, 3, 3))
  });
}, false);

Game.init();
