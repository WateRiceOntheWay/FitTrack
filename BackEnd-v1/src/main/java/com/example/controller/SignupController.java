package com.example.controller;

import com.example.pojo.Result;
import com.example.pojo.User;
import com.example.service.UserService;
import com.example.utils.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("signup")
public class SignupController {
    @Autowired
    private UserService userService;

    @PostMapping()
    public Result signup(@RequestBody User user, HttpServletRequest request){
        log.info("用户注册：{}",user);
        // 将用户 ID 存入 Session 中
        request.getSession().setAttribute("userid", user.getId());
        userService.signup(user);
        return Result.success();
        // 注册成功后返回包含 JWT 令牌的结果
        //boolean isRegistered = userService.signup(user);
        //return isRegistered ? Result.success(token) : Result.error("注册失败，请稍后重试");
    }


}
