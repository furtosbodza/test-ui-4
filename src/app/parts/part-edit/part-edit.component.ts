import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartsService } from '../../shared/service/item.service';
import { Observable } from 'rxjs/internal/Observable';
import { Item } from '../../shared/model/item';
import { AuthService } from '../../shared/security/auth/auth.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-part-edit',
  standalone: true,
  imports: [ ReactiveFormsModule, MatInputModule, FormsModule, MatFormFieldModule ],
  templateUrl: './part-edit.component.html',
  styleUrl: './part-edit.component.scss'
})
export class PartEditComponent implements OnInit {

    id;
    item?: Item;
   
    router = inject(Router);
    partsService = inject(PartsService);
    authService = inject(AuthService);

   
    public editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      supplier: new FormControl('', [Validators.required])
    })

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("constructor bizu: " + this.id);
  }

  ngOnInit(): void {
    this.initData();
  }
  
    private initData(): void {
      if (this.id === null) {
        return;
      }
      this.getItem(this.id!).subscribe(
        {
          next: (item) => {
            console.log(item);
            this.item = item;
            this.addFormValue(item);
          },
          error: (error) => {
            console.log(error);
          }
        }
      );
    };

    private addFormValue(data: Item) {
      this.editForm.setValue({
        name: data.name,
        price: data.price,
        supplier: data.supplier
      });
  
    }

    onSave() {
      if (!this.editForm.valid) {
        return;
      }
      if (this.item && this.item?.id) {
        return this.partsService.modify(this.getItemDto()).subscribe(
          {
            next: (item) => {
              this.item = item;
              this.addFormValue(item);
            },
            error: (error) => {
              console.log(error);
            }
          }
        );
      } else {
        return this.partsService.create(this.getItemDto()).subscribe(
          {
            next: (item) => {
              this.item = item;
              this.addFormValue(item);
            },
            error: (error) => {
              console.log(error);
            }
          }
        );
      }
    
    }

    public getItemDto() {
      const itemDto: Item = {
        'id' : this.item ? this.item.id : null,
        'name': this.editForm.get('name')!.value!,
        'supplier': this.editForm.get('supplier')!.value!,
        'price': this.editForm.get('price')!.value!,
      }
      return itemDto;
    }

    public getItem(id: string): Observable<any> {
      return this.partsService.getItem(id);
    }

    public back() {
      this.router.navigate(['/parts']);
    }

    public logout(){
      this.authService.logout();
      this.router.navigate(['/login']);
    }


}
