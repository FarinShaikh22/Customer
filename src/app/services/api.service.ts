import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }


postCustomer(data : any){
  return this.http.post<any>("http://localhost:3000/CustomerList/",data);

}
getCustomer(){
  return this.http.get<any>("http://localhost:3000/CustomerList/");
}


putCustomer(data : any, id : number){
  return this.http.put<any>("http://localhost:3000/CustomerList/"+id,data);

}


deleteCustomer(id : number){
  return this.http.delete<any>("http://localhost:3000/CustomerList/"+id);

}

}
