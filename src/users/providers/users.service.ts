import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public findAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    console.log(limit, page);

    const isAuth = this.authService.isAuth();
    console.log(isAuth);

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

  public findOneById(id: string) {
    return {
      id: id,
      firstName: 'Ahmed',
      email: 'pollob@gmail.com',
    };
  }
}
