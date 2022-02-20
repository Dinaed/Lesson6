import { Component, OnInit } from '@angular/core';
import { Airline } from './models/airline'
import { Passenger } from './models/passenger';
import { AirlinesService } from './services/airlines.service';
import { IndikatorService } from './services/indikator.service';
import { PassengersService } from './services/passengers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'Lesson6';
  airlines: Airline[] = [];
  passengers: Passenger[] = [];
  airlineId:number = 0;
  passengersId:string = '';

  constructor(private airlineService: AirlinesService, private passengerService: PassengersService, public indicator:IndikatorService){}

  ngOnInit(): void {
    // this.ailineService.getAirlaines()
    // .subscribe((data: Airline[]) => {
    //   this.airlines = data;
    //   console.log(data);
    // })    
  }
  addAilineByid(id:number){
    this.airlineService.getAirlainesById(id).subscribe((data:Airline) => {
      this.airlines.push(data);
    })
  }
  createAilines(){
    const newAirline = <Airline>{
      name: "Sri Lankan Airways by Andr",
      country: "Sri Lanka",
      logo: "https://upload.wikimedia.org/wikipedia/ru/7/78/SriLankan_Airlines_Logo.svg",
      slogan: "From Sri Lanka",
      head_quaters: "Katunayake, Sri Lanka",
      website: "www.srilankaairways.com",
      established: "1990"
    };
    
    this.airlineService.addAidline(newAirline).subscribe((data:Airline) => {
      this.airlines.push(data)
    });
  }

  addPassengerById(id:string){
    this.passengerService.getPassengerById(this.passengersId).subscribe((data:Passenger) => {
      this.passengers.push(data)
      this.passengersId='';
    });
  }
  uppdatePassenger(passenger: Passenger){
    const uppdatePassenger = {...passenger, name: passenger.name = 'John Doe'};
    this.passengerService.uppdatePassenger(uppdatePassenger).subscribe((data:Passenger) => {
      const pass = this.passengers.indexOf(passenger);
      this.passengers[pass] = data;
      console.log(data);
    });
  }

  uppdatePassengerPut(passenger: Passenger){
    const uppdatePassenger = {...passenger, name: passenger.name = 'John Doe', trips: passenger.trips = 600, airline: passenger.airline = []};
    this.passengerService.uppdatePassenger(uppdatePassenger).subscribe((data:Passenger) => {
      const pass = this.passengers.indexOf(passenger);
      this.passengers[pass] = data;
      console.log(data);
    });
  }

  deletePassenger(passenger: Passenger){
    this.passengerService.deletePassenger(passenger).subscribe((data:Passenger) => {
      const pass = this.passengers.indexOf(passenger);
      this.passengers.slice(pass, 1)
      console.log(data);
    });
  }
}
