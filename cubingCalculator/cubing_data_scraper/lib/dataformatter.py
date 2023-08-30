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
    ("STR %", r"^STR : \+(\d+)%", process_line_value),
    ("INT %", r"^INT : \+(\d+)%", process_line_value),
    ("DEX %", r"^DEX : \+(\d+)%", process_line_value),
    ("LUK %", r"^LUK : \+(\d+)%", process_line_value),
    ("All Stats %", r"^All Stats : \+(\d+)%", process_line_value),
    ("Max HP %", r"^Max HP : \+(\d+)%", process_line_value),
    ("Ignore Enemy Defense %", r"Ignore Enemy Defense : \+(\d+)%", process_line_value),
    ("ATT %", r"^ATT : \+(\d+)%", process_line_value),
    ("MATT %", r"^MATT : \+(\d+)%", process_line_value),
    ("Damage %", r"^Damage : \+(\d+)%", process_line_value),
    ("Critical Chance %", r"^Critical Chance : \+(\d+)%", process_line_value),
    ("Critical Damage %", r"^Critical Damage : \+(\d+)%", process_line_value),
    ("Boss Damage", r"^Boss Damage : \+(\d+)%", process_line_value),
    ("Skill Cooldown Reduction", r"Skill cooldown : -(\d+)seconds", process_line_value),
    ("Decent Skill", r"\<(.+?)\>\senabled", process_line_decentskill),
    ("Chance to auto steal %", r"When attacking (\d+)% chance to auto steal", process_line_value),
    ("Meso Amount %", r"^Meso Amount : \+(\d+)%", process_line_value),
    ("Item Drop Rate %", r"^Item Drop Rate : \+(\d+)%", process_line_value),
    ("STR Flat", r"^STR : \+(\d+)$", process_line_value),
    ("INT Flat", r"^INT : \+(\d+)$", process_line_value),
    ("DEX Flat", r"^DEX : \+(\d+)$", process_line_value),
    ("LUK Flat", r"^LUK : \+(\d+)$", process_line_value),
    ("All Stats Flat", r"^All Stats : \+(\d+)$", process_line_value),
    ("Max HP Flat", r"^Max HP : \+(\d+)$", process_line_value),
    ("Max MP Flat", r"^Max MP : \+(\d+)$", process_line_value),
    ("Defense Flat", r"^Defense : \+(\d+)$", process_line_value),
    ("ATT Flat", r"^ATT : \+(\d+)$", process_line_value),
    ("MATT Flat", r"^MATT : \+(\d+)$", process_line_value),

    # these are technically junk lines but rolling them will change the probability calculation of
    # subsequent lines so they need to be handled differently
    ("Increase invincibility time after being hit", r"After being hit invincibility duration : \+(\d+)seconds",
     process_line_value),
    ("Chance of being invincible for seconds when hit", r"When hit \d+% chance for \d+seconds of invincibility",
     process_line_junk),
    ("Chance to ignore % damage when hit", r"^When hit (\d+)% chance for Damageof (\d+)% ignore", process_line_junk),
    ("Chance to ignore flat damage when hit", r"^When hit (\d+)% chance for (\d+)of Damage ignore", process_line_junk),

    # junk lines
    ("Junk", r"Max MP : \+(\d+)%", process_line_junk),
    ("Junk", r"^Defense : \+(\d+)%", process_line_junk),
    ("Junk", r"Increase efficiency of (M|H)P recovery items and skills by : \+(\d+)%", process_line_junk),
    ("Junk", r"^When killing a monster \d+% chance for \d+of (M|H)P recovery", process_line_junk),
    ("Junk", r"\d+% chance for damage received \d+%reflect", process_line_junk),
    ("Junk", r"Per \d+ character levels (ATT|MATT|STR|LUK|DEX|INT) : \+1", process_line_junk),
    ("Junk", r"MP consumption of all skills : -(\d+)%", process_line_junk),
    ("Junk", r"^Jump : \+(\d+)", process_line_junk),
    ("Junk", r"^Speed : \+(\d+)", process_line_junk),
    ("Junk", r"Per 4 seconds \d+of (M|H)P recovery", process_line_junk),
    ("Junk", r"^When attacking \d+% chance for \d+of (H|M)P recovery", process_line_junk),
    ("Junk", r"^When hit \d+% chance for \d+seconds to feel", process_line_junk),
    ("Junk", r"^When attacking \d+% chance for \d+level (poison|stun|freeze|slow|seal|dark) status", process_line_junk),
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


# format raw data for easier parsing by javascript files, save it as a json
# each entry is stored as a tuple with format: (category, value, rate as float)
def format_cubing_data(raw_json_file, output_dir):
    with open(raw_json_file, "r") as fh:
        raw_data_dictionary = json.load(fh)

    # structure is: lvl range -> item type -> cube type -> item tier -> line number -> list of rates
    # "list of rates" is the portion that will be formatted. hierarchy matches the raw dictionary otherwise.
    formatted_data = {}

    # keep track of lines that did not match any regex patterns for debugging
    full_error_list = []

    for (level_range, item_type_data) in raw_data_dictionary.items():
        formatted_data[level_range] = {}

        for (item_type, cube_data) in item_type_data.items():
            formatted_data[level_range][item_type] = {}

            for (cube_type, item_tier_data) in cube_data.items():
                formatted_data[level_range][item_type][cube_type] = {}

                for (item_tier, line_data) in item_tier_data.items():
                    formatted_data[level_range][item_type][cube_type][item_tier] = {}

                    for (line_num, rates) in line_data.items():
                        formatted_data[level_range][item_type][cube_type][item_tier][line_num] = {}

                        raw_potentials_list = raw_data_dictionary[level_range][item_type][cube_type][item_tier][line_num]
                        (formatted_rates, error_list) = format_rates_list(raw_potentials_list)
                        formatted_data[level_range][item_type][cube_type][item_tier][line_num] = formatted_rates
                        full_error_list += error_list

    if len(full_error_list) > 0:
        print("(For debugging only) The following strings were left un-translated. Add them to translation table if "
              "needed:")
        print(full_error_list)

    # save full formatted data dictionary as a single jsonf ile
    full_formatted_data_file = os.path.join(output_dir, "formatted_data.json")
    full_dump = json.dumps(formatted_data, ensure_ascii=False, indent=4)
    with open(full_formatted_data_file, 'w') as f:
        f.write(full_dump)

    print("Finished writing formatted json file: {}".format(full_formatted_data_file))


if __name__ == "__main__":
    PARENT_DIR = os.path.dirname(os.path.abspath(__file__))
    TEST_DIR = os.path.join(PARENT_DIR, "test")
    JSON_FILE = os.path.join(TEST_DIR, "raw_data_english.json")

    format_cubing_data(JSON_FILE, TEST_DIR)
