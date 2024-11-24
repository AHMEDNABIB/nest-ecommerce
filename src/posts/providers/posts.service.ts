import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/providers/tags.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
// import { MetaOption } from '../../meta-options/meta-option.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { Post } from '../post.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    // @InjectRepository(MetaOption)
    // private readonly metaOptionsRepository: Repository<MetaOption>,

    private readonly tagsService: TagsService,
  ) {}

  public async create(@Body() createPostDto: CreatePostDto) {
    const author = await this.usersService.findOneById(createPostDto.authorId);

    const tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    // Create the post
    const post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    return await this.postsRepository.save(post);
  }

  public async update(patchPostDto: PatchPostDto) {
    // Find new tags
    let tags = await this.tagsService.findMultipleTags(patchPostDto.tags);

    // Find the post
    let post = await this.postsRepository.findOneBy({
      id: patchPostDto.id,
    });

    // Update post related properties
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    // Update the tags
    post.tags = tags;

    return await this.postsRepository.save(post);
  }

  public async findAll() {
    // const posts = await this.postsRepository.find({
    //   relations: {
    //     metaOptions: true,
    //     author: true,
    //   },
    // });
    const posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
        // tags: true,
      },
    });

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
