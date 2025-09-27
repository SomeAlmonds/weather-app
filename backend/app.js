import express from "express";
import { api } from "./apiInfo.js";

const { apiURL, apiKey } = api;

const app = express();

app.listen(3000);

// handle search suggestions
app.get("/search", async (req, res) => {
  const input = req.query.input;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

  try {
    let searchResp = await fetch(
      `${apiURL}/search.json?key=${apiKey}&q=${input}`
    );

    if (!searchResp.ok) {
      throw new Error(searchResp);
    }
    searchResp = await searchResp.json();
    res.send(searchResp);
  } catch (error) {
    res.status(500).send(error);
  }
});

// handle weather forecast rendering
app.get("/forecast", async (req, res) => {
  const city = req.query.city;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

  try {
    let forecastResp = await fetch(
      `${apiURL}/forecast.json?key=${apiKey}&q=${city}&days=3`
    );
    if (!forecastResp.ok) {
      throw new Error(`Somthing went wrong ERROR: ${forecastResp.status}`);
    }
    forecastResp = await forecastResp.json();
    res.send(forecastResp);
  } catch (error) {
    res.status(500).send(error);
  }
});
