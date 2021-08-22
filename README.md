
# Girlguiding Hertfordshire 
## JAMstack website using Jekyll

JAMstack:
- Javascript
- APIs
- Markup

Static webpages are built using [Jekyll](https://jekyllrb.com/).

The website is a conversion from the previous WordPress site. Legacy references to uploaded files and theme files in the wp-content file remain, though it is no longer using WordPress. The pages are served statically from Cloudflare Pages.

## Contributing to the site
You can directly contribute to the site by creating a new branch and then making a _[pull request](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)_ so your suggestion can be evaluated for inclusion on the site.

New pages can be either [HTML format](https://developer.mozilla.org/en-US/docs/Web/HTML) (you need to provide correctly formatted HTML) or [Markdown](https://www.markdownguide.org/tools/jekyll/), which uses a simple syntax to automatically create headings, lists, bold, italics, links etc. Markdown pages also allow you to use HTML in the page for more complex layouts.

## Front matter
Jekyll uses 'Front matter' in YAML format to include information which can be used on templates and list pages. The presence of Front Matter also causes the compiler to process the page and make it available in the site.

### Common properties

<dl>
<dt>title</dt>
<dd>The title of the page. In all current templates this is used to populate both the HTML page title and the first H1 tag on the page</dd>
<dt>date</dt>
<dd>The date the page was created/published. If this date is in the future the page won't be compiled into the static site. In date fields use international date format to ensure correct representation: yyyy-MM-dd HH:mm:ss.000000000 +01:00</dd>
<dt>lastmod</dt>
<dd>The date the page was last modified.</dd>
<dt>published <em>(optional)</em></dt>
<dd>Indicates if the page is to be generated on site generation. Include this with <code>false</code> when the page shouldn't be produced any more but you wish to retain it for archive purposes</dd>
<dt>layout <em>(optional)</em></dt>
<dd>Used to specify the layout for the page. Shouldn't be required for most pages as it is set in config.</dd>
<dt>author <em>(optional)</em></dt>
<dd>The author field contains child fields: email, display_name, first_name, last_name</dd>
<dt>permalink <em>(optional)</em></dt>
<dd>Use to specify the URL for the page. When used it will override the default URL for the page (see below)</dd>
</dl>

 Templates for the Front Matter for each of the sections below is included in the `_drafts` folder


### News and Noticeboard
News items are generated from the **_posts** folder; noticeboard from the **_noticeboards** folder

<dl>
<dt>image</dt>
<dd>Path to the image used on the listing page for this news article. Current articles use the legacy WordPress path; add new images, PDFs, Word docs to the <code>/assets</code> folder</dd>
<dt>categories</dt>
<dd>An array of the categories the page belongs to. Currently only 'Announcement' and 'Badges' are used.</dd>
<dt>tags</dt>
<dd>An array of keywords which apply to the page. Not currently used on any pages.</dd>
</dl>

```
---
title: Searching roles on GO Directory
date: 2018-06-01 08:55:10.000000000 +01:00
image: /wp-content/uploads/2016/05/GGH-Logo1-360x243.jpg
categories:
- Announcements
tags: []
author:
  display_name: the County Office
---
```
### Events
Events are generated from files in the **_events** folder

Event specific information is nested in the Front Matter under an `event:` node:

<dl>
<dt>start_date</dt>
<dd>The event start date. <strong>Events are sorted in ascending order of start date</strong></dd>
<dt>end_date
<dd>The event end date. Listing pages will automatically exclude events which are in the past whenever the site is generated, though the page remains available and may be linked to from the in-page navigation.</dd>
<dt>address</dt>
<dd>The address or location of the event (shown on the right-hand side of the page on the individual event page)/<dd>
<dt>contact_name</dt>
<dt>contact_email</dt>
<dt>contact_number</dt>
<dd>Contact information to show on event page</dd>
<dt>book_now_link</dt>
<dd>URL of EventBrite page (or similar) to book the activity.</dd>
<dt>image</dt>
<dd>Path to the image used on the listing page for this news article. Current articles use the legacy WordPress path; add new images, PDFs, Word docs to the <code>/assets</code> folder</dd>
<dt>type</dt>
<dd>The type of event, currently we have: Activity Day, Residential/Camp, Social or First Response.</dd>
<dt>age-group</dt>
<dd>The guiding sections this event is for: Rainbow, Brownie, Guides, Ranger, Young Leader, Adults, Leader</dd>
<dt>Location</dt>
<dd>The County/Division to show the event under. If the event is in a Hertfordshire division then enter the location in this format <code>Hertfordshire, Central</code>. This is necessary for the listing page filters to work correctly.
</dl>

```
---
title: Great Patrol Hunt 2021/2022 Round 1
date: 2021-03-17 12:15:58.000000000 +00:00
event:
  start_date: '2021-10-16'
  end_date: '2021-10-16'
  address: Borehamwood
  contact_name: 
  contact_email: 
  contact_number: ''
  book_now_link: ''
  image: /wp-content/uploads/2018/06/GPH-2018-360x273.png
  type: Activity Day
  age-group: 
  - Guides
  location: 
  - Hertfordshire
author:
  display_name: Rachel Kemp
  first_name: Rachel
  last_name: Kemp
permalink: "/event/great-patrol-hunt-2021-2022-round-1/"
---
```

