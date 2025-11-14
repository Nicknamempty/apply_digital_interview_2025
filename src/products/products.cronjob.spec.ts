import { Test, TestingModule } from "@nestjs/testing";
import { ProductsCronjob } from "./products.cronjob";
import { ProductsService } from "./products.service";
import { HttpService } from "@nestjs/axios";
import { ProductsRepository } from "./products.repository";
import { DataSource } from "typeorm";

describe('ProductsCronjob', () => {
  let cronjob: ProductsCronjob;
  let service: ProductsService;
  let httpService: HttpService;

  const mockDataSource = {
    createEntityManager: jest.fn(),
  } as unknown as DataSource;

  const mockRepository = {
    save: jest.fn(),
    createQueryBuilder: jest.fn(),
    findOne: jest.fn(),
    softDelete: jest.fn(),
    count: jest.fn(),
    find: jest.fn(),
    getEntityPagination: jest.fn(),
  };

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockProductsService = {
    bulkCreate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsCronjob,
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: ProductsRepository,
          useValue: mockRepository,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    cronjob = module.get<ProductsCronjob>(ProductsCronjob);
    service = module.get<ProductsService>(ProductsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(cronjob).toBeDefined();
  });

  it('should add a product', async () => {
    mockProductsService.bulkCreate.mockResolvedValue([]);
    
    const result = await cronjob.addProduct();
    
    expect(result).toBeUndefined();
    expect(mockProductsService.bulkCreate).toHaveBeenCalled();
  });

  it('should handle error if the product is not added', async () => {
    const error = new Error('Product not added');
    mockProductsService.bulkCreate.mockRejectedValue(error);
    const result = await cronjob.addProduct();
    
    expect(result).toBeUndefined();
    expect(mockProductsService.bulkCreate).toHaveBeenCalled();
  });   
});