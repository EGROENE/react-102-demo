import React from "react";
import style from "./CoolBox.module.css";

const CoolBox = () => {
  // When defining style objects in components, it's not possible to do pseudoclasses or :hover.
  // It's also usually best to have separation of concerns & put these styles on a stylesheet.
  /* const boxStyling = {
    backgroundColor: "orchid",
    padding: "1rem",
    borderRadius: "8px",
  };

  const headerStyling = {
    color: "black",
    textTransform: "uppercase",
  };

  const paragraphStyling = {
    margin: "0",
  }; */

  return (
    <div className={style.box}>
      <h2 className={`header ${style.header}`}>The coolest box</h2>
      <p className={style.paragraph}>
        Vernunft fängt wieder an zu sprechen Und Hoffnung wieder an zu blühn;
        Man sehnt sich nach des Lebens goldner Baum.
      </p>
    </div>
  );
};

export default CoolBox;
