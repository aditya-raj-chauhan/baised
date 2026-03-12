package com.devotee.baised.Repository;

import com.devotee.baised.documents.PaymentTransactions;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentTransactionRepo extends MongoRepository<PaymentTransactions,String> {

    List<PaymentTransactions> findByClerkId(String clerkId);

    List<PaymentTransactions> findByClerkIdOrderByTransactionDateDesc(String clerkId, String success);

    List<PaymentTransactions> findByClerkIdAndStatusOrderByTransactionDateDesc(
            String clerkId,
            String status
    );
}