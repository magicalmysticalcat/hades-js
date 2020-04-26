import {IAspectService} from '../aspect-service/aspect-service.interface'
import { AspectService } from '../aspect-service/aspect-service';
import { IOrbRepository } from '../orb-repository/orb-repository.interface';
import { OrbJSONRepository } from '../orb-repository/orb-json-repository';
import { CelestialBody } from '../models/CelestialBody';


describe("AstrologyService", () => {

    let aspectService: IAspectService;
    let orbRepository: IOrbRepository;

    orbRepository = new OrbJSONRepository();
    aspectService = new AspectService(orbRepository);

    beforeEach(async function() {
    });

    it("should be conjunct", () => {
        
    });

    it("should be square", () => {
        
    });

    it("should be opposition", () => {
        
    });

    it("should be sextile", () => {
        
    });
    
    it("should be trine",()=>{
        
    });

    it("should be semisextile",()=>{
        
    });

    it("should be semisquare",()=>{
        
    });

    it("should be sesquisquare",()=>{
        
    });

    it("should be quincunx",()=>{
        
    });

    it("should be quintile",()=>{
        
    });

    it("should be biquintile",()=>{
        
    });
});