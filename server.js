const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 80;

app.use(express.static('web'));

app.get('/getObservation/:lat/:long/:radius', (req, res) => {
    const lat = req.params.lat;
    const long = req.params.long;
    const radius = req.params.radius;
    const eBirdResults = fetchEbirdData(lat, long, radius);    
    const iNatResults = fetchInatData(lat, long, radius);
    
    Promise.all([eBirdResults, iNatResults]).then(values => {
        const eBirdData = values[0].map(eBirdObsFormat);
        const iNatData = values[1]['results'].map(iNatObsFormat);
        const allData = {eBird: eBirdData, iNat: iNatData}
        res.send(allData);
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});

const fetchEbirdData = async (lat, long, radius) => {

    const eBirdKey = process.env.EBIRD_API_KEY;       
    const eBirdApiUrl = 'https://api.ebird.org/v2/data/obs/geo/recent?'

    let result = await fetch(`${eBirdApiUrl}key=${eBirdKey}&lat=${lat}&lng=${long}&dist=${radius}`);
    return await result.json();
};

const eBirdObsFormat = (data) => {
    let result = {
        source: 'eBird',
        species: data.comName,
        count: data.howMany,
        location: data.locName,
        date: data.obsDt,
        link: "https://ebird.org/checklist/" + data.subId,
    }
    return result;
}

const fetchInatData = async (lat, long, radius) => {

    const iNatApiUrl = 'https://api.inaturalist.org/v1/observations?';
    let result = await fetch(`${iNatApiUrl}lat=${lat}&lng=${long}&radius=${radius}&order=desc&order_by=created_at`);
    return await result.json();
};

const iNatObsFormat = (data) => {
    return {
        source: 'iNaturalist',
        species: data.taxon?.preferred_common_name ?? data.taxon?.name ?? data.species_guess ?? "unknown",
        location: data.place_guess,
        date: data.observed_on,
        link: data.uri,
    }
}

