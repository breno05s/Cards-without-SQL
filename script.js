const gameDatabase = []
const modDatabase = []
const getGameDatabase = () => JSON.parse(localStorage.getItem('gameCard')) ?? [];
const setGameDatabase = (gameDatabase) => localStorage.setItem('gameCard', JSON.stringify(gameDatabase));
const getModDatabase = () => JSON.parse(localStorage.getItem('modCard')) ?? [];
const setModDatabase = (modDatabase) => localStorage.setItem('modCard', JSON.stringify(modDatabase));

const generateGameItem = (img, url, index) => {
    const gameItem = document.createElement('li')
    gameItem.classList.add('game_item')
    gameItem.innerHTML = `
        <img src="${img}">
        <button class="game_btn" data-index=${index}><a target="_blank" data-index=${index} href="${url}">Ver</a></button>
        <input class="delete_btn" name="removeGameItem" type="button" value="X" title="Deletar" data-index=${index}>`
    document.querySelector('section.cards ul.game_card').appendChild(gameItem);
}
const generateModItem = (img, url, index) => {
    const modItem = document.createElement('li')
    modItem.classList.add('mod_item')
    modItem.innerHTML = `
        <img src="${img}">
        <button class="mod_btn" data-index=${index}><a target="_blank" data-index=${index} href="${url}">Ver</a></button>
        <input class="delete_btn" name="removeModItem" type="button" value="X" title="Deletar" data-index=${index}>`
    document.querySelector('section.cards ul.mod_card').appendChild(modItem);
}
const cleanCards = () => {
    const gameCard = document.querySelector('section.cards ul.game_card');
    const modCard = document.querySelector('section.cards ul.mod_card');

    while (gameCard.firstChild) {
        gameCard.removeChild(gameCard.lastChild);
    }
    while (modCard.firstChild) {
        modCard.removeChild(modCard.lastChild);
    }
}
const refreshScreen = () => {
    cleanCards()
    const gameDatabase = getGameDatabase();
    const modDatabase = getModDatabase();
    gameDatabase.forEach((gameItem, index) => generateGameItem(gameItem.img, gameItem.url, index))
    modDatabase.forEach((modItem, index) => generateModItem(modItem.img, modItem.url, index))
}
const addItem = (event) => {
    const gameOption = document.querySelector('div.card_add div.typeChoice input#game').checked;
    const modOption = document.querySelector('div.card_add div.typeChoice input#mod').checked;
    const url = document.querySelector('div.card_add input#itemSiteUrl').value;
    const imgURL = document.querySelector('div.card_add input#cardImgUrl').value;
    const element = event.target;

    if (imgURL === "" || url === "" && gameOption) {
        alert('As URLs precisam ser definidas')
        return
    }
    else if (imgURL === "" || url === "" && modOption) {
        alert('As URLs precisam ser definidas')
        return
    }
    else if (element.value === 'Adicionar' && gameOption) {
        const gameDatabase = getGameDatabase();
        gameDatabase.push({'img': imgURL, 'url': url})
        setGameDatabase(gameDatabase);
        refreshScreen()
        document.querySelector('div.card_add input#itemSiteUrl').value = ""
        document.querySelector('div.card_add input#cardImgUrl').value = ""
    } 
    else if (element.value === 'Adicionar' && modOption) {
        const modDatabase = getModDatabase();
        modDatabase.push({'img': imgURL, 'url': url})
        setModDatabase(modDatabase);
        refreshScreen()
        document.querySelector('div.card_add input#itemSiteUrl').value = ""
        document.querySelector('div.card_add input#cardImgUrl').value = ""
    }
}
const removeItem = (event) => {
    const element = event.target;
    const index =  element.dataset.index;

    if (element.name === 'removeGameItem') {
        const gameDatabase = getGameDatabase();
        gameDatabase.splice(index, 1)
        setGameDatabase(gameDatabase);
        refreshScreen()
    }
    else if (element.name === 'removeModItem') {
        const modDatabase = getModDatabase();
        modDatabase.splice(index, 1)
        setModDatabase(modDatabase);
        refreshScreen()
    }
}
document.querySelector('div.card_add input.addcard_btn').addEventListener('click', addItem)
document.querySelector('section.cards ul#gameCard').addEventListener('click', removeItem)
document.querySelector('section.cards ul#modCard').addEventListener('click', removeItem)
refreshScreen()