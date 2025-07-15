/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { Layout, Dropdown, Menu } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { myStyle } from '../../utils/style';

const { Header } = Layout;

function MyHeader({
  themeIsDark, setThemeIsDark, setCurrentComponent, title
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu de navigation
  const menu = (
    <Menu className='w-32'>
      <Menu.Item key='1' onClick={() => { setCurrentComponent('Baiboly'); }}>
        Baiboly
      </Menu.Item>
      <Menu.Item key='3' onClick={() => { setCurrentComponent('Fihirana'); }}>
        Fihirana
      </Menu.Item>
      <Menu.Item key='2' onClick={() => { setCurrentComponent('Tempo'); }}>
        Tempo
      </Menu.Item>
      {/* Ajoutez d'autres éléments de menu ici si nécessaire */}
    </Menu>
  );

  return (
    <Header
      style={{ backgroundColor: themeIsDark ? myStyle.bg : myStyle.light }}
      className={`fixed top-0 left-0 right-0 mx-auto transition duration-500 ease-in-out z-10 h-18 px-4 ${scrolled ? 'shadow-md' : ''}`}
    >
      <div className='max-w-[920px] mx-auto'>
        <div className='flex items-center justify-between pt-5 text-yellow-500'>
          <Dropdown overlay={menu} trigger={['click']}>
            <div className='text-lg'>{title}</div>
          </Dropdown>
          <div className='text-lg flex space-x-2'>
            <button onClick={() => setThemeIsDark(!themeIsDark)}>
              {!themeIsDark ? <MoonOutlined /> : <SunOutlined />}
            </button>
          </div>
        </div>
      </div>
    </Header>
  );
}

export default MyHeader;
