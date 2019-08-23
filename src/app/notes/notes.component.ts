import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Notebook} from "./model/notebook";
import {NoteService} from "../shared/note.service";
import {Note} from "./model/note";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notebooks: Notebook[] = [];
  notes: Note[] = [];
  selectedNotebook: Notebook;
  searchText: string;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.getAllNotebooks();
    this.getAllNotes();
  }

  public getAllNotebooks() {
    this.noteService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      },
      err => {
        alert("An error has occured while retrieving all notebooks")
      }
    )
  }

  public getAllNotes() {
    this.noteService.getAllNotes().subscribe(
      res => {
          this.notes = res;
      },
      err => {
        alert("An error has occured while retrieving all notes")
      }
    );
  }

  createNotebook() {
    let newNotebook: Notebook = {
      name: "New notebook",
      id: null,
      nbOfNotes: 0

    };

    this.noteService.postNotebook(newNotebook).subscribe(
      res => {
        newNotebook.id = res.id;
        this.notebooks.push(newNotebook);
      },
      err => {
        alert("An error has occured while creating a new notebook")
      }
    );
  }

  updateNotebook(updatedNotebook: Notebook) {
    this.noteService.postNotebook(updatedNotebook).subscribe(
      res => {

      },
      err => {
        alert("An error has occured while updating a notebook")
      }
    );
  }

  deleteNotebook(notebook: Notebook) {
    if (confirm("Are you sure you wish to delete this notebook?")) {
      this.noteService.deleteNotebook(notebook.id).subscribe(
        res => {
            let indexOfNotebook = this.notebooks.indexOf(notebook);
            this.notebooks.splice(indexOfNotebook, 1);
        },
        err => {
          alert("An error has occured while deleting this notebook")
        }
      );
    }
  }

  deleteNote(note: Note) {
    if (confirm("Are you sure you wish to delete this note?")) {
      this.noteService.deleteNote(note.id).subscribe(
        res => {
          let indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
        },
        err => {
          alert("An error has occured while deleting this note")
        }
      )
    }
  }

  createNote(noteBookId: string) {
    let newNote: Note = {
      id: null,
      title: "New note",
      text: "Write some text in here",
      lastModifiedOn: null,
      notebookId: noteBookId
    }

    this.noteService.saveNote(newNote).subscribe(
      res => {
        newNote.id = res.id;
        this.notes.push(newNote);
      },
      err => {
        alert("An error occured while saving the note")
      }
    );
  }

  selectNotebook(notebook: Notebook) {
    this.selectedNotebook = notebook;
    this.noteService.getNotesByNotebook(notebook.id).subscribe(
      res => {
        this.notes = res;
      },
      err => {
        alert("An error has occured while retrieving the notes")
      }
    )
  }

  updateNote(updatedNote: Note) {
    this.noteService.saveNote(updatedNote).subscribe(
      res => {

      },
      err => {
        alert("An error occured while updating the note")
      }
    );
  }

  selectAllNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }
}
