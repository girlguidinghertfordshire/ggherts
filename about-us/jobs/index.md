---
layout: page-v5
title: Jobs at Girlguiding Hertfordshire
date: 2025-03-29T07:31:00Z
toc: about-us
advertId: get-involved
---
Girlguiding Hertfordshire is a volunteer-led organisation for the benefit of girls, young women and volunteers. We are dedicated to enabling girls and young women to develop their potential and make a difference in the world.

## Current job vacancies

Our small team of staff provide support and advice to the county commissioner team, county teams, members and volunteers to ensure the smooth running of guiding in Hertfordshire county.

{% assign vacancies = site.vacancies | where: "categories","staff" | sort: date | reverse %}
{% if vacancies.size > 0 %}
Details of all of our current staff vacancies can be found below.
{% for vacancy in vacancies %}
{% include vacancy.html title=vacancy.title description=vacancy.content button-text=vacancy.button_text download=vacancy.download img=vacancy.image %}
{% endfor %}
{% else %}
There are currently no county staff vacancies.
{% endif %}

Volunteer vacancies within Girlguiding Hertfordshire can be found on the [volunteer vacancies webpage.](/get-involved/vacancies/)
