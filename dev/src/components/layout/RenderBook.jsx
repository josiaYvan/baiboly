/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, {
  useState, useEffect, useRef, useCallback
} from 'react';
import { Tooltip } from 'antd';
import { myStyle } from '../../utils/style';
import PaletteColor from './PaletteColor';
import Menu from './Menu';
import SearchResults from './SearchResults';

export default function RenderBook({
  bookContent, bookName, themeIsDark, setSelectedBook
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

  const scrollToVerse = useCallback((verseKey) => {
    setSelectedVerse(verseKey);
    const [chapter, verse] = verseKey.split('-');
    const verseElement = document.getElementById(`verse-${chapter}-${verse - 1}`);
    if (verseElement) {
      verseElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (!bookContent || selectedVerses.length === 0) return;

    const allVerses = Object.entries(bookContent)
      .filter(([chapter]) => visibleChapters.includes(parseInt(chapter, 10)))
      .flatMap(([chapter, verses]) => Object.keys(verses).map((verse) => `${chapter}-${verse}`));

    const currentIndex = allVerses.indexOf(selectedVerses[selectedVerses.length - 1]);
    if (event.key === 'ArrowDown' && currentIndex < allVerses.length - 1) {
      const nextVerse = allVerses[currentIndex + 1];
      setSelectedVerses(event.shiftKey ? [...selectedVerses, nextVerse] : [nextVerse]);
      setTimeout(() => {
        scrollToVerse(nextVerse);
      }, 0);
      console.log('line:78 nextVerse\n---> ', nextVerse);
    } else if (event.key === 'ArrowUp' && currentIndex > 0) {
      const previousVerse = allVerses[currentIndex - 1];
      setSelectedVerses(event.shiftKey ? [...selectedVerses, previousVerse] : [previousVerse]);
      setTimeout(() => {
        scrollToVerse(previousVerse);
      }, 0);
    }
  }, [bookContent, selectedVerses, visibleChapters]);

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
      className='h-[93vh] overflow-y-scroll hidden-scrollbar relative px-4 rounded-lg'
      aria-label='Book content container'
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
        />
      )}
      {!searchResults && bookContent && Object.entries(bookContent)
        .filter(([chapter]) => visibleChapters.includes(parseInt(chapter, 10)))
        .map(([chapter, verses]) => (
          <div
            id={`chapter-${chapter}`}
            ref={(el) => chapterRefs.current.set(chapter, el)}
            key={chapter}
            className='my-8'
          >
            {chapter === '1' && (
              <p className='text-center lora-bold text-2xl font-semibold text-gray-500'>{bookName}</p>
            )}
            <h3 className='text-4xl md:text-7xl mb-6 lora-bold text-center'>{chapter}</h3>
            {Object.entries(verses).map(([verse, text]) => {
              const verseKey = `${chapter}-${verse}`;
              return (
                <Tooltip
                  key={verse}
                  title={(
                    <PaletteColor
                      setBackgroundColor={setBackgroundColor}
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
                    className={`relative mt-1 px-2 rounded text-lg lora leading-8 cursor-pointer !bg-opacity-5 transition-all ${
                      selectedVerses.includes(verseKey) ? 'bg-yellow-300' : themeIsDark ? 'hover:bg-gray-100' : 'hover:bg-gray-900'
                    } ${activeVerse && (verseKey === activeVerse ? 'lora-semibold' : '')}`}
                    style={{ backgroundColor: selectedVerses.includes(verseKey) && backgroundColor, color: activeVerse ? (verseKey === activeVerse ? myStyle.blue : myStyle.hide) : (selectedVerse && (verseKey === selectedVerse ? themeIsDark ? myStyle.darkColor : myStyle.brown : myStyle.hide)) }}
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
          </div>
        ))}
      <Menu
        bookName={bookName}
        activeChapter={activeChapter}
        onBookSelect={setSelectedBook}
        setActiveChapter={changeActiveChapter}
        setSearchResults={setSearchResults}
        setSearchKey={setSearchKey}
        setActiveVerse={setActiveVerse}
      />
    </div>
  );
}
