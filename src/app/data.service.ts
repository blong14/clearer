import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { FirebaseAuth } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Injectable()
export class DataService {

    constructor(
      private af: AngularFire,
      private http: Http,
      private router: Router
    ) { }

    addMemberToTeam( userID: string, teamID: string ) {
      return this.af.database.object('/users/' + userID + '/teams/' + teamID ).set(teamID).then(
        (res) => {
          this.af.database.object('/teams/' + teamID + '/members/' + userID ).set(userID).then();
      });
    }

    createTeam( userID: string, teamName: string ) {
      return this.af.database.list('/teams').push({
        owner: userID,
        name: teamName,
        members: [
          userID
        ]
      });
    }

    createUser( name, email, password ) {
      this.af.auth.createUser({
        'email': email,
        'password': password
      }).then( (user) => {
        return this.af.database.object('/users/' + user.uid ).update({
          'name': name,
          'email': email,
          'provider': 'password'
        }).then( () => {
          this.router.navigate(['/profile', user.uid ]);
        });
      }).catch( (err) => {
        console.log(err.message);
      });

    }

    deleteProject( id: string ) {
        return this.af.database.object('/projects/' + id).remove();
    }

    deleteTeam( teamID: string ) {
      return this.af.database.object('/teams/' + teamID).subscribe(
        (res) => {
          let members = Object.keys(res.members).map(key => res.members[key]);

          this.af.database.list('/teams/' + teamID).remove().then(
            () => {
              members.forEach( (member) => {
                this.af.database.list('/users/' + member + '/teams/' + teamID).remove().then(
                  () => this.router.navigate(['/dashboard'])
                );
              });
          });
      });
    }

    getProject( id: string, path?: string ): FirebaseObjectObservable<any> {
      let dbPath: string;

      if ( path ){
        dbPath = '/projects/' + id + '/' + path;
      } else {
        dbPath = '/projects/' + id;
      }

      return this.af.database.object( dbPath );
    }

    getProjects(): FirebaseListObservable<any> {
      return this.af.database.list('/projects');
    }

    getTeam( teamID: string ) {
      return this.af.database.object('/teams/' + teamID);
    }

    getTeams( userID: string ) {
      return this.af.database.list('/users/' + userID + '/teams');
    }

    getUser( id: string = undefined ): FirebaseObjectObservable<any[]> {
      if( id != undefined ) { return this.af.database.object('/users/' + id ); }
      return this.af.database.object('/users');
    }

    getUsers() {
      return this.af.database.list('/users');
    }

    removeMemberFromTeam( userID: string, teamID: string ) {
      return this.af.database.list('/users/' + userID + '/teams/' + teamID).remove().then(
        () => {
          this.af.database.list('/teams/' + teamID + '/members/' + userID).remove();
      });
    }

    saveProject( id: string, dataToSave: any, path?: string ): firebase.Promise<void> {
         let updates = {};
         let success: boolean;
         if(path){ updates[ path ] = dataToSave; }
         else{ updates = dataToSave; }
         return this.af.database.object('/projects/' + id ).update( updates );
    }

    saveUser( id: string, user: Object ): firebase.Promise<void> {
      return this.af.database.object('/users/' + id ).update(user);
    }

}
