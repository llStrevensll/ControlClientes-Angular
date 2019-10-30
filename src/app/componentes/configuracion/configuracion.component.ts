import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from '../../servicios/configuracion.service';
import { Configuracion } from 'src/app/modelo/configuracion.model';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  
  permitirRegistro = false;

  constructor(
    private router: Router,
    private ConfiguracionServicio: ConfiguracionServicio
  ) { }

  ngOnInit() {
    this.ConfiguracionServicio.getConfiguracion().subscribe(
      (configuracion: Configuracion) => {
        this.permitirRegistro = configuracion.permitirRegistro;
      }
    )
  }

  guardar(){
    let configuracion = {permitirRegistro: this.permitirRegistro};
    this.ConfiguracionServicio.modificarConfiguracion(configuracion);
    this.router.navigate(['/']);
  }

}
