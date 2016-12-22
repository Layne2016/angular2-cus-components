import {Component, ViewContainerRef, ViewChild} from '@angular/core';
import {AlertComponent, ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {NgModel} from '@angular/forms';
import {TreeFile} from "./components/treeview/treefile";
import {TreeModalComponent} from "./components/treemodal/tree-modal.component";

@Component({
    selector: 'my-app',
    template: `
    <alert type="info">ng2-bootstrap hello world!</alert>
      <tree-modal [treeDatas]="asasa" #treeModala
      (onConfirmButtonClick)="onConfirm($event)" 
      [modalTitle]='modalTitle'
      [defaultExpandLevel]="0"
      [positiveButtonTiltle]="'确认'"
      [negativeButtonTitle] ="'取消'"
      ></tree-modal>
      <tree-view [treeData]="asasa"  (cellClicked)="onCellClick($event)"></tree-view>
      <button (click)="showTree(1)">显示</button>
      <button (click)="showTree(2)">显示</button>
      <button (click)="showTree(3)">显示</button>
      <button (click)="showTree(4)">显示</button>
      <button (click)="showTree(5)">显示</button>
  `,
})
export class AppComponent {
    modalTitle: string = "权限管理";

    asasa: TreeFile[] = [];

    aData: TreeFile[] = [
        {id: 0, pId: null, label: 'root1a'},
        {id: 1, pId: null, label: 'root2a'},

        {id: 111, pId: 11, label: '1-1-1a'},
        {id: 112, pId: 11, label: '1-1-2a'},
        {id: 113, pId: 11, label: '1-1-3a'},
        {id: 114, pId: 11, label: '1-1-4a'},
        {id: 1111, pId: 111, label: '1-1a'},
        {id: 12111, pId: 111, label: '1-2a'},

        {id: 11, pId: 0, label: '1-1a'},
        {id: 12, pId: 0, label: '1-2a'},
        {id: 13, pId: 0, label: '1-3a'},
        {id: 14, pId: 0, label: '1-4a'},

        {id: 21, pId: 1, label: '2-1a'},
        {id: 22, pId: 1, label: '2-2a'},
        {id: 33, pId: 1, label: '2-3a'},
        {id: 44, pId: 1, label: '2-4a'},
    ];
    bData: TreeFile[] = [
        {id: 0, pId: null, label: 'root1b'},
        {id: 1, pId: null, label: 'root2b'},

        {id: 111, pId: 11, label: '1-1-1b'},
        {id: 112, pId: 11, label: '1-1-2b'},
        {id: 113, pId: 11, label: '1-1-3b'},
        {id: 114, pId: 11, label: '1-1-4b'},
        {id: 1111, pId: 111, label: '1-1b'},
        {id: 12111, pId: 111, label: '1-2b'},

        {id: 11, pId: 0, label: '1-1b'},
        {id: 12, pId: 0, label: '1-2b'},
        {id: 13, pId: 0, label: '1-3b'},
        {id: 14, pId: 0, label: '1-4b'},

        {id: 21, pId: 1, label: '2-1b'},
        {id: 22, pId: 1, label: '2-2b'},
        {id: 33, pId: 1, label: '2-3b'},
        {id: 44, pId: 1, label: '2-4b'},
    ];


    private viewContainerRef: ViewContainerRef;

    public constructor(viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }

    public dt: Date = new Date();
    private minDate: Date = null;
    private events: Array<any>;
    private tomorrow: Date;
    private afterTomorrow: Date;
    private formats: Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
    private format = this.formats[0];
    private dateOptions: any = {
        formatYear: 'YY',
        startingDay: 1
    };
    private opened: boolean = false;

    public getDate(): number {
        return this.dt && this.dt.getTime() || new Date().getTime();
    }

    onCellClick(data: any) {
        console.log(data);
    }

    onConfirm(data: any) {
        console.log(data);
    }

    @ViewChild('treeModala') treeModal: TreeModalComponent;

    showTree(flag: number) {
        if (flag === 1 || flag == 2) {
            this.asasa = this.aData;
        } else {
            this.asasa = this.bData;
        }
        this.treeModal.showChildModal();
    }
}