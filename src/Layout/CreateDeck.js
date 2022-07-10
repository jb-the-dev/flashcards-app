import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";
import DeckForm from "./DeckForm";

// Component with the state, handlers, and form component for creating the name and description of a deck

export default function CreateDeck() {
  const initialForm = {
    name: "",
    description: "",
  };
  const [createDeckFormData, setCreateDeckFormData] = useState({
    ...initialForm,
  });

  const history = useHistory();

  // Handlers for submitting, editing, and cancelling on the deck form
  const handleCreateDeckChange = (event) => {
    setCreateDeckFormData({
      ...createDeckFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateDeckSubmit = async (event) => {
    event.preventDefault();
    const newDeck = await createDeck(createDeckFormData);
    const newDeckId = newDeck.id;
    history.push(`/decks/${newDeckId}`);
  };

  const handleCreateDeckCancel = (event) => {
    event.preventDefault();
    history.push("/");
  };

  return (
    <>
      <Breadcrumb middleText={"Create Deck"} />
      <h1>Create Deck </h1>
      <DeckForm
        handleCancel={handleCreateDeckCancel}
        handleChange={handleCreateDeckChange}
        handleSubmit={handleCreateDeckSubmit}
        deckData={createDeckFormData}
      />
    </>
  );
}
