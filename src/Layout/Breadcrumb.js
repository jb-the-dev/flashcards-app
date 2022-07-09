import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb() {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          Middle
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Optional final bit
        </li>
      </ol>
    </nav>
  );
}
