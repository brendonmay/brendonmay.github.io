"""Parse html files and extract raw cubing data into a combined json file."""

from bs4 import BeautifulSoup
import json
import os


from lib.translator import translate_text


# parse html files and extract relevant data into a dictionary
# subsequent html files can be added and will be merged into the existing dictionary after parsing
# data is grouped by the input selection options (e.g. cube type, item type, tier, etc)
# data dictionary hierarchy and format:
# lvl range (dict) -> item type (dict) -> cube type (dict) -> item tier (dict)
# -> line number (list of tuples) -> (line (str), rate (float))
class Parser:
    LINE_NUMBER_TABLE_CLASSES = ["cube_data _1", "cube_data _2", "cube_data _3", ]

    # used to obtain input selection options which were injected into the html files written by requester.py
    METADATA_ID = "mingmetadata"

    def __init__(self):
        self.current_html_data = None
        self.data = {}

    def _load_html_file(self, html_file):
        with open(html_file) as fp:
            soup = BeautifulSoup(fp, 'html.parser')
        self.current_html_data = soup

    def dump_data(self):
        return self.data

    # add data from a new page into existing data dictionary
    # this will replace an existing entry of the same combination of input options if applicable
    def add_html_data(self, html_file):
        self._load_html_file(html_file)
        chosen_options = self._get_options_metadata()

        lvl_range = chosen_options["level_range"]
        item_type = chosen_options["item_type"]
        tier = chosen_options["item_tier"]
        cube_type = chosen_options["cube_type"]

        if lvl_range not in self.data.keys():
            self.data[lvl_range] = {}
        if item_type not in self.data[lvl_range].keys():
            self.data[lvl_range][item_type] = {}
        if cube_type not in self.data[lvl_range][item_type].keys():
            self.data[lvl_range][item_type][cube_type] = {}

        self.data[lvl_range][item_type][cube_type][tier] = self._parse_tables_potlines()

    # parse data from potentials table of this page
    def _parse_tables_potlines(self):
        pot_rates = {}

        for table_class in self.LINE_NUMBER_TABLE_CLASSES:
            table_data = self.current_html_data.find("table", class_=table_class)
            line_number = table_data.find_all("th")[0].text
            pot_rates[line_number] = []

            table_data = table_data.find("tbody")
            data_rows = table_data.find_all("tr")

            # format of each item: (line type, percent value)
            # use list of tuples instead of dictionary as the same line name can appear on more than one row
            # (e.g. Boss Damage +30%)
            for row in data_rows:
                (line_name, rate) = [a.text for a in row.find_all("td")]
                pot_rates[line_number].append((line_name, rate))

        return pot_rates

    def _get_options_metadata(self):
        return self.current_html_data.find(id=self.METADATA_ID).attrs


# CURRENTLY UNUSED
# TODO restructure this module to be able to parse different types of pages and information in the future
# The current parser obtains rates for specific potential lines to appear
# Additionally, the website has: 1) tier up information and 2) chance to roll a prime vs non-prime line
# the implementation for parsing 2) is in scrape_tier_rates(), currently unused
def scrape_tier_rates(page_data):
    cube_rates_data = {}

    soup = BeautifulSoup(page_data.content, "html.parser")

    results = soup.find()
    cube_table = results.find("table", class_="cube_grade")
    cube_table_header_row = cube_table.find("thead")
    cube_table_header_cells = cube_table_header_row.find_all("th")

    # equipment grades are the header column cells except for the first one
    equipment_grades = [a.text for a in cube_table_header_cells[1:]]
    cube_rates_data = cube_rates_data.fromkeys(equipment_grades)

    cube_data = cube_table.find("tbody")
    cube_data_line_types = cube_data.find_all("th")
    for key in cube_rates_data.keys():
        cube_rates_data[key] = {line_type.text: {} for line_type in cube_data_line_types}

    cube_data_rows = cube_data.find_all("tr")

    # create list of line types to match the number of elements in data rows to prep for zip
    # merged cells need to be added `rowspan` number of times
    formatted_line_types = []
    for line_type in cube_data_line_types:
        sub_rows = line_type.attrs.get("rowspan")
        if sub_rows is None:
            formatted_line_types.append(line_type.text)
        else:
            formatted_line_types.extend([line_type.text]*int(sub_rows))

    for (line_type, data_row) in zip(formatted_line_types, cube_data_rows):
        print("line type: {}".format(line_type))
        data_cells = data_row.find_all("td")

        # go through table cell items in pairs of (label, percent value)
        data_pairs = zip(data_cells[::2], data_cells[1::2])
        for (equip_grade, (label, value)) in zip(equipment_grades, data_pairs):
            print((label, value))

            # NOTE python's rounding does not round 5s up. if this is not ok, use Decimal type
            cube_rates_data[equip_grade][line_type][label.text] = round(float(value.text.strip("%")) / 100.0, 4)
    return cube_rates_data


def get_html_files(directory):
    html_files = []
    for f in os.listdir(directory):
        (name, ext) = os.path.splitext(f)
        if ext == ".html":
            html_files.append(os.path.join(directory, f))
    return html_files


# parse a list of html files and store all combined data into a single json file
# translate the resulting data from kr to english
def parse_html_files(html_files, output_dir):
    parser = Parser()

    for html_file in html_files:
        try:
            parser.add_html_data(html_file)
        except Exception as e:
            print("Failed to parse: {}\n{}".format(html_file, e))

    raw_json_path = os.path.join(output_dir, "raw_data_kr.json")

    # set ensure_ascii=False to fix issues with korean characters
    raw_dump = json.dumps(parser.dump_data(), ensure_ascii=False, indent=4)
    with open(raw_json_path, 'w') as f:
        f.write(raw_dump)
    print("Finished writing raw json file (korean): {}".format(raw_json_path))

    english_json_path = os.path.join(output_dir, "raw_data_english.json")
    english_str_dump = translate_text(raw_dump)
    with open(english_json_path, 'w') as f:
        f.write(english_str_dump)

    print("Finished writing raw json file (english): {}".format(english_json_path))
    return english_json_path


if __name__ == "__main__":
    # NOTE: When running this as a standalone script, we need to call it as a module in order to resolve the
    # sibling import to translator.py (otherwise an import error will occur). To do so:
    # cd one level up from this file and run: `python -m lib.htmlparser`

    PARENT_DIR = os.path.dirname(os.path.abspath(__file__))
    TEST_DIR = os.path.join(PARENT_DIR, "test")
    HTML_FILES_DIR = os.path.join(TEST_DIR, "html_files")

    source_html_files = get_html_files(HTML_FILES_DIR)
    raw_json_file = parse_html_files(source_html_files, TEST_DIR)

