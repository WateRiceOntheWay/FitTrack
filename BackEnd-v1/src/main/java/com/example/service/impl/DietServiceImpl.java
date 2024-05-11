package com.example.service.impl;

import com.example.exception.DietTypeNotFoundException;
import com.example.exception.FoodTypeNotFoundException;
import com.example.mapper.DietMapper;
import com.example.mapper.FoodMapper;
import com.example.pojo.Diet;
import com.example.pojo.Food;
import com.example.service.DietService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class DietServiceImpl implements DietService {

    @Autowired
    private DietMapper dietMapper;

    @Autowired
    private FoodMapper foodMapper;


    @Override
    public List<Diet> list(String username) {
        return dietMapper.getByUsername(username);
    }

    @Override
    public List<Diet> listTopThree(String username) {
        return dietMapper.getByUsernameForThree(username);
    }

    @Override
    public void add(Diet diet) throws FoodTypeNotFoundException {
        log.info("Attempting to add diet record: {}", diet.toString());
        diet.setCreateTime(LocalDateTime.now());
        if (diet.getFoodName() == null) {
            throw new FoodTypeNotFoundException("食物名称为空");
        }
        Food food = foodMapper.getByFoodname(diet.getFoodName());
        if(food != null){
            BigDecimal calories = calculateCalories(diet,food);
            diet.setCalories(calories);
            dietMapper.insert(diet);
        }else{
            throw new FoodTypeNotFoundException("食物类型未找到");
        }
    }

    private BigDecimal calculateCalories(Diet diet, Food food) {
        BigDecimal caloriesPer100g = food.getCalories(); // 获取每100克食物的卡路里数
        BigDecimal weight = diet.getWeight(); // 获取食物的重量

        // 将卡路里数乘以食物重量，然后除以100，得到每100克食物的卡路里数
        BigDecimal calories = caloriesPer100g.multiply(weight).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);

        return calories;
    }
}
