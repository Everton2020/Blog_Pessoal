import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  key: 'data'
  reverse = false

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  titulo: string

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  nomeTema: string

  constructor(
    private postagemService: PostagemService,
    private temaService: TemaService,
    private alerta: AlertasService,
    private router: Router
  )

 { }

  ngOnInit() {
    window: scroll(0, 0)
    let token = environment.token

    if(token == "")
    {
      this.router.navigate(['/login'])
      this.alerta.showAlertPrimary('Faça o login antes de entrar no feed')
    }

    this.findAllPostagens()
    this.findAllTemas()
  }
  
  publicar()
  {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

      if(this.postagem.titulo == null || this.postagem.texto == null || this.postagem.tema == null)
      {
        this.alerta.showAlertDanger('Preencha todos os campos antes de publicar')
      }else 
      {
        this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
          this.postagem = resp
          this.postagem = new Postagem()
          this.alerta.showAlertSuccess('Postagem realizada com sucesso!')
          this.findAllPostagens()
        })
      }
  }

  findAllPostagens()
  {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })
  }

  findAllTemas()
  {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }
  findByIdTema()
  {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    })
  }
  findByTituloPostagem()
  {
    if(this.titulo === '')
    {
      this.findAllPostagens
    }else
    {
      this.postagemService.getByTituloPostagem(this.titulo).subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp  
      })
    }
  }
  findByNomeTema()
  {
    if(this.nomeTema === '')
    {
      this.findAllTemas
    }else
    {
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[])=>{
        this.listaTemas = resp
      }, error => {
        if (error.status == '500'){
          this.alerta.showAlertDanger('Preencha todos os campos corretamente antes de enviar!')
        }
      })
    }
  }
}
