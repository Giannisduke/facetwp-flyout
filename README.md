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
(function($) {

    // Change the order of the facets within the flyout
    FWP.hooks.addFilter('facetwp/flyout/facets', function(facets) {
        return ['facet2', 'facet3', 'facet4', 'facet1'];
    });

    // Modify the facet wrapper HTML
    FWP.hooks.addFilter('facetwp/flyout/facet_html', function(facet_html) {
        return facet_html;
    });

    // Modify the flyout wrapper HTML
    FWP.hooks.addFilter('facetwp/flyout/flyout_html', function(flyout_html) {
        return flyout_html;
    });

    // Flyout opened
    FWP.hooks.addAction('facetwp/flyout/open', function() {
        // do something
    });

    // Flyout closed
    FWP.hooks.addAction('facetwp/flyout/close', function() {
        // do something
    });

})(jQuery);
```

### HTML defaults

The flyout wrapper HTML (modify via the `facetwp/flyout/flyout_html` JS hook):

```html
<div class="facetwp-flyout">
    <div class="facetwp-flyout-wrap">
        <div class="facetwp-flyout-close">x</div>
        <div class="facetwp-flyout-content">{content}</div>
    </div>
</div>
```

The HTML for each facet (modify via the `facetwp/flyout/facet_html` JS hook):

```html
<div class="facetwp-flyout-facet">
    <h3>{label}</h3>
    <div class="flyout-facet-{name}"></div>
</div>
```
