package com.devotee.baised.service;

import com.devotee.baised.Repository.UserCreditsRepo;
import com.devotee.baised.documents.UserCredits;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserCreditsService {
    private  final ProfileService profileService;

    private final UserCreditsRepo userCreditsRepo;

    public UserCredits createInitialCredits(String clerkId) {

        UserCredits credits = UserCredits.builder()
                .clerkId(clerkId)
                .credits(5)
                .plans("BASIC")
                .build();

        return userCreditsRepo.save(credits);
    }

    public UserCredits getUserCredits(String clerkId) {

        return userCreditsRepo
                .findByClerkId(clerkId)
                .orElseGet(() -> createInitialCredits(clerkId));
    }
    public UserCredits getUserCredits() {



        String clerkId = profileService.getCurrentProfile().getClerkId();
        return getUserCredits(clerkId);
    }
    public boolean hasEnoughCredits(int requriedCredits){
        UserCredits userCredits=getUserCredits();

        return userCredits.getCredits()>=requriedCredits;

    }
    public UserCredits consumeCredits(){
       UserCredits userCredits= getUserCredits();
       if(userCredits.getCredits()<=0){
           return null;

       }else {
           userCredits.setCredits(userCredits.getCredits()-1);
          return userCreditsRepo.save(userCredits);
       }
    }
    public UserCredits addCredits(String clerkId,Integer creditsToAdd,String plan){
     UserCredits userCredits=   userCreditsRepo.findByClerkId(clerkId)
                .orElseGet(()->createInitialCredits(clerkId));
     userCredits.setCredits(userCredits.getCredits()+creditsToAdd);
     userCredits.setPlans(plan);
     return userCreditsRepo.save(userCredits);



    }
}