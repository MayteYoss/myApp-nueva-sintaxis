import { Routes } from '@angular/router';  //en esta pagina me debo agregar los import de mis componentes que serian Home e Labs//

import { HomeComponent } from './pages/home/home.component'; //esta Dentro de los corchetes escribimos los nombres de cada una de las clases//
import {LabsComponent} from './pages/labs/labs.component'; //esta//

export const routes: Routes = [ //necesitamos definir una ruta y la parte o la seccion en donde vamos a encontrar o redirigir los usuarios, utilizamos el PATH//
    {
        //path: "home" primero asi y despues asi//
        path: "", //nombre de nuestra ruta OJO para que HomeComponet sea la ruta principal sin necesidad de ningun path lo dejamos con una string en vacio  // 
        component: HomeComponent //acà ponemos que componente va a reindirizar ese path
    },
    {
        path: "labs", //hacemos tambien la de la labs//
        component: LabsComponent
    } //todo esto dice a NG que componente deve reindirizar en cada ruta// 
];
