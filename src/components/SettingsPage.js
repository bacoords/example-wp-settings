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
import apiFetch from '@wordpress/api-fetch';
import Panel from './Panel';

function SettingsPage() {
	// This should basically match the scheme we set up when registering the setting.
	const defaultSettings = {
		example_wp_settings_option: {
			first_name: '',
			last_name: '',
		},
	};

	// We'll save the settings in state.
	const [ settings, setSettings ] = useState( defaultSettings );

	// We'll use this to show a success message when the settings are saved.
	const [ success, setSuccess ] = useState( false );

	// We'll use this to keep track of which tab is active.
	const [ activeTab, setActiveTab ] = useState( 'panel' );

	// This is the function that will run when the form is submitted.
	const handleSubmit = ( event ) => {
		event.preventDefault();
		apiFetch( {
			path: '/wp/v2/settings?_fields=example_wp_settings_option',
			method: 'POST',
			data: settings,
		} ).then( ( response ) => {
			// We'll update the settings in state with the response.
			console.log( response );
			setSettings( response );
			setSuccess( true );
		} );
	};

	// This will run when the component is mounted.
	useEffect( () => {
		apiFetch( {
			path: '/wp/v2/settings?_fields=example_wp_settings_option',
		} ).then( ( response ) => {
			// We'll update the settings in state with the response.
			console.log( response );
			setSettings( response );
		} );
	}, [] );

	return (
		<form className="example-wp-settings" onSubmit={ handleSubmit }>
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
								content: (
									<Panel
										settings={ settings }
										setSettings={ setSettings }
									/>
								),
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
