<?php
/**
 * Plugin Name:       Example WP Settings
 * Description:       Example Settings Page.
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            Brian Coords
 * Author URI:        https://www.briancoords.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       example-wp-settings
 *
 * @package           example-wp-settings
 */

define( 'EXAMPLE_WP_SETTINGS_VERSION', '0.1.0' );
define( 'EXAMPLE_WP_SETTINGS_PATH', plugin_dir_path( __FILE__ ) );
define( 'EXAMPLE_WP_SETTINGS_URL', plugin_dir_url( __FILE__ ) );

require_once EXAMPLE_WP_SETTINGS_PATH . '/inc/class-example-wp-settings.php';

Example_WP_Settings::register();
