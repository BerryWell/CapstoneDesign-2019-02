package com.example.customerapplication;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.ActionBar;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ExpandableListView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.customerapplication.item.Floor;
import com.example.customerapplication.item.Item;
import com.google.gson.Gson;
import com.google.gson.JsonArray;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class FloorActivity extends AppCompatActivity {

    private static RecyclerView.Adapter adapter;
    private RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(this);
    private static RecyclerView recyclerView;
    private static ArrayList<Floor> data;
    static View.OnClickListener myOnClickListener;
    private static ArrayList<Integer> removedItems;
    String toolbarTitle;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_floor);

        Intent intent = getIntent();
        toolbarTitle = intent.getStringExtra("지점");
        ////////////id도 intent로 받아와야 함
        getItemsByMall(5);

        myOnClickListener = new MyOnClickListener(this);
    }
    private class MyOnClickListener implements View.OnClickListener {
        private final Context context;
        private MyOnClickListener(Context context) {
            this.context = context;
        }
        @Override
        public void onClick(View v) {
            int selectedItemPosition = recyclerView.getChildPosition(v);
            RecyclerView.ViewHolder viewHolder
                    = recyclerView.findViewHolderForPosition(selectedItemPosition);

            /*TextView textViewFloor
                    = viewHolder.itemView.findViewById(R.id.textViewName);
            String selectedFloor = (String) textViewFloor.getText();
            selectedFloor = selectedFloor.substring(0, selectedFloor.length()-1);   //1F에서 F 삭제*/

            Floor selectedItem = data.get(selectedItemPosition);
            String selectedId = selectedItem.getIdfloor();

            TextView textViewCategory
                    = viewHolder.itemView.findViewById(R.id.textViewVersion);
            String selectedCategory = (String) textViewCategory.getText();
            Log.d("층의 id와 카테고리", selectedId + " " + selectedCategory);

            String[] categoryArr = selectedCategory.split(","); //문자열을 배열로

            Log.d("카테고리 1, 2", categoryArr[0] + " " + categoryArr[1]);

            Intent intent = new Intent(getApplicationContext(), StoreActivity.class);
            intent.putExtra("지점",toolbarTitle);
            intent.putExtra("층수", selectedId);
            intent.putExtra("카테고리", categoryArr);

            startActivity(intent); // 다음화면으로 넘어가기
        }
        /*@Override
        public void onClick(View v) {
            removeItem(v);
        }
        private void removeItem(View v) {
            int selectedItemPosition = recyclerView.getChildPosition(v);
            RecyclerView.ViewHolder viewHolder
                    = recyclerView.findViewHolderForPosition(selectedItemPosition);
            TextView textViewName
                    = (TextView) viewHolder.itemView.findViewById(R.id.textViewName);
            String selectedName = (String) textViewName.getText();
            int selectedItemId = -1;
            for (int i = 0; i < MyData.nameArray.length; i++) {
                if (selectedName.equals(MyData.nameArray[i])) {
                    selectedItemId = MyData.id_[i];
                }
            }
            removedItems.add(selectedItemId);
            data.remove(selectedItemPosition);
            adapter.notifyItemRemoved(selectedItemPosition);
        }*/
    }

    private void getItemsByMall(final int id) {

        Call<JsonArray> res = Net.getInstance().getMemberFactoryIm().item_quantity(id);

        res.enqueue(new Callback<JsonArray>() {       // --------------------------- E
            @Override
            public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {   // ---------- F
                if(response.isSuccessful()){
                    if(response.body() != null){ //null 뿐 아니라 오류 값이 들어올 때도 처리해줘야 함.
                        Log.d("Main 통신", response.body().toString());
                        Floor[] dataJson= new Gson().fromJson(response.body(), Floor[].class);
                        Log.d("Main 결과", dataJson[0].category);
                        recyclerView = (RecyclerView) findViewById(R.id.my_recycler_view);
                        recyclerView.setHasFixedSize(true);
                        recyclerView.setLayoutManager(layoutManager);
                        recyclerView.setItemAnimator(new DefaultItemAnimator());
                        data = new ArrayList<Floor>();
                        for (int i = 0; i < dataJson.length; i++) {
                            data.add(new Floor(dataJson[i].idfloor, dataJson[i].category, dataJson[i].number));
                        }
                        removedItems = new ArrayList<Integer>();
                        adapter = new CustomAdapter(data);
                        recyclerView.setAdapter(adapter);

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

    /*@Override
    public boolean onCreateOptionsMenu(Menu menu) {
        super.onCreateOptionsMenu(menu);
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        super.onOptionsItemSelected(item);
        if (item.getItemId() == R.id.add_item) {
            //check if any items to add
            if (removedItems.size() != 0) {
                addRemovedItemToList();
            } else {
                Toast.makeText(this, "Nothing to add", Toast.LENGTH_SHORT).show();
            }
        }
        return true;
    }
    private void addRemovedItemToList() {
        int addItemAtListPosition = 3;
        data.add(addItemAtListPosition, new Floor(
                MyData.id_[removedItems.get(0)],
                MyData.nameArray[removedItems.get(0)]
        ));
        adapter.notifyItemInserted(addItemAtListPosition);
        removedItems.remove(0);
    }*/
}
