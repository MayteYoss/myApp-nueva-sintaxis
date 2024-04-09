import { CommonModule } from '@angular/common';
import { Component, Injector, computed, effect, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


import {Task} from './../../models/task.model';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { //estado utilizando signals/
  tasks = signal<Task[]>([]);   //si es un array de tareas todos deberian cumplir con una estructura de datos para esto vamos a utilizar una interfas  

  //aca quiotamos lo que habia en tasks y lo dejamos en vacio se llama estado por defecto e inyectamos el metodo ngOnInit/

  //es un estado mas  y un estado apartir de otros estados o de otras senales/
  //ESTADO DE FILTER/
  filter = signal<'all' | 'pending' | 'completed'>("all");
  taskByFilter = computed(() => { // lo  que colocamos dentro del computed son los elementos que vamos a reaccionar cuando ellos cambien/ 
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter =='pending') {
      return tasks.filter(task => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }
    return tasks;
  })

  newTaskCtrl = new FormControl ("", {  //estado utilizando FormControl/
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  });

  injector = inject(Injector);
  

  //PARA ISTANCIAR UN EFFECT deberiamos hacerlo dentro el constructor/
  constructor() {

  }

  //inyectamos este metodo | aqui lo obtenemos/
  ngOnInit() {
    const storage = localStorage.getItem('tasks');
    if (storage) {
      const tasks = JSON.parse(storage); //utilizamos parse para que los vuelva objetos en el localstorage para que nuestro signal lo lea como objeto
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  trackTasks() {
    effect(() => {   //si l'effect se pone en otro lugar que no sea dentro un constructor, debe terner un inyector/  
      const tasks = this.tasks();
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks)); //con esto lo podemos en en local storage pero igual se eliminan asi que quitamos lo que esta al interno de tasks/
      //aqui lo guardamos/
      }, {injector: this.injector});
  }


  changeHandler() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if (value !== "") {
        this.addTask(value);
        this.newTaskCtrl.setValue("");
      }
    }

  // changeHandler(event: Event) {
  //   //par optener el valor del input//
  //   const input = event.target as HTMLInputElement;
  //   const newTask = input.value;
  //   this.addTask(newTask);

    // this.tasks.update((tasks) => [...tasks, newTasks]);
    //update nos permite modificar o agregar un nuevo valor pero no borrarlo o resetearlo desd cero//

  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);

  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed // con ese signo exclamativo se hace una negacion/ 
          }
        }
        return task;
    })
    });
  }

    updateTaskEditingMode(index: number) {
      this.tasks.update((tasks) => {
        return tasks.map((task, position) => {
          if (position === index) {
            return {
              ...task,
              editing: true
            }
          }
          return {
            ...task,
            editing: false
          };
      })
      });
    }

    updateTaskText(index: number, event:Event) {
     const input = event.target as HTMLInputElement;
      this.tasks.update((tasks) => {
        return tasks.map((task, position) => {
          if (position === index) {
            return {
              ...task,
              title: input.value,
              editing: false
            }
          }
           return task;
      })
      });
    }

    changeFilter(filter: 'all' | 'pending' | 'completed') {
      this.filter.set(filter);
    }
    

}
