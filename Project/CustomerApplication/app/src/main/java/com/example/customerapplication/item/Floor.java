package com.example.customerapplication.item;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

public class Floor {
    @SerializedName("floor")
    public int idfloor; //층 수
    @SerializedName("category")
    public ArrayList<String> category;

    public Floor(int id, ArrayList<String> category)
    {
        this.idfloor = id;
        this.category = category;
    }
    public String getIdfloor() {
        return Integer.toString(idfloor);
    }
    public ArrayList<String> getCategory() {
        return category;
    }
    public String getAllCategory(){
        String result = new String("");
        for(int i=0; i<category.size(); i++){
            if(result.equals("")){
                result += category.get(i);
            }
            else{
                result += ", " + category.get(i);
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
