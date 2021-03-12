<?php

if ( !empty( $_FILES ) ) {

	
	$file_name = $_FILES['file']['name'];
    $file_size = $_FILES['file']['size'];
    $file_tmp = $_FILES['file']['tmp_name'];
    $file_type = $_FILES['file']['type'];
    $tmp = explode('.', $_FILES['file']['name']);
	$file_ext = end($tmp);
    $expensions= array("jpeg","jpg","png");

    if(in_array($file_ext,$expensions)=== false){
         $errors = array('error' => "ekstensi tidak diizinkan, pilih file JPEG atau PNG.");
    	$json = json_encode( $errors );
        echo $json;
    }

    if(empty($errors)==true) {
    	
	    $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'gallery' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
	    move_uploaded_file( $file_tmp, $uploadPath );
	    $succes = array('succes' => "Gambar berhasil diupload");
    	$json = json_encode( $succes );
        echo $json;
    }

    // $answer = array( 'answer' => 'File transfer completed' );
    // $json = json_encode( $answer );

    // echo $json;

} else {

    echo 'No files';

}

?>