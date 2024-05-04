export interface Hotelroom {
  id: number;
  name: string;
  hotelId: number;
  pricePerNight: number;
  available: boolean;
  maximumGuests: number;
  roomTypeId: number;
  bookedDates: BookedDate[];
  images: Image[];
}

export interface BookedDate {
  id: number;
  date: string;
  roomId: number;
}

export interface Image {
  id: number;
  source: string;
  roomId: number;
}
export interface PostType {
  id: number;
  roomID: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  isConfirmed: boolean;
  customerName: string;
  customerId: string;
  customerPhone: string;
}
