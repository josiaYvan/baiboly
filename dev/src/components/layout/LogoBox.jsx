/**
 * @name Bus'nay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan.  All rights reserved.
 * @version v0.0.1
 *
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoBox() {
  const navigate = useNavigate();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className='logo-box pt-10 px-6'
      onClick={() => navigate('/')}
    >
      <img
        className='filter grayscale w-[100%] h-auto'
        src='/logo.png'
        crossOrigin='anonymous'
        alt='avatar-img'
      />
      <div className='flex-grow border-t border-[1px] mt-10 md:mt-20 border-gray-200' />
    </div>
  );
}

export default LogoBox;
