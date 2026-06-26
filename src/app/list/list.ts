import { Component, inject } from '@angular/core';

import {
  DxButtonModule,
  DxButtonTypes,
} from 'devextreme-angular/ui/button';

import {
  DxDataGridModule,
  DxDataGridTypes,
} from 'devextreme-angular/ui/data-grid';

import { DxPopupModule } from 'devextreme-angular/ui/popup';

import { Contact, ContactFormData } from '../models/contact.model';
import { AddressBookService } from '../services/address-book';
import { ModalComponent } from '../modal/modal';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxPopupModule,
    ModalComponent,
  ],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class ListComponent {
  private readonly addressBookService =
    inject(AddressBookService);

  popupVisible = false;

  selectedContact: Contact | null = null;

  get contacts(): Contact[] {
    return this.addressBookService.addressBookList;
  }

  get stateList(): string[] {
    return this.addressBookService.stateList;
  }

  get popupTitle(): string {
    return this.selectedContact
      ? 'Contact Details'
      : 'Create Contact';
  }

  calculateAddress = (contact: Contact): string => {
    return [
      contact.street,
      contact.state,
      contact.postcode,
    ]
      .filter((value) => value?.trim())
      .join(', ');
  };

  openCreatePopup(): void {
    this.selectedContact = null;
    this.popupVisible = true;
  }

  onRowClick(
    event: DxDataGridTypes.RowClickEvent,
  ): void {
    if (event.rowType !== 'data' || !event.data) {
      return;
    }

    this.selectedContact = {
      ...(event.data as Contact),
    };

    this.popupVisible = true;
  }

  createContact(contact: ContactFormData): void {
    this.addressBookService.insert(contact);
    this.closePopup();
  }

  updateContact(contact: Contact): void {
    this.addressBookService.update(contact);
    this.closePopup();
  }

  deleteContact(
    contact: Contact,
    event: DxButtonTypes.ClickEvent,
  ): void {
    // Prevent rowClick from opening the edit popup.
    event.event?.stopPropagation();

    const shouldDelete = window.confirm(
      `Are you sure you want to delete ${contact.name}?`,
    );

    if (shouldDelete) {
      this.addressBookService.delete(contact.id);
    }
  }

  closePopup(): void {
    this.popupVisible = false;
    this.selectedContact = null;
  }
}