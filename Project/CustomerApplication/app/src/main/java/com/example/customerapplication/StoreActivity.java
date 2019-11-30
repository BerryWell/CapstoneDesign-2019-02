package com.example.customerapplication;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.Point;
import android.graphics.Rect;
import android.graphics.drawable.BitmapDrawable;
import android.os.Bundle;
import android.util.AttributeSet;
import android.util.Log;
import android.view.Display;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.customerapplication.item.Map;
import com.google.android.material.snackbar.Snackbar;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/* class ViewEx extends View{
    int floorX;
    int floorY;
    int viewX;
    int viewY;
    float touchInfoX = -1;
    float touchInfoY = -1;


    public static String[][] arr ;
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
        arr = new String[][]{
                {"", "", "1", "1", "6", "0"},
                {"3", "", "", "", "", "0"},
                {"3", "", "", "2", "", "5"},
                {"", "", "", "", "", ""},
                {"4", "", "", "", "", ""}
        };

        floorX = arr[0].length;
        floorY = arr.length;

        viewX = this.getWidth();
        viewY = this.getHeight();

        super.onDraw(canvas);

        canvas.drawColor(Color.WHITE);

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
        mapEdge.lineTo(0,(viewY-viewX)/2);
        canvas.drawPath(mapEdge, mapEdgePaint);

        if (touchInfoX > 0 && touchInfoY > 0) {
            int touchX = (int)((touchInfoX*(floorX+1)/viewX)-0.5);
            int centerX = viewX*(touchX+1)/(floorX+1);
            int touchY = (int)(((floorX+1)*(2*touchInfoY-viewY+viewX)/(2*viewX))-0.5);
            int centerY = (viewY-viewX)/2 + viewX*(touchY+1)/(floorX+1);
            //canvas.drawCircle(touchInfoX - 5, touchInfoY - 5, 10, mapEdgePaint);
            Paint pt = new Paint();
            //pt.setTextSize(60);
            pt.setTextSize(2*viewX/((floorX + 2)*5));

            pt.setColor(0xFF000000);
            pt.setStyle(Paint.Style.FILL_AND_STROKE);

            //Bitmap bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.shopping_cart);
            //canvas.drawBitmap(bitmap, touchInfoX,touchInfoY,null);
            canvas.drawText(arr[touchY][touchX] + "번품목",centerX-70,centerY-10,pt);
            //canvas.drawText("생선물",centerX-70,centerY,pt);
        }
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        super.onTouchEvent(event);
        Log.d ("motionEvent", event.toString());
        if (event.getAction()==MotionEvent.ACTION_UP){
            Log.d("X의 i+1= ", (event.getX()*(floorX+1)/viewX)-0.5 + "");   //0,1,2,3,4,5 0이상 6미만 받기!
            Log.d("Y의 j+1= ", ((floorX+1)*(2*event.getY()-viewY+viewX)/(2*viewX))-0.5 + "");   //0,1,2,3,4
            touchInfoX = event.getX();
            touchInfoY = event.getY();
            int touchX = (int)((event.getX()*(floorX+1)/viewX)-0.5);
            int touchY = (int)(((floorX+1)*(2*event.getY()-viewY+viewX)/(2*viewX))-0.5);
            if(touchX>=0 && touchX<floorX && touchY>=0 && touchY<floorY){
                if(!arr[touchY][touchX].equals("")){
                    //map json file에서 받을수도 있을듯!
                    Log.d("터치된 상품의 touchInfoX =", String.valueOf(touchInfoX)); //iditem 받아서 item name 출력. 0, -1의 경우 예외처리 (벽, 정문 등...)
                    Log.d("터치된 상품의 touchX =", String.valueOf((event.getX()*(floorX+1)/viewX)-0.5));
                    Snackbar.make(this, "터치된 상품의 iditem =" + arr[touchY][touchX], Snackbar.LENGTH_SHORT).show();
                    invalidate();
                }
            }
        }
        //this.postInvalidate();
        return true;
    }
}*/

public class StoreActivity extends AppCompatActivity {

    Button btn_select;

    public String[][] arr;
    private ViewEx vw;

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


        Call<JsonObject> res = Net.getInstance().getMemberFactoryIm().map_id(Integer.parseInt(idFloor));
        res.enqueue(new Callback<JsonObject>() {       // --------------------------- E
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {   // ---------- F
                if(response.isSuccessful()){
                    if(response.body() != null){ //null 뿐 아니라 오류 값이 들어올 때도 처리해줘야 함.
                        Log.d("Main 통신", response.body().toString());

                        Map dataJson= new Gson().fromJson(response.body(), Map.class);
                        Log.d("Main 통신", dataJson.map);
                        arr = new Gson().fromJson(dataJson.map, String[][].class);
                        Log.d("Main 통신", arr[0][1]);

                        //Log.d("Main 통신", dataJson.map.get(0).toString());
                        //Log.d("Main 통신", dataJson[0].map.get(0));

                    }else{
                        Log.d("Main 통신", "실패 1 response 내용이 없음");
                    }
                }else{
                    Log.d("Main 통신", "실패 2 서버 에러 "+ response.message() + call.request().url().toString());
                }
            }
            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {    //------------------G
                Log.d("Main 통신", "실패 3 통신 에러 "+t.getLocalizedMessage());
            }
        });

    }
    class ViewEx extends View{
        int floorX;
        int floorY;
        int viewX;
        int viewY;
        float touchInfoX = -1;
        float touchInfoY = -1;

        /*public static String[][] arr ;*/
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

            arr = new String[][]{
                    {"", "0", "1", "1", "6", "0"},
                    {"3", "", "", "", "", "0"},
                    {"3", "", "", "2", "", "5"},
                    {"", "", "", "", "", ""},
                    {"4", "", "", "", "", ""}
            };

            floorX = arr[0].length;
            floorY = arr.length;

            viewX = this.getWidth();
            viewY = this.getHeight();

            super.onDraw(canvas);

            canvas.drawColor(Color.WHITE);

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
            mapEdge.lineTo(0,(viewY-viewX)/2);
            canvas.drawPath(mapEdge, mapEdgePaint);

            if (touchInfoX > 0 && touchInfoY > 0) {
                int touchX = (int)((touchInfoX*(floorX+1)/viewX)-0.5);
                int centerX = viewX*(touchX+1)/(floorX+1);
                int touchY = (int)(((floorX+1)*(2*touchInfoY-viewY+viewX)/(2*viewX))-0.5);
                int centerY = (viewY-viewX)/2 + viewX*(touchY+1)/(floorX+1);
                //canvas.drawCircle(touchInfoX - 5, touchInfoY - 5, 10, mapEdgePaint);
                Paint pt = new Paint();
                //pt.setTextSize(60);
                pt.setTextSize(2*viewX/((floorX + 2)*5));

                pt.setColor(0xFF000000);
                pt.setStyle(Paint.Style.FILL_AND_STROKE);

                //Bitmap bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.shopping_cart);
                //canvas.drawBitmap(bitmap, touchInfoX,touchInfoY,null);
                canvas.drawText(arr[touchY][touchX] + "번품목",centerX-70,centerY-10,pt);
                //canvas.drawText("생선물",centerX-70,centerY,pt);
            }
        }

        @Override
        public boolean onTouchEvent(MotionEvent event) {
            super.onTouchEvent(event);
            Log.d ("motionEvent", event.toString());
            if (event.getAction()==MotionEvent.ACTION_UP){
                Log.d("X의 i+1= ", (event.getX()*(floorX+1)/viewX)-0.5 + "");   //0,1,2,3,4,5 0이상 6미만 받기!
                Log.d("Y의 j+1= ", ((floorX+1)*(2*event.getY()-viewY+viewX)/(2*viewX))-0.5 + "");   //0,1,2,3,4
                touchInfoX = event.getX();
                touchInfoY = event.getY();
                int touchX = (int)((event.getX()*(floorX+1)/viewX)-0.5);
                int touchY = (int)(((floorX+1)*(2*event.getY()-viewY+viewX)/(2*viewX))-0.5);
                if(touchX>=0 && touchX<floorX && touchY>=0 && touchY<floorY){
                    if(!arr[touchY][touchX].equals("")){
                        //map json file에서 받을수도 있을듯!
                        Log.d("터치된 상품의 touchInfoX =", String.valueOf(touchInfoX)); //iditem 받아서 item name 출력. 0, -1의 경우 예외처리 (벽, 정문 등...)
                        Log.d("터치된 상품의 touchX =", String.valueOf((event.getX()*(floorX+1)/viewX)-0.5));
                        Snackbar.make(this, "터치된 상품의 iditem =" + arr[touchY][touchX], Snackbar.LENGTH_SHORT).show();
                        invalidate();
                    }
                }
            }
            //this.postInvalidate();
            return true;
        }
    }


}
