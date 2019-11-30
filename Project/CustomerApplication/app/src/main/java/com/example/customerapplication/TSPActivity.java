package com.example.customerapplication;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.content.Context;
import android.content.Intent;
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
import android.widget.Toast;

import com.example.customerapplication.Astar.Node;
import com.example.customerapplication.TSP.City;
import com.example.customerapplication.TSP.Tour;
import com.example.customerapplication.TSP.TourManager;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.PriorityQueue;

class ViewExTSP extends View
{
    int floorX;
    int floorY;
    int viewX;
    int viewY;
    ArrayList<Integer> citiesX;
    ArrayList<Integer> citiesY;
    ArrayList<ArrayList<Integer>> pathArrayX;
    ArrayList<ArrayList<Integer>> pathArrayY;
    public String[][] arr ;

    public ViewExTSP(Context context)
    {
        super(context);
    }
    public ViewExTSP(Context context, AttributeSet att){
        super(context, att);
    }
    public void drawCityPath(ArrayList x, ArrayList y){
        citiesX = y;
        citiesY = x;
        invalidate();
    }
    public void drawTotalPath(ArrayList<ArrayList<Integer>> x, ArrayList<ArrayList<Integer>> y){
        pathArrayX = x;
        pathArrayY = y;
        invalidate();
    }

    public void onDraw(Canvas canvas)
    {
        //10*10 행렬 기준. 나중에 map.json 받은 후 파싱해서 가로 세로 구하고 파는 물건이면 1 되도록

        /*arr = new String[][]{
                {"", "", "1", "1", "6", "0"},
                {"3", "", "", "", "", "0"},
                {"3", "", "", "2", "", "5"},
                {"", "", "", "", "", ""},
                {"4", "", "", "", "", ""}
        };*/

        floorX = arr[0].length;
        floorY = arr.length;

        viewX = this.getWidth();
        viewY = this.getHeight();

        super.onDraw(canvas);

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
        mapEdge.lineTo(0,(viewY-viewX)/2);
        canvas.drawPath(mapEdge, mapEdgePaint);

        Paint LinePaint = new Paint();
        LinePaint.setColor(Color.RED);
        LinePaint.setStrokeWidth(10f);
        LinePaint.setStyle(Paint.Style.STROKE);
        //TSP
        /*Path tspPath = new Path();
        if(citiesX!=null){
            tspPath.moveTo(viewX*(citiesX.get(0)+1)/(floorX+1), (viewY-viewX)/2 + viewX*(citiesY.get(0)+1)/(floorX+1));
            for(int i=0;i<citiesX.size();i++){
                tspPath.lineTo(viewX*(citiesX.get(i)+1)/(floorX+1), (viewY-viewX)/2 + viewX*(citiesY.get(i)+1)/(floorX+1));
            }
            tspPath.lineTo(viewX*(citiesX.get(0)+1)/(floorX+1), (viewY-viewX)/2 + viewX*(citiesY.get(0)+1)/(floorX+1));
            canvas.drawPath(tspPath, LinePaint);
        }*/
        //TSP + pathfinding
        Paint pt = new Paint();
        //pt.setTextSize(60);
        pt.setTextSize(2*viewX/((floorX + 2)*5));
        pt.setColor(0xFF000000);
        pt.setStyle(Paint.Style.FILL_AND_STROKE);

        if(pathArrayX!=null){
            for(int i=0;i<pathArrayX.size();i++){
                Path tspPath = new Path();
                tspPath.moveTo(viewX*(pathArrayX.get(i).get(0)+1)/(floorX+1), (viewY-viewX)/2 + viewX*(pathArrayY.get(i).get(0)+1)/(floorX+1));

                for(int j=0; j<pathArrayX.get(i).size(); j++){
                    tspPath.lineTo(viewX*(pathArrayX.get(i).get(j)+1)/(floorX+1), (viewY-viewX)/2 + viewX*(pathArrayY.get(i).get(j)+1)/(floorX+1));
                    //canvas.drawText(arr[pathArrayY.get(i).get(j)][pathArrayX.get(i).get(j)] + "번품목",viewX*(pathArrayX.get(i).get(j)+1)/(floorX+1)-70,(viewY-viewX)/2 + viewX*(pathArrayY.get(i).get(j)+1)/(floorX+1),pt);

                }
                canvas.drawPath(tspPath, LinePaint);
                canvas.drawText(arr[pathArrayY.get(i).get(0)][pathArrayX.get(i).get(0)] + "번품목"
                        ,viewX*(pathArrayX.get(i).get(0)+1)/(floorX+1)-70,(viewY-viewX)/2 + viewX*(pathArrayY.get(i).get(0)+1)/(floorX+1) -10,pt);
            }
        }

    }
}

public class TSPActivity extends AppCompatActivity {

    static Node[][] cell;
    static ArrayList<Node> pathList = new ArrayList<>();
    static ArrayList<Node> closedList = new ArrayList<>();
    ArrayList<ArrayList<Integer>> pathArrayX = new ArrayList<>();
    ArrayList<ArrayList<Integer>> pathArrayY = new ArrayList<>();
    static boolean additionalPath = false;

    private ViewExTSP vw;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        supportRequestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        vw = new ViewExTSP(this);
        //setContentView(R.layout.activity_tsp);
        setContentView(vw);

        Display display = getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        vw.viewX = size.x;
        vw.viewY = size.y;

        //vw.invalidate();
        /////////////////하드코딩으로 받음 바꿀것!!!
        /*vw.floorX=6;
        vw.floorY=5;*/
        vw.arr = new String[][]{
                {"", "", "1", "1", "6", "0"},
                {"3", "", "", "", "", "0"},
                {"3", "", "", "2", "", "5"},
                {"", "", "", "", "", ""},
                {"4", "", "", "", "", ""}
        };
        vw.floorX= vw.arr[0].length;
        vw.floorY= vw.arr.length;

        Intent intent2 = getIntent();
        String toolbarTitle = intent2.getStringExtra("지점");
        //int idFloor = Integer.parseInt(intent2.getStringExtra("층수"));
        ArrayList shoppingList = intent2.getStringArrayListExtra("리스트");

        boolean exitOuterLoop = false;
        TourManager.clearArrayList();

        for(int i=0; i<shoppingList.size();i++){
            for(int j = 0; j< vw.arr.length; j++){
                for(int k = 0; k< vw.arr[j].length; k++){
                    if(vw.arr[j][k].equals(shoppingList.get(i))){
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

        ArrayList<Integer> citiesX = new ArrayList<>();
        ArrayList<Integer> citiesY = new ArrayList<>();
        for(int i=0; i<best.tourSize(); i++){
            citiesX.add(best.getCity(i).getX());
            citiesY.add(best.getCity(i).getY());
        }
        vw.drawCityPath(citiesX,citiesY);

        for(int i=0; i<best.tourSize()-1;i++){
            pathFinding(best.getCity(i).getX(), best.getCity(i).getY(), best.getCity(i+1).getX(), best.getCity(i+1).getY());
        }
        pathFinding(best.getCity(best.tourSize()-1).getX(), best.getCity(best.tourSize()-1).getY(), best.getCity(0).getX(), best.getCity(0).getY());
        vw.drawTotalPath(pathArrayX,pathArrayY);

    }
    public static double acceptanceProbability(int energy, int newEnergy, double temperature) {
        // If the new solution is better, accept it
        if (newEnergy < energy) {
            return 1.0;
        }
        // If the new solution is worse, calculate an acceptance probability
        return Math.exp((energy - newEnergy) / temperature);
    }
    public void pathFinding(int Ai, int Aj, int Bi, int Bj){
        boolean[][] booleanArr = new boolean[vw.arr.length][vw.arr[0].length];

        for(int i=0;i<vw.arr.length;i++){
            for(int j=0;j<vw.arr[i].length;j++){
                if(vw.arr[i][j].equals("")){
                    booleanArr[i][j] = true;
                }
                else{
                    booleanArr[i][j] = false;
                }
            }
        }
        booleanArr[Ai][Aj] = true;
        booleanArr[Bi][Bj] = true;

        cell = new Node[vw.arr.length][vw.arr[0].length];
        generateHValue(booleanArr, Ai, Aj, Bi, Bj, booleanArr.length, 10, 14, true);
        ArrayList<Integer> pathX = new ArrayList<>();
        ArrayList<Integer> pathY = new ArrayList<>();

        if (cell[Ai][Aj].hValue!=-1&&pathList.contains(cell[Bi][Bj])) {
            for (int i = 0; i < pathList.size(); i++) {
                //StdDraw.line(pathList.get(i).y, n - 1 - pathList.get(i).x, pathList.get(i + 1).y, n - 1 - pathList.get(i + 1).x);
                pathX.add(pathList.get(i).y);
                pathY.add(pathList.get(i).x);
            }
            pathArrayX.add(pathX);
            pathArrayY.add(pathY);
        } else {
            System.out.println("Euclidean Path Not found");
        }
        pathList.clear();
        closedList.clear();
    }

    public static void generateHValue(boolean matrix[][], int Ai, int Aj, int Bi, int Bj, int n, int v, int d, boolean additionalPath) {
        for (int y = 0; y < matrix.length; y++) {
            for (int x = 0; x < matrix[0].length; x++) {
                //Creating a new Node object for each and every Cell of the Grid (Matrix)
                cell[y][x] = new Node(y, x);
                //Checks whether a cell is Blocked or Not by checking the boolean value
                if (matrix[y][x]) {
                    cell[y][x].hValue = Math.sqrt(Math.pow(y - Bi, 2) + Math.pow(x - Bj, 2));
                } else {
                    //If the boolean value is false, then assigning -1 instead of the absolute length
                    cell[y][x].hValue = -1;
                }
            }
        }
        generatePath(cell, Ai, Aj, Bi, Bj, n, v, d, additionalPath);
    }
    public static void generatePath(Node hValue[][], int Ai, int Aj, int Bi, int Bj, int n, int v, int d, boolean additionalPath) {
        //Creation of a PriorityQueue and the declaration of the Comparator
        PriorityQueue<Node> openList = new PriorityQueue<>(11, new Comparator() {
            @Override
            //Compares 2 Node objects stored in the PriorityQueue and Reorders the Queue according to the object which has the lowest fValue
            public int compare(Object cell1, Object cell2) {
                return ((Node) cell1).fValue < ((Node) cell2).fValue ? -1 :
                        ((Node) cell1).fValue > ((Node) cell2).fValue ? 1 : 0;
            }
        });

        //Adds the Starting cell inside the openList
        openList.add(cell[Ai][Aj]);

        //Executes the rest if there are objects left inside the PriorityQueue
        while (true) {

            //Gets and removes the objects that's stored on the top of the openList and saves it inside node
            Node node = openList.poll();

            //Checks if whether node is empty and f it is then breaks the while loop
            if (node == null) {
                break;
            }

            //Checks if whether the node returned is having the same node object values of the ending point
            //If it des then stores that inside the closedList and breaks the while loop
            if (node == cell[Bi][Bj]) {
                closedList.add(node);
                break;
            }

            closedList.add(node);

            //Left Cell
            try {
                if (cell[node.x][node.y - 1].hValue != -1
                        && !openList.contains(cell[node.x][node.y - 1])
                        && !closedList.contains(cell[node.x][node.y - 1])) {
                    double tCost = node.fValue + v;
                    cell[node.x][node.y - 1].gValue = v;
                    double cost = cell[node.x][node.y - 1].hValue + tCost;
                    if (cell[node.x][node.y - 1].fValue > cost || !openList.contains(cell[node.x][node.y - 1]))
                        cell[node.x][node.y - 1].fValue = cost;

                    openList.add(cell[node.x][node.y - 1]);
                    cell[node.x][node.y - 1].parent = node;
                }
            } catch (IndexOutOfBoundsException e) {
            }

            //Right Cell
            try {
                if (cell[node.x][node.y + 1].hValue != -1
                        && !openList.contains(cell[node.x][node.y + 1])
                        && !closedList.contains(cell[node.x][node.y + 1])) {
                    double tCost = node.fValue + v;
                    cell[node.x][node.y + 1].gValue = v;
                    double cost = cell[node.x][node.y + 1].hValue + tCost;
                    if (cell[node.x][node.y + 1].fValue > cost || !openList.contains(cell[node.x][node.y + 1]))
                        cell[node.x][node.y + 1].fValue = cost;

                    openList.add(cell[node.x][node.y + 1]);
                    cell[node.x][node.y + 1].parent = node;
                }
            } catch (IndexOutOfBoundsException e) {
            }

            //Bottom Cell
            try {
                if (cell[node.x + 1][node.y].hValue != -1
                        && !openList.contains(cell[node.x + 1][node.y])
                        && !closedList.contains(cell[node.x + 1][node.y])) {
                    double tCost = node.fValue + v;
                    cell[node.x + 1][node.y].gValue = v;
                    double cost = cell[node.x + 1][node.y].hValue + tCost;
                    if (cell[node.x + 1][node.y].fValue > cost || !openList.contains(cell[node.x + 1][node.y]))
                        cell[node.x + 1][node.y].fValue = cost;

                    openList.add(cell[node.x + 1][node.y]);
                    cell[node.x + 1][node.y].parent = node;
                }
            } catch (IndexOutOfBoundsException e) {
            }

            //Top Cell
            try {
                if (cell[node.x - 1][node.y].hValue != -1
                        && !openList.contains(cell[node.x - 1][node.y])
                        && !closedList.contains(cell[node.x - 1][node.y])) {
                    double tCost = node.fValue + v;
                    cell[node.x - 1][node.y].gValue = v;
                    double cost = cell[node.x - 1][node.y].hValue + tCost;
                    if (cell[node.x - 1][node.y].fValue > cost || !openList.contains(cell[node.x - 1][node.y]))
                        cell[node.x - 1][node.y].fValue = cost;

                    openList.add(cell[node.x - 1][node.y]);
                    cell[node.x - 1][node.y].parent = node;
                }
            } catch (IndexOutOfBoundsException e) {
            }

            if (additionalPath) {

                //TopLeft Cell
                try {
                    if (cell[node.x - 1][node.y - 1].hValue != -1
                            && !openList.contains(cell[node.x - 1][node.y - 1])
                            && !closedList.contains(cell[node.x - 1][node.y - 1])) {
                        double tCost = node.fValue + d;
                        cell[node.x - 1][node.y - 1].gValue = d;
                        double cost = cell[node.x - 1][node.y - 1].hValue + tCost;
                        if (cell[node.x - 1][node.y - 1].fValue > cost || !openList.contains(cell[node.x - 1][node.y - 1]))
                            cell[node.x - 1][node.y - 1].fValue = cost;

                        openList.add(cell[node.x - 1][node.y - 1]);
                        cell[node.x - 1][node.y - 1].parent = node;
                    }
                } catch (IndexOutOfBoundsException e) {
                }

                //TopRight Cell
                try {
                    if (cell[node.x - 1][node.y + 1].hValue != -1
                            && !openList.contains(cell[node.x - 1][node.y + 1])
                            && !closedList.contains(cell[node.x - 1][node.y + 1])) {
                        double tCost = node.fValue + d;
                        cell[node.x - 1][node.y + 1].gValue = d;
                        double cost = cell[node.x - 1][node.y + 1].hValue + tCost;
                        if (cell[node.x - 1][node.y + 1].fValue > cost || !openList.contains(cell[node.x - 1][node.y + 1]))
                            cell[node.x - 1][node.y + 1].fValue = cost;

                        openList.add(cell[node.x - 1][node.y + 1]);
                        cell[node.x - 1][node.y + 1].parent = node;
                    }
                } catch (IndexOutOfBoundsException e) {
                }

                //BottomLeft Cell
                try {
                    if (cell[node.x + 1][node.y - 1].hValue != -1
                            && !openList.contains(cell[node.x + 1][node.y - 1])
                            && !closedList.contains(cell[node.x + 1][node.y - 1])) {
                        double tCost = node.fValue + d;
                        cell[node.x + 1][node.y - 1].gValue = d;
                        double cost = cell[node.x + 1][node.y - 1].hValue + tCost;
                        if (cell[node.x + 1][node.y - 1].fValue > cost || !openList.contains(cell[node.x + 1][node.y - 1]))
                            cell[node.x + 1][node.y - 1].fValue = cost;

                        openList.add(cell[node.x + 1][node.y - 1]);
                        cell[node.x + 1][node.y - 1].parent = node;
                    }
                } catch (IndexOutOfBoundsException e) {
                }

                //BottomRight Cell
                try {
                    if (cell[node.x + 1][node.y + 1].hValue != -1
                            && !openList.contains(cell[node.x + 1][node.y + 1])
                            && !closedList.contains(cell[node.x + 1][node.y + 1])) {
                        double tCost = node.fValue + d;
                        cell[node.x + 1][node.y + 1].gValue = d;
                        double cost = cell[node.x + 1][node.y + 1].hValue + tCost;
                        if (cell[node.x + 1][node.y + 1].fValue > cost || !openList.contains(cell[node.x + 1][node.y + 1]))
                            cell[node.x + 1][node.y + 1].fValue = cost;

                        openList.add(cell[node.x + 1][node.y + 1]);
                        cell[node.x + 1][node.y + 1].parent = node;
                    }
                } catch (IndexOutOfBoundsException e) {
                }
            }
        }
        //Assigns the last Object in the closedList to the endNode variable
        Node endNode = closedList.get(closedList.size() - 1);

        //Checks if whether the endNode variable currently has a parent Node. if it doesn't then stops moving forward.
        //Stores each parent Node to the PathList so it is easier to trace back the final path
        while (endNode.parent != null) {
            Node currentNode = endNode;
            pathList.add(currentNode);
            endNode = endNode.parent;
        }

        pathList.add(cell[Ai][Aj]);
        //Clears the openList
        openList.clear();

        System.out.println();

    }
}
