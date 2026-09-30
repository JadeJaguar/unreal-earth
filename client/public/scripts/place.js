const placeContent = document.getElementById('place-content')

const showMessage = (heading, text) => {
  placeContent.innerHTML = ''
  placeContent.className = 'container not-found'

  const headingEl = document.createElement('h1')
  headingEl.textContent = heading

  const textEl = document.createElement('p')
  textEl.textContent = text

  const link = document.createElement('a')
  link.href = '/'
  link.setAttribute('role', 'button')
  link.textContent = 'See all places'

  placeContent.appendChild(headingEl)
  placeContent.appendChild(textEl)
  placeContent.appendChild(link)
}

const renderPlace = async () => {
  const requestedSlug = window.location.pathname.split('/').pop()

  let response

  try {
    response = await fetch(`/api/places/${requestedSlug}`)
  }
  catch (error) {
    console.error('Failed to load place:', error)
    showMessage('Could not load this place', 'Something went wrong reaching the server. Please try refreshing the page.')
    return
  }

  if (response.status === 404) {
    // Keep the URL as-is (no navigation) so refreshing or sharing it still
    // re-checks with the server instead of silently pointing at /404.html
    showMessage('404', 'This place is not on our map. Check the address, or go back to the list.')
    return
  }

  if (!response.ok) {
    console.error(`Request failed with status ${response.status}`)
    showMessage('Could not load this place', 'Something went wrong reaching the server. Please try refreshing the page.')
    return
  }

  const place = await response.json()

  document.getElementById('image').src = place.image
  document.getElementById('image').alt = place.name
  document.getElementById('name').textContent = place.name
  document.getElementById('tagline').textContent = place.tagline
  document.getElementById('country').textContent = place.country
  document.getElementById('type').textContent = place.type
  document.getElementById('bestTime').textContent = place.bestTime
  document.getElementById('description').textContent = place.description
  document.getElementById('funFact').textContent = place.funFact
  document.title = `${place.name} | Unreal Earth`
}

renderPlace()
