package com.example.mapper;

import com.example.pojo.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface UserMapper {
    @Select("select * from user Where username = #{username} and password = #{password}")
    User getPasswordAndUsername(User user);

    @Insert("insert into user(username,password,create_time)" +
            "values(#{username},#{password},#{createTime})")
    int insert(User user);

    @Update("update user set weight = #{weight},body_fat_rate = #{bodyFatRate},heart_rate = #{heartRate} " +
            "where username = #{username}")
    void addinfo(User user);

    @Select("select summarize from user where username = #{username}")
    String getSummarize(User user);
}
