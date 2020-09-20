import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '../models/city';
import { ConsumerParams } from '../models/consumer-params';
import { ConsumerService } from '../services/consumer.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-ask-restaurant-details',
  templateUrl: './ask-restaurant-details.component.html',
  styleUrls: ['./ask-restaurant-details.component.css']
})
export class AskRestaurantDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,
    private consumerService: ConsumerService,
    private shareService: ShareService) { }
  cities: any[];
  restaurantList: any[];
  restaurants: any[];
  selectedRestaurant: any;
  selectedCity: any;
  consumerParams: ConsumerParams;

  ngOnInit(): void {
    //this.shareService.consumerParams.subscribe(consumerParams => this.consumerParams = consumerParams);
    this.consumerParams = this.shareService.getConsumerParams();
    this.loadData();

    // this.cities = [{ cityId: 1, cityName: 'Lisbon' },
    // { cityId: 2, cityName: 'Porto' },
    // { cityId: 3, cityName: 'Braga' },
    // { cityId: 4, cityName: 'Amadora' },
    // { cityId: 5, cityName: 'Coimbra' },
    // { cityId: 6, cityName: 'Setúbal' }
    // ];
    // this.restaurantList = [
    //   { restaurantId: 1, cityId: 1, restaurantName: 'Augusto Lisboa' },
    //   { restaurantId: 2, cityId: 1, restaurantName: 'Treestory' },
    //   { restaurantId: 3, cityId: 1, restaurantName: 'Leo Restaurant' },
    //   { restaurantId: 4, cityId: 2, restaurantName: 'O Paparico' },
    //   { restaurantId: 5, cityId: 2, restaurantName: 'Farinha' },
    //   { restaurantId: 6, cityId: 3, restaurantName: 'Retrokitchen' },
    //   { restaurantId: 7, cityId: 3, restaurantName: 'Lakkana' },
    //   { restaurantId: 8, cityId: 4, restaurantName: 'Elevador' },
    //   { restaurantId: 9, cityId: 4, restaurantName: 'Maria Azeitona' },
    //   { restaurantId: 10, cityId: 4, restaurantName: 'Lugar ao Sul' },
    //   { restaurantId: 11, cityId: 5, restaurantName: 'Passeite' },
    //   { restaurantId: 12, cityId: 6, restaurantName: 'Casa do Mar' },
    // ];

  }

  loadData(): void {
    this.consumerService.getCities().subscribe(result => {
      this.cities = [];
      if (result && result.success) {
        if (result.data) {
          result.data.forEach(city => {
            this.cities.push({
              cityId: city.id,
              cityName: city.nome
            });
          });
        }
      }
      // STATUS:                200 (Obs.: List of all cities which has restaurants on promotion)
      // RESPONSE JSON:
      // {
      //     "success": true,
      //     "message": null,
      //     "data": [
      //         {
      //             "id": 1,
      //             "nome": "São Paulo"
      //         },
      //         {
      //             "id": 2,
      //             "nome": "São Caetano do Sul"
      //         }
      //     ]
      // }

    });

  }

  loadRestaurants(cityId: number): void {
    this.consumerService.getRestaurants(cityId).subscribe(result => {
      this.restaurants = [];
      if (result && result.success) {
        if (result.data) {
          result.data.forEach(restaurant => {
            this.restaurants.push({
              restaurantId: restaurant.id,
              restaurantName: restaurant.nome
            });
          });
        }
      }

      // STATUS: 200 (Obs.: List of all cities which has restaurants on promotion)
      // RESPONSE JSON:
      // {
      //     "success": true,
      //     "message": null,
      //     "data": [
      //         {
      //             "id": 1,
      //             "nome": "São Paulo"
      //         },
      //         {
      //             "id": 2,
      //             "nome": "São Caetano do Sul"
      //         }
      //     ]
      // }


    });
  }

  navigateNext(): void {
    this.consumerParams = {
      consumer: {
        id: this.consumerParams?.consumer?.id,
        nome: this.consumerParams?.consumer?.nome,
        documento: this.consumerParams?.consumer?.documento
      },
      city: {
        id: this.selectedCity.cityId,
        nome: this.selectedCity.cityName
      },
      restaurant: {
        id: this.selectedRestaurant.restaurantId,
        nome: this.selectedRestaurant.restaurantName,
        cidade: {
          id: this.selectedCity.cityId,
          nome: this.selectedCity.cityName
        }
      },
      consumerVoucherDetails: this.consumerParams?.consumerVoucherDetails
    };
    this.shareService.setConsumerParams(this.consumerParams);
    this.router.navigate(['play-speech']);
  }

  onCityChange(): void {
    if (this.selectedCity) {
      this.selectedRestaurant = undefined;
      this.loadRestaurants(this.selectedCity.cityId);

      //this.restaurants = this.restaurantList.filter(x => x.cityId === this.selectedCity.cityId);
    }
  }

  valid(): boolean {
    let isValid = false;
    if (this.selectedCity && this.selectedRestaurant) {
      isValid = true;
    }
    return isValid;
  }

}
