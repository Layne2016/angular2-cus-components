import {Component, ViewChild, OnInit} from "@angular/core";


import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";
import {User} from "./user";

@Component({
    selector: 'modal-role',
    templateUrl: './app/components/ng2modalrole/ng2-modal-role.component.html',
    styleUrls: ['./app/components/ng2modalrole/ng2-modal-role.component.css']
})
export class Ng2ModalRoleComponent implements OnInit {
    ngOnInit(): void {
        this.users = [
            {name: '张三', role: 'ajxck', checked: false, operationFlag: -1},
            {name: '李四', role: 'ajxck', checked: false, operationFlag: -1},
            {name: '王五', role: 'ajxck', checked: false, operationFlag: -1},
            {name: '赵六', role: 'ajxck', checked: false, operationFlag: -1},
            {name: '田七', role: 'ajxck', checked: false, operationFlag: -1},
            {name: '一哥', role: 'other1', checked: false, operationFlag: -1},
            {name: '二哥', role: 'other2', checked: false, operationFlag: -1},
            {name: '三哥', role: 'other3', checked: false, operationFlag: -1},
            {name: '四哥', role: 'other4', checked: false, operationFlag: -1},
            {name: '五哥', role: 'other5', checked: false, operationFlag: -1}
        ];
    }

    @ViewChild('lgModal') lgModal: ModalDirective;

    users: User[] = [];
    srcUsers: User[] = [];
    desUsers: User[] = [];
    desRoleName: string = 'ajxck';
    tempAdd: User[] = [];
    tempRemove: User[] = [];

    /**
     * 点击取消
     */
    onCancle() {
        this.clearTempData();
        this.lgModal.hide()
    }

    onModalHidden() {
        this.clearTempData();
    }

    /**
     * 清除操作数据
     */
    private clearTempData() {
        this.desUsers = [];
        this.srcUsers = [];
        this.tempAdd = [];
        this.tempRemove = [];
    }

    /**
     * 点击保存
     */
    onSaveClick() {
        let concat = (this.srcUsers.filter(u => u.operationFlag != -1)).concat((this.desUsers.filter(u1 => u1.operationFlag != -1)));
        if (concat.length === 0) {
            alert("no change")
            this.onCancle();
        } else {
            concat.forEach(u2 => {
                let op = u2.operationFlag == 1 ? "加入到角色列表" : "从角色列表中移除"
                console.log("将" + u2.name + op)
            });
            this.onCancle();
        }
    }

    /**
     * 显示弹出框
     */
    showModal() {
        this.users.forEach(u => {
            u.operationFlag = -1;
            if (u.role == 'ajxck') {
                u.checked = false;
                this.desUsers.push(u);
            } else {
                u.checked = false;
                this.srcUsers.push(u);
            }
        });
        this.lgModal.show();
    }

    /**
     * 切换是否选中
     */
    toggleSelectted(user: User, flag: string) {
        user.checked = !user.checked;
        if (flag === '+') {
            if (user.checked) {
                this.tempAdd.push(user);
            } else {
                this.tempAdd = this.tempAdd.filter(u => u != user);
            }
        } else if (flag === '-') {
            if (user.checked) {
                this.tempRemove.push(user);
            } else {
                this.tempRemove = this.tempRemove.filter(u => u != user);
            }
        }
        console.log(JSON.stringify("add" + this.tempAdd));
        console.log(JSON.stringify("remove" + this.tempAdd));
    }

    /**
     *
     */
    addToRole() {
        this.tempAdd.forEach(user => {
            user.operationFlag = user.role == 'ajxck' ? -1 : 1;
            user.checked = false;
        });
        //加入到角色组
        this.desUsers = this.desUsers.concat(this.tempAdd);
        //从原来的地方去除
        this.tempAdd.forEach(u => {
            this.srcUsers = this.srcUsers.filter(uu => uu.name != u.name)
        });
        this.tempAdd = [];
    }

    removeFromRole() {
        this.tempRemove.forEach(user => {
            user.operationFlag = user.role == 'ajxck' ? 0 : -1;
            user.checked = false;
        });
        //加入到角色组
        this.srcUsers = this.srcUsers.concat(this.tempRemove);
        //从原来的地方去除
        this.tempRemove.forEach(u => {
            this.desUsers = this.desUsers.filter(uu => uu.name != u.name)
        });
        this.tempRemove = [];
    }

}

