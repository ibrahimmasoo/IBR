-- Run this in Supabase SQL Editor

alter table public.contact_messages enable row level security;

drop policy if exists "allow public insert" on public.contact_messages;
create policy "allow public insert"
on public.contact_messages
for insert
to anon, authenticated
with check (true);

drop policy if exists "allow authenticated read messages" on public.contact_messages;
create policy "allow authenticated read messages"
on public.contact_messages
for select
to authenticated
using (true);

grant usage on schema public to anon, authenticated;
grant insert on table public.contact_messages to anon, authenticated;
grant select on table public.contact_messages to authenticated;