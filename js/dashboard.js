/*!
 * stuQuery v1.0.3
 */
var eventcache={};function S(g){function d(m,e){var s=new Array();var q,r,p,n,l,o;if(e.indexOf(":eq")>=0){q=e.split(" ");for(p=0;p<q.length;p++){if(p==0){o=i(m,q[p])}else{r=new Array();for(n=0;n<o.length;n++){r=r.concat(i(o[n],q[p]))}o=r.splice(0)}}}else{o=m.querySelectorAll(e)}for(l=0;l<o.length;l++){s.push(o[l])}return s}function i(q,p){var o=-1;var n=new Array();if(p.indexOf(":eq")>0){var l=p.replace(/(.*)\:eq\(([0-9]+)\)/,"$1 $2").split(" ");p=l[0];o=parseInt(l[1])}if(p[0]=="."){els=q.getElementsByClassName(p.substr(1))}else{if(p[0]=="#"){els=q.getElementById(p.substr(1))}else{els=q.getElementsByTagName(p)}}if(!els){els=[]}if(els.nodeName&&els.nodeName=="SELECT"){n.push(els)}else{if(typeof els.length!=="number"){els=[els]}for(k=0;k<els.length;k++){n.push(els[k])}if(o>=0&&n.length>0){if(o<n.length){n=[n[o]]}else{n=[]}}}return n}function c(o,n){var l=false;if(n[0]=="."){n=n.substr(1);for(var m=0;m<o.classList.length;m++){if(o.classList[m]==n){return true}}}else{if(n[0]=="#"){if(o.id==n.substr(1)){return true}}else{if(o.tagName==n.toUpperCase()){return true}}}return false}function f(e){var m;if(typeof e==="string"){this.e=d(document,e)}else{if(typeof e==="object"){this.e=(typeof e.length=="number")?e:[e]}}for(var l in this.e){this[l]=this.e[l]}this.length=(this.e?this.e.length:0);return this}f.prototype.ready=function(e){/in/.test(document.readyState)?setTimeout("S(document).ready("+e+")",9):e()};f.prototype.html=function(l){if(typeof l==="number"){l=""+l}if(typeof l!=="string"&&this.length==1){return this[0].innerHTML}if(typeof l==="string"){for(var e=0;e<this.length;e++){this[e].innerHTML=l}}return this};f.prototype.append=function(l){if(!l&&this.length==1){return this[0].innerHTML}if(l){for(var e=0;e<this.length;e++){this[e].innerHTML+=l}}return this};f.prototype.prepend=function(l){if(!l&&this.length==1){return this[0].innerHTML}if(l){for(var m=0;m<this.length;m++){this[m].innerHTML=l+this[m].innerHTML}}return this};f.prototype.before=function(n){var p=document.createElement("div");p.innerHTML=n;var o=p.childNodes;for(var m=0;m<el.length;m++){for(var l=0;l<o.length;l++){el[m].parentNode.insertBefore(o[l],el[m])}}return this};f.prototype.after=function(l){for(var e=0;e<this.length;e++){this[e].insertAdjacentHTML("afterend",l)}return this};function b(e,m){if(e&&e.length>0){for(var l=0;l<e.length;l++){if(e[l].node==m){return{success:true,match:l}}}}return{success:false}}function j(p,n,m,l,o){if(!eventcache[n]){eventcache[n]=new Array()}eventcache[n].push({node:p,fn:m,fn2:l,data:o})}function h(n){if(eventcache[n.type]){var l=b(eventcache[n.type],n.currentTarget);if(l.success){if(l.match.data){n.data=eventcache[n.type][l.match].data}return{fn:eventcache[n.type][l.match].fn,data:n}}}return function(){return{fn:""}}}f.prototype.off=function(n){if(typeof Element.prototype.removeEventListener!=="function"){Element.prototype.removeEventListener=function(t,q){if(!oListeners.hasOwnProperty(t)){return}var p=oListeners[t];for(var m=-1,o=0;o<p.aEls.length;o++){if(p.aEls[o]===this){m=o;break}}if(m===-1){return}for(var s=0,r=p.aEvts[m];s<r.length;s++){if(r[s]===q){r.splice(s,1)}}}}for(var l=0;l<this.length;l++){var e=b(eventcache[n],this.e[l]);if(e.success){this[l].removeEventListener(n,eventcache[n][e.match].fn2,false);eventcache[n].splice(e.match,1)}}return this};f.prototype.on=function(n,o,m){n=n||window.event;this.cache=[4,5,6];if(typeof o==="function"&&!m){m=o;o=""}if(typeof m!=="function"){return this}if(this.length>0){var p=this;var e=function(q){var r=h({currentTarget:this,type:n,data:o,originalEvent:q,preventDefault:function(){if(q.preventDefault){q.preventDefault()}},stopPropagation:function(){if(q.stopImmediatePropagation){q.stopImmediatePropagation()}if(q.stopPropagation){q.stopPropagation()}if(q.cancelBubble!=null){q.cancelBubble=true}}});if(typeof r.fn==="function"){return r.fn.call(p,r.data)}};for(var l=0;l<this.length;l++){j(this[l],n,m,e,o);if(this[l].addEventListener){this[l].addEventListener(n,e,false)}else{if(this[l].attachEvent){this[l].attachEvent(n,e)}}}}return this};f.prototype.trigger=function(n){var m;if(document.createEvent){m=document.createEvent("HTMLEvents");m.initEvent(n,true,true)}else{m=document.createEventObject();m.eventType=n}m.eventName=n;for(var l=0;l<this.length;l++){if(document.createEvent){this[l].dispatchEvent(m)}else{this[l].fireEvent("on"+m.eventType,m)}}return this};f.prototype.focus=function(){if(this.length==1){this[0].focus()}return this};f.prototype.blur=function(){if(this.length==1){this[0].blur()}return this};f.prototype.remove=function(){if(this.length<1){return this}for(var e=this.length-1;e>=0;e--){if(!this[e]){return}if(typeof this[e].remove==="function"){this[e].remove()}else{if(typeof this[e].parentElement.removeChild==="function"){this[e].parentElement.removeChild(this[e])}}}return this};f.prototype.hasClass=function(l){var e=true;for(var m=0;m<this.length;m++){if(!this[m].className.match(new RegExp("(\\s|^)"+l+"(\\s|$)"))){e=false}}return e};f.prototype.toggleClass=function(e){for(var l=0;l<this.length;l++){if(this[l].className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))){this[l].className=this[l].className.replace(new RegExp("(\\s|^)"+e+"(\\s|$)","g")," ").replace(/ $/,"")}else{this[l].className=(this[l].className+" "+e).replace(/^ /,"")}}return this};f.prototype.addClass=function(e){for(var l=0;l<this.length;l++){if(!this[l].className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))){this[l].className=(this[l].className+" "+e).replace(/^ /,"")}}return this};f.prototype.removeClass=function(e){for(var l=0;l<this.length;l++){while(this[l].className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))){this[l].className=this[l].className.replace(new RegExp("(\\s|^)"+e+"(\\s|$)","g")," ").replace(/ $/,"").replace(/^ /,"")}}return this};f.prototype.css=function(n){var p;for(var m=0;m<this.length;m++){p={};var o=this[m].getAttribute("style");if(o){var r=this[m].getAttribute("style").split(";");for(var l=0;l<r.length;l++){var q=r[l].split(":");if(q.length==2){p[q[0]]=q[1]}}}if(typeof n==="object"){for(key in n){p[key]=n[key]}var e="";for(key in p){if(e){e+=";"}if(p[key]){e+=key+":"+p[key]}}this[m].setAttribute("style",e)}}if(this.length==1&&typeof n==="string"){return p[n]}return this};f.prototype.parent=function(){var l=[];for(var e=0;e<this.length;e++){l.push(this[e].parentElement)}return S(l)};f.prototype.children=function(n){if(typeof n==="string"){var e=[];for(var l=0;l<this.length;l++){for(var m=0;m<this[l].children.length;m++){if(c(this[l].children[m],n)){e.push(this[l].children[m])}}}return S(e)}else{for(var l=0;l<this.length;l++){this[l]=(this[l].children.length>n?this[l].children[n]:this[l])}return this}};f.prototype.find=function(l){var n=[];var e=new Array();for(var m=0;m<this.length;m++){e=e.concat(d(this[m],l))}return S(e)};function a(q,e,r,l){var p=[];for(var o=0;o<q.length;o++){p.push(q[o].getAttribute(e));var n=false;for(var m in l){if(typeof r===l[m]){n=true}}if(n){if(r){q[o].setAttribute(e,r)}else{q[o].removeAttribute(e)}}}if(p.length==1){p=p[0]}if(typeof r==="undefined"){return p}else{return q}}f.prototype.attr=function(e,l){return a(this,e,l,["string","number"])};f.prototype.prop=function(e,l){return a(this,e,l,["boolean"])};f.prototype.clone=function(){var e=document.createElement("div");e.appendChild(this[0].cloneNode(true));return e.innerHTML};f.prototype.replaceWith=function(l){var m=document.createElement("span");m.innerHTML=l;var n=S(this.e);for(var e=0;e<this.length;e++){n[0].parentNode.replaceChild(m,n[0])}return n};f.prototype.ajax=function(n,m){if(typeof n!=="string"){return false}if(!m){m={}}m.url=n+(typeof m.cache==="boolean"&&!m.cache?"?"+(new Date()).valueOf():"");var p=(window.XMLHttpRequest)?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");p.addEventListener("load",e);p.addEventListener("error",l);function e(q){if(p.status===200){m.header=p.getAllResponseHeaders();if(typeof m.complete==="function"){m.complete.call((m["this"]?m["this"]:this),(m.dataType=="json")?JSON.parse(p.responseText):p.responseText,m)}}else{l(q)}}function l(q){if(typeof m.error==="function"){m.error.call((m["this"]?m["this"]:this),q,m)}}try{p.open("GET",n)}catch(o){l(o)}try{p.send()}catch(o){l(o)}return this};f.prototype.loadJSON=function(l,m,e){if(!e){e={}}e.dataType="json";e.complete=m;this.ajax(l,e);return this};return new f(g)};

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
})();

/*!
 * ODI Leeds Dashboard (version 1.0.1)
 */
function Dashboard(inp){
	if(!inp) inp = {};
	this.panels = new Array();
	this.year = "";
	this.duration = 1000;
	this.config = {};
	this.panellookup = {};
	var files = {};

	function parseQueryString(){
		var r = {};
		var q = location.search;
		if(q && q != '#'){
			// remove the leading ? and trailing &
			q = q.replace(/^\?/,'').replace(/\&$/,'');
			var qs = q.split('&');
			for(var i = 0; i < qs.length; i++){
				var key = qs[i].split('=')[0];
				var val = qs[i].split('=')[1];
				if(/^[0-9\.]+$/.test(val)) val = parseFloat(val);	// convert floats
				r[key] = val;
			}
		}
		this.testmode = (r['debug']) ? true : false;
		for(u in this.defaults){
			if(r[u]) this.defaults[u] = r[u];
		}
		return r;
	}
	this.query = parseQueryString();
	// Define if we show the close button or not
	this.interactive = true;
	if(this.query.interactive && (this.query.interactive == "false" || this.query.interactive == 0)) this.interactive = false;
	this.log = (this.query.debug && this.query.debug=="log") ? this.query.debug : false;

	this.setup = function(inp){
		log('setup');
		if(!inp) inp = {};
		if(typeof inp.year==="string") this.year = S(inp.year).e[0].value;
		if(inp.config) this.config = inp.config;
		var i = 0;
		var inpanel = false;
		for(var p in this.config){
			var el = S('#'+p);
			this.panellookup[p] = i;
			this.panels[i] = {'el':el,'updateable':new Array(),'id':p,'config':this.config[p]};

			// Quick navigation to this panel. It'll be empty at the moment as we haven't 
			// loaded the data but it stops things looking so jumpy
			if(p == this.anchor){
				this.navigate({},this.anchor);
				inpanel = true;
			}

			if(this.config[p].data){
				var d = new Date();
				var fn = this.config[p].data+'?'+d;
				if(!files[fn]) S().ajax(fn,{'complete':loadData,'this':this,'error':failData,'i':i,'me':this,'cache':false});
				else loadData(this.panels[files[fn]].data,{'i':i,'me':this});
			}
			i++;
		}
		if(inpanel){
			// If we are in a panel we have a smooth transition into it
			S('#cover').css({'opacity':'0'});
			setTimeout(function(){ S('#cover').css({'display':'none'}); },500);
		}else{
			// If we are on the main screen we remove the cover instantly
			S('#cover').css({'display':'none'});
		}

		S('#range').on('change',{me:this},function(e){
			e.data.me.year = e.currentTarget.value;
			e.data.me.update();
		});
	}

	function pad(n, w) {
		z = '0';
		n = n + '';
		l = n.length;
		return l >= w ? n : new Array(w-l+1).join(z) + n;
	}

	function animateNumber(el,val,duration,units){
		log('animateNumber');
		if(typeof val!=="number"){
			val = el.html();
			if(val) val = parseFloat(val);
			el.html('');
		}
		if(!units) units = "";
		var start = new Date();
		var v;
		function frame(){
			var now = new Date();
			// Set the current time in seconds
			var f = (now - start)/duration;
			if(f < 1){
				v = formatNumber(Math.round(val*f));
				el.html(units+v);
				requestAnimFrame(frame);
			}else{
				el.html(units+formatNumber(val));
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
		log('loadData',data,attr);
		if(typeof data==="string"){
			data = data.replace(/\r/,'').replace(/[\n\r]*$/,'');	// Remove blank lines at end of file
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
		if(attr.me.panels[attr.i].id == attr.me.anchor) this.navigate({},attr.me.anchor);
		return;
	}

	function log(){
		if(!_obj.log) return this;
		var args = Array.prototype.slice.call(arguments, 0);
		if(console && typeof console.log==="function") console.log('LOG',args);
		return this;
	}

	function failData(data){
		log('fail',data);
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
		log('update');
		for(var i = 0; i < this.panels.length; i++){
			if(this.panels[i] && this.panels[i].data) this.updatePanel(i);
		}
	}
	// Update a specific panel
	this.updatePanel = function(p){
		log('updatePanel',p);
		var year,add,cols;
		if(this.panels[p]){

			var data = new Array();
			if(!this.panels[p].data) return;
			for(var r = 1; r < this.panels[p].data.length; r++){
				// Split the line by commas (but not commas within quotation marks
				cols = this.panels[p].data[r].split(/,(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/);
				data.push(cols);
			}
			this.panels[p].el = S('#'+this.panels[p].id);
			for(var e in this.panels[p].config.els){
				var n = this.panels[p].el.find(e);
				var el = this.panels[p].config.els[e];
				
				// If the element doesn't exist in the DOM we skip this
				if(n.length == 0) continue;
				
				if(e == ".lastupdated" && this.panels[p].head['Last-Modified']){
					var d = new Date(this.panels[p].head['Last-Modified']);
					n.html(d.getUTCFullYear()+'-'+pad(d.getUTCMonth()+1,2)+'-'+pad(d.getUTCDate(),2))
					continue;
				}
				// Are we replacing the text content of the DOM element?
				if(el.text){
					n.html(el.text)
					continue;
				}
				var coldate = this.panels[p].config.start || "";
				var colend = this.panels[p].config.end || "";
				var col = el.col || "";
				var img = el.img || "";
				var row = el.row || "";
				if(row){
					if(row == "all"){
						if(el.type=="list"){
							var list = new Array();
							var colurl = parseInt(el.url);
							var mn = data.length - (this.panels[p].config.max || data.length);
							if(mn < 0) mn = 0;
							for(var r = data.length-1; r >= mn; r--){
								var s = data[r][coldate-1];
								var e = (new Date()).toISOString();
								if(colend && data[r][colend-1]) e = data[r][colend-1];
								// If the row is within the date range we add the image
								if(this.inDateRange(s,e)) list.push((colurl ? '<a href="'+data[r][colurl-1]+'">':'')+(data[r][img-1] ? '<img src="data/'+data[r][img-1]+'" alt="'+data[r][col-1]+'" title="'+data[r][col-1]+'" />' : data[r][col-1])+(colurl ? '</a>':''));
							}
							this.panels[p].updateable.push({'el':e,'n':n,'list':list,'duration':(el.animate ? this.duration : 0)});
						}else if(el.type=="graph"){
							var prev;
							var mx = 0;
							var bins = {};
							var sd,ed,s;
							function splitDate(d){
								if(!d) return {};
								return (d.length == 4) ? {'y':parseInt(d)} : {'y':parseInt(d.substr(0,4)),'m':parseInt(d.substr(5,2))};
							}

							// Calculate date range to show for graph
							for(var r = 0; r < data.length; r++){
								s = data[r][coldate-1];
								if(this.inDateRange(s)){
									// We are in the date range and have no start date set
									if(!sd) sd = s;
									if(!ed) ed = s;
									if(s < sd) sd = s;
									if(s > ed) ed = s;
								}else{
									// We have left the date range (as the start date is set)
									if(sd && !ed) ed = data[r-1][coldate-1];
								}
							}
							// If no end date is set, do that now
							if(!ed) ed = data[data.length-1][coldate-1];
							sd = splitDate(sd);
							ed = splitDate(ed);
							monthly = (sd.m > 0);

							for(var y = sd.y;y <= ed.y; y++){
								if(monthly){
									for(var m = 1; m <= 12; m++){ 
										if(y < ed.y || (y == ed.y && m <= ed.m+1)){
											bins[y+'-'+(m < 10 ? "0":"")+m] = 0;
										}
									}
								}else bins[y] = 0;
							}
							var nbins = 0;
							for(var key in bins) nbins++;

							// Set the height of the graph
							var h = 0.5*("innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight);
							for(var r = 0; r < data.length; r++){
								sd = splitDate(data[r][coldate-1]);
								key = sd.y+(monthly ? '-'+(sd.m < 10 ? "0":"")+sd.m : '');
								if(typeof bins[key]==="number") bins[key]+= parseFloat(data[r][col-1]);
							}

							// Find the peak value
							for(var key in bins){
								if(bins[key] > mx) mx = bins[key];
							}

							var output = '<div class="grid" style="height:'+h+'px;">';
							var grid = getGrid(0,mx);
							for(var g = 0; g < grid.max; g+= grid.inc){
								output += '<div class="line" style="bottom:'+(h*g/mx)+'px;"><span>'+(this.panels[p].config.units || "")+formatNumber(g)+'</span></div>';
							} 
							output += '</div>'
							output += '<table><tr style="vertical-align:bottom;">';
							for(var key in bins) output += '<td style="width:'+(100/nbins)+'%;"><div class="bar" title="'+key+': '+(this.panels[p].config.units || "")+formatNumber(bins[key])+'" style="height:'+(h*bins[key]/mx)+'px;"></div>'+((key.indexOf('-01') > 0 || key.indexOf('-')==-1) ? '<span class="date">'+key.substr(0,4)+'</span>' : '')+'</td>';
							output += '</tr></table>';
							n.html(output);
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
					if(el.animate) animateNumber(n,val,this.duration);
					else n.html(val);
				}else{
					var op = el.op;
					var year = "";
					if(op && col){
						var total = 0;
						for(var r = 0; r < data.length; r++){
							// Get the year from the ISO8601 formatted string
							// if a data-start column has been specified
							var s = data[r][coldate-1];
							var e = (new Date()).toISOString();
							if(colend && data[r][colend-1]) e = data[r][colend-1];
							if(this.inDateRange(s,e)){
								if(op=="sum") total += parseInt(data[r][col-1]);
								else if(op=="count") total++;
							}
						}
						if(el.animate) animateNumber(n,total,this.duration,this.panels[p].config.units);
						else n.html((this.panels[p].config.units || "")+formatNumber(total));
					}
				}
			}

			// Add CSS cursor and add click event
			this.panels[p].el.css({'cursor':'pointer'}).off('click').on('click',{'me':this,'i':p},function(e){
				log('Set hash')
				location.hash = e.data.me.panels[e.data.i].id;
			});
		}
		return this;
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
		log('navigate');
		if(!a) a = location.href.split("#")[1];
		var i = this.panellookup[a];

		// Remove any existing moreinfo box
		S('.moreinfo').remove();

		if(typeof i==="number"){
			for(var j = 0; j < this.panels[i].updateable.length; j++) showArray(this.panels[i].updateable[j].n,this.panels[i].updateable[j].list,this.panels[i].updateable[j].duration);

			this.panels[i].el = S('#'+this.panels[i].id);
			var o = offset(this.panels[i].el.e[0]);

			// Add the moreinfo box
			S('.main').after('<div class="moreinfo '+this.panels[i].config['class']+'"></div>');
			S('body').css({'overflow-y': 'hidden'});
			S('.moreinfo').html((this.interactive ? '<div class="close">&times;</div>':'')+this.panels[i].el.html()).css({'width':o.width+'px','height':o.height+'px','left':o.left+'px','top':o.top+'px'}).css({'left':'0px','top':'0px','width':document.body.offsetWidth+'px','height':("innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight)+'px'});
			if(this.interactive) S('.moreinfo .close').on('click',{me:this},function(e){ location.hash = 'top' });
		}else{
			S('body').css({'overflow-y': ''});
		}
		return this;
	}

	// Do we update the address bar?
	this.pushstate = !!(window.history && history.pushState);
	this.href = location.href.split("#")[0];
	this.anchor = location.href.split("#")[1];

	// We'll need to change the sizes when the window changes size
	var _obj = this;
	window.addEventListener('resize',function(e){ _obj.resize(); });
	// Deal with back/forwards navigation. Use popstate or onhashchange (IE) if pushstate doesn't seem to exist
	if('onhashchange' in window) window.onhashchange = function(e){ _obj.navigate(e); };

	function getGrid(mn,mx){
		var rg = mx-mn;
		var base = 10;
		var t_inc = Math.pow(base,Math.floor(Math.log(rg)/Math.log(base)));
		t_inc *= 2;
		var t_max = (Math.floor(mx/t_inc))*t_inc;
		if(t_max < mx) t_max += t_inc;
		var t_min = t_max;
		var i = 0;
		do {
			i++;
			t_min -= t_inc;
		}while(t_min > mn);

		// Test for really tiny values that might mess up the calculation
		if(Math.abs(t_min) < 1E-15) t_min = 0.0;

		// Add more tick marks if we only have a few
		while(i < 3) {
			t_inc /= 2.0;
			if((t_min + t_inc) <= mn) t_min += t_inc;
			if((t_max - t_inc) >= mx) t_max -= t_inc ;
			i = i*2;
		}
		return {'min':t_min,'max':t_max,'inc':t_inc,'range':t_max-t_min};
	}

	return this;
}