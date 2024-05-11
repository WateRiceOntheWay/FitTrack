package com.example.exception;

public class DietTypeNotFoundException extends Throwable {
    public DietTypeNotFoundException(String msg) {
        super(msg);
    }
}
