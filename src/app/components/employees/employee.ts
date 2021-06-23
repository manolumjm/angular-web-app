

export interface Employee {
    id: number;
    name: string;
    surname: string;
    workPosition: string; // (we can choose from an enum, which is available on API method GET, on URL: http://ibillboard.com/api/positions)
    birthDate?: Date;

    // constructor(){
    //     this.id = 0;
    //     this.name = '';
    //     this.surname = '';
    //     this.workPosition = '';
    //     this.birthDate = null;

    // }
}

export class Hero {

    constructor(
      public id: number,
      public name: string,
      public power: string,
      public alterEgo?: Date
    ) {  }
  
  }

export class Employee1 implements Employee{
    
    id = 0;
    name = '';
    surname =  '';
    workPosition =  ''; 
    birthDate = new Date();
    constructor(){
        
    }
}
