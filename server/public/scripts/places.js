const renderPlaces = async () => {
  const response = await fetch('/places')
  const data = await response.json()

  const mainContent = document.getElementById('main-content')

  if (data && data.length > 0) {
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
  else {
    const emptyMessage = document.createElement('h2')
    emptyMessage.textContent = 'No places available 😞'
    mainContent.appendChild(emptyMessage)
  }
}

const requestedURL = window.location.pathname

if (requestedURL !== '/' && requestedURL !== '/index.html') {
  window.location.href = '/404.html'
}
else {
  renderPlaces()
}
