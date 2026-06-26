import { Injectable } from '@angular/core';
import { Contact, ContactFormData } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class AddressBookService {
  private nextId = 4;

  addressBookList: Contact[] = [
    {
      id: 1,
      name: 'Aisyah Rahman',
      email: 'aisyah.rahman@example.com',
      phone: '0123456789',
      street: '18 Jalan Ampang',
      state: 'Kuala Lumpur',
      postcode: '50450',
      description: 'Project coordinator',
    },
    {
      id: 2,
      name: 'Daniel Lee',
      email: 'daniel.lee@example.com',
      phone: '0177788990',
      street: '42 Jalan SS 2/24',
      state: 'Selangor',
      postcode: '47300',
      description: 'Supplier contact',
    },
    {
      id: 3,
      name: 'Nur Iman',
      email: 'nur.iman@example.com',
      phone: '0192233445',
      street: '7 Lebuh Pantai',
      state: 'Pulau Pinang',
      postcode: '10300',
      description: 'Design team',
    },
  ];

  readonly stateList: string[] = [
    'Johor',
    'Kedah',
    'Kelantan',
    'Melaka',
    'Negeri Sembilan',
    'Pahang',
    'Perak',
    'Perlis',
    'Pulau Pinang',
    'Sabah',
    'Sarawak',
    'Selangor',
    'Terengganu',
    'Kuala Lumpur',
    'Labuan',
    'Putrajaya',
  ];

  insert(contact: ContactFormData): Contact {
    const newContact: Contact = {
      id: this.nextId++,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      street: contact.street,
      state: contact.state,
      postcode: contact.postcode,
      description: contact.description,
    };

    this.addressBookList = [...this.addressBookList, newContact];

    return newContact;
  }

  update(contact: Contact): boolean {
    const contactExists = this.addressBookList.some(
      (item) => item.id === contact.id,
    );

    if (!contactExists) {
      return false;
    }

    this.addressBookList = this.addressBookList.map((item) =>
      item.id === contact.id ? { ...contact } : item,
    );

    return true;
  }

  delete(id: number): boolean {
    const originalLength = this.addressBookList.length;

    this.addressBookList = this.addressBookList.filter(
      (contact) => contact.id !== id,
    );

    return this.addressBookList.length < originalLength;
  }
}