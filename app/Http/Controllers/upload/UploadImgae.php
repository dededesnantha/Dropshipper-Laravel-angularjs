<?php

namespace App\Http\Controllers\upload;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UploadImgae extends Controller
{
    public function index($value='')
    {
    	if ( !empty( $_FILES ) ) {

		    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
		    $ext = explode('.', $_FILES["file"]["name"]);
    		var_dump ($ext);
    		die();
					$x = 1;
					while ( $x > 0) {
						$image = round(microtime(true)) . '.' . end($ext);
						$file_pointer = 'public/image/'.$image;
						if (file_exists($file_pointer)){
							$x = 1;
						}else{
							$image = $image;
							$x--;
						}
					}
		    // $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'image' . DIRECTORY_SEPARATOR . $image;

		    // move_uploaded_file( $tempPath, $uploadPath );

		    // $image = array( 'image' => $image );
		    // $json = json_encode( $image );
		    // $image = array(
		    // 	"name" => $image
		    // 	);
		    $data = array(
		    	'image' => $image
		    );
		     return $data; 
		} else {

		    echo 'No files';

		}
    }
}
