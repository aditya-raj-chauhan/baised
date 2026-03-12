package com.devotee.baised.controller;

import com.devotee.baised.documents.UserCredits;
import com.devotee.baised.dto.UserCreditsDto;
import com.devotee.baised.service.UserCreditsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserCreditsController {
    private final UserCreditsService userCreditsService;


    @GetMapping("/credits")
    public ResponseEntity<?>getUserCredits(){
UserCredits userCredits=userCreditsService.getUserCredits();
    UserCreditsDto userCreditsDto=    UserCreditsDto.builder()
                .credits(userCredits.getCredits())
                .plan(userCredits.getPlans())
                .build();
    return  ResponseEntity.ok(userCreditsDto);
    }
}
