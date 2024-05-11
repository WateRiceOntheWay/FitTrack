package com.example.service;

import com.example.exception.SportTypeNotFoundException;
import com.example.pojo.Sport;

import java.util.List;


public interface SportService {
    /**
     * 查询全部用户在指定日期的运动数据
     * @return
     */


    List<Sport> list(String username);

    List<Sport> listTopThree(String username);

    void add(Sport sport) throws SportTypeNotFoundException;

}
