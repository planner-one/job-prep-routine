import { getSchedule } from '../../src/routine-data.js';

export const dailyProgressFixture = {
  mode: 'workout',
  runStart: '21',
  checkedIds: [
    ...getSchedule('workout', '21').map(({ id }) => id),
    'normal-wake',
    'unknown-schedule',
  ],
  companies: Array.from({ length: 4 }, (_, index) => ({
    name: `회사 ${index + 1}`,
    platform: '사람인',
    analyzed: true,
    letter: true,
    applied: true,
    link: '',
  })),
  memos: {
    implemented: '',
    blocked: '',
    firstAction: '',
  },
};

export const dailyProgressExpected = {
  completed: 27,
  total: 27,
  percent: 100,
};
