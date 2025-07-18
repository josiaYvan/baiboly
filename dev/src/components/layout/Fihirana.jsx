import { RenderSong } from './RenderSong';

export function Fihirana({ themeIsDark }) {
  return (
    <section id='home'>
      <main className='px-6'>
        <RenderSong themeIsDark={themeIsDark} />
      </main>
    </section>
  );
}
