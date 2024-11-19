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
    const author = await this.usersService.findOneById(createPostDto.authorId);

    // Create the post
    const post = this.postsRepository.create({
      ...createPostDto,
      author: author,
    });

    return await this.postsRepository.save(post);
  }

  public async findAll() {
    // const posts = await this.postsRepository.find({
    //   relations: {
    //     metaOptions: true,
    //     author: true,
    //   },
    // });
    const posts = await this.postsRepository.find({});

    return posts;
  }

  public async delete(id: number) {
    // const post = await this.postsRepository.findOneBy({ id });

    // await this.postsRepository.delete(id);

    // await this.metaOptionsRepository.delete(post.metaOptions.id);

    // return { deleted: true, id };

    // const inversePost = await this.metaOptionsRepository.find({
    //   where: { id: post.metaOptions.id },
    //   relations: {
    //     post: true,
    //   },
    // });
    // console.log(inversePost);

    await this.postsRepository.delete(id);

    return { deleted: true, id };
  }
}
