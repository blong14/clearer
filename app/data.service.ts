import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { Idea } from './models/idea.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {

    constructor( private http : Http, private route: ActivatedRoute ) { }

    getData(): Observable<Idea[]>{
        return this.http.get('../_data/ideas.json').map(
            res=> {
                let response = res.json();
                return response;
            },
            error=> error
        );
    }

    getIdea( id: string ): Observable<Idea>{
        console.log( 'called:' + id );
        return this.http.get('../_data/ideas/' + id + '.json').map(
            res=>{
                let response = res.json();
                return response;
            },
            error=> error
        );
    }

    returnData( paramName: string ){
        
        return this.http.get('/_data/' + paramName + '.json').map(
            res=> res,
            err=> err
        );
    }

}
