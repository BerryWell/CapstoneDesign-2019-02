package com.example.customerapplication;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.RecyclerView;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.widget.Toast;

import com.example.customerapplication.item.Floor;
import com.example.customerapplication.item.Mall;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.GoogleMapOptions;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.gson.Gson;
import com.google.gson.JsonArray;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity implements OnMapReadyCallback, GoogleMap.OnMarkerClickListener {

    private GpsTracker gpsTracker;

    private GoogleMap mMap;

    MarkerOptions markerOption[];
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        supportRequestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //dbTest();

        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }
    @Override
    public void onMapReady(final GoogleMap googleMap) {

        mMap = googleMap;

        gpsTracker = new GpsTracker(this);

        double latitude = gpsTracker.getLatitude();
        double longitude = gpsTracker.getLongitude();

        LatLng position = new LatLng(latitude, longitude);
        Log.d("현재 위치: ",latitude + ", " + longitude);

        //db에서 mall의 idmall, name, 위도, 경도 받아오기 -> intent로 idmall도 보내주기.
        findMalls();

        LatLng CHONGANG = new LatLng(37.503, 126.957);
        /*MarkerOptions markerOptions = new MarkerOptions();
        markerOptions.position(CHONGANG);
        markerOptions.title("중앙대점");
        mMap.addMarker(markerOptions);

        LatLng option1 = new LatLng(37.500, 126.953);
        MarkerOptions markerOptions1 = new MarkerOptions();
        markerOptions1.position(option1);
        markerOptions1.title("상도역점");
        mMap.addMarker(markerOptions1);

        LatLng option2 = new LatLng(37.507, 126.959);
        MarkerOptions markerOptions2 = new MarkerOptions();
        markerOptions2.position(option2);
        markerOptions2.title("흑석역점");
        mMap.addMarker(markerOptions2);*/

        mMap.setOnMarkerClickListener(this);

        mMap.moveCamera(CameraUpdateFactory.newLatLng(position));
        ////////////////////아래 데모 시 필히 지울 것
        mMap.moveCamera(CameraUpdateFactory.newLatLng(CHONGANG));
        /////////////////
        mMap.animateCamera(CameraUpdateFactory.zoomTo(16));
    }

    @Override
    public boolean onMarkerClick(final Marker marker) {
        AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);

        builder.setMessage("해당 매장으로 이동합니까?");
        builder.setNegativeButton("아니오",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        // do nothing
                    }
                });
        builder.setPositiveButton("예",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        Intent intent = new Intent(getApplicationContext(), FloorActivity.class);
                        intent.putExtra("지점",marker.getTitle());
                        intent.putExtra("ID",marker.getSnippet().substring(0,marker.getSnippet().length()-2));
                        startActivity(intent); // 다음화면으로 넘어가기
                    }
                });
        builder.show();

        return false;
    }
    private void findMalls() {
        Call<JsonArray> res = Net.getInstance().getMemberFactoryIm().findMalls();
        res.enqueue(new Callback<JsonArray>() {       // --------------------------- E
            @Override
            public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {   // ---------- F
                if(response.isSuccessful()){
                    if(response.body() != null){ //null 뿐 아니라 오류 값이 들어올 때도 처리해줘야 함.
                        Log.d("Main 통신", response.body().toString());
                        Mall[] dataJson= new Gson().fromJson(response.body(), Mall[].class);
                        Log.d("Main 결과", dataJson[4].name);
                        markerOption = new MarkerOptions[dataJson.length];
                        for (int i = 0; i < dataJson.length; i++) {
                            markerOption[i] = new MarkerOptions();
                            markerOption[i].position(new LatLng(dataJson[i].latitude,dataJson[i].longitude));
                            markerOption[i].title(dataJson[i].name);
                            //markerOption[i].snippet(String.valueOf(dataJson[i].idmall));
                            markerOption[i].snippet(dataJson[i].idmall + "호점");
                            mMap.addMarker(markerOption[i]);
                        }
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
    private void dbTest() {
        Call<String> res = Net.getInstance().getMemberFactoryIm().test();   //--------- D
        res.enqueue(new Callback<String>() {       // --------------------------- E
            @Override
            public void onResponse(Call<String> call, Response<String> response) {   // ---------- F
                if(response.isSuccessful()){
                    if(response.body() != null){ //null 뿐 아니라 오류 값이 들어올 때도 처리해줘야 함.
                        //String users = response.body(); //body()는, json 으로 컨버팅되어 객체에 담겨 지정되로 리턴됨.
                        Log.d("Main 통신", response.body());
                        Toast.makeText(MainActivity.this, "API 연결 성공", Toast.LENGTH_SHORT).show();
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
