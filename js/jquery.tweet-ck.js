$(document).ready(function(){$(".tweet").tweet({username:"mihahribar",join_text:null,avatar_size:null,count:10,auto_join_text_default:null,auto_join_text_ed:null,auto_join_text_ing:null,auto_join_text_reply:null,auto_join_text_url:null,loading_text:"Loading tweets..."})});(function(a){a.fn.tweet=function(b){function d(a){var b=Date.parse(a);var c=arguments.length>1?arguments[1]:new Date;var d=parseInt((c.getTime()-b)/1e3);if(d<60){return"less than a minute ago"}else if(d<120){return"about a minute ago"}else if(d<45*60){return parseInt(d/60).toString()+" minutes ago"}else if(d<90*60){return"about an hour ago"}else if(d<24*60*60){return"about "+parseInt(d/3600).toString()+" hours ago"}else if(d<48*60*60){return"1 day ago"}else{return parseInt(d/86400).toString()+" days ago"}}var c={username:["razvijalec"],avatar_size:null,count:1,intro_text:null,outro_text:null,join_text:null,auto_join_text_default:"i said,",auto_join_text_ed:"i",auto_join_text_ing:"i am",auto_join_text_reply:"i replied to",auto_join_text_url:"i was looking at",loading_text:null,query:null};a.fn.extend({linkUrl:function(){var b=[];var c=/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;this.each(function(){b.push(this.replace(c,'<a href="$1">$1</a>'))});return a(b)},linkUser:function(){var b=[];var c=/[\@]+([A-Za-z0-9-_]+)/gi;this.each(function(){b.push(this.replace(c,'<a href="http://twitter.com/$1">@$1</a>'))});return a(b)},linkHash:function(){var b=[];var d=/ [\#]+([A-Za-z0-9-_]+)/gi;this.each(function(){b.push(this.replace(d,' <a href="http://search.twitter.com/search?q=&tag=$1&lang=all&from='+c.username.join("%2BOR%2B")+'">#$1</a>'))});return a(b)},capAwesome:function(){var b=[];this.each(function(){b.push(this.replace(/(a|A)wesome/gi,"AWESOME"))});return a(b)},capEpic:function(){var b=[];this.each(function(){b.push(this.replace(/(e|E)pic/gi,"EPIC"))});return a(b)},makeHeart:function(){var b=[];this.each(function(){b.push(this.replace(/[<]+[3]/gi,"<tt class='heart'>&#x2665;</tt>"))});return a(b)}});if(b)a.extend(c,b);return this.each(function(){var b=a('<ul class="tweet_list">').appendTo(this);var e='<p class="tweet_intro">'+c.intro_text+"</p>";var f='<p class="tweet_outro">'+c.outro_text+"</p>";var g=a('<p class="loading">'+c.loading_text+"</p>");if(typeof c.username=="string"){c.username=[c.username]}var h="";if(c.query){h+="q="+c.query}h+="&q=from:"+c.username.join("%20OR%20from:");var i="http://search.twitter.com/search.json?&"+h+"&rpp="+c.count+"&callback=?";if(c.loading_text)a(this).append(g);a.getJSON(i,function(h){if(c.loading_text)g.remove();if(c.intro_text)b.before(e);a.each(h.results,function(e,f){if(c.join_text=="auto"){if(f.text.match(/^(@([A-Za-z0-9-_]+)) .*/i)){var g=c.auto_join_text_reply}else if(f.text.match(/(^\w+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+) .*/i)){var g=c.auto_join_text_url}else if(f.text.match(/^((\w+ed)|just) .*/im)){var g=c.auto_join_text_ed}else if(f.text.match(/^(\w*ing) .*/i)){var g=c.auto_join_text_ing}else{var g=c.auto_join_text_default}}else{var g=c.join_text}var h='<span class="tweet_join"> '+g+" </span>";var i=c.join_text?h:" ";var j='<a class="tweet_avatar" href="http://twitter.com/'+f.from_user+'"><img src="'+f.profile_image_url+'" height="'+c.avatar_size+'" width="'+c.avatar_size+'" alt="'+f.from_user+'\'s avatar" border="0"/></a>';var k=c.avatar_size?j:"";var l='<p class="time"><a href="http://twitter.com/'+f.from_user+"/statuses/"+f.id+'" title="view tweet on twitter">'+d(f.created_at)+"</a></p>";var m="<p>"+a([f.text]).linkUrl().linkUser().linkHash().makeHeart().capAwesome().capEpic()[0]+"</p>";b.append("<li>"+k+l+i+m+"</li>");b.children("li:first").addClass("tweet_first");b.children("li:odd").addClass("tweet_even");b.children("li:even").addClass("tweet_odd")});if(c.outro_text)b.after(f)})})}})(jQuery)