<?php
/**
 * Aurelia Concept theme setup.
 *
 * @package Aurelia_Concept
 */

add_action( 'after_setup_theme', static function () {
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'editor-styles' );
	add_editor_style( 'style.css' );
} );

add_action( 'wp_enqueue_scripts', static function () {
	$theme = wp_get_theme();
	wp_enqueue_style( 'aurelia-concept', get_stylesheet_uri(), array(), $theme->get( 'Version' ) );
} );

add_action( 'init', static function () {
	register_block_pattern_category(
		'aurelia-concept',
		array( 'label' => __( 'Aurelia Concept', 'aurelia-concept' ) )
	);
} );
