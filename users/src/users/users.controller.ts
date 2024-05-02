import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UsersDto } from './users.dto';
import { userDomain } from './user.domain';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers(@Res() response: Response) {
    const users = await this.usersService.findAllUsers();
    return response.status(200).json(users);
  }

  //   @Get(':id')
  //   findAllUser(@Res() response: Response, @Param('id') id: string) {
  //     return response.status(200).json(this.usersService.findAllUsers());
  //   }

  @Post()
  async postUsers(@Res() response: Response, @Body() user: userDomain) {
    const userCreated = await this.usersService.createUser(user);
    return response.status(201).json(userCreated);
  }
}
