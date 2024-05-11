package com.example.service;

import com.example.pojo.User;

public interface UserService {

    User login(User user);

    void signup(User user);

    void addinfo(User user);

    String getSummarize(User user);
    //boolean signup(User user);
}
