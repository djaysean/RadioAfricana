<?php
/**
 * Radio Africana Mobile App
 * Banner API Endpoint
 *
 * ------------------------------------------------------------------
 * PURPOSE
 * ------------------------------------------------------------------
 * Exposes the homepage Elementor Custom Slideshow through a custom
 * WordPress REST API endpoint for the Radio Africana mobile app.
 *
 * Endpoint:
 * /wp-json/radioafricana/v1/banners
 *
 * This file is maintained as the canonical source for the Banner API.
 * The production copy currently resides inside:
 *
 * wp-content/themes/proradio-child/functions.php
 *
 * ------------------------------------------------------------------
 * Introduced:
 * Release 0.5
 * ------------------------------------------------------------------
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