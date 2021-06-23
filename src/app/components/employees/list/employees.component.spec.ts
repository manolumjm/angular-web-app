import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { EmployeesComponent } from './employees.component';


describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesComponent ],
      providers: [HttpClient, HttpHandler],
      imports: [RouterTestingModule, ConfirmDialogModule, ToastModule, TableModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should render table", () => {
    debugger;
    // const result = fixture.debugElement.queryAll(By.css(".testtable"));
    // const markup = result[0].nativeNode.outerHTML;

    const tableEl = fixture.debugElement.query(By.css('.p-datatable-tbody')).queryAll(By.css('tr'));
    expect(tableEl.length).toEqual(2);
  });

});
