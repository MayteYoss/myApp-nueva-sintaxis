//me e creado esta inteface para la estructura de datos de home.componet.ts//
//la debemos importar en home.component.ts//
export interface Task {
    id: number;
    title: string;
    completed: boolean;
    editing?: boolean;  //ponemos ese signo interrogativo para dejarlo como opcional, esto me permite saber que tarea esta en modo de edicion/
}

