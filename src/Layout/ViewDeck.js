import React, { useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { deleteDeck, readDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";


export default function ViewDeck({ deck, setDeck }) {
  const { url, params } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDeck() {
      try {
        let fetchedDeck = await readDeck(params.deckId, abortController.signal);
        setDeck(fetchedDeck);
      } catch (error) {
          console.error(error)
      }
    }
    fetchDeck();
    return () => abortController.abort()
  }, [params.deckId, setDeck]);

  const handleDeleteDeck = () => {
    const deleteBox = window.confirm(
      "Delete deck? \n \n You will not be able to recover it."
    );

    // if user hits "ok" on popup, code below deletes deck
    if (deleteBox) {
      async function deleteDeckApiCall() {
        try {
          await deleteDeck(params.deckId);
          history.push("/");
        } catch (error) {
          console.error(error)
        }
      }
      deleteDeckApiCall();
    }
  };


  const cardList = deck.cards.map((card) => (
    <div key={card.id} className="card container">
      <li className="row">
        <div className="col-6">
          <p> {card.front} </p>
        </div>
        <div className="col-6">
          <div>
            <p>{card.back}</p>
          </div>
          <div
            className="row"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Link
              to={`${url}/cards/${card.id}/edit`}
              className="btn btn-secondary"
            >
              Edit
            </Link>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      </li>
    </div>
  ));

  const selectedDeck = (
    <div className="container column">
      <div className="column">
        <h3> {deck.name} </h3>
        <p> {deck.description}</p>
      </div>
      <div
        className="row"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="row">
          <Link
            to={`${url}/edit`}
            className="btn btn-secondary"
            style={{ margin: "0 10px" }}
          >
            Edit
          </Link>
          <Link
            to={`${url}/study`}
            className="btn btn-primary"
            style={{ margin: "0 10px" }}
          >
            Study
          </Link>
          <Link
            to={`${url}/cards/new`}
            className="btn btn-primary"
            style={{ margin: "0 10px" }}
          >
            Add Cards
          </Link>
        </div>
        <div>
          <button
            type="delete"
            className="btn btn-danger"
            onClick={handleDeleteDeck}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <Breadcrumb />
      {selectedDeck}
      <h2>Cards</h2>
      <ul>{cardList}</ul>
    </React.Fragment>
  );
}
