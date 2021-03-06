import { Component, OnInit, ElementRef, HostListener, Inject } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { WINDOW } from '@ng-toolkit/universal';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    fixTop: boolean = false;
    arrow: any;
    user: any;
    constructor(@Inject(WINDOW) private window: Window, public location: Location, private element: ElementRef, private afAuth: AngularFireAuth) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.afAuth.authState.subscribe(user => {
            if (!!user) {
                this.user = user;
            }
        })
    }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        if (this.window.scrollY > 40) {
            this.fixTop = true;
        } else {
            this.fixTop = false;
        }
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '/documentation') {
            return true;
        }
        else {
            return false;
        }
    }
}