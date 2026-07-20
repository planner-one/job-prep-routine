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

const ROADMAP_CATEGORIES = new Set(['workout', 'normal', 'running', 'maintenance']);

const ROADMAP_PRINCIPLES = Object.freeze([
  { number: '01', title: '지원은 하루 3~4개', description: '공고 분석부터 자소서 조정·제출까지 한 흐름으로 끝낸다.' },
  { number: '02', title: '면접 언어를 매일 다듬기', description: '이력서와 포트폴리오를 내 말로 설명하는 시간을 지킨다.' },
  { number: '03', title: '학습은 결과물로 남기기', description: '선택한 주제를 작은 구현이나 프로젝트 적용으로 연결한다.' },
]);

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

export function resolveRoadmapVariantId(category, runStart = '21') {
  const safeCategory = ROADMAP_CATEGORIES.has(category) ? category : 'workout';
  if (safeCategory !== 'running') return safeCategory;
  return `running-${runStart === '22' ? '22' : '21'}`;
}

function renderPrintIntro(pageDocument, variant) {
  const intro = pageDocument.createElement('div');
  intro.className = 'roadmap-print-intro print-only';
  intro.innerHTML = `
    <header class="roadmap-print-page-heading">
      <div><p class="eyebrow">운영 기준표</p><h1>취업 준비 운영 로드맵</h1></div>
      <div><strong>${variant.label}</strong><span>${variant.description}</span></div>
    </header>
    <section class="roadmap-print-principles" aria-label="핵심 운영 원칙"></section>
  `;
  const principles = intro.querySelector('.roadmap-print-principles');
  for (const principle of ROADMAP_PRINCIPLES) {
    const card = pageDocument.createElement('article');
    card.className = 'focus-anchor';
    card.innerHTML = `<span class="principle-number" aria-hidden="true">${principle.number}</span><h2>${principle.title}</h2><p>${principle.description}</p>`;
    principles.append(card);
  }
  return intro;
}

function renderVariant(pageDocument, variant) {
  const section = pageDocument.createElement('section');
  section.id = `roadmap-panel-${variant.id}`;
  section.className = 'roadmap-mode-section';
  section.dataset.roadmapVariant = variant.id;
  section.setAttribute('role', 'tabpanel');
  section.setAttribute('aria-label', variant.label);
  const heading = pageDocument.createElement('header');
  heading.className = 'roadmap-mode-heading';
  const title = pageDocument.createElement('h2');
  title.textContent = variant.label;
  const description = pageDocument.createElement('p');
  description.textContent = variant.description;
  heading.append(title, description);
  section.append(renderPrintIntro(pageDocument, variant));
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
  let activeCategory = 'workout';
  let activeRunStart = '21';
  const categoryButtons = [...pageDocument.querySelectorAll('[data-roadmap-category]')];
  const runButtons = [...pageDocument.querySelectorAll('[data-roadmap-run-start]')];
  const runPicker = pageDocument.getElementById('roadmap-run-time-picker');
  const panels = [...list.querySelectorAll('[data-roadmap-variant]')];

  function updateView() {
    const activeVariant = resolveRoadmapVariantId(activeCategory, activeRunStart);
    for (const button of categoryButtons) {
      const selected = button.dataset.roadmapCategory === activeCategory;
      button.setAttribute('aria-selected', String(selected));
      if (selected) button.setAttribute('aria-controls', `roadmap-panel-${activeVariant}`);
      else button.removeAttribute('aria-controls');
    }
    runPicker.hidden = activeCategory !== 'running';
    for (const button of runButtons) {
      button.setAttribute('aria-pressed', String(button.dataset.roadmapRunStart === activeRunStart));
    }
    for (const panel of panels) panel.hidden = panel.dataset.roadmapVariant !== activeVariant;
  }

  function selectCategory(category) {
    activeCategory = ROADMAP_CATEGORIES.has(category) ? category : 'workout';
    updateView();
  }

  function selectRunStart(runStart) {
    activeRunStart = runStart === '22' ? '22' : '21';
    updateView();
  }

  categoryButtons.forEach((button) => button.addEventListener('click', () => selectCategory(button.dataset.roadmapCategory)));
  runButtons.forEach((button) => button.addEventListener('click', () => selectRunStart(button.dataset.roadmapRunStart)));
  updateView();
  pageDocument.documentElement.dataset.roadmapReady = 'true';
  return { variants, selectCategory, selectRunStart };
}

if (typeof document !== 'undefined') {
  const boot = () => initRoadmapReference(document);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}
