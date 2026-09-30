const mainContent = document.getElementById('main-content')
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const searchMessage = document.getElementById('search-message')

const renderPlaces = async (search = '') => {
  let url = '/api/places'

  if (search) {
    url = `/api/places?search=${encodeURIComponent(search)}`
  }

  let data

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    data = await response.json()
  }
  catch (error) {
    console.error('Failed to load places:', error)
    mainContent.innerHTML = ''
    searchMessage.textContent = ''
    const errorMessage = document.createElement('h2')
    errorMessage.textContent = 'Could not load places right now 😞'
    mainContent.appendChild(errorMessage)
    return
  }

  mainContent.innerHTML = ''
  searchMessage.textContent = ''

  if (data && data.length > 0) {
    if (search) {
      const word = data.length === 1 ? 'place matches' : 'places match'
      searchMessage.textContent = `${data.length} ${word} "${search}"`
    }

    data.map(place => {
      const card = document.createElement('article')
      card.className = 'card'

      const image = document.createElement('img')
      image.src = place.image
      image.alt = place.name

      const info = document.createElement('div')
      info.className = 'card-info'

      const name = document.createElement('h3')
      name.textContent = place.name

      const country = document.createElement('p')
      country.className = 'country'
      country.textContent = place.country

      const tagline = document.createElement('p')
      tagline.className = 'card-tagline'
      tagline.textContent = place.tagline

      const link = document.createElement('a')
      link.textContent = 'Read more'
      link.href = `/places/${place.slug}`
      link.setAttribute('role', 'button')

      info.appendChild(name)
      info.appendChild(country)
      info.appendChild(tagline)
      info.appendChild(link)

      card.appendChild(image)
      card.appendChild(info)

      mainContent.appendChild(card)
    })
  }
  else if (search) {
    searchMessage.textContent = `No places match "${search}". Try a country like Peru, or a type like cave.`
  }
  else {
    const emptyMessage = document.createElement('h2')
    emptyMessage.textContent = 'No places available 😞'
    mainContent.appendChild(emptyMessage)
  }
}

// Search when the user presses Enter or clicks Search
searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  renderPlaces(searchInput.value.trim())
})

// Show all places again when the search box is cleared
searchInput.addEventListener('input', () => {
  if (searchInput.value.trim() === '') {
    renderPlaces()
  }
})

renderPlaces()
