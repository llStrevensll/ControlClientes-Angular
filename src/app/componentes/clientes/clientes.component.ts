import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from '../../servicios/cliente.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  
  //Variables
  clientes: Cliente[];//Arreglo de Clientes
  cliente: Cliente = {//objeto
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }
  
  //clienteForm, botonCerrar definidos en el html
  @ViewChild("clienteForm", {static: false}) clienteForm: NgForm;
  
  @ViewChild("botonCerrar", {static: false}) botonCerrar: ElementRef;

  constructor(private clientesServicio: ClienteServicio, private flashMessages: FlashMessagesService) { }

  ngOnInit() {
    //inicializar arreglo de clientes por medio de cliente.service.ts
    this.clientesServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
        //console.log('clientes: ', clientes[0].saldo);
        
      }
    )
  }

  getSaldoTotal(){
    let saldoTotal: number = 0;
    if (this.clientes) {
      this.clientes.forEach( cliente =>{
        saldoTotal += cliente.saldo;
      });
    }
    return saldoTotal;
  }

  agregar({value, valid}: {value: Cliente, valid: boolean}){
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000//mensaje alert 4 seg
      });
    }else{
      //Agregar el nuevo cliente
      this.clientesServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
