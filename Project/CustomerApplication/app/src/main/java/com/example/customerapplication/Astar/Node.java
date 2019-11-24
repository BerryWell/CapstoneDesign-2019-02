package com.example.customerapplication.Astar;

public class Node {
    public int x;
    public int y;
    public double hValue;
    public int gValue;
    public double fValue;
    public Node parent;


    public Node(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
