/* eslint-disable max-len */
import React from 'react';
import { motion } from 'framer-motion';
import { myStyle } from '../../utils/style';
import { ScrollIndicator } from './ScrollIndicator';
import LinkedIn from './LinkedIn';

function Profile({ themeIsDark }) {
  const svgVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }
  };

  return (
    <div className='relative mt-10'>
      <ScrollIndicator themeIsDark={themeIsDark} />
      <LinkedIn themeIsDark={themeIsDark} />

      <div className='lg:w-[900px] w-[35rem] mx-auto'>
        <motion.svg
          className='w-full'
          viewBox='0 0 1044 902'
          fill='none'
          initial='hidden'
          animate='visible'
          variants={svgVariants}
        >
          <defs>
            <pattern
              id='img1'
              patternUnits='userSpaceOnUse'
              width='900'
              height='900'
            >
              <image
                href='images/profile.png'
                y='100'
                x='157'
                width='700'
                height='800'
              />
            </pattern>
          </defs>
          <path
            d='M299.457 518.783C159.809 448.658 66.7092 230.702 196.886 270.608C327.063 310.514 255.571 117.148 418.368 135.5C652.077 161.847 683.675 246.512 658.758 309.501C569.835 534.29 732.031 435.08 797.005 536.088C861.98 637.095 669.653 697.954 641.142 752.464C607.289 817.188 481.505 674.709 435.667 768.997C417.674 806.007 274.741 803.163 258.689 693.366C242.638 583.569 335.44 536.851 299.457 518.783Z'
            fill={themeIsDark ? myStyle.light : myStyle.path}
            stroke={myStyle.brown}
            fillOpacity='0.6'
            strokeOpacity='0.6'
          />
          <path
            d='M279.46 515.193C127.9 434.507 36.4896 198.647 179.203 246.782C321.917 294.917 253.184 86.1514 433.434 112.793C692.199 151.038 722.621 242.459 691.331 308.355C579.666 543.516 765.861 445.109 832.53 555.37C899.2 665.63 681.611 721.935 646.797 778.656C605.46 846.005 473.407 688.981 417.06 787.246C394.943 825.817 235.939 816.538 224.242 699.071C212.545 581.605 318.512 535.983 279.46 515.193Z'
            fill={themeIsDark ? myStyle.light : myStyle.path}
            stroke={myStyle.brown}
            fillOpacity='0.4'
            strokeOpacity='0.4'
          />
          <path
            d='M268.8 516.564C103.084 434.707 -2.55623 184.413 152.64 231.61C307.837 278.807 227.45 56.8843 422.427 79.8363C702.334 112.786 737.886 209.959 706.183 281.665C593.047 537.567 790.625 426.114 865.796 542.373C940.966 658.632 708.288 725.877 672.511 787.847C630.029 861.429 483.007 697.024 425.297 804.259C402.645 846.351 231.082 841.369 214.909 715.655C198.737 589.941 311.499 537.657 268.8 516.564Z'
            fill={themeIsDark ? myStyle.light : myStyle.path}
            stroke={myStyle.brown}
            fillOpacity='0.2'
            strokeOpacity='0.2'
          />
          <path
            d='M261.99 525.524C72.7226 436.951 -46.6333 163.499 130.813 214.177C308.259 264.855 217.64 22.312 440.808 46.1742C761.186 80.4305 801.268 186.63 764.488 265.377C633.231 546.403 860.258 423.037 945.594 549.882C1030.93 676.727 763.99 751.903 722.606 820.012C673.468 900.884 506.151 721.776 439.351 839.607C413.13 885.858 216.663 881.525 198.963 743.938C181.263 606.351 310.758 548.346 261.99 525.524Z'
            fill={themeIsDark ? myStyle.light : myStyle.path}
            stroke={myStyle.brown}
            fillOpacity='0.1'
            strokeOpacity='0.1'
          />
          <path
            d='M247.648 528.771C32.8976 432.533 -101.405 133.013 100.099 187.72C301.603 242.427 199.817 -23.3162 453.448 1.72228C817.558 37.6673 862.585 154.023 820.358 240.644C669.66 549.772 928.44 413.195 1024.82 551.977C1121.19 690.759 817.28 774.65 769.873 849.619C713.582 938.636 524.259 742.914 447.695 872.588C417.642 923.488 194.27 919.747 174.855 768.825C155.44 617.903 302.981 553.569 247.648 528.771Z'
            fill={themeIsDark ? myStyle.light : myStyle.path}
            stroke={myStyle.brown}
            fillOpacity='0.05'
            strokeOpacity='0.05'
          />
          <path
            fill='url(#img1)'
            stroke={!themeIsDark && myStyle.brown}
            strokeOpacity='0.3'
            d='M309.405 513.417C178.942 446.896 93.335 242.521 215.153 280.729C336.972 318.937 271.44 137.696 424.036 155.985C643.101 182.241 672.07 261.6 648.188 320.303C562.96 529.796 715.932 438.194 776.086 533.061C836.24 627.927 655.305 683.472 628.12 734.224C595.84 794.487 478.963 660.433 435.202 748.245C418.025 782.714 283.942 779.059 269.76 676.319C255.578 573.578 343.021 530.557 309.405 513.417Z'
          />
        </motion.svg>
      </div>
    </div>
  );
}

export default Profile;
