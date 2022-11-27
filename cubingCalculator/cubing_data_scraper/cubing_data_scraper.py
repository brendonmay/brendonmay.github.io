#!/usr/bin/env python3

"""Scrape cubing probability data from the KMS website."""

import os
import sys
import argparse
import glob

# internal modules
from lib import requester, htmlparser, dataformatter

PARENT_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_DATA_PATH = os.path.join(PARENT_DIR, "data")


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

    # parse html files and extract all data into a single json file
    print("Parsing html files to generate raw json. Convert strings from korean to english...")
    raw_json_file = htmlparser.parse_html_files(html_files, data_source_dir)

    # extract pieces of interest from full dataset
    # process and format data into useful structure
    print("Generate formatted json file for calculator scripts...")
    dataformatter.format_cubing_data(raw_json_file, data_source_dir)


if __name__ == "__main__":
    main(**parse_arguments())
