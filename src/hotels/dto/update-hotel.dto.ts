import { HotelStatus } from '../../../generated/prisma';

export class UpdateHotelDto {
  name?: string;
  status?: HotelStatus;
}
