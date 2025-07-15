/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { myStyle } from '../../utils/style';
import Popup from './Popup';
import { experiences as items } from '../../utils/data';

function Experiences({ themeIsDark }) {
  const [activeTab, setActiveTab] = useState('Tous');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[0]);

  // Définition des tabs
  const tabs = [
    { name: 'Pro' },
    { name: 'Tous' },
    { name: 'Formations' }
  ];

  // Filtrage des items en fonction du tab actif
  const filteredItems = activeTab === 'Tous' ? items : items.filter((item) => item.tag === activeTab);

  // Ouvrir le popup et définir l'élément sélectionné
  const openPopup = (item) => {
    setSelectedItem(item); // Mettre l'élément sélectionné
    setShowPopup(true); // Ouvrir le popup
  };

  return (
    <section id='skills' className='mt-20 lg:mt-36'>
      <div className='flex flex-col items-center'>
        <p className='text-gray-400 text-xs'>Mon expérience</p>
        <h1 className='font-medium text-2xl text-yellow-500'>Mon parcours</h1>
      </div>
      <div className='mt-5 lg:mt-10 rounded-lg'>
        <div className='px-4 p-8'>
          {/* Tabs */}
          <div className='flex justify-center space-x-8'>
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={`px-8 py-2 text-lg border rounded-xl ${
                  activeTab === tab.name ?
                    'bg-yellow-500 border-transparent' :
                    'border-yellow-500 !text-yellow-500'
                } transition duration-300`}
                style={{ color: themeIsDark ? myStyle.bg : myStyle.white }}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Cards */}
          <AnimatePresence mode='popLayout'>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-2 mt-8 px-4 lg:px-20 lg:mt-20'>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={index} // Utilisez une clé unique basée sur le titre
                  initial={{ opacity: 0, scale: 0.5 }} // Animation d'apparition
                  animate={{ opacity: 1, scale: 1 }} // État final (taille normale)
                  transition={{ duration: 0.5 }} // Durée de l'animation
                  className='p-10 lg:m-3 rounded-2xl shadow-[0_0px_10px_rgba(0,0,0,0.25)]'
                  style={{
                    backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white
                  }}
                >
                  <h3 className='mb-2 font-medium'>{item.title}</h3>
                  <p className='text-gray-500 text-xs mb-4'>{item.description}</p>
                  {item.duration && (
                    <p className='text-gray-500 text-xs -mt-2 mb-4'>{item.duration}</p>
                  )}
                  <button
                    onClick={() => openPopup(item)} // Ouvrir le popup avec l'élément sélectionné
                    className='text-yellow-500 flex items-center text-xs group'
                  >
                    <p>Voir plus</p>
                    <span className='ml-1 group-hover:ml-3 transition-all duration-300 ease-in-out'>
                      →
                    </span>
                  </button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>

      <Popup
        showPopup={showPopup}
        selectedItem={selectedItem}
        onClose={() => setShowPopup(false)}
        themeIsDark={themeIsDark}
        label={(selectedItem.tag && (selectedItem.tag === 'Pro')) && 'Tâches'}
      />

    </section>
  );
}

export default Experiences;
