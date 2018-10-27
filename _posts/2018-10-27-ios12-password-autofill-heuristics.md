---
layout: post
title: iOS12 Password AutoFill heuristics
category : iOS
tags : [ios, password, autofill, heuristics]
description: Despite setting everything correctly, iOS would not show the correct login/signup suggestions. Turns out Apple is using heuristics to determine what to show to the user.
keywords: ios, password, autofill, heuristics
---

Recently encountered an interesting situation while working on the [Toshl](https://toshl.com) [iOS app](https://itunes.apple.com/us/app/toshl-finance-best-budget/id921590251?mt=8). Despite setting everything correctly, iOS would not show the correct login/signup suggestions. It always assumed the user is registering (even if on login) - it always shows the "Use strong passwords" and tries to suggest commonly used emails/usernames.

![Toshl Login](/images/toshl-login-wrong.png)

Turns out Apple is using heuristics to determine what to show to the user:

 > Password AutoFill uses heuristics to determine when the user logs in or creates new passwords, and automatically provides the password QuickType bar. These heuristics give users some Password AutoFill support in most apps, even if those apps haven’t been updated to support AutoFill.

 --- excerpt from [Password AutoFill documentation](https://developer.apple.com/documentation/security/password_autofill).

Despite setting correct `.username`, `.password` and `.newPassword` context types correctly, it still did not work. After trying all sorts of combinations, that all ended with the same result, I noticed the view controller was named `SignupViewController` for both login and signup. After separating the two view controllers - one called `LoginViewController`, one called `SignupViewController`, it all started to work correctly. Also worked correctly if I changed the name to `LoginSignupViewController`. So it would appear it only does not work if view controllers are named Login, Signup and Register.

![Toshl Login](/images/toshl-login-right.png)

Seems that one part of the heuristics is also checking the name of the view controller, which is probably not a good idea, since developers can run into odd situations like this. Hopefully this will save somebody a day of banging their head against the keyboard.