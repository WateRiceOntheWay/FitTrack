package com.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Food {
    private Integer id;
    private String foodName;
    private BigDecimal calories;
    private LocalDateTime createTime;
}
