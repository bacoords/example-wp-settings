import { __ } from '@wordpress/i18n';
import { Flex, FlexItem, TextControl } from '@wordpress/components';

import { useDispatch, useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

function Panel() {
	// Get the settings from the store.
	const { record: settings, hasResolved } = useSelect( ( select ) => {
		return {
			record: select( coreStore ).getEditedEntityRecord( 'root', 'site' ),
			hasResolved: select( coreStore ).hasFinishedResolution(
				'getEditedEntityRecord',
				[ 'root', 'site' ]
			),
		};
	} );

	// We'll use these functions to save the settings to the store.
	const { editEntityRecord } = useDispatch( coreStore );

	if ( ! hasResolved ) {
		return null;
	}

	// This will save settings the settings to the local state only.
	const updateOptions = ( key, value ) => {
		editEntityRecord( 'root', 'site', undefined, {
			wpdev_account_settings: {
				...settings.wpdev_account_settings,
				[ key ]: value,
			},
		} );
	};

	return (
		<Flex
			direction="column"
			gap="4"
			className="example-wp-settings-field-group"
		>
			<FlexItem>
				<TextControl
					label={ __( 'Acount Number' ) }
					value={ settings.wpdev_account_settings?.account_number }
					type={ 'text' }
					onChange={ ( value ) => {
						updateOptions( 'account_number', value );
					} }
				/>
			</FlexItem>
			<FlexItem>
				<TextControl
					label={ __( 'Account Key' ) }
					value={ settings.wpdev_account_settings?.account_key }
					type={ 'password' }
					onChange={ ( value ) => {
						updateOptions( 'account_key', value );
					} }
				/>
			</FlexItem>
		</Flex>
	);
}

export default Panel;
