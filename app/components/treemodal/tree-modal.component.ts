import {Component, ViewChild, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";
import {TreeFile} from "../treeview/treefile";
import {TreeViewComponent} from "../treeview/TreeViewComponent";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
@Component({
    selector: 'tree-modal',
    styleUrls: ['/app/components/treemodal/tree-modal.component.css'],
    templateUrl: './app/components/treemodal/tree-modal.component.html'
})
export class TreeModalComponent implements OnInit {
    private treeViewShowFlag: boolean = false;

    ngOnInit(): void {

    }

    constructor(private sanitizer: DomSanitizer) {
    }

    @ViewChild('childModal') public childModal: ModalDirective;
    @ViewChild('treeView') public treeView: TreeViewComponent;

    public showChildModal(): void {
        this.childModal.show();
    }

    private hideChildModal(): void {
        this.childModal.hide();
    }

    _treeDatas: TreeFile[] = [];//数据
    _title: string = "标题";  //标题
    _defaultExpandLevel: number = 1;//默认展开的层数
    _negativeButtonTitle: string = "cancle";
    _positiveButtonTiltle: string = "ok";


    @Input() set negativeButtonTitle(title: string) {
        this._negativeButtonTitle = title
    }

    @Input() set positiveButtonTiltle(title: string) {
        this._positiveButtonTiltle = title
    }

    @Input()
    set treeDatas(treeData: TreeFile[]) {
        this._treeDatas = treeData;
    }

    @Input()
    set modalTitle(title: string) {
        this._title = title;
    }


    @Input()
    set defaultExpandLevel(expandlever: number) {
        this._defaultExpandLevel = expandlever;
    }


    @Output()
    onConfirmButtonClick: EventEmitter<any> = new EventEmitter();


    /**
     * 点击确定
     */
    private  onConfirmClick() {
        this.onConfirmButtonClick.emit(this.treeView.getSelectedNodes());
        this.childModal.hide();
    }

    private sanitize1(html: any): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    private onModalShown() {
        this.treeViewShowFlag = true;
    }

    private onModalHidden() {
        this.treeViewShowFlag = false;
    }

}