import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { MetaOption } from '../../meta-options/meta-option.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../post.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    public readonly postsRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    public readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async create(@Body() createPostDto: CreatePostDto) {
    // Create MetaOptions

    // const metaOptions = createPostDto.metaOptions
    //   ? this.metaOptionsRepository.create(createPostDto.metaOptions)
    //   : null;

    // if (metaOptions) {
    //   await this.metaOptionsRepository.save(metaOptions);
    // }

    // create post

    const post = this.postsRepository.create(createPostDto);

    // Add metaOptions to the post

    // if (metaOptions) {
    //   post.metaOptions = metaOptions;
    // }

    // return the post

    return await this.postsRepository.save(post);
  }

  public async findAll(userId: string) {
    const user = this.usersService.findOneById(userId);

    // const posts = await this.postsRepository.find({
    //   relations: {
    //     metaOptions: true,
    //   },
    // });
    const posts = await this.postsRepository.find({});

    return posts;
  }

  public async delete(id: number) {
    const post = await this.postsRepository.findOneBy({ id });

    await this.postsRepository.delete(id);

    await this.metaOptionsRepository.delete(post.metaOptions.id);

    return { deleted: true, id };
  }
}
