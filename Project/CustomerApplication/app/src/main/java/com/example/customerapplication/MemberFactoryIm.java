package com.example.customerapplication;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import org.json.JSONObject;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface MemberFactoryIm {
    //@GET("users/login")
    //Call<List<User>> login();
    @GET("/")
    Call<String> test();

    @GET("/items")  //매장별로 판매목록 받아서 보여줌
    Call<JsonArray> items();

    @GET("/item_quantity")
    Call<JsonArray> item_quantity(@Query("id") Integer id);

    @GET("/item_quantity_by_floor")
    Call<JsonArray> item_quantity_by_floor(@Query("id") Integer id);

    @GET("/item_quantity_by_category")
    Call<JsonArray> item_quantity_by_category(@Query("id") Integer id);

    @GET("/findMalls")
    Call<JsonArray> findMalls();

    @GET("/map/{id}")
    Call<JsonObject> map_id(@Path("id") Integer id);

}
