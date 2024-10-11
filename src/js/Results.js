export default class Results{
    constructor(onResultClick){
        this.html = document.querySelector('.results');
        this.onResultClick = onResultClick;
    }

    setResults(results){
        this.html.innerHTML = '';
    
        results.forEach(result => {
            const li = document.createElement('li');
            const button = document.createElement('button');

            button.textContent = result.name;
            button.onclick = () => {this.onResultClick(result.url)}

            li.appendChild(button);
            this.html.appendChild(li);
        });
    }
}