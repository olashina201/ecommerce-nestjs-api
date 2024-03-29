import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdmin } from 'src/common/decorators/is-admin.decorator';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { FindPurchasesDto } from './dto/find-purchases.dto';
import { ReviewPurchaseDto } from './dto/review-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { PurchaseService } from './purchase.service';

/** Exposes purchase CRUD endpoints */
@ApiTags('purchase')
@Controller('purchase')
export class PurchaseController {
  /** Exposes purchase CRUD endpoints
   *
   * Instantiate class and PurchaseService dependency
   */
  constructor(private readonly purchaseService: PurchaseService) {}

  /** Creates a new purchase, only for logged users */
  @ApiOperation({ summary: 'Creates a new purchase' })
  @ApiBearerAuth()
  @Post()
  async create(
    @Query() userId: string,
    @Body() createPurchaseDto: CreatePurchaseDto,
  ): Promise<Purchase> {
    return this.purchaseService.create(userId, createPurchaseDto);
  }

  /** Returns all purchases with pagination, only for admins
   */
  @ApiOperation({ summary: 'Admin gets all purchases' })
  @IsAdmin()
  @Get('/admin')
  async findAll(
    @Query() findPurchasesDto: FindPurchasesDto,
  ): Promise<Purchase[]> {
    return this.purchaseService.findAll(findPurchasesDto);
  }

  /** Returns all users' purchases with pagination,
   */
  @ApiOperation({ summary: 'User gets all their purchases' })
  @ApiBearerAuth()
  @Get()
  async findAllMine(
    @Query() userId: string,
    @Query() findPurchasesDto: FindPurchasesDto,
  ): Promise<Purchase[]> {
    findPurchasesDto.userId = userId;

    return this.purchaseService.findAll(findPurchasesDto);
  }

  /** Find purchase by ID, normal users can only get their purchases,
   * Admins can get any.
   */
  @ApiOperation({ summary: 'Returns purchase by ID' })
  @ApiBearerAuth()
  @Get(':id')
  async findOne(
    @Query('userId') userId: string,
    @Query('userRole') userRole: string,
    @Param('id') purchaseId: string,
  ): Promise<Purchase> {
    return this.purchaseService.findOne(purchaseId, userId, userRole);
  }

  /** Reviews purchased product, must be purchase owner */
  @ApiOperation({ summary: 'Reviews purchased product' })
  @ApiBearerAuth()
  @Patch('/review/:id')
  async review(
    @Query('id') userId: string,
    @Query('purchaseId') purchaseId: string,
    @Body() reviewPurchaseDto: ReviewPurchaseDto,
  ): Promise<Purchase> {
    return this.purchaseService.review(userId, purchaseId, reviewPurchaseDto);
  }

  /** Updates purchase information, only for admins */
  @ApiOperation({ summary: 'Admin updates purchase' })
  @IsAdmin()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ): Promise<Purchase> {
    return this.purchaseService.update(id, updatePurchaseDto);
  }

  /** Deletes purchase from database, only for admins */
  @ApiOperation({ summary: 'Admin deletes purchase' })
  @IsAdmin()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.purchaseService.remove(id);
  }
}
