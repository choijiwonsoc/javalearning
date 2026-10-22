package com.example.demo.model;

public record SimulationRequest(
        int tickets,
        int users,
        int threads,
        String strategy
) {

}
