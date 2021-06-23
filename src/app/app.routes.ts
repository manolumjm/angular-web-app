
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { EmployeesComponent } from "./components/employees/list/employees.component";
import { EmployeeNewComponent } from "./components/employees/new/employee-new.component";

const APP_ROUTES: Routes = [

    {path: 'home', component: HomeComponent},
    {path: 'employees', component: EmployeesComponent},
    {path: 'employees/new', component: EmployeeNewComponent},
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);

