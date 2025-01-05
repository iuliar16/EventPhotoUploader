# EventPhotoUploader

This application allows event hosts to create albums, where guests can upload photos directly to a dedicated Google Drive folder without needing to log in. The project integrates React for the frontend, Spring Boot for the backend, and Google APIs for authentication and file management.

## Installation Steps
  ### Backend (Spring Boot)
  #### Prerequisites:
    - Java 17+
    - Maven 3.8+
    - Google Cloud Project (with Drive API enabled)
#### Steps:
  #### Clone the repository: 
    git clone https://github.com/your-repo/event-photo-sharing.git
  #### Navigate to the backend directory
    cd EventPhotoUpload
  #### Configure application.properties:
    google.client-id=YOUR_GOOGLE_CLIENT_ID
    google.client-secret=YOUR_GOOGLE_CLIENT_SECRET
    google.redirect-uri=http://localhost:8080/Callback
  #### Add your credentials.json file for Google Drive to the resources folder.
#### Start the application:
    mvn spring-boot:run
 #### When the Spring Boot application starts, it requests authorization for the service account by displaying a Google OAuth URL:
![image](https://github.com/user-attachments/assets/74ed64df-735f-4e23-909d-b9525b0ea493)

Please open the following address in your browser:
https://accounts.google.com/o/oauth2/auth?access_type=offline&client_id=...&redirect_uri=http://localhost:8080/Callback&response_type=code&scope=https://www.googleapis.com/auth/drive.file

#### Authorize the service account:
Open the provided URL in your terminal, log in with a Google account, and paste the authorization code into the terminal.

 ### Frontend (React)
   #### Prerequisites:
    Node.js 18+
    npm or yarn
  #### Steps:
  #### Navigate to the frontend directory
  cd photosfrontend
  #### Install dependencies
  npm install
  #### Start the application:
  npm start

## **Auxiliary Applications and Libraries**

### **Backend**
- **Spring Boot**: Main backend framework.
- **Google Client Library**: Handles OAuth and Drive API interactions.
- **Maven Dependencies**:
  - `spring-boot-starter-web`
  - `spring-boot-starter-data-jpa`
  - `google-api-client`
  - `google-oauth-client`

### **Frontend**
- **React**: Main frontend framework.
- **Libraries**:
  - `react-router-dom`: For routing.
  - `@fortawesome/react-fontawesome`: For icons.
  - `axios`: For API requests.
  - `@react-oauth/google`: For Google OAuth.


## How to Use

### **1. Host Login**
- Navigate to the login page of the application.
- Log in using your Google account to gain access to album management features.

### **2. Create an Album**
- After logging in, go to the "My Albums" section.
- Click the "Create Album" button.
- Provide an event name and date, then save.
- A unique link for the album will be generated. Share this link with your event guests.

### **3. Guest Upload**
- Guests access the album using the shared link.
- They can upload photos directly without needing to log in.
- Each uploaded photo is automatically stored in the associated Google Drive folder for the album.

### **4. View Photos**
- Log in as the host and view your albums in the "My Albums" section.
- Click on the album link to open the corresponding Google Drive folder where all photos are stored.
- Manage and download photos as needed directly from Google Drive.

