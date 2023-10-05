import { buildTemplatedApiExceptionDecorator } from '@nanogiants/nestjs-swagger-api-exception-decorator';

export const TemplateApiException = buildTemplatedApiExceptionDecorator({
  code: '$code',
  message: '$description',
  statusCode: '$status',
});
