import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule, PoPageModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PoModule,
    PoTemplatesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PoPageModule
  ],
  exports: [
    CommonModule,
    PoModule,
    PoTemplatesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
