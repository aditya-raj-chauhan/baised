package com.devotee.baised.service;

import com.devotee.baised.Repository.FIleMetaDataDocumentRepo;
import com.devotee.baised.documents.FileMetadataDocument;
import com.devotee.baised.documents.ProfileDocument;
import com.devotee.baised.dto.FileMetaDataDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class FileMetaDataService {

    private final ProfileService profileService;
    private final UserCreditsService userCreditsService;
    private final FIleMetaDataDocumentRepo fileRepo;

    public List<FileMetaDataDto> uploadFiles(MultipartFile[] files) {

        System.out.println("Service method hit");

        if (files == null || files.length == 0) {
            throw new IllegalArgumentException("No files provided for upload");
        }

        try {

            ProfileDocument currentProfile = profileService.getCurrentProfile();

            if (!userCreditsService.hasEnoughCredits(files.length)) {
                throw new IllegalStateException("Not enough credits to upload files");
            }

            Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            List<FileMetadataDocument> savedFiles = new ArrayList<>();

            for (MultipartFile file : files) {

                if (file == null || file.isEmpty()) {
                    throw new IllegalArgumentException("File is empty or invalid");
                }

                String originalName = file.getOriginalFilename();
                String extension = StringUtils.getFilenameExtension(originalName);

                if (extension == null) {
                    extension = "bin";
                }

                String fileName = UUID.randomUUID() + "." + extension;

                Path targetLocation = uploadPath.resolve(fileName);

                Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

                FileMetadataDocument document = FileMetadataDocument.builder()
                        .fileLocation(targetLocation.toString())
                        .name(originalName)
                        .size(String.valueOf(file.getSize()))
                        .type(file.getContentType())
                        .clerkId(currentProfile.getClerkId())
                        .isPublic(false)
                        .uploadedAt(LocalDateTime.now())
                        .build();

                userCreditsService.consumeCredits();

                savedFiles.add(fileRepo.save(document));
            }

            return savedFiles.stream()
                    .map(this::mapToDto)
                    .collect(Collectors.toList());

        } catch (IOException e) {
            throw new RuntimeException("File storage failed", e);
        }
    }

    private FileMetaDataDto mapToDto(FileMetadataDocument doc) {

        return FileMetaDataDto.builder()
                .id(doc.getId())
                .name(doc.getName())
                .type(doc.getType())
                .size(doc.getSize())
                .clerkId(doc.getClerkId())
                .fileLocation(doc.getFileLocation())
                .isPublic(doc.isPublic())
                .uploadedAt(doc.getUploadedAt())
                .build();
    }
    public List<FileMetaDataDto>getFiles(){
        ProfileDocument currentProfile=profileService.getCurrentProfile();
       List<FileMetadataDocument> files= fileRepo.findByClerkId(currentProfile.getClerkId());
       return files.stream().map(this::mapToDto).collect(Collectors.toList());
    }
    public FileMetaDataDto getPublicFile(String id){
        Optional<FileMetadataDocument>fileOptional=fileRepo.findById(id);
        if(fileOptional.isEmpty()||!fileOptional.get().isPublic()){
            throw new RuntimeException("unable to get the file ");
        }
        FileMetadataDocument document=fileOptional.get();
         return mapToDto(document);

    }
    public FileMetaDataDto getDownloadableFile(String id){
        FileMetadataDocument file=fileRepo.findById(id).orElseThrow(()->new RuntimeException("file not found "));
        return mapToDto(file);
    }
    public void deleteFile(String id){
        try{
            ProfileDocument currentProfile =profileService.getCurrentProfile();
            FileMetadataDocument document=fileRepo.findById(id)
                    .orElseThrow(()->new RuntimeException("file not found "));
           if(!document.getClerkId().equals(currentProfile.getClerkId())){
               throw new RuntimeException("this file doesnt  belongs to you");
           }
           Path filepath=Paths.get(document.getFileLocation());
           Files.deleteIfExists(filepath);
           fileRepo.deleteById(id);
        }catch (Exception e){
            throw new RuntimeException("error in deleting the file ");
        }

    }

    public  FileMetaDataDto toggleAccess(String id){
       FileMetadataDocument file= fileRepo.findById(id)
                .orElseThrow(()->new RuntimeException("file not found "));
       file.setPublic(!file.isPublic());
       fileRepo.save(file);
       return mapToDto(file);

    }
}