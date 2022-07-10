import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";
import CardForm from "./CardForm";

// Component with the state, handlers, and form component for creating the front and back of a study card

export default function CreateCard() {
  const blankCreateCard = {
    front: "",
    back: "",
  };
  const [createCardData, setCreateCardData] = useState(blankCreateCard);
  const [currentDeck, setCurrentDeck] = useState({});

  const { deckId } = useParams();
  const history = useHistory();

  // API call to fetch current deck
  useEffect(() => {
    async function getDeck() {
      const deckApi = await readDeck(deckId);
      setCurrentDeck(deckApi);
    }
    getDeck();
  }, [deckId]);

  // Handlers for submitting, editing, and cancelling on the card form
  const handleCreateCardSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, {
      front: createCardData.front,
      back: createCardData.back,
    });
    setCreateCardData(blankCreateCard);
  };

  const handleCreateCardChange = (event) => {
    event.preventDefault();
    setCreateCardData({
      ...blankCreateCard,
      ...createCardData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateCardCancel = (event) => {
    event.preventDefault();
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <Breadcrumb
        middleText={currentDeck.name}
        deckId={currentDeck.id}
        finalText={"Add Card"}
      />
      <h1>{currentDeck.name}: Add Card</h1>
      <CardForm
        cardData={createCardData}
        handleChange={handleCreateCardChange}
        handleSubmit={handleCreateCardSubmit}
        handleCancel={handleCreateCardCancel}
      />
    </div>
  );
}
