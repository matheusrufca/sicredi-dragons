import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Dragon } from '../../../models/dragon';

@Component({
  selector: 'remove-confirmation-dialog',
  templateUrl: './remove-confirmation-dialog.component.html',
  styleUrls: ['./remove-confirmation-dialog.component.scss']
})
export class RemoveConfirmationDialogComponent implements OnInit {

  constructor(
    public readonly dialogRef: MatDialogRef<RemoveConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public item: Dragon
  ) { }

  ngOnInit(): void { }
}
