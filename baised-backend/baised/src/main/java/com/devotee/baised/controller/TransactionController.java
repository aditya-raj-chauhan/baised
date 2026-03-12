package com.devotee.baised.controller;

import com.devotee.baised.Repository.PaymentTransactionRepo;
import com.devotee.baised.documents.PaymentTransactions;
import com.devotee.baised.documents.ProfileDocument;
import com.devotee.baised.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final PaymentTransactionRepo paymentTransactionRepo;
    private final ProfileService profileService;
    @GetMapping
    public ResponseEntity<?> getUserTransactions() {

        ProfileDocument current = profileService.getCurrentProfile();
        String clerkId = current.getClerkId();

        List<PaymentTransactions> transactions =
                paymentTransactionRepo
                        .findByClerkIdAndStatusOrderByTransactionDateDesc(clerkId, "SUCCESS");

        return ResponseEntity.ok(transactions);
    }
}
