package com.example.controller;

import com.example.exception.DietTypeNotFoundException;
import com.example.exception.FoodTypeNotFoundException;
import com.example.pojo.Diet;
import com.example.pojo.Result;
import com.example.service.DietService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/diet")
public class DietController {
    @Autowired
    private DietService dietService;
    @GetMapping()
    public Result list(@RequestParam(required = false) String username,
                       @RequestParam(required = false, defaultValue = "false") boolean getAll){
        if (getAll) {
            // 如果参数getAll为true，获取全部记录
            log.info("查询用户全部饮食数据：{}",username);
            List<Diet> dietList = dietService.list(username);
            return Result.success(dietList);
        } else {
            // 否则，根据用户名和存储时间范围获取记录
            log.info("查询用户的前三条饮食数据");
            List<Diet> dietList = dietService.listTopThree(username);
            return Result.success(dietList);
        }

    }
    @PostMapping("/add")
    public Result add(@RequestBody Diet diet) throws DietTypeNotFoundException, FoodTypeNotFoundException {
        log.info("增添用户记录");
        dietService.add(diet);
        diet.getId();
        return Result.success(diet);
    }


}
