const dotenv = require('dotenv').config();
const eBirdKey = process.env.EBIRD_API_KEY;

console.log(eBirdKey);

const latitude = 42.98774;
const longitude = -81.24036;

const eBirdApiUrl = 'https://api.ebird.org/v2/data/obs/geo/recent?'

const url = `${eBirdApiUrl}key=${eBirdKey}&lat=${latitude}&long=${longitude}`

let results = fetch(url)
results.then(results => console.log(results));
