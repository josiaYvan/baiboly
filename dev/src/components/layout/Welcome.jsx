import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RenderBook from './RenderBook';
import { getContentsByBookName } from '../../utils/funtcion';

function Welcome({ themeIsDark }) {
  const [selectedBook, setSelectedBook] = useState('Matio');
  const [content, setContent] = useState(null);

  useEffect(() => {
    setContent(selectedBook ? getContentsByBookName(selectedBook) : null);
  }, [selectedBook]);

  return (
    <section id='home'>
      <motion.div
        className='flex pt-0 flex-col items-center justify-center'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className=''>
          <main className='px-6'>
            <RenderBook bookContent={content} bookName={selectedBook} themeIsDark={themeIsDark} setSelectedBook={setSelectedBook} />
          </main>
        </div>
      </motion.div>
    </section>
  );
}

export default Welcome;
