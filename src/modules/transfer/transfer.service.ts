import { CustomHttpException } from 'src/shared/errors/custom-exceptions';
import { UpdateTransfersDto } from './dtos/update-transfer.dto copy';
import { CreateTransfersDto } from './dtos/create-transfer.dto';
import { errorTypes } from 'src/shared/errors/error-types';
import { GetTransfersDto } from './dtos/get-transfer.dto';
import { Transfer } from './entities/transfer.entity';
import { User } from '../user/entities/user.entity';
import { Vehicle } from './entities/vehicle.entity';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private readonly transferRepository: Repository<Transfer>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    private readonly userService: UserService,
  ) {}
  getTransfers({
    organizationalUnitId,
    projectId,
  }: GetTransfersDto): Promise<Transfer[]> {
    return this.transferRepository.find({
      where: {
        project: { id: projectId },
        organizationalUnit: { id: organizationalUnitId },
      },
    });
  }

  async createTransfer(
    {
      vehicleId,
      organizationalUnitId,
      projectId,
      clientId,
      type,
    }: CreateTransfersDto,
    user: User,
  ): Promise<Transfer> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id: vehicleId },
    });
    if (!vehicle) {
      throw new CustomHttpException(errorTypes.VEHICLE_NOT_FOUND, {
        message: 'Vehicle not found',
        vehicleId,
      });
    }
    const client = await this.userService.findUser({ id: clientId });
    if (!client) {
      throw new CustomHttpException(errorTypes.USER_NOT_FOUND, {
        message: 'Client not found',
        clientId,
      });
    }
    const organizationalUnit = { id: organizationalUnitId };
    const project = { id: projectId };
    const newTransfer = this.transferRepository.create({
      vehicle,
      transmitter: user,
      organizationalUnit,
      project,
      client,
      type,
    });
    const response = await this.transferRepository.insert(newTransfer);
    return response.raw[0];
  }

  async deleteTransfer(id: number): Promise<void> {
    await this.transferRepository.delete(id);
  }

  async findTransfer(transfer: Partial<Transfer>): Promise<Transfer> {
    return this.transferRepository.findOne({
      where: transfer,
      relations: [
        'vehicle',
        'client',
        'transmitter',
        'organizationalUnit',
        'project',
        'project.organizationalUnits',
      ],
    });
  }

  async updateTransfer(
    id: number,
    data: UpdateTransfersDto,
  ): Promise<Transfer> {
    const transfer = await this.findTransfer({ id });
    if (!transfer) {
      throw new CustomHttpException(errorTypes.TRANSFER_NOT_FOUND, {
        message: 'Transfer not found',
        transferId: id,
      });
    }
    const updatedTransfer = this.transferRepository.merge(transfer, {
      client: { id: data.clientId },
      organizationalUnit: { id: data.organizationalUnitId },
      project: { id: data.projectId },
      vehicle: { id: data.vehicleId },
      type: data.type,
      transmitter: { id: data.transmitterId },
    });
    await this.transferRepository.save(updatedTransfer);
    return updatedTransfer;
  }
}
