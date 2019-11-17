package com.example.customerapplication.item;

import com.google.gson.annotations.SerializedName;

public class SubCategoryItem {
    /*@SerializedName("category_idcategory")
    public String categoryId;*/
    @SerializedName("iditem")
    public String categoryId;
    public String subId;
    @SerializedName("name")
    public String subCategoryName;
    @SerializedName("category_idcategory")
    public String parentCategoryId;
    public String isChecked;

    /*public SubCategoryItem(String iditem, String name){
        this.setCategoryId(iditem);
    }*/

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getSubId() {
        return subId;
    }

    public void setSubId(String subId) {
        this.subId = subId;
    }

    public String getSubCategoryName() {
        return subCategoryName;
    }

    public void setSubCategoryName(String subCategoryName) {
        this.subCategoryName = subCategoryName;
    }

    public String getIsChecked() {
        return isChecked;
    }

    public void setIsChecked(String isChecked) {
        this.isChecked = isChecked;
    }

    @Override
    public String toString() {
        return "SubCategoryItem{" +
                /*"category_idcategory='" + categoryId + '\'' +
                ", iditem='" + subId + '\'' +*/
                "iditem='" + categoryId + '\'' +
                ", name='" + subCategoryName + '\'' +
                ", category_idcategory='" + parentCategoryId + '\'' +
                '}';
    }
}
