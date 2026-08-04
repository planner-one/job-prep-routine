const LEGACY_LEARNING_IDS = new Set([
  'learning',
  'maintenance-learning',
  'maintenance-planning',
  'Spring',
  'Redis',
  'Java',
  '프로젝트 적용',
  'CS',
  '코딩테스트',
]);

export function isLegacyLearningId(value) {
  return typeof value === 'string'
    && (value.startsWith('learning:') || LEGACY_LEARNING_IDS.has(value));
}

export function isLegacyLearningItem(value) {
  return Boolean(
    value
    && typeof value === 'object'
    && !Array.isArray(value)
    && (
      value.category === 'learning'
      || isLegacyLearningId(value.id)
    ),
  );
}
