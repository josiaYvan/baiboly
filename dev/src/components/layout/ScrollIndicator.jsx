import React from 'react';
import { ChevronDoubleRightIcon } from '@heroicons/react/16/solid';
import { motion } from 'framer-motion';
import { myStyle } from '../../utils/style';

export function ScrollIndicator({ themeIsDark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2 }}
    >
      <div className='absolute right-3 lg:right-20 top-44 lg:top-72 rotate-90 flex space-x-2 items-center'>
        <p className='text-yellow-500 text-xs' style={{ color: !themeIsDark && myStyle.brown }}>Scroll Down</p>
        <ChevronDoubleRightIcon className='text-yellow-500 w-4' style={{ color: !themeIsDark && myStyle.brown }} />
      </div>
    </motion.div>
  );
}
