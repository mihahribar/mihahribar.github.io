---
layout: post
title: CSS guidelines
category : frontend
tags : [css, guidelines]
description: A look on some of the guidelines I abide to make my CSS development much easier.
keywords: css guidelines, css flags, margin, padding, cascade
---

When I was just getting into CSS (Cascading Style Sheets) a few years
back, I was desperately searching for an article, that described how to
structure my CSS, what techniques to use when in doubt, and such. While
much can be found on the world wide web, I still prefer a good book over
a lengthy article. Perhaps only a personal preference, but I tend to
trust books more :)

Anyway, over the years I've formulated a few simple ground rules, that
make my development much easier.

Getting all browsers on the same page
-------------------------------------

As you might now, different browsers tend to have their own predefined
values for default font sizes and padding and margins for all elements.
So to get them all on the same wave length I use a few simple rules:

{% highlight css %}
/* get rid of default margins/paddings */
* {
    padding: 0;
    margin:  0;
}

/* 1em = 10px */
body {
    font-size: 62.5%
}
{% endhighlight %}

The first rule is self explanatory. It gets rid of all the default
margins and paddings, giving you equal rendering of your page on all
browsers.

The second I've just recently picked up. It allows me to make the
default font size approximately 10px, wich in turn allows me to assign
font sizes using the `em` unit as if I'm assigning it with `px` (
`font-size: 1.2em` now equals `font-size: 12px` ). The same can now be
used to assign paddings and margins to elements, as the `em` is
unaffected if the visitor decides to increase the size of the text (that
is, the proportion remains the same).

Code structure
--------------

To separate my CSS into special sections I use
[flags](http://www.stopdesign.com/log/2005/05/03/css-tip-flags.html) .
They're a nifty way to visualy separate your code, plus searching your
code is now much easier, as you can simply jump to any section without
the need to muddle your way through all the search results. For example,
there can be many rules for an element `#container` , so by giving all
the rules for this element a flag `=CONTAINER` you can now easily jump
to that section by typing Ctrl+S (or any other search shortcut) and
typing in `=container` .

There are many articles and books out there that propagate the use of
separate files for each aspect of the site. For example fonts, colors
and layout are to be kept in separate files. But I tend to shy away from
that. Instead I separate my code into sections according to
theXHTMLdocument. I use the same order for elements as in the XHTML
document.

{% highlight html %}
...
<body>
    <div id="head">...</div>
    <div id="navigation">...</div>
    <div id="content">...</div>
    <div id="footer">...</div>
</body>
{% endhighlight %}

{% highlight css %}
/* =HEAD
************************/
...


/* =NAVIGATION
************************/
...


/* =CONTENT
************************/
...


/* =FOOTER
************************/
...
{% endhighlight %}

This way my CSS is structured like my XHTML, wich makes it easier
finding your way around. But keeping it all in a single CSS file can
generate an undesired overhead, so I separate my CSS into separate files
linking to them only on the sites that need specific rules. Usually
different pages use different elements, so there is no need to include
those rules every time.

This comes in handy on middle to larger websites, but for small personal
pages, you can still leave all of your code in one single file, as your
linked CSS file is cached by the browser and not downloaded every time.

Applying margins and paddings
-----------------------------

To my knowledge only IE has problems with the [box
model](http://en.wikipedia.org/wiki/Internet_Explorer_box_model_bug) ,
so to avoid differences in rendering I use a simple rule. When applying
width to an element, I do not apply left/right margins and padding
directly to this element (the parent), but rather to subsequent elements
(the children). The same is then used for elements with a specified
height, this time with top/bottom margins and paddings. This way the
widths and heights in IE are calculated according to the correct box
model and not the proprietary IE box model, so in esence you avoid all
those box model hacks and workarounds. It is a bit tedious work, but
I've found it more semantic.

{% highlight css %}
#container {
    /* do not apply paddings/margins to parent */
    width: 300px;
}

/* child of the #container */
#navigation {
    padding: 0 10px;
    margin:  0 20px;
}
{% endhighlight %}

Cascade
-------

The [cascade](http://www.w3.org/TR/REC-CSS2/cascade.html) is cause for
many of the headaches for newcomers to CSS. But when used with care, it
can be a real asset. I try to use one or at the most two parent ids when
targeting a specific element, wich means I can override the styles down
the road with a more specific series of selectors, and avoid using
`!important` rules.

Browser specific hacks
----------------------

I try to avoid using hacks as much as possible. Most of the time browser
pitfalls can be resolved using various workarounds (like the IE
[hasLayout](http://www.satzansatz.de/cssd/onhavinglayout.html)
property). With the IE7 release due soon, a lot of the IE targeting
hacks have become outdated. It's a shame the developers at Microsoft
have decided to drop the anynmous star (\*) element from the DOM root,
wich enabled developers to make IE specific hacks with the [Holly
hack](http://www.positioniseverything.net/articles/poll/star-html.php) .
Those hacks still work for previous versions, but IE7 now overlooks them
like all other modern browsers.

### Recomended reading

-   [CSS Mastery: Advanced Web Standards
    Solutions](http://www.amazon.co.uk/exec/obidos/redirect?link_code=as2&amp;path=ASIN/1590596145&amp;tag=hribarinfo-21&amp;camp=1634&amp;creative=6738)
    by [Andy Budd](http://www.andybudd.com/)
-   [Bulletproof Web
    Design](http://www.amazon.co.uk/exec/obidos/redirect?link_code=as2&amp;path=ASIN/0321346939&amp;tag=hribarinfo-21&amp;camp=1634&amp;creative=6738)
    by [Dan Cederholm](http://simplebits.com/)

