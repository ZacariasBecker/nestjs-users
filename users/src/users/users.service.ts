import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { UsersDto } from './users.dto';
import { userDomain } from './user.domain';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findAllUsers(): Promise<Users[]> {
    const users = await this.usersRepository.find();

    if (users.length === 0)
      throw new HttpException('Users not found!', HttpStatus.NOT_FOUND);

    return users;
  }

  async createUser(user: userDomain): Promise<userDomain> {
    const createdUser = await this.usersRepository.save(user);
    return createdUser;
  }
}
