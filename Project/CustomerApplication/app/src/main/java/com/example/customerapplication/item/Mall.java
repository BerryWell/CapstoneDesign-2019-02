package com.example.customerapplication.item;

import com.google.gson.annotations.SerializedName;

public class Mall {

    @SerializedName("idmall")
    public int idmall; //층 수
    @SerializedName("name")
    public String name;
    @SerializedName("latitude")
    public double latitude; //층 수
    @SerializedName("longitude")
    public double longitude; //층 수

    public Mall(int idmall, String name, double latitude, double longitude)
    {
        this.idmall = idmall;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String toString() {
        return "Floor{" +
                "idmall='" + idmall + '\'' +
                ", name='" + name + '\'' +
                ", latitude='" + latitude + '\'' +
                ", longitude='" + longitude + '\'' +
                '}';
    }
}
