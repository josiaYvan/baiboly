/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { myStyle } from '../../utils/style';
import { getBookNames, getChaptersByBookName } from '../../utils/funtcion';

function Menu({
  bookName, activeChapter, onBookSelect
}) {
  const [selectedBook, setSelectedBook] = useState(null); // Stocker le livre sélectionné
  const [chapter, setChapter] = useState([]);
  const bookNames = getBookNames();

  const textVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const handleSelect = (book) => {
    if (selectedBook === book) {
      setSelectedBook(null); // Désélectionner le livre si déjà sélectionné
      setChapter([]); // Effacer les chapitres
    } else {
      setSelectedBook(book); // Sélectionner un nouveau livre
      setChapter(getChaptersByBookName(book)); // Récupérer les chapitres du livre sélectionné
      onBookSelect(book); // Commenté, décommenter si nécessaire
    }
  };

  return (
    <div className='z-20 fixed bottom-8 left-1/2 transform -translate-x-1/2 w-60'>
      <motion.div
        className='p-2 rounded-full flex justify-around items-center backdrop-blur-md shadow-lg'
        style={{ backgroundColor: myStyle.yellowDark }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Afficher le nom du livre/chapitre ou liste des livres */}
        <motion.button
          onClick={() => setSelectedBook(null)} // Fermer la liste des livres sans sélection
          variants={textVariants}
          whileHover='hover'
          whileTap='tap'
          initial='initial'
          className='cursor-pointer text-center text-white text-lg font-semibold'
          aria-expanded={selectedBook ? 'true' : 'false'}
          aria-label='Select Book'
        >
          {selectedBook ? `${bookName}  ${activeChapter}` : 'Select Book'}
        </motion.button>

        <motion.ul
          className='absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto'
          initial='hidden'
          animate='visible'
          exit='hidden'
          variants={containerVariants}
        >
          {bookNames.map((book) => (
            <motion.li
              key={book}
              className='px-2 text-gray-800 '
              variants={itemVariants}
            >
              <div className=''>
                <div
                  onClick={() => handleSelect(book)}
                  className={`hover:bg-gray-100 cursor-pointer p-2 rounded-lg ${
                    selectedBook === book ? 'font-semibold' : ''
                  }`}
                >
                  {book}
                </div>
                {/* Affichage des chapitres uniquement si le livre est sélectionné */}
                {selectedBook === book && chapter.length > 0 && (
                  <div className='grid grid-cols-5 gap-2 mt-2 px-2'>
                    {chapter.map((n, idx) => (
                      <div key={idx} className='w-full h-8 rounded-lg border flex justify-center items-center'>
                        {n}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}

export default Menu;
