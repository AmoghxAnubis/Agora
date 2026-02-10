-- Create tables
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  avatar_url text,
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(username) >= 3)
);

create table if not exists public.rooms (
  room_id text primary key,
  owner_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.saved_code (
  id uuid default gen_random_uuid() primary key,
  room_id text references public.rooms(room_id) on delete cascade not null,
  code text,
  language text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.rooms enable row level security;
alter table public.saved_code enable row level security;

-- Profiles Policies
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Rooms Policies
drop policy if exists "Rooms are viewable by everyone" on public.rooms;
create policy "Rooms are viewable by everyone"
  on public.rooms for select
  using ( true );

drop policy if exists "Users can create rooms" on public.rooms;
create policy "Users can create rooms"
  on public.rooms for insert
  with check ( auth.uid() = owner_id );

-- Saved Code Policies
drop policy if exists "Saved code is viewable by everyone" on public.saved_code;
create policy "Saved code is viewable by everyone"
  on public.saved_code for select
  using ( true );

drop policy if exists "Saved code is editable by everyone in the room" on public.saved_code;
create policy "Saved code is editable by everyone in the room"
  on public.saved_code for insert
  with check ( true );

drop policy if exists "Saved code is updatable by everyone in the room" on public.saved_code;
create policy "Saved code is updatable by everyone in the room"
  on public.saved_code for update
  using ( true );
