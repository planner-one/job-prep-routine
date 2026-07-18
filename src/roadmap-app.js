import { getSchedule } from './routine-data.js';

const PERIOD_LABELS = {
  morning: '오전',
  afternoon: '오후',
  evening: '저녁',
  night: '밤',
};

const CATEGORY_LABELS = {
  exercise: '운동·회복',
  career: '취업·면접',
  learning: '개발 학습',
  meal: '식사·휴식',
};

export const ROADMAP_VARIANTS = Object.freeze([
  { id: 'workout', mode: 'workout', runStart: '21', label: '운동일', description: '아침 운동으로 시작하는 실행일' },
  { id: 'normal', mode: 'normal', runStart: '21', label: '비운동일', description: '취업 준비와 개발 학습에 집중하는 날' },
  { id: 'running-21', mode: 'running', runStart: '21', label: '러닝일 · 21시 시작', description: '21시 러닝을 포함한 하루' },
  { id: 'running-22', mode: 'running', runStart: '22', label: '러닝일 · 22시 시작', description: '22시 러닝을 포함한 하루' },
  { id: 'maintenance', mode: 'maintenance', runStart: '21', label: '핵심 유지일', description: '회복하면서 핵심만 지키는 날' },
]);

export function getRoadmapVariants() {
  return ROADMAP_VARIANTS.map((variant) => ({
    ...variant,
    schedule: getSchedule(variant.mode, variant.runStart).map((item) => ({
      ...item,
      time: formatReferenceTime(item.time),
    })),
  }));
}

export function formatReferenceTime(value) {
  return value.replaceAll('–', '-').replaceAll('~', '-');
}

function renderVariant(pageDocument, variant) {
  const section = pageDocument.createElement('section');
  section.className = 'roadmap-mode-section';
  section.dataset.roadmapVariant = variant.id;
  const heading = pageDocument.createElement('header');
  heading.className = 'roadmap-mode-heading';
  const title = pageDocument.createElement('h2');
  title.textContent = variant.label;
  const description = pageDocument.createElement('p');
  description.textContent = variant.description;
  heading.append(title, description);
  section.append(heading);

  for (const period of Object.keys(PERIOD_LABELS)) {
    const items = variant.schedule.filter((item) => item.period === period);
    if (items.length === 0) continue;
    const group = pageDocument.createElement('section');
    group.className = 'roadmap-reference-period';
    const periodTitle = pageDocument.createElement('h3');
    periodTitle.textContent = PERIOD_LABELS[period];
    const list = pageDocument.createElement('div');
    list.className = 'roadmap-reference-rows';
    for (const item of items) {
      const row = pageDocument.createElement('article');
      row.className = 'roadmap-reference-row';
      row.dataset.referenceItem = item.id;
      const time = pageDocument.createElement('time');
      time.textContent = item.time;
      const label = pageDocument.createElement('span');
      label.textContent = item.label;
      const category = pageDocument.createElement('span');
      category.className = `roadmap-category roadmap-category--${item.category}`;
      category.textContent = CATEGORY_LABELS[item.category];
      row.append(time, label, category);
      list.append(row);
    }
    group.append(periodTitle, list);
    section.append(group);
  }
  return section;
}

export function initRoadmapReference(pageDocument) {
  const root = pageDocument.getElementById('roadmap-page');
  const list = pageDocument.getElementById('roadmap-reference-list');
  if (!root || !list) return null;
  const variants = getRoadmapVariants();
  list.replaceChildren(...variants.map((variant) => renderVariant(pageDocument, variant)));
  pageDocument.documentElement.dataset.roadmapReady = 'true';
  return { variants };
}

if (typeof document !== 'undefined') {
  const boot = () => initRoadmapReference(document);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}
