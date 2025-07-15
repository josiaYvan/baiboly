/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-dupe-else-if */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-no-bind */
import {
  AlertFilled, AlertOutlined, BorderOutlined, FieldNumberOutlined, InteractionFilled,
  NumberOutlined
} from '@ant-design/icons';
import { Select } from 'antd';
import { useState, useRef, useEffect } from 'react';
import BPMAdjuster from '../components/tempo/Adjuster';
import config from '../components/tempo/Config';
import ControlPanel from '../components/tempo/ControlPannel';
import BeatManager from '../components/tempo/BeatManager';
import { myStyle } from '../utils/style';

const { soundUrls } = config;
const MIN_BPM = config.minBpm;
const MAX_BPM = config.maxBpm;
const MIN_BEAT = config.minBeat;
const MAX_BEAT = config.maxBeat;
const MAX_TICK_IN_TIME = config.maxTickInTime;

function Tempo({ themeIsDark, isActive }) {
  // Core audio states (useRef to avoid re-renders)
  const audioCtx = useRef(null);
  const amp = useRef(null);
  const playingSourcesRef = useRef(new Set());
  const timerIdRef = useRef(null);
  const nextNoteTimeRef = useRef(0);
  const soundBuffersRef = useRef(null);
  const patternSoundsRef = useRef([[2, 1], [0, 1], [0, 1], [0, 1]]);
  const currentPosRef = useRef({ rep: 0, beat: 0 });
  const nextBpmRef = useRef(config.initialBpm);
  const tapHistory = useRef([]);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [currentBeatIndex, setCurrentBeatIndex] = useState(null);
  const [countBeat, setCountBeat] = useState(null);
  const [currentTick, setCurrentTick] = useState(null);
  const [showCountBeat, setShowCountBeat] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const [showRandomNumber, setShowRandomNumber] = useState(false);
  const [maxRandomValue, setMaxRandomValue] = useState(10);

  // both UI and functional states
  const [patternSounds, setPatternSounds] = useState(patternSoundsRef.current);
  const [bpm, setBpm] = useState(nextBpmRef.current);
  const [isPlaying, setPlaying] = useState(false);

  // UI states
  const [maxBeats, setMaxBeats] = useState(0); // TODO: make UI shrink when amount of beats per rep exceeds 4
  const [flash, setFlash] = useState(false);

  const handleMaxRandomValueChange = (value) => {
    setMaxRandomValue(value);
  };

  const activeRef = useRef(isActive);

  useEffect(() => {
    activeRef.current = isActive;
  }, [isActive]);

  const beats = patternSounds.length;

  // Loads the beat audio files into AudioBuffers
  const loadBeatBuffers = async (audioContext, urls) => {
    const buffers = [];
    for (const url of urls) {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await audioContext.decodeAudioData(arrayBuffer);
      buffers.push(buffer);
    }
    return buffers;
  };

  const stopAllSources = () => {
    playingSourcesRef.current.forEach((source) => source.stop());
    playingSourcesRef.current.clear();
  };

  const getBeatDuration = (beats) => 60 / nextBpmRef.current / beats;

  const scheduleBeat = (time) => {
    const audioContext = audioCtx.current;
    if (!audioContext || !soundBuffersRef.current) return;

    const currentPatternSounds = patternSoundsRef.current;
    const { rep, beat } = currentPosRef.current;
    const beatSound = currentPatternSounds[rep][beat];
    setCurrentBeatIndex(beat);
    setCurrentTick(rep);
    setCountBeat(rep + 1);
    if (rep === 0 && beat === 0) setRandomNumber(Math.floor(Math.random() * maxRandomValue) + 1);

    const buffer = soundBuffersRef.current[beatSound];
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(time);

    if (amp.current) {
      const gainValue = beatSound === 0 ? 4 : 1; // Play gain x2 for the first beat

      amp.current.gain.setValueAtTime(gainValue, audioContext.currentTime);
      source.connect(amp.current);
      amp.current.connect(audioContext.destination);
    } else {
      source.connect(audioContext.destination);
    }

    playingSourcesRef.current.add(source);
    source.onended = () => playingSourcesRef.current.delete(source);
  };

  useEffect(() => {
    const audioContext = new AudioContext();
    audioCtx.current = audioContext;
    amp.current = audioCtx.current.createGain();
    amp.current.connect(audioCtx.current.destination);

    loadBeatBuffers(audioContext, soundUrls).then((buffers) => {
      soundBuffersRef.current = buffers;
    });

    return () => {
      audioContext.close();
    };
  }, []);

  useEffect(() => {
    const audioContext = audioCtx.current;
    if (!audioContext || !soundBuffersRef.current) return;

    let beatIndex = 0;
    let repIndex = 0;

    const play = () => {
      const now = audioContext.currentTime;

      if (nextNoteTimeRef.current <= now) {
        const currentPattern = patternSoundsRef.current[repIndex % patternSoundsRef.current.length];
        currentPosRef.current = {
          rep: repIndex % patternSoundsRef.current.length,
          beat: beatIndex % currentPattern.length
        };

        if (beatIndex === 0) {
          setFlash(true);
          setTimeout(() => setFlash(false), 50);
        }

        scheduleBeat(nextNoteTimeRef.current);

        nextNoteTimeRef.current += getBeatDuration(currentPattern.length); // Recalculate next note
        beatIndex++;

        if (beatIndex >= currentPattern.length) {
          beatIndex = 0; // Reset the beat index for the next repetition
          repIndex++; // Move to the next repetition
        }
      }

      // Schedule the next call of play
      const delta = Math.max(nextNoteTimeRef.current - now, 0);
      timerIdRef.current = window.setTimeout(play, delta * 1000);
    };

    if (isPlaying) {
      nextNoteTimeRef.current = audioContext.currentTime;
      beatIndex = 0;
      repIndex = 0;
      play();
    } else {
      if (timerIdRef.current !== null) {
        window.clearTimeout(timerIdRef.current);
      }
      stopAllSources();
    }

    return () => {
      if (timerIdRef.current !== null) {
        window.clearTimeout(timerIdRef.current);
      }
      stopAllSources();
    };
  }, [isPlaying]);

  useEffect(() => {
    patternSoundsRef.current = patternSounds;
  }, [patternSounds]);

  useEffect(() => {
    nextBpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    if (!audioCtx.current) {
      alert('Your browser does not support the Web Audio API. Please use a modern browser for full functionality.');
    }

    // Prevent pinch zoom
    const preventZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('touchmove', preventZoom, { passive: false });

    return () => {
      document.removeEventListener('touchstart', preventZoom);
      document.removeEventListener('touchmove', preventZoom);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeRef.current) return; // ignore les touches si Tempo n'est pas actif
      if (e.key === ' ') {
        e.preventDefault();
        setPlaying(!isPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeRef.current) return; // ignore les touches si Tempo n'est pas actif
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        addOneAllTick();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        removeLastAllTick();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        addBeat();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        removeBeat();
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        changeTempo(bpm - 1);
      } else if (e.key === 'PageDown') {
        e.preventDefault();
        changeTempo(bpm + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const changeTempo = (newTempo) => setBpm(newTempo < MIN_BPM ? MIN_BPM : newTempo > MAX_BPM ? MAX_BPM : newTempo);

  const handleTap = () => {
    vibrate();

    const now = Date.now();
    tapHistory.current.push(now);

    requestAnimationFrame(() => {
      if (tapHistory.current.length > config.maxHistoryLength) {
        tapHistory.current.shift();
      }

      if (tapHistory.current.length > 1) {
        const timeDifference = now - tapHistory.current[tapHistory.current.length - 2];

        if (timeDifference <= config.inactivityTime) {
          const averageTimeDifference = calculateAverageTimeDifference();
          const calculatedBpm = Math.round(60000 / averageTimeDifference);

          changeTempo(calculatedBpm);
        }
      }
    });
  };

  const calculateAverageTimeDifference = () => {
    const timeDifferences = tapHistory.current.map((tap, index, arr) => (index === 0 ? 0 : tap - arr[index - 1]));

    return timeDifferences.reduce((acc, val) => acc + val, 0) / (timeDifferences.length - 1);
  };

  function switchSound(beatIndex, tickIndex) {
    if (typeof beatIndex === 'undefined' || typeof tickIndex === 'undefined') return;

    const soundToChange = patternSounds[beatIndex][tickIndex];

    const newPattern = [...patternSounds];
    newPattern[beatIndex][tickIndex] = soundToChange === 2 ? 0 : soundToChange + 1;

    setPatternSounds(newPattern);
  }

  function addBeat() {
    if (beats === MAX_BEAT) return;

    const lastBeatLength = patternSounds[beats - 1].length;
    const newBeat = [0, ...new Array(lastBeatLength - 1).fill(1)];

    setPatternSounds([...patternSounds, newBeat]);
  }

  function removeBeat() {
    if (beats === MIN_BEAT) return;

    const newPattern = [...patternSounds];
    newPattern.pop();

    setPatternSounds(newPattern);
  }

  function addTick(beatIndex) {
    const currentBeat = patternSounds[beatIndex];

    if (currentBeat.length === config.maxTickInTime) return;

    const newBeat = [...currentBeat, 1];

    const newPattern = [...patternSounds];
    newPattern[beatIndex] = newBeat;

    setPatternSounds(newPattern);
  }

  function removeTick(beatIndex) {
    const currentBeat = patternSounds[beatIndex];

    if (currentBeat.length === 1) return;

    const newBeat = [...currentBeat];
    newBeat.pop();

    const newPattern = [...patternSounds];
    newPattern[beatIndex] = newBeat;

    setPatternSounds(newPattern);
  }

  function addOneAllTick() {
    const newPattern = patternSounds.map((subArray) => [...subArray, 1]);
    setPatternSounds(newPattern);
  }

  function removeLastAllTick() {
    const newPattern = patternSounds.map((subArray) => (subArray.length > 1 ? subArray.slice(0, -1) : subArray));
    setPatternSounds(newPattern);
  }

  function togglePlay() {
    setPlaying(!isPlaying);
  }

  // Vibration on bpm tap
  const vibrate = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(200);
    }
  };

  return (
    <div
      className='flex items-center justify-center min-h-screen'
    >
      <div className='absolute top-16 flex gap-6'>
        <div className={` flex gap-4 px-4 py-2 rounded-md border ${themeIsDark ? 'hover:bg-zinc-800 border-zinc-800' : 'hover:bg-zinc-300 border-zinc-300'} cursor-pointer text-yellow-500`} onClick={() => setIsFlashActive(!isFlashActive)}>
          {isFlashActive ? <AlertOutlined /> : <AlertFilled />}
          <p className='hidden sm:block'>Flash screen</p>
        </div>
        <div className={`flex gap-4 px-4 py-2 rounded-md border ${themeIsDark ? 'hover:bg-zinc-800 border-zinc-800' : 'hover:bg-zinc-300 border-zinc-300'} cursor-pointer text-yellow-500`} onClick={() => setShowCountBeat(!showCountBeat)}>
          {showCountBeat ? <BorderOutlined /> : <InteractionFilled />}
          <p className='hidden sm:block'>Show count</p>
        </div>
        <div
          className={`flex gap-4 px-4 py-2 rounded-md border ${themeIsDark ? 'hover:bg-zinc-800 border-zinc-800' : 'hover:bg-zinc-300 border-zinc-300'} cursor-pointer text-yellow-500`}
          onClick={() => setShowRandomNumber(!showRandomNumber)}
        >
          {showRandomNumber ? <NumberOutlined /> : <FieldNumberOutlined />}
          <p className='hidden sm:block'>Random</p>
        </div>
        {showRandomNumber && (
          <Select
            defaultValue={10}
            style={{ width: 120 }}
            onChange={handleMaxRandomValueChange}
          >
            {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((value) => (
              <Select.Option key={value} value={value}>{value}</Select.Option>
            ))}
          </Select>
        )}
      </div>
      <div className={`mt-28 flex flex-col py-4 items-center ${maxBeats > 4 ? 'md:space-y-2' : 'md:space-y-6'} text-md text-zinc-50`}>
        <div className={`px-6 sm:px-12 py-2 sm:py-4 rounded-2xl transition-[background-color] ease-out duration-500  ${themeIsDark ? 'md:bg-zinc-800' : 'md:bg-white'}`}>
          <div className={`absolute inset-0 z-20 h-screen w-full pointer-events-none ${isFlashActive ? (flash ? 'flash-effect' : '') : ''}`}>
            <p
              className={`fixed w-full flex items-center justify-center text-[50vw] ${themeIsDark ? 'text-zinc-50' : 'text-zinc-900'} h-screen`}
              style={{ textShadow: '0 0 20px' }}
            >
              {showRandomNumber ? randomNumber : showCountBeat ? countBeat : ''}
            </p>
          </div>
          <BeatManager
            themeIsDark={themeIsDark}
            patternSounds={patternSounds}
            switchSound={switchSound}
            handleAddTick={addTick}
            handleRemoveTick={removeTick}
            handleAddBeat={addBeat}
            handleRemoveBeat={removeBeat}
            currentBeatIndex={currentBeatIndex}
            currentTick={currentTick}
            isFlashActive={isFlashActive}
          />
        </div>
        <BPMAdjuster
          bpm={bpm}
          handleBpmChange={changeTempo}
          handleTap={handleTap}
          themeIsDark={themeIsDark}
        />

        <ControlPanel className='mt-6 sm:mt-8' isPlaying={isPlaying} togglePlay={togglePlay} themeIsDark={themeIsDark} />
      </div>
    </div>
  );
}

export default Tempo;
