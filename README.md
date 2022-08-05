# flashcards-app

## Description
A study aide that allows users to customize study decks and study cards

This project represents the first full front-end React application developed by JB. 

The purpose was to build the client side of a React app that would allow users to create, read, update, and delete their own custom study materials in the form of decks of cards.

The app mimics the use of API calls on click handlers and useEffect() hooks by having a set of functions in `src/utils/api`, as well as a local database file with some dummy data. This data was used for testing while building the CRUD operations into the app. 

There is also a backup of the starting database contained in the `src` folder; this backup served as a mock seed file for the mock backend.

The styling is primarily Bootstrap, with bits of flexbox interspersed.

## Instructions
This app only works on local machines currently, due to the nature of the simulated "dummy" backend & database. To run this app:
1. Fork and clone this repository.
2. Run `npm install`
3. Run `npm start`

## Reflections
- Building the first workable version of the app while having some test data for testing and rendering proved immensely helpful in debugging.
- The app is in a decent place in terms of modularization right now, but there are plans to refactor the code further into smaller components
- Due to the nature of the "dummy" backend & database provided with the initial project, deploying the frontend does not show the full functionality of the app (creating, updating, and deleting cards and/or decks). In time, there are plans to also create a fully functioning backend & database
