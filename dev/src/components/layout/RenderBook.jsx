/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, {
  useState, useEffect, useRef, useCallback
} from 'react';
import {
  Tooltip
} from 'antd';
import { LineOutlined, UpOutlined } from '@ant-design/icons';
import { myStyle } from '../../utils/style';
import PaletteColor from './PaletteColor';
import MenuBaiboly from './Menu_baiboly';
import SearchResults from './SearchResults';

export default function RenderBook({
  bookContent, bookName, themeIsDark, setSelectedBook, isActive
}) {
  const [visibleChapters, setVisibleChapters] = useState([1, 2, 3, 4, 5]);
  const [selectedVerses, setSelectedVerses] = useState([]);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState(myStyle.blueGround);
  const [activeChapter, setActiveChapter] = useState(1);
  const [activeVerse, setActiveVerse] = useState(null);
  const containerRef = useRef(null);
  const chapterRefs = useRef(new Map());
  const [searchResults, setSearchResults] = useState(null);
  const [searchKey, setSearchKey] = useState('');

  const [fontSize, setFontSize] = useState(20); // en pixels
  const [fontItalic, setFontItalic] = useState(false);
  const [selectedVerseFontSize, setSelectedVerseFontSize] = useState(false);
  const [selectedVerseFontBold, setSelectedVerseFontBold] = useState(false);

  const [activeVersePositionY, setActiveVersePositionY] = useState(2); // %
  const setLimitedActiveVersePositionY = (delta) => setActiveVersePositionY((prev) => Math.min(Math.max(prev + delta, 1), 6));

  const lineHeight = fontSize < 20 ? 1.5 : fontSize < 28 ? 1.4 : 1.3;
  const padding = (fontSize / 10) + 5;

  const increaseFontSize = () => setFontSize((prev) => (prev < 30 ? prev + 1 : prev));
  const decreaseFontSize = () => setFontSize((prev) => (prev > 16 ? prev - 1 : prev));
  const reinitFontSize = () => setFontSize(20);
  const increaseSelectedVerseFontSize = () => setSelectedVerseFontSize((prev) => !prev);
  const isSelectedVerseFontBold = () => setSelectedVerseFontBold((prev) => !prev);

  const activeRef = useRef(isActive);

  useEffect(() => {
    activeRef.current = isActive;
  }, [isActive]);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current || {};
    if (!scrollTop || !scrollHeight || !clientHeight) return;

    // Load more chapters
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setVisibleChapters((prev) => {
        const nextChapter = Math.max(...prev) + 1;
        return nextChapter <= Object.keys(bookContent || {}).length ?
          [...prev.slice(1), nextChapter] : prev;
      });
    }

    // Scroll up chapters
    if (scrollTop <= 10) {
      setVisibleChapters((prev) => {
        const prevChapter = Math.min(...prev) - 1;
        return prevChapter > 0 ? [prevChapter, ...prev.slice(0, -1)] : prev;
      });
    }

    // Update active chapter
    const active = Array.from(chapterRefs.current.entries()).reduce((acc, [chapter, ref]) => (ref && ref.offsetTop <= scrollTop + clientHeight / 2 ? parseInt(chapter, 10) : acc), activeChapter);

    if (active !== activeChapter) {
      setActiveChapter(active);
    }
  }, [bookContent, activeChapter]);

  const scrollToTop = () => {
    const container = containerRef.current;
    container.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToVerse = useCallback((verseKey, isDown = false) => {
    setSelectedVerse(verseKey);
    const [chapter, verse] = verseKey.split('-');
    const verseElement = document.getElementById(`verse-${chapter}-${verse}`);

    if (verseElement) {
      const { top: verseTop } = verseElement.getBoundingClientRect();
      const container = containerRef.current;

      if (container) {
        const { top: containerTop } = container.getBoundingClientRect();
        const offsetFromTop = activeVersePositionY * 100;
        const targetScrollTop = verseTop + container.scrollTop - containerTop - offsetFromTop;
        container.scrollTo({ top: targetScrollTop });
      }
    }
  }, [activeVersePositionY]);

  const handleKeyDown = useCallback((event) => {
    if (!activeRef.current) return; // ignore les touches si Baiboly n'est pas actif
    if (!bookContent || selectedVerses.length === 0) return;

    const allVerses = Object.entries(bookContent)
      .filter(([chapter]) => visibleChapters.includes(parseInt(chapter, 10)))
      .flatMap(([chapter, verses]) => Object.keys(verses).map((verse) => `${chapter}-${verse}`));

    const currentIndex = allVerses.indexOf(selectedVerses[selectedVerses.length - 1]);
    if (event.key === 'ArrowDown' && currentIndex < allVerses.length - 1) {
      const nextVerse = allVerses[currentIndex + 1];
      setSelectedVerses(event.shiftKey ? [...selectedVerses, nextVerse] : [nextVerse]);
      setTimeout(() => {
        scrollToVerse(nextVerse, true);
      }, 0);
    } else if (event.key === 'ArrowUp' && currentIndex > 0) {
      const previousVerse = allVerses[currentIndex - 1];
      setSelectedVerses(event.shiftKey ? [...selectedVerses, previousVerse] : [previousVerse]);
      setTimeout(() => {
        scrollToVerse(previousVerse);
      }, 0);
    }
  }, [bookContent, selectedVerses, visibleChapters, activeVersePositionY]);

  const handleVerseClick = useCallback((verseKey, event) => {
    setActiveVerse(null);
    if (selectedVerse) setSelectedVerse(null);
    if (event.shiftKey && selectedVerses.length > 0) {
      const allVerses = visibleChapters.flatMap((chapter) => Object.keys(bookContent[chapter] || {}).map((verse) => `${chapter}-${verse}`));
      const start = allVerses.indexOf(selectedVerses[0]);
      const end = allVerses.indexOf(verseKey);
      if (start !== -1 && end !== -1) {
        const range = allVerses.slice(Math.min(start, end), Math.max(start, end) + 1);
        setSelectedVerses(range);
      }
    } else {
      setSelectedVerses((prev) => (
        prev.includes(verseKey) ? prev.filter((v) => v !== verseKey) : [verseKey]
      ));
    }
  }, [visibleChapters, selectedVerses, bookContent, selectedVerse]);

  const changeActiveChapter = useCallback((newChapter) => {
    const chapterNumber = Number(newChapter);
    const totalChapters = Object.keys(bookContent).length;

    if (chapterNumber >= 1 && chapterNumber <= totalChapters) {
      const newVisibleChapters = chapterNumber <= 3 ?
        [1, 2, 3, 4, 5] :
        chapterNumber >= totalChapters - 2 ?
          Array.from({ length: 5 }, (_, i) => totalChapters - 4 + i) :
          Array.from({ length: 5 }, (_, i) => chapterNumber - 2 + i);

      setVisibleChapters(newVisibleChapters);
      setTimeout(() => {
        const chapterElement = chapterRefs.current.get(String(chapterNumber));
        if (chapterElement) {
          chapterElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
    }
  }, [bookContent]);

  useEffect(() => {
    containerRef.current?.addEventListener('scroll', handleScroll);
    return () => containerRef.current?.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      ref={containerRef}
      className='h-screen overflow-y-scroll hidden-scrollbar relative px-4 rounded-lg transition duration-500 ease-in-out'
      aria-label='Book content container'
      style={{
        backgroundColor: themeIsDark ? myStyle.bg : myStyle.light
      }}
    >
      {searchResults && (
        <SearchResults
          themeIsDark={themeIsDark}
          results={searchResults}
          searchKey={searchKey}
          setSelectedBook={setSelectedBook}
          setSearchResults={setSearchResults}
          setActiveChapter={changeActiveChapter}
          scrollToVerse={scrollToVerse}
          setActiveVerse={setActiveVerse}
          fontSize={fontSize}
        />
      )}
      {!searchResults && bookContent && Object.entries(bookContent)
        .filter(([chapter]) => visibleChapters.includes(parseInt(chapter, 10)))
        .map(([chapter, verses]) => (
          <div
            id={`chapter-${chapter}`}
            ref={(el) => chapterRefs.current.set(chapter, el)}
            key={chapter}
            className='pt-20'
          >
            {chapter === '1' && (
              <p className='text-center lora-bold text-2xl font-semibold text-gray-500'>{bookName}</p>
            )}
            <h3 className='text-4xl md:text-7xl mb-6 lora-bold text-center'>{chapter}</h3>
            <LineOutlined className='fixed left-4 text-gray-500' style={{ fontSize: 16, top: activeVersePositionY * 110 }} />
            {Object.entries(verses).map(([verse, text]) => {
              const verseKey = `${chapter}-${verse}`;
              return (
                <Tooltip
                  key={verse}
                  title={(
                    <PaletteColor
                      setBackgroundColor={setBackgroundColor}
                      increaseFontSize={increaseSelectedVerseFontSize}
                      selectedVerseFontBold={isSelectedVerseFontBold}
                      selectedText={selectedVerses.map((v) => {
                        const [c, r] = v.split('-');
                        return `${bookName} ${c}-${r} ${bookContent[c][r]}\n`;
                      }).join('')}
                    />
)}
                  trigger='contextMenu'
                >
                  <p
                    id={`verse-${chapter}-${verse}`}
                    className={`relative mt-1 rounded lora cursor-pointer !bg-opacity-5 
                      ${selectedVerses.includes(verseKey) ? 'bg-yellow-300' : themeIsDark ? 'hover:bg-gray-100' : 'hover:bg-gray-900'}
                      ${selectedVerses.includes(verseKey) && selectedVerseFontBold ? '!font-semibold' : ''} 
                      ${activeVerse && (verseKey === activeVerse ? 'lora-semibold' : '')}`}
                    style={{
                      backgroundColor: selectedVerses.includes(verseKey) && backgroundColor,
                      color: activeVerse ?
                        (verseKey === activeVerse ? myStyle.blue : myStyle.hide) :
                        (selectedVerse && (verseKey === selectedVerse ? themeIsDark ? myStyle.darkColor : myStyle.brown : myStyle.hide)),
                      fontSize: (selectedVerses.includes(verseKey) && selectedVerseFontSize) ? 30 : fontSize,
                      fontStyle: fontItalic && 'italic',
                      lineHeight,
                      padding
                    }}
                    onClick={(event) => handleVerseClick(verseKey, event)}
                  >
                    <b>
                      <sup className='relative text-xs -top-1'>{verse}</sup>
                      {' '}
                    </b>
                    {text}
                  </p>
                </Tooltip>
              );
            })}
            <UpOutlined onClick={scrollToTop} className='fixed bottom-9 right-10 p-4 text-white rounded-full flex justify-around items-center backdrop-blur-lg shadow' style={{ backgroundColor: myStyle.yellowPhantom }} />
          </div>
        ))}
      <MenuBaiboly
        bookName={bookName}
        activeChapter={activeChapter}
        onBookSelect={setSelectedBook}
        setActiveChapter={changeActiveChapter}
        setSearchResults={setSearchResults}
        setSearchKey={setSearchKey}
        setActiveVerse={setActiveVerse}
        increaseFontSize={increaseFontSize}
        decreaseFontSize={decreaseFontSize}
        reinitFontSize={reinitFontSize}
        setFontItalic={setFontItalic}
        setActiveVersePositionY={setLimitedActiveVersePositionY}
      />
    </div>
  );
}
