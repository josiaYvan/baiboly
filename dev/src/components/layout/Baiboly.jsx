import React, { useEffect, useState } from 'react';
import RenderBook from './RenderBook';
import { getContentsByBookName, getRandomBook } from '../../utils/funtcion';

function Baiboly({ themeIsDark, isActive }) {
  const randomBook = getRandomBook();
  const [selectedBook, setSelectedBook] = useState(randomBook);
  const [content, setContent] = useState(null);

  useEffect(() => {
    setContent(selectedBook ? getContentsByBookName(selectedBook) : null);
  }, [selectedBook]);

  return (
    <section id='home'>
      <div
        className='flex pt-0 flex-col items-center justify-center'
      >
        <div className=''>
          <main className='px-6'>
            <RenderBook bookContent={content} bookName={selectedBook} themeIsDark={themeIsDark} setSelectedBook={setSelectedBook} isActive={isActive} />
          </main>
        </div>
      </div>
    </section>
  );
}

export default Baiboly;
