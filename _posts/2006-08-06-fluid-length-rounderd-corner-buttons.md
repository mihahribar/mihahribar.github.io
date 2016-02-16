---
layout: post
title: Fluid length rounded corner buttons
category : frontend
tags : [frontend, javascript, html]
description: Let's take a look at how to create fluid length rounded corner buttons.
keywords: rounded corner buttons, javascript, html, frontend
---

We've all come accross a design that dictated that the form buttons
should have rounded corners (especially in the web 2.0 era). The
creation of fixed length rounded corner button is second nature to any
self proclaimed web deveopler, but the creation of fluid (well at least
fluid inlength if not in height) rounded corners is another thing all
together, and that is what I'll be talking about in this post.

To create our illusion of fluid length rounded button I've prepared two
images that we will be using.

![](/images/rounded_corners.gif)

But just to elaborate, I'm not talking about using fake buttons (nested
`<span>` for instance), and then using Javascript to immitate button
funcionality. As we all know, that does not degrade gracfully for folks
using older browsers and screenreaders. I will be using semantic XHTML
instead.

{% highlight html %}
...
<form action="rounded.html" method="get">
<input type="submit" value="Submit me!" />
</form>
...
{% endhighlight %}

The easiest way of acheiving rounded corners in our example is to add a
*non-semantic* empty `div` after the submit button and the using CSS to
style everything.

{% highlight css %}
input.button {
    border: 0;
    background: #fff url(button.gif) no-repeat;
    height: 22px;
    /* used to catch the buttonEnding */
    position: relative;
}

.buttonEnding {
    position: absolute;
    display: inline;
    width: 7px;
    height: 22px;
    background: url(end.gif) no-repeat;
}
{% endhighlight %}
{% highlight html %}
...
<form action="rounded.html" method="get">
<input type="submit" value="Submit me!" />
<div class="buttonEnding"></div>
</form>
...
{% endhighlight %}

All this works as intended, but I'm a XHTML perfectionist, and as such
that empty div for me is like nails on a chalkboard. If done so we would
have to add that empty div after all buttons that we wanted to have
rounded eges. Now imagine if you will a very long form with multiple
buttons. Result, more scratching on the chalkboard. There has to be a
better way to do such things.

And fortunately for us, there is. DOM. Here is what we'll do in plain
english:

-   Find all input tags with a class "button".
-   Loop through them one by one.
-   Create new div elements on the fly.
-   Set the class "buttonEnding" to the newly created div.
-   Attach them to the DOM tree right after our buttons.
-   Add the function as an event so that it is executed when page loads.
-   Sounds pretty straightforward. Here's how the finished javascript
    function looks.

{% highlight js %}
function buttonEndings() {
	if (!document.getElementsByTagName) {
		return false
	}

	var buttons = getElementsByClass("button");
	/* loop through all buttons and attach a div */
	for (i=0; i < buttons.length; i++) {
		var div = document.createElement("div");
		div.className = "buttonEnding";
		insertAfter(div, buttons[i]);
	}
}

addLoadEvent(buttonEndings);
{% endhighlight %}

[This](/projects/rounded_buttons/rounded.html) seems to work in all
browsers I could test in. If you happen to find a browser in wich this
doesn't work as intended, please do give me a heads up through the
contact form.

The way I'm doing this is not perfect. There is much room for
improvement. For one thing this function does not degrade gracefully.
When a user disables javascript they're greeted with buttons that have
their tails clipped. One could write this a bit better and insert an
empty div before and after our buttons, that will then hide all of our
rounded parts if Javascript is disabled, but I will leave that
implementation up to you.

One could also make all four corners into their own separate images and
attach them either using CSS pseudo classes :before and :after or again
using Javascript and the DOM, but I guess that's a whole other story.
All I wanted to acheive is what is in front of you right now. Fluid
length buttons with rounded corners. And I don't even mind that the
users with javascript disabled don't see the button ends, as it's purely
presentational.

You might notice that I'm using a number of well known functions that
were written by well known Javascript experts. Here is a list of authors
and their respectabe functions width links to more inside info on the
way those functions work.

-   `addLoadEvent` by [Simon
    Williams](http://simon.incutio.com/archive/2004/05/26/addLoadEvent)
-   `getElementsByClass` [Dustin
    Diaz](http://www.dustindiaz.com/getelementsbyclass/)
-   `insertAfter` [Jeremy Keith](http://adactio.com/)

If you want you can downlad the full example code
[here](/projects/rounded_buttons/rounded_buttons.zip).
