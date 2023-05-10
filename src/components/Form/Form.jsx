import React from "react";
import "./Form.css";
import InputBase from "../InputBase/InputBase";
import { OTHER_CARDS } from "../constants";
import {
  cardExpireValidation,
  cardNumberValidation,
  onlyTextValidation,
  securityCodeValidation,
} from "../validations";

const INIT_CARD = {
  card: "",
  cardHolder: "",
  expiry: "",
  securityCode: "",
};

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      cardData: INIT_CARD,
      maxLength: OTHER_CARDS.length,
      // Object for all potential kinds of errors:
      error: {},
      cardType: null,
    };
  }

  findDebitCardType = (cardNumber) => {
    const regexPattern = {
      // MC: Start w/ 5, next can be 1-5, then 0-9, till end OR start w/ 2, then 2-7, then 0-9 till end
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      // Can start w/ either 3 or 47
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };
    for (const cardType in regexPattern) {
      // Remove any empty spaces (chars that are not digits) in card number:
      if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[cardType])) {
        return cardType;
      }
    }
    return "";
  };

  handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case "card":
        errorText = cardNumberValidation(value);
        // Find card type:
        this.setState((prevState) => ({
          cardType: this.findDebitCardType(value),
          error: {
            ...prevState.error,
            cardError: errorText,
          },
        }));
        // Set state cardType, error handling
        break;
      case "cardHolder":
        // Check for spaces & numbers
        errorText = onlyTextValidation(value);
        // Since we're updating error object, access prev state:
        this.setState((prevState) => ({
          error: { ...prevState.error, cardHolderError: errorText },
        }));
        // Set state error
        break;
      case "expiry":
        // Check date format
        // setState error
        // Since we're updating error object, access prev state:
        errorText = cardExpireValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, expiryError: errorText },
        }));
        break;
      case "securityCode":
        // Check for min length
        // setState
        errorText = securityCodeValidation(3, value);
        this.setState((prevState) => ({
          error: { ...prevState.error, securityCodeError: errorText },
        }));
        break;
      default:
        break;
    }
  };

  handleBlur = ({ target: { name, value } }) =>
    this.handleValidations(name, value);

  handleInputData = ({ target: { name, value } }) => {
    // Mask the card number:
    // Remember, this method is called whenever the input fields are changed.
    if (name === "card") {
      let mask = value.split(" ").join("");
      if (mask.length) {
        // Add space after every fourth character
        mask = mask.match(new RegExp(".{1,4}", "g")).join(" ");
        this.setState((prevState) => ({
          cardData: { ...prevState.cardData, [name]: mask },
        }));
      } else {
        this.setState((prevState) => ({
          cardData: { ...prevState.cardData, [name]: "" },
        }));
      }
    } else {
      this.setState((prevState) => ({
        cardData: { ...prevState.cardData, [name]: value },
      }));
    }
  };

  checkErrorBeforeAddingCard = () => {
    const { cardData } = this.state;
    let errorValue = {};
    let isError = false;
    Object.keys(cardData).forEach((value) => {
      // BUG HAS TO DO W/ THIS CONDITION. IF FILLED IN ERRONEOUSLY, IT STILL PASSES THIS TEST OF LENGTH, SO TEST IT BASED ON SOMETHING ELSE.
      // Maybe do boolean to see if the field fits its regex pattern.
      // RegExp.prototype.test would return this boolean
      // Maybe put regex patterns in array of objects whose elems correspond w/ values in cardData
      if (!cardData[value].length) {
        errorValue = { ...errorValue, [`${value}Error`]: "Required" };
        isError = true;
      }
    });
    this.setState({ error: errorValue });
    return isError;
  };

  handleAddCard = (e) => {
    e.preventDefault();
    // errorCheck will be false, even if the input doesn't fit the regex pattern, since the test inside checkErrorBeforeAddingCard is based on length
    const errorCheck = this.checkErrorBeforeAddingCard();
    if (!errorCheck) {
      this.setState({ cardData: INIT_CARD, cardType: null });
    } /* else {
      this.setState((prevState) => ({
        error: { ...prevState.error },
      }));
    } */
  };

  render() {
    // Destructuring can make it easier to distinguish the methods and the variables used in return()
    const { cardData, error, cardType, maxLength } = this.state;

    const inputData = [
      { label: "Card Number", name: "card", type: "text", error: "cardError" },
      {
        label: "Cardholder's Name",
        name: "cardHolder",
        type: "text",
        error: "cardHolderError",
      },
      {
        label: "Expiry Date (mm/yy)",
        name: "expiry",
        type: "text",
        error: "expiryError",
      },
      {
        label: "Security Code",
        name: "securityCode",
        type: "text",
        error: "securityCodeError",
      },
    ];

    return (
      <div>
        <h1>Add New Card</h1>
        <form onSubmit={this.handleAddCard}>
          {/* In case data is being fetched from a DB, render only if inputData has a length; else, return null */}
          {inputData.length
            ? inputData.map((item) => (
                <InputBase
                  key={item.label}
                  placeholder={item.label}
                  type={item.type}
                  value={cardData && cardData[item.name]}
                  onChange={this.handleInputData}
                  autoComplete="off"
                  maxLength={maxLength}
                  name={item.name}
                  onBlur={this.handleBlur}
                  error={error}
                  cardType={cardType}
                  isCardNumber={item.name === "card"}
                  errorMessage={
                    error && error[item.error] && error[item.error].length > 1
                      ? error[item.error]
                      : null
                  }
                />
              ))
            : null}
          <div>
            <InputBase type="submit" value="Add Card" disabled={false} />
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
