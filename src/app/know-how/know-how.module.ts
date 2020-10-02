import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KnowHowComponent } from './know-how.component';

@NgModule({
  declarations: [KnowHowComponent],
  imports: [
    CommonModule
  ],
  exports: [
    KnowHowComponent,
  ]
})
export class KnowHowModule { }
