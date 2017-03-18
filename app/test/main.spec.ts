import{ ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


import { DashboardComponent } from '../dashboard/dashboard.component';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/observable';

describe('DashboardComponent (external template)', function(){

    it( 'dummy test', function(){
        expect('Test description.').toEqual('Test description.');
    });
});