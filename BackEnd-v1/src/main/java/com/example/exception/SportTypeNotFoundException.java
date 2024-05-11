package com.example.exception;

public class SportTypeNotFoundException extends Throwable {
    public SportTypeNotFoundException(String message) {
        super(message);
    }
}
