import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/security/auth/auth.service';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PartsService } from '../shared/service/item.service';
import { Item } from '../shared/model/item';
import { Observable } from 'rxjs';
import { ItemSearch } from '../shared/model/itemSearch';
//import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Suppliers } from '../shared/model/suppliers';

/*
export interface PeriodicElement {
  name: string;
  supplier: string;
  price: number;
}*/

@Component({
  selector: 'app-parts',
  standalone: true,
  imports: [ 
    MatTableModule, CommonModule, MatCheckboxModule, MatInputModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule
  ],
  templateUrl: './parts.component.html',
  styleUrl: './parts.component.scss'
})
export class PartsComponent implements OnInit {

  authService = inject(AuthService);
  router = inject(Router);
  partsService = inject(PartsService);


  public searchForm = new FormGroup({
      name: new FormControl(),
      supplier: new FormControl()
  })

  suppliers: Suppliers[] = [];
  displayedColumns: string[] = ['name','supplier','price'];
  dataSource: MatTableDataSource<Item> = new MatTableDataSource();
  selectedPart?: Item;

  constructor() {
    
  }

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    this.getSuppliers().subscribe(
      {
        next: (supplierList) => {
          if (supplierList) {
            this.suppliers = supplierList;
          }
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
    this.initList();
    
  };

  private initList(): void {
    this.getPartListEmptyFilter().subscribe(
      {
        next: (partList) => {
          //console.log(partList);
          if (partList) {
            this.dataSource = partList;
          }
          //console.log(this.dataSource)
        },
        error: (error) => {
          console.log(error);
          //this.snackbar.errorMessage(error.message);
        }
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("filterValue: " + filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onRowClick(part: Item) {
    this.selectedPart = part;
  }

  isSelected(selectedRowData: Item): boolean {
    if (this.selectedPart) {
      return Object.entries(selectedRowData).toString() === Object.entries(this.selectedPart).toString();
    }
    return false;
   }

   navigateToEdit(id: number) {
    if (id) {
      this.router.navigate(['part/'+ id]);
    }
  }

  addData() {
    this.router.navigate(['create']);
  }

  removeData() {
    this.partsService.delete(this.selectedPart!.id!).subscribe(
      {
        next: () => {
          this.initList()
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  public onSearch() {
    if (!this.searchForm) {
      return;
    }
    const searchPart: ItemSearch = {
      'name': (this.searchForm.get('name')?.value ? this.searchForm.get('name')!.value : ""),
      'supplier': (this.searchForm.get('supplier')?.value ? this.searchForm.get('supplier')!.value : "")
    }
    console.log("onSearch dto:" + searchPart.name + " " + searchPart.supplier);
    return this.getPartList(searchPart).subscribe(
      {
        next: (partList) => {
          if (partList) {
            this.dataSource = partList;
          }
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  public getSuppliers(): Observable<any> {
    return this.partsService.listSuppliers();
  }

  public getPartListEmptyFilter(): Observable<any> {
    const searchPart: ItemSearch = {
      'name': "",
      'supplier': null
    }
    return this.getPartList(searchPart);
  }

  public getPartList(search : ItemSearch): Observable<any> {
    return this.partsService.list(search);
  }

}
