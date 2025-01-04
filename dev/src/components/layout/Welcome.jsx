import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Select } from 'antd';
import RenderBook from './RenderBook';
import { getBookNames, getContentsByBookName } from '../../utils/funtcion';

const { Option } = Select;

function Welcome({ themeIsDark }) {
  const bookNames = getBookNames();
  const [filteredBooks, setFilteredBooks] = useState(bookNames);
  const [selectedBook, setSelectedBook] = useState('Matio');
  const [content, setContent] = useState(null);

  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase();
    const sortedBooks = bookNames
      .filter((book) => book.toLowerCase().includes(searchTerm))
      .sort((a, b) => {
        const aStarts = a.toLowerCase().startsWith(searchTerm);
        const bStarts = b.toLowerCase().startsWith(searchTerm);
        return aStarts === bStarts ? 0 : aStarts ? -1 : 1;
      });
    setFilteredBooks(sortedBooks);
  };

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
          <header className='p-4 hidden'>
            <Select
              allowClear
              showSearch
              placeholder='Livre'
              style={{ width: 200 }}
              size='large'
              onSearch={handleSearch}
              onChange={setSelectedBook}
              filterOption={false}
            >
              {filteredBooks.map((book) => (
                <Option key={book} value={book}>
                  {book}
                </Option>
              ))}
            </Select>
          </header>
          <main className='px-6'>
            <RenderBook bookContent={content} bookName={selectedBook} themeIsDark={themeIsDark} setSelectedBook={setSelectedBook} />
          </main>
        </div>
      </motion.div>
    </section>
  );
}

export default Welcome;
