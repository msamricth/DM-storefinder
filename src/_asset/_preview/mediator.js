var mediator=(function(){var subscribe=function(tracker,fn){if(!ACC.config.googleAnalyticsEnabled){console.log("Google analytics is disabled. Subscribe skipped.");return false;}
if(!mediator.trackers[tracker])
{mediator.trackers[tracker]=[];}
mediator.trackers[tracker].push({context:this,callback:fn});return this;},publish=function(tracker){if(!ACC.config.googleAnalyticsEnabled){console.log("Google analytics is disabled. Publish skipped.");return false;}
if(!mediator.trackers[tracker])
{return false;}
var args=Array.prototype.slice.call(arguments,1);for(var i=0,l=mediator.trackers[tracker].length;i<l;i++)
{var subscription=mediator.trackers[tracker][i];subscription.callback.apply(subscription.context,args);}
return this;},publishAll=function(){if(!ACC.config.googleAnalyticsEnabled){console.log("Google analytics is disabled. Publish all skipped.");return false;}
if(Object.keys(mediator.trackers).length===0)
{return false;}
for(var tracker in mediator.trackers)
{var args=[tracker].concat(Array.prototype.slice.call(arguments));mediator.publish.apply(this,args);}
return this;};return{trackers:{},publish:publish,publishAll:publishAll,subscribe:subscribe}})()