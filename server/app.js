const express = require('express');
const cors = require('cors');
const http = require('http');
const xml2js = require('xml2js');
const path = require('path');
const parser = new xml2js.Parser({explicitArray : false});

const distFile = path.join(__dirname, '../dist/');
const app = express();
app.use(cors());
app.use(express.static(distFile));

app.get('/json/getallstations', (req, res) => {
  let data = '';
  http.get('http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML', (response) => {
     if (response.statusCode >= 200 && response.statusCode < 400) {
       response.on('data', (data_) => { data += data_.toString(); });
       response.on('end', () => {
         parser.parseString(data, (err, result) => {
           return res.json(result.ArrayOfObjStation.objStation.sort((a,b) => a.StationDesc.localeCompare(b.StationDesc)));
         });
       });
     }
   })
})
app.get('/json/stationtraffic', (req, res) => {
  let data = '';
  const { StationCode, NumMins } = req.query;
  const stringUrl = `http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=${StationCode}&NumMins=${NumMins}`;
  http.get(stringUrl, (response) => {
     if (response.statusCode >= 200 && response.statusCode < 400) {
       response.on('data', (data_) => { data += data_.toString(); });
       response.on('end', () => {
         parser.parseString(data, (err, result) => {
           if (result.ArrayOfObjStationData && result.ArrayOfObjStationData.objStationData) {
             return res.json(result.ArrayOfObjStationData.objStationData);
           }
           return res.json([]);
         });
       });
     }
  })
})
app.get('/', (req, res) => {
  res.sendFile(distFile);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    message: err.message,
    error: {},
    title: 'error',
  });
});
module.exports = app;
