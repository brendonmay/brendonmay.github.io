#!/usr/bin/env python3

"""Scrape cubing probability data from the KMS website."""

import os
import sys
import argparse
import glob
import json
import datetime
from collections import OrderedDict

# internal modules
from lib import requester, htmlparser, dataformatter

PARENT_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_DATA_PATH = os.path.join(PARENT_DIR, "data")
CUBE_DATA_JS_PATH = os.path.join(os.path.dirname(PARENT_DIR), "cubeRates.js")

# setting this up in case we add more options in the future
def parse_arguments():
    parser = argparse.ArgumentParser(description="""Scrape cubing probability data from KMS website.
    Outputs formatted data to a json file to be used by probability calculation scripts.
    Downloaded html files will be saved in a sub-folder called html_files""",
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('-c', '--use-cached', action='store_true',
                        help='Use cached html files instead of downloading new ones. Default search location (parent '
                             'directory is set by -o): {}/html_files/'.format(DEFAULT_DATA_PATH))
    parser.add_argument('-o', '--output', metavar='dir', dest='output_dir', default=DEFAULT_DATA_PATH,
                        help='Specify custom directory to save output files to. '
                             'Default location is: {}'.format(DEFAULT_DATA_PATH))

    return vars(parser.parse_args())


def main(output_dir, use_cached):
    data_source_dir = os.path.abspath(output_dir)
    html_files_dir = os.path.join(data_source_dir, "html_files")

    print("This script will overwrite the contents of: {}".format(CUBE_DATA_JS_PATH))
    print("Raw data will be stored in: {}".format(data_source_dir))
    print()

    if use_cached:
        print("Looking for cached html files in: {}".format(html_files_dir))
        html_files = glob.glob(os.path.join(html_files_dir, "*.html"))
        if len(html_files) < 1:
            sys.exit("Failed to find any html files in this folder.")
        else:
            print("Found {} html file(s).".format(len(html_files)))
    else:
        # send HTTP requests for cubing data and download html files
        print("Preparing to send HTTP requests to Nexon's website for cubing data...")
        html_files = requester.download_html_files(html_files_dir)
    print()

    # parse html files and extract all data into a single json file
    print("Parsing html files to generate raw json. Convert strings from korean to english...")
    raw_json_file = htmlparser.parse_html_files(html_files, data_source_dir)

    # extract pieces of interest from full dataset
    # process and format data into useful structure
    print("Generate formatted json file for calculator scripts...")
    output_file = dataformatter.format_cubing_data(raw_json_file, data_source_dir)

    # write the contents of formatted json file to cubeRates.js
    # this is a hack to store data in a way that's accessible from the calculator script
    # i'd like to be able to access it directly from json or other static data file but not sure how
    print("Writing data to: {}".format(CUBE_DATA_JS_PATH))
    with open(output_file, "r") as fh:
        formatted_data = json.dumps(json.load(fh, object_pairs_hook=OrderedDict), indent=4)
    
    with open(CUBE_DATA_JS_PATH, "w") as fh:
        fh.write("// Auto-generated on {}\n".format(datetime.date.today().strftime("%m/%d/%Y")))
        fh.write("const cubeRates = ")
        fh.write(formatted_data)
    
    print("Done.")


if __name__ == "__main__":
    main(**parse_arguments())
