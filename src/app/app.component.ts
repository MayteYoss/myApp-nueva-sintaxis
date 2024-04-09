import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "todo-app";
  welcome = 'Benvenuto!'; //copiamos tasks e welcome y los copiamos en la comp.ts de labs//
  tasks = [
    "fare la spesa",
    "fare colazione",
    "portare lo zaino",
    "portare l'acqua"
  ]
}
