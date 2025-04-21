export interface PaymentMethod {
  id: number;
  cardName: string;
  cardHolderName: string;
  cardNumber: string;
  expiration: string;
  ccv: string;
}
