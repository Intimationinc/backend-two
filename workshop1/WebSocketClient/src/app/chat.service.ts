import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7000/chat', {
      accessTokenFactory: () =>
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJ1bmlxdWVfbmFtZSI6IklzaGFhbiIsIm5iZiI6MTcyOTI1MTE0NSwiZXhwIjoxNzI5MjU0NzQ1LCJpYXQiOjE3MjkyNTExNDUsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcwMDAiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MDAwIn0.6GoYX3S_zbhc5h4s5iPxC3dE5v29fUOILOfqaD43AUM',
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();

  private messages: IMessage[] = [];
  private groups: IGroup[] = [];
  private users: string[] = [];

  public messages$ = new BehaviorSubject<IMessage[]>([]);
  public groups$ = new BehaviorSubject<IGroup[]>([]);
  public activeUsers$ = new BehaviorSubject<string[]>([]);

  constructor() {
    this.start();

    // Subscribe to the "ReceiveMessage" hub event
    this.connection.on(
      'ReceiveMessage',
      (user: string, text: string, time: Date) => {
        this.messages = [...this.messages, { user, text, time }];
        this.messages$.next(this.messages);
      }
    );

    this.connection.on(
      'RecieveGroupMessage',
      (user: string, text: string, groupName: string, time) => {
        if (!this.groups.some((group) => group.name === groupName)) {
          this.groups = [
            ...this.groups,
            {
              name: groupName,
              messages: [{ user, text, time }],
              users: [user],
            },
          ];

          this.groups$.next(this.groups);
        }
      }
    );

    // Subscribe to the "ConnectedUser" hub event
    // this.connection.on('ConnectedUser', (users: any) => {
    //   this.activeUsers$.next(users);
    // });
  }

  public async start() {
    try {
      await this.connection.start();
      console.log('connection establised');
    } catch (error) {
      console.error('Error during connection startup:', error);
    }
  }

  public async SendPublicMessage(message: string) {
    this.connection.invoke('SendPublicMessage', message);
  }

  public async JoinGroup(userName: string, groupName: string) {
    this.connection.invoke('JoinOrCreateGroup', userName, groupName);
  }

  public async SendGroupMessage(
    userName: string,
    message: string,
    groupName: string
  ) {
    this.connection.invoke('SendGroupMessage', userName, message, groupName);
  }

  public async leaveChat() {
    this.connection.stop();
  }
}

export interface IMessage {
  user: string;
  text: string;
  time: Date;
}

export interface IGroup {
  name: string;
  messages: IMessage[];
  users: string[];
}
