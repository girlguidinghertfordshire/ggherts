---
layout: page_full
title: Membership System Updates
date: 2016-11-29T10:28:52.000Z
toc: membership
author:
  login: rachelkempis
  email: rachelkempis@hotmail.com
  display_name: Rachel Kemp
  first_name: Rachel
  last_name: Kemp
permalink: /membership-system-updates/
lastmod: '2021-09-03T19:39:30.757Z'
---
{% assign updates = site.membership_updates | reverse %}
<div class="row">
<div class="col-md-3 left-sidebar hidden-xs" style="position:sticky; top:20px">
<h2>Updates</h2>
<ul class="nav" role="tablist">
{% for update in updates %}
<li><a href="#{{ update.title | slugify }}">{{ update.title }}</a></li>
{% endfor %}
</ul>
</div>
<div class="col-md-9 js-updates">
{% for update in updates %}
<section id="{{ update.title | slugify }}">
<h2>{{ update.title }}</h2>
{{ update.content }}
</section>
{% endfor %}

<hr>
<div class="pull-right"><a href="2020/">2020 updates</a></div>

</div>
</div>
<script>
  (function($){
    $(document).ready(function(){
      $("body").scrollspy({target: '.left-sidebar', offset: 20});
      $(".js-updates > section").each(function(){
        var $h3s = $(this).find("h3");
        var $section=$(this);
        if ($h3s.length>0){
          var id=this.id;
          $(".left-sidebar a[href='#" + id +"']").parent().append("<ul/>");
          $section.find("h2:first").after("<ul/>");
          var $menu=$(".left-sidebar a[href='#" + id +"']").parent().find("ul");
          $h3s.each(function(){
            $menu.append("<li><a href='#" +this.id + "'>" + $(this).text() + "</a></li>");
            $section.find("h2+ul").append("<li><a href='#" +this.id + "'>" + $(this).text() + "</a></li>");
          })
        }
      });
    });
  })(jQuery);
</script>
