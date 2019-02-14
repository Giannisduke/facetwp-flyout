# FacetWP - Flyout add-on
This plugin generates a flyout sidebar which can help with mobile support.

### Usage
1. Install the plugin
2. Add a new button to trigger the flyout, or trigger it programmatically (see below)

```html
<button onclick="FWP.flyout.open()">Filter</button>
```

### JS functions

```js
FWP.flyout.open(); // open the flyout
FWP.flyout.close(); // close it
```

### JS hooks

```js
// Modify the facet wrapper HTML
FWP.hooks.addFilter('facetwp/flyout/facet_html', function(content) {
    return content;
});

// Modify the flyout wrapper HTML
FWP.hooks.addFilter('facetwp/flyout/flyout_html', function(flyout) {
    return flyout;
});

// Flyout opened
FWP.hooks.addAction('facetwp/flyout/open', function() {
    // do something
});

// Flyout closed
FWP.hooks.addAction('facetwp/flyout/close', function() {
    // do something
});
```
