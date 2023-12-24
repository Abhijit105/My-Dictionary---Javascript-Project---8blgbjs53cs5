const searchBtnEl2 = document.querySelector('.search-btn')
const wordMeaningContainer = document.getElementById('word-meaning-container')

let wordMeanings = JSON.parse(localStorage.getItem('word-meanings')) || []

const renderCard = function (word, meanings) {
  const cardEl = document.createElement('article')
  cardEl.setAttribute('class', 'card')
  console.log('a', word, meanings)
  cardEl.innerHTML = `
  <h3 class="card-word">${word}</h3>
  <p class="card-meanings">#${meanings
    .map(meaning => meaning.definition)
    .join('<br />#')}</p>
    <img src="./img/dustbin.png" alt="delete item" width="40" class="card-delete-btn" id="btn-${word}" data-word=${word} />
    `
  // <button class="card-delete-btn" id="btn-${word}">Delete</button>
  wordMeaningContainer.appendChild(cardEl)

  document.getElementById(`btn-${word}`).addEventListener('click', () => {
    wordMeanings = wordMeanings.filter(wordMeaning => wordMeaning.word !== word)
    localStorage.setItem('word-meanings', JSON.stringify(wordMeanings))
    wordMeanings = JSON.parse(localStorage.getItem('word-meanings'))
    renderCards()
  })
}

const renderCards = function () {
  wordMeaningContainer.innerHTML = ''
  wordMeanings.forEach(wordMeaning => {
    const word = wordMeaning.word
    const meanings = wordMeaning.meanings[0].definitions.slice(0, 4)
    console.log(word, meanings)
    renderCard(word, meanings)
  })
}

renderCards()

searchBtnEl2.addEventListener('click', () => {
  window.open('./', '_self')
})
