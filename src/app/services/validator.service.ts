import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const PasswordMismatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
  const password2 = control.get('password1')?.value || control.get('password2')?.value;
    if (password !== password2) return { passwordMismatch: true };
    return null;
} 
