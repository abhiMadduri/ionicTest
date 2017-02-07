import { Injectable } from '@angular/core';
import { Http /*, Response */ } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteApi {
    private baseUrl = 'https://elite-schedule-app-i2-9272b.firebaseio.com';
    currentTourney: any = {};
    private tourneyData = {};

    constructor(public http: Http) { }

    getTournaments(){
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/tournaments.json`)
                .subscribe(res => resolve(res.json()));
        });
    }

     getTournamentData(tourneyId, forceRefresh: boolean = false) : Observable<any> {
             
        console.log('**about to make HTTP call');
        return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
            .map(response => {
                this.tourneyData[tourneyId] = response.json();
                this.currentTourney = this.tourneyData[tourneyId];
                return this.currentTourney;
            });
    }

    getCurrentTourney(){
        return this.currentTourney;
    }

    refreshCurrentTourney(){
        return this.getTournamentData(this.currentTourney.tournament.id, true); 
    }
}