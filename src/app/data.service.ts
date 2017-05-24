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

    getProjects(): FirebaseListObservable<any>{
      return this.af.database.list('/projects');
    }

    getFeed() {
      return this.af.database.list('/feed');
    }

    saveFeed( dataToSave ) {
      return this.af.database.list('/feed').push( dataToSave );
    }

    getProject( id: string, path?: string ): FirebaseObjectObservable<any>{
      let dbPath: string;

      if( path ){
        dbPath = '/projects/' + id + '/' + path;
      }else{
        dbPath = '/projects/' + id;
      }

      return this.af.database.object( dbPath );
    }

    deleteProject( id: string ){
        return this.af.database.object('/projects/' + id).remove();
    }

    saveProject( id: string, dataToSave: any, path?: string): firebase.Promise<void> {
         let updates = {};
         let success: boolean;
         if(path){ updates[ path ] = dataToSave; }
         else{ updates = dataToSave; }
         return this.af.database.object('/projects/' + id ).update( updates );
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

    addMemberToTeam( userID: string, teamID: string ) {
      console.log( userID, teamID);
      return this.af.database.object('/users/' + userID + '/teams/' + teamID ).set(teamID).then(
        (res) => {
          console.log(res);
          this.af.database.object('/teams/' + teamID + '/members/' + userID ).set(userID).then(
            (res) => {
              console.log(res);
            });
        }
      );

    }

    removeMemberFromTeam( userID: string, teamID: string ) {
      return this.af.database.list('/users/' + userID + '/teams/' + teamID).remove().then(
        () => {
          this.af.database.list('/teams/' + teamID + '/members/' + userID).remove();
      });
    }

    getTeam( teamID: string ) {
      return this.af.database.object('/teams/' + teamID);
    }

    getUser( id: string = undefined ) : FirebaseObjectObservable<any[]>{
      if( id != undefined ) { return this.af.database.object('/users/' + id ); }
      return this.af.database.object('/users');
    }

    getUsers() {
      return this.af.database.list('/users');
    }

    saveUser( id: string, user: Object ): firebase.Promise<void> {
      return this.af.database.object('/users/' + id ).update(user);
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
          this.router.navigate(['/dashboard']);
        });
      }).catch( (err) => {
        console.log(err.message);
      });

    }

}
