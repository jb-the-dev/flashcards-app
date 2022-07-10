import React from "react";

// Component that renders the form for editing or creating a new card

export default function CardForm({
  handleCancel,
  handleSubmit,
  handleChange,
  cardData,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          id="front"
          name="front"
          className="form-control"
          value={cardData.front}
          onChange={handleChange}
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
          value={cardData.back}
          onChange={handleChange}
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
}
