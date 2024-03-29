---
layout: post
title: Don't build (just) a RESTful API
category : api
tags : [restful api]
description: Building RESTful APIs is not enough anymore. My search for a better way brought me to Hypermedia APIs.
keywords: restful api, hypermedia api, hateoas
---

I recently had a talk at a local [developer meetup](http://wwwh.si) about the [state of APIs](/talks/api-state-of-the-art) that sparked an interesting conversation. In the talk I outlined a few guidelines for building RESTful APIs, but stressed that even building everything according to all common practices is not enough anymore. Simply put, our APIs are too simple.

Don't get me wrong. Building an API so other developers can access your data is great, and a RESTful approach is perfect for that. But for in-house apps a RESTful API is simply not enough.

## Simple data, complex client

To build an API we usually type-marshal/serialize our objects, create special media types for each and smack a CRUD(Create Read Update Delete) interface on top of it. We then create our clients by connecting to our API and pulling in the JSON object representations and store them on the client.

Since not all mobile devices are online all the time, we are forced to port some of the business logic to the clients, and since in some cases using a product like Phone Gap might not cut it, we are forced to implement the same logic on multiple devices.

What we are left with is simple data coming in from the API and complex duplicated logic on all our clients.

_Shouldn't that be the other way round?_

![RESTful API with duplicated logic on the clients](/images/restful-api.png)

## Complex data, simple client

In my search for a better way to build our API at [Toshl](https://toshl.com) I came across [Building Hypermedia APIs with HTML5 and Node](http://shop.oreilly.com/product/0636920020530.do) by Mike Amundsen. This is probably the best quote from the book:

> The World Wide Web is fundamentally a distributed hypermedia application.

Think of the browser as the client, HTML as the message format and websites as the API. If a website is updated, the client doesn't break, it just downloads the new content and displays it. Why don't we build clients this way?

If we extend our JSON representation to include all the necessary information we need in our clients to work properly without breaking, our lives as developers would be much simpler.

The idea is that the client would still interact with the RESTful API, but instead of exposing just the data, we expose the processes and how the client is to interact with the API.

![RESTful API with Hypermedia API for internal clients](/images/restful-hypermedia-api.png)

## Example

Let's take a look at a simple example: adding a new object on the client. The client would download everything it needs to present a form on the client. The form information would include all the fields, field options, validation, translations and how to construct a request to our API when the user completes the form.

When we change our process on the server, by lets say, adding a field or changing any of the field options, the client would just download the new information and redisplay the form.

There would still be times when we would have to fix the client, but only in extreme situations.

## Conclusion

You might think that building a client this way would be too complicated, but all the client needs to do is display the data and learn how to interact with our API (in essence how to create a POST, GET, PUT or DELETE requests). That should not be that difficult.

I think this is the way the web is supposed to work. Truly distributed and extendable. I still hope that eventually everything will be able to be run on HTML, Javascript and CSS, but until then we are stuck with building APIs. Let's make them smarter, so we can simplify our clients.