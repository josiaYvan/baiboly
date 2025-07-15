/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import { memo } from 'react';
import { myStyle } from '../../utils/style';

const Beat = memo(({
  patternSounds, handleSwitchSound, currentBeatIndex, currentTick, isFlashActive
}) => {
  const getBackgroundColor = (tick) => {
    switch (tick) {
      case 0:
        return myStyle.yellow;
      case 1:
        return myStyle.gray;
      case 2:
        return myStyle.blue;
      default:
        return 'transparent';
    }
  };

  return (
    <div className='flex flex-row justify-center border rounded-md' style={{ borderColor: myStyle.hide }}>
      {patternSounds.map((beat, beatIndex) => {
        const beatActive = beatIndex === currentTick;
        return (
          <div className='flex flex-col justify-center items-center' key={beatIndex}>
            {beat.map((tick, tickIndex) => {
              const backgroundColor = getBackgroundColor(tick);
              const tickActive = tickIndex === currentBeatIndex;

              return (
                <button
                  className='p-4'
                  onClick={() => handleSwitchSound(beatIndex, tickIndex)}
                  key={`${currentBeatIndex}-${tickIndex}`}
                >
                  <div
                    className='w-5 h-5 transition-transform duration-200 rounded-full hover:scale-110'
                    style={{
                      backgroundColor,
                      boxShadow: !isFlashActive && (beatActive && tickActive ?
                        `0 0 10px ${backgroundColor}, 0 0 20px ${backgroundColor}` :
                        'none'),
                      transform: !isFlashActive && (beatActive && tickActive ? 'scale(1.8)' : 'scale(1)')
                    }}
                  />
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
});

export default Beat;
