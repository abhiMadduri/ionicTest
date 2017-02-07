import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';

import {TournamentsPage, TeamHomePage} from '../pages'
import { EliteApi } from '../../shared/elite-api.service';
import { UserSettings } from '../../shared/user-settings.service';

/*
  Generated class for the MyTeams page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html'
})
export class MyTeamsPage {

  favorites = [];
    //     {
    //         team: { id: 6182, name: 'HC Elite 7th', coach: 'Michelotti' },
    //         tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
    //         tournamentName: 'March Madness Tournament'
    //     },
    //     {
    //         team: { id: 805, name: 'HC Elite', coach: 'Michelotti' },
    //         tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
    //         tournamentName: 'Holiday Hoops Challenge'
    //     }
    // ];

  constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public loadingController: LoadingController,
        public eliteApi: EliteApi,
        public userSettings: UserSettings) {}

  goToTournaments() {
    this.navCtrl.push(TournamentsPage);
  }

  favoriteTapped($event, favorite){
        let loader = this.loadingController.create({
            content: 'Getting data...'
            //dismissOnPageChange: true //<- broken in RC4?
        });
        loader.present();
        this.eliteApi.getTournamentData(favorite.tournamentId)
            .subscribe(t => {
                loader.dismiss();
                this.navCtrl.push(TeamHomePage, favorite.team);
            });
    }

    ionViewDidEnter(){
        //this.favorites = this.userSettings.getAllFavorites();
        this.userSettings.getAllFavorites().then(favs => this.favorites = favs);
    }

}
