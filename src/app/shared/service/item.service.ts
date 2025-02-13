import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ItemPart } from "../model/itemSearch";
import { Observable } from "rxjs/internal/Observable";
import { Item } from "../model/item";

@Injectable({ providedIn: 'root' })
export class PartsService {

    httpClient = inject(HttpClient);

    list(data: SearchPart) {
        return this.httpClient.post(`${environment.apiUrl}/parts/list`, data);
    }

    delete(data: SearchPart) {
        return this.httpClient.post(`${environment.apiUrl}/parts/list`, data);
    }

    listSuppliers() {
        return this.httpClient.get<any[]>(`${environment.apiUrl}/supplier/list`);
    }

}