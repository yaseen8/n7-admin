import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-model',
  templateUrl: './user-model.component.html',
  styleUrls: ['./user-model.component.scss']
})
export class UserModelComponent implements OnInit {

  hireList = ['direct','transfer'];
  maxDate : string;
  companyList : any = [];
  spinner : boolean = false;

  fg = new FormGroup({
    name : new FormControl('', [
      Validators.required
    ]),
    surname : new FormControl('',[
      Validators.required
    ]),
    email : new FormControl('',[
      Validators.required,
      Validators.email
    ],
    [this.emailExist.bind(this)]),
    mobile : new FormControl('',[
      Validators.required
    ]),
    dob : new FormControl('',[
      Validators.required
    ]),
    address : new FormControl('',[
      Validators.required
    ]),
    nok_name : new FormControl('',[
      Validators.required
    ]),
    nok_contact : new FormControl('',[
      Validators.required
    ]),
    company : new FormControl('',[
      Validators.required
    ]),
    hire : new FormControl('',[
      Validators.required
    ]),
    bank_name : new FormControl('',[
      Validators.required
    ]),
    bsb_number : new FormControl('',[
      Validators.required
    ]),
    account_number : new FormControl('',[
      Validators.required
    ]),
    mode : new FormControl('',[
      Validators.required
    ]),
    rate : new FormControl('',[
      Validators.required
    ]),
    site_allocated : new FormControl('',[
      Validators.required
    ]),
    additional_rate : new FormControl('',[
    ]),
    additional_site_name : new FormControl('',[
    ]),
    fund_name : new FormControl('',[
      Validators.required
    ]),
    account_name : new FormControl('',[
      Validators.required
    ]),
    membership_number : new FormControl('',[
      Validators.required
    ]),
    security_licence : new FormControl('',[
      Validators.required
    ]),
    expiry : new FormControl('',[
      Validators.required
    ]),
    certificate : new FormControl('',[
      Validators.required
    ]),
    driver_licence : new FormControl('',[
      Validators.required
    ]),
    state : new FormControl('',[
      Validators.required
    ]),
    driver_expiry : new FormControl('',[
      Validators.required
    ]),
    note : new FormControl('',[
      Validators.required
    ]),
    tax_free : new FormControl('',[
    ]),
    australian_residence : new FormControl('',[
    ]),
    education_debt : new FormControl('',[
    ]),
    financial_debt : new FormControl('',[
    ]),
    additional_information : new FormControl('',[
    ]),

  })

  constructor(public dialogRef : MatDialogRef<UserModelComponent>,
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
    this.fg.get('dob').setValue(this.getDate(this.fg.value.dob));
    this.fg.get('expiry').setValue(this.getDate(this.fg.value.expiry));
    this.fg.get('driver_expiry').setValue(this.getDate(this.fg.value.driver_expiry));
    if(this.fg.value.tax_free == 1) {
      tax_detail = {
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
        'fk_company_id' : this.fg.value.company
      },
      'payment_mode' : {
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
        'fund_name' : this.fg.value.fund_name,
        'account_name' : this.fg.value.account_name,
        'membership_number' : this.fg.value.membership_number
      },
      'security_license' : {
        'license_number' : this.fg.value.security_licence,
        'expiry' : this.fg.value.expiry,
        'certificate' : this.fg.value.certificate
      },
      'driving_license' : {
        'license_number' : this.fg.value.driver_licence,
        'expiry' : this.fg.value.driver_expiry,
        'state' : this.fg.value.state,
        'note' : this.fg.value.note
      }
    }
    this.userService.addUser(data).subscribe(
      (resp) => {
        this.spinner = false;
        this.snackbar.open("User added successfully", "", {
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
