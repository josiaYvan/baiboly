import { useState } from 'react';
import Navbar from '../components/layout/navigation';
import { myStyle } from '../utils/style';
import Tempo from './Tempo';
import Baiboly from '../components/layout/Baiboly';
import { Fihirana } from '../components/layout/Fihirana';

function Home({ themeIsDark, setThemeIsDark }) {
  const [currentComponent, setCurrentComponent] = useState('Baiboly');

  // Applique styles dynamiques (z-index, opacity) en fonction du composant actif
  const getComponentStyle = (name) => `
    absolute inset-0 w-full h-full transition-opacity duration-300
    ${currentComponent === name ?
    'z-0 opacity-100 pointer-events-auto' :
    'z-0 opacity-0 pointer-events-none'}
  `;

  return (
    <div
      style={{
        backgroundColor: themeIsDark ? myStyle.bg : myStyle.light,
        color: themeIsDark ? myStyle.darkColor : myStyle.brown,
        position: 'relative',
        overflow: 'hidden'
      }}
      className='transition duration-500 ease-in-out min-h-screen'
    >
      <Navbar
        setThemeIsDark={setThemeIsDark}
        title={currentComponent}
        themeIsDark={themeIsDark}
        setCurrentComponent={setCurrentComponent}
      />

      {/* Superposition permanente de tous les composants */}
      <div className='relative w-full h-full'>
        <div className={getComponentStyle('Tempo')}>
          <Tempo themeIsDark={themeIsDark} isActive={currentComponent === 'Tempo'} />
        </div>

        <div className={getComponentStyle('Baiboly')}>
          <div className='max-w-[920px] w-full mx-auto'>
            <Baiboly themeIsDark={themeIsDark} isActive={currentComponent === 'Baiboly'} />
          </div>
        </div>

        <div className={getComponentStyle('Fihirana')}>
          <div className='mx-auto max-w-[920px] w-full '>
            <Fihirana themeIsDark={themeIsDark} isActive={currentComponent === 'Fihirana'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
