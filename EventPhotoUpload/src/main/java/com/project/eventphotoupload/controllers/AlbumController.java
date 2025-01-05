package com.project.eventphotoupload.controllers;

import com.project.eventphotoupload.dto.Album;
import com.project.eventphotoupload.repository.AlbumRepository;
import com.project.eventphotoupload.services.EmailService;
import com.project.eventphotoupload.services.GoogleDriveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/albums")
@CrossOrigin(origins = "http://localhost:3000")
public class AlbumController {

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private GoogleDriveService googleDriveService;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public Album createAlbum(@RequestBody Album album,  @RequestHeader("Authorization") String authorizationHeader) {
        if (album.getUserId() == null) {
            throw new IllegalArgumentException("User ID is required");
        }
        String accessToken;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            accessToken = authorizationHeader.substring(7);
        } else {
            throw new IllegalArgumentException("Invalid or missing Authorization header");
        }
        try {
            String folderId = googleDriveService.createFolder(accessToken, album.getName());
            System.out.println("Folder created: " + folderId);
            album.setDriveFolderId(folderId); // Store folder ID for future use
            album.setQrCode("https://example.com/qr/" + album.getName());

            Album savedAlbum = albumRepository.save(album);

            String uniqueLink = "http://localhost:3000/albums/upload/" + savedAlbum.getId();
            savedAlbum.setLink(uniqueLink);

            emailService.sendAlbumCreationEmail(
                    album.getUserId(),
                    album.getName(),
                    "https://drive.google.com/drive/folders/" + folderId
            );


            return albumRepository.save(savedAlbum);
        } catch (Exception e) {
            throw new RuntimeException("Error creating Google Drive folder", e);
        }

    }

    @PostMapping("/upload/{albumId}")
    public ResponseEntity<String> uploadPhotoByLink(@PathVariable Long albumId, @RequestParam MultipartFile file) {
        Album album = albumRepository.findById(albumId).orElseThrow(() -> new RuntimeException("Album not found"));

        try {
            // Create a temporary file for upload
            java.io.File tempFile = java.nio.file.Files.createTempFile("upload", file.getOriginalFilename()).toFile();
            file.transferTo(tempFile);

            // Upload the file to the Google Drive folder
            String fileId = googleDriveService.uploadFile(album.getDriveFolderId(), file.getOriginalFilename(), tempFile);

            // Clean up temporary file
            tempFile.delete();

            return ResponseEntity.ok("Photo uploaded successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading photo");
        }
    }



    @GetMapping("/user/{userId}")
    public List<Album> getAlbumsByUser(@PathVariable String userId) {
        return albumRepository.findByUserId(userId);
    }


    @GetMapping
    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }
}
