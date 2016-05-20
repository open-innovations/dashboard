# Dashboard

A simple dashboard created for ODI Leeds. The dashboard has no dependencies and reads data from CSV files located on the same server. It uses HTML, CSS and Javascript.

## Setting up

The styling can be found in the `css/style.css` file. 

The Javascript requires a JSON object to be defined that describes what each panel will contain. The key for a panel in this object should match the `id` used for the equivalent HTML element. Each panel can be configured using:
	* `data` should be a relative link to the CSV file.
	* `start` is the column number (indexed from 1) of the column containing the `start` date of an entry
	* `end` is the column number for the end date. If there isn't an end date, set this to the same as `start`. 
	* `class` will be used on the more-information-box for that panel that appears when a panel is clicked. This is useful if you want to set the colours/style to match the panel.
	* `els` are the DOM elements to write to

We will now have data loaded for each panel but we need to output the values somewhere. Each panel is provided with a set of DOM elements (`els`) that will be updated. The key used for each of these is the relative CSS selector to get to that DOM element e.g. if our panel contains a `<div class="number"></div>` we would use `".number"` to reference it. Each of these DOM elements is provided with its own configuration options:
	* `col` is the number for the main value they are concerned.
	* `row` ("all" or "last") Using "all" will mean we process each row to calculate some statistic. Using "last" will let us use the value of the final row (useful for showing the date of the most recent data).
	* `op` ("sum" or "count") This is the operation to perform. We can either `sum` the values from each of the rows, or `count` the number of rows of data.
	* `animate` (`true` or `false`) lets you turn off the animation of the number increasing
	* `type` ("graph" or "list") If a type is set we'll do more than just display a number. `graph` will display a simple bar-chart which will be either binned monthly or yearly depending on the date resolution in the CSV file. `list` will create a list of rows. If a list is created there are some additional options:
		* `img` is the column number for an image file. This will be included in the page using `<img src="value" />`.
		* `url` is the column number that contains a URL. This will wrap the `<img>` in a link.

### Example

```javascript
<script type="text/javascript" src="js/dashboard.min.js"></script>
<script>
var panels = {
	"events": {
		"start": 1,
		"end": 1,
		"data": "data/events_monthly.csv",
		"els": {
			".number": { "col": 2, "op": "sum", "animate": true },
			".graph": { "col": 2, "row": "all", "type": "graph" },
			".lastupdated": { "col": 1, "row": "last" }
		},
		'class':'c12-bg'
	},
	"reach": {
		"start": 1,
		"end": 1,
		"data": "data/events_monthly.csv",
		"els": {
			".number": { "col": 3, "op": "sum", "animate": true },
			".graph": { "col": 3, "row": "all", "type": "graph" },
			".lastupdated": { "col": 1, "row": "last" }
		},
		'class':'c5-bg'
	},
	"sponsors": {
		"start": 2,
		"end": 3,
		"data": "data/sponsors.csv",
		"els": {
			".number": { "col": 1, "op": "count", "animate": true },
			".icons": { "col": 4, "img": 5, "url": 6, "row": "all", "type": "list" },
			".lastupdated": { "col": 2, "row": "last" }
		},
		'class':'c8-bg'
	},
	"revenue": {
		"start": 1,
		"end": 1,
		"data": "data/revenue.csv",
		"units": "&pound;",
		"els": {
			".number": { "col": 2, "op": "sum", "animate": true },
			".graph": { "col": 2, "row": "all", "type": "graph" },
			".lastupdated": { "col": 1, "row": "last" }
		},
		'class':'c1-bg'
	},
	"network": {
		"start": 1,
		"end": 2,
		"data": "data/network.csv",
		"els": {
			".number": { "col": 1, "op": "count", "animate": true },
			".icons": { "col": 3, "img": 4, "url": 5, "row": "all", "type": "list" },
			".lastupdated": { "col": 1, "row": "last" }
		},
		'class':'c11-bg'
	},
	"projects": {
		"start": 1,
		"end": 2,
		"data": "data/projects.csv",
		"els": {
			".number": { "col": 1, "op": "count", "animate": true },
			".list": { "col": 3, "url": 5, "row": "all", "type": "list" },
			".lastupdated": { "col": 1, "row": "last" }
		},
		'class':'c14-bg'
	},
	"partners": {
		"start": 1,
		"end": 2,
		"data": "data/partners.csv",
		"els": {
			".number": { "col": 4, "op": "count", "animate": true },
			".icons": { "col": 3, "img": 4, "url": 5, "row": "all", "type": "list" },
			".lastupdated": { "col": 1, "row": "last" }
		},
		'class':'c13-bg'
	},
	"tweets": {
		"start": 1,
		"end": 1,
		"data": "data/socialmedia.csv",
		"els": {
			".number": { "col": 3, "op": "sum", "animate": true },
			".graph": { "col": 3, "row": "all", "type": "graph" },
			".lastupdated": { "col": 1, "row": "last" }
		},
		'class':'c3-bg'
	}
}
S().ready(function(){
	var db = new Dashboard();
	db.setup({'year':'#range','config':panels});
});
</script>
```
