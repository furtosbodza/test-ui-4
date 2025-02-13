import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PartsService } from '../../shared/service/item.service';

@Component({
  selector: 'app-part-edit',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './part-edit.component.html',
  styleUrl: './part-edit.component.scss'
})
export class PartEditComponent implements OnInit {

    router = inject(Router);
    partsService = inject(PartsService);

   protected editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      supplier: new FormControl('', [Validators.required])
    })

    ngOnInit(): void {
      this.initData();
    }
  
    private initData(): void {
      /*
      this.getPartList().subscribe(
        {
          next: (partList) => {
            console.log(partList);
            if (partList) {
              this.dataSource = partList;
            }
            console.log(this.dataSource)
          },
          error: (error) => {
            console.log(error);
            //this.snackbar.errorMessage(error.message);
          }
        }
      );*/
    };

    onSave() {
      if (!this.editForm.valid) {
        return;
      }

    }

}
