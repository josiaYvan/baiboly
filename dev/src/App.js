/**
 * @name Bus'nay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan.  All rights reserved.
 * @version v0.0.1
 *
 */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import NotFound from './pages/Error';
import { useEffect, useState } from 'react';
import Tempo from './pages/Tempo';
import Home from './pages/Home';

function App() {
  const [themeIsDark, setThemeIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('themeIsDark');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });
  useEffect(() => {
    localStorage.setItem('themeIsDark', JSON.stringify(themeIsDark));
  }, [themeIsDark]);

  return (
    <BrowserRouter>
      <Routes>
        {/* HOME ROUTE */}
        <Route path='*' element={<Home themeIsDark={themeIsDark} setThemeIsDark={setThemeIsDark} />} />
        <Route path='/tempo' element={<Tempo />} />

        {/* ERROR ROUTE */}
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
