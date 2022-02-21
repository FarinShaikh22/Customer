import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Customer';

  displayedColumns: string[] = ['FirstName', 'LastName', 'Email', 'Password','MobileNo','Address','City','State','Pincode','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog:MatDialog , private api:ApiService){


  }
  ngOnInit(): void {
    this.getAllCustomer();
  }

  openDialog() {
    this.dialog.open(AddCustomerComponent, {
     width :'40%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllCustomer();
      }
    })
  }

 
  getAllCustomer(){
    this.api.getCustomer().subscribe({
      next:(res)=>{ this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(err)=>{
        alert("Error while fetching the Records !!")
      }
    })
  }


  editCustomer(row:any){
  this.dialog.open(AddCustomerComponent,{
    width :"40%",
    data : row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      
    }
    this.getAllCustomer();
  })
  }

  deleteCustomer(id:number)
  {
  this.api.deleteCustomer(id).
  subscribe({
    next:(res)=>{
      alert("Record Deleted Successfully !!");
      this.getAllCustomer();
    },
    error:()=>{
      alert("Error while Deleting the record !!");
    }
  })

}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  
}
