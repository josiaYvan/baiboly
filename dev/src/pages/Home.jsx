import { useState, useEffect } from 'react';
import Navbar from '../components/layout/navigation';
import { myStyle } from '../utils/style';
// import Footer from '../components/layout/Footer';
import Welcome from '../components/layout/Welcome';

function Home() {
  const [themeIsDark, setThemeIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('themeIsDark');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  useEffect(() => {
    localStorage.setItem('themeIsDark', JSON.stringify(themeIsDark));
  }, [themeIsDark]);

  return (
    <div
      style={{
        backgroundColor: themeIsDark ? myStyle.bg : myStyle.light,
        color: themeIsDark ? myStyle.darkColor : myStyle.brown
      }}
      className='transition duration-500 ease-in-out'
    >
      <Navbar setThemeIsDark={setThemeIsDark} themeIsDark={themeIsDark} />
      <div className='flex flex-col items-center max-w-[920px] w-full mx-auto'>
        <Welcome themeIsDark={themeIsDark} />
        {/* <Contact themeIsDark={themeIsDark} /> */}
      </div>
      {/* <Footer themeIsDark={themeIsDark} /> */}
    </div>
  );
}

export default Home;
