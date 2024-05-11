package com.example.controller;

import com.example.exception.SportTypeNotFoundException;
import com.example.pojo.Result;
import com.example.pojo.Sport;
import com.example.service.SportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/sports")
public class SportController {
    @Autowired
    private SportService sportService;

    @GetMapping()
    public Result list(@RequestParam(required = false) String username,
                       @RequestParam(required = false, defaultValue = "false") boolean getAll){
        if (getAll) {
            // 如果参数getAll为true，获取全部记录
            log.info("查询用户的全部运动数据");
            List<Sport> sportList = sportService.list(username);
            return Result.success(sportList);
        } else {
            // 否则，根据用户名和存储时间范围获取记录
            log.info("查询用户的前三条运动数据");
            List<Sport> sportList = sportService.listTopThree(username);
            return Result.success(sportList);
        }
    }

    @PostMapping("/add")
    public Result add(@RequestBody Sport sport) throws SportTypeNotFoundException {
        log.info("增添用户记录");
        sportService.add(sport);
        return Result.success(sport);
    }
}
