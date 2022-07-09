import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api";

export default function DeckList() {
const [deckList, setDeckList] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function getDeckList() {
      try {
        const fetchedDeckList = await listDecks(abortController.signal);
        setDeckList(fetchedDeckList);
      } catch (error) {
          console.error(error);
        }
      }
    getDeckList();
    return () => abortController.abort();
  }, []);



// Homepage HTML
  const decksHtml = deckList.map((deck) => (
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
          <p> {deck.cards.length} cards</p>
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

  return (
    <>
      <Link to="/decks/new" type="button" className="btn btn-secondary">
        Create Deck
      </Link>
      {decksHtml}
    </>
  )
}