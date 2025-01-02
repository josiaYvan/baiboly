const { baiboly } = require('./db');

/* eslint-disable no-restricted-syntax */
exports.getBookNames = () => {
  const books = [];
  for (const testament of Object.values(baiboly[0])) {
    books.push(...Object.keys(testament));
  }
  return books;
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
