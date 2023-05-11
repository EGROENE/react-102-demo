import moment from "moment";

export const cardNumberValidation = (cardNumber) => {
  const regexPattern = {
    // MC: Start w/ 5, next can be 1-5, then 0-9, till end OR start w/ 2, then 2-7, then 0-9 till end
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA: /^4[0-9]{2,}$/,
    // Can start w/ either 3 or 47
    AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
  };
  for (const card in regexPattern) {
    // Remove any empty spaces (chars that are not digits) in card number:
    if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card])) {
      if (cardNumber) {
        return cardNumber &&
          /^[1-6]{1}[0-9]{14,15}$/i.test(
            cardNumber.replace(/[^\d]/g, "").trim()
          )
          ? ""
          : "Please enter a valid card number";
      }
    }
  }
  return "Please enter a valid card number";
};

// Validate the date is in correct format:
export const cardExpireValidation = (value) => {
  if (value) {
    // Test if trimmed value has regex pattern specified. If so, do code below; if not, return an error message to user.
    if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())) {
      let today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      ).getDate()}`;
      let currentDate = moment(new Date(date));
      let visaValue = value.split("/");
      let visaDate = new Date(`20${visaValue[1]}`, visaValue[0]);
      return currentDate < moment(visaDate)
        ? undefined
        : "Please enter a valid date in format mm/yy (must be present or future mm/yy)";
    } else {
      return "Please enter a valid date in format mm/yy (must be present or future mm/yy)";
    }
  }
};

// Ensure cardholder's name only includes letters:
export const onlyTextValidation = (value) => {
  if (value) {
    // Validates that chars are all values upper & lowercase, space, or hyphen
    if (/^[a-zA-ZÄäÖöÜüßÉéÍíóÓÑñ -]*$/i.test(value)) {
      return undefined;
    } else {
      return "Please enter alphabetical characters only, as well as any hyphens between names";
    }
  } else {
    return undefined;
  }
};

// Check security code is min length:
export const securityCodeValidation = (min, value) =>
  value && value.length < min
    ? `Must be at least ${min} characters`
    : undefined;

// Put all validations into array, w/ each input field type having its own object:
// Should be looped through in Form.jsx when checking for errors when user tries adding the card
// In Form.jsx, import this array instead of individual functions
export const validationTypes = [
  {
    inputType: "card",
    errorMessage: "Please enter a valid card number",
    validationMethod: function (cardNumber) {
      const regexPattern = {
        // MC: Start w/ 5, next can be 1-5, then 0-9, till end OR start w/ 2, then 2-7, then 0-9 till end
        MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
        VISA: /^4[0-9]{2,}$/,
        // Can start w/ either 3 or 47
        AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
        DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
      };
      for (const card in regexPattern) {
        // Remove any empty spaces (chars that are not digits) in card number:
        if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card])) {
          if (cardNumber) {
            return cardNumber &&
              /^[1-6]{1}[0-9]{14,15}$/i.test(
                cardNumber.replace(/[^\d]/g, "").trim()
              )
              ? ""
              : this.errorMessage;
          }
        }
      }
      return this.errorMessage;
    },
  },
  {
    inputType: "cardHolder",
    errorMessage:
      "Please enter alphabetical characters only, as well as any hyphens between names",
    validationMethod: function (value) {
      if (value) {
        // Validates that chars are all values upper & lowercase, space, or hyphen
        if (/^[a-zA-ZÄäÖöÜüßÉéÍíóÓÑñ -]*$/i.test(value)) {
          return undefined;
        } else {
          return this.errorMessage;
        }
      } else {
        return undefined;
      }
    },
  },
  {
    inputType: "expiry",
    errorMessage:
      "Please enter a valid date in format mm/yy (must be present or future mm/yy)",
    validationMethod: function (value) {
      if (value) {
        // Test if trimmed value has regex pattern specified. If so, do code below; if not, return an error message to user.
        if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())) {
          let today = new Date();
          console.log(today);
          const date = `${today.getFullYear()}-${
            today.getMonth() + 1
          }-${new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
          ).getDate()}`;
          console.log(date);
          let currentDate = moment(new Date(date));
          console.log(currentDate);
          let visaValue = value.split("/");
          console.log(visaValue);
          let visaDate = new Date(`20${visaValue[1]}`, visaValue[0]);
          console.log(visaDate);
          console.log(moment(visaDate));
          return currentDate < moment(visaDate) ? undefined : this.errorMessage;
        } else {
          return this.errorMessage;
        }
      }
    },
  },
  {
    inputType: "securityCode",
    errorMessage: "Must be at least 3 characters",
    validationMethod: function (value) {
      return value && value.length < 3 ? this.errorMessage : undefined;
    },
  },
];
