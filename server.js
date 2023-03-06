const dotenv = require('dotenv').config();

const latitude = 42.98774;
const longitude = -81.24036; 
const radiusKm = 20;

const fetchEbirdData = async (lat, long, radius) => {

    const eBirdKey = process.env.EBIRD_API_KEY;       
    const eBirdApiUrl = 'https://api.ebird.org/v2/data/obs/geo/recent?'

    let result = await fetch(`${eBirdApiUrl}key=${eBirdKey}&lat=${lat}&lng=${long}&dist=${radius}`);
    return await result.json();
};

//fetchEbirdData(latitude, longitude, radiusKm).then(data => console.log(data));

const fetchInatData = async (lat, long, radius) => {

    const iNatApiUrl = 'https://api.inaturalist.org/v1/observations?';
    let result = await fetch(`${iNatApiUrl}lat=${lat}&lng=${long}&radius=${radius}&order=desc&order_by=created_at`);
    return await result.json();
};

//fetchInatData(latitude, longitude, radiusKm).then(data => console.log(data));