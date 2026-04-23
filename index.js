/**
Name:
Date:
Description:
Bugs:
Reflection (including LLM use):
*/

import express from "express";
import crops from './crops.js';
import cropAmount from './crops.js';

const app = express();
const port = process.env.PORT || 3000; // Use Codespaces port

app.get("/", (req, res) => {
  res.send('Specify /add?x=val1&y=val2, /subtract?x=val1&y=val2, etc.');
});

app.get("/harvest", (req, res) => {
  //let sum = parseFloat(req.query.x) + parseFloat(req.query.y);
  //res.json({sum: sum, x: req.query.x, y: req.query.y});
  let crop = req.query.crop;
  let baseValue = crops[crop.toLowerCase()];
  let lowestNumCrops = 1;
  if (crops.toLowerCase() in cropAmount) {
    lowestNumCrops = cropAmount[crops.toLowerCase()];
  }
  let amount = parseFloat(req.query.amount);
  let quality = req.query.quality;
  let qualityMultiplyer = 1;
  if (quality.toLowerCase() == 'silver') {
    qualityMultiplyer = 1.25;
  } else if (quality.toLowerCase() == 'gold') {
    qualityMultiplyer = 1.5;
  } else if (quality.toLowerCase() == 'iridium') {
    qualityMultiplyer = 2;
  }
  baseValue = Math.trunc(baseValue * qualityMultiplyer);
  let totalGold = baseValue * amount * lowestNumCrops;
  res.json({crop: crop, amount: amount, quality: quality, 'total gold': totalGold});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
