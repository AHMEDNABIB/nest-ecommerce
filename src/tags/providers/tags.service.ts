import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { Tag } from '../tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}
  public async create(createTagDto: CreateTagDto) {
    const tag = this.tagsRepository.create(createTagDto);
    return await this.tagsRepository.save(tag);
  }
}
