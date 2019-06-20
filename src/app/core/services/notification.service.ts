import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';



@Injectable()
export class NotificationService {
  constructor(private readonly snackBar: MatSnackBar) { }

  notify(message: string, action?: string, settings?: any) {
    settings = Object.assign({ duration: 4000, }, settings || undefined);
    return this.snackBar.open(message, action, settings);
  }
}
