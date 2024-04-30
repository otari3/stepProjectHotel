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
