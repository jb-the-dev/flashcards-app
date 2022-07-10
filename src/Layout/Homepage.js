import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

// Component that appears on the homepage, showing the list of study decks along with buttons to View, Study, Add, or Delete them.

export default function Homepage() {
const [deckList, setDeckList] = useState([]);

// API call to fetch the list of decks
async function getDeckList(abortController) {
  try {
    const fetchedDeckList = await listDecks(abortController.signal);
    setDeckList(fetchedDeckList);
  } catch (error) {
      console.error(error);
    }
  }

useEffect(() => {
  const abortController = new AbortController();
  getDeckList(abortController);
    return () => abortController.abort();
  }, []);

// Handler for deleting a deck
const handleDeleteDeck = (deck) => {
  const deleteBox = window.confirm("Delete deck? \n\n You will not be able to recover it.");

  if (deleteBox) {   //if user hits "ok" on popup, code below deletes deck & re-renders the updated list of decks
    async function deckDeleter(){
      try {
        await deleteDeck(deck.id);
        const abortController = new AbortController();
        await getDeckList(abortController)
      } catch (error) {
        console.error(error)
      }
    }
    deckDeleter();
  }
}

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
              onClick={() => handleDeleteDeck(deck)}
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
      <Link to="/decks/new" className="btn btn-secondary" style={{margin: "5px"}}>
        Create Deck
      </Link>
      {decksHtml}
    </>
  )
}