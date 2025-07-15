/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import {
  CaretDownFilled, CaretLeftFilled, CaretRightOutlined, CaretUpFilled
} from '@ant-design/icons';
import React from 'react';
import clsx from 'clsx';
import Beat from './Beat';
import config from './Config';

function BeatManager({
  themeIsDark, patternSounds, switchSound, handleAddTick, handleRemoveTick, handleRemoveBeat, handleAddBeat, currentBeatIndex, currentTick, isFlashActive
}) {
  const { maxBeat: MAX_BEAT, minBeat: MIN_BEAT, maxTickInTime: MAX_TICK_IN_TIME } = config;
  const beatsAmount = patternSounds.length;

  const getButtonClass = (condition, darkClass, lightClass) => clsx('px-2 py-1 mx-3 transition-transform duration-200 rounded-md', {
    [darkClass]: themeIsDark && condition,
    [lightClass]: !themeIsDark && condition,
    'text-zinc-700': themeIsDark && !condition,
    'text-zinc-300': !themeIsDark && !condition
  });

  return (
    <div className='flex flex-col justify-center md:mt-6'>
      <div className='flex flex-col'>
        <Beat
          patternSounds={patternSounds}
          handleSwitchSound={switchSound}
          currentBeatIndex={currentBeatIndex}
          currentTick={currentTick}
          isFlashActive={isFlashActive}
        />

        <div className='mt-2'>
          {patternSounds.map((beat, beatIndex) => {
            const ticksAmount = beat.length;
            return (
              <button
                key={`add-tick-${beatIndex}`}
                onClick={() => handleAddTick(beatIndex)}
                className={getButtonClass(ticksAmount <= MAX_TICK_IN_TIME, 'text-zinc-400 hover:bg-zinc-700', 'text-zinc-500 hover:bg-zinc-300')}
                aria-label={`Add tick to beat ${beatIndex}`}
              >
                <CaretUpFilled />
              </button>
            );
          })}
        </div>

        <div>
          {patternSounds.map((beat, beatIndex) => {
            const ticksAmount = beat.length;
            return (
              <button
                key={`remove-tick-${beatIndex}`}
                onClick={() => handleRemoveTick(beatIndex)}
                className={getButtonClass(ticksAmount > 1, 'text-zinc-400 hover:bg-zinc-700', 'text-zinc-500 hover:bg-zinc-300')}
                aria-label={`Remove tick from beat ${beatIndex}`}
              >
                <CaretDownFilled />
              </button>
            );
          })}
        </div>
      </div>

      <div className='mx-auto'>
        <button
          onClick={handleRemoveBeat}
          className={getButtonClass(beatsAmount > MIN_BEAT, 'text-zinc-400 hover:bg-zinc-700', 'text-zinc-500 hover:bg-zinc-300')}
          aria-label='Remove beat'
        >
          <CaretLeftFilled />
        </button>
        <button
          onClick={handleAddBeat}
          className={getButtonClass(beatsAmount < MAX_BEAT, 'text-zinc-400 hover:bg-zinc-700', 'text-zinc-500 hover:bg-zinc-300')}
          aria-label='Add beat'
        >
          <CaretRightOutlined />
        </button>
      </div>
    </div>
  );
}

export default BeatManager;
