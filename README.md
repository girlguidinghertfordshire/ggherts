
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

Please see the [wiki](https://github.com/girlguidinghertfordshire/ggherts/wiki) for templates for all the collections.
