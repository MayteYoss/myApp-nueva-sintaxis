import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { log } from 'console';
import {FormControl, ReactiveFormsModule, Validators } from '@angular/forms'; //se importa y se agrega tambien en la graffa de components//




@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], //se importa acà tambien y esto nos permite utilizar formularios reactivos 
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {

  welcome = 'Benvenuto!'; //traido de app.cmp.ts//
  tasks = signal([
    "fare la spesa",
    "fare colazione",
    "portare lo zaino",
    "portare l'acqua"
  ]);
   
  //estas variables son publicas por defecto, si le pongo PRIVATE no las puedo ver en labs.component.html
   name = signal("Maytè"); //aca defino y puedo hacer union en labs.component.html//
   age = 25;
   disabled = true
   img = "https://w3schools.com/howto/img_avatar.png"

    //esto es un objeto con sus propias propiedades//
   person = signal({
    name: "Mateo",
    age: 18,
    avatar: "https://w3schools.com/howto/img_avatar.png"
   });

   colorCtrl = new FormControl(); //para la nueva manera/

   widthCtrl = new FormControl(50, {
    nonNullable: true,
   }); 

   nameCtrl = new FormControl("Marco", {
    nonNullable: true,
    validators: [
      Validators.required, //deve ser requerido/
      Validators.minLength(3)
    ]
   }); 

   constructor() {  //haciendo esto lo leyemos de forma logica y en html de forma recativa /
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value);
      
    })
   }

   //metodos de la clase//
   clickHandler() {
    alert("Ciao")
   }

   //algunos eventos pueden enviar algunos eventos como parametros//
   //recibo un evento que es de tipo Event directamente//
   changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
     const newValue = input.value;
     this.name.set(newValue)
   }

   keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
    
   }

   changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        age: parseInt(newValue,10)

      }
    })
   }

   changeName (event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        name: newValue

      }
    })
   }



}
