CREATE TABLE coffee_shops (
    store_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    menu_link VARCHAR(255)
);

-- INSERT INTO coffee_shops (name, location, website, menu_link) VALUES (
--     ('Polite Coffee Roasters')
-- )

CREATE TABLE feature_tags (
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE coffee_shop_features (
    store_id INT REFERENCES coffee_shops(store_id) ON DELETE CASCADE, -- Foreign key to coffee_shops, will delete when the store_id is deleted
    tag_id INT REFERENCES feature_tags(tag_id) ON DELETE CASCADE, -- Foreign key to feature_tags, will delete when the tag_id is deleted
    PRIMARY KEY (store_id, tag_id) -- Composite primary key to prevent duplicate entries
);

-- create schema if not exists api;
-- grant usage on schema api to anon, authenticated;

-- create table if not exists api.test_table ();

-- alter table api.test_table enable row level security;
-- create policy "Allow public read access" 
-- on api.test_table
-- for select 
-- using (true);
-- grant select on api.test_table to anon, authenticated;