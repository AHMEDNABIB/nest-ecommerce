import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { User } from '../user.entity';
@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // check if the user exist
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    // Create a new User

    let newuser = this.userRepository.create(createUserDto);
    newuser = await this.userRepository.save(newuser);

    return newuser
  }

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
