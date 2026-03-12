package com.devotee.baised.controller;

import com.devotee.baised.dto.PaymentDto;
import com.devotee.baised.dto.PaymentVerficationDto;
import com.devotee.baised.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;


    /* ---------------- CREATE ORDER ---------------- */

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody PaymentDto paymentDto){

        PaymentDto response = paymentService.createOrder(paymentDto);

        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }



    /* ---------------- VERIFY PAYMENT ---------------- */

    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyOrder(@RequestBody PaymentVerficationDto req){

        PaymentDto response = paymentService.verifyPayment(req);

        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }

}