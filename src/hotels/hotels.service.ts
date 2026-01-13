import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HotelStatus } from '../../generated/prisma';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateHotelDto) {
    try {
      return await this.prisma.hotel.create({
        data: {
          name: data.name,
          status: data.status || HotelStatus.STANDARD,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(`Hotel with name "${data.name}" already exists`);
      }
      throw error;
    }
  }

  async findAll(status?: HotelStatus) {
    return await this.prisma.hotel.findMany({
      where: status ? { status } : undefined,
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id },
    });

    if (!hotel) {
      throw new NotFoundException(`Hotel with ID "${id}" not found`);
    }

    return hotel;
  }

  async update(id: string, data: UpdateHotelDto) {
    try {
      return await this.prisma.hotel.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Hotel with ID "${id}" not found`);
      }
      if (error.code === 'P2002') {
        throw new ConflictException(`Hotel with name "${data.name}" already exists`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.hotel.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Hotel with ID "${id}" not found`);
      }
      throw error;
    }
  }
}
