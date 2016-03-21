---
layout: post
title: Trunk based development and feature toggles
category : patterns
tags : [trunk development, feature toggles, engineering practices]
description: Trunk based development sound like a bad idea until you introduce feature toggles into the mix.
keywords: trunk development, feature toggles, engineering practices
---

As I have mentioned a couple of times already, I listen to a lot of [podcasts](/2016/02/podcasts/) on my daily commute. One that recently got me thinking was [episode 136 of iPhreaks](https://devchat.tv/iphreaks/136-ips-efficient-engineering-practices-for-software-projects-with-neal-ford) where the panel talks about efficient engineering practices for software projects with [Neal Ford](http://nealford.com). If you haven't listened to it I strongly encourage you to do so. The episode has little to do with iPhone development so do not be discouraged by the title.

In the podcast Neal talks about what he calls "Trunk based development". My initial reaction was that this could not be the best idea (I might have used stronger language since no children were about). There is no way you could have everything in the master branch (or trunk as you call it in SVN) at any one time. We've all had that one long feature branch that you just couldn't merge into master until it was finished without causing problems for everyone on the team. But there is a nice trick you can use to avoid such situations - feature toggles.

## Feature toggles

Feature toggles are a pattern you can use to hide the new functionality behind something as simple as an `if (feature.isActive())` statement. You can have something as simple as an on/off switch for a specific feature, or something much more complex as specifying a specific cohort of your users (enable the feature for users from Australia). With this in place you can merge into master early and often and only the person working on the feature would enable the feature in her development environment. Simple, effective and maybe somewhat crazy to wrap your head around it.

There are a number of feature toggles types you can use. Release toggles for [continuous delivery](https://en.wikipedia.org/wiki/Continuous_delivery), experiment toggles for A/B testing, ops toggles for system stability and performance, permission toggles to customize a users experience etc. Pete Hodgson goes into great detail in [his article](http://martinfowler.com/articles/feature-toggles.html) and I suggest you have at least a quick look at it.

One thing Neal did stress is that once the feature is finished and deployed in production without issues for a while, it is your job as maintainer of that feature to remove the feature toggle. This way there are not that many feature toggles in your system that you might have to reason about.

So the problem is, all I see now are feature toggles. Is there a support group I can join now?
