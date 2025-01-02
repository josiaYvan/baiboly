/* eslint-disable react/button-has-type */
import { GithubFilled, LinkedinFilled } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { myStyle } from '../../utils/style';

function LinkedIn({ themeIsDark }) {
  return (
    <div className='absolute left-12 lg:left-20 bottom-20 lg:bottom-40 flex flex-col space-y-2 items-center'>
      <Link to='https://github.com/josiaYvan/' target='_blank'>
        <button className='flex justify-center items-center w-8 lg:w-10 h-8 lg:h-10 rounded shadow-md backdrop-blur-md' style={{ backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white }}>
          <GithubFilled className='text-yellow-500' style={{ color: !themeIsDark && myStyle.brown }} />
        </button>
      </Link>
      <Link to='https://linkedin.com/in/josia-yvan/' target='_blank'>
        <button className='flex justify-center items-center w-8 lg:w-10 h-8 lg:h-10 rounded shadow-md backdrop-blur-md' style={{ backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white }}>
          <LinkedinFilled className='text-yellow-500' style={{ color: !themeIsDark && myStyle.brown }} />
        </button>
      </Link>
      <div className='w-[2px] h-12 lg:h-16  bg-yellow-500' style={{ backgroundColor: !themeIsDark && myStyle.brown }} />
    </div>
  );
}

export default LinkedIn;
