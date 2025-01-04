/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { Empty } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { myStyle } from '../../utils/style';

function SearchResults({ themeIsDark, results }) {
  return (
    <div
      style={{
        backgroundColor: themeIsDark ? myStyle.bg : myStyle.light,
        color: themeIsDark ? myStyle.darkColor : myStyle.brown
      }}
      className='transition duration-500 ease-in-out '
    >
      <div>
        <h1 className='text-center font-semibold my-2'>
          Résultats de recherche
        </h1>
        <div className='rounded text-lg lora leading-8'>
          {results.length > 0 ? (
            <div className='grid grid-cols-1 '>
              {results.map((item, index) => (
                <div
                  key={index}
                  title={`${item.book} ${item.chapter}:${item.verse}`}
                  className={`${themeIsDark ? 'hover:bg-gray-100' : 'hover:bg-gray-900'} !bg-opacity-5 p-4 border-gray-300 rounded-md`}
                >
                  <p>
                    {item.text}
                    {' '}
                  </p>
                  <p className='poppins-semibold text-sm w-full py-3 cursor-pointer rounded'>
                    {item.book}
                    {' '}
                    {item.chapter}
                    {' : '}
                    {item.verse}
                    <RightOutlined className='float-right' />
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex justify-center items-center h-64'>
              <Empty description='Aucun résultat trouvé' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
