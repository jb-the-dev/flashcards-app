import React, { useEffect, useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

// Component for viewing a deck's entire list of cards, along with buttons for editing both the deck and individual cards

export default function ViewDeck() {
  const [currentDeck, setCurrentDeck] = useState({ cards: [] });
  const { url, params } = useRouteMatch();
  const history = useHistory();

  // API call to get current deck
  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDeck() {
      try {
        let fetchedDeck = await readDeck(params.deckId, abortController.signal);
        setCurrentDeck(fetchedDeck);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDeck();
    return () => abortController.abort();
  }, [params.deckId]);

  // Handlers
  const handleDeleteDeck = (event) => {
    event.preventDefault();
    const deleteBox = window.confirm(
      "Delete deck? \n \n You will not be able to recover it."
    );

    if (deleteBox) {
      // if user hits "ok" on popup, code below deletes deck
      async function deckDeleter() {
        try {
          await deleteDeck(params.deckId);
          history.push("/");
        } catch (error) {
          console.error(error);
        }
      }
      deckDeleter();
    }
  };

  const handleDeleteCard = async (cardId) => {
    const deleteBox = window.confirm(
      "Delete this card? \n \n You will not be able to recover it."
    );

    if (deleteBox) {
      // if user hits "ok" on popup, code below deletes card
      await deleteCard(cardId);
      history.push(`/`);
    }
  };

  // HTML for rendering list of cards, both sides at once
  const cardList = currentDeck.cards.map((card) => (
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
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteCard(card.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    </div>
  ));

  // HTML for rendering deck info
  const selectedDeck = (
    <div className="container column">
      <div className="column">
        <h3> {currentDeck.name} </h3>
        <p> {currentDeck.description}</p>
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
    <>
      <Breadcrumb middleText={currentDeck.name} />
      {selectedDeck}
      <h2>Cards</h2>
      <ul>{cardList}</ul>
    </>
  );
}
