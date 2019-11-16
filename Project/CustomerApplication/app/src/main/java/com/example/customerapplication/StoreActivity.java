package com.example.customerapplication;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.Point;
import android.os.Bundle;
import android.util.AttributeSet;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.Toast;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

class ViewEx extends View
{
    public ViewEx(Context context)
    {
        super(context);
    }
    public ViewEx(Context context, AttributeSet att){
        super(context, att);
    }
    public void onDraw(Canvas canvas)
    {

        //10*10 행렬 기준. 나중에 map.json 받은 후 파싱해서 가로 세로 구하고 파는 물건이면 1 되도록
        String[][] arr = new String[][]{
                {"", "", "1", "1", "11", "0"},
                {"3", "", "", "", "", "0"},
                {"3", "", "", "2", "", "0"},
                {"", "", "", "", "", ""},
                {"4", "", "", "", "", ""}
                };

        int floorX = arr[0].length;
        int floorY = arr.length;
        
        int viewX = this.getWidth();
        int viewY = this.getHeight();

        canvas.drawColor(Color.WHITE);
        //canvas.drawColor(getResources().getColor(R.color.Ivory));

        Paint MyPaint = new Paint();
        MyPaint.setColor(Color.GRAY);
        MyPaint.setStrokeWidth(viewX/(floorX + 2));
        for(int j=0;j<floorY;j++){
            for(int i=0;i<floorX;i++){
                if(!(arr[j][i].equals("")))
                    canvas.drawPoint(viewX*(i+1)/(floorX+1), (viewY-viewX)/2 + viewX*(j+1)/(floorX+1), MyPaint);
            }
        }

        Paint mapEdgePaint = new Paint();
        mapEdgePaint.setColor(Color.BLACK);
        mapEdgePaint.setStrokeWidth(5f);
        mapEdgePaint.setStyle(Paint.Style.STROKE);

        Path mapEdge = new Path();
        mapEdge.moveTo(0,(viewY-viewX)/2);
        mapEdge.lineTo(0,(viewY-viewX)/2);
        mapEdge.lineTo(viewX,(viewY-viewX)/2);
        mapEdge.lineTo(viewX,(viewY+viewX)/2);
        mapEdge.lineTo(0,(viewY+viewX)/2);
        canvas.drawPath(mapEdge, mapEdgePaint);

    }
}

public class StoreActivity extends AppCompatActivity {

    Button btn_select;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        supportRequestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_store);

        Intent intent2 = getIntent();
        String toolbarTitle = intent2.getStringExtra("지점");
        //int idFloor = Integer.parseInt(intent2.getStringExtra("층수"));
        final String idFloor = intent2.getStringExtra("층수");
        String[] categoryNameArr = intent2.getStringArrayExtra("카테고리");

        Toolbar toolbar = findViewById(R.id.toolbar_store);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle(toolbarTitle);

        btn_select = (Button)findViewById(R.id.btn_select);
        btn_select.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(), AddtoCartActivity.class);
                intent.putExtra("층수", idFloor);
                //intent.putExtra("카테고리", categoryArr);
                startActivity(intent); // 다음화면으로 넘어가기
            }
        });
    }



}
