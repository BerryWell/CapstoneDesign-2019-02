package com.example.customerapplication;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface MemberFactoryIm {
    //@GET("users/login")
    //Call<List<User>> login();
    @GET("/")
    Call<String> test();
    @GET("/items")
    Call<String> items();
}
