/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { message, Tooltip } from 'antd';
import { myStyle } from '../../utils/style';

function PaletteColor({ setBackgroundColor, selectedText }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (selectedText) {
      navigator.clipboard.writeText(selectedText).then(() => {
        console.log('Texte copié :', selectedText);
        setIsCopied(true);
        message.success('Verset copié.');
        setTimeout(() => setIsCopied(false), 2000); // Réinitialisation après 2 secondes
      });
    }
  };

  return (
    <div className='flex space-x-2 items-center'>
      <div className='w-5 h-5 rounded-[50%]' onClick={() => setBackgroundColor(myStyle.redGround)} style={{ backgroundColor: myStyle.red }} />
      <div className='w-5 h-5 rounded-[50%]' onClick={() => setBackgroundColor(myStyle.orangeGround)} style={{ backgroundColor: myStyle.orange }} />
      <div className='w-5 h-5 rounded-[50%]' onClick={() => setBackgroundColor(myStyle.yellowGround)} style={{ backgroundColor: myStyle.yellow }} />
      <div className='w-5 h-5 rounded-[50%]' onClick={() => setBackgroundColor(myStyle.brunGround)} style={{ backgroundColor: myStyle.brun }} />
      <div className='w-5 h-5 rounded-[50%]' onClick={() => setBackgroundColor(myStyle.greenGround)} style={{ backgroundColor: myStyle.green }} />
      <div className='w-5 h-5 rounded-[50%]' onClick={() => setBackgroundColor(myStyle.blueGround)} style={{ backgroundColor: myStyle.blue }} />
      <Tooltip title={isCopied ? 'Copié' : 'Copier'}>
        <div onClick={handleCopy} className='w-5 h-5 p-1 flex justify-center items-center text-gray-300 bg-gray-300 bg-opacity-20 rounded-[50%] cursor-pointer'>
          {isCopied ? <CheckOutlined /> : <CopyOutlined />}
        </div>
      </Tooltip>
    </div>
  );
}

export default PaletteColor;
