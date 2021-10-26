import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderComponent } from '../components/loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {

  loaderDialogRef: MatDialogRef<any>;

  constructor(
    private snackBar: MatSnackBar,
    private dialog:MatDialog
  ) { }

  async showToast(
    message: string,
    _class: string = "basic",
    duration: number = 5000,
    horizontal: MatSnackBarHorizontalPosition = 'right',
    vertical: MatSnackBarVerticalPosition = 'top'
  ) {
    try {
      this.snackBar.open(message, '', {
        duration: duration,
        horizontalPosition: horizontal,
        verticalPosition: vertical,
        panelClass: _class
      })
    }
    catch (err) {
    }
  }

  async showLoader() {
    try {
      this.loaderDialogRef = await this.dialog.open(LoaderComponent, {
        width: '100%',
        height: '100%',
        hasBackdrop: false,
        panelClass:'loader'
      });
      return this.loaderDialogRef
    }
    catch (err) {
    }
  }

  async closeLoader() {
    try {
      this.loaderDialogRef.close();
    }
    catch (err) { }
  }
}
