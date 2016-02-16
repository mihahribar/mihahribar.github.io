---
layout: post
title: Version your RESTful API responses
category : advice
tags : [restful, api, versioning]
description: Don't version your API, version your API responses.
keywords: restful, api, response versioning
---

In my [previous post](http://hribar.info/2012/09/restful-api-with-sync/), I discussed the idea of adding sync to your RESTful API through a predictable and an already existing interface. This time, let's take a look at how to go about versioning you API.

Usually APIs are versioned through the use of URI(Uniform Resource Identifier)s, for instance:

<pre>
https://api.example.com/v1/dogs
</pre>

Whenever you introduce a new API version, you publish a new `v2` URI for all your endpoints and slowly stop supporting older ones. While common practice, this is *not* in alignment with REST:

> The central feature that distinguishes the REST architectural style from other network-based styles is its emphasis on a uniform interface between components. By applying the software engineering principle of generality to the component interface, the overall system architecture is simplified and the visibility of interactions is improved.<br/>
-- [Roy Thomas Fielding disertation, Chapter 5](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#sec_5_1_5)

The key here is that the URI for a specific resource should not change through its lifetime. A possible solution to this problem might be no versioning at all, but as you can imagine, this will not work for the majority of APIs.

## Media types

Instead of versioning your API through the URI, keep you API endpoints unchanged and *version your responses* using custom media types in the `Accept` header of your requests, like so:

<pre>
$ curl -v -H "Accept: application/json" api.example.com/dogs

> GET /dogs HTTP/1.1
> Host: api.example.com
> Accept: application/vnd.example.v1+json
</pre>

When the server sees an `Accept` header it can use the Factory pattern to return the correct response representation for the required resource version.

The [media type](http://tools.ietf.org/html/rfc4288) specification allows you to extend the vendor tree, so you could include even more information about the expected response (like specific versions for all resource types your API provides).

If the developer doesn't mind getting the freshest response from the API every time, they could set the `Accept` header to `application/json` instead. So whenever you update your API, those applications will automatically receive the freshest response versions.

## Problems?

The proposed idea might be a stretch for some, but if you think about this problem from a purely software engineering standpoint, try to forget that the client is communicating with your API via a network. How different is this from communicating with an API over a local bus? So in this case a uniform interface is necessary. Imagine how stressful coding a driver would be if the API kept changing with each new release.

[Discuss it on Hacker News](http://news.ycombinator.com/item?id=4575193) or [Reddit](http://www.reddit.com/r/programming/comments/10hz08/version_your_restful_api_responses/).