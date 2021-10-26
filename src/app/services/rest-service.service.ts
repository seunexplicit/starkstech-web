import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  private baseUrl: string = '';

  constructor(
    private http:HttpClient
  ) {
    this.baseUrl = environment.server_base_url;
  }

  loginUser(body): Promise<any> {
    return this.http.post(`${this.baseUrl}/user/login`, body, {}).toPromise();
  }

  getGoogleOAuthUrl(): Promise<any> {
    return this.http.get(`${this.baseUrl}/user/google-auth-url`, {}).toPromise();
  }

  updateTaskStatus(body): Promise<any> {
    return this.http.patch(`${this.baseUrl}/todo/status`, body, {}).toPromise()
  }

  postOauthCode(body): Promise<any> {
    return this.http.post(`${this.baseUrl}/user/google-access-token-code`, body, {}).toPromise();
  }

  createUser(body): Promise<any> {
    return this.http.post(`${this.baseUrl}/user/create-new`, body, {}).toPromise();
  }

  getTodos({ page, limit }: {page?:number, limit?:number}): Promise<any> {
    return this.http.get(`${this.baseUrl}/todo?page=${page||''}&limit=${limit||''}`, {}).toPromise();
  }

  getTodo(id): Promise<any> {
    return this.http.get(`${this.baseUrl}/todo/${id}`, {}).toPromise()
  }

  postTodo(body): Promise<any> {
    return this.http.post(`${this.baseUrl}/todo`, body, {}).toPromise();
  }

  deleteTodo(id): Promise<any> {
    return this.http.delete(`${this.baseUrl}/todo/${id}`, {}).toPromise()
  }

  getEvents({ page, limit }): Promise<any> {
    return this.http.get(`${this.baseUrl}/event?page=${page}&limit=${limit}`, {}).toPromise();
  }

  postFiles(file: FormData): Promise<any> {
    return this.http.post(`${this.baseUrl}/user/file`, file).toPromise();
  }

  getFiles(fileId: string): Promise<any> {
    return this.http.get(`${this.baseUrl}/user/file/${fileId}`, {}).toPromise();
  }

  getEvent(id): Promise<any> {
    return this.http.get(`${this.baseUrl}/event/${id}`, {}).toPromise()
  }

  postEvent(body): Promise<any> {
    return this.http.post(`${this.baseUrl}/event`, body, {}).toPromise();
  }

  deleteEvent(id): Promise<any> {
    return this.http.delete(`${this.baseUrl}/event/${id}`, {}).toPromise()
  }

}
