package com.example.controller;

import com.example.pojo.Result;
import com.example.pojo.User;
import com.example.service.UserService;
import com.example.utils.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
public class LoginController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Result login(@RequestBody User user, HttpServletRequest request){
        log.info("用户登陆验证：{}",user);
        //将页面提交的密码password进行md5加密处理
        String password = user.getPassword();
        password = DigestUtils.md5DigestAsHex(password.getBytes());

        User loggedInUser = userService.login(user);
        if (loggedInUser != null) {
            Map<String, Object> claims = new HashMap<>();
            claims.put("userId", loggedInUser.getId());
            claims.put("username", loggedInUser.getUsername());
            String token = JwtUtils.generateJwt(claims);
            // 登录成功，将用户ID存入Session中
            request.getSession().setAttribute("userId", loggedInUser.getId());
            return Result.success(token);
        } else {
            return Result.error("用户名或密码错误");
        }
    }


}
