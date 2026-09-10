-- 사용자 소유 Supabase 프로젝트의 SQL Editor에서 한 번 실행합니다.
-- 개인 체크 기록이나 로그인 비밀키는 이 파일에 넣지 않습니다.
create table if not exists public.learning_sync (
  user_id uuid primary key references auth.users(id) on delete cascade,
  revision bigint not null check (revision > 0),
  data jsonb not null check (jsonb_typeof(data) = 'object' and data ->> 'version' = '1' and octet_length(data::text) < 1000000),
  updated_at timestamptz not null default now()
);

alter table public.learning_sync enable row level security;
revoke all on public.learning_sync from anon;
grant select, insert, update on public.learning_sync to authenticated;
drop policy if exists learning_owner_read on public.learning_sync;
create policy learning_owner_read on public.learning_sync for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists learning_owner_insert on public.learning_sync;
create policy learning_owner_insert on public.learning_sync for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists learning_owner_update on public.learning_sync;
create policy learning_owner_update on public.learning_sync for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create or replace function public.save_learning_sync(expected_user_id uuid, expected_revision bigint, next_data jsonb)
returns setof public.learning_sync
language plpgsql security invoker set search_path = '' as $$
begin
  if auth.uid() is null or expected_user_id is null or auth.uid() <> expected_user_id then raise exception '로그인이 필요합니다.' using errcode = '42501'; end if;
  if expected_revision = 0 then
    return query insert into public.learning_sync(user_id, revision, data)
      values (auth.uid(), 1, next_data)
      on conflict (user_id) do nothing returning *;
  else
    return query update public.learning_sync
      set data = next_data, revision = revision + 1, updated_at = now()
      where user_id = auth.uid() and revision = expected_revision returning *;
  end if;
end;
$$;
revoke all on function public.save_learning_sync(uuid, bigint, jsonb) from public, anon;
grant execute on function public.save_learning_sync(uuid, bigint, jsonb) to authenticated;

do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'learning_sync') then
    alter publication supabase_realtime add table public.learning_sync;
  end if;
end;
$$;
