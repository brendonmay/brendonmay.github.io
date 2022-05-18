import C from "./c.js";

const Game = {};

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

export default Game;