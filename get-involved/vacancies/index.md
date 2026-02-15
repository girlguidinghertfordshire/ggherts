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
<div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
  <div class="col p-4 d-flex flex-column position-static">
    <h2 class="mb-0">County trustee</h2>
    <div class="card-text mb-auto">
    <p>Due to a recent change to our constitution, we are looking for a grassroots county member aged 18+ to join our board of trustees.</p>
    <p>Our county trustees are responsible for setting the county's strategy and direction and play a key role in making sure the county achieves it's core purpose. They oversee the overall management and administration of the charity.</p>
    <p>The board of trustees has overall legal responsibility for the direction and control of Girlguiding Hertfordshire and is accountable for compliance with relevant laws and regulations. As a county trustee you will have certain legal duties and responsibilities and must always act in the best interests of Girlguiding Hertfordshire.</p>
    <p>If you're passionate about making a difference and committed to our values and mission, this could be the role for you!</p>
    <p>Further details of what the role entails can be found below.</p>
    <p>Please apply via <a href="mailto:vacancies@girlguidinghertfordshire.org.uk">vacancies@girlguidinghertfordshire.org.uk</a></p>
    </div>
    <p markdown=1>
      [Role description](/assets/docs/2026/trustee-role-description.pdf){:.btn.btn-primary.download-link}{:rel="noopener"}{:target="_blank"}
      [Responsibilities of a trustee](https://www.girlguiding.org.uk/information-for-volunteers/policies/finance-policy/charity-trustees/){:.btn.btn-primary.external-link}{:rel="noopener"}{:target="_blank"}
    </p>
  </div>
  <div class="col-auto d-none d-lg-block">
    <img src="/assets/images/2026/02/county-grass-roots.webp" alt="County trustee volunteers" class="img-fluid" />
  </div>
</div>

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

{% assign vacancies = site.vacancies | where: "categories","Member" | sort: date | reverse %}

### Membership support team

{% if vacancies.size == 0 %}
There are no vacancies within this team at present.
{% endif %}

{% for vacancy in vacancies %}
{% include vacancy.html title=vacancy.title description=vacancy.content button-text=vacancy.button_text download=vacancy.download img=vacancy.image %}
{% endfor %}

{% assign vacancies = site.vacancies | where: "categories","Promote" | sort: date | reverse %}

### Promote and grow team

{% for vacancy in vacancies %}
{% include vacancy.html title=vacancy.title description=vacancy.content button-text=vacancy.button_text download=vacancy.download img=vacancy.image %}
{% endfor %}

Details of any county staff vacancies can be found on the [jobs webpage.](/about-us/jobs/)

## Region roles

These roles sit at region level but specifically cover Hertfordshire county.

{% assign vacancies = site.vacancies | where: "categories","Anglia" | sort: date | reverse %}
{% for vacancy in vacancies %}
{% include vacancy.html title=vacancy.title description=vacancy.content button-text=vacancy.button_text download=vacancy.download img=vacancy.image %}
{% endfor %}
