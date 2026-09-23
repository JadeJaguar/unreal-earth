const renderPlace = async () => {
  const requestedSlug = window.location.pathname.split('/').pop()

  const response = await fetch('/places')
  const data = await response.json()

  let place

  if (data) {
    place = data.find(place => place.slug === requestedSlug)
  }

  if (place) {
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
  else {
    window.location.href = '/404.html'
  }
}

renderPlace()
