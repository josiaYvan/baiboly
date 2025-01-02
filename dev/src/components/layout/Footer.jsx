/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import React from 'react';
import { myStyle } from '../../utils/style';

function Footer({ themeIsDark }) {
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

  return (
    <footer className='relative w-full pb-32 bg-yellow-50'>
      <div className='absolute -top-7 w-full z-10 h-10 transition-colors duration-500 ease-in-out' style={{ backgroundColor: themeIsDark ? myStyle.bg : myStyle.light }} />
      <div className='z-0'>
        <svg
          viewBox='0 0 1440 320'
          style={{ filter: 'drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.5))' }}
        >
          <path
            fill={themeIsDark ? myStyle.bg : myStyle.light}
            fillOpacity='1'
            className='transition-colors duration-500 ease-in-out'
            d='M0,32L21.8,53.3C43.6,75,87,117,131,122.7C174.5,128,218,96,262,80C305.5,64,349,64,393,101.3C436.4,139,480,213,524,218.7C567.3,224,611,160,655,138.7C698.2,117,742,139,785,138.7C829.1,139,873,117,916,138.7C960,160,1004,224,1047,256C1090.9,288,1135,288,1178,266.7C1221.8,245,1265,203,1309,181.3C1352.7,160,1396,160,1418,160L1440,160L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z'
          />
        </svg>
      </div>
      <div className='relative flex flex-col items-center text-center'>
        <button
          onClick={() => handleScroll('home')}
          className='text-3xl font-medium text-yellow-500'
        >
          by Josia Y.
        </button>
        <nav className='mt-4'>
          <button
            onClick={() => handleScroll('about')}
            className='mx-3 text-gray-600 hover:text-gray-800'
          >
            À propos
          </button>
          <button
            onClick={() => handleScroll('projects')}
            className='mx-3 text-gray-600 hover:text-gray-800'
          >
            Portfolio
          </button>
        </nav>
        <p className='mt-4 text-gray-500 text-sm'>© Josiayvan.com. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
