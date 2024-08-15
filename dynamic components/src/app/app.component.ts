import { Component, ComponentRef, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './directives/placeholder.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {

    viewContainerRef = inject(ViewContainerRef)
    @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;

    onShowAlert() {
        this.createAlertComponent();
    }

    onCloseAlert() {
    }

    private createAlertComponent() {
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(AlertComponent);
        componentRef.instance.message = 'This is a alert message';
        componentRef.instance.title = 'Alert';
        const closeSub = componentRef.instance.close.subscribe(() => {
            this.onCloseAlert();
            hostViewContainerRef.clear();
            closeSub.unsubscribe();
        });
    
    }


}
