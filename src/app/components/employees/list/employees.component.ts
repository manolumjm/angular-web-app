import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [MessageService, ConfirmationService],
  styles: [`
        :host ::ng-deep .p-cell-editing {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }
    `]
})
export class EmployeesComponent implements OnInit {

    employees: Employee[] = [];
    loading: boolean = true;
    clonedProducts: { [s: string]: Employee; } = {};
    workPositions: any[] = [];

    constructor( private messageService: MessageService,
                private employeeService: EmployeeService,
                private confirmationService: ConfirmationService) 
    {
        this.loadData();
    }

    ngOnInit() 
    {

    }

    loadData(){
      this.getWorkPosition();
      this.getEmployees();
    }

    clear(table: Table) {
        table.clear();
    }

    getEmployees(){
      this.employees = this.employeeService.getEmployees();
      this.loading = false;
    }

    onRowEditInit(employee: Employee) {
      var index = this.employees.indexOf(employee)
      this.clonedProducts[index] = {...employee};
    }

    onRowEditSave(employee: Employee, index: number) {
      if(this.isValidEmployee(employee))
      {
        delete this.clonedProducts[index];
        this.messageService.add({severity:'success', summary: 'Success', detail:`Employee ${employee.name} ${employee.surname} is updated`});
      }
      else{
        this.employees[index] = this.clonedProducts[index];
        delete this.clonedProducts[index];
      }
      
    }

    isValidEmployee(employee: Employee): boolean{ 
      return this.validateName(employee.name);
    }

    validateName(name: string): boolean{

      if(!name)
      {   this.messageService.add({severity:'error', summary: 'Invalid Name', detail:'Name is required'});
          return false;
      }
      if(name.length < 2)
      {
        this.messageService.add({severity:'error', summary: 'Invalid Name', detail:'Minimun of 2 characters'});
        return false;
      }
      if(name.length > 50)
      {
        this.messageService.add({severity:'error', summary: 'Invalid Name', detail:'Maximun of 50 characters'});
        return false;
      }

      return true;
    }
  
    onRowEditCancel(index: number) {
      this.employees[index] = this.clonedProducts[index];
      delete this.clonedProducts[index];
    }

    onRowDelete(employee: Employee){

      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          const index = this.employees.indexOf(employee)
          if (index !== -1) {
              this.employees.splice(index,1);
          }
          this.messageService.add({severity:'info', summary:'Confirmed', detail:'Record deleted'});
        },
        reject: (type: ConfirmEventType) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
            }
        }
    });
      
    }

    getWorkPosition(){
      this.employeeService.getWorkPosition()
          .subscribe( positions => {
            
            positions.forEach((value:any, index: any) => {
              this.workPositions.push({
                'name': value,
                'code': index
              })
            });
            this.loading = false;
        }, (error) =>{
          //console.log(error);
        });
    }

}

