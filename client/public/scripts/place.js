const renderPlace = async () => {
  const requestedSlug = window.location.pathname.split('/').pop()

  let place

  try {
    const response = await fetch(`/api/places/${requestedSlug}`)

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    place = await response.json()
  }
  catch (error) {
    console.error('Failed to load place:', error)
    window.location.href = '/404.html'
    return
  }

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
