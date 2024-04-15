import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schemas/Post.schemas';
import { User, userSchema } from 'src/schemas/User.shemas';
import { PostsController } from './post.controller';
import { PostsService } from './post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
      {
        name: User.name,
        schema: userSchema,
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
