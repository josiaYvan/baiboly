/* eslint-disable react/no-array-index-key */
/* eslint-disable no-useless-escape */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PicCenterOutlined, UpOutlined } from '@ant-design/icons';
import {
  capitalizeFirstLetter, copyToClipboard, searchSongs, getLyricsByIndex
} from '../../utils/funtcion';
import { MenuFihirana } from './Menu_fihirana';
import { myStyle } from '../../utils/style';

export function RenderSong({ themeIsDark }) {
  const containerRef = useRef(null);
  const chantRefs = useRef({});
  const [activeTab, setActiveTab] = useState('taloha');
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState('');
  const [sortCriteria, setSortCriteria] = useState('asc');
  const [lyricsCache, setLyricsCache] = useState({});

  const filteredData = searchSongs(search, activeTab);

  const toggleExpand = (index) => {
    setExpanded((prev) => (prev === index ? null : index));

    if (!lyricsCache[index]) {
      const lyrics = getLyricsByIndex(index, activeTab);
      setLyricsCache((prev) => ({ ...prev, [index]: lyrics }));
    }
  };

  function sortSongs(songs, criteria) {
    const sorted = [...songs];
    switch (criteria) {
      case 'asc': return sorted.sort((a, b) => a.numero - b.numero);
      case 'desc': return sorted.sort((a, b) => b.numero - a.numero);
      case 'titleAsc': return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'titleDesc': return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default: return sorted;
    }
  }

  const data = sortSongs(filteredData, sortCriteria);

  const scrollToTop = () => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollToExpanded = () => {
    const el = chantRefs.current[expanded];
    if (el && containerRef.current) {
      const offset = el.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top;
      containerRef.current.scrollTo({
        top: offset + containerRef.current.scrollTop - containerRef.current.clientHeight / 4,
        behavior: 'smooth'
      });
    }
  };

  function isTitleLine(line, index = 0) {
    if (index !== 0) return false;
    const trimmed = line.trim();
    return /^\d+([\-–—‑‒−]\s*)?/.test(trimmed) || /^[\-–—‑‒−]\s*\w+/.test(trimmed);
  }

  function highlightSearchTerm(text, term) {
    if (!term) return text;
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(`(${escaped})`, 'gi'), '<span class="text-blue-500 font-bold">$1</span>');
  }

  return (
    <div ref={containerRef} className='relative h-screen overflow-y-scroll hidden-scrollbar px-4'>
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
              className={`px-3 py-1 rounded-full text-sm shadow-sm backdrop-blur-sm font-semibold border-none ${
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
            <div className='absolute top-[10rem] right-6 px-3 py-2 rounded-2xl backdrop-blur-sm shadow-lg bg-white/5'>
              {data.length}
            </div>
            {data.map((chant) => (
              <motion.div
                layout
                key={`${activeTab}-${chant.index}-${chant.numero}`}
                ref={(el) => chantRefs.current[chant.index] = el}
                className='backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl px-4 py-3 shadow'
              >
                <h2
                  className={`text-lg lora cursor-pointer tracking-widest ${
                    expanded === chant.index ? 'font-bold text-yellow-500 text-center' : ''
                  }`}
                  onClick={() => toggleExpand(chant.index)}
                >
                  {chant.numero}
                  {' '}
                  -
                  {' '}
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
                      transition={{ duration: 0.3 }}
                      onDoubleClick={() => copyToClipboard(lyricsCache[chant.index]?.join('\n') || '')}
                      className='mt-2 space-y-4 text-lg lora'
                    >
                      {(() => {
                        const lyrics = lyricsCache[chant.index] || [];
                        const strophes = [];
                        let current = [];

                        lyrics.forEach((line) => {
                          if (isTitleLine(line)) {
                            if (current.length) strophes.push(current);
                            current = [line];
                          } else {
                            current.push(line);
                          }
                        });
                        if (current.length) strophes.push(current);

                        return strophes.map((strophe, idx) => (
                          <div
                            key={`${activeTab}-${chant.index}-${chant.numero}-${idx}`}
                            className='space-y-1 pl-4'
                          >
                            {strophe.map((line, i) => (
                              <p
                                key={i}
                                className={isTitleLine(line) ? 'text-center text-blue-300' : 'text-center'}
                                dangerouslySetInnerHTML={{ __html: highlightSearchTerm(line, search) }}
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
                className='fixed bottom-20 right-10 p-4 text-white rounded-full shadow backdrop-blur-lg cursor-pointer'
                style={{ backgroundColor: myStyle.yellowPhantom }}
              />
              {expanded !== null && (
                <PicCenterOutlined
                  onClick={scrollToExpanded}
                  className='fixed bottom-9 right-10 px-4 py-2 rounded-full bg-yellow-400 text-black font-semibold shadow-lg'
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
