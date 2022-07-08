// import React from "react";
// import { Route, Switch, useRouteMatch } from "react-router-dom"
// import LoadCards from "./LoadCards";

// export default function Study({cards, decks, deck, setDeck}){
//     const {params} = useRouteMatch();

//     return (
//         <React.Fragment>
//             <h4> Study: {decks[params.deckId - 1].name}</h4>
//             <Switch>
//                 <Route>
//                     <LoadCards cards={cards} decks={decks} params={params} deck={deck} setDeck={setDeck}/>
//                 </Route>
//             </Switch>
//         </React.Fragment>
//     )
// }