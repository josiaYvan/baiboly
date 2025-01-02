/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseOutlined } from '@ant-design/icons';
import { myStyle } from '../../utils/style';

function Popup({
  showPopup, selectedItem, onClose, themeIsDark, label
}) {
  const popupRef = useRef(null);

  if (!showPopup || !selectedItem) return null; // Sécurité

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed z-20 inset-0 bg-black bg-opacity-60 flex justify-center items-center'
      >
        <div
          ref={popupRef}
          className='p-16 rounded-3xl shadow-lg max-w-lg w-full relative'
          style={{ backgroundColor: themeIsDark ? myStyle.bg : myStyle.white }}
        >
          {/* Bouton de fermeture */}
          <button
            onClick={onClose}
            className='absolute top-6 right-7 text-yellow-500'
          >
            <CloseOutlined />
          </button>

          {/* Titre et informations */}
          <h3 className='text-xl text-yellow-500 text-center font-medium mb-4'>
            {selectedItem.title}
          </h3>
          <p className='text-gray-500 text-sm text-center'>{selectedItem.description}</p>
          {selectedItem.duration && (
            <p className='text-gray-500 text-xs text-center'>{selectedItem.duration}</p>
          )}

          {/* Liste des tâches */}
          <div className='mt-4'>
            <h4 className='font-medium'>{label}</h4>
            <ul className='pl-5 mt-4'>
              {selectedItem.tasks.map((task, index) => (
                <li key={index} className='text-gray-500 flex text-sm mt-2'>
                  <span className='text-yellow-500 mr-4'>✔</span>
                  <p>{task}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Popup;
