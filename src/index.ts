/*
 * The Medicare provider number comprises:
 *  - six digits (provider stem)
 *  -  a practice location character (one alphanum char)
 *  -  a check-digit (one alpha character)
 *
 * Further calculation information available here:
 * https://www.clearwater.com.au/code/provider
 */

const locationCharacters = "0123456789ABCDEFGHJKLMNPQRTUVWXY";
const checkCharacters = "YXWTLKJHFBA";
const re = new RegExp(
  `^(\\d{5,6})([${locationCharacters}])([${checkCharacters}])$`
);

function padLeftZero(content: string, len: number) {
  if (content.length < len) {
    content = `0000${content}`.slice(-len);
  }

  return content;
}

/**
 * Calculates the sum of all the stem digits, multiplied by their associated weight.
 */
const calculateStemSum = (stem: string) => {
  const weights = [3, 5, 8, 4, 2, 1];

  const stemDigits = stem.split("");

  return stemDigits.reduce(
    (accumulator, current, index) =>
      accumulator + parseInt(current) * weights[index],
    0
  );
};

/**
 * Calculates the practice location value (PLV) portion of the remainder sum.
 */
const calculatePlvSum = (locationCharacter: string) => {
  const plvMultiplier = 6;
  const plv = locationCharacters.indexOf(locationCharacter);

  return plv * plvMultiplier;
};

/**
 * Returns whether the provided string is a valid Medicare provider number.
 */
export const validateProviderNumber = (providerNumber: string) => {
  if (providerNumber && providerNumber.length > 8) {
    return false;
  }

  const matchGroups = providerNumber.toUpperCase().match(re);
  if (!matchGroups) {
    return false;
  }

  const [_, stemMatch, locationMatch, checkMatch] = matchGroups;

  const stem = padLeftZero(stemMatch, 6);

  const stemSum = calculateStemSum(stem);
  const plvSum = calculatePlvSum(locationMatch);

  const remainder = (stemSum + plvSum) % 11;

  return checkMatch === checkCharacters.charAt(remainder);
};

export default validateProviderNumber;
