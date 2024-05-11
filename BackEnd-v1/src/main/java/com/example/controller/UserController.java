package com.example.controller;

import com.example.pojo.Result;
import com.example.pojo.User;
import com.example.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/addinfo")
    public Result signup(@RequestBody User user){
        log.info("用户信息完善：{}",user);
        userService.addinfo(user);
        return Result.success();
    }

    @GetMapping("/summarize")
    public Result getSummarize(@RequestBody User user){
        log.info("用户信息汇总：{}",user);
        String info = userService.getSummarize(user);
        return Result.success(info);
    }

}
