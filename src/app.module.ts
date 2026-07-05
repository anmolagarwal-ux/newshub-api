import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'Database/database.module';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './Login/login.module';
import { ContactUsModule } from './ContactUs/contactUs.module';
import { CategoryModule } from './Category/category.module';
import { RoleModule } from './Role/role.module';
import { UserModule } from './User/user.module';
import { DashboardModule } from './Dashboard/dashboard.module';
import { StatusModule } from './Status/status.module';
import { PublishArticleModule } from './PublishArticle/publishArticle.module';
import { ArticleModule } from './Article/article.module';

@Module({
  imports: [
    DatabaseModule ,
    AuthModule ,
    LoginModule ,
    ContactUsModule , 
    CategoryModule ,
    RoleModule,
    UserModule,
    DashboardModule,
    StatusModule,
    PublishArticleModule,
    ArticleModule,
    
    ConfigModule.forRoot({
      isGlobal: true,
    })],
  controllers: [ ],
  providers: [],
})
export class AppModule {}