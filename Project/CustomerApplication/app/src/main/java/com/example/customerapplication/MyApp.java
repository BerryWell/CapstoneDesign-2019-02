package com.example.customerapplication;

import android.app.Application;
import android.os.StrictMode;

import com.example.customerapplication.item.DataItem;
import com.example.customerapplication.item.SubCategoryItem;

import java.util.ArrayList;

public class MyApp extends Application {
    private  ArrayList<DataItem> arCategory;
    private  ArrayList<SubCategoryItem> arSubCategory;
    private  ArrayList<ArrayList<SubCategoryItem>> listArSubCategory;
    @Override
    public void onCreate() {
        super.onCreate();
        // FileUriExposedException 문제를 해결하기 위한 코드
        StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
        StrictMode.setVmPolicy(builder.build());
    }
    public ArrayList<DataItem> getArCategory() {
        if (arCategory == null) arCategory = new ArrayList<>();
        return arCategory;
    }
    public void setArCategory(ArrayList<DataItem> item) {
        this.arCategory = item;
    }
    public ArrayList<SubCategoryItem> getArSubCategory() {
        if (arSubCategory == null) arSubCategory = new ArrayList<>();
        return arSubCategory;
    }
    public void setArSubCategory(ArrayList<SubCategoryItem> item) {
        this.arSubCategory = item;
    }

    public ArrayList<ArrayList<SubCategoryItem>> getListArSubCategory() {
        if (listArSubCategory == null) listArSubCategory = new ArrayList<>();
        return listArSubCategory;
    }
    public void setListArSubCategory(ArrayList<ArrayList<SubCategoryItem>> item) {
        this.listArSubCategory = item;
    }

}
