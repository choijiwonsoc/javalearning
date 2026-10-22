package com.example.demo.controller;

import com.example.demo.model.SimulationRequest;
import com.example.demo.service.SimulationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class SimulationController {

    private final SimulationService simulationService;
    public SimulationController(
            SimulationService simulationService
    ){
        this.simulationService = simulationService;
    }
    @PostMapping("/simulation/start")
    public void start(
            @RequestBody SimulationRequest request
    ){
        simulationService.start(request);
    }
}
