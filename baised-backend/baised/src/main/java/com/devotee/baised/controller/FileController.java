package com.devotee.baised.controller;

import com.devotee.baised.documents.UserCredits;
import com.devotee.baised.dto.FileMetaDataDto;
import com.devotee.baised.service.FileMetaDataService;
import com.devotee.baised.service.UserCreditsService;

import lombok.RequiredArgsConstructor;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileController {

    private final FileMetaDataService fileMetaDataService;
    private final UserCreditsService userCreditsService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFiles(@RequestPart("files") MultipartFile[] files) {

        System.out.println("Controller upload endpoint hit");

        Map<String, Object> response = new HashMap<>();

        try {

            if (files == null || files.length == 0) {
                response.put("error", "No files provided");
                return ResponseEntity.badRequest().body(response);
            }

            List<FileMetaDataDto> uploadedFiles =
                    fileMetaDataService.uploadFiles(files);

            UserCredits userCredits = userCreditsService.getUserCredits();

            response.put("files", uploadedFiles);
            response.put("remainingCredits", userCredits.getCredits());

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            response.put("error", e.getMessage());

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(response);
        }
    }
    @GetMapping("/my")
    public ResponseEntity<?>getFilesForCurrentUsers(){
     List<FileMetaDataDto> allFiles=fileMetaDataService.getFiles();
     return ResponseEntity.ok(allFiles);

    }
    @GetMapping("/public/{id}")
    public ResponseEntity<?>getPublicFile(@PathVariable String id){
        FileMetaDataDto dto=fileMetaDataService.getPublicFile(id);
        return ResponseEntity.ok(dto);

    }
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> download(@PathVariable String id) throws MalformedURLException {

        FileMetaDataDto downloadableFile = fileMetaDataService.getDownloadableFile(id);

        Path path = Paths.get(downloadableFile.getFileLocation());

        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + downloadableFile.getName() + "\""
                )
                .body(resource);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?>deleteFile(@PathVariable String id ){
        fileMetaDataService.deleteFile(id);
            return ResponseEntity.noContent().build();

    }

    @PatchMapping("/{id}/toggle-public")
    public ResponseEntity<?>togglePublic(@PathVariable String id){
      FileMetaDataDto file=  fileMetaDataService.toggleAccess(id);
      return ResponseEntity.ok(file);


    }

}