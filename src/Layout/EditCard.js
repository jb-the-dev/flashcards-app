import React, { useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";

export default function EditCard() {
  const [currentDeck, setCurrentDeck] = useState({});
  const [editCardData, setEditCardData] = useState({});
  const { url, params } = useRouteMatch();
  const history = useHistory();

// Fetch current deck and current card
  useEffect(() => {
    const abortController = new AbortController();
    async function getDeck() {
      try{
      const fetchedDeck = await readDeck(params.deckId);
      setCurrentDeck(fetchedDeck);

      const fetchedCard = await readCard(params.cardId)
      setEditCardData(fetchedCard);
      } catch (error) {
        console.error(error)
      }
    }
    getDeck();
    return () => abortController.abort()
  }, [params.deckId, params.cardId]);

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`${url}`}> {currentDeck.name} </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Edit Deck
        </li>
      </ol>
    </nav>
  );

  const handleEditCard = async (event) => {
    event.preventDefault();
    await updateCard(editCardData);
    console.log("card edited.");
    history.push(`/decks/${params.deckId}`);
  };

  const handleCardFormChange = (event) => {
    event.preventDefault();
    setEditCardData({
      ...editCardData,
      [event.target.name]: event.target.value,
    });
  };

  const createCardForm = (
    <form onSubmit={handleEditCard}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          {" "}
          Front{" "}
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
          {" "}
          Back{" "}
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
      <Link to={`/decks/${currentDeck.id}`} className="btn btn-secondary">
        Done
      </Link>
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
    <div>
      {breadcrumb}
      <h3>{currentDeck.name}: Edit Card</h3>
      {createCardForm}
    </div>
  )
}
