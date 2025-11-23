import { Component } from '@angular/core';
import { ARLauncherPage } from '../pages/ar.launcher/ar.launcher.page';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
constructor(
  private ModalController: ModalController,
   private routerOutlet: IonRouterOutlet
 
){}


// company-store.page.ts
async openAR() {
  const modal: HTMLIonModalElement = await this.ModalController.create({
    component: ARLauncherPage,
    presentingElement: this.routerOutlet.nativeEl
  });

  return await modal.present();

}
}



