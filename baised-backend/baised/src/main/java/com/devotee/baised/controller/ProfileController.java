package com.devotee.baised.controller;


import com.devotee.baised.dto.ProfileDto;
import com.devotee.baised.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profiles")
@RequiredArgsConstructor
public class ProfileController {

  private final   ProfileService myProfilesService;

    @PostMapping("/register")
    public ResponseEntity<?>createProfile(@RequestBody ProfileDto profileDtoData){
       HttpStatus status= myProfilesService.existsByClerkId(profileDtoData.getClerkId())?HttpStatus.OK:HttpStatus.CREATED;
       ProfileDto savedData= myProfilesService.createProfile(profileDtoData);
       return ResponseEntity.status(status).body(savedData);


    }
}
