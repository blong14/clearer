import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { Project } from './models/project.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Injectable()
export class DataService {

    constructor( private af: AngularFire, private http: Http ) { 


    }

    getData(): FirebaseListObservable<Project[]>{



        return this.af.database.list('/projects');
        /*return this.http.get('../_data/projects.json').map(
            res=> {
                let response = res.json();
                return ressponse;
            },
            error=> error
        );*/
    }

    getProject( id: string ): FirebaseObjectObservable<Project>{

        return this.af.database.object('/projects/' + id);

    }

    deleteProject( id: string ){
        return this.af.database.object('/projects/' + id).remove();
    }

    saveProject( id: string, dataToSave: any, path?: string): Promise<void> {
         let updates = {};
         let success: boolean;
         if(path){ updates[ path ] = dataToSave; }
         else{ updates = dataToSave; }
         return this.af.database.object('/projects/' + id ).update( updates );
    }

    getUsers() : FirebaseListObservable<any[]>{
        return this.af.database.list('/users');
    }

   /* getproject( id: string ): Observable<project>{
        console.log( 'called:' + id );
        return this.http.get('../_data/projects/' + id + '.json').map(
            res=>{
                let response = res.json();
                return response;
            },
            error=> error
        );
    }*/

    returnData( paramName: string ){
        /*
        return this.http.get('/_data/' + paramName + '.json').map(
            res=> res,
            err=> err
        );*/
        return false;
    }

}
