import {Component, OnInit} from '@angular/core';
import {PashminaModel} from '../../model/pashmina.model';
import {HomeService} from '../../services/home-service/home-service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {OrderModel} from '../../model/order.model';
import {UserModel} from '../../model/user.model';
import {OrderService} from '../../services/order-service/order-service';

@Component({
    selector: 'app-user-pashmina-details',
    templateUrl: './user-pashmina-details.component.html',
    styleUrls: ['./user-pashmina-details.component.scss']
})
export class UserPashminaDetailsComponent implements OnInit {

    public pashmina: PashminaModel = new PashminaModel();
    private pashminaId = 0;
    public pashminaName: string;
    public pashminaPrice: number;
    public price: number;
    public number: number;
    public address: number;
    public orderModel: OrderModel = new OrderModel();

    constructor(
        private homeService: HomeService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private orderService: OrderService,
    ) {}

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.pashminaId = params['id'];
        });

        this.getPashminaById();
    }

    private getPashminaById() {
        this.homeService.getPashminaById(this.pashminaId).subscribe(
            result => {
                this.pashmina = result;
                this.pashminaName = this.pashmina.images[0].imageName;
                this.price = this.pashmina.price;
                this.pashminaPrice = this.pashmina.price;
            }, error => {
                console.log(error);
            }
        )
    }

    public calculatePrice(quantity: number) {

        this.pashminaPrice = this.price * quantity;
    }

    public addToCart() {
        if (!localStorage.getItem("userDetails")) {
            swal({
                title: 'Login Needed?',
                text: "You are not logged in. Do you want to log in?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Log in!'
            }).then((result) => {
                if (result.value) {
                    this.router.navigate(['account']);
                }
            })
        } else {
//            swal.mixin({
//                input: 'text',
//                confirmButtonText: 'Next &rarr;',
//                showCancelButton: true,
//                progressSteps: ['1', '2']
//            }).queue([
//                {
//                    title: 'Confirmation',
//                    text: 'Please provide us your full address'
//                },
//                'Please provide us your contact number'
//            ]).then((result) => {
//                if (result.value) {
//                    this.orderModel.shippingAddress = result.value[0];
//                    this.orderModel.contact = result.value[1];
//                    this.orderModel.pashminaId = new PashminaModel(this.pashminaId);
//                    this.orderModel.userId = new UserModel(JSON.parse(localStorage.getItem("userDetails"))["userId"]);
//
//                    console.log(this.orderModel.shippingAddress);
//                    console.log(this.orderModel.contact);
//                    
//                    console.log(this.orderModel);
//
//                    this.orderService.orderPashmina(this.orderModel).subscribe(
//                        result => {
//                            swal({
//                                title: 'Hurrey!',
//                                type: 'success',
//                                html: '<p>You have successfully added to a cart.</p><p>We will delivered a items with in 3 business day</p>',
//                                width: 600,
//                                background: '#fff',
//                                backdrop: `
//                            rgba(0,0,123,0.4)
//                            url("http://www.animatedimages.org/data/media/466/animated-thank-you-image-0023.gif")
//                            center left
//                            no-repeat
//                          `
//                            }).then((result) => {
//                                if (result.value) {
//                                    this.router.navigate(['/home']);
//                                }
//                            })
//                        }, error => {
//                            console.log(error);
//                        }
//                    )
//                }
//            })
        }
    }

}
