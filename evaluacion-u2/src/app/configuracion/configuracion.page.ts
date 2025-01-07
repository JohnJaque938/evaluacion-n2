import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonToggle } from '@ionic/angular/standalone';
import { ConfiguracionService } from '../servicios/configuracion.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonToggle, FormsModule],
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage {
  // Se crea una variable que nos indica si se permite el borrar las citas en el inicio (home)
  permitirBorrar = true;
  // Inicio del servicio de configuración para permitir usar las preferencias del usuario
  constructor(private configuracionService: ConfiguracionService) {}
  // Método que se ejecuta al iniciar el componente
  async ngOnInit() {
    this.permitirBorrar = await this.configuracionService.getPermitirBorrar();
  }
  // Método que se ejecuta cuando se cambie el estado del interruptor (switch)
  async toggleBorrar(event: any) {
    this.permitirBorrar = event.detail.checked;
    await this.configuracionService.setPermitirBorrar(this.permitirBorrar);
  }
}