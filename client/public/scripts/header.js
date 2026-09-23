const header = document.querySelector('header')

const headerContainer = document.createElement('nav')
headerContainer.className = 'container header-container'

const headerLeft = document.createElement('ul')
const titleItem = document.createElement('li')
const title = document.createElement('a')
title.href = '/'
title.className = 'site-title'
title.textContent = 'Unreal Earth'
titleItem.appendChild(title)
headerLeft.appendChild(titleItem)

const headerRight = document.createElement('ul')
const buttonItem = document.createElement('li')
const headerButton = document.createElement('button')
headerButton.textContent = 'Home'
headerButton.className = 'outline'

headerButton.addEventListener('click', function handleClick(event) {
  window.location = '/'
})

buttonItem.appendChild(headerButton)
headerRight.appendChild(buttonItem)

headerContainer.appendChild(headerLeft)
headerContainer.appendChild(headerRight)

header.appendChild(headerContainer)
