package com.devotee.baised.service;

import com.devotee.baised.Repository.ProfileRepo;
import com.devotee.baised.documents.ProfileDocument;
import com.devotee.baised.dto.ProfileDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepo profileRepo;

    // Create or Update Profile
    public ProfileDto createProfile(ProfileDto dto) {

        if (profileRepo.existsByClerkId(dto.getClerkId())) {
            return updateProfile(dto);
        }

        ProfileDocument document = mapToDocument(dto);
        document.setCredits(10);
        document.setCreatedAt(Instant.now());

        ProfileDocument saved = profileRepo.save(document);

        return mapToDto(saved);
    }

    // Update Profile
    public ProfileDto updateProfile(ProfileDto newData) {

        ProfileDocument oldData = profileRepo.findByClerkId(newData.getClerkId());

        if (oldData == null) {
            throw new RuntimeException("Profile not found");
        }

        if (newData.getFirstName() != null &&
                !Objects.equals(oldData.getFirstName(), newData.getFirstName())) {
            oldData.setFirstName(newData.getFirstName());
        }

        if (newData.getLastName() != null &&
                !Objects.equals(oldData.getLastName(), newData.getLastName())) {
            oldData.setLastName(newData.getLastName());
        }

        if (newData.getPhotoUrl() != null &&
                !Objects.equals(oldData.getPhotoUrl(), newData.getPhotoUrl())) {
            oldData.setPhotoUrl(newData.getPhotoUrl());
        }

        if (newData.getEmail() != null &&
                !Objects.equals(oldData.getEmail(), newData.getEmail())) {

            profileRepo.findByEmail(newData.getEmail())
                    .ifPresent(e -> {
                        throw new RuntimeException("Email already exists");
                    });

            oldData.setEmail(newData.getEmail());
        }

        ProfileDocument updated = profileRepo.save(oldData);

        return mapToDto(updated);
    }

    // Delete Profile
    public void deleteProfile(String clerkId) {

        ProfileDocument existingProfile = profileRepo.findByClerkId(clerkId);

        if (existingProfile == null) {
            throw new RuntimeException("Profile not found");
        }

        profileRepo.delete(existingProfile);
    }

    // Map DTO → Document
    private ProfileDocument mapToDocument(ProfileDto dto) {
        return ProfileDocument.builder()
                .clerkId(dto.getClerkId())
                .email(dto.getEmail())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .photoUrl(dto.getPhotoUrl())
                .build();
    }

    // Map Document → DTO
    private ProfileDto mapToDto(ProfileDocument doc) {
        return ProfileDto.builder()
                .id(doc.getId())
                .clerkId(doc.getClerkId())
                .email(doc.getEmail())
                .firstName(doc.getFirstName())
                .lastName(doc.getLastName())
                .photoUrl(doc.getPhotoUrl())
                .credits(doc.getCredits())
                .createdAt(doc.getCreatedAt())
                .build();
    }

    // Check Profile Exists
    public boolean existsByClerkId(String clerkId) {
        return profileRepo.existsByClerkId(clerkId);
    }

    // Get Current Authenticated Profile
    public ProfileDocument getCurrentProfile() {

        if (SecurityContextHolder.getContext().getAuthentication() == null ||
                !SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {

            throw new UsernameNotFoundException("User not authenticated");
        }

        String clerkId = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        ProfileDocument profile = profileRepo.findByClerkId(clerkId);

        if (profile == null) {

            profile = ProfileDocument.builder()
                    .clerkId(clerkId)
                    .credits(10)
                    .createdAt(Instant.now())
                    .build();

            profile = profileRepo.save(profile);
        }

        return profile;
    }
}