<?php  
/**
 * ProRadio Child theme
 * custom functions.php file
 */

/**
 * Add parent and child stylesheets
 */
add_action( 'wp_enqueue_scripts', 'proradio_child_enqueue_styles' );
if(!function_exists('proradio_child_enqueue_styles')) {
function proradio_child_enqueue_styles() {
    wp_enqueue_style( 'proradio-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'proradio-child-style', get_stylesheet_uri() );
}}

/**
 * Upon activation flush the rewrite rules to avoid 404 on custom post types
 */
add_action( 'after_switch_theme', 'proradio_child_rewrite_flush_child' );
if(!function_exists('proradio_child_rewrite_flush_child')) {
function proradio_child_rewrite_flush_child() {
    flush_rewrite_rules();
}}	


/**
 * Radio Africana Mobile App
 * Banner API Endpoint
 */
add_action('rest_api_init', function () {

    register_rest_route('radioafricana/v1', '/banners', [
        'methods' => 'GET',
        'callback' => 'radio_africana_get_banners',
        'permission_callback' => '__return_true',
    ]);

});

function radio_africana_get_banners() {

    $page_id = 6024;

    $elementor_data = json_decode(
        get_post_meta($page_id, '_elementor_data', true),
        true
    );

    if (!$elementor_data) {
        return [];
    }

    $banners = [];

    radio_africana_find_slideshow($elementor_data, $banners);

    return $banners;
}

/**
 * Recursively search Elementor for the slideshow widget.
 */
function radio_africana_find_slideshow($elements, &$banners) {

    foreach ($elements as $element) {

        if (
            isset($element['widgetType']) &&
            $element['widgetType'] === 'proradio-elementor-custom-slideshow'
        ) {

            if (!empty($element['settings']['items'])) {

                $id = 1;

                foreach ($element['settings']['items'] as $item) {

                    $link = $item['pr_link'] ?? '';

                    $banners[] = [

                        'id' => $id++,

                        'image' => $item['pr_image']['url'] ?? '',

                        'alt' => $item['pr_image']['alt'] ?? '',

                        'title' => $item['pr_title'] ?? '',

                        'subtitle' => $item['pr_subtitle'] ?? '',

                        'button' => $item['pr_button'] ?? '',

                        'link' => $link,

                        'hasLink' => !empty($link),

                    ];

                }

            }

            return;
        }

        if (!empty($element['elements'])) {
            radio_africana_find_slideshow(
                $element['elements'],
                $banners
            );
        }
    }
}