#!/usr/bin/env python3

import json
import os
import requests
import sys
import xmltodict
from pprint import pprint
import collections
import csv
import time
import xml.etree.ElementTree as ET

# globals
ARGUMENTS = sys.argv[1:]
URL = "https://www.animenewsnetwork.com/encyclopedia/reports.xml?id=155&type=anime&nlist=all"

def usage(status=0):
    prog_name = os.path.basename(sys.argv[0])
    print('''Usage {} [options]
    Options:
        -h      Display this help message
        -o      Output file
        
        No outfile provided displays data to stdout'''.format(prog_name))
    sys.exit(status)

def get_data(url=URL):
    headers = {
        'User-Agent': 'anitracker_db_convert_script'
    }

    print('grabbing full general db...', end='')
    r = requests.get(url, headers=headers)
    return r.text

def parse_xml(xml_db):
    print('parsing xml database...', end='')
    _shows = []
    shows = {}
    partial_db = xmltodict.parse(xml_db)
    for outer in partial_db.values():
        for titles in outer.values():
            for show in titles:
                if type(show) is collections.OrderedDict:
                    _shows.append(dict(show))
    
    for show in _shows:
        _show_details = {
            'name': show.get('name', 'BadName'),
            'gid': show.get('gid', 0),
            'type': show.get('type', 'BadType'),
            'precision': show.get('precision', 'BadPrecision'),
            'date': show.get('vintage', '1976-04-01')
        }
        shows[show.get('id', 0)] = _show_details

    return shows

def convert_to_csv(dict_db, ep_count, summaries, pics):
    print('starting csv conversion...', end='')
    final_db = '''anid,name,gid,type,precision,eps,date,summary,img\n'''

    for anid, deets in dict_db.items():
        _temp = '{},{},{},{},{},{},{},{},{}\n'.format(str(anid), str(deets['name']).replace(',', ''), str(deets['gid']).replace(',', ''), str(deets['type']).replace(',', ''), str(deets['precision']).replace(',', ''), str(ep_count[anid]).replace(',',''), str(deets['date']).replace(',', ''), str(summaries[anid]), str(pics[anid]))
        final_db += _temp
        print('debug: added {} to final'.format(anid))

    print(' DONE!')

    print('exporting to file...', end='')
    with open('db456.csv', 'w') as deb:
        deb.write(final_db)
    print(' done!')

def get_show_info(dict_db):

    print('Starting LONG process to get episode numbers... ')
    ep_numbers = {}

    headers = {
        'User-Agent': 'Anitrackcer_ep_counter'
    }
    base_url = 'https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime='
    summaries = {}
    pics = {}
    for anid in dict_db.keys():
        try:
            eps = None
            plot_summary = None
            pic_url = None
            # getting ep numbers here
            print('DEBUG: grabbing show id {}'.format(anid), file=sys.stderr)
            print('using url: {}'.format(base_url + anid))
            r = requests.get(base_url + anid, headers=headers)
            root = ET.fromstring(r.text)
            # print(r.text)
            for child in root:
                for thing in child:
                    if thing.attrib.get('type') == 'Number of episodes':
                        eps = thing.text
                    if thing.attrib.get('type') == 'Plot Summary':
                        plot_summary = thing.text.replace(',', '')
                    if thing.attrib.get('type') == 'Picture':
                        pic_url = thing.attrib.get('src')

            if eps:
                ep_numbers[anid] = eps
            else:
                ep_numbers[anid] = 1

            if plot_summary:
                summaries[anid] = plot_summary
            else:
                summaries[anid] = 'No summary provided'
            
            if pic_url:
                pics[anid] = pic_url
            else:
                pics[anid] = "/assets/imgs/no-thumbnail.jpg"
        # for api timeout

#             print('DEBUG: Show id {} has {} eps'.format(anid, ep_numbers[anid], file=sys.stderr))
#             print('debug: summary is: {}'.format(summaries[anid]))
#             print('debug: picurl is: {}'.format(pics[anid]))
            print('saved show {} successfully'.format(anid))
            time.sleep(1.2)



        except Exception as e:

            print('{} exception with anid {}, skipping'.format(e, anid))
            ep_numbers[anid] = 1
            summaries[anid] = 'No summary provided'
            pics[anid] = '/assets/imgs/no-thumbnail.jpg'




    return ep_numbers, summaries, pics

def main():
    # global setup
    USER_URL = None
    USER_FILE = None
    
    while len(ARGUMENTS) and ARGUMENTS[0].startswith('-') and len(ARGUMENTS[0]) > 1:
        arg = ARGUMENTS.pop(0)
        if arg == '-i':
            USER_FILE = ARGUMENTS.pop(0)
        elif arg == '-h':
            usage(0)
        else:
            usage(1)
    
    # check to make sure user didn't do both file and url
    if USER_FILE and USER_URL:
        print('Error: Cannot provide both a file and a URL')
        sys.exit(2)

    # check to make sure there's nothing left on the command line
    if len(ARGUMENTS) > 0:
        usage(3)

    xml_db = get_data()
    print(' DONE!')
    dict_db = parse_xml(xml_db)
    print(' DONE!')
    ep_count, summaries, pics = get_show_info(dict_db)
    print(' DONE!')
    convert_to_csv(dict_db, ep_count, summaries, pics)

if __name__ == '__main__':
    main()