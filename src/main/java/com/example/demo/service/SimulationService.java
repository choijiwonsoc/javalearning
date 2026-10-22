package com.example.demo.service;

import com.example.demo.model.SimulationRequest;

public class SimulationService {

    public void start(SimulationRequest request){
        switch(request.strategy()){
            case "NO_LOCK":
                System.out.println("NO_LOCK");
            case "SYNCHRONIZED":
                System.out.println("NO_LOCK");
        }
    }
}
