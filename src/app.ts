import express from 'express';
import axios from 'axios';
import { OPEN_UV_BASE_URL } from './OpenUv.js';
import * as dotenv from 'dotenv';
dotenv.config();

const DEFAULT_LONGITUDE = -74.5;
const DEFAULT_LATITUDE = 40.5;
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000; // Google Cloud Run uses a .PORT environment variable by default to dynamically assign a port.

app.get('/', (_req, res) => {
  res.sendFile(import.meta.dirname + '/index.html');
  //res.send(`${import.meta.dirname} and ${import.meta.filename}`);
});

app.get('/uv', async (req, res) => {
  const query = req.query;
  const lng = query.lng ? query.lng : DEFAULT_LONGITUDE;
  const lat = query.lat ? query.lat : DEFAULT_LATITUDE;
  const alt = query.alt ? query.alt : 100;
  const results = await axios.get(OPEN_UV_BASE_URL + `/uv?lat=${lat}&lng=${lng}&alt=${alt}`, {
    headers: {
      'x-access-token': process.env.OPEN_UV_AUTH_TOKEN,
    },
  });
  const successCode = new RegExp(/[2]{1}[0-9]{2}/);
  if (successCode.test(results.status.toString())) {
    res.json(results.data);
  } else {
    res.send(`Error ${results.statusText}`);
  }
});

app.get('/uv-forecast', async (_req, res) => {
  const lng = DEFAULT_LONGITUDE;
  const lat = DEFAULT_LATITUDE;
  const alt = 100;

  try {
    const results = await axios.get(OPEN_UV_BASE_URL + `/forecast?lat=${lat}&lng=${lng}&alt=${alt}`, {
      headers: {
        'x-access-token': process.env.OPEN_UV_AUTH_TOKEN,
      },
    });

    const successCode = new RegExp(/[2]{1}[0-9]{2}/);
    if (successCode.test(results.status.toString())) {
      res.json(results.data);
    } else {
      res.send(`Error ${results.statusText}`);
    }
  } catch (err) {
    res.send(`Error ${err}`);
  }
});

app.get('/stat', async (_req, res) => {
  const results = await axios.get(OPEN_UV_BASE_URL + `/stat`, {
    headers: {
      'x-access-token': process.env.OPEN_UV_AUTH_TOKEN,
    },
  });
  const successCode = new RegExp(/[2]{1}[0-9]{2}/);
  if (successCode.test(results.status.toString())) {
    res.json(results.data);
  } else {
    res.send(`Error ${results.statusText}`);
  }
});

app.get('/now', async (_req, res) => {
  res.send(new Date().toISOString());
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
