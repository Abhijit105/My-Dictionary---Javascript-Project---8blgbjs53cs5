const wordInputEl = document.getElementById('word')
const searchBtnEl = document.getElementById('search-btn')
const wordMeaningContainer = document.getElementById('word-meaning-container')
const historyBtnEl = document.querySelector('.history-btn')

let wordMeanings = JSON.parse(localStorage.getItem('word-meanings')) || []

const getWordMeaning = async wordToSearch => {
  try {
    wordMeaningContainer.innerText = 'Getting your word'
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSearch}`
    )
    console.log(response)
    if (!response.ok)
      throw new Error('Something went wrong while fetching you word')
    const data = await response.json()
    console.log(data)
    wordMeaningContainer.innerText = ''
    return data[0]
  } catch (err) {
    console.error(err.message)
  }
}

const renderCard = function (word, meanings) {
  const cardEl = document.createElement('article')
  cardEl.setAttribute('class', 'card')
  cardEl.innerHTML = `
  <h3 class="card-word">${word}</h3>
  <p class="card-meanings">#${meanings
    .map(meaning => meaning.definition)
    .join('<br />#')}</p>
  <img src="./img/dustbin.png" alt="delete item" width="40" id="card-delete-btn" />
  `
  wordMeaningContainer.appendChild(cardEl)
}

searchBtnEl.addEventListener('click', async () => {
  const word = wordInputEl.value
  if (!word) return
  const wordMeaning = await getWordMeaning(word)
  console.log(wordMeaning)
  const meanings = wordMeaning.meanings[0].definitions.slice(0, 4)
  renderCard(word, meanings)
  if (!wordMeanings.map(el => el.word).includes(wordMeaning.word))
    wordMeanings.push(wordMeaning)
  localStorage.setItem('word-meanings', JSON.stringify(wordMeanings))
})

historyBtnEl.addEventListener('click', () => {
  window.open('/history.html', '_self')
})
