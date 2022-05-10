import { Router } from 'koa-joi-router';
// eslint crash -_-
const { SwaggerAPI } = require('koa-joi-router-docs');

export const bindRoutesWithApiDocs = (targetRouter: Router, bindRouters: Router[]) => {
    const generator = new SwaggerAPI();

    bindRouters.forEach((router) => {
        generator.addJoiRouter(router);
        targetRouter.use(router.middleware());
    });

    const spec = generator.generateSpec(
        {
            info: {
                title: 'DDD Practice API',
                description: '',
                version: '1',
                contact: {
                    name: 'CH Hwang',
                    url: 'https://github.com/changchanghwang/playground',
                    email: 'hch950627@naver.com',
                },
            },
            basePath: '/',
            tags: [],
        },
        {
            defaultResponses: {}, // Custom default responses if you don't like default 200
        },
    );

    /**
     * Swagger JSON API
     */
    targetRouter.get('/api.json', async (ctx) => {
        ctx.body = JSON.stringify(spec, null, '  ');
    });

    /**
     * API documentation
     */
    targetRouter.get('/api-docs', async (ctx) => {
        ctx.body = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>DDD Practice API Documentation</title>
      <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
      <style>body{margin: 0;padding: 0;}</style>
    </head>
    <body>
      <redoc spec-url='/api.json' lazy-rendering></redoc>
      <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"></script>
    </body>
    </html>`;
    });
};
