
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
//import { SearchComponent } from "./components/search/search.component";
import { EmployeesComponent } from "./components/employees/list/employees.component";
import { EmployeeNewComponent } from "./components/employees/new/employee-new.component";
//import { EmployeeComponent } from "./components/employee/employee-detail.component";
//import { EMPLOYEE_ROUTES} from "./components/employees/employee.routes";

const APP_ROUTES: Routes = [

    {path: 'home', component: HomeComponent},
    // {path: 'search', component: SearchComponent},
    // {path: 'artist/:id', component: ArtistaComponent},
    // {path: 'employees', component: EmployeesComponent, children: EMPLOYEE_ROUTES},
    {path: 'employees', component: EmployeesComponent},
    {path: 'employees/new', component: EmployeeNewComponent},
    // {
    //     path: 'employee/:id', 
    //     component: EmployeeComponent, 
    //     children: EMPLOYEE_ROUTES
        
    // },
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);

