export const MODES = ['workout', 'normal', 'running', 'maintenance'];

export const LEARNING_TOPICS = ['Spring', 'Redis', 'Java', '프로젝트 적용', 'CS', '코딩테스트'];

export const PLATFORMS = ['사람인', '점핏', '원티드', '잡코리아', '기타'];

const scheduleItem = (id, time, label, category, period) => ({ id, time, label, category, period });

const COMMON_DAYTIME = [
  scheduleItem('scan', '08:50–09:20', '일정 확인·신규 공고 스캔', 'career', 'morning'),
  scheduleItem('portfolio-review', '09:30–10:00', '이력서·포트폴리오 숙지', 'career', 'morning'),
  scheduleItem('interview-practice', '10:00–12:00', '면접 연습·이력서·포트폴리오 개선', 'career', 'morning'),
  scheduleItem('lunch', '12:00–13:00', '점심·식후 20분', 'meal', 'afternoon'),
  scheduleItem('applications', '13:00–16:30', '공고 분석·자소서 조정·지원 3~4개', 'career', 'afternoon'),
  scheduleItem('afternoon-break', '16:30–16:50', '휴식·산책', 'exercise', 'afternoon'),
  scheduleItem('learning', '16:50–18:50', '선택 조합 학습·프로젝트 적용', 'learning', 'afternoon'),
  scheduleItem('dinner', '18:50–19:50', '저녁·식후 20분', 'meal', 'evening'),
];

const WORKOUT_SCHEDULE = [
  scheduleItem('workout-wake', '05:40', '기상·운동 준비', 'exercise', 'morning'),
  scheduleItem('workout', '06:00–07:30', '아침 운동', 'exercise', 'morning'),
  scheduleItem('workout-breakfast', '07:30–08:50', '귀가·샤워·아침·식후 20분', 'meal', 'morning'),
  ...COMMON_DAYTIME,
  scheduleItem('workout-evening', '19:50–21:00', '면접 복기 또는 프로젝트 실습', 'career', 'evening'),
  scheduleItem('workout-extension', '21:00–22:00', '작업 연장 선택 또는 귀가', 'career', 'evening'),
  scheduleItem('workout-shower', '22:00–22:30', '샤워·정리', 'exercise', 'night'),
  scheduleItem('workout-wrap', '22:30–23:00', '가벼운 추가 마무리·내일 준비', 'career', 'night'),
  scheduleItem('workout-sleep', '23:00–24:00', '취침', 'exercise', 'night'),
];

const NORMAL_SCHEDULE = [
  scheduleItem('normal-wake', '07:00', '기상', 'exercise', 'morning'),
  scheduleItem('normal-breakfast', '07:10–08:20', '산책·개인 정비·아침·식후 20분', 'meal', 'morning'),
  ...COMMON_DAYTIME,
  scheduleItem('normal-evening', '19:50–21:30', '면접 복기 또는 프로젝트 실습', 'career', 'evening'),
  scheduleItem('normal-return', '21:30–22:00', '귀가', 'exercise', 'evening'),
  scheduleItem('normal-shower', '22:00–22:30', '샤워·정리', 'exercise', 'night'),
  scheduleItem('normal-wrap', '22:30–23:00', '가벼운 추가 마무리·내일 준비', 'career', 'night'),
  scheduleItem('normal-sleep', '23:00–24:00', '취침', 'exercise', 'night'),
];

const RUNNING_SCHEDULES = {
  21: [
    scheduleItem('running-wake', '07:00', '기상', 'exercise', 'morning'),
    scheduleItem('running-breakfast', '07:10–08:20', '산책·개인 정비·아침·식후 20분', 'meal', 'morning'),
    ...COMMON_DAYTIME,
    scheduleItem('running-evening', '19:50–20:50', '가벼운 면접 복기·마감', 'career', 'evening'),
    scheduleItem('run', '21:00–22:00', '이동 포함 저녁 러닝', 'exercise', 'evening'),
    scheduleItem('running-shower', '22:00–22:30', '샤워·정리', 'exercise', 'night'),
    scheduleItem('running-wrap', '22:30–23:00', '가벼운 추가 마무리·내일 준비', 'career', 'night'),
    scheduleItem('running-sleep', '23:00–24:00', '취침', 'exercise', 'night'),
  ],
  22: [
    scheduleItem('running-wake', '07:00', '기상', 'exercise', 'morning'),
    scheduleItem('running-breakfast', '07:10–08:20', '산책·개인 정비·아침·식후 20분', 'meal', 'morning'),
    ...COMMON_DAYTIME,
    scheduleItem('running-evening', '19:50–21:30', '면접 복기 또는 프로젝트 실습', 'career', 'evening'),
    scheduleItem('run', '22:00–23:00', '이동 포함 저녁 러닝', 'exercise', 'night'),
    scheduleItem('running-shower', '23:00–23:30', '샤워·정리', 'exercise', 'night'),
    scheduleItem('running-wrap', '23:30–24:00', '가벼운 추가 마무리·취침 준비', 'career', 'night'),
    scheduleItem('running-sleep', '24:00', '취침', 'exercise', 'night'),
  ],
};

const MAINTENANCE_SCHEDULE = [
  scheduleItem('maintenance-wake', '08:00', '기상·회복', 'exercise', 'morning'),
  scheduleItem('maintenance-breakfast', '08:10–09:00', '아침·식후 20분', 'meal', 'morning'),
  scheduleItem('maintenance-portfolio', '10:00–10:30', '이력서·포트폴리오 숙지', 'career', 'morning'),
  scheduleItem('maintenance-application', '10:30–11:30', '마감 임박 공고 확인 및 필요 시 1개 지원', 'career', 'morning'),
  scheduleItem('maintenance-lunch', '12:00–13:00', '점심·식후 20분', 'meal', 'afternoon'),
  scheduleItem('maintenance-learning', '14:00–15:00', '이번 주 핵심 학습 복습', 'learning', 'afternoon'),
  scheduleItem('maintenance-interview', '17:00–17:30', '면접 답변 3개 복기', 'career', 'afternoon'),
  scheduleItem('maintenance-dinner', '18:00–19:00', '저녁·식후 20분', 'meal', 'evening'),
  scheduleItem('maintenance-planning', '20:00–20:30', '다음 주 일정·학습 주제 선정', 'learning', 'evening'),
  scheduleItem('maintenance-rest', '20:30 이후', '완전 휴식', 'exercise', 'evening'),
  scheduleItem('maintenance-sleep', '23:00', '취침', 'exercise', 'night'),
];

const SCHEDULES = {
  workout: WORKOUT_SCHEDULE,
  normal: NORMAL_SCHEDULE,
  maintenance: MAINTENANCE_SCHEDULE,
};

export function getSchedule(mode, runStart = '21') {
  const schedule = mode === 'running' ? RUNNING_SCHEDULES[runStart === '22' ? 22 : 21] : SCHEDULES[mode];
  return schedule.map((item) => ({ ...item }));
}
