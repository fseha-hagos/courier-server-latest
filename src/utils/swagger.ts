import swaggerJsdoc from 'swagger-jsdoc';
import { config } from './config';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Courier Server API',
      version: '1.0.0',
      description: `
## Overview
Modern API for managing deliveries, packages, and delivery personnel.

### Features
- Real-time package tracking
- Delivery person management
- Customer management
- Admin operations
- Analytics and reporting

### Authentication
All endpoints require JWT authentication. Include the token in the Authorization header:
\`\`\`
Authorization: Bearer <your_token>
\`\`\`

### Rate Limiting
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users
      `,
      contact: {
        name: 'API Support',
        email: 'support@courier-server.com',
        url: 'https://courier-server.com/support',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: 'Packages',
        description: 'Package management operations',
      },
      {
        name: 'Delivery Persons',
        description: 'Delivery person management',
      },
      {
        name: 'Deliveries',
        description: 'Delivery operations and tracking',
      },
      {
        name: 'Users',
        description: 'User management operations',
      },
      {
        name: 'Admin',
        description: 'Administrative operations',
      },
      {
        name: 'Customers',
        description: 'Customer management',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

// Custom Swagger UI configuration
export const swaggerUiOptions = {
  customCss: `
    /* Color palette */
    :root {
      --bg-primary: #1a1a1a;
      --bg-secondary: #242424;
      --bg-tertiary: #2a2a2a;
      --bg-parameters: #202020;
      --bg-scheme-container: #1a1a1a;
      --bg-modal: #1e1e1e;  /* Darker background for modals */
      
      --text-primary: #f5f5f5;
      --text-secondary: #d0d0d0;
      --text-muted: #a0a0a0;
      --text-path: #ffffff;
      
      --border-color: #383838;
      
      --method-get: #5aa9fa;
      --method-post: #4ac088;
      --method-put: #f0b858;
      --method-delete: #fa5c5c;
      
      --accent-primary: #5aa9fa;
      --accent-success: #4ac088;
    }

    /* Base theme */
    body, html {
      background: var(--bg-primary);
      color: var(--text-primary);
    }
    body > * {
      background: var(--bg-primary) !important;
    }
    .swagger-ui {
      color: var(--text-primary);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    /* Apply text color to all elements */
    .swagger-ui * {
      color: var(--text-primary) !important;
    }

    /* Scheme container */
    .swagger-ui .scheme-container {
      background: var(--bg-scheme-container) !important;
    }

    /* Authorize modal */
    .swagger-ui .dialog-ux .modal-ux {
      background: var(--bg-modal) !important;
      color: var(--text-primary);
      border: 1px solid var(--border-color);
    }
    .swagger-ui .dialog-ux .modal-ux-header {
      background: var(--bg-secondary);
      color: var(--text-primary);
    }
    .swagger-ui .dialog-ux .modal-ux-content {
      color: var(--text-primary);
    }

    /* Main content */
    .swagger-ui .info {
      margin: 40px 0;
    }
    .swagger-ui .info .title {
      color: var(--text-primary);
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 16px;
    }
    .swagger-ui .info .description {
      color: var(--text-secondary);
      font-size: 15px;
      line-height: 1.6;
    }
    .swagger-ui .info h2 {
      color: var(--text-primary);
      font-size: 22px;
      margin: 24px 0 12px;
    }
    .swagger-ui .info h3 {
      color: var(--text-primary);
      font-size: 18px;
      margin: 20px 0 10px;
    }
    .swagger-ui .info code {
      background: var(--bg-tertiary);
      color: var(--text-primary);
      padding: 3px 6px;
      border-radius: 3px;
    }
    .swagger-ui .info a {
      color: var(--accent-primary);
    }

    /* Tags */
    .swagger-ui .opblock-tag {
      color: var(--text-primary);
      font-size: 20px;
      border: none;
      margin: 24px 0 12px;
      padding: 0;
      background: transparent;
    }
    .swagger-ui .opblock-tag:hover {
      background: transparent;
      color: var(--accent-primary);
    }
    .swagger-ui .opblock-tag small {
      color: var(--text-muted);
      font-size: 14px;
    }

    /* Endpoints */
    .swagger-ui .opblock {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      margin: 0 0 8px;
    }
    .swagger-ui .opblock:hover {
      border-color: var(--text-muted);
    }
    .swagger-ui .opblock-summary {
      padding: 12px;
      border: none;
    }
    .swagger-ui .opblock-summary-path {
      color: var(--text-path);
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.3px;
    }
    .swagger-ui .opblock-summary-path:hover {
      color: var(--accent-primary);
    }
    .swagger-ui .opblock-summary-path__deprecated {
      color: var(--text-muted);
    }
    .swagger-ui .opblock-summary-description {
      color: var(--text-secondary);
      font-size: 13px;
      padding-top: 4px;
    }

    /* HTTP Methods */
    .swagger-ui .opblock.opblock-get {
      border-left: 4px solid var(--method-get);
    }
    .swagger-ui .opblock.opblock-post {
      border-left: 4px solid var(--method-post);
    }
    .swagger-ui .opblock.opblock-put {
      border-left: 4px solid var(--method-put);
    }
    .swagger-ui .opblock.opblock-delete {
      border-left: 4px solid var(--method-delete);
    }

    /* Method labels */
    .swagger-ui .opblock .opblock-summary-method {
      min-width: 80px;
      text-align: center;
      font-weight: 600;
      font-size: 13px;
      border-radius: 4px;
      padding: 6px 0;
    }
    .swagger-ui .opblock-get .opblock-summary-method { background: var(--method-get); }
    .swagger-ui .opblock-post .opblock-summary-method { background: var(--method-post); }
    .swagger-ui .opblock-put .opblock-summary-method { background: var(--method-put); }
    .swagger-ui .opblock-delete .opblock-summary-method { background: var(--method-delete); }

    /* Parameters */
    .swagger-ui .parameters-container {
      background: var(--bg-parameters) !important;
    }
    .swagger-ui .opblock-section-header {
      background: var(--bg-parameters) !important;
      border-bottom: 1px solid var(--border-color);
    }
    .swagger-ui .opblock-section {
      background: var(--bg-parameters) !important;
    }
    .swagger-ui .parameters-col_name {
      color: var(--text-primary);
      font-weight: 500;
      font-size: 14px;
    }
    .swagger-ui .parameters-col_description {
      color: var(--text-secondary);
      font-size: 13px;
    }
    .swagger-ui .parameter__name {
      color: var(--text-primary);
      font-weight: 500;
    }
    .swagger-ui .parameter__type,
    .swagger-ui .parameter__extension,
    .swagger-ui .parameter__in {
      color: var(--text-muted);
      font-size: 12px;
    }

    /* Input fields */
    .swagger-ui input,
    .swagger-ui select,
    .swagger-ui textarea {
      background: var(--bg-tertiary);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      padding: 8px 12px;
      font-size: 14px;
    }
    .swagger-ui input:focus,
    .swagger-ui select:focus,
    .swagger-ui textarea:focus {
      border-color: var(--accent-primary);
      outline: none;
    }
    .swagger-ui input[type=text],
    .swagger-ui textarea {
      background: var(--bg-tertiary) !important;
    }

    /* Buttons */
    .swagger-ui .btn {
      background: var(--bg-tertiary);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
    }
    .swagger-ui .btn:hover {
      background: var(--bg-secondary);
      border-color: var(--text-muted);
    }
    .swagger-ui .btn.execute {
      background: var(--accent-primary);
      color: white;
      border: none;
    }
    .swagger-ui .btn.execute:hover {
      opacity: 0.9;
    }
    .swagger-ui .btn.authorize {
      background: var(--accent-success);
      color: white;
      border: none;
    }
    .swagger-ui .btn.authorize:hover {
      opacity: 0.9;
    }

    /* Tables */
    .swagger-ui table {
      background: var(--bg-secondary);
    }
    .swagger-ui table thead tr td,
    .swagger-ui table thead tr th {
      color: var(--text-primary);
      font-size: 13px;
      padding: 10px 12px;
      border-bottom: 1px solid var(--border-color);
      background: var(--bg-secondary);
    }
    .swagger-ui table tbody tr td {
      color: var(--text-secondary);
      font-size: 13px;
      padding: 10px 12px;
      border-bottom: 1px solid var(--border-color);
      background: var(--bg-secondary);
    }

    /* Models */
    .swagger-ui section.models {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 6px;
    }
    .swagger-ui section.models .model-container {
      background: var(--bg-secondary);
      border: none;
      margin: 0;
    }
    .swagger-ui .model-title {
      color: var(--text-primary);
      font-size: 14px;
    }
    .swagger-ui .model {
      color: var(--text-secondary);
      font-size: 13px;
    }

    /* Response section */
    .swagger-ui .responses-wrapper {
      background: var(--bg-secondary);
    }
    .swagger-ui .response-col_status {
      color: var(--text-primary);
      font-size: 13px;
    }
    .swagger-ui .response-col_description {
      color: var(--text-secondary);
      font-size: 13px;
    }
    .swagger-ui .responses-inner {
      background: var(--bg-secondary);
    }
    .swagger-ui .responses-inner > div {
      background: var(--bg-secondary) !important;
    }

    /* Code samples */
    .swagger-ui .highlight-code {
      background: var(--bg-tertiary);
      padding: 12px;
      border-radius: 4px;
    }
    .swagger-ui .microlight {
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
      font-size: 13px;
      color: var(--text-primary);
    }

    /* Make sure all parameter-related elements have dark background */
    .swagger-ui .opblock-description-wrapper,
    .swagger-ui .opblock-external-docs-wrapper,
    .swagger-ui .opblock-title_normal {
      background: var(--bg-parameters) !important;
      color: var(--text-primary);
    }
  `,
  customSiteTitle: 'API Documentation',
  swaggerOptions: {
    persistAuthorization: true,
    filter: true,
    displayRequestDuration: true,
    docExpansion: 'list',
    defaultModelsExpandDepth: 3,
    defaultModelExpandDepth: 3,
    tryItOutEnabled: true,
  },
};

export const swaggerSpec = swaggerJsdoc(options); 