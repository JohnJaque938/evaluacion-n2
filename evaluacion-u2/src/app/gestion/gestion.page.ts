import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonButton, IonIcon, IonContent, IonInput, IonLabel, IonList, IonItem, IonItemDivider, IonText, IonButtons } from '@ionic/angular/standalone';
import { CitasService } from 'src/app/servicios/citas.service';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { arrowBackOutline, trash } from 'ionicons/icons'; 

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [IonButtons, CommonModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon, IonContent, IonInput, IonLabel, IonList, IonItem, IonItemDivider, FormsModule, IonText],
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
})
export class GestionPage {
   // Objeto para la nueva cita con el texto y nombre del autor
  nuevaCita: { texto: string; autor: string } = { texto: '', autor: '' };
   // Lista de las citas almacenadas
  citas: { id: number; texto: string; autor: string }[] = [];

  constructor(private citasService: CitasService) {
    // Iconos Personalizados que se utilizaran para la página
    addIcons({
      arrowBackOutline,
      trash
    });
  }
  // Método para agregar una cita
  async agregarCita() {
    if (this.nuevaCita.texto && this.nuevaCita.autor) {
      await this.citasService.agregarCita(this.nuevaCita);
      this.nuevaCita = { texto: '', autor: '' }; // Limpiar los campos después de agregar
      this.obtenerCitas(); // Actualizar la lista de citas
    }
  }
  // Método para obtener todas las citas almacenadas
  async obtenerCitas() {
    this.citas = await this.citasService.obtenerCitas(); // Obtener citas almacenadas
  }
  // Método para eliminar una cita
  async eliminarCita(cita: { id: number }) {
    await this.citasService.eliminarCita(cita.id);
    this.obtenerCitas(); // Actualizar la lista de citas almacenadas después de eliminar la cita
  }
  // Se Llama a obtenerCitas() cuando la página se inicia para cargar las citas
  ngOnInit() {
    this.obtenerCitas();
  }
}