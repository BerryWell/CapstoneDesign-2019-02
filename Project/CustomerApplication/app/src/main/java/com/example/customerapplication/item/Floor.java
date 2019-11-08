package com.example.customerapplication.item;

public class Floor {
    public int idfloor;
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

}
