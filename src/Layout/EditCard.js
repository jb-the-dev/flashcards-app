import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import Breadcrumb from "./Breadcrumb";
import CardForm from "./CardForm";

// Component with the state, handlers, and form component for editing the front and back of a study card

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

        const fetchedCard = await readCard(params.cardId);
        setEditCardData(fetchedCard);
      } catch (error) {
        console.error(error);
      }
    }
    getDeck();
    return () => abortController.abort();
  }, [params.deckId, params.cardId]);

  // Handlers for submitting, editing, and cancelling on the card form
  const handleEditCardSubmit = async (event) => {
    event.preventDefault();
    await updateCard(editCardData);
    history.push(`/decks/${params.deckId}`);
  };

  const handleEditCardChange = (event) => {
    event.preventDefault();
    setEditCardData({
      ...editCardData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditCardCancel = (event) => {
    event.preventDefault();
    history.push(`/decks/${params.deckId}`);
  };

  return (
    <>
      <Breadcrumb
        middleText={`Deck ${currentDeck.name}`}
        deckId={currentDeck.id}
        finalText={`Edit Card ${params.cardId}`}
      />
      <h3>{currentDeck.name}: Edit Card</h3>
      <CardForm
        cardData={editCardData}
        handleChange={handleEditCardChange}
        handleSubmit={handleEditCardSubmit}
        handleCancel={handleEditCardCancel}
      />
    </>
  );
}
