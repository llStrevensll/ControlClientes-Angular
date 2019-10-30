
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable()
export class LoginService{
    constructor(private authService: AngularFireAuth){}
    //Login
    login(email: string, password: string){
        return new Promise((resolve, reject) => {
            this.authService.auth.signInWithEmailAndPassword(email, password)
            .then(datos => resolve(datos),
                    error => reject(error)
            )
        });
    }
    
    //Saber Autenticacion
    getAuth(){
        return this.authService.authState.pipe(
            map(auth => auth)
        );
    }

    //Salir del usuario
    logout(){
        this.authService.auth.signOut();
    }

    registrarse(email: string, password:string){
        return new Promise((resolve, reject) => {
            this.authService.auth.createUserWithEmailAndPassword(email, password)
                .then(datos => resolve(datos),
                error => reject(error))
        });
    }
}