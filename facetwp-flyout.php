<?php
/*
Plugin Name: FacetWP - Flyout menu
Description: Displays a flyout facet menu
Version: 0.2
Author: FacetWP, LLC
Author URI: https://facetwp.com/
GitHub URI: facetwp/facetwp-flyout
*/

defined( 'ABSPATH' ) or exit;

class FacetWP_Flyout_Addon
{

    function __construct() {
        add_filter( 'facetwp_assets', array( $this, 'assets' ) );
    }


    function assets( $assets ) {
        $assets['facetwp-flyout.js'] = plugins_url( '', __FILE__ ) . '/assets/js/front.js';
        $assets['facetwp-flyout.css'] = plugins_url( '', __FILE__ ) . '/assets/css/front.css';
        return $assets;
    }
}


new FacetWP_Flyout_Addon();
