# flashcards-app

A study aide that allows users to customize study decks and study cards

This project represents the first full front-end React application developed by JB. 

The purpose was to build a React app that allowed users to create, read, update, and delete their own custom study materials in the form of decks of cards.
The app mimics the use of API calls on click handlers and useEffect() hooks by having a set of functions in `src/utils/api`, as well as a local database file with some dummy data to be used with testing the various behaviors being built into the app. 
There is also a backup of the starting database contained in the `src` folder, that proved useful during the testing phase of builiding this app.

The app made use of the `react-router-dom` package to help build a main set of routes (see `/src/index.js`) to help with navigating the components, as well as parsing the url for helpful information (such as deckId and cardId) being used in the API call functions.

The styling is primarily Bootstrap, with bits of flexbox interspersed.

## Reflections
- Building the first workable version of the app while having some test data for testing and rendering proved immensely helpful.
- The app is in a decent place in terms of modularization right now, but there are plans to refactor the code further into smaller components
