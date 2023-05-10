import React from "react";
import "./InputBase.css";
import { CARD, CARD_ICON } from "../constants";

// Functional component
const InputBase = ({
  errorMessage,
  error,
  cardType,
  isCardNumber,
  isAddCardBtnDisabled,
  ...props
}) => (
  <label htmlFor="">
    <input className="input-root" {...props} />
    {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    {(!error || !error.cardError) &&
      isCardNumber &&
      CARD.includes(cardType) && (
        <img
          style={{
            position: "absolute",
            top: "5px",
            right: "10px",
            width: "50px",
            height: "33px",
          }}
          src={CARD_ICON[cardType]}
          alt="card"
        />
      )}
  </label>
);

export default InputBase;
