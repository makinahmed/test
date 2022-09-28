const express = require("express");
const axios = require("axios").default;
const { google } = require("googleapis");
require("dotenv").config();
const app = express();
const port = 8080;
const apikey = process.env.apikey;
const baseurl = process.env.baseurl;
const youtube = google.youtube({
  version: "v3",
  auth: apikey,
});
app.get("/", async (req, res) => {
  res.send("Gopone j besissar vat khay!");
});

app.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.search_query;
    const url = `${baseurl}/search?key=${apikey}&type=video&part=snippet&q=${searchQuery}`;
    const response = await axios.get(url);
    res.send(response.data.items);
  } catch (e) {
    next(e);
  }
});

/// google apis

app.get("/search-with-google-apis", async (req, res) => {
  try {
    const searchQuery = req.query.search_query;
    const response = await youtube.search.list({
      part: "snippet",
      q: searchQuery,
      type: "video",
    });
    res.send(response);
  } catch (e) {
    next(e);
  }
});

app.listen(port, () => {
  console.log("App is running on: ", port);
});
