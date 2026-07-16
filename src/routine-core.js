export const storageKey = (page, date) => `job-prep-routine:${page}:${date}`;

export function loadState(storage, page, date, fallback) {
  const raw = storage.getItem(storageKey(page, date));
  if (!raw) return structuredClone(fallback);
  try {
    return JSON.parse(raw);
  } catch {
    return structuredClone(fallback);
  }
}

export function saveState(storage, page, date, state) {
  storage.setItem(storageKey(page, date), JSON.stringify(state));
}

export function clearState(storage, page, date) {
  storage.removeItem(storageKey(page, date));
}

export function countPipelineProgress(companies) {
  const completedSteps = companies.reduce(
    (sum, company) => sum + ['analyzed', 'letter', 'applied'].filter((key) => company[key]).length,
    0,
  );
  return {
    applied: companies.filter((company) => company.applied).length,
    completedSteps,
    totalSteps: companies.length * 3,
  };
}
