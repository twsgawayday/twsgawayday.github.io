import fs from 'fs'
import fetch from 'node-fetch'
import { Converter } from 'csvtojson'
require('dotenv').config()

const additionalPeople = [
  {
    name: 'Ng Pan-Wei',
    photoURL: '',
    homeOffice: 'Beijing',
    quote: 'LAGI BAGUS'
  },
  {
    name: 'Channappa Jagadish',
    photoURL: 'https://jigsaw.thoughtworks.com/consultants/26763/show_picture?style=profile',
    homeOffice: 'Bangalore',
    quote: 'I looked it up since I was curious, I believe its "very fantastic", didn\'t it had a Punjabi etymology :)'
  },
  {
    name: 'Vishal Sharma',
    photoURL: '',
    homeOffice: 'Gurgaon',
    quote: 'RoCkINg'
  },
  {
    name: 'Steven Ta',
    photoURL: '',
    homeOffice: 'Singapore',
    quote: 'Chicken Patties with Mac Sauce'
  },
  {
    name: 'Tobie Wee',
    photoURL: '',
    homeOffice: 'Singapore',
    quote: 'That feeling when I accomplish something, or when I have a good meal with my loved ones.'
  },
  {
    name: 'Wenshu kwek',
    photoURL: '',
    homeOffice: 'Singapore',
    quote: 'A tasty bag of kopi peng!'
  },
  {
    name: 'Ekta Sivasriamphai',
    photoURL: '',
    homeOffice: 'Singapore',
    quote: ''
  },
];

const converter = new Converter({})

converter.on('end_parsed', jsonArray => {
  let attendees = jsonArray.filter(person => person['Will you be attending Away Day?'] === 'Yes')

  Promise.all(attendees.map(attendee => buildAttendeeProfile(attendee)))
    .then(data => {
      fs.writeFile('./data/attendees.json', JSON.stringify(data.concat(additionalPeople)), 'utf8', (err) => {
        if (err) throw err
        console.log('success');
      });
    })
})

fs.createReadStream('./data/raw.csv').pipe(converter)

async function buildAttendeeProfile (person) {
  const username = person.Username.split('@')[0]
  const quote = person['What does \'Damn Shiok\' mean to you?'].replace(/^"$/, '');

  const apiURL = 'https://jigsaw.thoughtworks.com/api/people/' + username
  const options = {
    method: 'GET',
    headers: {
      Authorization: process.env.JIGSAW_API_TOKEN
    }
  }
  return fetch(apiURL, options)
    .then(res => res.json())
    .then(data => {
      return {
        name: data.preferredName,
        photoURL: data.picture.url,
        homeOffice: data.homeOffice.name,
        quote: quote
      }
    })

}


