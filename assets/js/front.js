(function($) {
    window.FWP = window.FWP || {};
    window.FWP.flyout = {
        open: function() {
            FWP.flyout.swap_facets('open');
        },
        close: function() {
            FWP.flyout.swap_facets('close');
        },
        get_ordered_facets: function() {
            var facets = [];

            $('.facetwp-facet[data-type!="map"]').each(function() {
                facets.push($(this).attr('data-name'));
            });

            return FWP.hooks.applyFilters('facetwp/flyout/facets', facets);
        },
        init: function() {
            var content = '';
            var facet_html = `
            <div class="facetwp-flyout-facet">
                <h3>{label}</h3>
                <div class="flyout-facet-{name}"></div>
            </div>
            `;

            $.each(FWP.flyout.get_ordered_facets(), function(index, facet_name) {

                // Support for custom HTML
                var temp = FWP.hooks.applyFilters('facetwp/flyout/facet_html', facet_html, {
                    facet_name: facet_name
                });
                temp = temp.replace('{label}', FWP.settings.labels[facet_name]);
                temp = temp.replace('{name}', facet_name);
                content += temp;
            });

            var flyout = `
            <div class="facetwp-flyout">
                <div class="facetwp-flyout-close">x</div>
                <div class="facetwp-flyout-wrap">
                    <div class="facetwp-flyout-content">{content}</div>
                </div>
            </div>
            <div class="facetwp-flyout-fog"></div>
            `;

            // Support for custom flyout HTML
            flyout = FWP.hooks.applyFilters('facetwp/flyout/flyout_html', flyout);
            flyout = flyout.replace('{content}', content);

            $('.facetwp-flyout').remove();
            $('.facetwp-flyout-fog').remove();
            $('body').append(flyout);
        },
        swap_facets: function(action) {
            var action = ('undefined' !== typeof action) ? action : 'open';
            var is_open = $('.facetwp-flyout.active').length > 0;

            if ((is_open && 'open' == action) || (!is_open && 'close' == action)) {
                return;
            }

            // Loop through each facet
            $.each(FWP.flyout.get_ordered_facets(), function(index, facet_name) {
                var $this = $('.facetwp-facet-' + facet_name);

                if ('open' == action) {
                    $this.wrap('<div class="placeholder-' + facet_name + '"></div>');
                    $this.detach().appendTo('.flyout-facet-' + facet_name);
                }
                else {
                    $this.detach().appendTo('.placeholder-' + facet_name);
                    $this.unwrap();
                }
            });

            // Add the open or close CSS class
            $('.facetwp-flyout').toggleClass('active');
            $('.facetwp-flyout-fog').toggleClass('active');

            // Custom action
            FWP.hooks.doAction('facetwp/flyout/' + action);
        }
    };

    $(function() {
        FWP.flyout.init();
    });

    $(document).on('click', '.facetwp-flyout-open', function() {
        FWP.flyout.open();
    });

    $(document).on('click', '.facetwp-flyout-close, .facetwp-flyout-fog', function() {
        FWP.flyout.close();
    });
})(jQuery);
