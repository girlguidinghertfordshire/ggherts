---
layout: page_full
title: Membership System Updates
date: 2016-11-29 10:28:52.000000000 +00:00
toc: membership
author:
  login: rachelkempis
  email: rachelkempis@hotmail.com
  display_name: Rachel Kemp
  first_name: Rachel
  last_name: Kemp
permalink: "/membership-system-updates/"
---
{% assign updates = site.membership_updates | reverse %}
{% for update in updates %}
<h2>{{ update.title }}</h2>
{{ update.content }}
{% endfor %}

<hr>
<div class="pull-right"><a href="2020/">2020 updates</a></div>