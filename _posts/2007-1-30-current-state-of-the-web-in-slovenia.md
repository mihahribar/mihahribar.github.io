---
layout: post
title: Current state of the web in Slovenia
category : frontend
tags : [izidor, css, javascript, html, rant, web standards]
description: A quick look at this years Izidor (annual award for web excellence) nominees makes it evident that the state of web in Slovenia is not where it should be.
keywords: Izidor 2007 spreadsheet, state of the web in Slovenia
---

With the web 2.0 boom expanding to all countries of the world (yes, even Slovenia), you would expect that web standards are spreading as well. But a quick glance at this years [Izidor](http://www.gvizobrazevanje.si/izidor/ "IZIDOR 2007 - Nagrada za spletno odličnost") (annual award for web excellence) shows that something is rotten (or rotting) in the Slovenian web.

## Nominees spreadsheet

To make this evident I have put together a simple spreadsheet of this years nominees, checking their compliance with W3C guidelines. Every nominee was checked for:

* DTD use
* proper charset definition
* used layout technique
* valid (X)HTML
* valid CSS
* valid RSS (as this years competition motto is "social networking", RSS was checked as it is at the very cornerstone of this movement)
* what happens if the images are turned off (can a visitor still make sense of the site)
* what happens if Javascript support is disabled (can a visitor still use the website - graceful degrading)
* WCAG and 508 accessibility

## Results

The results were very disappoiting to say the least. Out of the 31 nominees a whopping 9 have not defined their DTD, only 15 decided to use UTF-8 character encoding (5 don't even define the charset), only 6 use CSS for layout, only 2 have valid (X)HTML. Accessibility seems to be an unimportant aspect for all but 2 nominees (feels like its 1999 all over again).

### DTD

![DTD results](/images/izidor-dtd.gif)

### Charset

![Charset results](/images/izidor-charset.gif)

### Layout

![Layout results](/images/izidor-layout.gif)

### XHTML validation

![XHTML validation results](/images/izidor-xhtml.gif)

### CSS validation

![CSS validation results](/images/izidor-css.gif)

But there is a bright spot in the spreadsheet - [Pediatrična klinika](http://www.ustanovazapediatricno.si/). The mentioned website passed almost all judging categories with flying colors. Apart from a bit too much inline Javascript (which is a crime in its self), this website is a winner from a developers standpoint (not to mention for their innovative approach to modeling the donation network).

## Conclusion

Not to hold anything against the folks that organize Izidor, but I belive that candidates should be checked for compliances to the most basic W3C recommendation before they are accepted. Perhaps the motto for next years award should be "Accessible Social Networking", but then I guess nobody would dare enter...