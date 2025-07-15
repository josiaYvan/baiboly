/* eslint-disable react/no-unescaped-entities */
/**
 * @name Bus'nay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan.  All rights reserved.
 * @version v0.0.1
 *
 */
import { FullscreenExitOutlined, FullscreenOutlined, HomeOutlined } from '@ant-design/icons';
import {
  Button, Layout, Menu, Tooltip
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFullScreen from '../hooks/useFullScreen';
import Console from '../components/tabs/Console';
import LogoBox from '../components/layout/LogoBox';

const {
  Header, Content, Footer, Sider
} = Layout;

function Main() {
  window.document.title = 'Bus`nay — Main';
  const { isFullscreen, toggleFullScreen } = useFullScreen();
  const [selectedKeys, setSelectedKeys] = useState('0');
  const navigate = useNavigate();
  const { tab } = useParams();

  const handleTabChange = (key) => {
    switch (key) {
      case '0': {
        navigate('/main/client');
        break;
      }
      default: {
        navigate('/main/client');
      }
    }
  };

  useEffect(() => {
    if (tab) {
      if (tab === 'client') setSelectedKeys('0');
      else navigate('/not-found');
    }
  }, [tab, navigate]);

  useEffect(() => {
    switch (selectedKeys) {
      case '0': {
        window.document.title = 'Bus`nay — Console client';
        break;
      }
      default: {
        window.document.title = 'Bus`nay — Client';
      }
    }
  }, [selectedKeys]);

  const menuItems = [
    {
      key: '0',
      icon: <HomeOutlined />,
      label: 'Console',
      visible: true
    }
  ];
  const filteredMenuItems = menuItems.filter((item) => item.visible);

  return (
    <Layout className='w-full h-screen'>
      <Sider className='!bg-white' breakpoint='lg'>
        <LogoBox />

        <Menu
          theme='light'
          mode='inline'
          selectedKeys={[selectedKeys]}
          onClick={(e) => {
            handleTabChange(e.key);
          }}
          items={filteredMenuItems}
        />
      </Sider>

      <Layout>
        <Header className='hidden p-0 !bg-bg-white'>
          <Link to='/main/dashboard'>
            <img
              className='h-[65px] mx-auto'
              alt='beach-resort-logo'
              src={Logo}
            />
          </Link>

          {/* full screen toggle button */}
          <Tooltip title='Click to toggle Full Screen' placement='left'>
            <Button
              className='absolute right-5 top-5'
              icon={isFullscreen ?
                (<FullscreenExitOutlined className='' />) :
                (<FullscreenOutlined className='' />)}
              onClick={toggleFullScreen}
              shape='default'
              type='default'
              size='middle'
            />
          </Tooltip>
        </Header>

        <Content className='bg-bg-white overflow-y-scroll m-2 p-2'>
          {selectedKeys === '0' && (<Console />)}
        </Content>

        <Footer className='text-center font-text-font font-medium '>
          ©2024 Bus'nay — Developed By
          {' '}
          <a
            className='text-color-primary hover:text-color-secondary'
            href='https://www.linkedin.com/in/josia-yvan/'
            target='_blank'
            rel='noreferrer'
          >
            Mr. Josia Yvan
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default React.memo(Main);
