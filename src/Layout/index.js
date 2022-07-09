import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./DeckList";
import CreateDeck from "./CreateDeck";
import ViewDeck from "./ViewDeck";
import EditDeck from "./EditDeck";
import CardList from "./CardList";
import CreateCard from "./CreateCard";
import EditCard from "./EditCard";

export default function Routing() {
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({ cards: [] });

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList
              decks={decks}
              cards={cards}
              setDecks={setDecks}
              setCards={setCards}
            />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck deck={deck} setDeck={setDeck} />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <CardList />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <CreateCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}
