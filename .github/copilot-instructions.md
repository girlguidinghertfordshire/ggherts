# AI Coding Agent Instructions for Girlguiding Hertfordshire

These instructions help AI agents work productively in this Jekyll-based static site.

## Overview
- Architecture: Jekyll site compiled to static HTML; legacy `wp-content/` assets remain but the site is no longer WordPress. Production is served by Cloudflare Pages.
- Structure: Content organized via Jekyll collections defined in [_config.yml](_config.yml): `events`, `trainingevents`, `posts`, `noticeboards`, `fundraising_ideas`, etc. Output goes to `_site/`.
- Layouts/Includes: Page templates live in [_layouts](_layouts) (e.g., [_layouts/event-v5.html](_layouts/event-v5.html), [_layouts/post-v5.html](_layouts/post-v5.html)). Reusable UI pieces are in [_includes](_includes) (e.g., [_includes/latest-events-v5.html](_includes/latest-events-v5.html), [_includes/main-navigation-v5.html](_includes/main-navigation-v5.html)).
- Data-driven navigation: Main nav and section menus are driven by [_data/navigation.yml](_data/navigation.yml). Update here to expose new sections.
- Plugins: See [Gemfile](Gemfile) for `jekyll-sitemap`, `jekyll-feed`, `jekyll-seo-tag`.

## Developer Workflow
- Dependencies: Ruby + Bundler. Install gems from [Gemfile](Gemfile).
- Local dev:

```bash
bundle install
bundle exec jekyll serve --config _config.yml,_config.development.yml
# Or run the helper: [jekyll-dev.bat](jekyll-dev.bat)
```

- Config profiles: [_config.yml](_config.yml) for production; [_config.development.yml](_config.development.yml) overrides local settings (e.g., `url`, local email API). Avoid committing secrets; keys live in config files.
- Output: Jekyll writes to [`_site/`](_site). Do not edit `_site/` directly.

## Collections & Front Matter
- Defaults: Collection-specific defaults (layout, `toc`, sorting) are set in [_config.yml](_config.yml).
  - `events` and `trainingevents` pages sort by `event.start_date`.
  - `posts` use layout `post-v5` and `toc: news`.
- Front matter markers: Always preserve the opening and closing YAML front matter lines (`---` at the top and `---` before content). When editing Markdown files, ensure these markers remain intact and unmodified. Include them in apply_patch contexts so they are not removed.
- Events: Store under [`_events/`](_events) as `YYYY-MM-DD-slug.md`. Use nested `event` data:

```yaml
---
title: 'Great Patrol Hunt - round 1'
date: 2025-06-29T21:07:00 +01:00
published: false
banner_image: /assets/images/.../banner.webp
event:
  start_date: '2025-10-18'
  end_date: ''
  address: null
  book_now_link: ''
  image: '/assets/images/.../gph.webp'
  type:
    - Activity
  age-group:
    - Guides
  location:
    - Hertfordshire
---
```

- Training events: Mirror the `event` schema (see example in [`_trainingevents/`](
_trainingevents)).
- Posts/Noticeboard: Markdown or HTML with standard front matter; `permalink` can override URLs.
- Posts/Noticeboard: Markdown or HTML with standard front matter; `permalink` can override URLs. Use `image` at 360x200 for listings, `categories` (case-sensitive), optional `description` for listing snippet, and `author.display_name` for the byline.
- Publishing control: `published: false` hides a page while retaining it for archive.

### Other Collections
- County team: Members in [_members](_members) use `groups` with nested `roles` containing `order`, `job_title`, `person_intro`, `email`, `vacancyurl`. Display depends on group keys: `commissioners`, `divcomm`, `youthopp`, `outdoor`, `international`, `leads`, `vp`, `staff`. See layout [\_layouts/county_team.html](_layouts/county_team.html).
- Shops & nights away: Entries in [_shops_nights](_shops_nights) have `shop` fields: `mapaddress`, multi-line `location`, `division`, optional `county`, `contact_name`, `contact_email`, `contact_number`, `latlng`, and `type` (one or more of `Campsite`, `Indoor Accommodation`, `Shop`). Defaults in [_config.yml](_config.yml) enable maps (`location_map`, `showmap`) and set `county`. See layout [\_layouts/shops_nights.html](_layouts/shops_nights.html).
- Fundraising ideas: Minimal front matter (`title`, `date`) in [_fundraising_ideas](_fundraising_ideas); body is shown on click-through.
- Vacancies: Use `title`, `date`, `image`, `download`, and `categories` (e.g., `County team`, `Divisions`, `Trainers`) in [_vacancies](_vacancies). Button text defaults set via [_config.yml](_config.yml). See include [\_includes/vacancy.html](_includes/vacancy.html).
- Membership updates: Use `title` (`Month Year`), `date` (sort), and `year` in [_membership_updates](_membership_updates); first content heading should be `###` to populate local menus.

## Examples

### Events
- Checklist:
  - `event.start_date` uses `yyyy-MM-dd` (e.g., 2026-03-14).
  - `image` is 360x200 and under `assets/images/...` (prefer `.webp`).
  - `location` includes `Hertfordshire` plus division (e.g., `Hertfordshire, Central`).
  - `type` uses defined values (e.g., `Activity`, `Walking`, `1st response`).
  - If multiple `1st response` courses exist, add a unique `permalink`.
  - `date` is not in the future (future pages don’t compile).
```yaml
---
title: 'Great Patrol Hunt - round 1'
date: 2025-06-29T21:07:00 +01:00
published: false
banner_image: /assets/images/2025/06/gph-banner.webp
event:
  start_date: '2025-10-18'
  end_date: ''
  address: Morven Guide HQ, Potters Bar
  contact_name: ''
  contact_email: ''
  contact_number: ''
  book_now_link: ''
  image: '/assets/images/2025/05/gph.webp'
  type:
    - Activity
  age-group:
    - Guides
  location:
    - 'Hertfordshire'
---
```

### Training events
- Checklist:
  - Same `event:` schema as events.
  - `image` is 360x200 under `assets/images/...`.
  - `location` uses division format (e.g., `Hertfordshire, Central`).
  - Use `type: First aid` for first aid courses; `1st response` auto-adds e-learning text.
  - Use `permalink` when multiple similar trainings are advertised.
```yaml
---
title: '1st response course'
date: 2025-11-16T09:53:00Z
event:
  start_date: '2026-01-17'
  end_date: ''
  address: Christchurch Baptist Parkway, 110 Parkway, AL8 6HN
  book_now_link: 'https://eventbrite.example.com/...'
  image: '/assets/images/2024/12/first-aid.webp'
  type:
    - First aid
  age-group:
    - Rangers
    - Leaders
  location:
    - 'Hertfordshire, Central'
---
```

### News posts
- Checklist:
  - `image` is 360x200 under `assets/images/...`.
  - `categories` are case-sensitive and consistent.
  - Optional `description` controls listing snippet; otherwise first paragraph used.
  - `author.display_name` is present for byline.
  - `date` not in future (future posts won’t compile).
```yaml
---
title: 'Post title'
date: 2024-06-09T15:23:00 +01:00
image: /assets/images/2024/02/1st-response.webp
categories:
  - Announcements
description: Optional listing snippet override
author:
  display_name: 'Author Name'
---
```

### Noticeboard posts
- Checklist:
  - `image` is 360x200 under `assets/images/...`.
  - `categories` include `Notice` (case-sensitive).
  - `author.display_name` present.
  - `date` not in future.
```yaml
---
title: 'Notice title'
date: 2024-06-09T15:23:00 +01:00
image: /assets/images/2024/02/notice.webp
categories:
  - Notice
author:
  display_name: 'Team Name'
---
```

### Shops & nights away
- Checklist:
  - `date` must be in the past (required for display).
  - `shop.mapaddress` is single-line; `shop.location` uses multiline `|`.
  - `shop.latlng` as `lat,lon` (e.g., `51.731079,-0.449067`).
  - `shop.type` is one or more of `Campsite`, `Indoor Accommodation`, `Shop`.
  - Use `division`; `county` optional for non-Herts entries.
```yaml
---
title: 'Location name'
date: 2016-05-19 15:16:16.000000000 +01:00
shop:
  mapaddress: 'Single line address for maps'
  location: |
    Multi-line,
    Address format,
    For display,
    AL1 1AL
  division: West
  county: Hertfordshire
  contact_name: ''
  contact_email: ''
  contact_number: ''
  latlng: '51.731079,-0.449067'
  type:
    - Campsite
    - Indoor Accommodation
---
```

### Vacancies
- Checklist:
  - `categories` must match supported sets (e.g., `County team`, `Divisions`, `Trainers`).
  - `download` points to a PDF under `assets/docs/<year>/...`.
  - `image` under `assets/images/...` (use consistent naming and cache-busting when updating).
```yaml
---
title: 'Role title'
date: 2024-05-08T21:10:00 +01:00
image: /assets/images/2024/04/dofe.webp
download: '/assets/docs/2024/role-description.pdf'
categories:
  - County team
---
```

### Fundraising ideas
- Checklist:
  - Minimal front matter: `title` and `date`.
  - Body content shows on click-through.
```yaml
---
title: 'Idea title'
date: 2024-06-09T00:00 +01:00
---
```

### Membership updates
- Checklist:
  - `title` is `Month Year` (e.g., `June 2024`).
  - `date` used for sort (often first of month); not in future.
  - `year` numeric (e.g., `2024`).
  - First content heading is `###` to populate local menus.
```yaml
---
title: 'June 2024'
date: 2024-06-01T00:00:00.000Z
year: 2024
---
```

### County team members
- Checklist:
  - Use supported `group` keys: `commissioners`, `divcomm`, `youthopp`, `outdoor`, `international`, `leads`, `vp`, `staff`.
  - `roles` sorted by `order` ascending.
  - Use `vacancyurl` for open roles; omit `email` when a vacancy is advertised.
  - Keep emails as role addresses (e.g., `role@girlguidinghertfordshire.org.uk`).
```yaml
---
title: 'Member Name'
date: 2024-06-09T00:00:00 +01:00
groups:
  - group: outdoor
    roles:
      - order: 1
        job_title: 'Lead Volunteer'
        person_intro: ''
        email: role@girlguidinghertfordshire.org.uk
        vacancyurl: /get-involved/vacancies/#outdoor-lead
  - group: leads
    roles:
      - order: 2
        job_title: 'Second Role'
        person_intro: ''
        email: role@girlguidinghertfordshire.org.uk
---
```

## Patterns & Conventions
- Layout naming: Most page templates use the `*-v5.html` convention; match when adding new layouts.
- Reusable components: Prefer `_includes` for repeated UI (e.g., banners, navigation segments). Reference with `{% include file.html %}` inside layouts/pages.
- Navigation: Add or update menus in [_data/navigation.yml](_data/navigation.yml); IDs in `defaults.toc` map sections to navigation groups.
- Assets: All documents/images live under [`assets/`](assets). Use lowercase, hyphen-separated filenames; listing images should be 360x200. To update a published file, change its filename to bust caching.
- CSS cache-busting: When you add or change styles, increment the version on the site stylesheet in [\_layouts/default-v5.html](_layouts/default-v5.html). Update the query param on the link tag (for example, `/css/site.css?v=3.12` → `v=3.13`) to avoid Cloudflare serving a cached CSS file.
- Redirects: Use [_redirects](_redirects) for static redirects (supported by Cloudflare Pages).

- Event locations: Use values like `'Hertfordshire, Central'` (see `_config.yml` and wiki) so listing filters work. Include both `'Hertfordshire'` and division-specific entries where relevant.
- 1st response events: Setting type to `1st response` auto-appends e-learning text; when multiple courses exist, set a unique `permalink`.

## Integrations
- Email API: Base URL and API key set in configs; forms/pages call server endpoints via templates/includes. Do not log or expose keys.
- reCAPTCHA & Maps: Keys are configured in `_config` files; related templates in `_includes` (e.g., `google.html`).

## Paths & URLs
- Production URLs start with https://www.girlguidinghertfordshire.org.uk/. For local editing/testing, drop the domain and use the relative path (for example, `/event/...`).
- Locate source files by matching the path to collection `permalink` patterns in [_config.yml](_config.yml):
  - posts: `/news/:title/` → source in [_posts](_posts) as `YYYY-MM-DD-title.md`.
  - events: `/event/:title/` → source in [_events](_events).
  - trainingevents: `/training/:title/` → source in [_trainingevents](_trainingevents).
  - noticeboards: `/noticeboard/:title/` → source in [_noticeboards](_noticeboards).
  - shops_nights: `/shops-nights/:title/` → source in [_shops_nights](_shops_nights).
  - fundraising_ideas: `/about-us/county-centre/fundraising/ideas/:title/` → source in [_fundraising_ideas](_fundraising_ideas).
- For static section pages (for example, `/about-us/county-team/`), check the corresponding directory in the repo (for example, [about-us](about-us)) and section mapping in [_data/navigation.yml](_data/navigation.yml).
- Permalink overrides: If front matter sets a `permalink`, the output URL will use it instead of the default pattern. The source file still lives in its collection directory.
- Examples:
  - `https://www.girlguidinghertfordshire.org.uk/event/great-patrol-hunt-round-1/` → look in [_events](_events) for `YYYY-MM-DD-great-patrol-hunt-round-1.md`.
  - `https://www.girlguidinghertfordshire.org.uk/news/post-title/` → look in [_posts](_posts) for `YYYY-MM-DD-post-title.md`.

## When Adding Content
- Follow collection defaults; provide `layout` only if deviating.
- Use international ISO dates (`yyyy-MM-dd`) for `event.start_date` to ensure correct sorting.
- Keep new section links consistent with [_data/navigation.yml](_data/navigation.yml) and collection `permalink` patterns in [_config.yml](_config.yml).
- Example reference: See [_events/2025-10-18-gph-r1.md](_events/2025-10-18-gph-r1.md) and [_layouts/event-v5.html](_layouts/event-v5.html) for event rendering.

## Deployment Notes
- The site is served from Cloudflare Pages. CI/CD config is external; keep Jekyll-compatible and avoid runtime-only features.
- Plugins: Only use whitelisted Jekyll plugins; update [Gemfile](Gemfile) and test locally.

### Redirects (_redirects)
- The `_redirects` file at the repo root defines Cloudflare Pages redirects; it is parsed only in Cloudflare deploys and does not affect local `jekyll serve`.
- Format: one rule per line — `source destination code?` — default code is `302`. Order matters; static rules before dynamic.
- Supported: 301/302/303/307/308, `*` splats with `:splat`, named `:placeholders`, proxying to relative paths with `200`.
- Not supported: rewriting with other status codes, query-parameter matching, domain-level/country/language/cookie-based redirects.
- Limits: ~2,000 static + 100 dynamic rules in `_redirects`. Use Cloudflare Bulk Redirects if you exceed limits.
- Docs: https://developers.cloudflare.com/pages/configuration/redirects/

