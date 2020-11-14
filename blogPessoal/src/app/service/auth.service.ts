import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { User } from "c:/Users/Generation Brazil/Documents/GitHub/Blog_Pessoal/blogPessoal/src/app/model/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  logar(userLogin: UserLogin)
  {
    return this.http.post('http://localhost:8080/usuarios/logar', userLogin)
  }
  cadastrar(user: User)
  {
    return this.http.post('http://localhost:8080/usuarios/cadastrar', user)
  }

btnSair()

{
  let ok = false
  let token = environment.token

  if(token != "")
  {
    ok=true
  }
  return ok
}
btnLogin()
{
  let ok = false
  let token = environment.token

  if(token == "")
  {
   return ok=true
  }
  ok
}
}