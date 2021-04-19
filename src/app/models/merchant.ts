export interface Merchant {
  type: keyof typeof String;
  name: keyof typeof String;
  minAmount: number;
  maxAmount: number;
  image: string;
  website: string;
}
