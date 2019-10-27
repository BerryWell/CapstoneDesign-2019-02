package com.example.customerapplication.item;

public class User {
    int iditem;
    String name;
    int category_idcategory;
    public User(){

    }

    public User(int iditem, String name, int category_idcategory) {
        this.iditem = iditem;
        this.name = name;
        this.category_idcategory = category_idcategory;
    }
    public String toString() {
        return "User{" +
                "iditem=" + iditem +
                ", name='" + name + '\'' +
                ", category_idcategory=" + category_idcategory +
                '}';
    }

}
