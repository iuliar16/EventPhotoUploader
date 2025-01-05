package com.project.eventphotoupload.dto;

import jakarta.persistence.*;

@Entity
@Table(name = "albums")
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String date;
    private String qrCode;
    private String link;
    private String driveFolderId;

    @Column(name = "user_id", nullable = false)
    private String userId; // ID of the user who created the album

    public Album(String driveFolderId) {
        this.driveFolderId = driveFolderId;
    }

    public Album(String name, String date, String qrCode, String link, String driveFolderId, String userId) {
        this.name = name;
        this.date = date;
        this.qrCode = qrCode;
        this.link = link;
        this.driveFolderId = driveFolderId;
        this.userId = userId;
    }

    public Album() {

    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getQrCode() {
        return qrCode;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDriveFolderId() {
        return driveFolderId;
    }

    public void setDriveFolderId(String driveFolderId) {
        this.driveFolderId = driveFolderId;
    }
}
