(function($) {
    window.FWP = window.FWP || {};
    window.FWP.flyout = {
        open: function() {
            FWP.flyout.swap_facets('open');
        },
        close: function() {
            FWP.flyout.swap_facets('close');
        },
        get_eligible_facets: function() {
            return $('.facetwp-facet[data-type!="map"]');
        },
        init: function() {
            var content = '';
            FWP.flyout.get_eligible_facets().each(function() {
                var $this = $(this);
                var facet_name = $this.attr('data-name');

                // Get the wrapper element and empty its contents
                var outerHtml = $($this[0].outerHTML).html('');

                // Remove the facet classes
                outerHtml.attr('class', 'facetwp-ignore');

                // Then grab the HTML string
                content += '<h3>' + FWP.settings.labels[facet_name] + '</h3>';
                content += outerHtml[0].outerHTML;

                // Support for custom facet HTML
                content = FWP.hooks.applyFilters('facetwp/flyout/facet_html', content, {
                    facet_name: facet_name,
                    facet_label: FWP.settings.labels[facet_name],
                    facet_html: outerHtml[0].outerHTML
                });
            });

            var flyout = `
            <div class="facetwp-flyout">
                <div class="facetwp-flyout-wrap">
                    <div class="facetwp-flyout-close">x</div>
                    <div class="facetwp-flyout-content">{content}</div>
                </div>
            </div>
            `;

            // Support for custom flyout HTML
            flyout = FWP.hooks.applyFilters('facetwp/flyout/flyout_html', flyout);
            flyout = flyout.replace('{content}', content);

            $('.facetwp-flyout').remove();
            $('body').append(flyout);
        },
        swap_facets: function(action) {
            var action = ('undefined' !== typeof action) ? action : 'open';
            var is_open = $('.facetwp-flyout.active').length > 0;

            if ((is_open && 'open' == action) || (!is_open && 'close' == action)) {
                return;
            }

            // Loop through each facet
            FWP.flyout.get_eligible_facets().each(function() {
                var $this = $(this);
                var facet_name = $this.attr('data-name');
                var css_classes = $this.attr('class');

                // Copy HTML from the "facetwp-facet" to "facetwp-ignore" element
                var $ignored = $('.facetwp-ignore[data-name="' + facet_name + '"]');
                $ignored.html($this.html());

                // Swap CSS classes and empty the newly-ignored facet
                $ignored.attr('class', css_classes);
                $this.attr('class', 'facetwp-ignore').html('');
            });

            // Add the open or close CSS class
            $('.facetwp-flyout').toggleClass('active');

            // Custom action
            FWP.hooks.doAction('facetwp/flyout/' + action);
        }
    };

    $(function() {
        FWP.flyout.init();
    });

    $(document).on('click', '.facetwp-flyout-close', function() {
        FWP.flyout.close();
    });
})(jQuery);
