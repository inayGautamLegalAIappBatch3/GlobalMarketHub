# GlobalMarketHub Backend

Multi-marketplace backend API for products, services, and import/export.

## Features

- User authentication (JWT)
- Role-based access control
- Product marketplace
- Services marketplace (doctors, lawyers, etc.)
- Import/Export B2B platform
- Vendor management
- Professional verification
- Payment processing
- Admin dashboard

## API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/refresh-token`

### Products
- `GET /api/products`
- `POST /api/products`
- `GET /api/products/:id`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### Services
- `GET /api/services`
- `POST /api/services`
- `GET /api/services/:id`
- `POST /api/services/:id/book`

### Import/Export
- `GET /api/import-export`
- `POST /api/import-export`
- `GET /api/import-export/:id`
- `POST /api/import-export/:id/quote-request`

### Vendors
- `GET /api/vendors/profile`
- `GET /api/vendors/analytics`
- `POST /api/vendors/bulk-import`

### Professionals
- `GET /api/professionals/profile`
- `GET /api/professionals/bookings`

## Environment Variables

See `.env.example`

## Installation

```bash
npm install
```

## Running

```bash
npm start
```

## Development

```bash
npm run dev
```
