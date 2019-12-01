package com.example.customerapplication.item;

import com.google.gson.annotations.SerializedName;

public class FloorItem {
    @SerializedName("iditem")
    public int iditem;
    @SerializedName("name")
    public String name;

    public FloorItem(int iditem, String name){
        this.iditem = iditem;
        this.name = name;
    }

    public String toString() {
        return "FloorItem{" +
                "iditem='" + iditem + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
