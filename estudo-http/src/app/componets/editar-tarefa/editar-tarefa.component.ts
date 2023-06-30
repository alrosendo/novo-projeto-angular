import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Tarefa } from 'src/app/models/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.css']
})
export class EditarTarefaComponent implements OnInit{
  id?: number;
  notFound: boolean = false;
  form: FormGroup = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    concluida:  new FormControl(false),
  });
  constructor(
    private route: ActivatedRoute,
    private tarefaService: TarefaService,
    private router: Router
    ){}
      
    
 
  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
      this.id = Number(params['id']);
      this.tarefaService.getTarefa(this.id).subscribe({
        next: (tarefa) => {
          this.form.patchValue(tarefa);
        },
        error: (err) => {
          this.notFound = true;
        }
      })
    }

      
    });
  }

  onSubmit() {
    const tarefa: Tarefa = {...this.form.value, id: this.id};
    this.tarefaService.editarTarefa(this.id!, tarefa).subscribe({
      next: () => this.router.navigate(['/tarefas']),
      error: (err) => {
        alert("um erro aconteceu!");
        console.log(err);
      }
    })
  }
}
