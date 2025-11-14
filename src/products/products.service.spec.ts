import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { DataSource } from 'typeorm';
import { ProductQueryDto, ReportQueryDto } from './dto/product.query.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockQuery: ProductQueryDto = {
    page: 1,
    limit: 10,
    minPrice: 10.0,
    maxPrice: 1000.0,
    category: 'Category 1',
    name: 'Product 1',
    color: 'Color 1',
    brand: 'Brand 1',
    minStock: 100,
    maxStock: 1000,
  };
  const mockProducts = [
    {
        id: 'uuid',
        name: 'Product 1',
        brand: 'Brand 1',
        model: 'Model 1',
        category: 'Category 1',
        color: 'Color 1',
        price: 100,
        currency: 'USD',
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
      id: 'uuid2',
      name: 'Product 2',
      brand: 'Brand 2',
      model: 'Model 2',
      category: 'Category 2',
      color: 'Color 2',
      price: 200,
      currency: 'USD',
      stock: 200,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'uuid3',
      name: 'Product 3',
      brand: 'Brand 3',
      model: 'Model 3',
      category: 'Category 3',
      color: 'Color 3',
      price: 300,
      currency: 'USD',
      stock: 300,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'uuid4',
      name: 'Product 4',
      brand: 'Brand 4',
      model: 'Model 4',
      category: 'Category 4',
      color: 'Color 4',
      price: 400,
      currency: 'USD',
      stock: 400,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'uuid5',
      name: 'Product 5',
      brand: 'Brand 5',
      model: 'Model 5',
      category: 'Category 5',
      color: 'Color 5',
      price: 500,
      currency: 'USD',
      stock: 500,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'uuid6',
      name: 'Product 6',
      brand: 'Brand 6',
      model: 'Model 6',
      category: 'Category 6',
      color: 'Color 6',
      price: 600,
      currency: 'USD',
      stock: 600,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockDataSource = {
    createEntityManager: jest.fn(),
  } as unknown as DataSource;

  // Mock del query builder con métodos encadenables
  const createMockQueryBuilder = () => {
    const mockQueryBuilder = {
      andWhere: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
      getCount: jest.fn().mockResolvedValue(0),
      getRawMany: jest.fn(),
      withDeleted: jest.fn().mockReturnThis(),
    };
    return mockQueryBuilder;
  };

  const mockRepository = {
    save: jest.fn(),
    createQueryBuilder: jest.fn(),
    findOne: jest.fn(),
    softDelete: jest.fn(),
    count: jest.fn(),
    find: jest.fn(),
    getEntityPagination: jest.fn(),
    getCount: jest.fn(),
    withDeleted: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    // Resetear todos los mocks antes de cada test
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
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

    service = module.get<ProductsService>(ProductsService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    const mockQueryBuilder = createMockQueryBuilder();
    mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
    
    const mockPagination = {
      pagination: {
        page: 1,
        limit: 5,
        totalItems: mockProducts.length,
        totalPages: Math.ceil(mockProducts.length / 5),
      },
      data: mockProducts,
    };
    
    mockRepository.getEntityPagination.mockResolvedValue(mockPagination);

    const result = await service.findAll({});
    
    expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('product');
    expect(mockRepository.getEntityPagination).toHaveBeenCalledWith(mockQueryBuilder, 1, 5);
    expect(result).toEqual(mockPagination);
  });

  it('should return based on the query params', async () => {
    const mockQueryBuilder = createMockQueryBuilder();
    mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
    
    const filteredProducts = [mockProducts[0]];
    const mockPagination = {
      pagination: {
        page: 1,
        limit: 10,
        totalItems: filteredProducts.length,
        totalPages: 1,
      },
      data: filteredProducts,
    };
    
    mockRepository.getEntityPagination.mockResolvedValue(mockPagination);

    const result = await service.findAll(mockQuery);
    
    expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('product');
    expect(mockQueryBuilder.andWhere).toHaveBeenCalled();
    expect(mockRepository.getEntityPagination).toHaveBeenCalledWith(mockQueryBuilder, 1, 10);
    expect(result).toEqual(mockPagination);
  });

  it('should return an error if the minPrice is greater than the maxPrice', () => {
    const mockQueryError: ProductQueryDto = {
      minPrice: 1000.0,
      maxPrice: 10.0,
    };
    
    const mockQueryBuilder = createMockQueryBuilder();
    mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
    
    expect(() => service.findAll(mockQueryError)).toThrow(BadRequestException);
    expect(() => service.findAll(mockQueryError)).toThrow('minPrice must be less than maxPrice');
  });

  it('should return an error if the minStock is greater than the maxStock', () => {
    const mockQueryError: ProductQueryDto = {
      minStock: 1000,
      maxStock: 10,
    };
    expect(() => service.findAll(mockQueryError)).toThrow(BadRequestException);
    expect(() => service.findAll(mockQueryError)).toThrow('minStock must be less than maxStock');
  });


  it('should return an error if the from is greater than the to', async () => {
    const mockQueryError: ReportQueryDto = {
      from: new Date('2025-01-01'),
      to: new Date('2024-01-01'),
    };
    
    const mockQueryBuilder = createMockQueryBuilder();
    mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
    
    await expect(service.getNoDeletedProductsReport(mockQueryError)).rejects.toThrow(BadRequestException);
    await expect(service.getNoDeletedProductsReport(mockQueryError)).rejects.toThrow('from must be less than to');
  });

  it('should return the report', async () => {
    const mockQueryBuilder = createMockQueryBuilder();
    mockQueryBuilder.getCount
      .mockResolvedValueOnce(10)
      .mockResolvedValueOnce(100);
    
    mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
    
    const result = await service.getNoDeletedProductsReport({});
    
    expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('product');
    expect(mockQueryBuilder.getCount).toHaveBeenCalledTimes(2);
    expect(mockQueryBuilder.withDeleted).toHaveBeenCalled();
    expect(result).toEqual({
      productsNoDeleted: 10,
      totalProducts: 100,
      percentageNoDeleted: '10.00%',
    });
  });

  it('should return the report with price', async () => {
    const mockQueryBuilder = createMockQueryBuilder();
    mockQueryBuilder.getCount
      .mockResolvedValueOnce(10)
      .mockResolvedValueOnce(100);
    mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
    const result = await service.getNoDeletedProductsReport({ withPrice: 'Y' });
    expect(result).toEqual({
      productsNoDeleted: 10,
      totalProducts: 100,
      percentageNoDeleted: '10.00%',
    });
  });

  it('should return the report with price', async () => {
    const mockQueryBuilder = createMockQueryBuilder();
    mockQueryBuilder.getCount
      .mockResolvedValueOnce(10)
      .mockResolvedValueOnce(100);
    mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
    const result = await service.getNoDeletedProductsReport({ withPrice: 'N' });
    expect(result).toEqual({
      productsNoDeleted: 10,
      totalProducts: 100,
      percentageNoDeleted: '10.00%',
    });
  });

  
});