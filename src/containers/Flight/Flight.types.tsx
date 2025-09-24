import { FlightDTO } from "@/core/dto/flight.dto";

export interface FlightProps {
   logic: FlightLogic;
}

export interface FlightLogic {
  feedback:string;
  flights: FlightDTO[];
  filter(iata: FlightDTO['flight']['iata']): Promise<string>;
  remove(flight: FlightDTO): Promise<string>;
}