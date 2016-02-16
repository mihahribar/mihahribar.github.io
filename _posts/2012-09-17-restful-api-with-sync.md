---
layout: post
title: RESTful API with sync
category : advice
tags : [restful, api, sync]
description: How to include a syncing mechanism in your RESTful API without reinventing the wheel.
keywords: restful, api, sync
---

If you are building a client capable of caching a local version of server data (perhaps to use it in offline mode), the need for a syncing mechanism becomes apparent. There needs to be a way for the server to tell the client when the data was last modified and then a way for the client to inform the server that it only needs the changed data.

To my knowledge there is no way to express this mechanism directly with [RFC 2616](http://www.w3.org/Protocols/rfc2616/rfc2616.html), so lets take a look at how the big boys do it.

|[Twitter](https://dev.twitter.com/)|Send a `since_id` parameter (int-ish) which should be the newest tweet id you can find in your local storage.|
|[Pocket](http://getpocket.com/api/)|Send a `since` parameter (unix timestamp) which is returned in the response from the server.|
|[Mailchimp](http://apidocs.mailchimp.com/api/)|Send a `since` parameter (`YYYY-MM-DD HH:MM:SS` format in GMT).|

You can see that all APIs that support sync use a variation of the word since to pass along a timestamp parameter that tells the server which data to return, but they all use different mechanisms to report this `since` parameter to the client.

You should never let the client send along it's local timestamp as that might not be in sync with you server which will result in data loss. The obvious choice is for the server to send along the desired timestamp.

Instead of trying to change the JSON responses to include a since parameter, lets try and find something RFC 2616 already provides.

## Last-Modified header

> The Last-Modified entity-header field indicates the date and time at which the origin server believes the variant was last modified.
-- [RFC 2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.29)

Whenever a client makes a request to an endpoint, the server already returns a `Last-Modified` header which indicates when the requested endpoint data was last changed. All the client needs to do is save this timestamp and send it along with the next request, url encoded.

<pre>
GET https://api.example.com/endpoint
</pre>

{% highlight http %}
HTTP/1.1 200 OK
Last-Modified: Tue, 07 Jan 2014 17:37:47 GMT
{% endhighlight %}

<pre>
GET https://api.example.com/endpoint?since=Tue%2C+07+Jan+2014+17%3A37%3A47+GMT
</pre>

The beauty of this approach is that syncing is an add-on to your API. If the clients knows how to handle syncing it has a very simple way of doing just that. All other clients can still use the same API witouth ever even knowing about the syncing mechanism.
