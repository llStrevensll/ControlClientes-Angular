import { Injectable } from "@angular/core";
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../modelo/cliente.model';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ClienteServicio{
    clientesColeccion: AngularFirestoreCollection<Cliente>; //Coleccion de FireStore
    clienteDoc: AngularFirestoreDocument<Cliente>;
    clientes: Observable<Cliente[]>
    cliente: Observable<Cliente>;

    constructor(private db: AngularFirestore){
        //seleccionar coleccion de firebase y especificar el orden(por nombre y ascendente)
        this.clientesColeccion = db.collection('clientes', ref => ref.orderBy('nombre', 'asc'));
    }

    //Obtener clientes
    getClientes(): Observable<Cliente[]>{
        this.clientes = this.clientesColeccion.snapshotChanges().pipe(//iterar cada uno de los elementos con pipe
            map( cambios => {
                return cambios.map(accion => {//payload-> atributos de la coleccion
                    const datos = accion.payload.doc.data() as Cliente;//as Cliente-> como objeto de tipo Cliente
                    datos.id = accion.payload.doc.id; //asignar id
                    
                    //console.log('cliente: ', datos);
                    return datos;
                })
            })
        );
        return this.clientes;
    }
}