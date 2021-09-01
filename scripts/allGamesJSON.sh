#!/bin/basg
# "oneLiner" to make a JSON of all games (in local db)
# exported to CSV w/ adminer

# PROPS: https://stackoverflow.com/questions/29663187/csv-to-json-using-jq
# objectify/1 takes an array of string values as inputs, converts
# numeric values to numbers, and packages the results into an object
# with keys specified by the "headers" array

csv2json='
def objectify(headers):
def tonumberq: .;
  . as $in
  | reduce range(0; headers|length) as $i ({}; .[headers[$i]] = ($in[$i] | tonumberq) );

def csv2table:
  def trim: .;
  split("\n") | map( split(",") | map(trim) );

def csv2json:
  csv2table
  | .[0] as $headers
  | reduce (.[1:][] | select(length > 0) ) as $row
      ( []; . + [ $row|objectify($headers) ]);

csv2json'

cat ps3dl.csv | dos2unix | \
  jq -R -s \
    -f <(echo "$csv2json") \
  > src/store/ps3all.json