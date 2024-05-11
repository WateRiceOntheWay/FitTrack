package com.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Diet {
    private Integer id;
    private String username;
    private Integer foodName;
    private BigDecimal weight;
    private BigDecimal calories;
    private LocalDateTime createTime;
}
