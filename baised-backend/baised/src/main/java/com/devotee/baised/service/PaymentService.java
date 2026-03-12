package com.devotee.baised.service;

import com.devotee.baised.Repository.PaymentTransactionRepo;
import com.devotee.baised.documents.PaymentTransactions;
import com.devotee.baised.documents.ProfileDocument;
import com.devotee.baised.dto.PaymentDto;
import com.devotee.baised.dto.PaymentVerficationDto;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final ProfileService profileService;
    private final UserCreditsService userCreditsService;
    private final PaymentTransactionRepo paymentTransactionRepo;

    @Value("${razorpay.key.id}")
    private String razorPayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorPayKeySecret;


    public PaymentDto createOrder(PaymentDto paymentDto){

        try{

            ProfileDocument profile = profileService.getCurrentProfile();

            RazorpayClient razorpayClient =
                    new RazorpayClient(razorPayKeyId, razorPayKeySecret);

            JSONObject orderReq = new JSONObject();

            orderReq.put("amount", paymentDto.getAmount() * 100);
            orderReq.put("currency", paymentDto.getCurrency());
            orderReq.put("receipt","order_"+System.currentTimeMillis());

            Order order = razorpayClient.orders.create(orderReq);

            String orderId = order.get("id");

            PaymentTransactions transaction =
                    PaymentTransactions.builder()
                            .clerkId(profile.getClerkId())
                            .orderId(orderId)
                            .planId(paymentDto.getPlanId())
                            .amount(paymentDto.getAmount())
                            .currency(paymentDto.getCurrency())
                            .status("PENDING")
                            .transactionDate(LocalDateTime.now())
                            .userEmail(profile.getEmail())
                            .username(profile.getFirstName()+" "+profile.getLastName())
                            .build();

            paymentTransactionRepo.save(transaction);

            return PaymentDto.builder()
                    .success(true)
                    .orderId(orderId)
                    .amount(paymentDto.getAmount())
                    .currency(paymentDto.getCurrency())
                    .message("Order created successfully")
                    .build();

        }
        catch(Exception e){

            return PaymentDto.builder()
                    .success(false)
                    .message("Error while creating order "+e.getMessage())
                    .build();
        }
    }



    public PaymentDto verifyPayment(PaymentVerficationDto req){

        try{

            ProfileDocument profile = profileService.getCurrentProfile();
            String clerkId = profile.getClerkId();

            String data =
                    req.getRazorpay_order_id()+"|"+req.getRazorpay_payment_id();

            String generatedSignature =
                    generateHmac256Signature(data,razorPayKeySecret);


            if(!generatedSignature.equals(req.getRazorpay_signature())){

                updateTransactionStatus(
                        req.getRazorpay_order_id(),
                        "FAILED",
                        req.getRazorpay_payment_id(),
                        null
                );

                return PaymentDto.builder()
                        .success(false)
                        .message("Payment signature verification failed")
                        .build();
            }



            int creditsToAdd = 0;
            String plan = "BASIC";

            switch(req.getPlanId()){

                case "standard":
                    creditsToAdd = 100;
                    plan = "STANDARD";
                    break;

                case "premium":
                    creditsToAdd = 500;
                    plan = "PREMIUM";
                    break;

                case "enterprise":
                    creditsToAdd = 999999;
                    plan = "ENTERPRISE";
                    break;

                default:
                    creditsToAdd = 10;
                    plan = "BASIC";
            }



            userCreditsService.addCredits(clerkId,creditsToAdd,plan);

            updateTransactionStatus(
                    req.getRazorpay_order_id(),
                    "SUCCESS",
                    req.getRazorpay_payment_id(),
                    creditsToAdd
            );


            return PaymentDto.builder()
                    .success(true)
                    .credits(
                            userCreditsService
                                    .getUserCredits(clerkId)
                                    .getCredits()
                    )
                    .message("Payment verified and credits added")
                    .build();


        }
        catch(Exception e){

            updateTransactionStatus(
                    req.getRazorpay_order_id(),
                    "ERROR",
                    req.getRazorpay_payment_id(),
                    null
            );

            return PaymentDto.builder()
                    .success(false)
                    .message("Error verifying payment "+e.getMessage())
                    .build();
        }
    }



    private void updateTransactionStatus(
            String orderId,
            String status,
            String paymentId,
            Integer creditsAdded){

        paymentTransactionRepo.findAll().stream()
                .filter(t -> t.getOrderId()!=null &&
                        t.getOrderId().equals(orderId))
                .findFirst()
                .map(t -> {

                    t.setStatus(status);
                    t.setPaymentId(paymentId);

                    if(creditsAdded!=null){
                        t.setCreditsAdded(creditsAdded);
                    }

                    return paymentTransactionRepo.save(t);

                }).orElse(null);
    }



    private String generateHmac256Signature(String data,String secret){

        try{

            Mac mac = Mac.getInstance("HmacSHA256");

            SecretKeySpec secretKey =
                    new SecretKeySpec(secret.getBytes(),"HmacSHA256");

            mac.init(secretKey);

            byte[] raw = mac.doFinal(data.getBytes());

            StringBuilder hex = new StringBuilder();

            for(byte b:raw){
                hex.append(String.format("%02x",b));
            }

            return hex.toString();

        }
        catch(Exception e){
            throw new RuntimeException(e);
        }
    }
}