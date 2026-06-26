import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';

import { Contact, ContactFormData } from '../models/contact.model';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxTextBoxModule,
    DxValidatorModule,
  ],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class ModalComponent implements OnChanges {
  @Input() contact: Contact | null = null;
  @Input() states: string[] = [];

  @Output() createContact = new EventEmitter<ContactFormData>();
  @Output() updateContact = new EventEmitter<Contact>();
  @Output() cancel = new EventEmitter<void>();

  formData: ContactFormData = this.createEmptyForm();

  isEditing = false;

  readonly digitPattern = /^\d*$/;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contact']) {
      this.formData = this.contact
        ? { ...this.contact }
        : this.createEmptyForm();

      // New contact is immediately editable.
      // Existing contact starts as read-only.
      this.isEditing = this.contact === null;
    }
  }

  get isCreateMode(): boolean {
    return this.contact === null;
  }

  get fieldsDisabled(): boolean {
    return !this.isCreateMode && !this.isEditing;
  }

  get isFormValid(): boolean {
    const name = this.formData.name.trim();
    const email = this.formData.email.trim();
    const phone = this.formData.phone.trim();
    const postcode = this.formData.postcode.trim();

    const emailValid =
      email.length === 0 ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const phoneValid =
      phone.length === 0 || /^\d+$/.test(phone);

    const postcodeValid =
      postcode.length === 0 || /^\d+$/.test(postcode);

    return (
      name.length > 0 &&
      emailValid &&
      phoneValid &&
      postcodeValid
    );
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  submit(): void {
    if (!this.isFormValid) {
      return;
    }

    const normalizedData: ContactFormData = {
      name: this.formData.name.trim(),
      email: this.formData.email.trim(),
      phone: this.formData.phone.trim(),
      street: this.formData.street.trim(),
      state: this.formData.state.trim(),
      postcode: this.formData.postcode.trim(),
      description: this.formData.description.trim(),
    };

    if (this.isCreateMode) {
      this.createContact.emit(normalizedData);
      return;
    }

    this.updateContact.emit({
      ...normalizedData,
      id: this.contact!.id,
    });
  }

  close(): void {
    this.cancel.emit();
  }

  private createEmptyForm(): ContactFormData {
    return {
      name: '',
      email: '',
      phone: '',
      street: '',
      state: '',
      postcode: '',
      description: '',
    };
  }
}