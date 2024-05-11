package com.example.mapper;

import com.example.pojo.Diet;
import com.example.pojo.Food;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface DietMapper {
    @Select("select * from diet where username = #{username} order by create_time desc;")
    List<Diet> getByUsername(String username);


    @Select("select * from diet WHERE username = #{username} order by create_time desc limit 3;")
    List<Diet> getByUsernameForThree(String username);

    @Insert("insert into diet( food_name, username, weight, calories, create_time) " +
            "values (#{foodName},#{username},#{weight},#{calories},#{createTime})")
    void insert(Diet diet);

}
