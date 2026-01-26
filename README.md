# AI-driven Resolution Tracker

This project is an AI-driven Resolution Tracker, allowing users to set long-term resolutions and receive AI-generated 7-day and 1-month action plans, with progress tracking over time.

## Project Structure

- `frontend/`: React application (Vite)
- `backend/`: Flask application

## Setup and Running

### 1. Backend Setup

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Activate the virtual environment:
   ```bash
   .\venv\Scripts\activate
   ```
3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask application:
   ```bash
   python app.py
   ```
   The backend server will run on `http://localhost:5000`.

### 2. Frontend Setup

1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install the Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```
   The frontend application will typically open in your browser at `http://localhost:5173` (or another available port).

### 3. Running Both Simultaneously

To run both the frontend and backend simultaneously, open two separate terminal windows. In one terminal, follow the backend setup and run instructions. In the other terminal, follow the frontend setup and run instructions.

Make sure your backend is running before accessing the frontend to ensure proper API communication.