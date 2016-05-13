// stuQuery version 1.0
var eventcache={};function S(h){function f(m,e){var s=new Array();var q,r,p,n,l,o;if(e.indexOf(":eq")>=0){q=e.split(" ");for(p=0;p<q.length;p++){if(p==0){o=c(m,q[p])}else{r=new Array();for(n=0;n<o.length;n++){r=r.concat(c(o[n],q[p]))}o=r.splice(0)}}}else{o=m.querySelectorAll(e)}for(l=0;l<o.length;l++){s.push(o[l])}return s}function c(p,o){var n=-1;var l=new Array();if(o.indexOf(":eq")>0){var j=o.replace(/(.*)\:eq\(([0-9]+)\)/,"$1 $2").split(" ");o=j[0];n=parseInt(j[1])}if(o[0]=="."){els=p.getElementsByClassName(o.substr(1))}else{if(o[0]=="#"){els=p.getElementById(o.substr(1))}else{els=p.getElementsByTagName(o)}}if(!els){els=[]}if(els.nodeName&&els.nodeName=="SELECT"){l.push(els)}else{if(typeof els.length!=="number"){els=[els]}for(k=0;k<els.length;k++){l.push(els[k])}if(n>=0&&l.length>0){if(n<l.length){l=[l[n]]}else{l=[]}}}return l}function a(n,m){var j=false;if(m[0]=="."){m=m.substr(1);for(var l=0;l<n.classList.length;l++){if(n.classList[l]==m){return true}}}else{if(m[0]=="#"){if(n.id==m.substr(1)){return true}}else{if(n.tagName==m.toUpperCase()){return true}}}return false}function d(e){var j;if(typeof e==="string"){this.e=f(document,e)}else{if(typeof e==="object"){this.e=(typeof e.length=="number")?e:[e]}}this.length=(this.e?this.e.length:0);return this}d.prototype.ready=function(e){/in/.test(document.readyState)?setTimeout("S(document).ready("+e+")",9):e()};d.prototype.html=function(j){if(typeof j==="number"){j=""+j}if(typeof j!=="string"&&this.e.length==1){return this.e[0].innerHTML}if(typeof j==="string"){for(var e=0;e<this.e.length;e++){this.e[e].innerHTML=j}}return this};d.prototype.append=function(j){if(!j&&this.e.length==1){return this.e[0].innerHTML}if(j){for(var e=0;e<this.e.length;e++){this.e[e].innerHTML+=j}}return this};d.prototype.prepend=function(l){if(!l&&this.e.length==1){return this.e[0].innerHTML}if(l){for(var m=0;m<this.e.length;m++){this.e[m].innerHTML=l+this.e[m].innerHTML}}return this};d.prototype.before=function(n){var p=document.createElement("div");p.innerHTML=n;var o=p.childNodes;for(var m=0;m<el.length;m++){for(var l=0;l<o.length;l++){el[m].parentNode.insertBefore(o[l],el[m])}}return this};d.prototype.after=function(j){for(var e=0;e<this.e.length;e++){this.e[e].insertAdjacentHTML("afterend",j)}return this};function i(e,l){if(e&&e.length>0){for(var j=0;j<e.length;j++){if(e[j].node==l){return{success:true,match:j}}}}return{success:false}}function g(o,m,l,j,n){if(!eventcache[m]){eventcache[m]=new Array()}eventcache[m].push({node:o,fn:l,fn2:j,data:n})}function b(l){if(eventcache[l.type]){var j=i(eventcache[l.type],l.currentTarget);if(j.success){if(j.match.data){l.data=eventcache[l.type][j.match].data}return{fn:eventcache[l.type][j.match].fn,data:l}}}return function(){return{fn:""}}}d.prototype.off=function(l){if(typeof Element.prototype.removeEventListener!=="function"){Element.prototype.removeEventListener=function(s,p){if(!oListeners.hasOwnProperty(s)){return}var o=oListeners[s];for(var m=-1,n=0;n<o.aEls.length;n++){if(o.aEls[n]===this){m=n;break}}if(m===-1){return}for(var r=0,q=o.aEvts[m];r<q.length;r++){if(q[r]===p){q.splice(r,1)}}}}for(var j=0;j<this.e.length;j++){var e=i(eventcache[l],this.e[j]);if(e.success){this.e[j].removeEventListener(l,eventcache[l][e.match].fn2,false);eventcache[l].splice(e.match,1)}}return this};d.prototype.on=function(m,n,l){m=m||window.event;this.cache=[4,5,6];if(typeof n==="function"&&!l){l=n;n=""}if(typeof l!=="function"){return this}if(this.e.length>0){var o=this;var e=function(p){var q=b({currentTarget:this,type:m,data:n,originalEvent:p});if(typeof q.fn==="function"){return q.fn.call(o,q.data)}};for(var j=0;j<this.e.length;j++){g(this.e[j],m,l,e,n);if(this.e[j].addEventListener){this.e[j].addEventListener(m,e,false)}else{if(this.e[j].attachEvent){this.e[j].attachEvent(m,e)}}}}return this};d.prototype.trigger=function(m){var l;if(document.createEvent){l=document.createEvent("HTMLEvents");l.initEvent(m,true,true)}else{l=document.createEventObject();l.eventType=m}l.eventName=m;for(var j=0;j<this.e.length;j++){if(document.createEvent){this.e[j].dispanelEvent(l)}else{this.e[j].fireEvent("on"+l.eventType,l)}}return this};d.prototype.focus=function(){if(this.e.length==1){this.e[0].focus()}return this};d.prototype.blur=function(){if(this.e.length==1){this.e[0].blur()}return this};d.prototype.remove=function(){if(!this.e){return this}for(var e=this.e.length-1;e>=0;e--){if(!this.e[e]){return}if(typeof this.e[e].remove==="function"){this.e[e].remove()}else{if(typeof this.e[e].parentElement.removeChild==="function"){this.e[e].parentElement.removeChild(this.e[e])}}}return S(this.e)};d.prototype.hasClass=function(j){var e=true;for(var l=0;l<this.e.length;l++){if(!this.e[l].className.match(new RegExp("(\\s|^)"+j+"(\\s|$)"))){e=false}}return e};d.prototype.toggleClass=function(e){for(var j=0;j<this.e.length;j++){if(this.e[j].className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))){this.e[j].className=this.e[j].className.replace(new RegExp("(\\s|^)"+e+"(\\s|$)","g")," ").replace(/ $/,"")}else{this.e[j].className=(this.e[j].className+" "+e).replace(/^ /,"")}}return S(this.e)};d.prototype.addClass=function(e){for(var j=0;j<this.e.length;j++){if(!this.e[j].className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))){this.e[j].className=(this.e[j].className+" "+e).replace(/^ /,"")}}return S(this.e)};d.prototype.removeClass=function(e){for(var j=0;j<this.e.length;j++){while(this.e[j].className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))){this.e[j].className=this.e[j].className.replace(new RegExp("(\\s|^)"+e+"(\\s|$)","g")," ").replace(/ $/,"").replace(/^ /,"")}}return S(this.e)};d.prototype.css=function(m){var o;for(var l=0;l<this.e.length;l++){o={};var n=this.e[l].getAttribute("style");if(n){var q=this.e[l].getAttribute("style").split(";");for(var j=0;j<q.length;j++){var p=q[j].split(":");if(p.length==2){o[p[0]]=p[1]}}}if(typeof m==="object"){for(key in m){o[key]=m[key]}var e="";for(key in o){if(e){e+=";"}if(o[key]){e+=key+":"+o[key]}}this.e[l].setAttribute("style",e)}}if(this.e.length==1&&typeof m==="string"){return o[m]}return S(this.e)};d.prototype.parent=function(){var j=[];for(var e=0;e<this.e.length;e++){j.push(this.e[e].parentElement)}return S(j)};d.prototype.children=function(m){if(typeof m==="string"){var e=[];for(var j=0;j<this.e.length;j++){for(var l=0;l<this.e[j].children.length;l++){if(a(this.e[j].children[l],m)){e.push(this.e[j].children[l])}}}return S(e)}else{for(var j=0;j<this.e.length;j++){this.e[j]=(this.e[j].children.length>m?this.e[j].children[m]:this.e[j])}return S(this.e)}};d.prototype.find=function(j){var m=[];var e=new Array();for(var l=0;l<this.e.length;l++){e=e.concat(f(this.e[l],j))}return S(e)};d.prototype.attr=function(e,m){var l=[];for(var j=0;j<this.e.length;j++){l.push(this.e[j].getAttribute(e));if(typeof m==="string"||typeof m==="number"){if(m){this.e[j].setAttribute(e,m)}else{this.e[j].removeAttribute(e)}}}if(l.length==1){l=l[0]}if(typeof m==="undefined"){return l}else{return S(this.e)}};d.prototype.prop=function(e,m){var l=[];for(var j=0;j<this.e.length;j++){l.push(this.e[j].getAttribute(e));if(typeof m==="boolean"){if(m){this.e[j].setAttribute(e,e)}else{this.e[j].removeAttribute(e)}}}if(l.length==1){l=l[0]}return l};d.prototype.clone=function(){var e=document.createElement("div");e.appendChild(this.e[0].cloneNode(true));return e.innerHTML};d.prototype.replaceWith=function(j){var l=document.createElement("span");l.innerHTML=j;var m=S(this.e);for(var e=0;e<this.e.length;e++){m.e[0].parentNode.replaceChild(l,m.e[0])}return m};d.prototype.ajax=function(m,l){if(typeof m!=="string"){return false}if(!l){l={}}l.url=m;var o=(window.XMLHttpRequest)?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");o.addEventListener("load",e);o.addEventListener("error",j);function e(p){if(o.status===200){l.header=o.getAllResponseHeaders();if(typeof l.complete==="function"){l.complete.call((l["this"]?l["this"]:this),(l.dataType=="json")?JSON.parse(o.responseText):o.responseText,l)}}else{j(p)}}function j(p){if(typeof l.error==="function"){l.error.call((l["this"]?l["this"]:this),p,l)}}try{o.open("GET",m)}catch(n){j(n)}try{o.send()}catch(n){j(n)}return this};d.prototype.loadJSON=function(j,l,e){if(!e){e={}}e.dataType="json";e.complete=l;this.ajax(j,e);return this};return new d(h)};

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
})();

var db;

// ODI Leeds Dashboard
S().ready(function(){

	function Dashboard(yyyy){

		this.panels = new Array();
		this.els = [{'el':".number",'animate':true},{'el':".icons",'animate':false},{'el':".list","animate":false},{'el':".graph"},{'el':".lastupdated"}];
		this.data;
		this.el;
		this.year = yyyy || "";
		this.duration = 1000;
		var files = {};

		var panels = S('.panel');
		// Loop over panels finding the data sources to load
		for(var i = 0; i < panels.length; i++){
			var el = S(panels.e[i]);
			this.panels[i] = {'el':el};
			if(el.attr('data-src')){
				filename = el.attr('data-src');
				this.panels[i].type = el.attr('data-type');
				this.panels[i].filename = filename;
				if(!files[filename]) S().ajax(filename,{'complete':loadData,'this':this,'error':failData,'i':i,'me':this});
				else loadData(this.panels[files[filename]].data,{'i':i,'me':this});
			}else animateNumber(el.find('.number'),el.find('.number').html(),this.duration)
		}


		function animateNumber(el,val,duration){
			if(typeof val!=="number"){
				val = el.html();
				if(val) val = parseFloat(val);
				el.html('');
			}
			var start = new Date();
			var v;
			function frame(){
				var now = new Date();
				// Set the current time in seconds
				var f = (now - start)/duration;
				if(f < 1){
					v = formatNumber(Math.round(val*f));
					el.html(v);
					requestAnimFrame(frame);
				}else{
					el.html(formatNumber(val));
				}
			}

			if(typeof val==="number") frame();
			return;			
		}
		function showArray(el,vals,duration){
			if(duration > 0) animateArray(el,vals,duration)
			else {
				var output = "<ol>";
				for(var i = 0; i < vals.length; i++) output += "<li>"+vals[i]+"</li>";
				output += "</ol>";
				el.html(output);
			}
		}
		function animateArray(el,vals,duration){
			if(!vals) return;
			var start = new Date();
			var done = -1;
			function frame(){
				var now = new Date();
				// Set the current time in seconds
				var f = (now - start)/duration;
				var n = Math.floor(vals.length*f);
				var arr = new Array();
				if(n > done){
					for(var i = 0; i < n; i++) arr.push(vals[i]);
				}
				if(f < 1){
					showArray(el,arr);
					requestAnimFrame(frame);
				}else{
					showArray(el,vals);
				}
			}

			frame();
			return;			
		}

		function offset(el){
			var rect = el.getBoundingClientRect();
			var t = window.pageYOffset ? window.pageYOffset : (document.documentElement ? document.documentElement.scrollTop : (document.body ? document.body.scrollTop : 0));
			var l = window.pageXOffset ? window.pageXOffset : (document.documentElement ? document.documentElement.scrollLeft : (document.body ? document.body.scrollLeft : 0));
			return {
				top: (rect.top + t),
				left: (rect.left + l),
				width: (rect.width),
				height: (rect.height)
			}
		}

		function loadData(data,attr){
			if(typeof data==="string"){
				data = data.replace(/\r/,'');
				data = data.split(/[\n]/);
			}
			attr.me.panels[attr.i].data = data;
			// Parse the header
			var head = attr.header.split(/[\n\r]/);
			var header = {};
			for(var i = 0; i < head.length; i++){
				if(head[i]){
					j = head[i].indexOf(":");
					header[head[i].substr(0,j)] = head[i].substr(j+1).replace(/^ */,"");
				}
			}
			attr.me.panels[attr.i].head = header;
			attr.me.updatePanel(attr.i);
			files[attr.url] = attr.i;
			attr.me.panels[attr.i].el.on('click',{'me':attr.me,'i':i},function(e){
				location.href = "#"+this.parent().parent().attr('data-id');
			});
			return;
		}

		function failData(data){
			console.log('fail',data);
		}
		function formatNumber(v){
			if(typeof v !== "number") return v;
			if(v > 1e7) return Math.round(v/1e6)+"M";
			if(v > 1e6) return (v/1e6).toFixed(1)+"M";
			if(v > 1e5) return Math.round(v/1e3)+"k";
			if(v > 1e4) return Math.round(v/1e3)+"k";
			return v;
		}

		this.update = function(){
			for(var i = 0; i < this.panels.length; i++){
				if(this.panels[i] && this.panels[i].data) this.updatePanel(i)
			}
		}
		// Update a specific panel
		this.updatePanel = function(p){
			var year,add,cols;
			if(this.panels[p]){
				var data = new Array();
				if(!this.panels[p].data) return;
				for(var r = 1; r < this.panels[p].data.length; r++){
					cols = this.panels[p].data[r].split(/\,/);
					data.push(cols);
				}
				for(var i = 0 ; i < this.els.length; i++){
					var n = this.panels[p].el.find(this.els[i].el);

					// If the element doesn't exist in the DOM we skip this
					if(n.length == 0) continue;

					// Are we processing the last updated field?
					if(this.els[i].el.indexOf('.lastupdated') == 0 && this.panels[p].head['Last-Modified']){
						var d = new Date(this.panels[p].head['Last-Modified']);
						var y = d.getUTCFullYear();
						var m = d.getUTCMonth()+1;
						var d = d.getUTCDate();
						if(m < 10) m = "0"+m;
						if(d < 10) d = "0"+d;
						n.html(y+'-'+m+'-'+d)
						continue;
					}
					var coldate = this.panels[p].el.attr('data-date') || "";
					var end = n.attr('data-end') || "";
					var col = parseInt(n.attr('data-col'));
					var row = n.attr('data-row');
					if(row){
						if(row == "all"){
							if(this.els[i].el==".icons" || this.els[i].el==".list"){
								var list = new Array();
								var colurl = parseInt(n.attr('data-col-url'));
								for(var r = 0; r < data.length; r++){
									var s = data[r][coldate-1];
									var e = (new Date()).toISOString();
									if(end && data[r][end-1]) e = data[r][end-1];
									// If the row is within the date range we add the image
									if(this.inDateRange(s,e)){
										if(this.els[i].el==".icons") list.push((colurl ? '<a href="'+data[r][colurl-1]+'">':'')+'<img src="data/'+data[r][col-1]+'" alt="logo" />'+(colurl ? '</a>':''));
										else if(this.els[i].el==".list") list.push((colurl ? '<a href="'+data[r][colurl-1]+'">':'')+data[r][col-1]+(colurl ? '</a>':''));
									}
								}
								showArray(n,list,(this.els[i].animate ? this.duration : 0));
							}else if(this.els[i].el==".graph"){
								var prev;
								var mx = 0;
								var bins = {};
								var sd,ed,s;
								function splitDate(d){
									return {'y':parseInt(d.substr(0,4)),'m':parseInt(d.substr(5,2))};
								}

								// Calculate date range to show for graph
								for(var r = 0; r < data.length; r++){
									s = data[r][coldate-1];
									if(this.inDateRange(s)){
										// We are in the date range and have no start date set
										if(!sd) sd = s;
									}else{
										// We have left the date range (as the start date is set)
										if(sd && !ed) ed = data[r-1][coldate-1];
									}
								}
								// If no end date is set, do that now
								if(!ed) ed = data[data.length-1][coldate-1];
								sd = splitDate(sd);
								ed = splitDate(ed);

								for(var y = sd.y;y <= ed.y; y++){
									for(var m = 1; m <= 12; m++){
										bins[y+'-'+(m < 10 ? "0":"")+m] = 0;
									}
								}
								var nbins = 0;
								for(var key in bins) nbins++;

								// Set the height of the graph
								var h = 0.5*("innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight);
								for(var r = 0; r < data.length; r++){
									sd = splitDate(data[r][coldate-1]);
									key = sd.y+'-'+(sd.m < 10 ? "0":"")+sd.m;
									if(typeof bins[key]==="number") bins[key]+= parseFloat(data[r][col-1]);
								}

								// Find the peak value
								for(var key in bins){
									if(bins[key] > mx) mx = bins[key];
								}

								output = '<table style="'+h+'px"><tr style="vertical-align:bottom;">';
								for(var key in bins) output += '<td style="width:'+(100/nbins)+'%;"><div class="bar" title="'+key+': '+bins[key]+'" style="height:'+(h*bins[key]/mx)+'px;"></div>'+(key.indexOf('-01') > 0 ? '<span class="date">'+key.substr(0,4)+'</span>' : '')+'</td>';
								output += '</tr></table>';
								n.html(output)
							}
							continue;
						}else if(row == "last"){
							row = data.length;
							if(coldate){
								// Find the last row in the valid date range
								for(var r = 0; r < data.length; r++){
									if(this.inDateRange(data[r][coldate-1])) row = r+1;
								}
							}
						}else row = parseInt(row)
						val = data[row-1][col-1];
						if(this.els[i].animate) animateNumber(n,val,this.duration);
						else n.html(val);
					}else{
						var op = n.attr('data-op');
						var year = "";
						if(op && col){
							var total = 0;
							for(var r = 0; r < data.length; r++){
								// Get the year from the ISO8601 formatted string
								// if a data-date column has been specified
								var s = data[r][coldate-1];
								var e = (new Date()).toISOString();
								if(end && data[r][end-1]) e = data[r][end-1];
								if(this.inDateRange(s,e)){
									if(op=="sum") total += parseInt(data[r][col-1]);
									else if(op=="count") total++;
								}
							}
							if(this.els[i].animate) animateNumber(n,total,this.duration);
							else n.html(formatNumber(total));
						}
					}
				}
			}
		}
		this.inDateRange = function(start,end){
			var s = parseInt(start.substr(0,4));
			var e = (end ? parseInt(end.substr(0,4)) : s);
			if(!this.year) return true;
			if(s <= this.year && e >= this.year) return true;
			else return false; 
		}
		this.resize = function(){
			var i = S('.moreinfo');
			if(i.length ==1){
				var height = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
				S('.moreinfo').css({'left':'0px','top':'0px','width':document.body.offsetWidth+'px','height':height+'px'});
			}
			return this;
		}
		this.navigate = function(e,a){
			if(!a) a = location.href.split("#")[1];
			var i = -1;
			for(var j = 0; j < this.panels.length ; j++){
				if(this.panels[j].el.parent().parent().attr('data-id')==a){
					i = j;
					continue;
				}
			}
			if(i >= 0){
				var p = this.panels[i].el;
				var o = offset(p.e[0]);
				// Add to history
				if(this.pushstate && !e) history.pushState({},"Guide","#"+a);

				// Extract the background colour class from the parent
				var cls = p.parent().attr('class').replace(/^.*?\s?([^\s]+-bg)/,function(e,a){ return a; });
				var html = p.html();
				S('.moreinfo').remove();
				S('.main').after('<div class="moreinfo '+cls+'"><div class="'+p.attr('class')+'"></div></div>');
				S('body').css({'overflow-y': 'hidden'});
				var height = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
				S('.moreinfo .panel').html('<div class="close">&times;</div>'+html);
				S('.moreinfo').css({'width':o.width+'px','height':o.height+'px','left':o.left+'px','top':o.top+'px'});
				S('.moreinfo').css({'left':'0px','top':'0px','width':document.body.offsetWidth+'px','height':height+'px'});
				S('.moreinfo .close').on('click',{me:this},function(e){ location.href = e.data.me.href; });
			}else{
				S('.moreinfo').remove();
				S('body').css({'overflow-y': ''});
			}
			return this;
		}

		// Do we update the address bar?
		this.pushstate = !!(window.history && history.pushState);
		this.href = location.href.split("#")[0];

		// We'll need to change the sizes when the window changes size
		var _obj = this;
		window.addEventListener('resize',function(e){ _obj.resize(); });
		// Deal with back/forwards navigation. Use popstate or onhashchange (IE) if pushstate doesn't seem to exist
		window[(this.pushstate) ? 'onpopstate' : 'onhashchange'] = function(e){ _obj.navigate(e); };

		this.navigate({});
		
		return this;
	}
	
	S('#range').on('change',function(e){
		db.year = e.currentTarget.value;
		db.update();
	});

	db = new Dashboard(S('#range').e[0].value);
});