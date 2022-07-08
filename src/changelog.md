Changes made 7/7 evening

* Condensing Study.js into StudyDeck.js - added the header, route, and LoadCards component to *StudyDeck.js* where *Study.js* was before
* changed 'selectedCard' to 'selectedDeck' in *ViewDeck*
* moved 'Create Deck' Link into the homepage route on *index.js* so that the button wouldn't render on more components
* added "card.id" key to 'cardList' map in *ViewDeck*
* migrated Routes from *ViewDeck* over to *StudyDeck* - it renders now, think it has to do with "/decks/:deckId" already existing on that component's Switch route pattern; React router dom probably doesn't know which of the two Switch/Routes to use if they use the same base? idk, worth a TA explaining maybe.
