export interface AddressDto {
  id?: number;
  customerEmail?: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  postalCode: string;
  country: string;
  type: string;
}
