import "../css/style.css"
import Details from "./Details";
import Pager from "./Pager";
import Results from "./Results";

const apiUrl = 'https://pokeapi.co/api/v2/pokemon';

fetch(apiUrl)
.then(response => response.json())
.then(data => {
    const details = new Details();
    const results = new Results((url) => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            //Convert any required data to html next line;
            details.setContent(`<h2>${data.name}</h2>`);
            details.show();
        })
    });

    new Pager(apiUrl, 20, data.count, (url) => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            results.setResults(data.results);
        })
    });

    results.setResults(data.results);
});


