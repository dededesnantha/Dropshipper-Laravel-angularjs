<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=320, initial-scale=1" />
  <title>Email Pembayaran</title>
  <style type="text/css">
    #outlook a{padding:0}.ReadMsgBody{width:100%}.ExternalClass{width:100%}.ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td{line-height:100%}a,blockquote,body,li,p,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0;mso-table-rspace:0}img{-ms-interpolation-mode:bicubic}.body-wrap,.body-wrap-cell,body,html{margin:0;padding:0;background:#fff;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#464646;text-align:left}img{border:0;line-height:100%;outline:0;text-decoration:none}table{border-collapse:collapse!important}td,th{text-align:left;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#464646;line-height:1.5em}.footer a,b a{text-decoration:none;color:#464646}a.blue-link{color:#00f;text-decoration:underline}td.center{text-align:center}.left{text-align:left}.body-padding{padding:24px 40px 40px}.border-bottom{border-bottom:1px solid #d8d8d8}table.full-width-gmail-android{width:100%!important}.header{font-weight:700;font-size:16px;line-height:16px;height:16px;padding-top:19px;padding-bottom:7px}.header a{color:#464646;text-decoration:none}.footer a{font-size:12px}
  </style>

  <style type="text/css" media="only screen and (max-width: 650px)">
    @media only screen and (max-width:650px){*{font-size:16px!important}table[class*=w320]{width:320px!important}div[class=mobile-center],td[class=mobile-center]{text-align:center!important}td[class*=body-padding]{padding:20px!important}td[class=mobile]{text-align:right;vertical-align:top}}
  </style>

</head>
<body style="padding:0; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
 <td valign="top" align="left" width="100%" style="background:repeat-x url(https://www.filepicker.io/api/file/al80sTOMSEi5bKdmCgp2) #f9f8f8;">
 <center>

   <table class="w320 full-width-gmail-android" bgcolor="#f9f8f8" background="https://www.filepicker.io/api/file/al80sTOMSEi5bKdmCgp2" style="background-color:transparent" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td width="100%" height="48" valign="top">
            <table class="full-width-gmail-android" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td class="header center" width="100%">
                    <a href="#">
                      BALIYA.ID
                    </a>
                  </td>
                </tr>
              </table>
        </td>
      </tr>
    </table>

    <table cellspacing="0" cellpadding="0" width="100%" bgcolor="#ffffff">
      <tr>
        <td align="center">
          <center>
            <table class="w320" cellspacing="0" cellpadding="0" width="500">
              <tr>
                <td class="body-padding mobile-padding">

                <table cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="text-align:center; font-size:30px; padding-bottom:20px;">
                      <img src="https://www.baliya.id/asset/image/logo.png" style="max-width: 150px">
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:20px;">
                      Halo <strong>{{ $details['data_transaksi']->nama }}</strong>, <br>
                      <br>
                      <b style="font-size: 20px" style="font-weight: 800">
                        Menunggu pembayaran dengan Transfer Bank sebelum tanggal, <span style="color: red">{{ $details['data_transaksi']->tgl_expired }}</span>
                      </b>
                    </td>
                  </tr>
                </table>
                
                <p>Segera lakukan pembayaran pesananmu dengan detail sebagai berikut :</p>
                
                <div style="background-color: #f3f3f3;border-radius: 5px">
                  <div style="padding: 12px">
                    <table cellspacing="0" cellpadding="0" width="100%">
                      <tr style="padding-bottom:20px;">
                        <td class="left" style="text-align:left;">
                          Total Bayar
                        </td>
                        <td>
                          :
                        </td>
                        <td>
                          <strong style="color: red;font-weight: 600">Rp. {{number_format($details['data_transaksi']->total_transkasi,0,',','.')}}</strong>
                        </td>
                      </tr>
                      <tr style="padding-bottom:20px;">
                        <td class="left" style="text-align:left;">
                          Metode Pembayaran
                        </td>
                        <td>
                          :
                        </td>
                        <td>
                          <strong>{{$details['data_transaksi']->metode_transaksi}}</strong>
                        </td>
                      </tr>
                      <tr style="padding-bottom:20px;">
                        <td class="left" style="text-align:left;">
                          Kode Pembayaran
                        </td>
                        <td>
                          :
                        </td>
                        <td>
                          {{$details['data_transaksi']->code_transaksi}}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <table cellspacing="0" cellpadding="0" width="100%">
                  <tr>
                    <td class="mobile-center" align="left" style="padding:40px 0;">
                      <div class="mobile-center" style="font-size: 14px;border-radius: .4rem;color: #fffff8;background-color: #00b894;box-shadow: none;font-weight: 700;border-color: #00b894;padding: 12px;text-align: center;">
                        <a href="{{ url('order').'/'.$details['data_transaksi']->id_transaksi }}" style="color: #fff;text-decoration: none">Konfirmasi Pembayaran</a></div>
                    </td>
                  </tr>
                </table>

                <p>Pembayaran dapat dilakukan dengan transfer bank ke rekening berikut:</p>
                
                <table cellspacing="0" cellpadding="0" width="100%" style="margin-bottom: 20px">
                  <tr style="padding-bottom:20px;">
                    <td>
                      <img src="{{url('css/img')}}/bri.jpg" alt="Bank BRI">
                    </td>
                    <td>
                      <span>Bank BRI</span>
                      <br>
                      <b>No Rek: 3567-01-016357-53-7</b>
                      <br>
                      <span>(An :Ni Made Ayu Ery Sulastri)</span>
                    </td>
                  </tr>
                  <tr style="padding-bottom:20px;">
                    <td>
                      <img src="{{url('css/img')}}/bca.jpg" alt="Bank BCA">
                    </td>
                    <td>
                      <span>Bank BCA</span>
                      <br>
                      <b>No Rek: 772-524-4851</b>
                      <br>
                      <span>(An :Ni Made Ayu Ery Sulastri)</span>
                    </td>
                  </tr>
                  <tr style="padding-bottom:20px;">
                    <td>
                      <img src="{{url('css/img')}}/mdniri.png" alt="Bank MANDIRI">
                    </td>
                    <td>
                      <span>Bank MANDIRI</span>
                      <br>
                      <b>No Rek: 145-00-1283818-7</b>
                      <br>
                      <span>(An :Ni Made Ayu Ery Sulastri)</span>
                    </td>
                  </tr>
                </table>

                <p>
                  <b style="font-size: 20px" style="font-weight: 800">
                    Ringkasan Pembayaran
                  </b>
                </p>

                <table cellspacing="0" cellpadding="0" width="100%" style="margin-bottom: 20px">
                  <tr>
                    <td>
                      Total Harga ({{$details['data_transaksi']->total_kuantitas}} barang)
                    </td>
                    <td>
                      <b>Rp. {{number_format($details['data_transaksi']->total_produk,0,',','.')}}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Total Ongkos Kirim
                    </td>
                    <td>
                      <b>Rp. {{number_format($details['data_transaksi']->harga,0,',','.')}}</b>
                    </td>
                  </tr>
                  <tr>
                    <td class="border-bottom" height="5"></td>
                    <td class="border-bottom" height="5"></td>
                  </tr>
                  <tr>
                    <td>
                      <b>Total Bayar</b>
                    </td>
                    <td>
                      <b style="color: red;font-weight: 600">Rp. {{number_format($details['data_transaksi']->total_transkasi,0,',','.')}}</b>
                    </td>
                  </tr>
                </table>

                <p>
                  <b style="font-size: 18px" style="font-weight: 800">
                    Rincian Pesanan
                  </b>
                </p>

                <table cellspacing="0" cellpadding="0" width="100%" style="margin-bottom: 20px">
                  @foreach($details['data_transaksi_detail'] as $key)
                    <tr>
                      <td>
                        <img src="{{url('image').'/'.$key->gambar }}" alt="{{$key->nama_produk}}">
                      </td>
                      <td>
                        <span>{{$key->nama_produk}}</span>
                        <br>
                        @if(!empty($key->text))
                        <span>{{$key->text}}</span>
                        @endif
                        @if(!empty($key->size))
                        <span>{{$key->size}}</span>
                        @endif
                        <br>
                        @if($key->harga_promo == null)
                        <strong>{{$key->kuantitas}} x Rp. {{number_format($key->harga,0,',','.')}}</strong>
                        @else
                        <strong>{{$key->kuantitas}} x Rp. {{number_format($key->harga_promo,0,',','.')}}</strong>
                        @endif
                      </td>
                      <td>
                        <strong>Rp. {{number_format($key->totals_produks,0,',','.')}}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td class="border-bottom" height="5"></td>
                      <td class="border-bottom" height="5"></td>
                      <td class="border-bottom" height="5"></td>
                    </tr>
                  @endforeach
                </table>
                <br>
                  <b style="font-size: 13px" style="font-weight: 800">
                    Alamat Pengiriman
                  </b>
                <table cellspacing="0" cellpadding="0" width="100%">
                  <tr>
                    <td class="mobile-center" align="left" style="padding:40px 0;">
                      {{ $details['data_transaksi']->nama }}
                      <br>
                      {{ $details['data_transaksi']->address }}, {{$details['data_transaksi']->provinsi}}, {{$details['data_transaksi']->kabupaten}}, {{$details['data_transaksi']->kecamatan}}
                      <br>
                      {{$details['data_transaksi']->telephone}}
                    </td>
                  </tr>
                </table>
                <table cellspacing="0" cellpadding="0" width="100%">
                  <tr>
                    <td class="left" style="text-align:left;">
                      Terimakasi, 
                    </td>
                  </tr>
                  <tr>
                    <td class="left" width="129" height="20" style="padding-top:10px; text-align:left;">
                      <img src="https://www.baliya.id/asset/image/logo.png" style="max-width: 150px">
                    </td>
                  </tr>
                </table>

                </td>
              </tr>
            </table>
          </center>
        </td>
      </tr>
    </table>

    <table class="w320" bgcolor="#E5E5E5" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td style="border-top:1px solid #B3B3B3;" align="center">
          <center>
            <table class="w320" cellspacing="0" cellpadding="0" width="500" bgcolor="#E5E5E5">
              <tr>
                <td>
                  <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#E5E5E5">
                    <tr>
                      <td class="center" style="padding:25px; text-align:center;">
                        <b>Butuh Bantuan ?</b>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </center>
        </td>
      </tr>
      <tr>
        <td style="border-top:1px solid #B3B3B3; border-bottom:1px solid #B3B3B3;" align="center">
          <center>
            <table class="w320" cellspacing="0" cellpadding="0" width="500" bgcolor="#E5E5E5">
              <tr>
                <td align="center" style="padding:25px; text-align:center">
                  <table cellspacing="0" cellpadding="0" width="100%" bgcolor="#E5E5E5">
                    <tr>
                      <td class="center footer" style="font-size:12px;">
                        <a href="https://api.whatsapp.com/send?phone={{$details['profile_web']->no_tlp_convert}}">WhatsApp</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <span class="footer-group">
                          <a href="mailto:{{$details['profile_web']->email}}">Email</a>
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </center>
        </td>
      </tr>
    </table>

  </center>
  </td>
</tr>
</table>
</body>
</html>