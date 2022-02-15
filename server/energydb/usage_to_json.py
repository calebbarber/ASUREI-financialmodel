import pandas
import json

bldg_stats_excel = pandas.read_excel('asu_usage.xlsm', sheet_name='BldgStatistics')
bldg_stats_json_str = bldg_stats_excel.to_json(orient='index')
bldg_stats_json_object = json.loads(bldg_stats_json_str)
bldg_stats_json_pretty = json.dumps(bldg_stats_json_object, indent=4)

with open('bldg_stats_data.json', 'w') as out:
    out.write(bldg_stats_json_pretty)
