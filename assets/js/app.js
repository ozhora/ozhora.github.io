       function cek_umur($tgl) {
            console.log($tgl)
            var today = new Date();
            var birthday = new Date($tgl);
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
            return age
       }
