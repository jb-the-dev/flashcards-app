import React from "react";

// component that displays error HTML when url doesn't exist

function NotFound() {

  return (
    <div className="NotFound">
      <h1>Not Found</h1>
      <p>Sorry, the url you are currently at does not exist.</p>
    </div>
  );
}

export default NotFound;
