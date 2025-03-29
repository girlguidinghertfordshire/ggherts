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
{% assign vacancies = site.vacancies | where: "categories","ACC" | sort: date | reverse %}
{% if vacancies.size > 0 %}

## Assistant county commissioner

The assistant county commissioner role undertakes duties assigned to them by the county commissioner and is their representative.

Could you be the right person to help and support the new county commissioner continue building on the great work that has been done over the previous 5 years?

{% for vacancy in vacancies %}
{% include vacancy.html title=vacancy.title description=vacancy.content button-text=vacancy.button_text download=vacancy.download img=vacancy.image %}
{% endfor %}
{% endif %}
{% assign vacancies = site.vacancies | where: "categories","Divisions" | sort: date | reverse %}
{% if vacancies.size > 0 %}

## Division commissioners

Do you have what it takes to move Girlguiding forward across a whole division, whilst leading a dedicated team?

The division commissioner role can be done as a job share with the option of a division team created to enable delegation of some of the commissioner tasks.

{% for vacancy in vacancies %}
{% include vacancy.html title=vacancy.title description=vacancy.content button-text=vacancy.button_text download=vacancy.download img=vacancy.image %}
{% endfor %}
{% endif %}

## County teams

We have fantastic volunteers who look to the county for guidance, support and vision. We are looking for more volunteers to fully embrace the programme, spread passion and enthusiasm for guiding and to help Girlguiding Hertfordshire move forward.

{% assign vacancies = site.vacancies | where: "categories","Adventure" | sort: date | reverse %}

### Adventure and opportunity team

{% for vacancy in vacancies %}
{% include vacancy.html title=vacancy.title description=vacancy.content button-text=vacancy.button_text download=vacancy.download img=vacancy.image %}
{% endfor %}
{% assign vacancies = site.vacancies | where: "categories","Promote" | sort: date | reverse %}

### Promote and grow team

{% for vacancy in vacancies %}
{% include vacancy.html title=vacancy.title description=vacancy.content button-text=vacancy.button_text download=vacancy.download img=vacancy.image %}
{% endfor %}

Details of any county staff vacancies can be found on the [jobs webpage.](/about-us/jobs/)

## Trainers

Covering Hertfordshire*, regional trainers specialising in 1st response courses are essential to giving our members the skills they need to conduct their Guiding responsibilities.

{% assign vacancies = site.vacancies | where: "categories","Trainers" | sort: date | reverse %}
{% for vacancy in vacancies %}
{% include vacancy.html title=vacancy.title description=vacancy.content button-text=vacancy.button_text download=vacancy.download img=vacancy.image %}
{% endfor %}
