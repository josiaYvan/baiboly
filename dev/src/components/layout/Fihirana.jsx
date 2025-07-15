import { myStyle } from '../../utils/style';
import { RenderSong } from './RenderSong';

export function Fihirana({ themeIsDark }) {
  return (
    <section id='home'>
      <div
        className='flex pt-20 flex-col items-center justify-center transition duration-500 ease-in-out'
        style={{
          backgroundColor: themeIsDark ? myStyle.bg : myStyle.light
        }}
      >
        <div className=''>
          <main className='px-6'>
            <RenderSong />
          </main>
        </div>
      </div>
    </section>
  );
}
