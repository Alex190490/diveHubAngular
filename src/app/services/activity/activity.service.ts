import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Activity } from '../../Clases/Activity/activity';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ActivityService {


  constructor(private httpCliente : HttpClient) { }


  getAllActivities(): Observable<Activity[]> {
    return this.httpCliente.get<Activity[]>(environment.urlActivity+"/all")
  }

  getActivityById(id : number): Observable<Activity> {
    return this.httpCliente.get<Activity>(environment.urlActivity+"/getActivityById/"+id)
  }

  getActivitiesByTag(tag : string): Observable<Activity[]> {
    return this.httpCliente.get<Activity[]>(environment.urlActivity+"/tag/"+tag)
  }

  getActivitiesByCategory(category : number): Observable<Activity[]> {
    return this.httpCliente.get<Activity[]>(environment.urlActivity+"/category/"+category)
  }

  getActivitiesByName(name : string): Observable<Activity[]> {
    return this.httpCliente.get<Activity[]>(environment.urlActivity+"/getActivityByName/"+name)
  }

  getAllAvailableActivities(): Observable<Activity[]> {
    return this.httpCliente.get<Activity[]>(environment.urlActivity+"/available")
  }

  getAllAvailable_spacesByActivityId(id : number): Observable<number> {
    return this.httpCliente.get<number>(environment.urlActivity+"/available_spaces/"+id)
  }

  getRemainingTimeByActivityId(id : number): Observable<number> {
    return this.httpCliente.get<number>(environment.urlActivity+"/remaining-time/"+id)
  }

  updateEndTimeByActivityId(id : number, date: string): Observable<Activity> {
    return this.httpCliente.get<Activity>(environment.urlActivity+"/updateTimeEnds/"+id+"/"+date)
  }

  updateStartTimeByActivityId(id : number, date: string): Observable<Activity> {
    return this.httpCliente.get<Activity>(environment.urlActivity+"/updateTimeStarts/"+id+"/"+date)
  }

  updateAvailable_spaces(id : number): Observable<any> {
    return this.httpCliente.get<any>(environment.urlActivity+"/updateAvailable_spaces/"+id)
  }

  isActivityAvailableForUser(id : number, email: string): Observable<Boolean> {
    return this.httpCliente.get<Boolean>(environment.urlActivity+"/isActivityAvailableForUser/"+id+"/"+email)
  }
}
