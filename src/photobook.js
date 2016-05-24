let attendees = require('../data/attendees.json')

const attendeeList = document.createElement('div')
attendeeList.className = 'attendee-list'

attendees.map(attendee => {
  switch (attendee.name) {
    case 'Diana Garcia':
    case 'Pamela Stone':
    case 'Ng Pan-Wei':
    case 'Marzena Sokolowska':
    case 'Vishal Sharma':
    case 'Emily Siow':
    case 'Varun Vinod Arbatti':
    case 'Gabriel Gavasso':
    case 'Ekta Sivasriamphai':
    case 'Steven Ta':
    case 'Tobie Wee':
    case 'Wenshu kwek':
    case 'Daniel Lee':
    case 'KengFei Lee':
    case 'Prasanna Kanagasabai':
    case 'Sri Harsha K.M.':
    case 'Stephanie Siaw':
    case 'Nikhita Elizabeth Cyriac':
    case 'Guo Qiang Gordon Song':
    case 'Michael Wongwaisayawan':
    case 'Jean Zheng':
    case 'Kevin Yeung':
    case 'Mahadeo Naig':
    case 'Riju Kansal':
    case 'Wen Shun Wong':
      const newPhotoURL = '/img/' + attendee.name + '.jpg'
      return Object.assign({}, attendee, { photoURL: newPhotoURL })
    case 'Rosario Arena':
      const newQuote = 'Riding a 🐎 in my farm'
      return Object.assign({}, attendee, { quote: newQuote })
    default:
      return attendee;
  }
})
.sort((attendee1, attendee2) => attendee2.quote.length - attendee1.quote.length)
.forEach(attendee => {
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


  if (attendee.quote !== "") {
    const quote = document.createElement('h1')
    quote.className = 'attendee-quote'
    quote.textContent = attendee.quote
    attendeeDiv.appendChild(quote)
  }

  attendeeDiv.appendChild(photo)
  attendeeDiv.appendChild(name)
  attendeeDiv.appendChild(homeOffice)

  attendeeList.appendChild(attendeeDiv)
})

document.querySelector('.photobook').appendChild(attendeeList)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(() => console.log('Service Worker Registered'))
}
