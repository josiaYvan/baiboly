/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React from 'react';
import { BulbOutlined, CommentOutlined, HourglassOutlined } from '@ant-design/icons';
import { myStyle } from '../../utils/style';

function AboutMe({ themeIsDark }) {
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id='about'>
      <div id='about' className='mt-20 lg:mt-36'>
        <div className='flex flex-col items-center'>
          <p className='text-gray-400 text-xs'>Présentation</p>
          <h1 className='font-medium text-2xl text-yellow-500'>A propos de moi</h1>
        </div>
        <div className=' mt-5 xl:mt-20 rounded-lg'>
          <div className='flex flex-col lg:flex-row p-4'>
            <img
              src='images/identity.png'
              alt='Profile'
              className='w-[320px] h-[420px] rounded-3xl mx-auto lg:mr-4 lg:mt-40 filter brightness-75'
            />
            <div className='flex flex-col lg:ml-20 mt-8'>
              <div>
                <div className='flex justify-around mx-auto w-[450px] lg:w-[500px]'>
                  <div className='flex flex-col items-center w-40 h-26 lg:h-32 font-semibold lg:text-base text-sm lg:py-4 py-3 mx-1 shadow-md lg:rounded-2xl rounded-xl' style={{ backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white }}>
                    <BulbOutlined className='mt-2 text-yellow-500 lg:text-2xl text-xl' />
                    <p className='mt-2 text-center'>Créatif</p>
                  </div>
                  <div className='flex flex-col items-center w-40 h-26 lg:h-32 font-semibold lg:text-base text-sm lg:py-4 py-3 mx-1 shadow-md lg:rounded-2xl rounded-xl' style={{ backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white }}>
                    <CommentOutlined className='mt-2 text-yellow-500 lg:text-2xl text-xl' />
                    <p className='mt-2 text-center'>Capacité d'adaptation</p>
                  </div>
                  <div className='flex flex-col items-center w-40 h-26 lg:h-32 font-semibold lg:text-base text-sm lg:py-4 py-3 mx-1 shadow-md lg:rounded-2xl rounded-xl' style={{ backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white }}>
                    <HourglassOutlined className='mt-2 text-yellow-500 lg:text-2xl text-xl' />
                    <p className='mt-2 text-center'>Autonome</p>
                  </div>
                </div>
                <p className='mt-8 lg:mx-2 md:mx-20 sm:mx-4 text-sm lg:text-base lg:text-left text-center' style={{ lineHeight: 1.7 }}>
                  À 21 ans, originaire de
                  {' '}
                  <b>Madagascar</b>
                  , je suis dans le monde des technologies de l'information (IT) depuis 5 ans. Titulaire d'un baccalauréat scientifique (série C), je suis actuellement en cinquième année à l'ESTI (
                  <a href='https://esti.mg' target='_blank' rel='noopener noreferrer'>esti.mg</a>
                  ), où je poursuis un master.
                  <br />
                  En parallèle,  mon appétence pour l'informatique m'a conduit à renforcer mes compétences de manière autodidacte et participé à des formations professionnelles, comme celles de l'Orange Digital Center (
                  <a href='https://www.orangedigitalcenters.com/country/MG/home' target='_blank' rel='noopener noreferrer'>orangedigitalcenters.com</a>
                  ).
                  <br />
                  Ces expériences, cumulées tout au long de mon parcours, m'ont permis de développer des aptitudes solides dans la gestion de projets passés et d'acquérir encore plus d'expertise que je souhaite aujourd'hui mettre au service de ceux qui en ont besoin.
                </p>

              </div>
              <div className='mt-8 mx-auto lg:ml-2'>
                <button
                  className='transition duration-500 bg-yellow-500 py-3 px-4 rounded-lg hover:bg-yellow-400 hover:shadow-[0_0px_10px_rgba(227,178,0,0.5)]'
                  style={{
                    color: themeIsDark ? myStyle.bg : myStyle.white
                  }}
                  onClick={() => handleScroll('contact')}
                >
                  Contactez moi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
