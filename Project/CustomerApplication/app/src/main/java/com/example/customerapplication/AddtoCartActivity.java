package com.example.customerapplication;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.os.Bundle;
import android.view.Display;
import android.view.MenuItem;
import android.view.Window;
import android.widget.ExpandableListView;

import java.util.ArrayList;

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
}
