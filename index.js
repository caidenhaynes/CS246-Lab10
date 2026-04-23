/**
Name: Caiden Haynes
Date: 4/23/2026
Description: API that will send you the minimum amount of money you will get from a harvest in stardew valley specifying crop, amount of that crop, and the quality you expect to get.
Bugs: None Known
Reflection (including LLM use): I had a lot of fun with this project. I decided pretty early on that it would be a good idea to make an api that in some way was connected to a game I play, as that would be the best way to ensure novelty, but I was struggling to come up with an idea that I thought would be useful in anyway. I was scrolling through my steam library for ideas, when I thought about doing it for Stardew Valley. When I play stardew I tend to have a spread sheet open and I am constantly doing math about my crop yield and how much crops I can plant. Using this api would help with planning as it would very quickly show me how much money I could plan around after a harvest. There are a lot of other potential features that I could implement, but most of them seem to complex for me to implement so I decided on a simple, but useful, version that I have. I used chatGPT for help fixing a crash that would occur if the crop wasn't in the JS object.
*/

import express from "express";
import { crops, cropAmount } from './crops.js';

const app = express();
const port = process.env.PORT || 3000; // Use Codespaces port

app.get("/", (req, res) => {
  res.send('API tells you the min amount of money you will make from a harvest in Stardew Valley. Specify /harvest?crop=crop&amount=amount&quality=quality');
});

app.get("/harvest", (req, res) => {
  let crop = req.query.crop.toLowerCase();
  let baseValue = crops[crop];
  let lowestNumCrops = 1;
  if (crop in cropAmount) { //checks if the crop produces more than a minimum of 1 crop per harvest
    lowestNumCrops = cropAmount[crop];
  }
  let amount = parseFloat(req.query.amount);
  let quality = req.query.quality.toLowerCase();
  let qualityMultiplyer = 1;
  if (quality == 'silver') { //checks for a silver modifier on crops
    qualityMultiplyer = 1.25;
  } else if (quality == 'gold') { //checks for a gold modifier on crops
    qualityMultiplyer = 1.5;
  } else if (quality == 'iridium' && crop != 'fiber') { //checks for an iridium modifier on crops and that the crop is not fiber as fiber gets no modifier
    qualityMultiplyer = 2;
  }
  if (!baseValue) { //checks if there is a base value
    return res.json({error: 'Invalid crop'}); //no base value means the crop was not found
  }
  baseValue = Math.trunc(baseValue * qualityMultiplyer); //base value of crop is the selling price of normal quality * the multiplier from the quality (truncated)
  let totalGold = baseValue * amount * lowestNumCrops;
  res.json({crop: crop, amount: amount, quality: quality, 'total gold': totalGold});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
