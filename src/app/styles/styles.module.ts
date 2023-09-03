import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { MenubarModule } from 'primeng/menubar';
import { DataViewModule } from 'primeng/dataview';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    AutoCompleteModule,
    ButtonModule,
    CardModule,
    DataViewModule,
    DividerModule,
    GalleriaModule,
    MenubarModule,

    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports:[
    AutoCompleteModule,
    ButtonModule,
    CardModule,
    DataViewModule,
    DividerModule,
    GalleriaModule,
    MenubarModule,

    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class StylesModule { }
