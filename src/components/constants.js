import VISA_ICON from "./assets/visa.png";
import AMERICAN_EXPRESS_ICON from "./assets/amex.png";
import MASTERCARD_ICON from "./assets/masterCard.png";
import DISCOVER_ICON from "./assets/discover.png";

export const OTHER_CARDS = [
  // First number is 1-9 (card numbers never begin w/ 0), next 3 can be 0-9, then that next is a space
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const AMERICAN_EXPRESS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const CARD = ["VISA", "MASTERCARD", "AMERICAN_EXPRESS", "DISCOVER"];

// Assigned icons to items in this object so that they are easier to update if need be. Only the image paths at the beginning of this doc will need to be changed in this case.
export const CARD_ICON = {
  VISA: VISA_ICON,
  AMERICAN_EXPRESS: AMERICAN_EXPRESS_ICON,
  MASTERCARD: MASTERCARD_ICON,
  DISCOVER: DISCOVER_ICON,
};
