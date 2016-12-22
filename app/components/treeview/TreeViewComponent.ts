/**
 * Created by lai on 2016/12/20.
 */
import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {TreeFile} from "./treefile";
import {TreeNode} from "./treenode";
import {TreeViewService} from "./treeview.service";

@Component({
    selector: 'tree-view',
    templateUrl: './app/components/treeview/TreeViewComponent.html',
    styleUrls: ['./app/components/treeview/TreeViewComponent.css'],
    providers: [TreeViewService]
})
export class TreeViewComponent implements OnInit {


    private allNode: TreeNode[];

    private visibleNodes: TreeNode[];

    constructor(private treeViewService: TreeViewService) {
    }

    _treeData: TreeFile[] = [];
    _defaultExpandLevel: number = 1;//默认展开的层数


    @Input()
    set defaultExpandLevel(expandlever: number) {
        this._defaultExpandLevel = expandlever;
    }
    @Input()
    set treeData(value: TreeFile[]) {
        this._treeData = value;
    }

    @Output()
    cellClicked: EventEmitter<any> = new EventEmitter();


    get treeData() {
        return this._treeData;
    }

    ngOnInit(): void {
        this.allNode = this.treeViewService.getSortedTreeNodes(this.treeData, this._defaultExpandLevel);
        this.visibleNodes = this.treeViewService.filterVisibleNodes(this.allNode);
    }

    /**
     * 切换是否选中
     * @param node
     */
    private  toggleSelectted(node: TreeNode) {

        if (node.chooseState == 0 || node.chooseState == 1) {
            node.onChoiseStateChange(2);
        } else {
            node.onChoiseStateChange(0);
        }
        if (!node.isLeft()) {
            if (node.chooseState == 2) {
                node.setChildernChooseState(2);
            }
            if (node.chooseState == 0) {
                node.setChildernChooseState(0);
            }
        }
        this.cellClicked.emit(this.getSelectedNodes());
    }

    /**
     * 切换展开状态
     * @param treeNode
     */
    public toggleExpand(treeNode: TreeNode) {
        if (!treeNode.isLeft()) {
            if (treeNode.isExpend) {
                treeNode.setExpand(false)
            } else {
                treeNode.setExpand(true)
            }
        }
        this.visibleNodes = this.treeViewService.filterVisibleNodes(this.allNode)
    }

    public getSelectedNodes(): TreeNode[] {
        return this.treeViewService.filterSelecttedNodes(this.allNode)
    }
}

