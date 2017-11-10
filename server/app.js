const express = require('express');
const cors = require('cors');
const http = require('http');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({explicitArray : false});

const app = express();
app.use(cors());

app.get('/getallstations', (req, res) => {
  let data = '';
  http.get('http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML', (response) => {
     if (response.statusCode >= 200 && response.statusCode < 400) {
       response.on('data', (data_) => { data += data_.toString(); });
       response.on('end', () => {
         parser.parseString(data, (err, result) => {
           res.json(result.ArrayOfObjStation.objStation);
         });
       });
     }
   })
})
app.get('/stationtraffic', (req, res) => {
  let data = '';
  // http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=mhide&NumMins=20
  http.get('http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=mhide&NumMins=20', (response) => {
     if (response.statusCode >= 200 && response.statusCode < 400) {
       response.on('data', (data_) => { data += data_.toString(); });
       response.on('end', () => {
         parser.parseString(data, (err, result) => {
           res.json(result.ArrayOfObjStationData.objStationData);
         });
       });
     }
  })
})
app.get('/', (req, res) => {
  res.send('Hitting something')
})
module.exports = app;
