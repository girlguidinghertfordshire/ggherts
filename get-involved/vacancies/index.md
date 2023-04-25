---
layout: page-v5
title: Volunteer vacancies
date: 2019-10-17T10:38:11.000Z
toc: for-volunteers
advertId: get-involved
author:
  login: GGH-Admin1
  email: share@girlguidinghertfordshire.org.uk
  display_name: GGH-Admin1
  first_name: ""
  last_name: ""
permalink: /get-involved/vacancies/
lastmod: 2022-04-24T07:01:49.097Z
---
We have fantastic volunteers who look to the county team for guidance, support and vision. We are looking for new lead volunteers and trainers to fully embrace the programme, spread passion and enthusiasm for guiding to help the county move forward.

{% assign vacancies = site.vacancies | sort: date | reverse %}
{% for vacancy in vacancies %}
{% include vacancy.html title=vacancy.title description=vacancy.content button-text=vacancy.button_text download=vacancy.download img=vacancy.image %}
{% endfor %}
