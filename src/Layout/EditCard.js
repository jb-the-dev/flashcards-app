import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

export default function EditCard() {
  const [currentDeck, setCurrentDeck] = useState({});
  const [editCardData, setEditCardData] = useState({});
  const { params } = useRouteMatch();
  const history = useHistory();

// API calls to fetch current deck, then fetch current card
  useEffect(() => {
    const abortController = new AbortController();
    async function getDeck() {
      try {
      const fetchedDeck = await readDeck(params.deckId);
      setCurrentDeck(fetchedDeck);

      const fetchedCard = await readCard(params.cardId)
      setEditCardData(fetchedCard);
      } catch (error) {
        console.error(error)
      }
    }
    getDeck();
    return () => abortController.abort();
  }, [params.deckId, params.cardId]);

  // Handlers
  const handleEditCardSubmit = async (event) => {
    event.preventDefault();
    await updateCard(editCardData);
    history.push(`/decks/${params.deckId}`);
  };

  const handleCardFormChange = (event) => {
    event.preventDefault();
    setEditCardData({
      ...editCardData,
      [event.target.name]: event.target.value
    });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(`/decks/${params.deckId}`)
  }

  const editCardForm = (
    <form onSubmit={handleEditCardSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          id="front"
          name="front"
          className="form-control"
          value={editCardData.front}
          onChange={handleCardFormChange}
          placeholder="Enter the contents of the front of the card here"
          rows="4"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="back" className="form-label">
          Back
        </label>
        <textarea
          id="back"
          name="back"
          className="form-control"
          value={editCardData.back}
          onChange={handleCardFormChange}
          placeholder="Enter the contents of the back of the card here"
          rows="4"
          required
        />
      </div>
      <button onClick={handleCancel} className="btn btn-secondary">
        Cancel
      </button>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ margin: "0 10px" }}
      >
        Save
      </button>
    </form>
  );

  return (
    <>
      <Breadcrumb middleText={`Deck ${currentDeck.name}`} deckId={currentDeck.id} finalText={`Edit Card ${params.cardId}`} />
      <h3>{currentDeck.name}: Edit Card</h3>
      {editCardForm}
    </>
  )
}
