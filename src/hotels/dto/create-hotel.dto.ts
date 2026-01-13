import { HotelStatus } from '../../../generated/prisma';

export class CreateHotelDto {
  name: string;
  status?: HotelStatus;
}
