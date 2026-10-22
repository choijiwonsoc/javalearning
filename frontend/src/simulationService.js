import api from "./api";

export const runSimulation = async(payload)=>{
    const response = await api.post("/simulate", payload);
    return response.data;
}