package com.example.mapper;

import com.example.pojo.Games;
import com.example.pojo.Sport;
import org.apache.ibatis.annotations.*;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface SportMapper {
    //倒序输出
    @Select("SELECT * from sport WHERE username = #{username} order by create_time desc")
    List<Sport> list(String username);

    @Select("SELECT * from sport WHERE username = #{username} order by create_time desc limit 3")
    List<Sport> listTopThree(String username);


    @Insert("insert into sport( username, games_name, sports_distance, sports_time, calories, create_time) " +
            "VALUES (#{username},#{gamesName},#{sportsDistance},#{sportsTime},#{calories},#{createTime})")
    void insert(Sport sport);
}
