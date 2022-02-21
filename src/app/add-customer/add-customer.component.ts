import { Component, Inject, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

 
  AddCustomerForm!: FormGroup;
  actionBtn : string= "Save";
  submitted : Boolean=false;

  constructor( private formBuilder: FormBuilder ,
     private api : ApiService, 
     @Inject(MAT_DIALOG_DATA) public editData :any,
     private dialogRef : MatDialogRef<AddCustomerComponent>) { 



     }

  onSubmit(){
    
  }

  ngOnInit(): void {

      this.AddCustomerForm = this.formBuilder.group({
      FirstName : ['',Validators.required],
      LastName : ['',Validators.required],
      Email : ['',[Validators.required ,Validators.email]],
      Password : ['',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]],
      MobileNo : ['',[Validators.required,Validators.minLength(10),Validators.maxLength(12)]],
      Address : ['',Validators.required],
      City : ['',Validators.required],
      State : ['',Validators.required],
      Pincode : ['',Validators.required],


    })
  
    
     if(this.editData){
       this.actionBtn="Update";
       this.AddCustomerForm.controls['FirstName'].setValue(this.editData.FirstName);
       this.AddCustomerForm.controls['LastName'].setValue(this.editData.LastName);
       this.AddCustomerForm.controls['Email'].setValue(this.editData.Email);
       this.AddCustomerForm.controls['Password'].setValue(this.editData.Password);
       this.AddCustomerForm.controls['MobileNo'].setValue(this.editData.MobileNo);
       this.AddCustomerForm.controls['Address'].setValue(this.editData.Address);
       this.AddCustomerForm.controls['City'].setValue(this.editData.City);
       this.AddCustomerForm.controls['State'].setValue(this.editData.State);
       this.AddCustomerForm.controls['Pincode'].setValue(this.editData.Pincode);
     }

  }

  




  Add(){

    if(!this.editData){
      if(this.AddCustomerForm.valid){
        this.api.postCustomer(this.AddCustomerForm.value)
        .subscribe({
          next:(res)=>{
            alert("Customer added Successfully")
            this.AddCustomerForm.reset();
            this.dialogRef.close('save');
  
          },
          error:()=>{
            alert("Error while adding Customer")
          }
  
        })
      }
      
    }else{
        this.updateCustomer()
      }
   
    
    
  }


  updateCustomer(){
    this.api.putCustomer(this.AddCustomerForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Customer Updated successfully");
        this.AddCustomerForm.reset();
        this.dialogRef.close('update');

      },
      error:()=>{
        alert("Error while updating Customer")
      }
    })

  }
  
  

  email = new FormControl('', [Validators.required, Validators.email]);
  pass = new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]);
  mobile = new FormControl('',[Validators.required,Validators.minLength(10)]);
  getpassErrorMessage(){
    if (this.pass.hasError('required')) {
      return '';
    }
    else{
      this.pass.hasError('At Least 6')
    }
    
      this.pass.hasError('At Least 15')
    

    return this.pass.hasError('pass') ? 'Not a valid pass' : '';

  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a Email Id';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getmobilErrorMessage(){
    if (this.mobile.hasError('required')) {
      return 'You must enter a Mobile Number';
    }
   

    return this.mobile.hasError('mobile') ? 'Not a valid mobile' : '';
  }


  

  hide = true;
  

}
