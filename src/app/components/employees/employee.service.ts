import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators'
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: Employee [] = []
   

  constructor(private http: HttpClient) {
      this.initialEmployees();
  }

  private initialEmployees(){
    this.employees = [ {id: 1, name: 'Juan', surname: 'Gómez Pérez', birthDate: new Date(1990, 1, 3), workPosition: 'full-stack developer'},
    {id: 2, name: 'Jesús', surname: 'López Delgado', birthDate: new Date(1993, 3, 8), workPosition: 'full-stack developer'}
    ]
  }
  
  getEmployees(){
    return this.employees;
  }
  
  getEmployee(id: number){
    return this.employees.find(employee => employee.id == id);
  }

  addEmployee(employee: Employee): boolean{

    let repeat = this.isRepeatEmployee(employee);
    if(!repeat)
    {
      let lastId = this.getMaxIdEmployeeId();
      employee.id = lastId + 1;
      this.employees.push(employee);
    }
    
    return repeat;
  }

  isRepeatEmployee(employee: Employee): boolean{
    let repeat = false;
    
    let employeeRepeat = this.employees.find(empl => empl.name == employee.name && 
                                             empl.surname == employee.surname && 
                                             empl.birthDate?.getTime() == employee.birthDate?.getTime());

    if(employeeRepeat)
      repeat = true;

    return repeat;
  }

  getMaxIdEmployeeId(){
    return Math.max.apply(Math, this.employees.map(function(o) { return o.id; }))
  }

  getWorkPosition(){
    
    let headers = new HttpHeaders({

    });
    return this.http.get('https://ibillboard.com/api/positions', {headers}, )
      .pipe( map ( (data: any) => {
        return data['positions'];
      }));

  }
}
