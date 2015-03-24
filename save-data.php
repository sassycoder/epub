<?php
if( isset( $_POST['data'] ) ){
	parse_str( $_POST['data'], $data );
	$subject = 'New enquiry from epublish';
	$body = '';
	foreach( $data as $name => $value ){
		$body .= ucfirst( $name ) .": ". $value ."\r\n";
	}
	mysql_connect( '162.13.41.227', 'root', 'Cx&8cE!MsQyL?4dB1!dy@' ) or die( mysql_error() );
	mysql_select_db( 'EPUBLISH' ) or die( mysql_error() );
	mysql_query( "INSERT INTO `enquiries`(`Name`, `Job_title`, `Company`, `Email`, `Phone`, `Number_of_publications`, `Challenges`) VALUES ( '$data[name]','$data[jobTitle]','$data[company]','$data[email]','$data[phone]','$data[pub]','$data[challenges]')") or die( mysql_error() );
	mail( "sales@epublish.uk.net", $subject, $body );
	echo '1';
	exit;
}