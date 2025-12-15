# Event Check-in Application

A simple cloud-native web application for event check-ins, built with Node.js, Express, and PostgreSQL, designed for Google Cloud Run.

## Features

- **Visitor Check-in**: Users can enter their name and email to check in.
- **Real-time List**: Displays a list of all checked-in visitors.
- **Data Persistence**: Stores data securely in a PostgreSQL database.
- **Validation**: Ensures valid inputs (non-empty name, valid email format).

## Architecture

- **Backend**: Node.js with Express.
- **Frontend**: Plain HTML/CSS/JS (Single Page Application).
- **Database**: PostgreSQL (Google Cloud SQL).
- **Platform**: Google Cloud Run (Containerless deployment).

## Google Cloud Services Used

1.  **Cloud Run**: Hosts the stateless application container.
2.  **Cloud SQL**: Managed PostgreSQL database for persistent storage.
3.  **Cloud Build**: Automates the build and deployment pipeline.
4.  **Artifact Registry**: Stores the Docker container images.

## Project Structure

```
.
├── Dockerfile           # Docker configuration
├── cloudbuild.yaml      # Cloud Build pipeline
├── package.json         # Node.js dependencies
├── public
│   └── index.html       # Frontend UI
└── src
    └── server.js        # Backend Logic
```

## Setup & Deployment

### Prerequisites

- Google Cloud Project with Billing enabled.
- Cloud SDK installed (optional for local testing).

### Local Development

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Set environment variables:
    **Linux / macOS / Git Bash:**
    ```bash
    export DB_USER=your_user
    export DB_PASSWORD=your_password
    export DB_NAME=your_db
    export DB_HOST=localhost
    ```
    **Windows (PowerShell):**
    ```powershell
    $env:DB_USER="your_user"
    $env:DB_PASSWORD="your_password"
    $env:DB_NAME="your_db"
    $env:DB_HOST="localhost"
    ```
3.  Start the server:
    ```bash
    npm start
    ```
4.  Visit `http://localhost:8080`.

### Database Schema

Create the `checkins` table in your PostgreSQL database:

```sql
CREATE TABLE checkins (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    checkin_time TIMESTAMP DEFAULT NOW()
);
```

### Automated Deployment (Cloud Build)

This project is configured for continuous deployment via **Google Cloud Build**.

1.  Connect your GitHub repository to Cloud Build.
2.  Create a Trigger that watches for pushes to the `main` branch.
3.  Set the Configuration to use the `cloudbuild.yaml` file.
4.  Ensure the Cloud Build service account has permissions to deploy to Cloud Run.

On every push to `main`, Cloud Build will:
1.  Build the Docker image.
2.  Push it to Google Artifact Registry.
3.  Deploy the new revision to Cloud Run.

## License

under MIT license
