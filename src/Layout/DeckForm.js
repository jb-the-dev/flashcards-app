import React from "react";

// Component that renders the form for editing or creating a new deck

export default function DeckForm({
  deckData,
  handleCancel,
  handleSubmit,
  handleChange,
}) {
  return (
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
          value={deckData.name}
          onChange={handleChange}
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
          value={deckData.description}
          onChange={handleChange}
          placeholder="Enter the deck description here"
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
        Submit
      </button>
    </form>
  );
}
