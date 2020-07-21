import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PhotoService } from "../photo/photo.service";
import { Photo } from "../photo/photo";
import { Observable } from "rxjs";
import { PhotoComment } from "../photo/photo-comment";
import { AlertService } from "../../shared/components/alert/alert.service";
import { UserService } from "../../core/user/user.service";

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit{
    
    photo$: Observable<Photo>;
    comments$: Observable<PhotoComment[]>;
    photoId: number;

    constructor(
        private route: ActivatedRoute,
        private router : Router,
        private photoService: PhotoService,
        private alertService: AlertService,
        private userService: UserService
        ) {}
    
    ngOnInit(): void {
        this.photoId = this.route.snapshot.params.photoId;
        this.photo$ = this.photoService.findById(this.photoId);
        this.photo$.subscribe(()=>{}, err => this.router.navigate(['not-found']));
    }

    remove() {
        this.photoService
            .removePhoto(this.photoId)
            .subscribe(() => {
                this.alertService.success('Photo removed!', true);
                this.router.navigate(['/user', this.userService.getUserName()], { replaceUrl: true });
            },
            err => {
                console.log(err);
                this.alertService.warning('Photo couldn\'t be removed!', true);
            }
            );
    }

    like(photo: Photo){
        this.photoService
        .like(photo.id)
        .subscribe(liked => {
            if(liked) 
                this.photo$ = this.photoService.findById(photo.id);
        });
    }

}