import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2BootstrapModule, ModalDirective, ModalModule} from 'ng2-bootstrap/ng2-bootstrap';

import {AppComponent} from './app.component';
import {Ng2ModalRoleComponent} from "./components/ng2modalrole/ng2-modal-role.component";
import {TreeViewComponent} from "./components/treeview/TreeViewComponent";
import {TreeModalComponent} from "./components/treemodal/tree-modal.component";


@NgModule({
    declarations: [AppComponent, Ng2ModalRoleComponent,TreeViewComponent,TreeModalComponent],
    imports: [
        BrowserModule,
        FormsModule,
        Ng2BootstrapModule,
        ModalModule
    ],

    bootstrap: [AppComponent]
})

export class AppModule {
}