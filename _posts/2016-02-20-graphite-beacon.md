---
layout: post
title: Graphite Beacon
category : graphite
tags : [graphite, beacon]
description: Was looking for a simple alerting system that would know how to connect to graphite. Found beacon. Looking no more.
keywords: graphite, beacon
---

At [Toshl](https://toshl.com) we use [Statsd](https://github.com/etsy/statsd), [Graphite](https://github.com/graphite-project/) and [Grafana](http://grafana.org) to keep an eye on what is going on with our system. It has served us nicely thus far and allowed us to find a number of issues.

![Toshl Grafana in action](/images/toshl-grafana.png)

The thing that was missing in our setup was an alerting system, that could post to our [HipChat](https://www.hipchat.com) chat and send an email if things start to go south. After trying out [Newrelic](http://newrelic.com) and [DataDog](https://www.datadoghq.com) for a couple of weeks I found them to be lacking in what our metrics already had, specificity to our system. We've built a comprehensive suite of metrics and dashboards, so why not use that in the first place.

Enter [graphite-beacon](https://github.com/klen/graphite-beacon), a simple alerting system for Graphite metrics. It's easy to setup and configure. You basically just point it to your graphite instance, setup the metrics you wish to monitor and set the alerting threasholds for normal, warning and critical states for each metric. It has a number of handlers like email, hipchat, slack, pager duty and others, but if you find something is missing, extending it looks pretty straightforward.

![Beacon posting to HipChat](/images/hipchat-beacon.png)

The nice thing about it is that it knows about historical values and can use that knowledge to generate alerts in case of something statistically significant is happening.

{% highlight javascript %}
{
  alerts: [
    {
      "name": "Registrations",
      // Run once per day
      "interval": "1day",
      "query": "Your graphite query here",
      // Get average for last 10 days
      "history_size": "10day",
      "rules": [
        // today's new user less than 80% of average for 10 days
        "warning: < historical * 0.8",
        // today's new user less than 50% of average for 10 days
        "critical: < historical * 0.5"
      ]
    }
  ]
}
{% endhighlight %}

So in order to know what is happening with your system you push it into graphite, create a dashboard in grafana and setup an alert with beacon. Neat. Hope you find it useful too.

*Note: Yeah server names are from the [Battlestar Galactica universe](https://en.wikipedia.org/wiki/Twelve_Colonies). What can I say, the sci-fi junkie in me couldn't resist.*