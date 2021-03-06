import {Component, OnInit} from '@angular/core';
import {NavbarService} from '../../../services/navbar/navbar.service';
import {FooterService} from '../../../services/footer/footer.service';
import {Category, Color} from '../../../enum/Enum';
import {PashminaModel} from '../../../model/pashmina.model';
import {DescriptionModel} from '../../../model/description.model';
import {PashminaColourModel} from '../../../model/color.model';
import {ImageModel} from '../../../model/image.model';
import {PashminaService} from '../../../services/pashmina-service/pashmina-service';
import {ImageService} from '../../../services/image-service/image-service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-pashmina',
    templateUrl: './pashmina.component.html',
    styleUrls: ['./pashmina.component.scss']
})
export class PashminaComponent implements OnInit {

    public category: any[] = [];
    public colors: any[] = [];
    public localUrl: any[] = [];
    private imageName: string[] = [];
    public description: string;
    public descriptionArray: string[] = [];
    public color: string;
    public colorArray: string[] = [];
    public pashmina: PashminaModel = new PashminaModel();
    public pashminaArray: PashminaModel[] = [];
    public descriptionModel: DescriptionModel = new DescriptionModel();

    public colorModel: PashminaColourModel = new PashminaColourModel();
    public colorModelArray: PashminaColourModel[] = [];

    public imageModel: ImageModel = new ImageModel();
    public imageModelArray: ImageModel[] = [];

    public working: boolean = false;

    private images: string[] = [];

    constructor(
        private nav: NavbarService,
        private foot: FooterService,
        private pashminaService: PashminaService,
        private imageService: ImageService
    ) {}

    ngOnInit() {
        this.nav.hide();
        this.foot.hide();

        for (var i in Category) {
            if (!parseInt(i, 10)) {
                this.category.push(i);
            }
        }

        for (var i in Color) {
            if (!parseInt(i, 10)) {
                this.colors.push(i);
            }
        }
    }

    showPreviewImage(event: any) {
        this.imageName.push(event.target.files[0].name);
        if (event.target.files && event.target.files[0]) {
            this.images.push(event.target.files[0]);
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.localUrl.push(event.target.result);
            }
            reader.readAsDataURL(event.target.files[0]);
        }
        this.imageModel = new ImageModel();
    }

    removeImage(num: number) {
        this.localUrl.splice(num, 1);
        this.imageName.splice(num, 1);
        this.images.splice(num, 1);
    }

    addDescription() {
        if (this.description) {
            this.descriptionModel.pashminaDescription = this.description;
            this.pashmina.descriptions.push(this.descriptionModel);
        }
        this.description = null;
        this.descriptionModel = new DescriptionModel();
    }

    closeDesc(num: number) {
        this.pashmina.descriptions.splice(num, 1);
    }

    addColor() {
        if (this.color) {
            this.colorModel.color = this.color;
            this.pashmina.pashminaColor.push(this.colorModel);
        }
        this.colorArray.push(this.color);
        this.colorModel = new PashminaColourModel();
    }

    closeColor(num: number) {
        this.colorArray.splice(num, 1);
    }

    savePashmina() {
        this.working = true;
        this.pashminaService.addPashmina(this.pashmina).subscribe(
            result => {
                this.uploadImages();
            }, error => {
                console.log(error);
            }
        )
    }

    uploadImages() {
        let formData = new FormData();
        this.images.forEach(res => {
            formData.append('file', res);
        })

        this.imageService.uploadImage(formData).subscribe(
            result => {
                this.working = false;
                swal(
                    'Success!',
                    'Pashmina Details Added Successfully',
                    'success'
                )
                
                this.pashmina.pashminaName = "";
                this.images = [];
                this.colorArray = [];
                this.pashmina.descriptions = [];
                
            }, error => {
                console.log(error);
            }
        )
    }
}
