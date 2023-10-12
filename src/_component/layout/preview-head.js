
			var loadDeferredStyles = function () {
				if(document.getElementById("deferred-styles")){
					var addStylesNode = document.getElementById("deferred-styles");
					var replacement = document.createElement("div");
					replacement.innerHTML = addStylesNode.textContent;
					document.body.appendChild(replacement)
					addStylesNode.parentElement.removeChild(addStylesNode);
				}
			};
			var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
				window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			if (raf) raf(function () { window.setTimeout(loadDeferredStyles, 0); });
			else window.addEventListener('load', loadDeferredStyles);
            
			var customerLoggedIn = false;
		var currentPage = "cmsitem_00035000";
		!function(att,raq,t){
			var version = "1";
			var supportOldBrowsers = true;
			att[raq]=att[raq]||[];var n=["init","send","setUser","addUserIdentity","setUserIdentities","addUserSegment","setUserSegments","addUserTrait","setUserTraits","clearUser"];
			if(!att.xo){att.xo={activity:{},init:function(e){att[raq].push(["init",e.activity])}};for(var r=0;r<n.length;r++)att.xo.activity[n[r]]=function(e){return function(i,r,s){att[raq].push([n[e],i,r,s])}}(r)}var s=document.createElement("script");
			s.type="text/javascript",s.async=!0,s.src=t+version+".min.js",(att.document.documentMode||supportOldBrowsers)&&(s.src=t+version+".compat.min.js");
			var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(s,a)
		}(window,"_attraqt","https://cdn.attraqt.io/xo.all-");

			//Initializing the JavaScript library
			xo.init({
				activity: {
					trackerKey: '3b563edc-a747-4776-973a-98b1374ddb16',
					region: 'eu'
				}
			});