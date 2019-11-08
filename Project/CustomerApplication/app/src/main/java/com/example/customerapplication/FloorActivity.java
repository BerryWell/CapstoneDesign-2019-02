package com.example.customerapplication;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.ActionBar;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.example.customerapplication.item.Floor;

import java.util.ArrayList;

public class FloorActivity extends AppCompatActivity {

    private static RecyclerView.Adapter adapter;
    private RecyclerView.LayoutManager layoutManager;
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

        myOnClickListener = new MyOnClickListener(this);
        recyclerView = (RecyclerView) findViewById(R.id.my_recycler_view);
        recyclerView.setHasFixedSize(true);
        layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        data = new ArrayList<Floor>();
        for (int i = 0; i < MyData.nameArray.length; i++) {
            data.add(new Floor(
                    MyData.id_[i],
                    MyData.nameArray[i]
            ));
        }
        removedItems = new ArrayList<Integer>();
        adapter = new CustomAdapter(data);
        recyclerView.setAdapter(adapter);
    }
    private class MyOnClickListener implements View.OnClickListener {
        private final Context context;
        private MyOnClickListener(Context context) {
            this.context = context;
        }
        @Override
        public void onClick(View v) {
            Intent intent = new Intent(getApplicationContext(), StoreActivity.class);
            intent.putExtra("지점",toolbarTitle);
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
