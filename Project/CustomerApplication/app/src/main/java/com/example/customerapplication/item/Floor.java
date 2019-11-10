package com.example.customerapplication.item;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

public class Floor {
    @SerializedName("floor")
    public int idfloor; //층 수
    @SerializedName("category")
    public String category;

    public Floor(int id, String category)
    {
        this.idfloor = id;
        this.category = category;
    }
    public String getIdfloor() {
        return Integer.toString(idfloor);
    }
    public String getCategory() {
        return category;
    }
    public String getAllCategory(){
        String result = new String("");
        for(int i=0; i<category.length(); i++){
            if(result.equals("")){
                result += category;
            }
            else{
                result += ", " + category;
            }
        }
        return result;
    }

    public String toString() {
        return "Floor{" +
                "idfloor='" + idfloor + '\'' +
                ", category='" + category + '\'' +
                '}';
    }

}
