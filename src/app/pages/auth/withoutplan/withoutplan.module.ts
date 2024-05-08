import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {WithoutplanRoutingModule} from "./withoutplan-routing.module";
import {ButtonModule} from "primeng/button";
import {WithoutplanComponent} from "./withoutplan.component";


@NgModule({
    imports: [
        CommonModule,
        WithoutplanRoutingModule,
        ButtonModule
    ],
    declarations: [WithoutplanComponent]
})
export class WithoutplanModule {}
