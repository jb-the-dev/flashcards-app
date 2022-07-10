import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

export default function EditDeck() {
  const [editDeckFormData, setEditDeckFormData] = useState({name: "", description: ""});

  const { params } = useRouteMatch();
  const history = useHistory();

  // API call to fetch current deck
  useEffect(() => {
    const abortController = new AbortController();
    async function getDeck() {
      try {
        const fetchedDeck = await readDeck(params.deckId);
        setEditDeckFormData(fetchedDeck);
      } catch (error) {
        console.error(error);
      }
    }
    getDeck();
    return () => abortController.abort();
  }, [params.deckId]);

  // Handlers
  const handleEditDeckSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(editDeckFormData);
    history.push(`/decks/${params.deckId}`);
  };

  //! This is tied to an uncontrolled component somehow - why though?
  const handleEditDeckChange = (event) => {
    event.preventDefault();
    setEditDeckFormData({
      ...editDeckFormData,
      [event.target.name]: event.target.value
    });
  };

  const handleEditCancel = (event) => {
    event.preventDefault();
    history.push(`/decks/${params.deckId}`)
  }

  // HTML for rendering
  const editDeckForm = (
    <form onSubmit={handleEditDeckSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="form-control"
          value={editDeckFormData.name}
          onChange={handleEditDeckChange}
          placeholder="Enter the deck name here"
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
          value={editDeckFormData.description}
          onChange={handleEditDeckChange}
          placeholder="Enter the deck description here"
          rows="4"
          required
        />
      </div>
      <button onClick={handleEditCancel} className="btn btn-secondary">
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
  );

  return (
    <>
      <Breadcrumb middleText={editDeckFormData.name} deckId={params.deckId} finalText={"Edit Deck"}/>
      <h1>Edit Deck</h1>
      {editDeckForm}
    </>
  );
}
