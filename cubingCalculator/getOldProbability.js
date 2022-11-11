// Note(sethyboy0) This file contains the code that the calculator used to calculate the probability before the big
// rework that scrapes Nexon's official data from their Korean website. I'll let Brendon decide if he wants to keep it
// around or not.

var probabilities = {
    'weapon': {
        "line_1":
            {
                "attack": {"red": 0.04878, "black": 0.04878},
                "12_attack": {"red": 0.04878, "black": 0.04878},
                "40_boss": {"red": 0.04878, "black": 0.04878},
                "35_boss": {"red": 0.04878, "black": 0.04878},
                "30_boss": {"red": 0.04878, "black": 0.04878},
                "boss": {"red": 0.04878 + 0.04878 + 0.04878, "black": 0.04878 + 0.04878 + 0.04878},
                "ied": {"red": 0.04878 + 0.04878, "black": 0.04878 + 0.04878}
            },
        "line_2":
            {
                "attack": {"red": 0.004878 + 0.06, "black": 0.009756 + 0.053333},
                "12_attack": {"red": 0.004878, "black": 0.009756},
                "9_attack": {"red": 0.06, "black": 0.053333},
                "40_boss": {"red": 0.004878, "black": 0.009756},
                "35_boss": {"red": 0.004878, "black": 0.009756},
                "30_boss": {"red": 0.004878 + 0.04, "black": 0.009756 + 0.035556},
                "boss": {
                    "red": 0.004878 + 0.004878 + 0.004878 + 0.04 + 0.06,
                    "black": 0.009756 + 0.009756 + 0.009756 + 0.035556 + 0.053333
                },
                "ied": {"red": 0.004878 + 0.004878 + 0.06, "black": 0.009756 + 0.009756 + 0.053333}
            },
        "line_3":
            {
                "attack": {"red": 0.000488 + 0.066, "black": 0.002439 + 0.063333},
                "boss": {
                    "red": 0.000488 + 0.000488 + 0.000488 + 0.044 + 0.066,
                    "black": 0.002439 + 0.002439 + 0.002439 + 0.042222 + 0.063333
                },
                "12_attack": {"red": 0.000488, "black": 0.002439},
                "9_attack": {"red": 0.066, "black": 0.063333},
                "40_boss": {"red": 0.000488, "black": 0.002439},
                "35_boss": {"red": 0.000488, "black": 0.002439},
                "30_boss": {"red": 0.000488 + 0.044, "black": 0.002439 + 0.042222},
                "ied": {"red": 0.000488 + 0.000488 + 0.066, "black": 0.002439 + 0.002439 + 0.063333}
            }
    },
    'secondary': {
        "line_1":
            {
                "attack": {"red": 0.042553, "black": 0.042553},
                "boss": {"red": 0.042553 * 3, "black": 0.042553 * 3},
                "12_attack": {"red": 0.042553, "black": 0.042553},
                "40_boss": {"red": 0.042553, "black": 0.042553},
                "35_boss": {"red": 0.042553, "black": 0.042553},
                "30_boss": {"red": 0.042553, "black": 0.042553},
                "ied": {"red": 0.042553 * 2, "black": 0.042553 * 2}
            },
        "line_2":
            {
                "attack": {"red": 0.004255 + 0.050943, "black": 0.008511 + 0.045283},
                "boss": {
                    "red": 0.004255 * 2 + 0.004255 + 0.033962 + 0.050943,
                    "black": 0.008511 * 2 + 0.008511 + 0.030189 + 0.045283
                },
                "12_attack": {"red": 0.004255, "black": 0.008511},
                "9_attack": {"red": 0.050943, "black": 0.045283},
                "40_boss": {"red": 0.004255, "black": 0.008511},
                "35_boss": {"red": 0.004255, "black": 0.008511},
                "30_boss": {"red": 0.004255 + 0.033962, "black": 0.008511 + 0.30189},
                "ied": {"red": 0.004255 * 2 + 0.050943, "black": 0.008511 * 2 + 0.045283}
            },
        "line_3":
            {
                "attack": {"red": 0.000426 + 0.056038, "black": 0.002128 + 0.053774},
                "boss": {
                    "red": 0.000426 * 2 + 0.000426 + 0.037358 + 0.056038,
                    "black": 0.002128 * 2 + 0.002128 + 0.035849 + 0.053774
                },
                "12_attack": {"red": 0.000426, "black": 0.002128},
                "9_attack": {"red": 0.056038, "black": 0.053774},
                "40_boss": {"red": 0.000426, "black": 0.002128},
                "35_boss": {"red": 0.000426, "black": 0.002128},
                "30_boss": {"red": 0.000426 + 0.037358, "black": 0.002128 + 0.035849},
                "ied": {"red": 0.000426 * 2 + 0.056038, "black": 0.002128 * 2 + 0.053774}
            }
    },
    'emblem': {
        "line_1":
            {
                "attack": {"red": 0.057143, "black": 0.057143},
                "12_attack": {"red": 0.057143, "black": 0.057143},
                "ied": {"red": 0.057143 * 2, "black": 0.057143 * 2}
            },
        "line_2":
            {
                "attack": {"red": 0.005714 + 0.0675, "black": 0.011429 + 0.06},
                "12_attack": {"red": 0.005714, "black": 0.011429},
                "9_attack": {"red": 0.0675, "black": 0.06},
                "ied": {"red": 0.005714 * 2 + 0.0675, "black": 0.011429 * 2 + 0.06}
            },
        "line_3":
            {
                "attack": {"red": 0.000571 + 0.07425, "black": 0.002857 + 0.07125},
                "12_attack": {"red": 0.000571, "black": 0.002857},
                "9_attack": {"red": 0.07425, "black": 0.07125},
                "ied": {"red": 0.000571 * 2 + 0.07425, "black": 0.002857 * 2 + 0.07125}
            }
    },
    'top':
        {
            "line_1":
                {
                    "12_stat": {'black': 0.088889, 'red': 0.088889},
                    "9_all": {'black': 0.066667, 'red': 0.066667},
                    "12_hp": {'black': 0.088889, 'red': 0.088889}
                },
            "line_2":
                {
                    "12_stat": {'black': 0.017778, 'red': 0.008889},
                    "9_all": {'black': 0.013333, 'red': 0.006667},
                    "9_stat": {'black': 0.060606, 'red': 0.068182},
                    "6_all": {'black': 0.048485, 'red': 0.054545},
                    "12_hp": {'black': 0.017778, 'red': 0.008889},
                    "9_hp": {'black': 0.072727, 'red': 0.081818}
                },
            "line_3":
                {
                    "12_stat": {'black': 0.004444, 'red': 0.000889},
                    "9_all": {'black': 0.003333, 'red': 0.000667},
                    "9_stat": {'black': 0.07197, 'red': 0.075},
                    "6_all": {'black': 0.057576, 'red': 0.06},
                    "12_hp": {'black': 0.004444, 'red': 0.000889},
                    "9_hp": {'black': 0.086364, 'red': 0.09}
                }
        },
    'bottom':
        {
            "line_1":
                {
                    "12_stat": {'black': 0.102564, 'red': 0.102564},
                    "9_all": {'black': 0.076923, 'red': 0.076923},
                    "12_hp": {'black': 0.102564, 'red': 0.102564}
                },
            "line_2":
                {
                    "12_stat": {'black': 0.020513, 'red': 0.010256},
                    "9_all": {'black': 0.015385, 'red': 0.007692},
                    "9_stat": {'black': 0.071429, 'red': 0.080357},
                    "6_all": {'black': 0.057143, 'red': 0.064286},
                    "12_hp": {'black': 0.020513, 'red': 0.010256},
                    "9_hp": {'black': 0.085714, 'red': 0.096429}
                },
            "line_3":
                {
                    "12_stat": {'black': 0.005128, 'red': 0.001026},
                    "9_all": {'black': 0.003846, 'red': 0.000769},
                    "9_stat": {'black': 0.084821, 'red': 0.088393},
                    "6_all": {'black': 0.067857, 'red': 0.070714},
                    "12_hp": {'black': 0.005128, 'red': 0.001026},
                    "9_hp": {'black': 0.101786, 'red': 0.106071}
                }
        },
    "shoes":
        {
            "line_1":
                {
                    "12_stat": {'black': 0.1, 'red': 0.1},
                    "9_all": {'black': 0.075, 'red': 0.075},
                    "12_hp": {'black': 0.1, 'red': 0.1}
                },
            "line_2":
                {
                    "12_stat": {'black': 0.02, 'red': 0.01},
                    "9_all": {'black': 0.015, 'red': 0.0075},
                    "9_stat": {'black': 0.071429, 'red': 0.080357},
                    "6_all": {'black': 0.057143, 'red': 0.064286},
                    "12_hp": {'black': 0.02, 'red': 0.01},
                    "9_hp": {'black': 0.085714, 'red': 0.096429}
                },
            "line_3":
                {
                    "12_stat": {'black': 0.005, 'red': 0.001},
                    "9_all": {'black': 0.00375, 'red': 0.00075},
                    "9_stat": {'black': 0.084821, 'red': 0.088393},
                    "6_all": {'black': 0.067857, 'red': 0.070714},
                    "12_hp": {'black': 0.005, 'red': 0.001},
                    "9_hp": {'black': 0.101786, 'red': 0.106071}
                }
        },
    'cape': //same as belt and shoulder
        {
            "line_1":
                {
                    "12_stat": {'black': 0.108108, 'red': 0.108108},
                    "9_all": {'black': 0.081081, 'red': 0.081081},
                    "12_hp": {'black': 0.108108, 'red': 0.108108}
                },
            "line_2":
                {
                    "12_stat": {'black': 0.021622, 'red': 0.010811},
                    "9_all": {'black': 0.016216, 'red': 0.008108},
                    "9_stat": {'black': 0.076923, 'red': 0.086538},
                    "6_all": {'black': 0.061538, 'red': 0.069231},
                    "12_hp": {'black': 0.021622, 'red': 0.010811},
                    "9_hp": {'black': 0.092308, 'red': 0.103846}
                },
            "line_3":
                {
                    "12_stat": {'black': 0.005405, 'red': 0.001081},
                    "9_all": {'black': 0.004054, 'red': 0.000811},
                    "9_stat": {'black': 0.091346, 'red': 0.095192},
                    "6_all": {'black': 0.073077, 'red': 0.076154},
                    "12_hp": {'black': 0.005405, 'red': 0.001081},
                    "9_hp": {'black': 0.109615, 'red': 0.114231}
                }
        },
    "belt": //same as cape and shoulder
        {
            "line_1":
                {
                    "12_stat": {'black': 0.108108, 'red': 0.108108},
                    "9_all": {'black': 0.081081, 'red': 0.081081},
                    "12_hp": {'black': 0.108108, 'red': 0.108108}
                },
            "line_2":
                {
                    "12_stat": {'black': 0.021622, 'red': 0.010811},
                    "9_all": {'black': 0.016216, 'red': 0.008108},
                    "9_stat": {'black': 0.076923, 'red': 0.086538},
                    "6_all": {'black': 0.061538, 'red': 0.069231},
                    "12_hp": {'black': 0.021622, 'red': 0.010811},
                    "9_hp": {'black': 0.092308, 'red': 0.103846}
                },
            "line_3":
                {
                    "12_stat": {'black': 0.005405, 'red': 0.001081},
                    "9_all": {'black': 0.004054, 'red': 0.000811},
                    "9_stat": {'black': 0.091346, 'red': 0.095192},
                    "6_all": {'black': 0.073077, 'red': 0.076154},
                    "12_hp": {'black': 0.005405, 'red': 0.001081},
                    "9_hp": {'black': 0.109615, 'red': 0.114231}
                }
        },
    "shoulder": //same as cape and belt
        {
            "line_1":
                {
                    "12_stat": {'black': 0.108108, 'red': 0.108108},
                    "9_all": {'black': 0.081081, 'red': 0.081081},
                    "12_hp": {'black': 0.108108, 'red': 0.108108}
                },
            "line_2":
                {
                    "12_stat": {'black': 0.021622, 'red': 0.010811},
                    "9_all": {'black': 0.016216, 'red': 0.008108},
                    "9_stat": {'black': 0.076923, 'red': 0.086538},
                    "6_all": {'black': 0.061538, 'red': 0.069231},
                    "12_hp": {'black': 0.021622, 'red': 0.010811},
                    "9_hp": {'black': 0.092308, 'red': 0.103846}
                },
            "line_3":
                {
                    "12_stat": {'black': 0.005405, 'red': 0.001081},
                    "9_all": {'black': 0.004054, 'red': 0.000811},
                    "9_stat": {'black': 0.091346, 'red': 0.095192},
                    "6_all": {'black': 0.073077, 'red': 0.076154},
                    "12_hp": {'black': 0.005405, 'red': 0.001081},
                    "9_hp": {'black': 0.109615, 'red': 0.114231}
                }
        },
    'heart':
        {
            "line_1":
                {
                    "12_stat": {'black': 0.129032, 'red': 0.129032},
                    "9_all": {'black': 0.096774, 'red': 0.096774},
                    "12_hp": {'black': 0.129032, 'red': 0.129032}
                },
            "line_2":
                {
                    "12_stat": {'black': 0.025806, 'red': 0.012903},
                    "9_all": {'black': 0.019355, 'red': 0.009677},
                    "9_stat": {'black': 0.090909, 'red': 0.102273},
                    "6_all": {'black': 0.072727, 'red': 0.081818},
                    "12_hp": {'black': 0.025806, 'red': 0.012903},
                    "9_hp": {'black': 0.109091, 'red': 0.122727}
                },
            "line_3":
                {
                    "12_stat": {'black': 0.006452, 'red': 0.00129},
                    "9_all": {'black': 0.004839, 'red': 0.000968},
                    "9_stat": {'black': 0.107955, 'red': 0.1125},
                    "6_all": {'black': 0.086364, 'red': 0.09},
                    "12_hp": {'black': 0.006452, 'red': 0.00129},
                    "9_hp": {'black': 0.129545, 'red': 0.135}
                }
        },
    'badge': //should be easier than heart, this is a guess
        {
            "line_1":
                {
                    "12_stat": {'black': 0.13, 'red': 0.13},
                    "9_all": {'black': 0.1, 'red': 0.1},
                    "12_hp": {'black': 0.13, 'red': 0.13}
                },
            "line_2":
                {
                    "12_stat": {'black': 0.03, 'red': 0.013},
                    "9_all": {'black': 0.02, 'red': 0.01},
                    "9_stat": {'black': 0.1, 'red': 0.11},
                    "6_all": {'black': 0.08, 'red': 0.085},
                    "12_hp": {'black': 0.26, 'red': 0.13},
                    "9_hp": {'black': 0.11, 'red': 0.125}
                },
            "line_3":
                {
                    "12_stat": {'black': 0.01, 'red': 0.0015},
                    "9_all": {'black': 0.005, 'red': 0.001},
                    "9_stat": {'black': 0.11, 'red': 0.115},
                    "6_all": {'black': 0.09, 'red': 0.095},
                    "12_hp": {'black': 0.01, 'red': 0.005},
                    "9_hp": {'black': 0.13, 'red': 0.14}
                }
        },
    'gloves':
        {
            "line_1":
                {
                    "12_stat": {'black': 0.090909, 'red': 0.090909},
                    "9_all": {'black': 0.068182, 'red': 0.068182},
                    "crit": {'black': 0.090909, 'red': 0.090909},
                    "12_hp": {'black': 0.090909, 'red': 0.090909}
                },
            "line_2":
                {
                    "12_stat": {'black': 0.018182, 'red': 0.009091},
                    "9_all": {'black': 0.013636, 'red': 0.006818},
                    "crit": {'black': 0.018182, 'red': 0.009091},
                    "9_stat": {'black': 0.066667, 'red': 0.075},
                    "6_all": {'black': 0.053333, 'red': 0.06},
                    "12_hp": {'black': 0.018182, 'red': 0.009091},
                    "9_hp": {'black': 0.08, 'red': 0.09}
                },
            "line_3":
                {
                    "12_stat": {'black': 0.004545, 'red': 0.000909},
                    "9_all": {'black': 0.003409, 'red': 0.000682},
                    "crit": {'black': 0.004545, 'red': 0.000909},
                    "9_stat": {'black': 0.079167, 'red': 0.0825},
                    "6_all": {'black': 0.063333, 'red': 0.066},
                    "12_hp": {'black': 0.004545, 'red': 0.000909},
                    "9_hp": {'black': 0.095, 'red': 0.099}
                }
        },
    'accessory':
        {
            "line_1":
                {
                    "12_stat": {'black': 0.093023, 'red': 0.093023},
                    "9_all": {'black': 0.069767, 'red': 0.069767},
                    "drop": {'black': 0.069767, 'red': 0.069767},
                    "meso": {'black': 0.069767, 'red': 0.069767},
                    "12_hp": {'black': 0.093023, 'red': 0.093023}
                },
            "line_2":
                {
                    "12_stat": {'black': 0.018605, 'red': 0.009302},
                    "9_all": {'black': 0.013953, 'red': 0.006977},
                    "drop": {'black': 0.013953, 'red': 0.006977},
                    "meso": {'black': 0.013953, 'red': 0.006977},
                    "9_stat": {'black': 0.090909, 'red': 0.102273},
                    "6_all": {'black': 0.072727, 'red': 0.081818},
                    "12_hp": {'black': 0.018605, 'red': 0.009302},
                    "9_hp": {'black': 0.109091, 'red': 0.122727}
                },
            "line_3":
                {
                    "12_stat": {'black': 0.004651, 'red': 0.00093},
                    "9_all": {'black': 0.003488, 'red': 0.000698},
                    "drop": {'black': 0.003488, 'red': 0.000698},
                    "meso": {'black': 0.003488, 'red': 0.000698},
                    "9_stat": {'black': 0.107955, 'red': 0.1125},
                    "6_all": {'black': 0.086364, 'red': 0.09},
                    "12_hp": {'black': 0.004651, 'red': 0.00093},
                    "9_hp": {'black': 0.129545, 'red': 0.135}
                }
        },
    'hat': {
        "line_1":
            {
                "12_stat": {'black': 0.08, 'red': 0.08},
                "9_all": {'black': 0.06, 'red': 0.06},
                "cd_2": {'black': 0.04, 'red': 0.04},
                "cd_1": {'black': 0.06, 'red': 0.06},
                "12_hp": {'black': 0.08, 'red': 0.08}
            },
        "line_2":
            {
                "12_stat": {'black': 0.016, 'red': 0.008},
                "9_all": {'black': 0.012, 'red': 0.006},
                "cd_2": {'black': 0.008, 'red': 0.004},
                "cd_1": {'black': 0.012, 'red': 0.006},
                "9_stat": {'black': 0.064516, 'red': 0.072581},
                "6_all": {'black': 0.051613, 'red': 0.058065},
                "12_hp": {'black': 0.016, 'red': 0.008},
                "9_hp": {'black': 0.077419, 'red': 0.087097}
            },
        "line_3":
            {
                "12_stat": {'black': 0.004, 'red': 0.0008},
                "9_all": {'black': 0.003, 'red': 0.0006},
                "cd_2": {'black': 0.002, 'red': 0.0004},
                "cd_1": {'black': 0.003, 'red': 0.0006},
                "9_stat": {'black': 0.076613, 'red': 0.079839},
                "6_all": {'black': 0.06129, 'red': 0.063871},
                "12_hp": {'black': 0.004, 'red': 0.0008},
                "9_hp": {'black': 0.091935, 'red': 0.095806}
            }
    }

}

export function getOldProbability(item_type, desired_outcome, cube_type, currentTier, desiredTier, itemLevel) {

    function prob_meso_drop(line, boss_and_drop, probabilities, cube_type, item_type) {
        if (boss_and_drop) {
            return probabilities[item_type][line].drop[cube_type] * 2
        } else {
            return probabilities[item_type][line].drop[cube_type]
        }
    }

    function prob_line(line, line_type, probabilities, cube_type, item_type, amount_of_stat) {
        if (line_type == "att") {
            if (line == "line_1") {
            } else {
            }
        }

        if (line_type == "stat") {
            if (line == "line_1") {
                if (amount_of_stat == 12) return probabilities[item_type][line]["12_stat"][cube_type]
                if (amount_of_stat == 9) return probabilities[item_type][line]["9_all"][cube_type]
                return probabilities[item_type][line]["12_stat"][cube_type] + probabilities[item_type][line]["9_all"][cube_type]
            } else {
                if (amount_of_stat == 12) return probabilities[item_type][line]["12_stat"][cube_type]
                if (amount_of_stat == 9) return probabilities[item_type][line]["9_all"][cube_type] + probabilities[item_type][line]["9_stat"][cube_type]
                return probabilities[item_type][line]["12_stat"][cube_type] + probabilities[item_type][line]["9_all"][cube_type] + probabilities[item_type][line]["9_stat"][cube_type] + probabilities[item_type][line]["6_all"][cube_type]
            }
        }

        if (line_type == "all") {
            if (line == "line_1") {
                return probabilities[item_type][line]["9_all"][cube_type]
            } else {
                if (amount_of_stat == 12) return probabilities[item_type][line]["9_all"][cube_type]
                if (amount_of_stat == 9) return probabilities[item_type][line]["6_all"][cube_type]
                return probabilities[item_type][line]["9_all"][cube_type] + probabilities[item_type][line]["6_all"][cube_type]
            }
        }

        if (line_type == "hp") {
            if (line == "line_1") {
                return probabilities[item_type][line]["12_hp"][cube_type]
            } else {
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

        if (desired_outcome != "5SecCD" && desired_outcome != "6SecCD") {
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
        } else {
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
        } else {
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
        } else {
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
        } else {
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

        var prob_9_line_1 = prob_line("line_1", stat, probabilities, cube_type, item_type, 9)
        var prob_9_line_2 = prob_line("line_2", stat, probabilities, cube_type, item_type, 9)
        var prob_9_line_3 = prob_line("line_3", stat, probabilities, cube_type, item_type, 9)

        var probability = 0

        //12 12 12
        probability = probability + prob_12_line_1 * prob_12_line_2 * prob_12_line_3

        //12 12 9
        probability = probability + prob_12_line_1 * prob_12_line_2 * prob_9_line_3

        //12 9 12
        probability = probability + prob_12_line_1 * prob_9_line_2 * prob_12_line_3

        //9 12 12
        probability = probability + prob_9_line_1 * prob_12_line_2 * prob_12_line_3

    }
    return probability
}