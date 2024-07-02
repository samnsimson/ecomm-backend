import { Test, TestingModule } from '@nestjs/testing';
import { QueryClientService } from './query-client.service';

describe('QueryClientService', () => {
  let service: QueryClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryClientService],
    }).compile();

    service = module.get<QueryClientService>(QueryClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
