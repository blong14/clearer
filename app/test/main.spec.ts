import{ ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/observable';


import { DashboardComponent } from '../dashboard/dashboard.component';
import { DataService } from '../data.service';

describe('DashboardComponent (external template)', function(){

    it( 'dummy test', function(){
        expect('Test description.').toEqual('Test description.');
    });
});