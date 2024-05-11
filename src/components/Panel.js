import { __ } from '@wordpress/i18n';
import { Flex, FlexItem, TextControl } from '@wordpress/components';

function Panel( { settings, updateOptions } ) {
	return (
		<Flex
			direction="column"
			gap="4"
			className="example-wp-settings-field-group"
		>
			<FlexItem>
				<TextControl
					label={ __( 'First Name' ) }
					value={ settings.example_wp_settings_option?.first_name }
					type={ 'text' }
					onChange={ ( value ) => {
						updateOptions( 'first_name', value );
					} }
				/>
			</FlexItem>
			<FlexItem>
				<TextControl
					label={ __( 'Last Name' ) }
					value={ settings.example_wp_settings_option?.last_name }
					type={ 'text' }
					onChange={ ( value ) => {
						updateOptions( 'last_name', value );
					} }
				/>
			</FlexItem>
		</Flex>
	);
}

export default Panel;
