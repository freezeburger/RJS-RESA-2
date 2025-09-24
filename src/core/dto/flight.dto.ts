import * as Generics from '../types/generic.types'

export interface FlightDTO  extends Generics.WithUniqueId {
  flight_date: string
  flight_status: string
  departure: Departure
  arrival: Arrival
  airline: Airline
  flight: Flight
  aircraft: any
  live: any
}

export interface Departure {
  airport: string
  timezone: string
  iata: string
  icao: string
  terminal: any
  gate: any
  delay: number
  scheduled: any
  estimated: any
  actual: any
  estimated_runway: any
  actual_runway: any
}

export interface Arrival {
  airport: string
  timezone: string
  iata: string
  icao: string
  terminal: any
  gate: any
  baggage: any
  scheduled: any
  delay: any
  estimated: any
  actual: any
  estimated_runway: any
  actual_runway: any
}

export interface Airline {
  name: string
  iata: string
  icao: string
}

export interface Flight {
  number: string
  iata: string
  icao: string
  codeshared: any
}
