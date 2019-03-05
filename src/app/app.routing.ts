import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PrimengComponent } from "./primeng/primeng.component";
import { CrudeComponent } from "./raw/crude.component";
import { MenuComponent } from "./menu/menu.component";


const routes = [
    {
        path: "",
        component: MenuComponent
    },
    {
        path: "raw",
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
