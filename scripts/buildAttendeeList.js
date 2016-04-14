import fs from 'fs'
import fetch from 'node-fetch'
import { Converter } from 'csvtojson'
require('dotenv').config()

const converter = new Converter({})

converter.on('end_parsed', jsonArray => {
  let attendees = jsonArray.filter(person => person['Will you be attending Away Day?'] === 'Yes')

  Promise.all(attendees.map(attendee => buildAttendeeProfile(attendee)))
    .then(data => {
      fs.writeFile('./data/attendees.json', JSON.stringify(data), 'utf8', (err) => {
        if (err) throw err
        console.log('success');
      })
    })
})

fs.createReadStream('./data/raw.csv').pipe(converter)

async function buildAttendeeProfile (person) {
  const username = person.Username.split('@')[0]
  const quote = person['What does \'Damn Shiok\' mean to you?'];

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
