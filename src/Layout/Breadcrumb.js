import React from "react";
import { Link } from "react-router-dom";

// breadcrumb component that renders text and links dynamically depending on its parent component's needs

export default function Breadcrumb({ deckId, middleText, finalText = "" }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {deckId ? (
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{middleText}</Link>
          </li>
        ) : (
          <li className="breadcrumb-item active">{middleText}</li>
        )}
        {finalText && (
          <li className="breadcrumb-item active" aria-current="page">
            {finalText}
          </li>
        )}
      </ol>
    </nav>
  );
}
