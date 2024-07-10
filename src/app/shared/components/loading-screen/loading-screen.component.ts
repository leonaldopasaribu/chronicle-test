import { DialogRef } from '@angular/cdk/dialog';
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { ArrayOfNumbersUtil } from 'src/app/shared/utils/array-of-numbers/';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf],
})
export class LoadingScreenComponent {
  readonly getArrayOfNumbers: (numbers: number) => number[];

  message: string;

  constructor(private dialogRef: DialogRef) {
    this.getArrayOfNumbers = ArrayOfNumbersUtil.getArrayOfNumbers;
    this.message = this.dialogRef.config.data;
  }
}
