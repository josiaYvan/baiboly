/* eslint-disable react/button-has-type */
import { CaretRightFilled, XFilled } from '@ant-design/icons';
import { memo } from 'react';

const ControlPanel = memo(({
  isPlaying, togglePlay, className, themeIsDark
}) => (
  <button
    className={`${className} text-lg p-3 px-8 rounded-full border transition-[background-color] focus:bg-zinc-600 ${themeIsDark ? 'border-zinc-700 text-white hover:bg-zinc-700' : 'border-zinc-300 text-black hover:bg-zinc-300'}`}
    onClick={togglePlay}
  >
    {isPlaying ? <XFilled /> : <CaretRightFilled />}
  </button>
));

export default ControlPanel;
