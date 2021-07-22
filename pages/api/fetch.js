function NormalFetch () {
    fetch('https://api.openbrewerydb.org/breweries')
    .then(response => response.json())
    .then(data => console.log(data))
}

export { NormalFetch }