# ODI Leeds dashboard

A simple dashboard created for ODI Leeds. The dashboard has no external dependencies and reads data from CSV files located on the same server. It uses HTML, CSS and Javascript.

## Setting up

The styling can be found in the `css/style.css` file. 

The Javascript requires a JSON object to be defined that describes what each panel will contain. The key used for each panel should match the `id` used for the equivalent HTML element e.g. the key for `<li id="events" class="boxholder"></li>` is `events`; Each panel can be configured using the following keys/values:

* `data` should be a relative link to the CSV file;
* `start` is the column number (indexed from 1) of the column containing the `start` date of an entry;
* `end` is the column number for the end date (if there isn't an end date, set this to the same as `start`);
* `class` will be used on the more-information-box for that panel that appears when a panel is clicked and is useful if you want to set the colours/style to match the panel;
* `els` are the DOM elements to write to.

We've referenced the data and defined the date columns, so now we need to output the values somewhere. Each panel is provided with a set of DOM elements (`els`) that will be updated. The key used for each of these is the relative CSS selector to get to that DOM element e.g. if our panel contains a `<div class="number"></div>` we would use `".number"` to reference it. Each of these DOM elements is provided with its own configuration options:

* `col` is the number for the main value they are concerned;
* `row` (`"all"` or `"last"`) will either process all rows or just use the value from the final row (useful for showing the date of the most recent data);
* `op` (`"sum"` or `"count"`) is the operation to perform and can either sum the values from each of the rows or count the number of rows of data;
* `animate` (`true` or `false`) lets you turn off the animation of the number increasing;
* `type` (`"graph"` or `"list"`), if set, will either display a simple bar-chart binned monthly or yearly depending on the date resolution in the CSV file or create a list of items.

If a `list` is created, there are some additional options:
  * `img` is the column number for an image file which will be included in the page using `<img src="value" />`;
  * `url` is the column number for a URL which will be used to wrap the `<img>` in a link.

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
