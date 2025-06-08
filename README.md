## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Anamika1720/Livekit-Recording.git

```

### 2. Navigate into the project directory

```bash
cd Livekit-Recording
```

Backend Setup

### 3. Navigate to the Backend Folder

```bash
cd Backend
```

### 4. Install Backend Dependencies

```bash
npm install
```

### 5. Configure Environment Variables

Create a .env file in the backend directory with the following:

```bash
SERVER_PORT=6080
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
LIVEKIT_URL=https://your-livekit-server-url
```

Replace the placeholders with your actual LiveKit credentials.

### 6. Run the Backend Server

```bash
node server.js
```

### 7. Navigate to the Frontend

```bash
cd ../Frontend/livekit
```

### 8.Install Dependencies

```bash
npm install
```

### 9.Run the Development Version

```bash
npm run dev
```
