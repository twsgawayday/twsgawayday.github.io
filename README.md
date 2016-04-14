# SG Away Day Website

## Build process for photobook

1. `npm install` dependencies
2. create `.env` file in root directory containing `JIGSAW_API_TOKEN=your_token`
3. export responses from google forms as csv and save as `data/raw.csv`
4. `npm run build` to build attendee list from csv and bundle source files into `bundle.js`
5. commit to github repo to be published in github pages
