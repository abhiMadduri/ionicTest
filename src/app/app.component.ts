import { Component, ViewChild } from '@angular/core';
import { Events, LoadingController, Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { MyTeamsPage, TournamentsPage, TeamHomePage } from '../pages/pages';
import { EliteApi } from '../shared/elite-api.service';
import { UserSettings } from '../shared/user-settings.service';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];
  rootPage: any;// = MyTeamsPage;

  constructor(
    public events: Events,
    public loadingController: LoadingController,
    public platform: Platform,
    public eliteApi: EliteApi,
    public userSettings: UserSettings) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.userSettings.initStorage().then(() => {
        this.rootPage = MyTeamsPage;
        this.refreshFavorites();
        this.events.subscribe('favorites:changed', () => this.refreshFavorites());
      });

    });
  }

  refreshFavorites() {
    this.userSettings.getAllFavorites().then(favs => this.favoriteTeams = favs);
    //this.favoriteTeams = this.userSettings.getAllFavorites();
  }


  goHome() {
    this.nav.push(MyTeamsPage);
  }

  goToTeam(favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(l => this.nav.push(TeamHomePage, favorite.team));
  }
  goToTournaments() {
    this.nav.push(TournamentsPage);
  }
}
