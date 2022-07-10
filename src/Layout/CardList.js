import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { Link, useHistory, useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

// Component that dynamically displays a deck's study cards one by one, allowing user to flip and study them

export default function CardList() {
  const [currentDeck, setCurrentDeck] = useState({ cards: [] });
  const [cardIndex, setCardIndex] = useState(0);
  const [cardSide, setCardSide] = useState(true);

  const { deckId } = useParams();
  const history = useHistory();

  // API call to fetch current deck
  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDeck() {
      try {
        let fetchedDeck = await readDeck(deckId, abortController.signal);
        setCurrentDeck(fetchedDeck);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDeck();
    return () => abortController.abort();
  }, [deckId, setCurrentDeck]);

  // Handler that causes the front of the next card to render; if at the last card, handler triggers restart prompt
  const handleNext = () => {
    if (cardIndex < currentDeck.cards.length - 1) {
      setCardIndex(cardIndex + 1);
    } else if (cardIndex === currentDeck.cards.length - 1) {
      const restart = window.confirm(
        "Restart cards? \n \n Click 'cancel' to return to the home page."
      );

      restart ? setCardIndex(0) : history.push("/");
    }
    setCardSide(!cardSide);
  };

  // if currentDeck exists, set card variable to a card in currentDeck
  // otherwise set card variable to an empty object so page still renders
  const card = currentDeck.cards[cardIndex] || {};

  // HTML with dynamic rendering to flip card
  const dynamicStudyCard = (
    <div key={card.id} className="card w-50">
      <div className="card-body">
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 10px",
          }}
        >
          <p>
            Card {cardIndex + 1} of {currentDeck.cards.length}
          </p>
        </div>
        <p className="card-text">{cardSide ? card.front : card.back}</p>
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 10px",
          }}
        >
          <div className="row" style={{ display: "flex", margin: "0 5px" }}>
            <button
              className="btn btn-secondary"
              onClick={() => setCardSide(!cardSide)}
            >
              Flip
            </button>
            {/* Show Next button only on backside of card */}
            {!cardSide && (
              <button onClick={handleNext} to="" className="btn btn-primary">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Breadcrumb
        deckId={deckId}
        middleText={currentDeck.name}
        finalText={"Study"}
      />
      <h1>{currentDeck.name}: Study</h1>
      {currentDeck.cards.length > 2 && <>{dynamicStudyCard}</>}

      {/* If there's not enough cards, below HTML renders instead with link to add more cards */}
      {currentDeck.cards.length <= 2 && (
        <>
          <h2>Not enough cards.</h2>
          <p>
            {" "}
            You need at least 3 cards to study. There are{" "}
            {currentDeck.cards.length} cards in this deck.
          </p>
          <Link
            to={`/decks/${currentDeck.id}/cards/new`}
            className="btn btn-primary"
          >
            Add Cards
          </Link>
        </>
      )}
    </>
  );
}
