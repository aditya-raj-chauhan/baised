package com.devotee.baised.controller;

import com.devotee.baised.documents.UserCredits;
import com.devotee.baised.dto.ProfileDto;
import com.devotee.baised.service.ProfileService;
import com.devotee.baised.service.UserCreditsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequiredArgsConstructor
@RequestMapping("/webhooks")
public class ClerkWebhookController {
    private final UserCreditsService userCreditsService;

    private final ProfileService profileService;

    @Value("${clerk.webhook.secret}")
    private String websHookSecret;

    @PostMapping("/clerk")
    public ResponseEntity<?> handleClerkWebhook(
            @RequestHeader("svix-id") String svixId,
            @RequestHeader("svix-timestamp") String svixTimeStamp,
            @RequestHeader("svix-signature") String svixSignature,
            @RequestBody String payload
    ) {

        try {
            boolean valid = verifyWebhookSugnature(
                    svixId, svixTimeStamp, svixSignature, payload);

            if (!valid) {
                return ResponseEntity.status(401).body("unauthorized");
            }

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(payload);
            String type = root.path("type").asText();
            JsonNode dataNode = root.path("data");

            switch (type) {
                case "user.created":
                    handleUserCreated(dataNode);
                    break;

                case "user.updated":
                    handleUserUpdated(dataNode);
                    break;

                case "user.deleted":
                    handleUserDeleted(dataNode);
                    break;

                default:
                    return ResponseEntity.ok("event ignored");
            }

            return ResponseEntity.ok("event processed");

        } catch (Exception e) {
            return ResponseEntity.status(400).body("error parsing webhook");
        }
    }

    private boolean verifyWebhookSugnature(
            String svixId,
            String svixTimeStamp,
            String svixSignature,
            String payload
    ) {
        return true;
    }

    private void handleUserCreated(JsonNode data) {

        String clerkId = data.path("id").asText("");

        String email = "";
        JsonNode emailAddresses = data.path("email_addresses");
        if (emailAddresses.isArray() && emailAddresses.size() > 0) {
            email = emailAddresses.get(0).path("email_address").asText("");
        }

        String firstName = data.path("first_name").asText("");
        String lastName  = data.path("last_name").asText("");
        String photoUrl  = data.path("image_url").asText("");

        // You can now store/save/use these fields

       ProfileDto dto= ProfileDto.builder()
                .clerkId(clerkId)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .photoUrl(photoUrl)
                .build();
       profileService.createProfile(dto);
       userCreditsService.createInitialCredits(clerkId);

    }


    private void handleUserUpdated(JsonNode data) {

        String clerkId = data.path("id").asText("");

        String email = "";
        JsonNode emailAddresses = data.path("email_addresses");
        if (emailAddresses.isArray() && emailAddresses.size() > 0) {
            email = emailAddresses.get(0).path("email_address").asText("");
        }

        String firstName = data.path("first_name").asText("");
        String lastName  = data.path("last_name").asText("");
        String photoUrl  = data.path("image_url").asText("");

        ProfileDto updatedProfile = ProfileDto.builder()
                .clerkId(clerkId)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .photoUrl(photoUrl)
                .build();

        updatedProfile = profileService.updateProfile(updatedProfile);

        if (updatedProfile == null) {
            handleUserCreated(data);
        }
    }

    private void handleUserDeleted(JsonNode data) {
        String clerkId=data.path("id").asText();
        profileService.deleteProfile(clerkId);
    }
}