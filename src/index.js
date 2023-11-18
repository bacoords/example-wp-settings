import { createRoot } from '@wordpress/element';
import SettingsPage from './components/SettingsPage';

import './style.scss';

let root = createRoot( document.getElementById( 'root' ) );
root.render( <SettingsPage /> );
