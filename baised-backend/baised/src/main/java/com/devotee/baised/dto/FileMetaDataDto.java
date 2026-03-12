package com.devotee.baised.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileMetaDataDto {
    private String id;
    private String name;
    private String type;
    private String size;
    private String clerkId;
    private boolean isPublic;
    private String fileLocation;
    private LocalDateTime uploadedAt;
}
