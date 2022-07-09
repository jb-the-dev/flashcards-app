import React, { useEffect, useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

export default function CreateCard() {
  const blankCreateCard = {
    front: "",
    back: "",
  };
  const [createCardData, setCreateCardData] = useState(blankCreateCard);
  const [currentDeck, setCurrentDeck] = useState({});
  const { url } = useRouteMatch();
  const { deckId } = useParams();

  useEffect(() => {
    async function getDeck() {
      const deckApi = await readDeck(deckId);
      setCurrentDeck(deckApi);
    }
    getDeck();
  }, [deckId]);

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

  const handleCreateCard = async (event) => {
    event.preventDefault();
    await createCard(deckId, {
      front: createCardData.front,
      back: createCardData.back,
});
    console.log("card created.");
    setCreateCardData(blankCreateCard);
  };

  const handleCardFormChange = (event) => {
    event.preventDefault();
    setCreateCardData({
      ...blankCreateCard,
      ...createCardData,
      [event.target.name]: event.target.value,
    });
  };

  const createCardForm = (
    <form onSubmit={handleCreateCard}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Name
        </label>
        <textarea
          id="front"
          name="front"
          className="form-control"
          value={createCardData.front}
          onChange={handleCardFormChange}
          placeholder="Enter the contents of the front of the card here"
          rows="4"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="back" className="form-label">
          Description
        </label>
        <textarea
          id="back"
          name="back"
          className="form-control"
          value={createCardData.back}
          onChange={handleCardFormChange}
          placeholder="Enter the contents of the back of the card here"
          rows="4"
          required
        />
      </div>
      <Link to={`/decks/${currentDeck.id}`} className="btn btn-secondary">
        Cancel
      </Link>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ margin: "0 10px" }}
      >
        Submit
      </button>
    </form>
  );

  return (
    <div>
      {breadcrumb}
      <h1>{currentDeck.name}: Add Card</h1>
      {createCardForm}
    </div>
  );
}
