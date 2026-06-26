export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  street: string;
  state: string;
  postcode: string;
  description: string;
}

export type ContactFormData = Omit<Contact, 'id'> & {
  id?: number;
};