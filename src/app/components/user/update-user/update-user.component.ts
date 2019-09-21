import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  hireList = ['direct','transfer'];
  maxDate : string;
  companyList : any = [];
  spinner : boolean = false;

  fg = new FormGroup({
    name : new FormControl(this.data.name, [
      Validators.required
    ]),
    surname : new FormControl(this.data.surname,[
      Validators.required
    ]),
    email : new FormControl({value : this.data.email, disabled : true},[
      Validators.required,
      Validators.email
    ]),
    mobile : new FormControl(this.data.mobile,[
      Validators.required
    ]),
    dob : new FormControl(this.data.dob,[
      Validators.required
    ]),
    address : new FormControl(this.data.address,[
      Validators.required
    ]),
    nok_name : new FormControl(this.data.nok_name,[
      Validators.required
    ]),
    nok_contact : new FormControl(this.data.nok_contact,[
      Validators.required
    ]),
    company : new FormControl(this.data.user_company.fk_company_id,[
      Validators.required
    ]),
    hire : new FormControl(this.data.user_company.hire,[
      Validators.required
    ]),
    bank_name : new FormControl(this.data.payment_mode.bank_name,[
      Validators.required
    ]),
    bsb_number : new FormControl(this.data.payment_mode.bsb_number,[
      Validators.required
    ]),
    account_number : new FormControl(this.data.payment_mode.account_number,[
      Validators.required
    ]),
    mode : new FormControl(this.data.payment_mode.mode,[
      Validators.required
    ]),
    rate : new FormControl(this.data.payment_mode.rate,[
      Validators.required
    ]),
    site_allocated : new FormControl(this.data.payment_mode.site_allocated,[
      Validators.required
    ]),
    additional_rate : new FormControl(this.data.payment_mode.additional_rate,[
    ]),
    additional_site_name : new FormControl(this.data.payment_mode.additional_site_name,[
    ]),
    fund_name : new FormControl(this.data.superannuation.fund_name,[
      Validators.required
    ]),
    account_name : new FormControl(this.data.superannuation.account_name,[
      Validators.required
    ]),
    membership_number : new FormControl(this.data.superannuation.membership_number,[
      Validators.required
    ]),
    security_licence : new FormControl(this.data.security_licence.license_number,[
      Validators.required
    ]),
    expiry : new FormControl(this.data.security_licence.expiry,[
      Validators.required
    ]),
    certificate : new FormControl(this.data.security_licence.certificate,[
      Validators.required
    ]),
    driver_licence : new FormControl(this.data.drivig_licence.license_number,[
      Validators.required
    ]),
    state : new FormControl(this.data.drivig_licence.state,[
      Validators.required
    ]),
    driver_expiry : new FormControl(this.data.drivig_licence.expiry,[
      Validators.required
    ]),
    note : new FormControl(this.data.drivig_licence.note,[
      Validators.required
    ]),
    tax_free : new FormControl(this.data.tax_detail.tax_free,[
    ]),
    australian_residence : new FormControl(this.data.tax_detail.australian_residence,[
    ]),
    education_debt : new FormControl(this.data.tax_detail.education_debt,[
    ]),
    financial_debt : new FormControl(this.data.tax_detail.financial_debt,[
    ]),
    additional_information : new FormControl(this.data.tax_detail.additional_information,[
    ]),

  })

  constructor(public dialogRef : MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService : UserService,
    private snackbar : MatSnackBar) { 
    let tDate = new Date();
    this.maxDate = tDate.toISOString();
    

}

ngOnInit() {
  this.getCompanyList();
}

getCompanyList() {
  this.userService.getCompanyList().subscribe(
  (resp) => {
    this.companyList = resp;
    // if(this.data.user_company) {
    //   console.log(this.companyList);
    //   this.companyList.filter(obj => {
    //     console.log(obj);
    //     console.log(this.data.user_company.fk_company_id);
    //     if(obj.id == this.data.user_company.fk_company_id) {
    //       console.log('match');
    //       this.fg.get('company').setValue(obj);
    //     }
    //   })
    // }
    console.log(this.fg.value.company);
  }
  )
}

emailExist(control: FormControl) {
  const q = new Promise((resolve, reject) => {
    this.userService.checkUserEmail({ email: control.value }).subscribe(
      (resp :  any)  => {
        console.log(resp);
        if(resp.length) {
          resolve({ emailExist: { value: control.value } });
          // resolve(null);
        }
        else {
          resolve(null);
        }
      },
      error => {
        resolve({ emailExist: { value: control.value } });
      }
    );
  });
  return q;
}

save() {
  let tax_detail = {};
  if(this.fg.value.tax_free == 1) {
    if(this.fg.value.australian_residence != 1) {
      this.snackbar.open("Australian residence field is required.", "", {
        duration: 3000
      });
      return false;
    }
    if(this.fg.value.education_debt != 1) {
      this.snackbar.open("Education debt field is required.", "", {
        duration: 3000
      });
      return false;
    }
    if(this.fg.value.financial_debt != 1) {
      this.snackbar.open("Financial debt field is required", "", {
        duration: 3000
      });
      return false;
    }
  }
  this.spinner = true;
  if(this.fg.value.tax_free == 1) {
    tax_detail = {
      'id' : this.data.tax_detail.id,
      'tax_free' : this.fg.value.tax_free,
      'australian_residence' : this.fg.value.australian_residence,
      'education_debt' : this.fg.value.education_debt,
      'financial_debt' : this.fg.value.financial_debt,
      'additional_information' : this.fg.value.additional_information
    }
  }
  else {
    tax_detail = {}
  }
  let data = {
    'user' : {
      'name' : this.fg.value.name,
      'surname' : this.fg.value.surname,
      'email' : this.fg.value.email,
      'dob' : this.fg.value.dob,
      'mobile' : this.fg.value.mobile,
      'address' : this.fg.value.address,
      'nok_name' : this.fg.value.nok_name,
      'nok_contact' : this.fg.value.nok_contact,
      'user_type' : 'user'
    },
    'company' : {
      'hire' : this.fg.value.hire,
      'fk_company_id' : this.fg.value.company,
      'id' : this.data.user_company.id
    },
    'payment_mode' : {
      'id' : this.data.payment_mode.id,
      'bank_name' : this.fg.value.bank_name,
      'bsb_number' : this.fg.value.bsb_number,
      'account_number' : this.fg.value.account_number,
      'mode' : this.fg.value.mode,
      'rate' : this.fg.value.rate,
      'site_allocated' : this.fg.value.site_allocated,
      'additional_rate' : this.fg.value.additional_rate,
      'additional_site_name' : this.fg.value.additional_site_name
    },
    'tax_detail' : tax_detail,
    'superannuation' : {
      'id' : this.data.superannuation.id,
      'fund_name' : this.fg.value.fund_name,
      'account_name' : this.fg.value.account_name,
      'membership_number' : this.fg.value.membership_number
    },
    'security_license' : {
      'id' : this.data.security_licence.id,
      'license_number' : this.fg.value.security_licence,
      'expiry' : this.fg.value.expiry,
      'certificate' : this.fg.value.certificate
    },
    'driving_license' : {
      'id' : this.data.drivig_licence.id,
      'license_number' : this.fg.value.driver_licence,
      'expiry' : this.fg.value.driver_expiry,
      'state' : this.fg.value.state,
      'note' : this.fg.value.note
    }
  }
  this.userService.updateUser(data, this.data.id).subscribe(
    (resp) => {
      this.spinner = false;
      this.snackbar.open("User updated successfully", "", {
        duration: 3000
      });
      this.dialogRef.close(resp);
    },
    (error) => {
      this.spinner = false;
      this.snackbar.open("Something went wrong", "", {
        duration: 3000
      });
      this.fg.get('dob').setValue('');
      this.fg.get('expiry').setValue('');
      this.fg.get('driver_expiry').setValue('');
    }
  )
}

dobChange() {
   this.fg.get('dob').setValue(this.getDate(this.fg.value.dob));
}

drivingExpiryChange() {
  this.fg.get('driver_expiry').setValue(this.getDate(this.fg.value.driver_expiry));
}

securityExpiryChange() {
  this.fg.get('expiry').setValue(this.getDate(this.fg.value.expiry));
}

getDate(date) {
  let dd = date['_i']['date'];
  let mm = date['_i']['month'] + 1;
  let yyyy = date['_i']['year'];
  if(dd <= 9) {
    dd = '0' + dd;
  }
  if(mm <= 9) {
    mm = '0' + mm;
  }
  return (yyyy + '-' + mm + '-' + dd);
}

hasError(control: string, errorName: string) {
  return this.fg.get(control).hasError(errorName);
}


}
