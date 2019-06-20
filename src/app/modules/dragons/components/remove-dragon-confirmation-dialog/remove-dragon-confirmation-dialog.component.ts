import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Dragon } from '../../../../core/models/dragon';

@Component({
  selector: 'remove-dragon-confirmation-dialog',
  templateUrl: './remove-dragon-confirmation-dialog.component.html',
  styleUrls: ['./remove-dragon-confirmation-dialog.component.scss'],
})
export class RemoveDragonConfirmationDialogComponent implements OnInit {
  constructor(
    public readonly dialogRef: MatDialogRef<RemoveDragonConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public item: Dragon,
  ) {}

  ngOnInit(): void {}
}
