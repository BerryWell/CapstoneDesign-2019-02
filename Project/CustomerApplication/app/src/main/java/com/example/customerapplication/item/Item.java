package com.example.customerapplication.item;

import com.google.gson.annotations.SerializedName;

public class Item {
    @SerializedName("category")
    public String category;
    @SerializedName("item")
    public String item ;
/*
    public Item(){

    }

    public Item(String category, String Item) {
        this.category = category;
        this.Item = Item;
    }*/
    @Override
    public String toString() {
        return "Item{" +
                "category='" + category + '\'' +
                ", Item='" + item + '\'' +
                '}';
    }
}
