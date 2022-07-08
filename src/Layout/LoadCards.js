import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

export default function LoadCards({ params, deck, setDeck }) {
  const [cardSide, setCardSide] = useState(true);
  const [cardIndex, setCardIndex] = useState(0);

  const history = useHistory()

  // API call to get deck
  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDeck() {
      try {
        let fetchedDeck = await readDeck(params.deckId);
        setDeck(fetchedDeck);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(error.name);
        } else {
          throw error;
        }
      }
    }
    fetchDeck();
    return () => {
      abortController.abort();
    };
  }, [params.deckId, setDeck]);
  

  const card = deck.cards[cardIndex] || {}
  
  //* if you're rendering something from useEffect, make sure you have default values in place so you don't start with 'undefined'
  
  //* programming logic: check for if wrong first (think about the end condition first, then have the logic for ongoing condition)

// Next button handler
  const handleNext = () => {
    if (cardIndex < (deck.cards.length - 1)) {
      setCardIndex(cardIndex + 1);
    } else if(cardIndex === (deck.cards.length - 1)) {
      const restart = window.confirm("Restart cards \n \n Click 'cancel' to return to the home page.")
      restart ? setCardIndex(0) : history.push('/')
    }
    
    setCardSide(!cardSide);
  }
  
// Card HTML
  const pageCard = (
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
          <p>Card {cardIndex + 1} of {deck.cards.length}</p>
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
            <button className="btn btn-secondary" 
              onClick={() => setCardSide(!cardSide)}
            >
              Flip</button>
            {!cardSide && <button
              onClick={handleNext}
              className="btn btn-primary"
            >
              Next
            </button>}
          </div>
        </div>
      </div>
    </div>
  );

  return pageCard;
}
