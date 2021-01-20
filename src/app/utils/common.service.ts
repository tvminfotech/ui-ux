import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  successMessage(msg)
  {
    swal.fire({
      type: 'success',
      title: msg,
      showConfirmButton: true,
      customClass:'swal-popupmsg'
    }); 
  }
  getUserName()
  {
    if (localStorage.getItem('tempCurrentUser') != undefined && localStorage.getItem('tempCurrentUser') !=null)
    {
    var userName=JSON.parse(localStorage.getItem('tempCurrentUser')).firstName;
    }
    return userName;
  }
  failureMessage(msg)
  {
    swal.fire({
      type: 'error',
      title: msg,
      showConfirmButton: true,
      customClass:'swal-popupmsg'
    }); 
  }
  sliceEXTFromName(name) {
    /*
    const split = name.split('.');
    if(split.length){
      const lenOfLastArr = split[(split.length) - 1].length;
      const endLength = (name.length) - (lenOfLastArr + 1);
      const newName = name.slice(0, endLength);
      return newName;
    }
    */
    return name;
  }
  getRole()
  {
   var email = JSON.parse(localStorage.getItem("tempCurrentUser")).email;
   var jsonData=[
     {"email":"developer1@bct.com","role":"developer"},
     {"email":"developer2@bct.com","role":"developer"},
     {"email":"reviewer1@bct.com","role":"reviewer"},
     {"email":"reviewer2@bct.com","role":"reviewer"},
     {"email":"rajiv.r@bahwancybertek.com","role":"idea-owner"}
   ]
   var role='idea-owner';
   jsonData.forEach(element => {
     
    if (element.email == email)
    {
      role =element.role;
    }
   });
   return role;
  }
}
