import { Country } from "../models/Country";
import { Zone } from "../models/Zone";

export interface IWorldTimezoneRepository {
    GetCountryDetails(countryCode:string):Country;
    GetTimezoneInfo(zoneName: string): Zone
}