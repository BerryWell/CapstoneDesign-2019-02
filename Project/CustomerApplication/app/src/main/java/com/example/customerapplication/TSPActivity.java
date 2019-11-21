package com.example.customerapplication;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.content.Intent;
import android.graphics.Point;
import android.os.Bundle;
import android.view.Display;
import android.view.View;
import android.view.Window;
import android.widget.Toast;

import com.example.customerapplication.TSP.City;
import com.example.customerapplication.TSP.Tour;
import com.example.customerapplication.TSP.TourManager;

import java.util.ArrayList;

public class TSPActivity extends AppCompatActivity {

    private ViewEx vw;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        supportRequestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        vw = new ViewEx(this);
        //setContentView(R.layout.activity_tsp);
        setContentView(vw);

        Display display = getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        vw.viewX = size.x;
        vw.viewY = size.y;
        /////////////////하드코딩으로 받음 바꿀것!!!
        vw.floorX=6;
        vw.floorY=5;

        Intent intent2 = getIntent();
        String toolbarTitle = intent2.getStringExtra("지점");
        //int idFloor = Integer.parseInt(intent2.getStringExtra("층수"));
        ArrayList shoppingList = intent2.getStringArrayListExtra("리스트");

        /*Toolbar toolbar = findViewById(R.id.toolbar_store);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle(toolbarTitle);*/

        boolean exitOuterLoop = false;
        TourManager.clearArrayList();

        for(int i=0; i<shoppingList.size();i++){
            for(int j=0; j< ViewEx.arr.length;j++){
                for(int k=0; k<ViewEx.arr[j].length;k++){
                    if(ViewEx.arr[j][k].equals(shoppingList.get(i))){
                        City city = new City(j,k);
                        TourManager.addCity(city);
                        exitOuterLoop = true;
                        break;
                    }
                }
                if(exitOuterLoop)
                    break;
            }
            exitOuterLoop = false;
        }

        // Set initial temp
        double temp = 10000;

        // Cooling rate
        double coolingRate = 0.003;

        // Initialize intial solution
        Tour currentSolution = new Tour();
        currentSolution.generateIndividual();

        System.out.println("Initial solution distance: " + currentSolution.getDistance());

        // Set as current best
        Tour best = new Tour(currentSolution.getTour());

        // Loop until system has cooled
        while (temp > 1) {
            // Create new neighbour tour
            Tour newSolution = new Tour(currentSolution.getTour());

            // Get a random positions in the tour
            int tourPos1 = (int) (newSolution.tourSize() * Math.random());
            int tourPos2 = (int) (newSolution.tourSize() * Math.random());

            // Get the cities at selected positions in the tour
            City citySwap1 = newSolution.getCity(tourPos1);
            City citySwap2 = newSolution.getCity(tourPos2);

            // Swap them
            newSolution.setCity(tourPos2, citySwap1);
            newSolution.setCity(tourPos1, citySwap2);

            // Get energy of solutions
            int currentEnergy = currentSolution.getDistance();
            int neighbourEnergy = newSolution.getDistance();

            // Decide if we should accept the neighbour
            if (acceptanceProbability(currentEnergy, neighbourEnergy, temp) > Math.random()) {
                currentSolution = new Tour(newSolution.getTour());
            }

            // Keep track of the best solution found
            if (currentSolution.getDistance() < best.getDistance()) {
                best = new Tour(currentSolution.getTour());
            }

            // Cool system
            temp *= 1-coolingRate;
        }

        System.out.println("Final solution distance: " + best.getDistance());
        System.out.println("Tour: " + best);
        /*for(int i=0; i<best.tourSize()-1;i++){
            vw.drawCityPath(best.getCity(i).getX(),best.getCity(i).getY(),best.getCity(i+1).getX(),best.getCity(i+1).getY());
        }
        vw.drawCityPath(best.getCity(best.tourSize()-1).getX(),best.getCity(best.tourSize()-1).getY(),best.getCity(0).getX(),best.getCity(0).getY());
        */
        ArrayList<Integer> citiesX = new ArrayList<>();
        ArrayList<Integer> citiesY = new ArrayList<>();
        for(int i=0; i<best.tourSize(); i++){
            citiesX.add(best.getCity(i).getX());
            citiesY.add(best.getCity(i).getY());
        }
        vw.drawCityPath(citiesX,citiesY);
        //Toast.makeText(TSPActivity.this,shoppingList.get(3) + " " + shoppingList.get(4), Toast.LENGTH_SHORT).show();
        //vw.drawCityPath(100,100,200,200);
    }
    public static double acceptanceProbability(int energy, int newEnergy, double temperature) {
        // If the new solution is better, accept it
        if (newEnergy < energy) {
            return 1.0;
        }
        // If the new solution is worse, calculate an acceptance probability
        return Math.exp((energy - newEnergy) / temperature);
    }
}
