# Example WP Settings Page

This is an example of a WordPress settings page. It uses the [WordPress Settings API](https://codex.wordpress.org/Settings_API) and [WordPress Components](https://developer.wordpress.org/block-editor/components/) to create a settings page with a tabbed interface.

<img width="1776" alt="Xnapper-2023-11-18-14 48 34" src="https://github.com/bacoords/example-wp-settings/assets/6867360/583f688e-1a14-4fa3-8b31-f8b0cf9b7dfd">

## Development

This plugin was scaffolded with [@wordpress/create-block](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/). If you'd like to develop from this repository, first install all of the dependencies:

`npm install`

Then run the build process in a watch mode:

`npm start`

## Running Locally

To use the included local environment, make sure Docker is running and then run the following command:

`npm run env start`

and visit [http://localhost:8888/wp-admin](http://localhost:8888/wp-admin).

You should be able to log in with Username: `admin` and Password: `password`.

[Learn more about wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/).
