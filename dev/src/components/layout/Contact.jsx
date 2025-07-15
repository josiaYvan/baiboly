/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { message } from 'antd';
import { MailOutlined, WhatsAppOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { myStyle } from '../../utils/style';
import { copyToClipboard } from '../../utils/funtcion';

function Contact({ themeIsDark }) {
  const [messageApi, contextHolder] = message.useMessage();

  const handleSendMail = () => {
    messageApi.warning('Ce formulaire n\'est pas disponible pour le moment. Veuillez envoyer votre message par e-mail.');
  };

  return (
    <section id='contact'>
      <div className='mt-20 lg:mt-36'>
        {/* Titre */}
        <div className='flex flex-col items-center'>
          <p className='text-gray-400 text-xs'>Get in touch</p>
          <h1 className='font-medium text-2xl text-yellow-500'>Contactez Moi</h1>
        </div>

        {/* Contenu */}
        <div className='my-10 lg:my-20 rounded-lg px-10'>
          <div className='flex flex-col md:flex-row justify-between gap-2 lg:gap-6'>
            {/* Section Contact Email et WhatsApp */}
            <div className='flex flex-col items-center space-y-4 md:items-start'>
              {/* Carte Email */}
              <div
                className='p-4 rounded-xl shadow-lg w-80 text-center'
                style={{ backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white }}
              >
                <div className='text-2xl'>
                  <MailOutlined />
                </div>
                <h2 className='mb-2'>Email</h2>
                {contextHolder}
                <button
                  onClick={() => copyToClipboard('josiayvan@gmail.com')}
                  className='text-yellow-500 flex mx-auto text-xs group'
                >
                  <p>Un mail par ici</p>
                  <span className='ml-1 group-hover:ml-3 transition-all duration-300 ease-in-out'>
                    →
                  </span>
                </button>
              </div>

              {/* Carte WhatsApp */}
              <div
                className='p-4 rounded-xl shadow-lg w-80 text-center'
                style={{ backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white }}
              >
                <div className='text-2xl'>
                  <WhatsAppOutlined />
                </div>
                <h2 className='mb-2'>Whatsapp</h2>
                <Link
                  to='https://wa.me/261386183236'
                  target='_blank'
                  className='text-yellow-500 flex justify-center text-xs group'
                >
                  <p>Ou un SMS par là</p>
                  <span className='ml-1 group-hover:ml-3 transition-all duration-300 ease-in-out'>
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Formulaire de Contact */}
            <div className='flex-2 px-4 mx-auto md:mt-0 mt-10'>
              <h2 className='text-md lg:text-xl font-bold mb-4'>Un petit message pour en savoir plus ?</h2>

              <form className='w-[350px] mx-auto'>
                {/* Champ Nom */}
                <div className='mb-4'>
                  <label
                    htmlFor='name'
                    className='relative top-3 left-5 px-2 text-xs'
                    style={{
                      backgroundColor: themeIsDark ? myStyle.bg : myStyle.light
                    }}
                  >
                    Nom
                  </label>
                  <input
                    type='text'
                    id='name'
                    placeholder='Votre nom'
                    className='w-full p-6 rounded-xl border-2 border-gray-500 text-sm'
                    style={{ backgroundColor: themeIsDark ? myStyle.bg : myStyle.light }}
                  />
                </div>

                {/* Champ Email */}
                <div className='mb-4'>
                  <label
                    htmlFor='email'
                    className='relative top-3 left-5 px-2 text-xs'
                    style={{
                      backgroundColor: themeIsDark ? myStyle.bg : myStyle.light
                    }}
                  >
                    Mail
                  </label>
                  <input
                    type='email'
                    id='email'
                    placeholder='Votre mail'
                    className='w-full p-6 rounded-xl border-2 border-gray-500 text-sm'
                    style={{ backgroundColor: themeIsDark ? myStyle.bg : myStyle.light }}
                  />
                </div>

                {/* Champ Message */}
                <div className='mb-6'>
                  <label
                    htmlFor='message'
                    className='relative top-3 left-5 px-2 text-xs'
                    style={{
                      backgroundColor: themeIsDark ? myStyle.bg : myStyle.light
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id='message'
                    rows='4'
                    placeholder='Votre message'
                    className='w-full p-6 rounded-xl border-2 border-gray-500 text-sm'
                    style={{ backgroundColor: themeIsDark ? myStyle.bg : myStyle.light }}
                  />
                </div>

                {/* Bouton Envoyer */}
                <button
                  type='button'
                  onClick={handleSendMail}
                  className='px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition'
                  style={{
                    color: !themeIsDark ? myStyle.white : myStyle.bg
                  }}
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}

export default Contact;
