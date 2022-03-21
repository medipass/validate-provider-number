const locTable = '0123456789ABCDEFGHJKLMNPQRTUVWXY';
const checkTable = 'YXWTLKJHFBA';
const weights = [3, 5, 8, 4, 2, 1];
const re = new RegExp(`(\\d{5,6})([${locTable}])([${checkTable}])`);

function padLeftZero(n, len) {
  let s = n ? n.toString() : '';
  if (s.length < len) {
    s = `0000${s}`.slice(-len);
  }
  return s;
}

module.exports = function(providerNumber) {
  providerNumber = providerNumber.toUpperCase();
  const match = providerNumber.match(re);

  if (match) {
    const stem = padLeftZero(match[1], 6);
    const locChar = match[2];
    const checkChar = match[3];

    let sum = 0;
    stem.split('').forEach((item, index) => {
      sum = sum + parseInt(item) * weights[index];
    });

    const pvl = locTable.indexOf(locChar);
    sum = sum + pvl * 6;

    const remainder = sum % 11;

    return checkChar === checkTable.charAt(remainder);
  }

  return false;
};
