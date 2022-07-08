import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function LoadDecks({decks, setDecks, cards, setCards}) {

// API call to get decks
  useEffect(() => {
    const abortController = new AbortController();

    async function getDecks() {
      try {
        const response = await fetch("http://localhost:8080/decks", {
          signal: abortController.signal,
        });
        const decksData = await response.json();
        setDecks(decksData);
        
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(error.name);
        } else {
          throw error;
        }
      }
    }

    getDecks();

    return () => {
      abortController.abort();
    };
  }, [setDecks]);

// API call to get cards
  useEffect(() => {
    const abortController = new AbortController();

    async function getCards() {
      try {
        const response = await fetch("http://localhost:8080/cards", {
          signal: abortController.signal,
        });
        const cardsData = await response.json();
        setCards(cardsData);

      } catch (error) {
        if (error.name === "AbortError") {
          console.log(error.name);
        } else {
          throw error;
        }
      }
    }

    getCards();

    return () => {
        abortController.abort();
    };
  }, [setCards]);

  const deckList = decks.map((deck) => (
      <div key={deck.id} className="card w-50">
      <div className="card-body">
        <div
          className="row"
          style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 10px",
            }}
            >
          <h5 className="card-title"> {deck.name} </h5>
          <p> {cards.filter((card) => card.deckId === deck.id).length} cards</p>
        </div>
        <p className="card-text">{deck.description}</p>
        <div
          className="row"
          style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 10px",
            }}
            >
          <div className="row" style={{ display: "flex", margin: "0 5px" }}>
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
              View
            </Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
              Study
            </Link>
          </div>
          <div>
            <button
              type="delete"
              className="btn btn-danger"
              onClick={() =>
                window.confirm(
                    "Delete this deck? \n \n You will not be able to recover it."
                )
              }
              >
              Delete
            </button>
          </div>
        </div>
      </div>

    </div>

  ));

  return deckList
}
