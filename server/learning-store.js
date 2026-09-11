// DATABASE_URL은 Vercel 서버에서만 읽습니다. 브라우저에는 전달하지 않습니다.
export function createNeonStore(sql) {
  let ready;
  function prepare() {
    if (!ready) ready = sql.transaction([
      sql`SELECT pg_advisory_xact_lock(724091101)`,
      sql`CREATE TABLE IF NOT EXISTS routine_learning_sync (
        id integer PRIMARY KEY CHECK (id = 1),
        revision bigint NOT NULL CHECK (revision > 0),
        data jsonb NOT NULL,
        updated_at timestamptz NOT NULL DEFAULT now()
      )`,
    ]).catch(error => { ready = null; throw error; });
    return ready;
  }
  const row = value => value ? { revision: Number(value.revision), data: value.data } : null;
  return {
    async read(revision = -1) {
      await prepare();
      const rows = await sql`SELECT revision, CASE WHEN revision = ${revision} THEN NULL ELSE data END AS data FROM routine_learning_sync WHERE id = 1`;
      return row(rows[0]);
    },
    async write(revision, data) {
      await prepare();
      const json = JSON.stringify(data);
      const rows = revision === 0
        ? await sql`INSERT INTO routine_learning_sync (id, revision, data) VALUES (1, 1, ${json}::jsonb) ON CONFLICT (id) DO NOTHING RETURNING revision, data`
        : await sql`UPDATE routine_learning_sync SET revision = revision + 1, data = ${json}::jsonb, updated_at = now() WHERE id = 1 AND revision = ${revision} RETURNING revision, data`;
      return row(rows[0]);
    },
  };
}

let connection, store;
export async function getLearningStore(url) {
  if (!store || connection !== url) {
    const { neon } = await import('@neondatabase/serverless');
    store = createNeonStore(neon(url)); connection = url;
  }
  return store;
}
