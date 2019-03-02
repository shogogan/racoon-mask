import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PrimengComponent } from "./primeng/primeng.component";
import { CrudeComponent } from "./crude/crude.component";
import { MenuComponent } from "./menu/menu.component";


const routes = [
    {
        path: "",
        component: MenuComponent
    },
    {
        path: "crude",
        component: CrudeComponent,
    },
    {
        path: "primeng",
        component: PrimengComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting {

}
