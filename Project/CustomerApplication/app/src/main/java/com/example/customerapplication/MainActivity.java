package com.example.customerapplication;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.GoogleMapOptions;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

public class MainActivity extends AppCompatActivity implements OnMapReadyCallback, GoogleMap.OnMarkerClickListener {

    private GoogleMap mMap;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        supportRequestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }
    @Override
    public void onMapReady(final GoogleMap googleMap) {

        mMap = googleMap;

        LatLng CHONGANG = new LatLng(37.503, 126.957);
        MarkerOptions markerOptions = new MarkerOptions();
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
        mMap.addMarker(markerOptions2);

        mMap.setOnMarkerClickListener(this);

        mMap.moveCamera(CameraUpdateFactory.newLatLng(CHONGANG));
        mMap.animateCamera(CameraUpdateFactory.zoomTo(16));
    }

    @Override
    public boolean onMarkerClick(final Marker marker) {
        //Toast.makeText(this, marker.getTitle() + "\n" + marker.getPosition(), Toast.LENGTH_SHORT).show();
        AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
        //builder.setTitle(" ");

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
                        //Intent intent = new Intent(getApplicationContext(), StoreActivity.class);
                        Intent intent = new Intent(getApplicationContext(), FloorActivity.class);
                        intent.putExtra("지점",marker.getTitle());
                        //Log.d("markertitle",marker.getTitle());
                        startActivity(intent); // 다음화면으로 넘어가기
                    }
                });
        builder.show();

        //Toast.makeText(this, marker.getTitle() + "\n" + marker.getPosition(), Toast.LENGTH_SHORT).show();

        return false;
    }
}
