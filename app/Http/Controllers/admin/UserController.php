<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use DB;
use Mail;
use App\Models\tb_user;
use App\Models\profile_web;

class UserController extends Controller
{
    public function profile_web()
    {
        $data = profile_web::select('id','nama','no_tlp','email','logo','address','deskripsi')->first();
        if(substr(trim($data->no_tlp), 0, 1)=='0'){
             $data->no_tlp_convert = '62'.substr(trim($data->no_tlp), 1);
         }
        return $data;
    }  

    public function add_user(Request $request)
    {
    	$post = $request->input();
    	$cek = tb_user::where('username', $post)->count();
    	if ($cek == 0) {
    		$details = [
		        'nama' => $post['nama'],
		        'email' => $post['email'],
		        'username' => $post['username'],
		        'password' => $post['password']
		    ];
		    \Mail::to($post['email'])->send(new \App\Mail\MailSendLogin($details));
    		$post['password'] = bcrypt($post['password']);
    		return tb_user::create($post);
    	}else{
    		return new JsonResponse($errors, 422);   
    	}

    }

    public function get_user(Request $request)
    {
        $post = $request->input();
        if ($post['search'] == NULL) {
            $data = DB::table('tb_user')
                            ->select('id_user','nama','username','email')
                            ->orderBy('id_user',$post['order'])
                            ->paginate($post['much']); 
        }else{
            $data = DB::table('tb_user')
                            ->select('id_user','nama','username','email')
                            ->orderBy('id_user',$post['order'])
                            ->where('nama','like','%'.$post['search'].'%')
                            ->paginate($post['much']);
        }
        return $data;
    }

    public function rubah_user($id)
    {
        return tb_user::select('nama','email','username')->where('id_user',$id)->first();
    }

    public function update_user(Request $request, $id)
    {
        $post = $request->input();
        if (empty($post['password'])) {
            $details = [
                'nama' => $post['nama'],
                'email' => $post['email'],
                'username' => $post['username']
            ];
        }else{
            $details = [
                'nama' => $post['nama'],
                'email' => $post['email'],
                'username' => $post['username'],
                'password' => $post['password'],
                'profile_web' => $this->profile_web(),
            ];
            $post['password'] = bcrypt($post['password']);
        }
        \Mail::to($post['email'])->send(new \App\Mail\MailSendRubah($details));
        return tb_user::where('id_user', $id)->update($post);
    }

    public function delete_user($id)
    {
        return tb_user::where('id_user', $id)->delete();
    }
    
}
