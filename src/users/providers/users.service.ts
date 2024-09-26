import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
@Injectable()
export class UsersService {
  public findAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    console.log(limit, page);
    return [
      {
        firstName: 'Ahmed Nabib',
        email: 'nabibpallab@gmail.com',
      },
      {
        firstName: 'Ahmed Rakib',
        email: 'rakib@gmail.com',
      },
    ];
  }
}
