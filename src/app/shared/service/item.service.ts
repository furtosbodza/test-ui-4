import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ItemSearch } from "../model/itemSearch";
import { Item } from "../model/item";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class PartsService {

    httpClient = inject(HttpClient);
    snackBar =  inject(MatSnackBar); 

    list(data: ItemSearch) {
        return this.httpClient.post<Item[]>(`${environment.apiUrl}/item/list`, data);
    }

    getItem(id: string) {
        return this.httpClient.get(`${environment.apiUrl}/item/` + id);
    }

    create(data: Item) {
        return this.httpClient.post<Item>(`${environment.apiUrl}/item/create`, data);
    }

    modify(data: Item) {
        return this.httpClient.put<Item>(`${environment.apiUrl}/item/modify`, data);
    }

    delete(id: number) {
        return this.httpClient.delete(`${environment.apiUrl}/item/delete/` + id);
    }

    listSuppliers() {
        return this.httpClient.get<any[]>(`${environment.apiUrl}/supplier/list`);
    }

    public showErrorFeedback(message?: string) {
        const timeDuration = 6000;
        const text = message ? message : 'A mentés sikertelen!';
        this.snackBar.open(text, '✖', {
          duration: timeDuration,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-red', 'snackbar-multi-line']
        });
      }

      public showSuccsessFeedback(message?: string) {
        const text = message ? message : 'A mentés sikeres!';
        this.snackBar.open(text, '✔', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-green']
        });
      }

}