import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import {
	Card,
	CardBody,
	CardDivider,
	Flex,
	FlexItem,
	Button,
	Snackbar,
	TabPanel,
} from '@wordpress/components';

import { useDispatch, useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

import Panel from './Panel';

function SettingsPage() {
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
	const { saveEntityRecord } = useDispatch( coreStore );

	// State to show a success message when the settings are saved.
	const [ success, setSuccess ] = useState( false );

	// State to keep track of which tab is active.
	const [ activeTab, setActiveTab ] = useState( 'panel' );

	// If the settings haven't been loaded yet, we'll return null.
	// This needs to happen after all the hooks are called.
	if ( ! hasResolved ) {
		return null;
	}
	// In the block editor, saving to the database happens automatically when you publish or update a post.
	// In the our settings page, you would need to add a separate button to save the settings.
	const saveOptions = ( event ) => {
		event.preventDefault();
		saveEntityRecord( 'root', 'site', {
			wpdev_account_settings: settings.wpdev_account_settings,
		} ).then( ( response ) => {
			setSuccess( true );
			console.log( response );
		} );
	};

	return (
		<form className="example-wp-settings" onSubmit={ saveOptions }>
			<Card>
				<CardBody>
					<h1>{ __( 'Example WP Settings Settings' ) }</h1>
					<TabPanel
						className="example-wp-settings-tab-panel"
						onSelect={ ( tabName ) => {
							setActiveTab( tabName );
						} }
						initialTabName={ activeTab }
						tabs={ [
							{
								name: 'panel',
								title: 'Example Panel',
								content: <Panel />,
							},
						] }
					>
						{ ( tab ) => <>{ tab.content }</> }
					</TabPanel>
				</CardBody>
				<CardDivider />
				<CardBody>
					<Flex>
						<FlexItem>
							<Button variant="primary" type="submit">
								Save Changes
							</Button>
						</FlexItem>
						<FlexItem>
							{ success && (
								<Snackbar
									status={ 'success' }
									onDismiss={ function noRefCheck() {
										setSuccess( false );
									} }
									onRemove={ function noRefCheck() {} }
								>
									Saved
								</Snackbar>
							) }
						</FlexItem>
					</Flex>
				</CardBody>
			</Card>
		</form>
	);
}

export default SettingsPage;
