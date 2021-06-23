import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { EmployeeNewComponent } from './employee-new.component';


describe('EmployeeNewComponent', () => {
  let component: EmployeeNewComponent;
  let fixture: ComponentFixture<EmployeeNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      declarations: [ EmployeeNewComponent ],
      providers: [HttpClient, HttpHandler, FormBuilder, MessageService, ConfirmationService, Table, ],
      imports: [RouterTestingModule, CalendarModule, DropdownModule, ButtonModule, ConfirmDialogModule, 
                ToastModule, ReactiveFormsModule, MenubarModule, TableModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should update the value of the name input field'), () =>{

  //   const input = fixture.nativeElement.querySelector('input');
  //   const event = createNewEvent('input');

  //   input.value = 'Red';
  //   input.dispatchEvent(event);
  
  //   expect(fixture.componentInstance.form.value).toEqual('Red');
  // }
  it('TEST a Form Group input  ELEMENT COUNT', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#newEmployeeForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(4);
  })

  it('TEST a Form Group calendar ELEMENT COUNT', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#newEmployeeForm');
    const inputElements = formElement.querySelectorAll('p-calendar');
    expect(inputElements.length).toEqual(1);
  })

  it('TEST a Form Group dropdown ELEMENT COUNT', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#newEmployeeForm');
    const inputElements = formElement.querySelectorAll('p-dropdown');
    expect(inputElements.length).toEqual(1);
  })

  
  it('check initial form values', () => {
    const employeeFormGroup = component.form;
    const employeeFormValues = {
      name: '', 
      surname: '', 
      birthDate: '',
      workPosition: ''
    }

    expect(employeeFormGroup.value).toEqual(employeeFormValues);
  })

  //#region NAME FIELD TEST

  it('CHECK NAME VALUE Before ENTERING SOME VALUE AND VALIDATION', async() => {
    const nameFormEmployeeElement = await fixture.debugElement.nativeElement.querySelector('#newEmployeeForm').querySelectorAll('input')[0];
    
    const nameEmployeeValueFormGroup = component.form.get('name');
    expect(nameFormEmployeeElement.value).toEqual(nameEmployeeValueFormGroup?.value)
    expect(nameEmployeeValueFormGroup?.errors).not.toBeNull();
    expect(nameEmployeeValueFormGroup?.errors?.required).toBeTruthy();
  })

  it('CHECK NAME VALUE After ENTERING SOME VALUE AND VALIDATION', async() => {
    const nameFormEmployeeElement = await fixture.debugElement.nativeElement.querySelector('#newEmployeeForm').querySelectorAll('input')[0];

    nameFormEmployeeElement.value = "Pedro";
    nameFormEmployeeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const employeeNameValueFormGroup = component.form.get('name');
      expect(nameFormEmployeeElement?.value).toEqual(employeeNameValueFormGroup?.value);
      expect(employeeNameValueFormGroup?.errors).toBeNull();
    })
  })

  it('CHECK NAME minLength VALIDATION', async () => {
    const nameFormEmployeeElement = await fixture.debugElement.nativeElement.querySelector('#newEmployeeForm').querySelectorAll('input')[0];

    nameFormEmployeeElement.value = "P";
    nameFormEmployeeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const employeeNameValueFormGroup = component.form.get('name');
      expect(nameFormEmployeeElement?.value).toEqual(employeeNameValueFormGroup?.value);
      expect(employeeNameValueFormGroup?.errors?.minlength).toBeTruthy();
      expect(employeeNameValueFormGroup?.errors?.minlength?.requiredLength).toEqual(2);
    })
  })

  //#endregion

  //#region SURNAME FIELD TEST
  it('CHECK SURNAME VALUE Before ENTERING SOME VALUE AND VALIDATION', async() => {
    const nameFormEmployeeElement = await fixture.debugElement.nativeElement.querySelector('#newEmployeeForm').querySelectorAll('input')[1];
    
    const nameEmployeeValueFormGroup = component.form.get('surname');
    expect(nameFormEmployeeElement.value).toEqual(nameEmployeeValueFormGroup?.value)
    expect(nameEmployeeValueFormGroup?.errors).not.toBeNull();
    expect(nameEmployeeValueFormGroup?.errors?.required).toBeTruthy();
  })

  it('CHECK SURNAME VALUE After ENTERING SOME VALUE AND VALIDATION', async() => {
    const nameFormEmployeeElement = await fixture.debugElement.nativeElement.querySelector('#newEmployeeForm').querySelectorAll('input')[1];

    nameFormEmployeeElement.value = "Pedro";
    nameFormEmployeeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const employeeNameValueFormGroup = component.form.get('surname');
      expect(nameFormEmployeeElement?.value).toEqual(employeeNameValueFormGroup?.value);
      expect(employeeNameValueFormGroup?.errors).toBeNull();
    })
  })

  it('CHECK SURNAME minLength VALIDATION', async () => {
    const nameFormEmployeeElement = await fixture.debugElement.nativeElement.querySelector('#newEmployeeForm').querySelectorAll('input')[1];

    nameFormEmployeeElement.value = "L";
    nameFormEmployeeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const employeeNameValueFormGroup = component.form.get('surname');
      expect(nameFormEmployeeElement?.value).toEqual(employeeNameValueFormGroup?.value);
      expect(employeeNameValueFormGroup?.errors?.minlength).toBeTruthy();
      expect(employeeNameValueFormGroup?.errors?.minlength?.requiredLength).toEqual(2);
    })
  })


  
});
