import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WithoutplanComponent } from './withoutplan.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: WithoutplanComponent }
    ])],
    exports: [RouterModule]
})
export class WithoutplanRoutingModule {}
