import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  window.document.title = 'Portfolio — Error';

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <Result
        className='font-text-font font-medium'
        status='404'
        title='404 - Error Page!'
        subTitle='Sorry, the page you visited does not exist.'
        extra={(
          <Link to='/'>
            <Button
              className='login-form-button bg-blue-500 px-20 py-6 rounded-[2rem] font-semibold text-white mt-10'
              type='link'
              shape='round'
              size='large'
            >
              Back to Home
            </Button>
          </Link>
        )}
      />
    </div>
  );
}

export default NotFound;
