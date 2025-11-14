import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the token', async () => {
    const mockToken = 'mock-jwt-token';
    mockJwtService.sign.mockReturnValue(mockToken);
    
    const result = await service.generateToken();
    
    expect(result).toBe(mockToken);
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      sub: 'your logged in user ;)',
      email: 'your email ;)',
    });
  });
});
