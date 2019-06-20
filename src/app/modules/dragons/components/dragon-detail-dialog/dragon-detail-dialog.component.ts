import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dragon-detail-dialog',
  templateUrl: './dragon-detail-dialog.component.html',
  styleUrls: ['./dragon-detail-dialog.component.scss'],
})
export class DragonDetailDialogComponent implements OnInit {
  constructor(
    public readonly dialogRef: MatDialogRef<DragonDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {}
}
