/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Divider, Empty, Input, Tooltip
} from 'antd';
import { motion } from 'framer-motion';
import React, {
  useState, useRef, useEffect, useCallback, useMemo
} from 'react';
import {
  CaretDownFilled,
  CaretUpFilled,
  FontSizeOutlined,
  ItalicOutlined, PicCenterOutlined, ReloadOutlined, SearchOutlined, SettingOutlined
} from '@ant-design/icons';
import { myStyle } from '../../utils/style';
import { getBookNames, getChaptersByBookName, searchVerse } from '../../utils/funtcion';

function MenuBaiboly({
  bookName, activeChapter, onBookSelect, setSelectedVerse, setActiveChapter, setSearchResults, setSearchKey, setActiveVerse, decreaseFontSize, increaseFontSize, reinitFontSize, setFontItalic, setActiveVersePositionY
}) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [chapter, setChapter] = useState([]);
  const [popup, setPopup] = useState(false);
  const [settingPopup, setSettingPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuTitle, setMenuTitle] = useState(bookName);
  const menuRef = useRef(null);
  const bookNames = useMemo(() => getBookNames(), []);

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

  const handleSelect = useCallback((book) => {
    setActiveVerse(null);
    setSearchResults(null);
    if (selectedBook === book) {
      setSelectedBook(null);
      setChapter([]);
    } else {
      setSelectedBook(book);
      setActiveChapter(1);
      setSelectedVerse(null);
      onBookSelect(book);
      setChapter(getChaptersByBookName(book));
    }
  }, [selectedBook, onBookSelect, setSearchResults]);

  const handleSetActiveChapter = useCallback((n) => {
    setActiveChapter(n);
    setPopup(false);
  }, [setActiveChapter]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const showPopup = () => {
    setPopup(true);
    setSettingPopup(false);
  };

  const showSettingPopup = () => {
    setSettingPopup(true);
    setPopup(false);
  };

  const filteredBooks = useMemo(() => bookNames.filter((book) => book.toLowerCase().includes(searchTerm)), [bookNames, searchTerm]);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setPopup(false);
      setSettingPopup(false);
    }
  };

  const handleConcordance = useCallback(() => {
    setActiveVerse(null);
    if (searchTerm) {
      const results = searchVerse(searchTerm);
      setSearchResults(results);
      setMenuTitle(`${results.length} référence${results.length > 1 ? 's' : ''}`);
      setSearchKey(searchTerm);
      setPopup(false);
    }
  }, [searchTerm, setSearchResults, setMenuTitle, setSearchKey]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') handleConcordance();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleConcordance]);

  return (
    <div ref={menuRef} className='z-20 fixed bottom-8 left-1/2 transform -translate-x-1/2 w-72'>
      <motion.div
        className='p-3 rounded-full flex justify-center items-center backdrop-blur-md shadow-lg'
        style={{ backgroundColor: myStyle.yellowDark }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={showPopup}
          variants={textVariants}
          whileHover='hover'
          whileTap='tap'
          initial='initial'
          className='cursor-pointer text-center text-white text-lg font-semibold'
          aria-expanded={selectedBook ? 'true' : 'false'}
          aria-label='Select Book'
        >
          {menuTitle ?
            `${menuTitle}${!menuTitle.includes('référence') && activeChapter ? ` ${activeChapter}` : ''}` :
            'Select Book'}
        </motion.button>

        <SettingOutlined className='absolute right-5 text-white' onClick={showSettingPopup} />
        {settingPopup && (
          <motion.div
            className='absolute bottom-full mb-2 p-1 bg-white rounded-lg shadow-lg max-h-80 w-96 overflow-y-auto flex gap-2 justify-center items-center text-gray-700'
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={containerVariants}
          >
            <p className='m-1 italic'><FontSizeOutlined /></p>
            <div className='p-1 flex gap-2 rounded border'>
              <button onClick={decreaseFontSize} className='px-1 rounded bg-gray-300'>
                A
                <sup>-</sup>
              </button>
              <button onClick={reinitFontSize} className='px-1 rounded bg-gray-300'><ReloadOutlined /></button>
              <button onClick={increaseFontSize} className='px-1 rounded bg-gray-300'>
                A
                <sup>+</sup>
              </button>
            </div>
            <Divider type='vertical' />
            <button className='px-1 rounded bg-gray-300' onClick={() => setFontItalic((prev) => !prev)}>
              <ItalicOutlined />
            </button>
            <Divider type='vertical' />
            <p className='m-1 italic'><PicCenterOutlined /></p>
            <div className='p-1 flex gap-2 rounded border'>
              <button onClick={() => setActiveVersePositionY(+0.5)} className='px-1 rounded bg-gray-300'><CaretUpFilled /></button>
              <button onClick={() => setActiveVersePositionY(-0.5)} className='px-1 rounded bg-gray-300'><CaretDownFilled /></button>
            </div>

          </motion.div>
        )}
        {popup && (
          <motion.div
            className='absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg shadow-lg max-h-80 overflow-y-auto'
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={containerVariants}
          >
            <div className='p-2 sticky top-0 bg-white z-10'>
              <Input
                type='text'
                value={searchTerm}
                onChange={handleSearch}
                placeholder='Rechercher ici...'
                allowClear
                variant='filled'
                suffix={<Tooltip title='Chercher dans la concordance'><SearchOutlined onClick={handleConcordance} /></Tooltip>}
                className='w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-yellow-300'
              />
            </div>

            <motion.ul>
              {filteredBooks.length > 0 ? filteredBooks.map((book) => (
                <motion.li key={book} className='px-2 text-gray-800' variants={itemVariants}>
                  <div>
                    <div
                      onClick={() => handleSelect(book)}
                      className={`hover:bg-gray-100 cursor-pointer p-2 rounded-lg ${selectedBook === book ? 'font-semibold' : ''}`}
                    >
                      {book}
                    </div>
                    {selectedBook === book && chapter.length > 0 && (
                      <div className='grid grid-cols-5 gap-2 mt-2 px-4'>
                        {chapter.map((n) => (
                          <button
                            key={n}
                            className={`w-full h-10 rounded-lg border flex justify-center items-center cursor-pointer hover:bg-gray-100 ${activeChapter === n ? 'bg-yellow-200' : ''}`}
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
                <Empty className='my-5' description={<span>Aucun résultat ...</span>} />
              )}
              <button
                onClick={handleConcordance}
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

export default MenuBaiboly;
