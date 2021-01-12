#!/usr/bin/env python3
"""
Author : Laurence Dyer <ljdyer@gmail.com>
Date   : 10/01/2021
Purpose: Make JSON string from list of countries
"""

import argparse
import os
import re
import json
import pprint
import string
from pathlib import Path
from colorama import init, Fore
init()

all_files = [
    'country_lists/Africa.txt',
    'country_lists/Asia.txt',
    'country_lists/Europe.txt',
    'country_lists/North_America.txt',
    'country_lists/Oceania.txt',
    'country_lists/South_America.txt',
]

parser = argparse.ArgumentParser(
        description='Unscramble the letters of words',
        formatter_class=argparse.ArgumentDefaultsHelpFormatter)


permitted_chars = list(string.ascii_lowercase + string.ascii_uppercase + ' ')


# --------------------------------------------------
def get_args():
    """Get command-line arguments"""

    parser.add_argument('-i', '--infile', metavar='infile', nargs="+", help='Input file')

    parser.add_argument('-a', '--all', action='store_true', help='Make JSONs for all continents')

    args = parser.parse_args()
    
    if args.all:
        args.infile = all_files
    args.input = [get_text_from_file(infile) for infile in args.infile]

    return args


# --------------------------------------------------
def get_text_from_file(infile):
    """Given file path, return filename stem and text content in a 2-element array"""

    if os.path.isfile(infile):
        infile_stem = Path(infile).stem
        text = open(infile).read().rstrip()
        return [infile_stem, text]
    else:
        parser.error(f'--file "{infile}" not found')


# --------------------------------------------------
def main():
    """Main program"""

    args = get_args()
    input_data = args.input

    countries = []
    
    for [stem, data] in input_data:
        all_as_dict = make_dictionary(data)
        countries += list(all_as_dict.keys())
        output_json = json.dumps(all_as_dict, indent=4, sort_keys=True)
        write_to_file(stem, output_json)

    # DUPE CHECK
    dupes = {c:countries.count(c) for c in countries if countries.count(c) > 1}
    for country in dupes.keys():
        print(Fore.RED + f'Warning: {country} appears in {dupes[country]} lists' + Fore.WHITE)


# --------------------------------------------------
def make_dictionary(input_data):
    """Write JSON to a file '{stem}_json'.txt"""

    lines = input_data.split("\n")
    all_as_list = list(map(line_parts, lines))
    all_as_dict = {country : capital for [country, capital] in all_as_list}
    return all_as_dict


# --------------------------------------------------
def write_to_file(stem, output):
    """Given stem of filename, write output to file '{stem}_json.txt'"""
    outfile = stem + "_json.txt"
    with open(outfile, 'w') as out_fh:
        out_fh.write(output)
    print(f'Wrote to file: {outfile}')


# --------------------------------------------------
def line_parts(line):
    """Return array [country, capital] based on line string"""

    parts = [p.strip() for p in line.split(' - ')]
    # FORBIDDEN CHAR CHECK
    for p in parts:
        forbidden_chars = get_forbidden_chars(p)
        if forbidden_chars:
            print(Fore.RED + f'WARNING: {p} contains forbidden characters {forbidden_chars}' + Fore.WHITE)
    return parts


# --------------------------------------------------
def get_forbidden_chars(string):
    """Get forbidden characters from string"""
    chars = list(string)
    forbidden_chars = list(filter(char_forbidden, chars))
    return forbidden_chars


# --------------------------------------------------
def char_forbidden(char):
    """Return true if character is forbidden"""
    return char not in permitted_chars


# --------------------------------------------------
if __name__ == '__main__':
    main()
