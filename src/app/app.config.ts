import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),      //configuración de enrutamiento
    importProvidersFrom(HttpClientModule),
    //Configuración para poder linkear la sesión con el token
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },   
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ]
}
