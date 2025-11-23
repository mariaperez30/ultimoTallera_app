import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ar.launcher',
  templateUrl: './ar.launcher.page.html',
  styleUrls: ['./ar.launcher.page.scss'],
  standalone: false
})
export class ARLauncherPage implements OnInit {

  constructor(private readonly modalController: ModalController) { }

  ngOnInit() {}

  async close(){
    await this.modalController.dismiss();
  }

}
