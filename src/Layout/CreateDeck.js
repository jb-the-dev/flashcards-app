import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

export default function CreateDeck() {
  const initialForm = {
    name: "",
    description: "",
  }
  const [createDeckFormData, setCreateDeckFormData] = useState({...initialForm});

  const history = useHistory();

  // Handlers
  const handleChange = (event) => {
    setCreateDeckFormData({
      ...createDeckFormData,
      [event.target.name]: event.target.value,
    });
    console.log(createDeckFormData)
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = await createDeck(createDeckFormData);
    console.log("deck created.", newDeck);
    const newDeckId = newDeck.id
    history.push(`/decks/${newDeckId}`);
  };

  const createDeckForm = (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            onChange={handleChange}
            // value={createDeckFormData.name}
            placeholder="Deck Name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            onChange={handleChange}
            // value={createDeckFormData.description}
            placeholder="Brief description of deck"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          onClick={() => history.push('/')}
          type="button"
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ margin: "0 10px" }}
        >
          Submit
        </button>
      </form>
    </>
  );

  return (
    <>
      <Breadcrumb middleText={"Create Deck"}/>
      <h1>Create Deck </h1>
      {createDeckForm}
    </>
  );
}
