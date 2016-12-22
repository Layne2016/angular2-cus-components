import {Injectable} from "@angular/core";
import {TreeNode} from "./treenode";
import {TreeFile} from "./treefile";
@Injectable()
export class TreeViewService {

    private allNode: TreeNode[];

    private visibleNodes: TreeNode[];

    /**
     * 将数据转换为节点
     * @param treeDatas
     * @returns {TreeNode[]}
     */
    public convertData2Nodes(treeDatas: TreeFile[]): TreeNode[] {
        //组装NODE并加入到数组中
        let treeNodes: TreeNode[] = [];
        treeDatas.forEach(data => {
            let treeNode = new TreeNode();
            treeNode.id = data.id;
            treeNode.label = data.label;
            treeNode.pId = data.pId;
            treeNodes.push(treeNode);
        });
        //设置父子关系
        for (let i = 0; i < treeNodes.length; i++) {
            let n = treeNodes[i];
            for (let j = i + 1; j < treeNodes.length; j++) {
                let m = treeNodes[j];
                if (m.pId == n.id) {
                    n.children.push(m);
                    m.parent = n;
                } else if (m.id == n.pId) {
                    m.children.push(n);
                    n.parent = m;
                }
            }
        }

        return treeNodes;
    }


    private nodeContainer: TreeNode[] = [];

    /**
     * 获取排序过的节点
     * @param treeDatas
     * @param defaultExpandLevel
     * @returns {TreeNode[]}
     */
    public getSortedTreeNodes(treeDatas: TreeFile[], defaultExpandLevel: number): TreeNode[] {

        //将数据转为节点
        let nodes = this.convertData2Nodes(treeDatas);

        //获取所有根结点
        let rootNodes: TreeNode[] = this.getRootNodes(nodes);
        this.nodeContainer = [];
        //递归所有节点,将子节点挂在父节点上
        rootNodes.forEach(node => {
            this.addToTree(node, defaultExpandLevel, 1);
        });
        return this.nodeContainer;
    }

    /**
     * 递归将节点挂在父节点
     *
     * @param treeNodes node 容器
     * @param node 根节点
     * @param defaultExpandLevel 默认展开级数
     * @param number 当前级数
     */
    private addToTree(node: TreeNode, defaultExpandLevel: number, currentLevel: number) {
        node.level = currentLevel;
        this.nodeContainer.push(node);//将根节点加入容器

        if (defaultExpandLevel >= currentLevel) {
            node.setExpand(true);
        }
        if (!node.isLeft()) {
            for (let i = 0; i < node.children.length; i++) {
                this.addToTree(node.children[i], defaultExpandLevel, currentLevel + 1);
            }
        }
    }

    /**
     * 获取所有的根结点
     * @param nodes
     * @returns {TreeNode[]}
     */
    private getRootNodes(nodes: TreeNode[]): TreeNode[] {
        let root: TreeNode[] = [];
        let j = 0;
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            if (node.parent) {
            } else {
                root.push(node);
            }
        }
        return root;
    }
    /**
     * 过滤可显示的节点
     * @param treeNodes
     * @returns {TreeNode[]}
     */
    public filterVisibleNodes(treeNodes: TreeNode[]): TreeNode[] {
        let result: TreeNode[] = [];
        treeNodes.forEach(n => {
            if (n.isRoot() || n.isParentExpand()) {
                this.setNodeIcon(n);
                result.push(n);
            }
        });
        return result;
    }

    /**
     * 过滤已选的节点
     * @param treeNodes
     * @returns {TreeNode[]}
     */
    public filterSelecttedNodes(treeNodes: TreeNode[]): TreeNode[] {
        let result: TreeNode[] = [];
        treeNodes.forEach(n => {
            if (n.isLeft() && n.chooseState==2) {
                result.push(n);
            }
        });
        return result;
    }

    /**
     * 设置节点图标
     * @param node
     * E:\NG2\angular2-quickstart\app/components/treeview/expand_yes.png
     */
    private setNodeIcon(node: TreeNode) {
        if (node.children.length > 0 && node.isExpend) {
            node.iconUrl = 'url("./app/components/treeview/expand_yes.png") 0% 0% / 20px 20px no-repeat';
        } else if (node.children.length > 0 && !node.isExpend) {
            node.iconUrl = 'url("./app/components/treeview/expand_no.png") 0% 0% / 20px 20px no-repeat';
        }
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
        this.visibleNodes = this.filterVisibleNodes(this.allNode)
    }
}