package com.example.customerapplication.item;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

public class Map {
    @SerializedName("map")
    public ArrayList<String[]> map;

    @Override
    public String toString() {
        return "Map{" +
                "category='" + map + '\'' +
                '}';
    }
}
