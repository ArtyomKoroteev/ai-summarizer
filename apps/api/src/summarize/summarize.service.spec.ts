import { SummarizeService } from './summarize.service';
import { GroqService } from './groq.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('SummarizeService', () => {
  let service: SummarizeService;
  let groqService: jest.Mocked<GroqService>;

  beforeEach(async () => {
    const mockGroqService = {
      complete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SummarizeService,
        {
          provide: GroqService,
          useValue: mockGroqService,
        },
      ],
    }).compile();

    service = module.get<SummarizeService>(SummarizeService);
    groqService = module.get(GroqService);
  });

  describe('summarize', () => {
    it('should return a summarized text', async () => {
      const mockResponse = JSON.stringify({
        title: 'Test Title',
        summary: ['point 1', 'point 2'],
        tags: ['tag1'],
      });
      groqService.complete.mockResolvedValue(mockResponse);

      const result = await service.summarize({
        text: 'test text',
        mode: 'bullets',
        language: 'en',
      });

      expect(result).toEqual({
        title: 'Test Title',
        summary: ['point 1', 'point 2'],
        tags: ['tag1'],
      });
    });
    it('should return correct response if prompt in bullets mode', async () => {
      const mockResponse = JSON.stringify({
        title: 'Test Title',
        summary: ['point 1', 'point 2'],
        tags: ['tag1'],
      });
      groqService.complete.mockResolvedValue(mockResponse);

      const result = await service.summarize({
        text: 'test text',
        mode: 'bullets',
        language: 'en',
      });

      expect(result).toEqual({
        title: 'Test Title',
        summary: ['point 1', 'point 2'],
        tags: ['tag1'],
      });
    });
    it('should return correct response if prompt in short mode', async () => {
      const mockResponse = JSON.stringify({
        title: 'Test Title',
        summary: ['point 1', 'point 2'],
        tags: ['tag1'],
      });
      groqService.complete.mockResolvedValue(mockResponse);
    });
    it('should return correct response if prompt in detailed mode', async () => {
      const mockResponse = JSON.stringify({
        title: 'Test Title',
        summary: ['point 1', 'point 2'],
        tags: ['tag1'],
      });
      groqService.complete.mockResolvedValue(mockResponse);
    });
    it('should return correct response if prompt in default mode', async () => {
      const mockResponse = JSON.stringify({
        title: 'Test Title',
        summary: ['point 1', 'point 2'],
        tags: ['tag1'],
      });
      groqService.complete.mockResolvedValue(mockResponse);
    });
    it('should return correct response if prompt in default mode', async () => {
      const mockResponse = JSON.stringify({
        title: 'Test Title',
        summary: ['point 1', 'point 2'],
        tags: ['tag1'],
      });
      groqService.complete.mockResolvedValue(mockResponse);
    });
  });
});
