// Banco de dados
const database1 = []
const database2 = []
const getDatabase1 = () => JSON.parse(localStorage.getItem('card1')) ?? [];
const setDatabase1 = (database1) => localStorage.setItem('card1', JSON.stringify(database1));
const getDatabase2 = () => JSON.parse(localStorage.getItem('card2')) ?? [];
const setDatabase2 = (database2) => localStorage.setItem('card2', JSON.stringify(database2));

// Gerar cards
const generateItem1 = (img, url, index) => {
    const item1 = document.createElement('li')
    item1.classList.add('item1_item')
    item1.innerHTML = `
        <img src="${img}">
        <button class="item1_btn" data-index=${index}><a target="_blank" data-index=${index} href="${url}">Ver</a></button>
        <input class="delete_btn" name="removeItem1" type="button" value="X" title="Deletar" data-index=${index}>`
    document.querySelector('section.cards ul#item1Card').appendChild(item1);
}
const generateItem2 = (img, url, index) => {
    const item2 = document.createElement('li')
    item2.classList.add('item2_item')
    item2.innerHTML = `
        <img src="${img}">
        <button class="item2_btn" data-index=${index}><a target="_blank" data-index=${index} href="${url}">Ver</a></button>
        <input class="delete_btn" name="removeItem2" type="button" value="X" title="Deletar" data-index=${index}>`
    document.querySelector('section.cards ul#item2Card').appendChild(item2);
}
// Faz com que os itens não sejam repetidos/duplicados
const cleanCards = () => {
    const card1 = document.querySelector('section.cards ul#item1Card');
    const card2 = document.querySelector('section.cards ul#item2Card');

    while (card1.firstChild) {
        card1.removeChild(card1.lastChild);
    }
    while (card2.firstChild) {
        card2.removeChild(card2.lastChild);
    }
}
// "Atualiza" a tela
const refreshScreen = () => {
    cleanCards()

    // Conexao com banco de dados
    const database1 = getDatabase1();
    const database2 = getDatabase2();

    // Coloca no HTML o conteúdo do banco de dados
    database1.forEach((item1, index) => generateItem1(item1.img, item1.url, index))
    database2.forEach((item2, index) => generateItem2(item2.img, item2.url, index))
}
const addItem = (event) => {
    const option1 = document.querySelector('div.card_add div.typeChoice input#item1').checked;
    const option2 = document.querySelector('div.card_add div.typeChoice input#item2').checked;
    const url = document.querySelector('div.card_add input#itemSiteUrl').value;
    const imgURL = document.querySelector('div.card_add input#cardImgUrl').value;
    const element = event.target;

    if (imgURL === "" || url === "" && option1) {
        alert('As URLs precisam ser definidas')
        return
    }
    else if (imgURL === "" || url === "" && option2) {
        alert('As URLs precisam ser definidas')
        return
    }
    // Adicionar item 1
    else if (element.value === 'Add' && option1) {
        const database1 = getDatabase1();
        database1.push({'img': imgURL, 'url': url})
        setDatabase1(database1);
        refreshScreen()
        document.querySelector('div.card_add input#itemSiteUrl').value = ""
        document.querySelector('div.card_add input#cardImgUrl').value = ""
    } 
    // Adicionar item 2
    else if (element.value === 'Add' && option2) {
        const database2 = getDatabase2();
        database2.push({'img': imgURL, 'url': url})
        setDatabase2(database2);
        refreshScreen()
        document.querySelector('div.card_add input#itemSiteUrl').value = ""
        document.querySelector('div.card_add input#cardImgUrl').value = ""
    }
}
const removeItem = (event) => {
    const element = event.target;
    const index =  element.dataset.index;

    // Remover item 1
    if (element.name === 'removeItem1') {
        const database1 = getDatabase1();
        database1.splice(index, 1)
        setDatabase1(database1);
        refreshScreen()
    }
    // Remover item 2
    else if (element.name === 'removeItem2') {
        const database2 = getDatabase2();
        database2.splice(index, 1)
        setDatabase2(database2);
        refreshScreen()
    }
}
// Ouvidor de eventos click para as funções de adicionar e apagar itens.
document.querySelector('div.card_add input.addcard_btn').addEventListener('click', addItem)
document.querySelector('section.cards ul#item1Card').addEventListener('click', removeItem)
document.querySelector('section.cards ul#item2Card').addEventListener('click', removeItem)
refreshScreen()