import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Configuracion } from '../modelo/configuracion.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfiguracionServicio{
    configiracionDoc: AngularFirestoreDocument<Configuracion>;
    configuracion: Observable<Configuracion>;

    //id unico de la coleccion de configuracion
    id = '1';

    constructor(private db: AngularFirestore){}
    
    getConfiguracion(): Observable<Configuracion>{
        this.configiracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracion = this.configiracionDoc.valueChanges();
        return this.configuracion;
    }

    modificarConfiguracion(configuracion: Configuracion){
        this.configiracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configiracionDoc.update(configuracion);
    }
}