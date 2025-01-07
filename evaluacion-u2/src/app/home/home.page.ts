import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonFab, IonFabButton, IonLabel, IonItem } from '@ionic/angular/standalone';
import { CitasService } from 'src/app/servicios/citas.service';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { addIcons } from 'ionicons';
import { settingsOutline, addOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonItem, IonLabel, RouterModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonFab, IonFabButton],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // Cita seleccionada aleatoriamente
  citaAleatoria: { id: number; texto: string; autor: string } | null = null;
  // Se indica si se permite borrar cita aleatoria (controlada por la página configuración)
  permitirBorrar = false;

  constructor(private citasService: CitasService, private configuracionService: ConfiguracionService) {
    // Iconos Personalizados que se utilizaran para la página
    addIcons({
      settingsOutline,
      addOutline,
      trashOutline,
    });
  }
  // Método que se ejecutara cuando se inicia la página
  async ngOnInit() {
    this.permitirBorrar = await this.configuracionService.getPermitirBorrar();
    await this.obtenerCitaAleatoria();
  }
  // Método para obtener una cita aleatoria desde el servicio citas
  async obtenerCitaAleatoria() {
    this.citaAleatoria = await this.citasService.obtenerCitaAleatoria();
  }
  // Método para eliminar la cita aleatoria mostrada en la página
  async eliminarCita() {
    if (this.citaAleatoria) {
      await this.citasService.eliminarCita(this.citaAleatoria.id);
      await this.obtenerCitaAleatoria(); // Actualizar la cita después de eliminar
    }
  }
}