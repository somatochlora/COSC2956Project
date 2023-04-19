let fetchData = async () => {

    const lat = 42.417526
    const long = -81.769907
    const radius = 20;

    let response = await fetch(`http://localhost/getObservation/${lat}/${long}/${radius}`);
    let data = await response.json();
    return data;
}

let formatObservation = (data) => {
    let container = document.createElement('div');
    container.classList.add('observation');
    let species = document.createElement('p');
    species.classList.add('species');
    species.innerHTML = data.species + (data.count ? ` (${data.count})` : '');
    let location = document.createElement('p');
    location.classList.add('location');
    location.innerHTML = data.location;
    let date = document.createElement('p');
    date.classList.add('date');
    date.innerHTML = data.date;
    let link = document.createElement('a');
    link.classList.add('link');
    link.href = data.link;
    link.innerHTML = 'View on source site';
    let topRow = document.createElement('div');
    topRow.classList.add('observation-row');
    topRow.appendChild(species);
    topRow.appendChild(location);
    let bottomRow = document.createElement('div');
    bottomRow.classList.add('observation-row');
    bottomRow.appendChild(date);
    bottomRow.appendChild(link);
    container.appendChild(topRow);
    container.appendChild(bottomRow);
    return container;
};

let formatObservationList = (data) => {
    let container = document.createElement('ul');
    container.classList.add('observation-list');
    data.forEach((observation) => {
        let listEle = document.createElement('li');
        listEle.appendChild(formatObservation(observation));
        container.appendChild(listEle);
    });
    return container;
};


let data = fetchData();

data.then((response) => {
    document.querySelector('#ebird').appendChild(formatObservationList(response.eBird));
    document.querySelector('#inaturalist').appendChild(formatObservationList(response.iNat));
});