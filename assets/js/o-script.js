$(function() {
   console.log("o-script helper v.0.2")
})

$(document).on('click', '#btn-logout', function(e) {
   e.preventDefault();
   swal({
       title: 'Yakin akan keluar?',
       type: 'info',
       showCancelButton: true,
       confirmButtonColor: '#3366ff',
       cancelButtonColor: '#d33',
       cancelButtonText: 'Batal',
       confirmButtonText: 'Ya',
       closeOnConfirm: false,
   },
   function(isConfirm){
       if (isConfirm) {
           window.location.href = base_url('logout');
       }
   });
});

$.ajaxSetup({
   headers: {
       'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
   }
});

function base_url(data) {
   var pathparts = location.pathname.split('/');
   if (location.host == 'localhost') {
       var url = location.origin+'/'+pathparts[1].trim('/')+'/';
   } else {
       var url = location.origin;
   }

   if(data == '' || data == null){
       return url;
   } else {
       return url+'/'+data;
   }
}

function setVal(modal, id, value){
   if(modal == ''){
       $('#'+id).val(value)
   } else {
       $('#'+modal+' #'+id).val(value)
   }
}

function setHtmlVal(modal, id, value){
   if(modal == ''){
       $('#'+id).val(value)
   } else {
       $('#'+modal+' #'+id).html(value)
   }
}

function setSelect2(id){
   $('#'+id).select2({theme: 'bootstrap'})
}

function setValSelect2(modal, id, value){
   if(modal == ''){
       $('#'+id).val(value).trigger('change')
   } else {
       $('#'+modal+' #'+id).val(value).trigger('change')
   }
}

function kosong(){
   return '<span class="badge badge-danger">Kosong</span>'
}

function badge(color, text){
   return '<span class="badge badge-'+color+'">'+text+'</span>'
}

function badgeDanger(data){
   if(data == '' || data == null){
       return '<span class="badge badge-danger">Kosong</span>'
   } else {
       return '<span class="badge badge-danger">'+data+'</span>'
   }
}

function bold(text){
   return '<b>'+text+'</b>'
}

function hiddenModal(modal, id){
   $('#'+modal+' #'+id).val('')
   $('#'+modal+' #'+id).removeClass('is-invalid')
}

function confirmAlert(type, data, url, submit){
   let btnConfirmColor = ''
   if(type == 'warning'){
       btnConfirmColor = "#CD5C5C"
   } else if(type == 'info') {
       btnConfirmColor = '#3366ff'
   } else {
       btnConfirmColor = "#CD5C5C"
   }

   swal({
       title: data,
       type: type,
       showCancelButton: true,
       confirmButtonColor: btnConfirmColor,
       cancelButtonColor: "#d33",
       cancelButtonText: "Batal",
       confirmButtonText: submit,
       closeOnConfirm: false,
   },
   function(isConfirm) {
       if (isConfirm) {
           window.location.href = url;
       }
   });
}

function delConf(link){
   swal({
       title: "Yakin menghapus data?",
       text: "Data yang sudah terhapus tidak dapat dikembalikan!",
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: "#CD5C5C",
       cancelButtonColor: "#d33",
       cancelButtonText: "Batal",
       confirmButtonText: "Hapus",
       closeOnConfirm: false,
   },
   function(isConfirm) {
       if (isConfirm) {
           window.location.href = link;
       }
   });
}

function CekKonfirmasi(gagal, berhasil){
   if(gagal != ""){
       swal({
           position  : 'top-end',
           type      : 'error',
           title     : 'Gagal!',
           text      : gagal,
           showConfirmButton: false,
           timer: 1500
       });
   }
   if(berhasil != ""){
       swal({
           position  : 'top-end',
           type      : 'success',
           title     : 'Success!',
           text      : berhasil,
           showConfirmButton: false,
           timer: 1500
       });
   }
}

function notFoundFitur(){
   swal({
       position  : 'top-end',
       type      : 'error',
       title     : 'Maaf!',
       text      : 'Menu belum tersedia',
       showConfirmButton: false,
       timer: 1500
   });
}

function timeOut(){
   return 60000
}

function startloading(id){
   $(id).ploading({
       action: 'show'
   })
}

function stoploading(id){
   $(id).ploading({
       action: 'hide'
   })
}

function timePicker(id){
   $('#'+id).bootstrapMaterialDatePicker({
       format: 'HH:mm',
       clearButton: true,
       date: false
   });
}

function datePicker(id){
   $('#'+id).bootstrapMaterialDatePicker({
       format: 'DD-MM-YYYY',
       clearButton: true,
       time: false
   });
}

function hanyaAngka(evt) {
   var charCode = (evt.which) ? evt.which : event.keyCode
   if (charCode > 31 && (charCode < 48 || charCode > 57))
       return false;
   return true;
}

function formatRupiah(angka, prefix){
   var number_string = angka.replace(/[^,\d]/g, '').toString(),
   split    = number_string.split('.'),
   sisa     = split[0].length % 3,
   rupiah   = split[0].substr(0, sisa),
   ribuan   = split[0].substr(sisa).match(/\d{3}/gi);

   // tambahkan titik jika yang di input sudah menjadi angka ribuan
   if(ribuan){
     separator = sisa ? '.' : '';
     rupiah += separator + ribuan.join('.');
   }

   rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
   prefixkoin='Rp. '+rupiah;
   return prefix == undefined ? prefixkoin : (rupiah ? '' + rupiah : '');
}

function formatKoma(angka){
   var parts = angka.toString().split(".");
   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
   return 'Rp '+parts.join(",");
}

function formatNumber(num) {
   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

// Menghitung umur berdasarkan tgl lahir
function get_age(date) {
   // Format tanggal yang dibutuhkan yyyy-mm-dd ex: 2021-12-10
   var today      = new Date();
   var birthday   = new Date(date);
   var year = 0;
   if (today.getMonth() < birthday.getMonth()) {
      year = 1;
   } else if ((today.getMonth() == birthday.getMonth()) && today.getDate() < birthday.getDate()) {
      year = 1;
   }
   var age = today.getFullYear() - birthday.getFullYear() - year;

   if(age < 0){
      age = 0;
   }
   return age;
 }