package com.devotee.baised.Repository;

import com.devotee.baised.documents.ProfileDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ProfileRepo extends MongoRepository<ProfileDocument, String> {

    ProfileDocument findByClerkId(String clerkId);

    Optional<ProfileDocument> findByEmail(String email);

    boolean existsByClerkId(String clerkId);
}
