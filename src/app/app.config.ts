import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),      //configuración de enrutamiento
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()),
    //Configuración para poder linkear la sesión con el token
  ]
}
