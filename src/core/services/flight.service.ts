import { FlightDTO } from "../dto/flight.dto";
import { CrudAbstract } from "./crud.abstract";

class FlightService extends CrudAbstract<FlightDTO>{
    readonly API = '/flights';
}

export const flightService = new FlightService();

