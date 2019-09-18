import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  userList: any = [];
  query: string;
  selectedUser: any = {};
  showChatBox: boolean = false;
  loggedInUserData: any = {};
  chatList: any = [];
  message: string;

  constructor(private userService: UserService,
    private chatService: ChatService) { }

  ngOnInit() {
    this.getUserSelectList();
    this.getLoggedInUser();
  }

  getLoggedInUser() {
    this.userService.loggedInUser().subscribe(
      (resp) => {
        this.loggedInUserData = resp;
        console.log('user', this.loggedInUserData);
      }
    )
  }

  getUserSelectList() {
    this.userService.userSelectList().subscribe(
      (resp) => {
        this.userList = resp;
      }
    )
  }

  search() {
    if (this.query.length) {
      this.userService.searchUser(this.query).subscribe(
        (resp) => {
          this.userList = resp;
        }
      )
    }
    else {
      this.getUserSelectList();
    }
  }

  selectUserForChat(user) {
    this.selectedUser = user;
    this.showChatBox = true;
    if (this.selectedUser) {
      this.getUserChat();
    }
    console.log(user);
  }

  getUserChat() {
    let data = {
      'adminId': this.loggedInUserData.id,
      'userId': this.selectedUser.id,
      'userType': 'admin'
    }
    this.chatService.getUserChat(data).subscribe(
      (resp) => {
        this.chatList = resp;
      }
    )
  }

  sendMessage() {
    let data = {
      'admin_id' : this.loggedInUserData.id,
      'user_id' : this.selectedUser.id,
      'message' : this.message
    }
    this.chatService.addMessage(data).subscribe(
      (resp) => {
        this.getUserChat();
        this.message = '';
      }
    )
  }


}
