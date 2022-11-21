"""Scrape cubing probability data from the KMS website."""

import os
import argparse

# internal modules
from lib import requester, htmlparser, dataformatter


PARENT_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_DATA_PATH = os.path.join(PARENT_DIR, "data")


# setting this up in case we add more options in the future
def parse_arguments():
    parser = argparse.ArgumentParser(description="""Scrape cubing probability data from KMS website.""")

    parser.add_argument('-o', '--output', metavar='dir', dest='output_dir', default=DEFAULT_DATA_PATH,
                        help='Specify custom directory to save output cubing data to. '
                             'Otherwise, it will be saved to: {}'.format(DEFAULT_DATA_PATH))

    return vars(parser.parse_args())


def main(output_dir):
    data_source_dir = output_dir
    html_files_dir = os.path.join(data_source_dir, "html_files")

    # set HTTP requests for cubing data and download html files
    html_files = requester.download_html_files(html_files_dir)

    # parse html files and extract all data into a single json file
    raw_json_file = htmlparser.parse_html_files(html_files, data_source_dir)

    # extract pieces of interest from full dataset
    # process and format data into useful structure
    dataformatter.format_cubing_data(raw_json_file, data_source_dir)


if __name__ == "__main__":
    main(**parse_arguments())
