"""Process raw cubing data into a friendly format to be used as input for the cubing calculator scripts."""

import re
import json
import os


def _str_percent_to_float(percent_string):
    return float(percent_string.strip("%"))


# functions to categorize and process different types of lines into the desired output format

# lines with a value (e.g. STR +9%, Boss Damage +30%, Auto steal 2%)
def process_line_value(category, percent_string, re_match):
    value = int(re_match.groups()[0])
    return category, value, _str_percent_to_float(percent_string)


# lines with a decent skill (e.g. Decent sharp eyes)
def process_line_decentskill(category, percent_string, re_match):
    value = re_match.groups()[0]
    return category, value, _str_percent_to_float(percent_string)


# lines that are not desirable
def process_line_junk(category, percent_string, re_match):
    line_text = re_match.string
    return category, line_text, _str_percent_to_float(percent_string)


# group junk lines into a single entry with a combined percentage
# format is: category, list of text from each line (for debugging), single combined percentage of all junk lines
def merge_junk_lines(junk_lines_list):
    junk_line_strings = [a[1] for a in junk_lines_list]
    combined_percentage = sum([a[2] for a in junk_lines_list])
    return "Junk", junk_line_strings, combined_percentage


# mapping to determine what processing function to use in order to format each specific line
# and what category it belongs to
# format of each item is: (category, regex pattern to match the specific line, processing function)
LINE_MAPPINGS = [
    ("STR %", r"STR : \+(\d+)%", process_line_value),
    ("INT %", r"INT : \+(\d+)%", process_line_value),
    ("DEX %", r"DEX : \+(\d+)%", process_line_value),
    ("LUK %", r"LUK : \+(\d+)%", process_line_value),
    ("All Stats %", r"All Stats : \+(\d+)%", process_line_value),
    ("Max HP %", r"Max HP : \+(\d+)%", process_line_value),
    ("Ignore Enemy Defense %", r"Ignore Enemy Defense : \+(\d+)%", process_line_value),
    ("ATT %", r"ATT : \+(\d+)%", process_line_value),
    ("MATT %", r"MATT : \+(\d+)%", process_line_value),
    ("Damage %", r"^Damage : \+(\d+)%", process_line_value),
    ("Critical Chance %", r"Critical Chance : \+(\d+)%", process_line_value),
    ("Critical Damage %", r"Critical Damage : \+(\d+)%", process_line_value),
    ("Boss Damage", r"Boss Damage : \+(\d+)%", process_line_value),
    ("Skill Cooldown Reduction", r"Skill cooldown -(\d+) second", process_line_value),
    ("Decent Skill", r"\<(.+?)\>\senabled", process_line_decentskill),
    ("Chance to auto steal %", r"(\d+)% chance to auto steal when attacking", process_line_value),
    ("Meso Amount %", r"Meso Amount : \+(\d+)%", process_line_value),
    ("Item Drop Rate %", r"Item Drop Rate : \+(\d+)%", process_line_value),
    ("STR Flat", r"STR : \+(\d+)$", process_line_value),
    ("INT Flat", r"INT : \+(\d+)$", process_line_value),
    ("DEX Flat", r"DEX : \+(\d+)$", process_line_value),
    ("LUK Flat", r"LUK : \+(\d+)$", process_line_value),
    ("All Stats Flat", r"All Stats : \+(\d+)$", process_line_value),
    ("Max HP Flat", r"Max HP : \+(\d+)$", process_line_value),
    ("Max MP Flat", r"Max MP : \+(\d+)$", process_line_value),
    ("Defense Flat", r"^Defense : \+(\d+)$", process_line_value),
    ("ATT Flat", r"ATT : \+(\d+)$", process_line_value),
    ("MATT Flat", r"MATT : \+(\d+)$", process_line_value),

    # these are technically junk lines but rolling them will change the probability calculation of
    # subsequent lines so they need to be handled differently
    ("Increase invincibility time after being hit", r"Invincibility time after being hit: \+(\d+) seconds?",
     process_line_value),
    ("Chance of being invincible for seconds when hit", r"(\d+)% of being invincible for (\d+) seconds when attacked",
     process_line_junk),
    ("Chance to ignore % damage when hit", r"(\d+)% chance to ignore (\d+)% damage when hit", process_line_junk),

    # junk lines
    ("Junk", r"Max MP : \+(\d+)%", process_line_junk),
    ("Junk", r"^Defense : \+(\d+)%", process_line_junk),
    ("Junk", r"Increase efficiency of (M|H)P recovery items and skills by : \+(\d+)%", process_line_junk),
    ("Junk", r"\d+% chance to ignore \d+ damage when hit", process_line_junk),
    ("Junk", r"\d+% chance to recover \d+ (M|H)P when killing monsters", process_line_junk),
    ("Junk", r"\d+% chance to recover \d+ (M|H)P when attacking", process_line_junk),
    ("Junk", r"\d+% chance to reflect \d+% of damage taken", process_line_junk),
    ("Junk", r"\+\d+ \w+ per \d+ character levels", process_line_junk),
    ("Junk", r"MP consumption of all skills : -(\d+)%", process_line_junk),
    ("Junk", r"^Jump : \+(\d+)", process_line_junk),
    ("Junk", r"^Speed : \+(\d+)", process_line_junk),
    ("Junk", r"Recover \d+ (M|H)P per \d+ seconds", process_line_junk),
    ("Junk", r"\d+% chance to apply level \d+ (poison|stun|freeze|slow|seal|dark) when attacking", process_line_junk),
]


# take a list of raw potential lines and return their formatted versions
# format of input line: (line text, percentage as string)
# format of output line: (category, value, rate as float)
def format_rates_list(potential_lines_list):
    output_list = []
    junk_lines_list = []

    # keep track of unmatched lines for debugging
    error_list = []

    for (line_text, percent_string) in potential_lines_list:
        result = None

        # process line into (category, value, rate)
        for (category, re_pattern, process_function) in LINE_MAPPINGS:
            match = re.search(re_pattern, line_text)
            if match is not None:
                result = process_function(category, percent_string, match)

                if category == "Junk":
                    junk_lines_list.append(result)
                else:
                    output_list.append(result)
                break
        else:
            error_list.append(line_text)

    # merge any junk lines into one entry and add to end of output list
    if len(junk_lines_list) > 0:
        output_list.append(merge_junk_lines(junk_lines_list))

    return output_list, error_list


# take raw cubing data from json file and generate a formatted set of files and folder structure
# that can be used as input for the cubing calculator script
# ----------------------------------------------------------------------------------------------------------------------
# TODO move this logic for extracting the correct data into raw_potentials_list out of this method
#  and/or make it more generic
# cube_item_tiers_dict stores the two tiers of potentials that each cube type can roll lines from
# (see caveat in note)
# format is -> cube type: (item tier of "prime" lines, item tier of "non-prime" lines)
# cubes can only roll lines from two tiers of potentials based on the item's tier, grouped into:
#   1. "prime line" -> the same tier as the item (e.g. "legendary" line on a "legendary" item)
#   2. "non-prime line" -> one tier below the item  (e.g. "unique" line on a "legendary" item)
# NOTE: currently, this dictionary only includes the case where the item tier matches the cube tier (most common)
# e.g. using a master craftsman's cube on a "unique" item as opposed to "rare" or "epic"
#
# raw_potentials_list is populated by extracting the lines from raw data that correspond to the item tier for that
# iteration. specifically, the entire list under the "first_line" key of the raw data is extracted.
# (this works because the first line can only roll potential lines that match the item tier which gives us a list of
# all the potential lines specific to that item tier. The list for the second and third line on the other hand, contain
# lines from both this item tier as well as those from one item tier below)
def format_cubing_data(raw_json_file, output_dir, level_range="120to200"):
    with open(raw_json_file, "r") as fh:
        raw_data_dictionary = json.load(fh)

    # formatted data will be nested dictionary of: item type -> cube type -> item tier -> formatted rates list
    formatted_data = {}

    # keep track of lines that did not match any regex patterns for debugging
    full_error_list = []

    # the two item tiers that correspond to prime and non-prime lines for a given cube
    cube_item_tiers_dict = {
        "black": ("legendary", "unique"),
        "red": ("legendary", "unique"),
        "meister": ("legendary", "unique"),
        "master": ("unique", "epic"),
        "occult": ("epic", "rare"),
    }

    # extract relevant items from raw data and populate the formatted data dictionary after processing them
    for (item_type, raw_cube_data) in raw_data_dictionary[level_range].items():
        formatted_data[item_type] = {}

        for (cube_type, item_tiers) in cube_item_tiers_dict.items():
            pot_lines_data = {}

            for tier in item_tiers:
                try:
                    raw_potentials_list = raw_cube_data[cube_type][tier]["first_line"]
                except Exception as e:
                    print("Failed to get data for item: {}, cube: {}, tier: {}. Error: {}".format(
                        item_type, cube_type, tier, e))
                    continue
                (pot_lines_data[tier], error_list) = format_rates_list(raw_potentials_list)
                full_error_list += error_list
                print("Finished processing data for item: {}, cube: {}, tier: {}".format(
                    item_type, cube_type, tier))
            if len(pot_lines_data) > 0:
                formatted_data[item_type][cube_type] = pot_lines_data

    if len(full_error_list) > 0:
        print("Failed to match lines for:")
        print(full_error_list)

    # create folder structure and divide data into separate files:
    # root data folder -> item type folders -> one json file for each cube type with rate data
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for (item_type, cube_type_dict) in formatted_data.items():
        # make separate folders for each item type
        item_dir_path = os.path.join(output_dir, item_type)
        if not os.path.exists(item_dir_path):
            os.makedirs(item_dir_path)

        # write to json file for each cube type
        for (cube_type, item_tier_dict) in cube_type_dict.items():
            filename = os.path.join(item_dir_path, "{}_cube.json".format(cube_type))
            dump = json.dumps(item_tier_dict, ensure_ascii=False, indent=4)
            with open(filename, 'w') as f:
                f.write(dump)
            print("Cubing data for item: {}, cube type: {} has been saved to: {}".format(
                item_type, cube_type, filename
            ))


if __name__ == "__main__":
    PARENT_DIR = os.path.dirname(os.path.abspath(__file__))
    TEST_DIR = os.path.join(PARENT_DIR, "test")
    JSON_FILE = os.path.join(TEST_DIR, "source_data", "raw_data_english.json")
    OUTPUT_DIR = os.path.join(TEST_DIR, "cubing_data")

    format_cubing_data(JSON_FILE, OUTPUT_DIR)
