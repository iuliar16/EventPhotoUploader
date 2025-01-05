package com.project.eventphotoupload.repository;

import com.project.eventphotoupload.dto.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    List<Album> findByUserId(String userId);
}
