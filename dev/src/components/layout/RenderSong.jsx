/* eslint-disable react/no-danger */
/* eslint-disable no-useless-escape */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PicCenterOutlined, UpOutlined } from '@ant-design/icons';
import { fihirana } from '../../utils/fihirana_db';
import { capitalizeFirstLetter, copyToClipboard } from '../../utils/funtcion';
import { MenuFihirana } from './Menu_fihirana';
import { myStyle } from '../../utils/style';

export function RenderSong({ themeIsDark }) {
  const containerRef = useRef(null);
  const chantRefs = useRef({});
  const [activeTab, setActiveTab] = useState('taloha');
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState('');
  const [sortCriteria, setSortCriteria] = useState('asc');

  const rawData = fihirana[0][activeTab] || [];

  const filteredData = rawData.filter((chant) => {
    const term = search.toLowerCase();
    return (
      chant.title.toLowerCase().includes(term) ||
      chant.numero.toString().includes(term) ||
      chant.lyrics.some((line) => line.toLowerCase().includes(term))
    );
  });

  const toggleExpand = (index) => {
    setExpanded((prev) => (prev === index ? null : index));
  };

  function sortSongs(songs, criteria) {
    const sorted = [...songs];
    switch (criteria) {
      case 'asc':
        sorted.sort((a, b) => a.numero - b.numero);
        break;
      case 'desc':
        sorted.sort((a, b) => b.numero - a.numero);
        break;
      case 'titleAsc':
        sorted.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
        break;
      case 'titleDesc':
        sorted.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
        break;
      default:
        break;
    }
    return sorted;
  }

  const data = sortSongs(filteredData, sortCriteria);

  const scrollToTop = () => {
    const container = containerRef.current;
    container.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToExpanded = () => {
    if (expanded !== null && chantRefs.current[expanded] && containerRef.current) {
      const container = containerRef.current;
      const element = chantRefs.current[expanded];

      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      const offset = elementRect.top - containerRect.top;
      const scrollTop = offset + container.scrollTop - container.clientHeight / 4;

      container.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  };

  function isTitleLine(line, index = 0) {
    if (index !== 0) return false;
    const trimmed = line.trim();
    const startsWithNumber = /^\d+([\-–—‑‒−]\s*)?/.test(trimmed);
    const startsWithDashAndText = /^[\-–—‑‒−]\s*\w+/.test(trimmed);
    return startsWithNumber || startsWithDashAndText;
  }

  function highlightSearchTerm(text, term) {
    if (!term) return text;
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedTerm})`, 'gi');
    return text.replace(regex, '<span class="text-blue-500 font-bold">$1</span>');
  }

  return (
    <div
      ref={containerRef}
      className='relative h-screen overflow-y-scroll hidden-scrollbar px-4'
      aria-label='Book content container'
    >
      <MenuFihirana
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        search={search}
        setSearch={setSearch}
        setExpanded={setExpanded}
      />

      <div className='pt-40'>
        <div className='w-full flex justify-center py-2 mb-4 gap-2'>
          {[
            { value: 'asc', label: 'Numéro ↑' },
            { value: 'desc', label: 'Numéro ↓' },
            { value: 'titleAsc', label: 'Titre A → Z' },
            { value: 'titleDesc', label: 'Titre Z → A' }
          ].map(({ value, label }) => (
            <button
              type='button'
              key={value}
              onClick={() => setSortCriteria(value)}
              className={`px-3 py-1 rounded-full border text-sm transition duration-500 ease-in-out shadow-sm px-3 py-2 backdrop-blur-sm font-semibold border-none ${
                sortCriteria === value ?
                  `${themeIsDark ? 'btn-on-dark' : 'btn-on-light'} text-yellow-500` :
                  `${themeIsDark ? 'btn-off-dark' : 'btn-off-light'}`
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {data.length === 0 ? (
          <p className='text-center text-gray-500'>Aucun chant trouvé.</p>
        ) : (
          <div className='space-y-3 mb-20'>
            <div
              className='absolute top-[10rem] right-6 px-3 py-2 xs:rounded-full rounded-2xl backdrop-blur-sm shadow-lg bg-white/5'
            >
              {' '}
              {data.length}
              {' '}
            </div>
            {data.map((chant) => (
              <motion.div
                layout
                ref={(el) => chantRefs.current[chant.index] = el}
                key={chant.index}
                className='backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl px-4 py-3 shadow transition duration-200'
              >
                <h2
                  className={`text-lg lora cursor-pointer tracking-widest ${
                    expanded === chant.index ? 'font-bold text-yellow-500' : ''
                  }`}
                  onClick={() => toggleExpand(chant.index)}
                >
                  {chant.numero}
                  {' '}
                  -
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightSearchTerm(
                        expanded === chant.index ? chant.title : capitalizeFirstLetter(chant.title),
                        search
                      )
                    }}
                  />
                </h2>

                <AnimatePresence initial={false}>
                  {expanded === chant.index && (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onDoubleClick={() => copyToClipboard(chant.lyrics.join('\n'))}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className='overflow-hidden mt-2 space-y-4 text-lg lora'
                    >
                      {(() => {
                        const strophes = [];
                        let currentStrophe = [];

                        chant.lyrics.forEach((line) => {
                          if (isTitleLine(line)) {
                            if (currentStrophe.length) strophes.push(currentStrophe);
                            currentStrophe = [line];
                          } else {
                            currentStrophe.push(line);
                          }
                        });

                        if (currentStrophe.length) strophes.push(currentStrophe);

                        return strophes.map((strophe, idx) => (
                          <div key={idx} className='space-y-1 pl-4'>
                            {strophe.map((line, i) => (
                              <p
                                key={i}
                                className={isTitleLine(line) ? 'font-  text-blue-300' : 'pl-4'}
                                dangerouslySetInnerHTML={{
                                  __html: highlightSearchTerm(line, search)
                                }}
                              />
                            ))}
                          </div>
                        ));
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            <div>
              <UpOutlined
                onClick={scrollToTop}
                className='fixed bottom-20 right-10 p-4 text-white rounded-full flex justify-around items-center backdrop-blur-lg shadow cursor-pointer'
                style={{ backgroundColor: myStyle.yellowPhantom }}
                title='Retour en haut'
              />
              {expanded !== null && (
                <PicCenterOutlined
                  onClick={scrollToExpanded}
                  className='fixed bottom-9 right-10 px-4 py-2 rounded-full bg-yellow-400 text-black font-semibold shadow-lg'
                  title='Aller au chant ouvert'
                  type='button'
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
