let attendees = require('../data/attendees.json')

const container = document.querySelector('.content')

attendees.forEach(attendee => {
  const attendeeDiv = document.createElement('div')
  attendeeDiv.className = 'attendee'

  const name = document.createElement('h2')
  name.className = 'attendee-name'
  name.textContent = attendee.name

  const homeOffice = document.createElement('p')
  homeOffice.className = 'attendee-home-office'
  homeOffice.textContent = attendee.homeOffice

  const photo = document.createElement('img')
  photo.className = 'attendee-photo'
  photo.setAttribute('src', attendee.photoURL)

  const quote = document.createElement('h1')
  quote.className = 'attendee-quote'
  quote.textContent = attendee.quote

  attendeeDiv.appendChild(quote)
  attendeeDiv.appendChild(photo)
  attendeeDiv.appendChild(name)
  attendeeDiv.appendChild(homeOffice)

  container.appendChild(attendeeDiv)
})
