import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { note } from 'app/shared/interfaces/note.interface';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit{

  public notesArray:note[] = [];
  public modalRef: NgbModalRef;
  public form: FormGroup = this.fb.group({
    id: [0],
    priority: ['', {validators: [Validators.required]}],
    note: ['', {validators: [Validators.required]}],
    date: [Date.now],
    color: [''],
    
  }) ;
  ramdonColors: string[] = ["#e4c1f9","#fff", "#a9def9", "#d0f4de", "#fcf6bd", "#fcf6bd" ]
  


  constructor(private modalService: NgbModal, 
              private fb: FormBuilder){

  }
    ngOnInit(){
      
      
    
    }
    getRandomColor(): string {
      const randomIndex = Math.floor(Math.random() * this.ramdonColors.length);
      return this.ramdonColors[randomIndex];
    }

    seleccioneVisor(content) {
      
      const options: NgbModalOptions = {
        backdrop: false, // Impide que el backdrop cierre el modal
        windowClass: 'custom-modal' // Clase CSS personalizada para el modal
      };
      this.modalService.open(content, options);
      
    }
    closeModal(){
      this.modalService.dismissAll();
      console.log('klk')
    }
    submitModal(){
        console.log('submitModal', this.form.value);
        const note = {
          id: this.form.value.id ?? '0', 
          title: this.form.value.title,
          priority: this.form.value.priority,
          note: this.form.value.note,
          date: new Date(),
          color: this.getRandomColor().toString(),
        }
        this.form.reset();
        console.log('Objeto Final', note);
        this.notesArray.push(note);
        
    }
    editModal(id: number, contentNote){

      if (id >= 0 && id < this.notesArray.length) {
        const options: NgbModalOptions = {
          backdrop: false, // Impide que el backdrop cierre el modal
          windowClass: 'custom-modal' // Clase CSS personalizada para el modal
        };
        this.modalService.open(contentNote, options);


        // Obtén el elemento que deseas editar
        const noteToEdit = this.notesArray[id];
       
    
        // Ahora puedes modificar las propiedades de noteToEdit
        this.form.patchValue({
          title: noteToEdit.title,
          priority: noteToEdit.priority,
          note: noteToEdit.note,
          date: noteToEdit.date,
          color: noteToEdit.color
        });
    
        // Si deseas actualizar el color, puedes hacerlo de la misma manera:
    
        // Puedes realizar otras operaciones de edición según tus necesidades
    
        // Asegúrate de refrescar la vista si es necesario
      }
    }
}
