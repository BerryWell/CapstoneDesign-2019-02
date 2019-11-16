package com.example.customerapplication.item;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class DataItem {
    @SerializedName("idcategory")
    public String categoryId;
    @SerializedName("name")
    public String categoryName;
    public String isChecked = "NO";
    public List<SubCategoryItem> subCategory;

    public DataItem() {
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getIsChecked() {
        return isChecked;
    }

    public void setIsChecked(String isChecked) {
        this.isChecked = isChecked;
    }

    public List<SubCategoryItem> getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(List<SubCategoryItem> subCategory) {
        this.subCategory = subCategory;
    }

    @Override
    public String toString() {
        return "DataItem{" +
                "idcategory='" + categoryId + '\'' +
                ", name='" + categoryName + '\'' +
                '}';
    }
}
