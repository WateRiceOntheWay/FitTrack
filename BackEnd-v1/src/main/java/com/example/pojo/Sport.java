package com.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sport {
    //运动记录ID
    private Integer id;

    //用户名
    private String username;


    //运动类型 0 跑步 1 骑行 2 游泳 3 举铁
    private Integer GamesName;

    //运动时间(秒）
    private BigDecimal sportsTime;

    //运动距离(米）
    private BigDecimal sportsDistance;

    // 热量
    private BigDecimal calories;

    //记录时间
    private LocalDateTime createTime;



}
