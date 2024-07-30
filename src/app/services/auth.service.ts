import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {AppStateService} from "./app-state.service";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient ,private appState:AppStateService) { }
  //in reality (Backend) you make POST and send you usernamer password
  async  login(username :string,password:string)
  {
   // his line waits for the server response (asynchronous operation)
    //firstValueFrom observable vers promess
    let user:any =await firstValueFrom(this.http.get("http://localhost:8086/users/"+username)) ;
    console.log(password);//par utlisateur
    console.log(user.password); //qui est dans backend
    console.log(atob(password));
    if(password==atob(user.password))
    {
      //Decoder token
      let decodejwt :any =jwtDecode(user.token);
      this.appState.setAuthState(
        {
          isAuthenticated :true,
          username:decodejwt.sub,
          roles:decodejwt.roles,
          token:decodejwt.token
        }
      );
      return Promise.resolve(true);

    }
    else {
      return Promise.reject("Bad credentials");
    }


  }
}
