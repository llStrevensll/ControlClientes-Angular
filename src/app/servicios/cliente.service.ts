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

    //Obtener clientes todos
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
    
    //Agregar un Cliente
    agregarCliente(cliente: Cliente){
        this.clientesColeccion.add(cliente);
    }

    //Obtener cliente por id
    getCliente(id: string){
        //id del cliente
        this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
        this.cliente = this.clienteDoc.snapshotChanges().pipe(
            map(accion =>{
                if (accion.payload.exists === false) {//sino hay contenido
                    return null;
                }
                else{
                    const datos = accion.payload.data() as Cliente;//datos tipo Cliente
                    datos.id = accion.payload.id;
                    return datos;
                }
            })
        );
        return this.cliente;//Regresa observable
    }

    //Modificar CLiente
    modificarCliente(cliente: Cliente){
        this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
        this.clienteDoc.update(cliente);
    }

    //Eliminar Cliente
    eliminarCliente(cliente: Cliente){
        this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
        this.clienteDoc.delete();
    }
    


}