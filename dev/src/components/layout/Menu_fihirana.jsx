import { Input } from 'antd';
import { myStyle } from '../../utils/style';

export function MenuFihirana({
  setActiveTab,
  activeTab,
  search,
  setSearch,
  setExpanded,
  tabs = ['taloha', 'vaovao', 'noely']
}) {
  return (
    <div
      className='z-20 fixed top-[5.5rem] left-1/2 -translate-x-1/2 px-3 py-2 flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-4 xs:rounded-full rounded-2xl  backdrop-blur-sm shadow-lg bg-white/5 w-[90vw] sm:w-auto max-w-3xl'
    >
      {/* Barre de recherche */}
      <Input
        allowClear
        type='text'
        placeholder='Rechercher un chant...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800 flex-1 min-w-[160px] sm:min-w-[240px]'
      />

      {/* Onglets avec texte complet en grand écran, lettre en petit écran */}
      <div className='flex items-center gap-2 sm:gap-3'>
        {tabs.map((tab) => (
          <button
            type='button'
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setExpanded(null);
            }}
            style={{
              backgroundColor: activeTab === tab ? myStyle.yellow : myStyle.yellowDark,
              color: myStyle.white
            }}
            className='rounded-full font-semibold text-xs flex items-center justify-center transition duration-200 px-3 h-10 sm:h-11'
            title={tab}
          >
            {/* Affiche la lettre seule sur mobile, le texte complet sur desktop */}
            <span className='block sm:hidden'>{tab[0].toUpperCase()}</span>
            <span className='hidden sm:block'>{tab.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
