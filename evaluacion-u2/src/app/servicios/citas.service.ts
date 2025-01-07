import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private dbName = 'citasDB';  // Nombre de la base de datos

  constructor() {
    if (!Capacitor.isNativePlatform()) {
      // Si estamos en el navegador, se inicia IndexedDB
      this.initDB();
    }
  }
  // Se inicia IndexedDB
  private initDB() {
    const request = indexedDB.open(this.dbName, 1);
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('citas')) {
        const store = db.createObjectStore('citas', { keyPath: 'id', autoIncrement: true });
        store.createIndex('texto', 'texto', { unique: false });
        store.createIndex('autor', 'autor', { unique: false });
      }
    };
  }
  // Se agrega una cita a la base de datos
  async agregarCita(cita: { texto: string; autor: string }) {
    const request = indexedDB.open(this.dbName, 1);
    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction('citas', 'readwrite');
      const store = transaction.objectStore('citas');
      store.add(cita);
      transaction.oncomplete = () => {
        console.log('Cita agregada');
      };
    };
  }
  // Se Obtiene todas las citas almacenadas de la base de datos
  async obtenerCitas(): Promise<{ id: number; texto: string; autor: string }[]> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction('citas', 'readonly');
        const store = transaction.objectStore('citas');
        const getAllRequest = store.getAll();
        getAllRequest.onsuccess = (event: any) => {
          resolve(event.target.result);
        };
        transaction.onerror = (event: any) => {
          reject('Error al obtener las citas');
        };
      };
    });
  }
  // Se Obtiene una cita aleatoria de la base de datos
  async obtenerCitaAleatoria(): Promise<{ id: number; texto: string; autor: string } | null> {
    const citas = await this.obtenerCitas(); // Se Obtiene todas las citas
    if (citas.length === 0) return null; // Si no hay citas, devolvemos a un valor nulo
    const randomIndex = Math.floor(Math.random() * citas.length); // Elegir un índice aleatorio
    return citas[randomIndex]; // Devolver (mostrar) la cita aleatoria
  }
  // Se elimina una cita de la base de datos
  async eliminarCita(id: number) {
    const request = indexedDB.open(this.dbName, 1);
    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction('citas', 'readwrite');
      const store = transaction.objectStore('citas');
      store.delete(id);
      transaction.oncomplete = () => {
        console.log('Cita eliminada');
      };
    };
  }
}