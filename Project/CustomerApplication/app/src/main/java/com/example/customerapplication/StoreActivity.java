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
        int[][] arr = new int[][]{{0,0,0,0,0,0,0,0,0,1},{0,1,1,1,1,1,1,1,0,1},{0,1,1,1,1,1,1,1,0,1},{0,0,0,0,0,0,0,0,0,1},
                {0,0,0,0,0,0,0,0,0,1},{0,1,1,1,1,1,1,1,0,1},{0,1,1,1,1,1,1,1,0,1},{0,0,0,0,0,0,0,0,0,1},{1,1,1,1,1,1,1,1,1,1},{1,1,1,1,1,1,1,1,1,1}};

        int floorX = 10;
        int floorY = 10;
        
        int viewX = this.getWidth();
        int viewY = this.getHeight();

        canvas.drawColor(Color.WHITE);

        Paint MyPaint = new Paint();
        MyPaint.setColor(Color.GRAY);
        MyPaint.setStrokeWidth(viewX/(floorX + 2));
        for(int j=0;j<floorY;j++){
            for(int i=0;i<floorX;i++){
                if(arr[j][i]==1)
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
        //ViewEx viewEx = new ViewEx(this);
        //setContentView(viewEx);
        //Display display = getWindowManager().getDefaultDisplay();
        //Point size = new Point();
        //display.getSize(size);

        dbTest();

        setContentView(R.layout.activity_store);

        Intent intent2 = getIntent();
        String toolbarTitle = intent2.getStringExtra("지점");

        Toolbar toolbar = findViewById(R.id.toolbar_store);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle(toolbarTitle);

        btn_select = (Button)findViewById(R.id.btn_select);
        btn_select.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(), AddtoCartActivity.class);
                startActivity(intent); // 다음화면으로 넘어가기
            }
        });
    }
    private void dbTest() {
        Call<String> res = Net.getInstance().getMemberFactoryIm().test();   //--------- D
        res.enqueue(new Callback<String>() {       // --------------------------- E
            @Override
            public void onResponse(Call<String> call, Response<String> response) {   // ---------- F
                if(response.isSuccessful()){
                    if(response.body() != null){ //null 뿐 아니라 오류 값이 들어올 때도 처리해줘야 함.
                        //String users = response.body(); //body()는, json 으로 컨버팅되어 객체에 담겨 지정되로 리턴됨.
                        //여기서는 지정을 Call<지정타입> 이므로 List<User> 가 리턴타입이 됨.
                        Log.d("Main 통신", response.body());
                        Toast.makeText(StoreActivity.this, "API 연결 성공", Toast.LENGTH_SHORT).show();
                        // DO SOMETHING HERE with users!

                    }else{
                        Log.d("Main 통신", "실패 1 response 내용이 없음");
                    }
                }else{
                    Log.d("Main 통신", "실패 2 서버 에러 "+ response.message() + call.request().url().toString());
                }
            }
            @Override
            public void onFailure(Call<String> call, Throwable t) {    //------------------G
                Log.d("Main 통신", "실패 3 통신 에러 "+t.getLocalizedMessage());
            }
        });
    }


}
