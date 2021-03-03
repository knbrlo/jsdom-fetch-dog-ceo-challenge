console.log('%c HI', 'color: firebrick')

// Challenge 1
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

window.addEventListener("load", function() {
    fetchImages();
    fetchBreeds();
    addAllOptionToSelect();
    udpateSelectWithNewValues();
    setupToWatchSelectChanges();
});

function fetchImages() {
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => renderImages(json))
}

function renderImages(images) {
    let dogImageContainer = document.getElementById('dog-image-container');
    for (let t = 0; t < images.message.length; t++) {
        let newImageElement = document.createElement('img');
        newImageElement.src = images.message[t];
        newImageElement.style.width = '100px';
        newImageElement.style.height = '100px';
        dogImageContainer.appendChild(newImageElement);
    }
}

// Challenge 2
const breedUrl = 'https://dog.ceo/api/breeds/list/all' 
let arrayAllBreeds = [];
let arrayFilteredBreeds = [];

function fetchBreeds() {
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => renderBreeds(json))
}

function renderBreeds(breeds) {
    let dogBreedsUL = document.getElementById('dog-breeds');
    for (const key in breeds.message) {
        let breedArray = breeds.message[key];
        if (breedArray.length > 0) { 
            for (let t = 0; t < breedArray.length; t++) {
                let individualBreed = breedArray[t];
                let fullBreed = `${key}` + " - " +  `${individualBreed}`;

                // don't add duplicate values
                if (!arrayAllBreeds.includes(fullBreed)) {
                    arrayAllBreeds.push(fullBreed);
                }
            }
        }
    }

    // sort them all alphabetically then add them
    arrayAllBreeds.sort();
    for (const breed of arrayAllBreeds) {
        let newElement = document.createElement('li');
        newElement.innerText = breed;
        dogBreedsUL.appendChild(newElement);
    }

    setupListItemClickEventListeners();
}


// Challenge 3
var arrayTextColors = ['red', 'green', 'blue', 'brown', 'grey', 'purple'];

function setupListItemClickEventListeners() {
    let allLIItems = document.querySelectorAll('li');
    for (let y = 0; y < allLIItems.length; y++) {
        allLIItems[y].addEventListener('click', function() {
            allLIItems[y].style.color = arrayTextColors[Math.floor(Math.random() * arrayTextColors.length)];
        })
    }
}


// Challenge 4
const alphabet = ["E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

function addAllOptionToSelect() {
    let selectElement = document.getElementById('breed-dropdown');
    var newOption = document.createElement('option');
    newOption.value = "all";
    newOption.innerHTML = "all";
    newOption.selected = "selected";
    selectElement.options.add(newOption, selectElement.options[0]);
}


function udpateSelectWithNewValues() {
    let selectElement = document.getElementById('breed-dropdown');
    for (const char of alphabet) {
        var newOption = document.createElement('option');
        newOption.value = char.toLowerCase();
        newOption.innerHTML = char.toLowerCase();
        selectElement.appendChild(newOption);
    }
}

function setupToWatchSelectChanges() {
    document.getElementsByTagName('select')[0].onchange = function() {
        arrayFilteredBreeds = [];
        var index = this.selectedIndex;
        var inputText = this.children[index].innerHTML.trim();
        handleNewBreedSelection(inputText);
    }
}

function handleNewBreedSelection(selectionItem) {
    if (selectionItem == "all") {
        reRenderBreedsFromSelection(arrayAllBreeds);
    } else {
        for (const breed of arrayAllBreeds) {
            let firstChar = breed.charAt(0);
            if (firstChar == selectionItem) {
                arrayFilteredBreeds.push(breed);
            }
        }
        reRenderBreedsFromSelection(arrayFilteredBreeds);
    }
}

function reRenderBreedsFromSelection(withArray) {
    let dogBreedsUL = document.getElementById('dog-breeds');
    dogBreedsUL.innerHTML = "";
    for (const breed of withArray) {
        let newElement = document.createElement('li');
        newElement.innerText = breed;
        dogBreedsUL.appendChild(newElement);
    }
}