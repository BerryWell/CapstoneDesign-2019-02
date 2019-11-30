package com.example.customerapplication;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.Display;
import android.view.MenuItem;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.ExpandableListView;
import android.widget.Toast;

import com.example.customerapplication.item.DataItem;
import com.example.customerapplication.item.Item;
import com.example.customerapplication.item.SubCategoryItem;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddtoCartActivity extends AppCompatActivity {
    private Button btn;
    private ExpandableListView lvCategory;

    private ArrayList<DataItem> arCategory;
    private ArrayList<SubCategoryItem> arSubCategory;
    private ArrayList<SubCategoryItem> savedArSubCategory;

    private ArrayList<HashMap<String, String>> parentItems;
    private ArrayList<ArrayList<HashMap<String, String>>> childItems;
    private MyCategoriesExpandableListAdapter myCategoriesExpandableListAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        supportRequestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_addto_cart);

        Intent intent2 = getIntent();
        final int idFloor = Integer.parseInt(intent2.getStringExtra("층수"));

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("장보기");
        //getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        btn = findViewById(R.id.btn_shopping);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ArrayList<String> shoppingList = new ArrayList();
                for (int i = 0; i < MyCategoriesExpandableListAdapter.parentItems.size(); i++ ){
                    for (int j = 0; j < MyCategoriesExpandableListAdapter.childItems.get(i).size(); j++ ){
                        String isChildChecked = MyCategoriesExpandableListAdapter.childItems.get(i).get(j).get(ConstantManager.Parameter.IS_CHECKED);
                        if (isChildChecked.equalsIgnoreCase(ConstantManager.CHECK_BOX_CHECKED_TRUE))
                        {
                            /*Toast.makeText(AddtoCartActivity.this
                                    , MyCategoriesExpandableListAdapter.childItems.get(i).get(j).get(ConstantManager.Parameter.SUB_CATEGORY_NAME)
                                    + " " + MyCategoriesExpandableListAdapter.childItems.get(i).get(j).get(ConstantManager.Parameter.CATEGORY_ID)
                                    , Toast.LENGTH_SHORT).show();*/
                            shoppingList.add(MyCategoriesExpandableListAdapter.childItems.get(i).get(j).get(ConstantManager.Parameter.CATEGORY_ID));
                        }
                    }
                }
                if(!shoppingList.isEmpty() && shoppingList.size()!=1){
                    String json = new Gson().toJson(shoppingList);
                    Log.d("Json=> ", json);
                    Intent intent = new Intent(getApplicationContext(), TSPActivity.class);
                    intent.putExtra("리스트", shoppingList);
                    intent.putExtra("층수", String.valueOf(idFloor));
                    //intent.putExtra("카테고리", categoryArr);
                    startActivity(intent); // 다음화면으로 넘어가기
                }
                else{
                    Toast.makeText(AddtoCartActivity.this
                            , "두 개 이상의 품목을 선택하세요.", Toast.LENGTH_SHORT).show();
                }

            }
        });
        setupReferences(idFloor);
    }

    private void setupReferences(int id) {
        lvCategory = findViewById(R.id.lvCategory);
        arCategory = new ArrayList<>();
        arSubCategory = new ArrayList<>();
        parentItems = new ArrayList<>();
        childItems = new ArrayList<>();
        //중첩으로 db에서 불러오기 때문에 이해하기 어려울 수 있음... category 얻어내고 category 1개에 해당하는 item 다 담는거
        final Call<JsonArray> res = Net.getInstance().getMemberFactoryIm().item_quantity_by_floor(id);
        new Thread(new Runnable(){
            @Override
            public void run() {
                try {
                    Response<JsonArray> response = res.execute();
                    DataItem[] dataJson= new Gson().fromJson(response.body(), DataItem[].class);
                    Log.d("Main 결과", dataJson[0].categoryName);
                    arCategory = new ArrayList<>();
                    for (int i = 0; i < dataJson.length; i++) {
                        arCategory.add(dataJson[i]);
                    }//for문 끗
                    ((MyApp)getApplicationContext()).setArCategory(arCategory);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }).start();
        try {
            Thread.sleep(900);
        }catch (Exception e){
            e.printStackTrace();
        }
        /*Call<JsonArray> res = Net.getInstance().getMemberFactoryIm().item_quantity_by_floor(id);
        try {
            Response<JsonArray> response = res.execute();
            DataItem[] dataJson= new Gson().fromJson(response.body(), DataItem[].class);
            Log.d("Main 결과", dataJson[0].categoryName);
            arCategory = new ArrayList<>();
            for (int i = 0; i < dataJson.length; i++) {
                arCategory.add(dataJson[i]);
            }//for문 끗
            ((MyApp)getApplicationContext()).setArCategory(arCategory);
        } catch (IOException e) {
            e.printStackTrace();
        }*/

        /*res.enqueue(new Callback<JsonArray>() {
            @Override
            public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {
                if(response.isSuccessful()){
                    if(response.body() != null){
                        Log.d("Main 통신", response.body().toString());
                        DataItem[] dataJson= new Gson().fromJson(response.body(), DataItem[].class);
                        Log.d("Main 결과", dataJson[0].categoryName);
                        arCategory = new ArrayList<>();
                        for (int i = 0; i < dataJson.length; i++) {
                            //이걸 나중에 하는거지
                            //dataJson[i].setSubCategory(((MyApp)getApplicationContext()).getArSubCategory());
                            arCategory.add(dataJson[i]);
                        }//for문 끗

                        ((MyApp)getApplicationContext()).setArCategory(arCategory);
                    }else{
                        Log.d("Main 통신", "실패 1 response 내용이 없음");
                    }
                }else{
                    Log.d("Main 통신", "실패 2 서버 에러");
                }
            }
            @Override
            public void onFailure(Call<JsonArray> call, Throwable t) {    //------------------G
                Log.d("Main 통신", "실패 3 통신 에러 "+t.getLocalizedMessage());
            }
        });*/

        arCategory = ((MyApp)getApplicationContext()).getArCategory();
        Log.d("TAG", "setupReferences: "+arCategory.size());

        final Call<JsonArray> res2 = Net.getInstance().getMemberFactoryIm().item_quantity_by_category(id);

        new Thread(new Runnable(){
            @Override
            public void run() {
                try {
                    Response<JsonArray> response = res2.execute();
                    SubCategoryItem[] dataJson2= new Gson().fromJson(response.body(), SubCategoryItem[].class);
                    arSubCategory = new ArrayList<>();
                    for (int j = 0; j < dataJson2.length; j++) {
                        dataJson2[j].setIsChecked(ConstantManager.CHECK_BOX_CHECKED_FALSE);
                        arSubCategory.add(dataJson2[j]);
                    }
                    ((MyApp)getApplicationContext()).setArSubCategory(arSubCategory);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }).start();

        try {
            Thread.sleep(900);
        }catch (Exception e){
            e.printStackTrace();
        }
        /*Call<JsonArray> res2 = Net.getInstance().getMemberFactoryIm().item_quantity_by_category(id);

        try {
            Response<JsonArray> response = res2.execute();
            SubCategoryItem[] dataJson2= new Gson().fromJson(response.body(), SubCategoryItem[].class);
            arSubCategory = new ArrayList<>();
            for (int j = 0; j < dataJson2.length; j++) {
                dataJson2[j].setIsChecked(ConstantManager.CHECK_BOX_CHECKED_FALSE);
                arSubCategory.add(dataJson2[j]);
            }
            ((MyApp)getApplicationContext()).setArSubCategory(arSubCategory);
        } catch (IOException e) {
            e.printStackTrace();
        }
*/
        /*res2.enqueue(new Callback<JsonArray>() {
            @Override
            public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {
                if(response.isSuccessful()){
                    if(response.body() != null){
                        Log.d("Main 통신", response.body().toString());
                        SubCategoryItem[] dataJson2= new Gson().fromJson(response.body(), SubCategoryItem[].class);
                        Log.d("Main 결과", dataJson2[0].subCategoryName);
                        arSubCategory = new ArrayList<>();
                        for (int j = 0; j < dataJson2.length; j++) {
                            dataJson2[j].setIsChecked(ConstantManager.CHECK_BOX_CHECKED_FALSE);
                            arSubCategory.add(dataJson2[j]);
                        }
                        ((MyApp)getApplicationContext()).setArSubCategory(arSubCategory);
                        //((MyApp)getApplicationContext()).getListArSubCategory().add(arSubCategory);
                    }else{
                        Log.d("Main 통신", "실패 1 response 내용이 없음");
                    }
                }else{
                    Log.d("Main 통신", "실패 2 서버 에러");
                }
            }
            @Override
            public void onFailure(Call<JsonArray> call, Throwable t) {    //------------------G
                Log.d("Main 통신", "실패 3 통신 에러 "+t.getLocalizedMessage());
            }
        });*/

        savedArSubCategory = ((MyApp)getApplicationContext()).getArSubCategory();

        for(int i=0; i<arCategory.size(); i++){
            arSubCategory = new ArrayList<>();
            for(int j=0; j<savedArSubCategory.size();j++){
                if(arCategory.get(i).getCategoryId().equals(savedArSubCategory.get(j).parentCategoryId)){
                    arSubCategory.add(savedArSubCategory.get(j));
                }
            }
            arCategory.get(i).setSubCategory(arSubCategory);
        }
////
        for(DataItem data : arCategory){
            ArrayList<HashMap<String, String>> childArrayList =new ArrayList<HashMap<String, String>>();
            HashMap<String, String> mapParent = new HashMap<String, String>();

            mapParent.put(ConstantManager.Parameter.CATEGORY_ID,data.getCategoryId());
            mapParent.put(ConstantManager.Parameter.CATEGORY_NAME,data.getCategoryName());

            int countIsChecked = 0;
            for(SubCategoryItem subCategoryItem : data.getSubCategory()) {

                HashMap<String, String> mapChild = new HashMap<String, String>();
                mapChild.put(ConstantManager.Parameter.SUB_ID,subCategoryItem.getSubId());
                mapChild.put(ConstantManager.Parameter.SUB_CATEGORY_NAME,subCategoryItem.getSubCategoryName());
                mapChild.put(ConstantManager.Parameter.CATEGORY_ID,subCategoryItem.getCategoryId());
                mapChild.put(ConstantManager.Parameter.IS_CHECKED,subCategoryItem.getIsChecked());

                if(subCategoryItem.getIsChecked().equalsIgnoreCase(ConstantManager.CHECK_BOX_CHECKED_TRUE)) {

                    countIsChecked++;
                }
                childArrayList.add(mapChild);
            }

            if(countIsChecked == data.getSubCategory().size()) {

                data.setIsChecked(ConstantManager.CHECK_BOX_CHECKED_TRUE);
            }else {
                data.setIsChecked(ConstantManager.CHECK_BOX_CHECKED_FALSE);
            }

            mapParent.put(ConstantManager.Parameter.IS_CHECKED,data.getIsChecked());
            childItems.add(childArrayList);
            parentItems.add(mapParent);

        }

        ConstantManager.parentItems = parentItems;
        ConstantManager.childItems = childItems;

        myCategoriesExpandableListAdapter = new MyCategoriesExpandableListAdapter(this,parentItems,childItems,false);
        lvCategory.setAdapter(myCategoriesExpandableListAdapter);
    }

}
