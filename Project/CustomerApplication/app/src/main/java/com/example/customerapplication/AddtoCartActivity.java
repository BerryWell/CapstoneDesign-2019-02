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

        getItem();

        ArrayList<myGroup> DataList = new ArrayList<myGroup>();
        listView = (ExpandableListView)findViewById(R.id.mylist);
        myGroup temp = new myGroup("FOOD");
        temp.child.add("쌀/잡곡");
        temp.child.add("채소");
        temp.child.add("과일");
        temp.child.add("정육/계란");
        DataList.add(temp);
        temp = new myGroup("LIVING");
        temp.child.add("화장지/물티슈/위생");
        temp.child.add("세제/탈취/제습");
        temp.child.add("유아/출산용품");
        temp.child.add("가구/수납/조명/보수");
        DataList.add(temp);
        temp = new myGroup("BEAUTY");
        temp.child.add("헤어케어");
        temp.child.add("페이셜 케어");
        temp.child.add("메이크업");
        temp.child.add("구강케어");
        DataList.add(temp);
        temp = new myGroup("STYLE");
        temp.child.add("성인/아동의류");
        temp.child.add("언더웨어/양말");
        temp.child.add("패션잡화");
        temp.child.add("슈즈");
        DataList.add(temp);

        ExpandAdapter adapter = new ExpandAdapter(getApplicationContext(),R.layout.group_row,R.layout.child_row,DataList);
        listView.setIndicatorBounds(width-50, width); //이 코드를 지우면 화살표 위치가 바뀐다.
        listView.setAdapter(adapter);
    }

    private void getItem() {
        //String email = editText_email.getText().toString();
        //String pwd = editText_password.getText().toString();

        Call<JsonObject> res = Net.getInstance().getMemberFactoryIm().items();
            //Call<List<Item>> res = Net.getInstance().getMemberFactoryIm().items();   //--------- D

            res.enqueue(new Callback<JsonObject>() {       // --------------------------- E
                @Override
                public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {   // ---------- F
                    if(response.isSuccessful()){
                        if(response.body() != null){ //null 뿐 아니라 오류 값이 들어올 때도 처리해줘야 함.
                            //List<Item> items = response.body(); //body()는, json 으로 컨버팅되어 객체에 담겨 지정되로 리턴됨.
                            //여기서는 지정을 Call<지정타입> 이므로 List<Item> 가 리턴타입이 됨.
                            //Gson gson = new Gson();
                            //Item resItem = gson.fromJson(response.body(),Item.class);
                            Log.d("Main 통신", response.body().toString());
                            Item dataJson= new Gson().fromJson(response.body(), Item.class);


                            // DO SOMETHING HERE with items!

                        }else{
                            Log.d("Main 통신", "실패 1 response 내용이 없음");
                        }
                    }else{
                        Log.d("Main 통신", "실패 2 서버 에러");
                    }
                }

                @Override
                public void onFailure(Call<JsonObject> call, Throwable t) {    //------------------G
                    Log.d("Main 통신", "실패 3 통신 에러 "+t.getLocalizedMessage());
                }
            });

        }

}
