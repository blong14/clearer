import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { Idea } from './models/idea.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Injectable()
export class DataService {

    constructor( private af: AngularFire, private http: Http ) { 


    }

    getData(): FirebaseListObservable<Idea[]>{



        return this.af.database.list('/ideas');
        /*return this.http.get('../_data/ideas.json').map(
            res=> {
                let response = res.json();
                return ressponse;
            },
            error=> error
        );*/
    }

    getIdea( id: string ): FirebaseObjectObservable<Idea>{

        return this.af.database.object('/ideas/' + id);

    }

   /* getIdea( id: string ): Observable<Idea>{
        console.log( 'called:' + id );
        return this.http.get('../_data/ideas/' + id + '.json').map(
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
