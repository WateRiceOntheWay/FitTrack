package com.example.exception;

public class FoodTypeNotFoundException extends Throwable {
    public FoodTypeNotFoundException(String msg) {
        super(msg);
    }
}
