let main = document.querySelector('main');
let playDiv = document.querySelector('#playDiv');
let playBtn = document.querySelector('#playBtn')
let form = document.querySelector('form');

let grid = myElementFunction('div', 'grid', 'd-flex flex-wrap');
main.append(grid);

// Clicco Play
form.addEventListener('submit', function(invioForm) {
    invioForm.preventDefault();
    // cancello il grid precedente
    grid.innerHTML = '';
    // rendo il grid di nuovo cliccabile dopo una sconfitta precedente
    grid.classList.remove('unclickable');

    let difficultyInput = document.querySelector('#difficultyInput').value;
    console.log(difficultyInput)

    if (difficultyInput == 'easy') {
        createGrid(100, difficultyInput);
    }
    else if (difficultyInput == 'medium') {
        createGrid(81, difficultyInput);
    }
    else {
        createGrid(49, difficultyInput);
    }; 

    playBtn.innerHTML = 'try again'

    // quando clicco su una bomba
    let bombs = document.querySelectorAll('.bomb');
    console.log(bombs)
    for (let i = 0; i < bombs.length; i++) {
        bombs[i].addEventListener('click', function() {
            console.log('Hai cliccato su una bomba!');
            let loseTitle = myElementFunction('h2','loseTitle','text-center');
            loseTitle.innerHTML = 'Hai cliccato su una BOMBA, hai perso!!';
            grid.append(loseTitle);
            grid.classList.add('unclickable');
            });
    };
    // bombs.forEach(bomb => {
    //     bomb.addEventListener('click', () => {
    //     console.log('Hai cliccato su una bomba!');
    //     let loseTitle = myElementFunction('h2','loseTitle','text-center')
    //     loseTitle.innerHTML = 'Hai cliccato su una BOMBA, hai perso!!'
    //     grid.append(loseTitle);
    //     grid.classList.add('unclickable');
    //     });
    // });
});



/* --- MY FUNCTIONS --- */

function randomNumber(min, max) {
    return Math.floor( Math.random() * (max - min + 1) + min );        
};

function shuffleFunction(array) {
    return array.sort(() => Math.random() - 0.5);
};


// -- Funzione per creare elementi html e assegnare loro id e classe
function myElementFunction(tagHtml, idElemento, classiElemento) {
    nomeElemento = document.createElement(tagHtml);
    nomeElemento.id = idElemento;
    nomeElemento.className = classiElemento;
    
    return nomeElemento;
};


// -- Funzione per creare le griglie
// il parametro difficulty corrisponde alla stringa 'easy','medium' o 'hard', serve ad associare la classe e le corrispondenti caratteristiche css.
function createGrid(numberBoxes, difficulty) {
    // Ciclo per creare x caselle e un array con x numeri
    let numbersList = [];

    for (let i = 0; i < numberBoxes; i++) {

        grid.innerHTML += 
        `
        <div class="box box-${difficulty} box-${i+1} d-flex align-items-center justify-content-center">
        
        </div>
        `;

        // array x
        numbersList.push(i + 1);
    }
    let boxArray = document.querySelectorAll('.box');
    // console.log(boxArray);
    console.log(numbersList)

    // creo una lista di numeri da 1 a x ordinati casualmente, e li inserisco nei box 
    let randomNumbersList = shuffleFunction(numbersList);
    console.log(randomNumbersList);

    for (let i = 0; i < randomNumbersList.length; i++) {

        // togliere questo "if" per vedere solo i numeri e non assegnare nessuna x
        if (randomNumbersList[i] >= randomNumbersList.length - 15) {
            boxArray[i].classList.add('bomb');
            boxArray[i].innerHTML = `<i class="fa-solid fa-land-mine-on fa-bounce"></i>`;
        } else {
            // boxArray[i].innerHTML = `${randomNumbersList[i]}`;
            boxArray[i].innerHTML = `<i class="fa-solid fa-leaf"></i>`;
        }

        boxArray[i].addEventListener('click', function() {
            this.classList.add('box-clicked');
        })
    };
}



// necessario per inizializzare i tooltip Bootstrap
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))