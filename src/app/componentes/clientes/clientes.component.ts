import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from '../../servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  
  //Variables
  clientes: Cliente[];//Arreglo de Clientes

  constructor(private clientesServicio: ClienteServicio) { }

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

}
