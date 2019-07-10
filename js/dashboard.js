// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
})();

/*!
 * ODI Leeds Dashboard
 */
function Dashboard(inp){
	if(!inp) inp = {};
	this.version = "1.2.0";
	this.panels = new Array();
	this.duration = 1000;
	this.config = {};
	this.panellookup = {};
	this.replace = {};
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
	
	this.name = "Dashboard";
	// Function for logging to the console
	this.log = function(){
		if(this.logging || arguments[0]=="ERROR"){
			var args = Array.prototype.slice.call(arguments, 0);
			if(console && typeof console.log==="function"){
				if(arguments[0] == "ERROR") console.log('%cERROR%c %c'+this.name+'%c: '+args[1],'color:white;background-color:#D60303;padding:2px;','','font-weight:bold;','',(args.length > 2 ? (args.length > 3 ? args.splice(2) : args[2]):""));
				else if(arguments[0] == "WARNING") console.log('%cWARNING%c %c'+this.name+'%c: '+args[1],'color:black;background-color:#F9BC26;padding:2px;','','font-weight:bold;','',(args.length > 2 ? (args.length > 3 ? args.splice(2) : args[2]):""));
				else console.log('%c'+this.name+'%c','font-weight:bold;','',(args.length==1 ? args[0] : args));
			}
		}
		return this;
	};

	if(console) console.log('%c'+this.name+' v'+this.version+'%c','font-weight:bold;font-size:1.25em;','');
	
	this.query = parseQueryString();
	// Define if we show the close button or not
	this.interactive = true;
	if(this.query.interactive && (this.query.interactive == "false" || this.query.interactive == 0)) this.interactive = false;
	this.logging = (this.query.debug && this.query.debug=="log") ? this.query.debug : false;

	this.setup = function(inp){
		this.log('setup');
		if(!inp) inp = {};
		if(inp.config) this.config = inp.config;
		var i = 0;
		var inpanel = false;
		if(this.range) S('#range')[0].value = this.range;

		for(var p in this.config){
			var el = S('#'+p);
			this.panellookup[p] = i;
			this.panels[i] = {'el':el,'updateable':new Array(),'id':p,'config':this.config[p],'view':S('#range')[0].value };
			// Update panel class
			for(var c = 1; c <= 14; c++) this.panels[i].el.find('.c'+c+'-bg').removeClass('c'+c+'-bg').addClass(this.panels[i].config['class']);

			// Quick navigation to this panel. It'll be empty at the moment as we haven't 
			// loaded the data but it stops things looking so jumpy
			if(p == this.anchor){
				this.navigate({},this.anchor);
				inpanel = true;
			}

			if(this.config[p].data){
				var d = new Date();
				for(var u = 0; u < this.config[p].data.length; u++){
					var fn = this.config[p].data[u]+'?'+d.getTime();
					if(!files[fn]){
						S().ajax(fn,{
							'complete':loadData,
							'dataType':'text',
							'key':p,
							'this':this,
							'i':i,
							'me':this,
							'cache':false,
							'error':function(data,attr){
								_obj.log('ERROR','Unable to load',attr.url,data);
							}
						});
					}else loadData(this.panels[files[fn]].data,{'i':i,'me':this,'key':p});
				}
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
			e.data.me.setRange(e.currentTarget.value).update();
		});
	}
	
	this.setRange = function(v,updateHistory){
		if(typeof updateHistory!=="boolean") updateHistory = true;
		if(!v) v = "lifetime";
		this.range = v;
		// Update all panels to view
		for(var i = 0; i < this.panels.length; i++) this.panels[i].view = this.range;
		var _obj = this;
		if(this.pushstate && updateHistory) history.pushState({'impact':this.range,'anchor':this.anchor},"Dashboard","?impact="+this.range+(this.anchor ? "#"+this.anchor : ""));
		return this;
	}

	function pad(n, w) {
		z = '0';
		n = n + '';
		l = n.length;
		return l >= w ? n : new Array(w-l+1).join(z) + n;
	}

	function animateNumber(el,val,duration,units){
		_obj.log('animateNumber');
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
	function showArray(el,vals,duration,cls){
		if(duration > 0) animateArray(el,vals,duration)
		else {
			output = '<ol class="'+cls+'">';
			for(var i = 0; i < vals.length; i++) output += "<li>"+vals[i]+"</li>";
			output += "</ol>";
			el.html(output);
		}
	}
	function updateImages(){
		var more = S('.moreinfo');
		var img = more.find('img');
		function replaceImage(svg,attr){
			img = S('#'+attr.id);
			delete _obj.replace[attr.id];
			svg = svg.replace(/[\n\r]/g,'').replace(/^.*<svg /,"<svg ").replace(/<\/svg>.*$/,"<\/svg>").replace(/fill:#FFFFFF/gi,'fill:'+attr.color).replace(/stroke:#FFFFFF/gi,'stroke:'+attr.color);
			img.replaceWith(svg);
		}
		var id = 0;
		for(var i = 0; i < img.length; i++){
			while(_obj.replace[id]){ id++; }
			var im = S(img[i]);
			var src = im.attr('svg');
			if(src){
				im.attr('data',id).attr('id','replaceWithSVG-'+id).addClass('replaceWithSVG');
				_obj.replace[id] = true;
				S(document).ajax(src,{'dataType':'xml','id':'replaceWithSVG-'+id,'color':getComputedStyle(more[0])['color'],'cache':'true','complete': replaceImage, 'this':this, 'error': function(a){ this.log('ERROR','Failed to load file',a); } });
			}
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
		_obj.log('loadData',data,attr);
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
		if(attr.me.range) attr.me.panels[attr.i].view = attr.me.range;
		attr.me.updatePanel(attr.i);
		files[attr.url] = attr.i;
		
		if(attr.me.panels[attr.i].id == attr.me.anchor) this.navigate({},attr.me.anchor);
		return;
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
		this.log('update');
		for(var i = 0; i < this.panels.length; i++){
			if(this.panels[i] && this.panels[i].data) this.updatePanel(i);
		}
	}
	// Update a specific panel
	this.updatePanel = function(p){
		this.log('updatePanel',p);
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
			
			var view = null;
			if(this.panels[p].view){
				if(this.panels[p].view == "default") view = this.panels[p].config['default'];
				else view = parseInt(this.panels[p].view);
			}

			for(var e in this.panels[p].config.els){
				var n = this.panels[p].el.find(e);
				var el = this.panels[p].config.els[e];

				// If the element doesn't exist in the DOM we skip this
				if(n.length == 0) continue;
				if(this.panels[p].head['last-modified']) this.panels[p].head['Last-Modified'] = this.panels[p].head['last-modified'];

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
				function getColourFromTitle(t){
					var n = 0;
					var c;
					t = t.toLowerCase();
					c = t.charCodeAt(0) - 97;
					if(c > 0) n += c;
					c = t.charCodeAt(t.length - 1) - 97;
					if(c > 0) n += c;
					n = 1 + Math.floor(13*n/(26 * 2));
					return "c"+n+"-bg";
				}

				if(row){
					if(row == "all"){
						
						if(el.type=="images"){
							var list = new Array();
							var colurl = parseInt(el.url);
							var mn = data.length - (this.panels[p].config.max || data.length);
							if(mn < 0) mn = 0;
							for(var r = data.length-1; r >= mn; r--){
								var s = data[r][coldate-1];
								var e = (new Date()).toISOString();
								if(colend && data[r][colend-1]) e = data[r][colend-1];
								// If the row is within the date range we add the image
								if(this.inDateRange(s,e,view)) list.push((colurl ? '<a href="'+data[r][colurl-1]+'">':'')+(data[r][img-1] ? '<img '+(data[r][img-1].indexOf(".svg") > 0 ? 'svg':'src')+'="data/'+data[r][img-1]+'" alt="'+data[r][col-1]+'" title="'+data[r][col-1]+'" />' : data[r][col-1])+(colurl ? '</a>':''));
							}
							this.panels[p].updateable.push({'el':e,'n':n,'list':list,'duration':(el.animate ? this.duration : 0)});
						}else if(el.type=="list"){
							var list = new Array();
							var colurl = parseInt(el.url);
							var mn = data.length - (this.panels[p].config.max || data.length);
							if(mn < 0) mn = 0;
							for(var r = data.length-1; r >= mn; r--){
								var s = data[r][coldate-1];
								var e = (new Date()).toISOString();
								if(colend && data[r][colend-1]) e = data[r][colend-1];
								// If the row is within the date range we add the list item
								var colour = getColourFromTitle(data[r][col-1]);
								if(colour == this.panels[p].config['class']) colour += " bordered";
								if(this.inDateRange(s,e,view)) list.push((colurl ? '<a href="'+data[r][colurl-1]+'" class="box">':'<div class="box">')+'<div class="panel '+colour+'">'+data[r][col-1]+'</div>'+(colurl ? '</a>':'</div>'));
							}
							this.panels[p].updateable.push({'el':e,'n':n,'list':list,'cls':'grid','duration':(el.animate ? this.duration : 0)});
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
								if(this.inDateRange(s,s,view)){
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
								if(this.inDateRange(data[r][coldate-1],data[r][coldate-1],view)) row = r+1;
							}
						}
					}else row = parseInt(row);
					
					val = (row < data.length) ? data[row-1][col-1] : 0;

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
							if(this.inDateRange(s,e,view)){
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
				e.data.me.log('Set hash')
				location.hash = e.data.me.panels[e.data.i].id;
			});
		}
		return this;
	}
	this.inDateRange = function(start,end,year){
		var s = parseInt(start.substr(0,4));
		var e = (end ? parseInt(end.substr(0,4)) : s);
		if(!year) return true;
		if(s <= year && e >= year) return true;
		else return false; 
	}
	this.resize = function(){
		var i = S('.moreinfo');
		if(i.length ==1){
			var height = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
			//S('.moreinfo').css({'left':'0px','top':'0px','width':document.body.offsetWidth+'px','height':height+'px'});
		}
		return this;
	}
	this.navigate = function(e,a){
		this.log('navigate');
		if(!a) a = location.href.split("#")[1];
		var i = this.panellookup[a];

		// Remove any existing moreinfo box
		S('.moreinfo').remove();

		if(typeof i==="number"){
			for(var j = 0; j < this.panels[i].updateable.length; j++) showArray(this.panels[i].updateable[j].n,this.panels[i].updateable[j].list,this.panels[i].updateable[j].duration,this.panels[i].updateable[j].cls);

			this.panels[i].el = S('#'+this.panels[i].id);
			var o = offset(this.panels[i].el.e[0]);

			// Add the moreinfo box
			S('.main').after('<div class="moreinfo '+this.panels[i].config['class']+'"></div>');
			S('.main').css({'display': 'none'});
			S('.moreinfo').html((this.interactive ? '<div class="close">&times;</div>':'')+this.panels[i].el.html());//.css({'width':o.width+'px','height':o.height+'px','left':o.left+'px','top':o.top+'px'}).css({'left':'0px','top':'0px','width':document.body.offsetWidth+'px','height':("innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight)+'px'});
			// Add click event to close button
			if(this.interactive) S('.moreinfo .close').on('click',{me:this},function(e){ location.hash = 'top' });
			if(S('.moreinfo').find('img').length > 0) updateImages();
		}else{
			S('.main').css({'display': ''});
		}
		return this;
	}

	// Do we update the address bar?
	this.pushstate = !!(window.history && history.pushState);
	this.href = location.href.split("#")[0];
	this.anchor = location.href.split("#")[1];
	this.range = this.query.impact;
	
	var _obj = this;
	
	window[(this.pushstate) ? 'onpopstate' : 'onhashchange'] = function(e){
		if(e.state && e.state.impact){
			S('#range')[0].value = e.state.impact;
			_obj.setRange(e.state.impact,false).update();
		}
	};

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
