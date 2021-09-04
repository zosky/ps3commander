#!/bin/bash 

[ ! `which xq` ] && pip install xq || echo xq ready
mkdir ps3tdb ; cd ps3tdb

## JSON 
# wget 'https://www.gametdb.com/ps3tdb.txt?LANG=ORIG'
wget https://www.gametdb.com/ps3tdb.zip
unzip ps3tdb.zip  
xq '.[]' ps3tdb.xml > ps3tdbRAW.json
jq '.game | map( { 
    name: .["@name"], 
    id: .id, 
    type: .type, 
    region: .region, 
    languages: .languages, 
    publisher: .publisher, 
    players: .input["@players"],
    date: { 
        y: .date["@year"], 
        m: .date["@month"], 
        d: .date["@day"]
    }
})' ps3tdbRAW.json > ps3tdb.json
mv ps3tdb.json ../src/store/gametdb.json

##### MEDIA
wget 'https://www.gametdb.com/download.php?FTP=GameTDB-ps3_coverM-US-2021-09-01.zip' \
    -O GameTDB-ps3_coverM-US-2021-09-01.zip
unzip GameTDB-ps3_coverM-US-2021-09-01.zip
mkdir -p ../public/images/gametdb/coverM
mv ps3/coverM/US ../public/images/gametdb/coverM/
cd ..
git add public/images/gametdb/coverM/US/*
git commit -m "gametdb images"