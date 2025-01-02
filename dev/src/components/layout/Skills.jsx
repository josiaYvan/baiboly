/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {
  GithubFilled, JavaScriptOutlined
} from '@ant-design/icons';
import { myStyle } from '../../utils/style';

function Skills({ themeIsDark }) {
  return (
    <section id='skills'>
      <div className='mt-20 lg:mt-36'>
        <div className='flex flex-col items-center'>
          <p className='text-gray-400 text-xs'>Mes softskills</p>
          <h1 className='font-medium text-2xl text-yellow-500'>Mes compétences</h1>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-8 p-6'>
          <div className='mt-5 lg:mt-16 min-w-[400px] lg:w-full mx-auto rounded-2xl shadow-md py-10 px-20' style={{ backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white }}>
            <h2 className='text-yellow-500 text-center mb-6'>Développement</h2>
            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col'>
                <span className='text-xl text-yellow-500'>
                  <JavaScriptOutlined />
                </span>
                <div>
                  <h3 className=''>Javascript</h3>
                  <p className='text-gray-400 text-xs'>Avancé</p>
                </div>
              </div>
              <div className='flex flex-col'>
                <span className='text-xl w-7 text-yellow-500'>
                  <img src='icons/react.png' />
                </span>
                <div>
                  <h3 className=''>React JS</h3>
                  <p className='text-gray-400 text-xs'>Avancé</p>
                </div>
              </div>
              <div className='flex flex-col'>
                <span className='text-xl w-7 text-yellow-500'>
                  <img src='icons/node.png' />
                </span>
                <div>
                  <h3 className=''>Node</h3>
                  <p className='text-gray-400 text-xs'>Avancé</p>
                </div>
              </div>
              <div className='flex flex-col'>
                <span className='text-xl w-7 text-yellow-500'>
                  <img src='icons/mongo.png' />
                </span>
                <div>
                  <h3 className=''>Mongoose</h3>
                  <p className='text-gray-400 text-xs'>Avancé</p>
                </div>
              </div>
              <div className='flex flex-col'>
                <span className='text-xl w-7 text-yellow-500'>
                  <img src='icons/flutter.png' />
                </span>
                <div>
                  <h3 className=''>Flutter</h3>
                  <p className='text-gray-400 text-xs'>Avancé</p>
                </div>
              </div>
              <div className='flex flex-col'>
                <span className='text-xl w-7 text-yellow-500'>
                  <img src='icons/qt.png' />
                </span>
                <div>
                  <h3 className=''>QT</h3>
                  <p className='text-gray-400 text-xs'>Intermédiaire</p>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-5 lg:mt-16 min-w-[400px] lg:w-full mx-auto  rounded-2xl shadow-md py-10 px-20' style={{ backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white }}>
            <h2 className='text-yellow-500 text-center mb-6'>IT Management</h2>
            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col'>
                <span className='text-xl w-7 text-yellow-500'>
                  <img src='icons/sharepoint.png' />
                </span>
                <div>
                  <h3 className=''>Sharepoint</h3>
                  <p className='text-gray-400 text-xs'>Gestion de tâche</p>
                </div>
              </div>
              <div className='flex flex-col'>
                <span className='text-xl text-yellow-500'>
                  <GithubFilled />
                </span>
                <div>
                  <h3 className=''>Git</h3>
                  <p className='text-gray-400 text-xs'>Gestion de code</p>
                </div>
              </div>
              <div className='flex flex-col'>
                <span className='text-xl w-7 text-yellow-500'>
                  <img src='icons/ai.png' />
                </span>
                <div>
                  <h3 className=''>Illustrator</h3>
                  <p className='text-gray-400 text-xs'>Prototypage et design</p>
                </div>
              </div>
              <div className='flex flex-col'>
                <span className='text-xl w-7 text-yellow-500'>
                  <img src='icons/figma.png' />
                </span>
                <div>
                  <h3 className=''>Figma</h3>
                  <p className='text-gray-400 text-xs'>Prototypage</p>
                </div>
              </div>
              <div className='flex flex-col'>
                <span className='text-xl w-7 text-yellow-500'>
                  <img src='icons/ms.png' />
                </span>
                <div>
                  <h3 className=''>Ms Teams</h3>
                  <p className='text-gray-400 text-xs'>gestion de communication</p>
                </div>
              </div>
              <div className='flex flex-col'>
                <span className='text-xl w-7 text-yellow-500'>
                  <img src='icons/ms.png' />
                </span>
                {' '}
                <div>
                  <h3 className=''>GLPI</h3>
                  <p className='text-gray-400 text-xs'>Gestion de Ticket</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

  );
}

export default Skills;
