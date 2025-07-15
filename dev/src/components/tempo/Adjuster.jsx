/* eslint-disable radix */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { memo } from 'react';
import config from './Config';
import { myStyle } from '../../utils/style';

const MIN_BPM = config.minBpm;
const MAX_BPM = config.maxBpm;

const BPMAdjuster = memo(({
  bpm, handleBpmChange, handleTap, themeIsDark
}) => (
  <div
    className={`p-2 sm:p-4 md:p-8 rounded-2xl flex flex-col items-center transition-[background-color] ease-out duration-500 ${themeIsDark ? 'bg-zinc-800' : 'bg-white'}`}
  >
    <div className='flex flex-row items-center py-2 sm:py-4 md:py-6'>
      <button
        onClick={() => handleBpmChange(bpm - 1)}
        className={`${bpm > MIN_BPM ? '' : 'invisible'} p-4 mr-4 h-fit transition-[transform,color] duration-200 rounded-md ${themeIsDark ? 'text-white hover:bg-zinc-700' : 'text-black hover:bg-zinc-300'}`}
      >
        <MinusOutlined />
      </button>
      <div
        className={`text-4xl cursor-pointer block text-center rounded-lg w-32 py-6 px-8 transition-colors border ${themeIsDark ? 'border-zinc-700 text-white hover:bg-zinc-700' : 'border-zinc-300 text-black hover:bg-zinc-300'}`}
        onClick={handleTap}
      >
        {bpm}
      </div>
      <button
        onClick={() => handleBpmChange(bpm + 1)}
        className={`${bpm < MAX_BPM ? '' : 'invisible'} p-4 ml-4 h-fit transition-[transform,color] duration-200 rounded-md ${themeIsDark ? 'text-white hover:bg-zinc-700' : 'text-black hover:bg-zinc-300'}`}
      >
        <PlusOutlined />
      </button>
    </div>

    <input
      id='bpm-input'
      className='transparent h-[4px] w-full mt-2 sm:mt-4 mb-0.5 py-1.5 rounded-lg cursor-pointer appearance-none'
      style={{ backgroundColor: myStyle.yellowGround, accentColor: myStyle.yellow }}
      type='range'
      value={bpm}
      onChange={(e) => handleBpmChange(parseInt(e.target.value))}
      min={MIN_BPM}
      max={MAX_BPM}
      step='1'
    />
  </div>
));

export default BPMAdjuster;
