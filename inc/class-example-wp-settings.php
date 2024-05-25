<?php
/**
 * Our Settings Class
 *
 * Registers a new settings page in the WordPress admin.
 *
 * @package example-wp-settings
 * @since 0.1.0
 */

/**
 * Our settings class.
 */
class Example_WP_Settings {


	/**
	 * Registers our settings page with WordPress.
	 *
	 * @since 0.1.0
	 */
	public static function register() {

		// Add our admin page to the admin menu and enqueue the styles and scripts.
		add_action( 'admin_menu', array( get_class(), 'add_admin_menu' ) );
		add_action( 'admin_enqueue_scripts', array( get_class(), 'enqueue_admin_page_scripts' ) );

		// Register our custom settings and expose it to the REST API.
		add_action( 'admin_init', array( get_class(), 'register_custom_settings' ) );
		add_action( 'rest_api_init', array( get_class(), 'register_custom_settings' ) );
	}

	/**
	 * Adds our settings page to the admin menu.
	 *
	 * @since 0.1.0
	 */
	public static function add_admin_menu() {

		// Adds our options page to the 'Settings' menu.
		add_options_page(
			'Example WP Settings',
			'Example WP Settings',
			'manage_options',
			'example-wp-settings',
			array( get_class(), 'create_admin_page' )
		);
	}

	/**
	 * Creates our settings page.
	 *
	 * @since 0.1.0
	 */
	public static function create_admin_page() {
		// Because our settings page is a React app, we don't need to output anything here.
		// We just need to output a div with an ID that our React app can render into.
		?>
		<div class="wrap">
			<div id="root"></div>
		</div>
		<?php
	}



	/**
	 * Enqueue the admin page scripts
	 *
	 * @return void
	 */
	public static function enqueue_admin_page_scripts() {

		// Check the current screen to make sure we're on our settings page.
		$screen = get_current_screen();
		if ( 'settings_page_example-wp-settings' !== $screen->id ) {
			return;
		}

		// Enqueue the styles for the core components library.
		wp_enqueue_style( 'global' );
		wp_enqueue_style( 'wp-edit-post' );

		// Our build processs generates a `index.asset.php` file for each entry point.
		$asset_file = include EXAMPLE_WP_SETTINGS_PATH . '/build/index.asset.php';

		// Enqueue the admin page script and its dependencies.
		wp_enqueue_script( 'example-wp-settings-admin-page', EXAMPLE_WP_SETTINGS_URL . '/build/index.js', $asset_file['dependencies'], $asset_file['version'], true );

		// Enqueue the admin page styles.
		wp_enqueue_style( 'example-wp-settings-admin-page', EXAMPLE_WP_SETTINGS_URL . '/build/style-index.css', array(), $asset_file['version'] );
	}





	/**
	 * Register our custom settings handler.
	 *
	 * @return void
	 */
	public static function register_custom_settings() {

		// Register our custom setting.
		register_setting(
			'wpdev',
			'wpdev_account_settings',
			array(
				'type'              => 'object', // Our setting is an object that could contain multiple values.
				'description'       => 'Account Settings for our API.',
				'sanitize_callback' => array( get_class(), 'sanitize_callback' ),
				'default'           => array( // Default values for our setting.
					'account_number' => '',
					'account_key'    => '',
				),
				'show_in_rest'      => array(
					'schema' => array(
						'type'       => 'object',
						'properties' => array(
							'account_number' => array( // Schema for our 'account_number'.
								'type' => 'string',
							),
							'account_key'    => array( // Schema for our 'account_key'.
								'type' => 'string',
							),
						),
					),
				),
			)
		);
	}


	/**
	 * Sanitize our settings.
	 *
	 * @param array $settings The settings to sanitize.
	 * @return array
	 */
	public static function sanitize_callback( $settings ) {
		// Sanitize our 'account_number'.
		$settings['account_number'] = sanitize_text_field( $settings['account_number'] );
		// Sanitize our 'account_key'.
		$settings['account_key'] = sanitize_text_field( $settings['account_key'] );
		return $settings;
	}
}
