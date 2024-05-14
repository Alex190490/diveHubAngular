import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assessment } from '../../Clases/Assessment/assessment';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AssessmentRequest } from '../../Clases/Assessment/assessmentRequest';


@Injectable({
  providedIn: 'root'
})


export class AssessmentService {


  constructor(private httpCliente: HttpClient) {}



  getAssessmentsByUser(email: string): Observable<Assessment[]> {
    return this.httpCliente.get<Assessment[]>(environment.urlAssessments + "/allByEmail/" + email)
  }

  getAssessmentsByProduct(id: number): Observable<Assessment[]> {
    return this.httpCliente.get<Assessment[]>(environment.urlAssessments + "/allByProduct/" + id)
  }


  getTotalByProduct(productId: number): Observable<number> {
    return this.httpCliente.get<number>(environment.urlAssessments + "/countTotalByProduct/" + productId);
  }

  getTotalByUser(email: string): Observable<number> {
    return this.httpCliente.get<number>(environment.urlAssessments + "/countTotalByEmail/" + email)
  }

  addAssessment(assessment: AssessmentRequest): Observable<any> {
    return this.httpCliente.post(environment.urlAssessments, assessment)
  }

  updateAssessment(productId: number, assessment: AssessmentRequest): Observable<any> {
    return this.httpCliente.put(environment.urlAssessments + "/" + productId, assessment)
  }

  removeAssessment(id: number): Observable<any>{
    return this.httpCliente.delete(environment.urlAssessments + "/clean/" + id)
  }

  removeAllAssessments(email: string): Observable<any>{
    return this.httpCliente.delete(environment.urlAssessments + "/cleanAll/" + email)
  }
}
