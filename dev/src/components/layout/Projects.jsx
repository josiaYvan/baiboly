/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { myStyle } from '../../utils/style';
import Popup from './Popup';
import { projects } from '../../utils/data';

function Projects({ themeIsDark }) {
  const [selectedTag, setSelectedTag] = useState('Tous');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Fonction pour filtrer les projets en fonction du tag sélectionné
  const filterProjects = () => {
    if (selectedTag === 'Tous') {
      return projects;
    }
    return projects.filter((project) => project.tags.includes(selectedTag));
  };

  const openPopup = (project) => {
    setSelectedProject(project);
    setShowPopup(true);
  };

  return (
    <section id='projects'>
      <div id='about' className='mt-20 lg:mt-36'>
        <div className='flex flex-col items-center'>
          <p className='text-gray-400 text-xs'>Mes projets</p>
          <h1 className='font-medium text-2xl text-yellow-500'>Mon Portfolio</h1>
        </div>

        <div className='mt-5 lg:mt-10 rounded-lg'>
          <div className='p-8'>
            {/* Filtre de projet */}
            <div
              className='flex justify-center space-x-6 mb-8'
              style={{ color: !themeIsDark ? myStyle.bg : myStyle.white }}
            >
              {['Tous', 'Web', 'Application', 'Design'].map((tag) => (
                <button
                  key={tag}
                  className={`${
                    selectedTag === tag && 'bg-yellow-500'
                  } px-4 py-2 rounded-lg`}
                  style={{
                    color:
                    selectedTag === tag && (!themeIsDark ? myStyle.white : myStyle.bg)
                  }}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Cartes de projet avec animation */}
            <div className='flex flex-wrap justify-center gap-5 lg:gap-10'>
              {filterProjects().map((project, index) => (
                <motion.div
                  key={index}
                  className='p-4 rounded-2xl shadow-lg h-[330px] overflow-hidden flex flex-col'
                  style={{
                    backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className='flex-1 w-[250px] flex-grow'>
                    <img
                      src={project.imageSrc}
                      alt={project.altText}
                      className='rounded-xl h-[200px] w-full object-cover'
                    />
                    <div className='flex-grow'>
                      <h3 className='text-lg font-bold mt-5 mb-2'>{project.title}</h3>
                      <button
                        onClick={() => openPopup(project)}
                        className='text-yellow-500 flex items-center text-xs group'
                      >
                        <p>Voir plus</p>
                        <span className='ml-1 group-hover:ml-3 transition-all duration-300 ease-in-out'>
                          →
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        {/* Popup */}
        {/* Popup Modal */}
        <Popup
          showPopup={showPopup}
          selectedItem={selectedProject}
          onClose={() => setShowPopup(false)} // Fonction pour fermer le popup
          themeIsDark={themeIsDark}
        />

      </div>
    </section>
  );
}

export default Projects;
