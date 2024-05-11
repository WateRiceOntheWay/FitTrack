package com.example.mapper;

import com.example.pojo.Food;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface FoodMapper {
    @Select("select * from food Where food_name = #{foodName}")
    Food getByFoodname(int foodName);

}
