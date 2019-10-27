package com.example.customerapplication;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class Net {
    private static Net ourInstance = new Net();

    public static Net getInstance() {
        return ourInstance;
    }

    private Net() {
    }
    private Retrofit retrofit = new Retrofit.Builder()          //----------------- A
            //.baseUrl("https://10.0.2.2:3000")
            //.baseUrl("https://165.194.17.155:3000")
            .baseUrl("http://18.236.129.135:3000/index/")   //
            .addConverterFactory(GsonConverterFactory.create())
            .build();

    MemberFactoryIm memberFactoryIm;       //--------------------------------------- B

    public MemberFactoryIm getMemberFactoryIm(){          //------------------------ C
        if(memberFactoryIm ==null){
            memberFactoryIm = retrofit.create(MemberFactoryIm.class);
        }

        return memberFactoryIm;
    }
}

