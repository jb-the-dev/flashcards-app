import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Header from "./Header";
import LoadDecks from "./LoadDecks";
import StudyDeck from "./StudyDeck";
import NotFound from "./NotFound";
import CreateDeck from "./CreateDeck";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Link to="/decks/new" className="btn btn-secondary">
              Create Deck
            </Link>
            <LoadDecks
              decks={decks}
              setDecks={setDecks}
              cards={cards}
              setCards={setCards}
            />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <StudyDeck
              cards={cards}
              decks={decks}
              setDecks={setDecks}
              setCards={setCards}
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;
