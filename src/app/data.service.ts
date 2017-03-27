import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { Project } from './models/project.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Injectable()
export class DataService {

    constructor( private af: AngularFire, private http: Http ) { }

    getData(): FirebaseListObservable<Project[]>{

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

    getUsers() : FirebaseListObservable<any[]>{
        return this.af.database.list('/users');
    }

}
