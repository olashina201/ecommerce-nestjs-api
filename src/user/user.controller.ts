/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { IsAdmin } from 'src/common/decorators/is-admin.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWithoutPassword } from './entities/user-without-password.entity';
import { UserService } from './user.service';

/** Exposes user CRUD endpoints */
@ApiTags('user')
@Controller('user')
export class UserController {
  /** Exposes user CRUD endpoints
   *
   * Instantiate class and UserService dependency
   */
  constructor(private readonly userService: UserService) {}

  /** Creates a new user */
  @ApiOperation({ summary: 'Creates a new user' })
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.create(createUserDto);
  }

  /** Returns user's own profile information without password */
  @ApiOperation({ summary: "Gets user's own profile" })
  @ApiBearerAuth()
  @Get()
  async findById(@Query('id') userId: string,): Promise<UserWithoutPassword> {

    return this.userService.findById(userId);
  }

  /** Updates user information */
  @ApiOperation({ summary: 'Updates user' })
  @ApiBearerAuth()
  @Patch()
  update(
    @Query('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {

    return this.userService.update(userId, updateUserDto);
  }

  /** Updates user role, only for admins */
  @ApiOperation({ summary: "Admin set user's role" })
  @IsAdmin()
  @Patch('role')
  updateUserRole(
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserWithoutPassword> {
    return this.userService.updateUserRole(updateUserRoleDto);
  }

  /** Deletes user and all user related information from the system */
  @ApiOperation({ summary: 'Deletes user' })
  @ApiBearerAuth()
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Query('id') userId: string,
    @Body() deleteUserDto: DeleteUserDto,
  ): Promise<void> {
    return this.userService.remove(userId, deleteUserDto);
  }
}
