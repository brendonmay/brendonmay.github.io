# KMS Cubing Data Scraper
Tool for scraping KMS website for cubing probability data.
Outputs formatted data to a json file for use by probability calculation scripts.

### Installing dependencies
To install dependencies, run:
```
pip install -r requirements.txt --user
```
Note: remember to omit the `--user` flag if running from a virtual environment.

### Running the scraper
To run with the default configuration:
```
./cubing_data_scrapyer.py
```
The output file with the formatted data is located at: `data/formatted_data.json`

> Notes:
>
> 1. This default configuration will issue requests for items types, cubes, and tiers that are currently supported by the calculator.
At the time of writing, this will make 140 requests and save each into a separate html file so it can take several minutes.
>
> 2. For now we are just manually copying and pasting the contents from `formatted_data.json` into the file: `cubingRates.js` (for various reasons 😑). Might add a small script to do it later.

---

### Background info for context
The KMS cubing data page is here: https://maplestory.nexon.com/Guide/OtherProbability/cube/red

You can switch to a different cube type from the sidebar on the right.
To view the rates for a specific equipment configuration, select options from the "probability search" form and submit (see screenshot below):

![kms_website.png](docs/kms_website.png)

The scraper basically automates the process of going through all the selection options we care about and saves the data form the tables to be used in our calculations.

---
### Running with custom options

To see the usage for other run options:
```
./cubing_data_scrapyer.py -h
```

Just going to paste it directly for now since I'm lazy:
```
usage: cubing_data_scraper.py [-h] [-c] [-o dir]

Scrape cubing probability data from KMS website.
    Outputs formatted data to a json file to be used by probability calculation scripts.
    Downloaded html files will be saved in a sub-folder called html_files

optional arguments:
  -h, --help            show this help message and exit
  -c, --use-cached      Use cached html files instead of downloading new ones. Default search location (parent directory is set by -o):
                        {dir}/html_files/
  -o dir, --output dir  {dir}/data
```

