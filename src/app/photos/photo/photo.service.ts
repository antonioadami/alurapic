import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Photo } from "./photo";
import { PhotoComment } from "./photo-comment";
import { map, catchError } from "rxjs/operators";
import { of, throwError } from "rxjs";

const baseURL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(private http: HttpClient){}

    listFromUser(userName: string) {
        return this.http.get <Photo[]> (baseURL + '/' + userName + '/photos') 
    }

    listFromUserPaginated(userName: string, page: number) {
        const params = new HttpParams().append('page', page.toString());
        return this.http.get <Photo[]> (baseURL + '/' + userName + '/photos', { params });
    }

    upload(description: string, allowComments: boolean, file: File) {

        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file);

        return this.http.post(baseURL + '/photos/upload', formData)
    }

    findById(photoId: number) {
        return this.http.get<Photo>(baseURL + '/photos/' + photoId);
    }

    getComments(photoId: number) {
        return this.http.get<PhotoComment[]>(baseURL + '/photos/' + photoId + '/comments');
    }

    addComment(photoId: number, commentText: string) {
        return this.http.post<PhotoComment[]>(
            baseURL + '/photos/' + photoId + '/comments',
            {commentText}
        );
    }

    removePhoto(photoId: number) {
        return this.http.delete(baseURL + '/photos/' + photoId)
    }

    like(photoId: number) {
        return this.http.post(baseURL + '/photos/' + photoId + '/like', {}, { observe: 'response' })
            .pipe(map(res => true))
            .pipe(catchError(err => {
                return err.status == '304' ? of(false) : throwError(err);
            }))
    }
}