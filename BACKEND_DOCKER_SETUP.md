# Backend Docker Setup

## Overview
This setup containerizes only the Laravel backend while keeping:
- Frontend: Running locally (React dev server on port 5173)
- Database: Remote MySQL server (46.4.222.212)
- Backend: Dockerized Laravel API on port 8000

## Quick Start

### 1. Build and Run Backend Container
```bash
# Navigate to project root
cd "j:\STUDY\3.1\CSE3100\Shohoj Cart\Shohoj-Cart--Ecommerce-CMS"

# Build and start backend container
docker-compose up --build
```

### 2. Start Frontend Locally
```bash
# In a new terminal, navigate to frontend
cd "j:\STUDY\3.1\CSE3100\Shohoj Cart\Shohoj-Cart--Ecommerce-CMS\shohojcart_frontend"

# Install dependencies (if not done)
npm install

# Start React dev server
npm run dev
```

### 3. Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api
- **Backend Direct**: http://localhost:8000

## Architecture
```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │
│   React:5173    │◄──►│   Docker:8000   │
│   (Local)       │    │   (Container)   │
└─────────────────┘    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   Remote MySQL  │
                    │   46.4.222.212  │
                    └─────────────────┘
```

## Docker Commands

**Start backend only:**
```bash
docker-compose up backend
```

**Rebuild after code changes:**
```bash
docker-compose up --build backend
```

**Stop backend:**
```bash
docker-compose down
```

**View logs:**
```bash
docker-compose logs backend
```

**Execute Laravel commands in container:**
```bash
# Run migrations
docker-compose exec backend php artisan migrate

# Clear cache
docker-compose exec backend php artisan cache:clear

# Generate app key
docker-compose exec backend php artisan key:generate
```

## Configuration Details

### Backend Environment (.env)
- `APP_URL=http://localhost:8000` - Backend URL for Docker
- `DB_HOST=46.4.222.212` - Your remote MySQL server
- `SANCTUM_STATEFUL_DOMAINS=localhost:5173` - CORS for frontend
- `SESSION_DOMAIN=localhost` - Session configuration

### Frontend Environment (.env)
- `VITE_API_BASE_URL=http://localhost:8000/api` - Points to Docker backend

### Docker Configuration
- **Port Mapping**: 8000:8080 (Host:Container)
- **Volume Mounting**: Live code updates without rebuild
- **Auto Migration**: Runs migrations on container start
- **Storage Link**: Automatically creates storage links

## Troubleshooting

**Backend container won't start:**
- Check if port 8000 is available
- Verify remote MySQL credentials
- Check Docker logs: `docker-compose logs backend`

**Frontend can't connect to backend:**
- Ensure backend container is running
- Verify frontend .env has correct API URL
- Check CORS configuration in backend .env

**Database connection issues:**
- Verify remote MySQL server is accessible
- Check database credentials in backend .env
- Ensure MySQL server allows external connections

**CORS errors:**
- Check `SANCTUM_STATEFUL_DOMAINS` in backend .env
- Verify frontend URL matches CORS settings
- Clear browser cache and try again

## Development Workflow

1. **Start backend container**: `docker-compose up backend`
2. **Start frontend locally**: `npm run dev` in frontend directory
3. **Make backend changes**: Files auto-sync due to volume mounting
4. **Restart container if needed**: `docker-compose restart backend`
5. **Frontend changes**: Auto-reload with Vite dev server

This setup gives you the best of both worlds - containerized backend with consistent environment and fast local frontend development!