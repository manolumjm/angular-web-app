import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class EmployeeNewComponent implements OnInit {

   form: FormGroup;
   workPositions: any[] = [];
   saving: boolean = false;
   
  constructor(private router: Router,
              private employeeService: EmployeeService,
              private formBuilder: FormBuilder,
              private location: Location,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) 
  {

    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      birthDate: new FormControl('', [Validators.required]),
      workPosition: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.getWorkPosition();
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
        },(error) => {
          //console.log(error);
        });
  }

  onSubmit(){

    // console.log(this.form.get('birthDate')?.value);
    // if(this.form.get('birthDate')?.value instanceof Date)
    //   console.log('jeje');

    this.confirmationService.confirm({
      message: 'Do you want to save this record?',
      header: 'Save Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {

        if(!this.employeeService.isRepeatEmployee(this.form.value))
        {
          this.employeeService.addEmployee(this.form.value);
          this.messageService.add({severity:'success', summary: 'Success', detail:`Employee hired!`});
          this.saving = true;
          setTimeout(() => {
            this.goBackToList();
          }, 3000);
        }
        else{
          this.messageService.add({severity:'error', summary:'Error', detail:'This employee is repeated'});
        }
        
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

  goBack(): void {
    this.location.back();
  }

  goBackToList(): void{
    this.router.navigate(['employees'])
  }
}
