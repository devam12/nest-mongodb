import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './User/user.module';
import { PostsModule } from './Posts/post.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://devampanchasara:devam@cluster0.fy63oxu.mongodb.net/',
    ),
    UserModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
