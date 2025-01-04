/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import { Empty, Input, Tooltip } from 'antd';
import { motion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { myStyle } from '../../utils/style';
import { getBookNames, getChaptersByBookName, searchVerse } from '../../utils/funtcion';

function Menu({
  bookName, activeChapter, onBookSelect, setActiveChapter, setSearchResults, setSearchKey
}) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [chapter, setChapter] = useState([]);
  const [popup, setPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuTitle, setMenuTitle] = useState(bookName);
  const [filteredBooks, setFilteredBooks] = useState(getBookNames());
  const bookNames = getBookNames();
  const menuRef = useRef(null);

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

  useEffect(() => {
    setMenuTitle(bookName);
  }, [bookName]);

  const handleSelect = (book) => {
    setSearchResults(null);
    if (selectedBook === book) {
      setSelectedBook(null); // Désélectionner le livre si déjà sélectionné
      setChapter([]); // Effacer les chapitres
    } else {
      setSelectedBook(book); // Sélectionner un nouveau livre
      onBookSelect(book); // Décommenter si nécessaire
      setChapter(getChaptersByBookName(book)); // Récupérer les chapitres du livre sélectionné
    }
  };

  const handleSetActiveChapter = (n) => {
    setActiveChapter(n);
    setPopup(false);
  };

  const handleBook = () => {
    setSelectedBook(null);
    setPopup(true);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredBooks(
      bookNames.filter((book) => book.toLowerCase().includes(value))
    );
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setPopup(false); // Fermer le menu si le clic est à l'extérieur
    }
  };

  const handleConcordanse = () => {
    if (searchTerm) {
      const results = searchVerse(searchTerm);
      setSearchResults(results);
      setMenuTitle(`${results.length} référence${results.length > 1 ? 's' : ''}`);
      setSearchKey(searchTerm);
      setPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') handleConcordanse();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => { window.removeEventListener('keydown', handleKeyPress); };
  }, [searchTerm]);

  return (
    <div ref={menuRef} className='z-20 fixed bottom-8 left-1/2 transform -translate-x-1/2 w-72'>
      <motion.div
        className='p-2 rounded-full flex justify-around items-center backdrop-blur-md shadow-lg'
        style={{ backgroundColor: myStyle.yellowDark }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={handleBook}
          variants={textVariants}
          whileHover='hover'
          whileTap='tap'
          initial='initial'
          className='cursor-pointer text-center text-white text-lg font-semibold'
          aria-expanded={selectedBook ? 'true' : 'false'}
          aria-label='Select Book'
        >
          {menuTitle ? `${menuTitle}${!menuTitle.includes('référence') && activeChapter ? ` ${activeChapter}` : ''}` : 'Select Book'}
        </motion.button>

        {popup && (
          <motion.div
            className='absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg shadow-lg max-h-80 overflow-y-auto'
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={containerVariants}
          >
            {/* Barre de recherche */}
            <div className='p-2 sticky top-0 bg-white z-10'>
              <Input
                type='text'
                value={searchTerm}
                onChange={handleSearch}
                placeholder='Rechercher ici...'
                allowClear
                variant='filled'
                suffix={<Tooltip title='Chercher dans la concordance'><SearchOutlined onClick={handleConcordanse} /></Tooltip>}
                className='w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-yellow-300'
              />
            </div>

            <motion.ul>
              {filteredBooks.length > 0 ? filteredBooks.map((book) => (
                <motion.li
                  key={book}
                  className='px-2 text-gray-800'
                  variants={itemVariants}
                >
                  <div>
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
                        {chapter.map((n) => (
                          <button
                            key={n}
                            className={`w-full h-8 rounded-lg border flex justify-center items-center cursor-pointer hover:bg-gray-100 ${
                              activeChapter === n ? 'bg-yellow-200' : ''
                            }`}
                            onClick={() => handleSetActiveChapter(n)}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.li>
              )) : (
                <Empty
                  className='my-10'
                  description={(<span>Aucun résultat ...</span>)}
                />
              )}
              <button
                onClick={handleConcordanse}
                className='m-4 px-4 py-2 text-sm bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-200'
              >
                Chercher dans la concordance
              </button>
            </motion.ul>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Menu;
