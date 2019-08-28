import React from "react";

function Loading() {
  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <img className="loadingImg" style={{ maxWidth: "80vw" }} src="https://media.giphy.com/media/3kzJvEciJa94SMW3hN/giphy.gif" alt="shocked pikachu"></img>
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
