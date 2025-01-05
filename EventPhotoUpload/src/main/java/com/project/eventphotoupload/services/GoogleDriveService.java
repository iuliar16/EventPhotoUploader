package com.project.eventphotoupload.services;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.Permission;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Collections;
import java.util.List;

@Service
public class GoogleDriveService {

    private static final String APPLICATION_NAME = "PhotoUploader";
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    private static final List<String> SCOPES = Collections.singletonList(DriveScopes.DRIVE_FILE);
    private Drive driveService;

    @PostConstruct
    public void init() throws Exception {
        InputStream in = getClass().getResourceAsStream("/credentials.json");
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                GoogleNetHttpTransport.newTrustedTransport(), JSON_FACTORY, clientSecrets, SCOPES)
                .setAccessType("offline")
                .build();

        LocalServerReceiver receiver = new LocalServerReceiver.Builder()
                .setPort(8080)
                .build();

        Credential credential = new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
        driveService = new Drive.Builder(GoogleNetHttpTransport.newTrustedTransport(), JSON_FACTORY, credential)
                .setApplicationName(APPLICATION_NAME)
                .build();
    }

    public Drive getUserDriveService(String accessToken) throws Exception {
        GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);

        return new Drive.Builder(GoogleNetHttpTransport.newTrustedTransport(), JSON_FACTORY, credential)
                .setApplicationName("PhotoUploader")
                .build();
    }

    public String createFolder(String accessToken, String folderName) throws Exception {

        Drive driveService = getUserDriveService(accessToken);

        System.out.println("accessToken" + accessToken);
        File fileMetadata = new File();
        fileMetadata.setName(folderName);
        fileMetadata.setMimeType("application/vnd.google-apps.folder");

        File folder = driveService.files().create(fileMetadata)
                .setFields("id")
                .execute();

        makeFolderPublic(folder.getId(), accessToken);

        return folder.getId();
    }

    public void makeFolderPublic(String folderId, String accessToken) throws Exception {
        Drive driveService = getUserDriveService(accessToken);

        Permission permission = new Permission();
        permission.setType("anyone");
        permission.setRole("writer");

        driveService.permissions().create(folderId, permission).execute();
    }


    public String uploadFile(String folderId, String fileName, java.io.File filePath) throws Exception {
        File fileMetadata = new File();
        fileMetadata.setName(fileName);
        fileMetadata.setParents(Collections.singletonList(folderId));

        FileContent mediaContent = new FileContent("image/jpeg", filePath);
        File file = driveService.files().create(fileMetadata, mediaContent)
                .setFields("id")
                .execute();

        return file.getId();
    }

}
