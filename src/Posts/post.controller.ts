import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './post.service';
import { CreatePostDTO } from './dto/createPost.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createPost(@Body() createPostDto: CreatePostDTO) {
    return this.postsService.createPost(createPostDto);
  }
}
