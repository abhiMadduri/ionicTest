import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MyTeamsPage } from '../pages/my-teams/my-teams';
import { TeamDetailPage } from '../pages/team-detail/team-detail';
import { TeamsPage } from '../pages/teams/teams';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { TeamHomePage } from '../pages/team-home/team-home';
import { StandingsPage } from '../pages/standings/standings';
import { EliteApi } from '../shared/elite-api.service';
import { GamePage } from '../pages/game/game'
import { Storage } from '@ionic/storage';
import { UserSettings } from '../shared/user-settings.service';



@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    TeamsPage,
    TeamDetailPage,
    TournamentsPage,
    TeamHomePage,
    StandingsPage,
    GamePage
  ],
  imports: [
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    TeamsPage,
    TeamDetailPage,
    TournamentsPage,
    TeamHomePage,
    StandingsPage,
    GamePage
  ],
  providers: [
    EliteApi,
    Storage,
    UserSettings,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
