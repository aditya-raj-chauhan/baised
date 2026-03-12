package com.devotee.baised.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentDto {
    private String planId;
    private Integer amount;
    private String currency;
    private Integer credits;
    private boolean success;
    private String message;
    private String orderId;
    
}
