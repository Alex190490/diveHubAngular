import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),      //configuración de enrutamiento
    // importProvidersFrom(HttpClientModule),
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ]
}
