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
{% assign vacancies = site.vacancies | where: "categories","Divisions" | sort: date | reverse %}
{% if vacancies.size > 0 %}

## Division commissioners

Do you have what it takes to move Girlguiding forward across a whole division, whilst leading a dedicated team?

<!-- Fantastic opportunities to influence and create real change have become available.

Make a positive difference to others and improve opportunities for girls and young women.-->

The division commissioner role can be done as a job share with the option of a division team created to enable delegation of some of the commissioner tasks.

{% for vacancy in vacancies %}
{% include vacancy.html title=vacancy.title description=vacancy.content button-text=vacancy.button_text download=vacancy.download img=vacancy.image %}
{% endfor %}
{% endif %}

## County team

We have fantastic volunteers who look to the county team for guidance, support and vision. We are looking for new lead volunteers to fully embrace the programme, spread passion and enthusiasm for guiding to help the county move forward.

{% assign vacancies = site.vacancies | where: "categories","County team" | sort: date | reverse %}
{% for vacancy in vacancies %}
{% include vacancy.html title=vacancy.title description=vacancy.content button-text=vacancy.button_text download=vacancy.download img=vacancy.image %}
{% endfor %}

## Trainers

Covering Hertfordshire*, regional trainers specialising in 1st response courses are essential to giving our members the skills they need to conduct their Guiding responsibilities.

{% assign vacancies = site.vacancies | where: "categories","Trainers" | sort: date | reverse %}
{% for vacancy in vacancies %}
{% include vacancy.html title=vacancy.title description=vacancy.content button-text=vacancy.button_text download=vacancy.download img=vacancy.image %}
{% endfor %}
