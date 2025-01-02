/* eslint-disable import/no-extraneous-dependencies */
import { motion } from 'framer-motion';
import React from 'react';
import { myStyle } from '../../utils/style';

function Menu({ bookName, activeChapter }) {
  const handleScroll = (id) => {
    if (id === 'home') {
      // Défile vers le haut de la page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const textVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2 },
    tap: { scale: 0.9 }
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
        {/* Afficher le nom du livre */}
        <motion.button
          onClick={() => handleScroll('home')}
          variants={textVariants}
          whileHover='hover'
          whileTap='tap'
          initial='initial'
          className='cursor-pointer text-white text-lg font-semibold'
        >
          {bookName}
          {' '}
          {activeChapter}
        </motion.button>

      </motion.div>
    </div>
  );
}

export default Menu;
