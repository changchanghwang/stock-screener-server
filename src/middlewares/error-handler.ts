import { Context } from 'koa';
import { ValidationError } from '@hapi/joi';
import { isBoom } from '@hapi/boom';

interface TransformResponse {
  status: number;
  body: ResponseError;
}

interface ResponseError {
  errorMessage?: string;
}

const isJoi = (err: any): err is ValidationError => Boolean(err.isJoi);

const transformResponse = (err: Error): TransformResponse => {
  const rs: TransformResponse = {
    status: 500,
    body: {
      errorMessage: '',
    },
  };
  if (isBoom(err)) {
    const { statusCode } = err.output;
    const { errorMessage } = err.data ?? ({} as any);
    rs.status = statusCode;
    rs.body = {
      errorMessage: errorMessage ?? `Something went wrong and we couldn't complete your request.`,
    };
  } else if (isJoi(err)) {
    // Valdation Error
    rs.status = 400;
    rs.body = {
      errorMessage:
        process.env.NODE_ENV !== 'production'
          ? `Invalid request.\nPlease check the request value.\n${err.message}`
          : 'Invalid request.\nPlease check the request value.',
    };
  } else {
    rs.status = 500;
    rs.body = {
      errorMessage: 'An unexpected error has occurred. Please try again.',
    };
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error('[Error Handler]', err);
  }

  return rs;
};

/**
 *
 */
export const errorHandlerMiddleware = async (ctx: Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (err) {
    const response = transformResponse(err);
    ctx.status = response.status;
    const { errorMessage } = response.body;
    ctx.body = {
      errorMessage: errorMessage ?? 'An unexpected error has occurred. Please try again.',
    };
  }
};
