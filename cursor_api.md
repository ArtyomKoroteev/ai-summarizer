# Стратегия юнит-тестирования API
_Exported on 29/01/2026 at 22:39:20 CET from Cursor (2.4.21)_

---

**User**

@apps/api что мне стоит покрыть здесь юнит тестами и как?

---

**Cursor**

Давай изучу структуру твоего API, чтобы дать конкретные рекомендации по юнит-тестам.

## Что покрывать юнит-тестами:

### 1. **SummarizeService** (приоритет #1)
Это ключевой сервис с бизнес-логикой. Покрываем:

```typescript
// summarize.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { SummarizeService } from './summarize.service';
import { GroqService } from './groq.service';

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
    it('должен вернуть распарсенный результат', async () => {
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
      });
    });

    it('должен обработать ответ без title', async () => {
      const mockResponse = JSON.stringify({
        summary: ['point 1'],
      });
      groqService.complete.mockResolvedValue(mockResponse);

      const result = await service.summarize({
        text: 'test',
        mode: 'short',
        language: 'ru',
      });

      expect(result.title).toBe('');
      expect(result.summary).toEqual(['point 1']);
    });

    it('должен передать правильный промпт для режима bullets', async () => {
      groqService.complete.mockResolvedValue(
        JSON.stringify({ summary: [] }),
      );

      await service.summarize({
        text: 'test text',
        mode: 'bullets',
        language: 'en',
      });

      expect(groqService.complete).toHaveBeenCalledWith(
        expect.stringContaining('Extract 3–7 key ideas as short bullet points'),
      );
      expect(groqService.complete).toHaveBeenCalledWith(
        expect.stringContaining('Language: en'),
      );
      expect(groqService.complete).toHaveBeenCalledWith(
        expect.stringContaining('test text'),
      );
    });

    it('должен передать правильный промпт для режима short', async () => {
      groqService.complete.mockResolvedValue(
        JSON.stringify({ summary: [] }),
      );

      await service.summarize({
        text: 'test',
        mode: 'short',
        language: 'ru',
      });

      expect(groqService.complete).toHaveBeenCalledWith(
        expect.stringContaining(
          'Summarize the text into a single short paragraph',
        ),
      );
    });

    it('должен передать правильный промпт для режима detailed', async () => {
      groqService.complete.mockResolvedValue(
        JSON.stringify({ summary: [] }),
      );

      await service.summarize({
        text: 'test',
        mode: 'detailed',
        language: 'en',
      });

      expect(groqService.complete).toHaveBeenCalledWith(
        expect.stringContaining(
          'Create a structured summary with sections and bullet points',
        ),
      );
    });
  });
});
```

### 2. **SummarizeController** (приоритет #2)

```typescript
// summarize.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { SummarizeController } from './summarize.controller';
import { SummarizeService } from './summarize.service';

describe('SummarizeController', () => {
  let controller: SummarizeController;
  let service: jest.Mocked<SummarizeService>;

  beforeEach(async () => {
    const mockService = {
      summarize: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummarizeController],
      providers: [
        {
          provide: SummarizeService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<SummarizeController>(SummarizeController);
    service = module.get(SummarizeService);
  });

  describe('summarize', () => {
    it('должен вернуть результат суммаризации', async () => {
      const mockResult = {
        title: 'Test',
        summary: ['point 1'],
      };
      service.summarize.mockResolvedValue(mockResult);

      const result = await controller.summarize({
        text: 'test text',
        mode: 'bullets',
        language: 'en',
      });

      expect(result).toEqual(mockResult);
      expect(service.summarize).toHaveBeenCalledWith({
        text: 'test text',
        mode: 'bullets',
        language: 'en',
      });
    });

    it('должен бросить BadRequestException если request пустой', async () => {
      await expect(controller.summarize(null as any)).rejects.toThrow(
        BadRequestException,
      );
      await expect(controller.summarize(undefined as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
```

### 3. **GroqService** (опционально, но полезно)

```typescript
// groq.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { GroqService } from './groq.service';

describe('GroqService', () => {
  let service: GroqService;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const mockConfigService = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroqService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    configService = module.get(ConfigService);
  });

  it('должен бросить ошибку если AI_API_KEY не установлен', () => {
    configService.get.mockReturnValue(undefined);

    expect(() => {
      const module = Test.createTestingModule({
        providers: [
          GroqService,
          {
            provide: ConfigService,
            useValue: configService,
          },
        ],
      }).compile();
    }).rejects.toThrow('AI_API_KEY is not set in environment variables');
  });

  it('должен инициализироваться с дефолтной моделью', () => {
    configService.get.mockImplementation((key: string) => {
      if (key === 'AI_API_KEY') return 'test-key';
      if (key === 'AI_MODEL') return undefined;
    });

    // Проверяем что сервис создается без ошибок
    expect(() => {
      new GroqService(configService);
    }).not.toThrow();
  });

  it('должен использовать кастомную модель из конфига', () => {
    configService.get.mockImplementation((key: string) => {
      if (key === 'AI_API_KEY') return 'test-key';
      if (key === 'AI_MODEL') return 'custom-model';
    });

    const service = new GroqService(configService);
    expect(configService.get).toHaveBeenCalledWith('AI_MODEL');
  });
});
```

## Запуск тестов:

```bash
# Все юнит-тесты
pnpm test

# С coverage
pnpm test:cov

# Watch mode
pnpm test:watch

# Конкретный файл
pnpm test summarize.service.spec
```

## Приоритеты:
1. **SummarizeService** - самая важная бизнес-логика (buildPrompt, buildInstructions, parseResponse)
2. **SummarizeController** - валидация и обработка ошибок
3. **GroqService** - конфигурация (для complete лучше e2e тесты, т.к. там внешний API)

---

**User**

это юнит тесты или интеграционные?

---

**Cursor**

Это **юнит-тесты**. Вот почему:

## Юнит (что я предложил):
- Каждый сервис/контроллер тестируется **изолированно**
- Все зависимости **замокированы** (jest.fn(), useValue)
- Не поднимается NestJS приложение целиком
- Не делаются реальные HTTP запросы
- Не вызывается реальный Groq API
- Быстрые, дешевые, можно запускать постоянно

```typescript
// Mock зависимости = юнит-тест
{
  provide: GroqService,
  useValue: mockGroqService, // <-- не реальный сервис
}
```

## Интеграционные (у тебя уже есть пример в `test/app.e2e-spec.ts`):
- Тестируют **взаимодействие компонентов**
- Поднимается реальное приложение через `Test.createTestingModule` со всеми модулями
- Делаются HTTP запросы через supertest
- Могут мокировать только внешние API (Groq), но все внутренние сервисы реальные

Пример интеграционного теста для твоего API:

```typescript
// test/summarize.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { GroqService } from '../src/summarize/groq.service';

describe('Summarize (e2e)', () => {
  let app: INestApplication;
  let groqService: GroqService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // <-- весь модуль целиком
    })
      .overrideProvider(GroqService) // мокируем только внешний API
      .useValue({
        complete: jest.fn().mockResolvedValue(
          JSON.stringify({ title: 'Test', summary: ['point'] }),
        ),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    groqService = moduleFixture.get<GroqService>(GroqService);
  });

  it('/ai/summarize (POST)', () => {
    return request(app.getHttpServer())
      .post('/ai/summarize')
      .send({
        text: 'test text',
        mode: 'bullets',
        language: 'en',
      })
      .expect(200)
      .expect({
        title: 'Test',
        summary: ['point'],
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
```

## Что выбрать:
- **Юнит** (мои примеры) - для логики в SummarizeService, валидации в контроллере
- **Интеграционные** - для проверки всего flow через HTTP endpoint

Обычно делают оба: юниты для покрытия всех кейсов + пару e2e для happy path.

