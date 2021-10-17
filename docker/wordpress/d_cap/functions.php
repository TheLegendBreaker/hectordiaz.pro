<?php
function initCors( $value ) {
  $origin = get_http_origin();
  $allowed_origins = [ 'https://portfolio.hectordiaz.pro', 'https://blog.hectordiaz.pro', 'http://saint-vid.org' ];

  if ( $origin && in_array( $origin, $allowed_origins ) ) {
    header( 'Access-Control-Allow-Origin: ' . esc_url_raw( $origin ) );
    header( 'Access-Control-Allow-Methods: GET' );
    header( 'Access-Control-Allow-Credentials: true' );
  }

  return $value;
}

add_action( 'rest_api_init', function() {

	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );

	add_filter( 'rest_pre_serve_request', initCors);
}, 15 );

function dcap_register_rest_category_names() {
	regester_rest_field(array('post'),'categoryNames',
	 	array(
		'get_callback' => 'dcap_get_rest_category_names',
		'update_callback' => null,
		'schema' => null,
	));
}

function dcap_get_rest_category_names($object, $field_name, $request) {
	if( $object['categories'] ) {
		$categories = get_the_category($object['id']);
		$names = array();
		$name='';
		foreach($categories as $category) {
			$name = $category->name;
			array_push($names, $name);
		};
		return $names;
	}
}

//add_action( 'rest_api_init', 'dcap_register_rest_category_names' );
