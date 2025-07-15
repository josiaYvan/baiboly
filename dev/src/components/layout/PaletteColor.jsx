/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { BoldOutlined, CopyOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { myStyle } from '../../utils/style';
import { copyToClipboard } from '../../utils/funtcion';

function PaletteColor({
  setBackgroundColor, selectedText, increaseFontSize, selectedVerseFontBold
}) {
  return (
    <div className='flex space-x-1 items-center w-auto'>
      <div className='w-5 h-5 rounded-[50%] text-center border' onClick={increaseFontSize}>A</div>
      <div className='w-5 h-5 rounded-[50%] text-center' onClick={selectedVerseFontBold}><BoldOutlined /></div>
      <div className='w-5 h-5 rounded-[50%]' onClick={() => setBackgroundColor(myStyle.redGround)} style={{ backgroundColor: myStyle.red }} />
      <div className='w-5 h-5 rounded-[50%]' onClick={() => setBackgroundColor(myStyle.orangeGround)} style={{ backgroundColor: myStyle.orange }} />
      <div className='w-5 h-5 rounded-[50%]' onClick={() => setBackgroundColor(myStyle.yellowGround)} style={{ backgroundColor: myStyle.yellow }} />
      <div className='w-5 h-5 rounded-[50%]' onClick={() => setBackgroundColor(myStyle.brunGround)} style={{ backgroundColor: myStyle.brun }} />
      <div className='w-5 h-5 rounded-[50%]' onClick={() => setBackgroundColor(myStyle.greenGround)} style={{ backgroundColor: myStyle.green }} />
      <div className='w-5 h-5 rounded-[50%]' onClick={() => setBackgroundColor(myStyle.blueGround)} style={{ backgroundColor: myStyle.blue }} />
      <div className='w-5 h-5 rounded-[50%] border' onClick={() => setBackgroundColor(myStyle.nonGround)} style={{ backgroundColor: myStyle.nonGround }} />
      <Tooltip title='Copier'>
        <div onClick={() => copyToClipboard(selectedText)} className='w-5 h-5 p-1 flex justify-center items-center text-gray-300 bg-gray-300 bg-opacity-20 rounded-[50%] cursor-pointer'>
          <CopyOutlined />
        </div>
      </Tooltip>
    </div>
  );
}

export default PaletteColor;
