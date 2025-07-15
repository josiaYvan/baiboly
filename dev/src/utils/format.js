const moment = require('moment');

/* eslint-disable no-restricted-globals */
exports.formatNumber = (inputString) => {
  // Extraire chaque segment
  const part1 = inputString.substring(0, 3);
  const part2 = inputString.substring(3, 5);
  const part3 = inputString.substring(5, 8);
  const part4 = inputString.substring(8, 10);
  const part5 = inputString.substring(10, 20);

  const resultString = `${part1} ${part2} ${part3} ${part4} ${part5}`;

  return resultString;
};

exports.formatDateInEnglish = (dateString) => moment(dateString).format('DD MMMM YYYY');
exports.formatDateInEnglishWithHour = (dateString) => moment(dateString).format('HH:mm - DD MMM YYYY');

exports.formatDateInFrench = (dateString) => {
  const date = new Date(dateString);

  const months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

exports.formatMinutesToHoursAndMinutes = (minutesString) => {
  const minutes = parseInt(minutesString, 10);

  if (isNaN(minutes) || minutes < 0) {
    throw new Error('Veuillez fournir une chaîne de minutes valide.');
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes.toString().padStart(2, '0')}mn`;
};

exports.getCharactersAfterUnderscore = (str) => {
  const underscoreIndex = str.indexOf('_');
  return underscoreIndex !== -1 ? str.slice(underscoreIndex + 1) : '';
};
