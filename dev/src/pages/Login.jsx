/**
 * @name Busnay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan. All rights reserved.
 * @version v0.0.1
 *
 */
import { LoadingOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import {
  Alert, Button, Divider, Form, Input
} from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTimeout from '../hooks/useTimeout';
import ApiService from '../utils/apiService';
import { setSessionUserAndToken } from '../utils/authentication';

function Login() {
  window.document.title = 'Busnay — Login';
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  // timeout callback
  const [timeout] = useTimeout(() => {
    setErrMsg('');
  }, 2000);

  timeout();

  // function to handle user login
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await ApiService.post('/auth/login', values);
      if (response?.result_code === 0) {
        if (response?.result?.data.role === 'ADMIN_ROLE') {
          setSessionUserAndToken(response?.result?.data, response?.access_token, response?.refresh_token);
          navigate('/nfc');
        } else {
          setErrMsg('Sorry! You have no ACCESS !');
        }
        setLoading(false);
      } else {
        setErrMsg('Sorry! Something went wrong. App server error');
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setErrMsg(error?.response?.data?.result?.error || 'Sorry! Something went wrong. App server error');
      setLoading(false);
    }
  };

  return (
    <section className='flex flex-col h-screen items-center justify-center'>
      <div className='w-[90%] md:w-[450px]'>
        <Link to='/'>
          <h1 className='text-center text-2xl font-bold'>Smart NFC</h1>
        </Link>

        <Divider className='!mb-10'>LOGIN AUTHORIZED USER ONLY</Divider>
        {errMsg && <Alert message={errMsg} type='error' className='!text-center' />}

        <Form
          name='beach-resort-login'
          className='login-form mt-5'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size='large'
        >
          <Form.Item
            name='email'
            rules={[{
              type: 'email',
              required: true,
              message: 'Please input your email!'
            }]}
          >
            <Input
              prefix={<PhoneOutlined className='site-form-item-icon mr-2' />}
              placeholder='Enter here your email'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{
              required: true,
              message: 'Please input your Password!'
            }]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon mr-2' />}
              placeholder='Enter here your Password'
              type='password'
            />
          </Form.Item>

          {/* FORM SUBMIT BUTTON */}
          <Form.Item>
            <Button
              className='login-form-button mt-5'
              disabled={loading}
              loading={loading}
              htmlType='submit'
              type='primary'
              block
            >
              {loading ? <LoadingOutlined /> : 'Login'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

export default React.memo(Login);
