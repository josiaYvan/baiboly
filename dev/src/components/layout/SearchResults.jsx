/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { Empty } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { myStyle } from '../../utils/style';

function SearchResults({
  themeIsDark, results, searchKey, setSelectedBook, setSearchResults, setActiveChapter, scrollToVerse, setActiveVerse, fontSize
}) {
  const highlightText = (text) => {
    if (!searchKey) return text;
    const parts = text.split(new RegExp(`(${searchKey})`, 'gi'));
    return parts.map((part, index) => (
      part.toLowerCase() === searchKey.toLowerCase() ?
        <strong className='text-blue-500' key={index}>{part}</strong> :
        part
    ));
  };

  const selectVerse = useCallback((n) => {
    const verseKey = `${n.chapter}-${n.verse}`;
    setActiveVerse(verseKey);
    setSearchResults(null);
    setSelectedBook(n.book);
    setTimeout(() => { setActiveChapter(n.chapter); }, 30);
    setTimeout(() => { scrollToVerse(verseKey); }, 1000);
  }, [setSearchResults, setSelectedBook, setActiveChapter, scrollToVerse]);

  return (
    <div
      style={{
        backgroundColor: themeIsDark ? myStyle.bg : myStyle.light,
        color: themeIsDark ? myStyle.darkColor : myStyle.brown
      }}
      className='transition duration-500 ease-in-out py-20'
    >
      <div>
        <h1 className='text-center font-semibold my-2'>
          {results.length}
          {' '}
          Reférrences trouvés
        </h1>
        <div className='rounded lora leading-8' style={{ fontSize }}>
          {results.length > 0 ? (
            <div className='grid grid-cols-1'>
              {results.map((item, index) => (
                <div
                  key={index}
                  title={`${item.book} ${item.chapter}:${item.verse}`}
                  className={`${themeIsDark ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} !bg-opacity-5 p-4 border-gray-300 rounded-md`}
                  onClick={() => selectVerse(item)}
                >
                  <p>{highlightText(item.text)}</p>
                  <p className='poppins-semibold text-gray-500 text-sm w-full py-3 cursor-pointer rounded'>
                    {item.book}
                    {' '}
                    {item.chapter}
                    {' '}
                    :
                    {' '}
                    {item.verse}
                    <RightOutlined className='float-right' />
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex justify-center items-center h-64'>
              <Empty description={<span className='text-gray-500'>Aucun résultat trouvé</span>} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
