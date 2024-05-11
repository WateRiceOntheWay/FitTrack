package com.example.mapper;

import com.example.pojo.Games;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface GameMapper {
    @Select("SELECT * FROM game WHERE game_name = #{gameName}")
    Games getByGamename(Integer gamesName);
}
