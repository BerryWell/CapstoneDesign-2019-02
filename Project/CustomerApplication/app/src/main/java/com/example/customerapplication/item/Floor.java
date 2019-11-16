package com.example.customerapplication.item;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

public class Floor {
    @SerializedName("id")
    public int idfloor; //층 수
    @SerializedName("category")
    public String category;
    @SerializedName("floor")
    public int number; //층 수

    public Floor(int id, String category, int number)
    {
        this.idfloor = id;
        this.category = category;
        this.number = number;
    }
    public String getIdfloor() {
        return Integer.toString(idfloor);
    }
    public String getCategory() {
        return category;
    }
    public String getNumber() {
        return Integer.toString(number);
    }
   /* public String getAllCategory(){
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
    }*/

    public String toString() {
        return "Floor{" +
                "idfloor='" + idfloor + '\'' +
                ", category='" + category + '\'' +
                ", number='" + number + '\'' +
                '}';
    }

}
