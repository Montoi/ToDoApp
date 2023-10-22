import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { note } from "app/shared/interfaces/note.interface";
import { NoteServiceService } from "app/shared/services/note-service.service";

@Component({
  selector: "dashboard-cmp",
  moduleId: module.id,
  templateUrl: "dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  public notesArray: note[] = [];
  public modalRef: NgbModalRef;
  public form: FormGroup;  
  ramdonColors: string[] = [
    "#e4c1f9",
    "#fff",
    "#a9def9",
    "#d0f4de",
    "#fcf6bd",
    "#fcf6bd",
  ];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private notesService: NoteServiceService
  ) {
    this.form = this.fb.group({
      id: [0],
      priority: ["", { validators: [Validators.required] }],
      noteText: ["", { validators: [Validators.required] }],
      date: [Date.now],
      color: [""],
    });
  }
  async ngOnInit() {
    await this.notesService.getNotes().subscribe((response) => {
      if (response.isSuccess) {
        this.notesArray = response.result; // Asigna los datos del resultado al arreglo 'notesArray'
        console.log("response", response.isSuccess);
        console.log("array", this.notesArray);
      } else {
        // Maneja errores si es necesario
      }
    });
  }
  onCheckboxChange(event: any, note: any) {
    // El parámetro 'event' contiene información sobre el evento de cambio
    // El parámetro 'note' es el objeto de la nota asociado a la casilla de verificación
    const isChecked = event.target.checked; // Verifica si la casilla está marcada
    if (isChecked) {
      // Realiza acciones cuando la casilla está marcada
      console.log(
        `La casilla de verificación para la nota ${note.id} ha sido marcada.`
      );
    } else {
      // Realiza acciones cuando la casilla está desmarcada
      console.log(
        `La casilla de verificación para la nota ${note.id} ha sido desmarcada.`
      );
    }
  }

  getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.ramdonColors.length);
    return this.ramdonColors[randomIndex];
  }

  seleccioneVisor( content) {
  
      const options: NgbModalOptions = {
        backdrop: false, // Impide que el backdrop cierre el modal
        windowClass: "custom-modal", // Clase CSS personalizada para el modal
      };
      this.modalService.open(content, options);
    
    
  }
  closeModal() {
    this.modalService.dismissAll();
    console.log("klk");
  }
  submitModal() {
    console.log("submitModal", this.form.value);
    const note: note = {
      id: this.form.value.id ?? "0",
      priority: this.form.value.priority,
      noteText: this.form.value.note,
      date: new Date(),
      colorId: 1,
      userId: 1,
    };
    this.form.reset();
    console.log("Objeto Final", note);
    this.notesArray.push(note);
  }
  editModal(id: number, contentNote) {
    console.log("id", id);

    if (id > 0) {
      // Obtén el elemento que deseas editar
      const noteToEdit = this.notesArray.find((note) => note.id === id);
      if (noteToEdit) {
        console.log('hola');
        
        // Patchea los valores del objeto en el formulario
        this.form.patchValue({
          id: noteToEdit.id,
          priority: noteToEdit.priority,
          noteText: noteToEdit.noteText,
          date: noteToEdit.date,
          color: noteToEdit.colorId,
        });

        console.log(this.form.value);
        
        // Si se encuentra un objeto con el ID, puedes abrir el modal y pasar el objeto para la edición
        const options: NgbModalOptions = {
          backdrop: false, // Impide que el backdrop cierre el modal
          windowClass: "custom-modal", // Clase CSS personalizada para el modal
        };
       

        // Abre el modal y pasa el objeto noteToEdit al componente de edición
        this.modalService.open(
          contentNote,
          options
        )
      } else {
        console.log(`No se encontró un objeto con el ID ${id}`);
      }
    }
  }
}
