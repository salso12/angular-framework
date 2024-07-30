import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AppStateService } from '../services/app-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {

  constructor(private appState: AppStateService,private  router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Votre logique d'authentification ici
    // Par exemple, vérifier si l'utilisateur est authentifié :
  if (this.appState.authState.isAuthenticated ==true)
  {
    //si je suis authenfie
 return true;
  }
  else {
    this.router.navigateByUrl("/login");
    return false;

  }

  }
}
