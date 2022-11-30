"""Send HTTP requests to Nexon website for cubing rates and save the output webpages into html files for parsing."""

import requests
import os

# url of request sent when the "go" button is pressed on the cubing rates page
REQUEST_URL = "https://maplestory.nexon.com/Guide/OtherProbability/cube/GetSearchProbList"

# headers sent when making a request from the browser
# using the same ones to make Nexon website think we are a browser, otherwise it redirects us to a news page instead of
# returning cubing data. Not all of these are necessary but i would need to experiment to find out which ones are.
DEFAULT_HEADER = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive",
        "Content-Length": "53",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Cookie": "EGC=; EGCMP=; EGC2=; EGCGM=; MSGENC=; MSGENCT=; EGCMSCM=; PCID=16517677487260173150647; A2SK=act:16517677487685216061; _ga=GA1.2.189211870.1651767749; _gid=GA1.2.3231643.1651767749; isCafe=false; NXGID=D5A20F07D8201EF3E5CFE48C97F3E1A6; NXLW=SID=3AD62D771D822CC70CD7473C5BA12181&PTC=https:&DOM=maplestory.nexon.com&ID=&CP=; NXPID=516D0F5E0C74E77AAC074E265DB87F9E; NLWGID=0; introskip=; gnbLogo=null",
        "Host": "maplestory.nexon.com",
        "Origin": "https://maplestory.nexon.com",
        # "Referer": "https://maplestory.nexon.com/Guide/OtherProbability/cube/master/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest",
        #"sec-ch-ua": "" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "macOS"
}

# mapping of dropdown selection options from the website (cube type, item type, tier, level)
# into corresponding IDs used in the payload of the HTTP request
# this was obtained from the html data on the cubing webpage, will need to be updated if they change
PAYLOAD_DICT = {
    "cube_ids": {
        "black": "5062010",
        "red": "5062009",
        "meister": "2711004",
        "master": "2711003",
        "occult": "2711000",
    },
    "item_tiers": {
        "rare": 1,
        "epic": 2,
        "unique": 3,
        "legendary": 4,
    },
    "item_types": {
        "weapon": 1,
        "emblem": 2,
        "secondary": 3,
        "soul shield": 4,
        "shield": 5,
        "hat": 6,
        "top": 7,
        "overall": 8,
        "bottom": 9,
        "shoes": 10,
        "gloves": 11,
        "cape": 12,
        "belt": 13,
        "shoulder": 14,
        "face accessory": 15,
        "eye accessory": 16,
        "earrings": 17,
        "ring": 18,
        "pendant": 19,
        "heart": 20,
    },

    # the website requires a numerical value as input for level but will later convert this to a string
    # with a level range. we are only interested in the ranges rather than specific levels anyway
    # so we'll just use map each range to a number that falls under it to satisfy their input requirements
    "item_levels": {

        # for now, we're only interested in this one
        "lvl120to200": 120,

        # this logic is from the script portion of the response data from Nexon's webiste.
        # not sure why every 10 levels gets its own category until 120
        "lvl0to9": 0,
        "lvl11to19": 11,
        "lvl21to29": 21,
        "lvl31to39": 31,
        "lvl41to49": 41,
        "lvl51to59": 51,
        "lvl61to69": 61,
        "lvl71to79": 71,
        "lvl81to89": 81,
        "lvl91to99": 91,
        "lvl101to109": 101,
        "lvl111to119": 111,
        "lvl201to250": 201,
        "lvl20": 20,
        "lvl30": 30,
        "lvl40": 40,
        "lvl50": 50,
        "lvl60": 60,
        "lvl70": 70,
        "lvl80": 80,
        "lvl90": 90,
        "lvl100": 100,
        "lvl110": 110,
    }
}


# send an HTTP request and return the response data
# save data to html file if specified
def send_request(url, options, headers, output_file=None):
    payload = _convert_options_to_payload(options)
    print("Payload: {}".format(payload))
    response = requests.post(url, data=payload, headers=headers)

    if output_file is not None:
        with open(output_file, 'w') as file:
            file.write(response.text)
            file.write(generate_metadata_text(options))
    return response


# inject the input selection options into the html file since it is not included by default
# the parser will find this div tag by id and use the attributes to organize the data for the output json file
def generate_metadata_text(options):
    metadata_string ="""
        <div id=mingmetadata cube_type="{}" level_range="{}" item_type="{}" item_tier="{}">""</div>\r\n
    """.format(options["cube_type"], options["level_range"], options["item_type"], options["item_tier"],)
    return metadata_string


# convert desired input selection options into payload values that the website understands
def _convert_options_to_payload(options):
    return {
        "nCubeItemID": PAYLOAD_DICT["cube_ids"][options["cube_type"]],
        "nReqLev": PAYLOAD_DICT["item_levels"][options["level_range"]],
        "nPartsType": PAYLOAD_DICT["item_types"][options["item_type"]],
        "nGrade": PAYLOAD_DICT["item_tiers"][options["item_tier"]],
    }


# generate list of all the common combinations of input selection options we require data for
# each item in the output list is an options dictionary that contains: item type, cube type, level, item tier
# this function generates a list of options for the common case:
# - only obtain data for item level 120 (all items from 120-200 have the same rates in KMS)
# - assume the item tier matches the cube tier (so for each cube, only items of its tier or one below are requested)
def generate_common_options_list():
    options_list = []

    level_range = "lvl120to200"
    items_required = [
        "weapon", "emblem", "secondary", "hat", "top", "overall", "bottom", "shoes", "gloves", "cape",
        "belt", "shoulder", "ring", "heart",
    ]

    # get data for both item tier matching cube and one tier below
    # (to get prime and non-prime lines for a each cube type)
    cube_item_tiers_dict = {
        "black": ("legendary", "unique"),
        "red": ("legendary", "unique"),
        "meister": ("legendary", "unique"),
        "master": ("unique", "epic"),
        "occult": ("epic", "rare"),
    }

    for item in items_required:
        for (cube, item_tiers) in cube_item_tiers_dict.items():
            for tier in item_tiers:
                options_list.append({
                    "cube_type": cube, "level_range": level_range, "item_type": item, "item_tier": tier
                })

    return options_list


# send HTTP requests to Nexon Korea's cubing rates page and download the pages as html files
# send one request for each desired combination of: item type, cube type, item tier
# specified via the options_list
def download_html_files(output_dir, url=REQUEST_URL, header=None, options_list=None):
    if header is None:
        header = DEFAULT_HEADER

    if options_list is None:
        options_list = generate_common_options_list()

    output_dir = os.path.abspath(output_dir)
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    print("html files will be saved to: {}".format(output_dir))
    print("Total number of requests (each will be stored in a separate html file): {}".format(len(options_list)))
    print("Displaying payload for (up to) the first 5 requests for reference:")
    for (index, options) in enumerate(options_list[:5], start=1):
        print("Request {}/{}: {}".format(index, len(options_list), options))
    print("\nNote: This can take a while if there are a large number of requests. Any files with the same name at this location will be overwritten.")
    input("Press any key to continue or Ctrl-C to abort\n")

    html_files = []
    for (index, options) in enumerate(options_list, start=1):
        print("Sending request {}/{}".format(index, len(options_list)))
        print("Options: {}".format(options))
        basename = "cube-{}_lvl-{}_item-{}_tier-{}.html".format(
            options["cube_type"], options["level_range"], options["item_type"], options["item_tier"]
        )
        output_filename = os.path.join(output_dir, basename)
        send_request(url, options, header, output_file=output_filename)
        html_files.append(output_filename)
        print("Output file saved to: {}".format(output_filename))

    return html_files


if __name__ == "__main__":

    TEST_OPTIONS = {
        "cube_type": "black",
        "item_tier": "legendary",
        "item_type": "weapon",
        "level_range": "lvl120to200",
    }

    PARENT_DIR = os.path.dirname(os.path.abspath(__file__))
    TEST_DIR = os.path.join(PARENT_DIR, "test")
    OUTPUT_DIR = os.path.join(TEST_DIR, "html_files")
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
    html_files_list = download_html_files(OUTPUT_DIR, options_list=[TEST_OPTIONS, ])
