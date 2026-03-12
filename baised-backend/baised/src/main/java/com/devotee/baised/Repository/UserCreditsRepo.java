package com.devotee.baised.Repository;

import com.devotee.baised.documents.UserCredits;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserCreditsRepo extends MongoRepository<UserCredits ,String> {
    Optional<UserCredits> findByClerkId(String clerkId);
}
