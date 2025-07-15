/* eslint-disable global-require */
const config = {
  soundUrls: [require('../../data/beat.wav'), require('../../data/click.wav'), require('../../data/accent.wav')],
  maxBeat: 8,
  minBeat: 2,
  maxTickInTime: 16,
  maxHistoryLength: 2,
  inactivityTime: 3000,
  minBpm: 15,
  maxBpm: 300,
  initialBpm: 100
};

export default config;
