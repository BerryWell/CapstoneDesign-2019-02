package com.example.customerapplication;

import com.google.gson.JsonObject;

import org.json.JSONObject;

import retrofit2.Call;
import retrofit2.http.GET;

public interface MemberFactoryIm {
    //@GET("users/login")
    //Call<List<User>> login();
    @GET("/")
    Call<String> test();
    @GET("/items")  //매장별로 판매목록 받아서 보여줌
    Call<JsonObject>items();
}
