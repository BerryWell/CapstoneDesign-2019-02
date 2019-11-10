package com.example.customerapplication;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.view.MenuItem;
import android.view.Window;
import android.widget.ExpandableListView;

import com.example.customerapplication.item.Item;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import org.json.JSONObject;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddtoCartActivity extends AppCompatActivity {
    private ExpandableListView listView;

    @Override
    public boolean onOptionsItemSelected(MenuItem item ){
        switch(item.getItemId()){
            case android.R.id.home:
                finish();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        supportRequestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_addto_cart);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("장보기");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        Display newDisplay = getWindowManager().getDefaultDisplay();
        int width = newDisplay.getWidth();

        getItem(width);
        /*
        myGroup temp = new myGroup("육류");
        temp.child.add("소고기");
        temp.child.add("돼지고기");
        temp.child.add("양고기");
        DataList.add(temp);
        temp = new myGroup("어류");
        temp.child.add("고등어");
        temp.child.add("꽁치");
        temp.child.add("자갈치");
        DataList.add(temp);
        temp = new myGroup("공산품");
        temp.child.add("치토스");
        temp.child.add("포카칩");
        temp.child.add("트윅스");
        DataList.add(temp);
        */
    }

    private void getItem(final int width) {

        Call<JsonArray> res = Net.getInstance().getMemberFactoryIm().items();
            //Call<List<Item>> res = Net.getInstance().getMemberFactoryIm().items();   //--------- D

            res.enqueue(new Callback<JsonArray>() {       // --------------------------- E
                @Override
                public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {   // ---------- F
                    if(response.isSuccessful()){
                        if(response.body() != null){ //null 뿐 아니라 오류 값이 들어올 때도 처리해줘야 함.
                            //List<Item> items = response.body(); //body()는, json 으로 컨버팅되어 객체에 담겨 지정되로 리턴됨.
                            //여기서는 지정을 Call<지정타입> 이므로 List<Item> 가 리턴타입이 됨.
                            //Gson gson = new Gson();
                            //Item resItem = gson.fromJson(response.body(),Item.class);
                            Log.d("Main 통신", response.body().toString());
                            Item[] dataJson= new Gson().fromJson(response.body(), Item[].class);
                            Log.d("Main 결과", dataJson[0].category);
                            String[] cateArr = new String [3];
                            String[][]itemArr = new String[3][3];
                            ArrayList<myGroup> DataList = new ArrayList<myGroup>();
                            listView = (ExpandableListView)findViewById(R.id.mylist);
                            for(int i=0;i<3;i++){
                                cateArr[i]=dataJson[i*3].category;
                                for(int j=0;j<3;j++){
                                    itemArr[i][j] = dataJson[i*3+j].item;
                                }
                            }
                            for(int i=0;i<3;i++){
                                myGroup temp = new myGroup(cateArr[i]);
                                for(int j=0;j<3;j++){
                                    temp.child.add(itemArr[i][j]);
                                }
                                DataList.add(temp);
                            }

                            ExpandAdapter adapter = new ExpandAdapter(getApplicationContext(),R.layout.group_row,R.layout.child_row,DataList);
                            listView.setIndicatorBounds(width-50, width); //이 코드를 지우면 화살표 위치가 바뀐다.
                            listView.setAdapter(adapter);
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
            });

        }

}
