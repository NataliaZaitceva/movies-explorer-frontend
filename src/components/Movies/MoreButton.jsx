import React from "react";
import "./MoreButton.css";

function MoreButton({onClick}) {
  return (
    <section className="more-button">
      <button className="more-button-button" onClick={onClick}>Ещё</button>
    </section>
  );
}

export default MoreButton;
