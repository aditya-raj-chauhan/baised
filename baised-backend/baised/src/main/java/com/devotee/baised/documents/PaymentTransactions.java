package com.devotee.baised.documents;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "payment-transactions")
public class PaymentTransactions {

    @Id
    private String id;

    private String clerkId;
    private String orderId;
    private String paymentId;
    private String planId;

    private int amount;
    private String currency;
    private int creditsAdded;

    private String status;

    private String userEmail;
    private String username;

    private LocalDateTime transactionDate;

}