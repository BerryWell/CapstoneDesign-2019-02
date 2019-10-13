package com.example.customerapplication;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.os.Bundle;
import android.os.Handler;
import android.view.Window;

public class IntroActivity extends AppCompatActivity {


    /*Handler handler = new Handler();

    Runnable r = new Runnable() {
        @Override
        public void run() {
            Intent intent = new Intent(getApplicationContext(), MainActivity.class);
            startActivity(intent); // 다음화면으로 넘어가기
            finish(); // Activity 화면 제거
        }
    };*/

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        supportRequestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_intro);
        checkInternetState();
    }
    /*
    @Override
    protected void onResume() {
        super.onResume();
// 다시 화면에 들어어왔을 때 예약 걸어주기
        handler.postDelayed(r, 2000); // 2초 뒤에 Runnable 객체 수행
    }

    @Override
    protected void onPause() {
        super.onPause();
// 화면을 벗어나면, handler 에 예약해놓은 작업을 취소하자
        handler.removeCallbacks(r); // 예약 취소
    }*/

    private void checkInternetState(){
        ConnectivityManager cm = (ConnectivityManager) getSystemService(CONNECTIVITY_SERVICE);
        assert cm != null;
        if(!(cm.getActiveNetwork() != null && cm.getActiveNetworkInfo().isConnected())){
            new AlertDialog.Builder(this)
                    .setMessage(R.string.network_fail)
                    .setCancelable(false)
                    .setPositiveButton(R.string.submit, new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialogInterface, int i) {
                            finishAffinity();
                        }
                    }).show();
        }
        else
        {
            Handler mHandler = new Handler();
            mHandler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    startTask();
                }
            }, 2000);
        }
    }

    public void startTask() {
        startMain();
    }

    public void startMain() {
        Intent intent = new Intent(IntroActivity.this, MainActivity.class);
        startActivity(intent);

        finish();
    }

}