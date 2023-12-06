import Gym from "./Gym";

export default interface ApiResponse{
    total: number,
    locations: Array<Gym>
}