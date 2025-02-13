import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ItemSearch } from "../model/itemSearch";
import { Observable } from "rxjs/internal/Observable";
import { Item } from "../model/item";

@Injectable({ providedIn: 'root' })
export class PartsService {

    httpClient = inject(HttpClient);

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

}