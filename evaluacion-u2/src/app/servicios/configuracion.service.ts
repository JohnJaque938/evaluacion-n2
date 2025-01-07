import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  private readonly KEY_PERMITIR_BORRAR = 'permitir_borrar';

  async setPermitirBorrar(permitir: boolean): Promise<void> {
    await Preferences.set({ key: this.KEY_PERMITIR_BORRAR, value: JSON.stringify(permitir) });
  }
  async getPermitirBorrar(): Promise<boolean> {
    const { value } = await Preferences.get({ key: this.KEY_PERMITIR_BORRAR });
    return value ? JSON.parse(value) : false;
  }
}