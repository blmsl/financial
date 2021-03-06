import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from '@routes/contact-us/contact-us.component';
import { HomeComponent } from '@routes/home/home.component';
import { ClientComponent } from './client.component';

const routes: Routes = [
    {
        path: '',
        component: ClientComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'contact-us', component: ContactUsComponent },
            { path: 'news', loadChildren: './../../routes/news/news.module#NewsModule' }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})

export class ClientRoutingModule { }
