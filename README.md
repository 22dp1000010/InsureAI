# InsureAI

InsureAI is a full-stack application that leverages Microsoft Foundry Agent to provide intelligent insurance solutions. This project combines a Python FastAPI backend with an Angular-based frontend for a seamless user experience.
This project is done as part of Agents League Hackathon.

Contributors for this repository:

1. Gayathri Bandikatla
2. Mohith Vattipalli

The appplication is deployed in Azure. Services used are -

1. App service
2. Microsoft Foundry
3. IAM

## Tech Stack

- **Backend**: FastAPI
- **Frontend**: Angular (TypeScript, HTML, CSS)
- **Architecture**: Full-stack web application

## Project Structure

```
InsureAI/
├── main.py                 # Python backend with FastAPI/Uvicorn
├── insure-ai-ui/           # Angular frontend application
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python** (3.11 or higher)
- **Node.js** (v22 or higher)
- **npm** (comes with Node.js)
- **Angular CLI** (install globally: `npm install -g @angular/cli`)

## Getting Started

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```
2. **Create a virtual environment**:
   ```bash
   python -m venv env
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the development server**:
   ```bash
   uvicorn main:app --reload
   ```

   The backend API will be available at `http://localhost:8000`

5. **API Documentation**:
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd insure-ai-ui
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   ng serve
   ```

   The frontend application will be available at `http://localhost:4200`

   The application will automatically reload whenever you modify any of the source files.

## Development

### Running Both Services Simultaneously

It's recommended to run the backend and frontend in separate terminal windows:

**Terminal 1 - Backend**:
```bash
uvicorn main:app --reload
```

**Terminal 2 - Frontend**:
```bash
cd insure-ai-ui
ng serve
```

### Frontend Commands

- **Generate new component**:
  ```bash
  ng generate component component-name
  ```

- **Build for production**:
  ```bash
  ng build
  ```

- **Run unit tests**:
  ```bash
  ng test
  ```

- **Run end-to-end tests**:
  ```bash
  ng e2e
  ```

## API Integration

The frontend connects to the backend API. Make sure to configure the API endpoint in your Angular environment configuration (`environment.ts`) to point to your backend server.

Example:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000'
};
```

## Building for Production

### Backend
The backend is deployed to Azure using IAM Managed Identity.

### Frontend
Build the frontend for production:
```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Troubleshooting

### Port Already in Use
- **Backend (Port 8000)**: Change the port in the startup command: `uvicorn main:app --reload --port 8001`
- **Frontend (Port 4200)**: Use `ng serve --port 4201`

### CORS Issues
If you encounter CORS errors, ensure your backend is configured to allow requests from `http://localhost:4200`.

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

[Add your license information here]

## Support

For issues or questions, please open an issue in the repository.
