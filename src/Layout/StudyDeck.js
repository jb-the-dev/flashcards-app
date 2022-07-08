import React, { useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import LoadCards from "./LoadCards";
import ViewDeck from "./ViewDeck";
import CreateCard from "./CreateCard";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";

export default function StudyDeck({ cards, decks }) {
  const [deck, setDeck] = useState({cards: []});
  const { params, path, url } = useRouteMatch();

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`${url}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Study
        </li>
      </ol>
    </nav>
  );

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={`${path}`}>
          <ViewDeck deck={deck} setDeck={setDeck}/>
        </Route>
        <Route path={`${path}/study`}>
          {breadcrumb}
          <h4> Study: {deck.name}</h4>
          <LoadCards
            cards={cards}
            decks={decks}
            params={params}
            deck={deck}
            setDeck={setDeck}
          />
        </Route>
        <Route exact path={`${path}/edit`}>
          <EditDeck />
        </Route>
        <Route exact path={`${path}/cards/new`}>
          <CreateCard />
        </Route>
        <Route exact path={`${path}/cards/:cardId/edit`}>
          <EditCard />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
