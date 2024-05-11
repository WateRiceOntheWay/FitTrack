package com.example.service;

import com.example.exception.FoodTypeNotFoundException;
import com.example.pojo.Diet;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DietService {

    List<Diet> list(String username);

    List<Diet> listTopThree(String username);

    void add(Diet diet) throws FoodTypeNotFoundException;
}
