/* Global Imports */
// Add any necessary imports here


/* Application Imports */
// Add any necessary imports here

/* Local Imports */
import { useEffect, useState } from "react";
import { FlightLogic } from "./Flight.types";
import { flightService } from "@/core/services/flight.service";
import { use } from "chai";
import { FlightDTO } from "@/core/dto/flight.dto";

export const useLogic = ():FlightLogic => {

    const [cachedFlights, setCachedFlights] = useState<FlightDTO[]>([]);
    const [flights, setFlights] = useState<FlightDTO[]>([]);

    const [feedback, setFeedback] = useState<string>('Logic hook initialized');

    useEffect(() => {
        flightService.read().then(data => {
            setFlights(data);
            setCachedFlights(data);
        })
    }, []);


    return {
        filter: async (iata) => {
            if (!iata) {
                setFlights(cachedFlights);
                setFeedback(`Showing all flights`);
                return feedback;
            }
            const filteredFlights = cachedFlights.filter(f => f.airline.iata === iata);
            setFlights(filteredFlights);
            setFeedback(`Filter flights with iata code: ${iata}`);
            return feedback;
        },
        remove: async (flight) => {
            const deletedFlight = await flightService.delete(flight)
            const updatedFlights = flights.filter(f => f.id !== deletedFlight.id);
            setFlights(updatedFlights);
            setCachedFlights(updatedFlights);
            setFeedback(`Removed flight with id: ${deletedFlight.id}`);
            return feedback;
        },
        flights, 
        feedback
    };
}