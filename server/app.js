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

  const { StationCode, NumMins } = req.query;
  // http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=mhide&NumMins=20
  const stringUrl = `http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=${StationCode}&NumMins=${NumMins}`;
  http.get(stringUrl, (response) => {
     if (response.statusCode >= 200 && response.statusCode < 400) {
       response.on('data', (data_) => { data += data_.toString(); });
       response.on('end', () => {
         parser.parseString(data, (err, result) => {
           console.log('Result: ', result.ArrayOfObjStationData, result.ArrayOfObjStationData.objStationData);
           if (result.ArrayOfObjStationData && result.ArrayOfObjStationData.objStationData) {
             res.json(result.ArrayOfObjStationData.objStationData);
           }
           res.json([]);
         });
       });
     }
  })
})
app.get('/', (req, res) => {
  res.send('Hitting something')
})
module.exports = app;
