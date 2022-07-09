import React from "react";

export default function CreateDeck() {
  return (
    <>
      <h1>Create Deck </h1>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Deck Name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          placeholder="Brief description of deck"
        ></textarea>
      </div>
      <button type="button" className="btn btn-secondary">
        Cancel
      </button>
      <button
        type="button"
        className="btn btn-primary"
        style={{ margin: "0 10px" }}
      >
        Submit
      </button>
    </>
  );
}
