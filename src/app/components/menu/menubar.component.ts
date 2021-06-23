import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenuBarComponent implements OnInit {

  items: MenuItem[] = []

  constructor() { }

  ngOnInit(): void {
    this.fillMenuItems();
  }


  fillMenuItems(){
    this.items = [
      {
        label: 'Home', 
        icon: 'pi pi-fw pi-home',
        routerLink: 'home'
      },
      {
          label:'Employees',
          icon:'pi pi-fw pi-user',
          items:[
              {
                  label:'New',
                  icon:'pi pi-fw pi-user-plus',
                  routerLink: 'employees/new'

              },
              // {
              //     label:'Delete',
              //     icon:'pi pi-fw pi-user-minus',

              // },
              {
                  label:'Search',
                  icon:'pi pi-fw pi-users',
                  routerLink: 'employees'
              }
          ]
      },
    ];
  }
}
