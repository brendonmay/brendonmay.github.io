const C = {};

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