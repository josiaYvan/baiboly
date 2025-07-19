const { message } = require('antd');
const { baiboly } = require('./baiboy_db');
const { fihirana } = require('./fihirana_db');

/* eslint-disable no-restricted-syntax */
exports.getBookNames = () => {
  const books = [];
  for (const testament of Object.values(baiboly[0])) {
    books.push(...Object.keys(testament));
  }
  return books;
};

exports.getChaptersByBookName = (bookName) => {
  // Récupérer le contenu du livre en utilisant la fonction getContentsByBookName
  const bookContent = exports.getContentsByBookName(bookName);

  // Si le livre existe, retourner les chapitres
  if (typeof bookContent === 'object') {
    return Object.keys(bookContent); // Retourne les chapitres (clé de chaque chapitre)
  }

  // Si le livre n'est pas trouvé, retourner le message d'erreur
  console.log('line:23 bookContent\n---> ', bookContent);
  return bookContent;
};

exports.searchVerse = (searchTerm) => {
  const results = [];
  const regex = new RegExp(searchTerm, 'i'); // Recherche insensible à la casse

  for (const [testament, books] of Object.entries(baiboly[0])) {
    for (const [book, chapters] of Object.entries(books)) {
      for (const [chapter, verses] of Object.entries(chapters)) {
        for (const [verse, text] of Object.entries(verses)) {
          if (regex.test(text)) {
            results.push({
              testament,
              book,
              chapter: parseInt(chapter, 10), // Convertir en nombre pour une meilleure manipulation
              verse: parseInt(verse, 10),
              text
            });
          }
        }
      }
    }
  }

  return results;
};

exports.getContentsByBookName = (bookName) => {
  let bookContent = null;

  // Chercher dans "Testamenta taloha"
  if (baiboly[0]['Testamenta taloha'] && baiboly[0]['Testamenta taloha'][bookName]) {
    bookContent = baiboly[0]['Testamenta taloha'][bookName];
  }

  // Si non trouvé dans "Testamenta taloha", chercher dans "Testamenta vaovao"
  if (!bookContent && baiboly[0]['Testamenta vaovao'] && baiboly[0]['Testamenta vaovao'][bookName]) {
    bookContent = baiboly[0]['Testamenta vaovao'][bookName];
  }

  // Retourner le résultat ou un message d'erreur
  if (bookContent) {
    return bookContent;
  }
  return `Livre ${bookName} non trouvé dans les deux testaments`;
};

exports.getProximityContentsByBookName = (bookName) => {
  const oldTestament = baiboly[0]['Testamenta taloha'];
  const newTestament = baiboly[0]['Testamenta vaovao'];

  const allBooks = [
    ...Object.keys(oldTestament || {}),
    ...Object.keys(newTestament || {})
  ];

  const bookIndex = allBooks.indexOf(bookName);

  if (bookIndex === -1) {
    return { error: `Livre ${bookName} non trouvé dans les deux testaments` };
  }

  // Obtenir les noms des livres précédent, courant et suivant
  const previousBook = bookIndex > 0 ? allBooks[bookIndex - 1] : null;
  const nextBook = bookIndex < allBooks.length - 1 ? allBooks[bookIndex + 1] : null;

  // Obtenir les contenus des livres
  const getContent = (name) => (oldTestament[name] || newTestament[name]) ?? null;

  return {
    current: { name: bookName, content: getContent(bookName) },
    previous: previousBook ? { name: previousBook, content: getContent(previousBook) } : null,
    next: nextBook ? { name: nextBook, content: getContent(nextBook) } : null
  };
};

exports.renderBook = (content) => {
  const container = document.getElementById('book-content');
  for (const [chapter, verses] of Object.entries(content)) {
    const chapterTitle = document.createElement('h2');
    chapterTitle.textContent = chapter;
    chapterTitle.classList.add('chapter-title');
    container.appendChild(chapterTitle);

    for (const [verseNumber, verseText] of Object.entries(verses[1])) {
      const verseElement = document.createElement('p');
      verseElement.classList.add('verse');
      verseElement.innerHTML = `<span class="verse-number">${verseNumber}</span>${verseText}`;
      container.appendChild(verseElement);
    }
  }
};

exports.getRandomBook = () => {
  const books = exports.getBookNames();
  const randomIndex = Math.floor(Math.random() * books.length);
  return books[randomIndex];
};

exports.capitalizeFirstLetter = (str) => {
  if (!str) return '';
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

exports.copyToClipboard = (text) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      message.open({
        content: 'Copié dans le presse-papiers !'
      });
    });
  }
};

exports.getSongsByCategory = (category) => fihirana[0][category]?.map(({ index, numero, title }) => ({ index, numero, title })) || [];

exports.getLyricsByIndex = (index, category) => {
  const song = fihirana[0][category]?.find((s) => s.index === index);
  return song?.lyrics || [];
};

exports.searchSongs = (keyword, category) => {
  const term = keyword.toLowerCase();
  const songs = fihirana[0][category] || [];

  return songs
    .filter(
      (song) => song.title.toLowerCase().includes(term) ||
        song.numero.toString().includes(term) ||
        song.lyrics.some((line) => line.toLowerCase().includes(term))
    )
    .map(({ index, numero, title }) => ({ index, numero, title }));
};
