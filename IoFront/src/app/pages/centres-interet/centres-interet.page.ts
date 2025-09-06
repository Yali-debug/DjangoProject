
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service';
import { Router} from '@angular/router';
import { LoadingController,  ToastController} from '@ionic/angular';
import { centreInteretService } from 'src/app/service/centre-interet-service';
import { CentreInteret } from 'src/app/models/article';

@Component({
  selector: 'app-centres-interet',
  templateUrl: './centres-interet.page.html',
  styleUrls: ['./centres-interet.page.scss'],
  standalone: false
})
export class CentresInteretPage implements OnInit {

  centresInteret: CentreInteret[] = [];
  selectedCentres: Set<number> = new Set();
  isLoading = true;

  constructor(
    private centreInteretService: centreInteretService,
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}
  async ngOnInit() {
    await this.loadCentresInteretAlternative();
  }

  async loadCentresInteretAlternative() {
    try {
      const centres = await this.centreInteretService.getCentresInteret().toPromise();
      // Utiliser l'opérateur de coalescence nulle
      this.centresInteret = centres ?? [];
      this.isLoading = false;
    } catch (error) {
      console.error('Erreur lors du chargement des centres d\'intérêt:', error);
      this.showToast('Erreur lors du chargement des centres d\'intérêt');
      this.centresInteret = []; // Toujours assigner un tableau vide en cas d'erreur
      this.isLoading = false;
    }
  }

  toggleSelection(centreId: number) {
    if (this.selectedCentres.has(centreId)) {
      this.selectedCentres.delete(centreId);
    } else {
      this.selectedCentres.add(centreId);
    }
  }

  async saveSelections() {
  if (this.selectedCentres.size === 0) {
    const { role } = await this.showConfirmationToast();
    if (role === 'confirm') {
      // Marquer l'onboarding comme complété et rediriger
      this.authService.completeOnboarding();
      this.navigateToHome();
    }
    return;
  }

  const loading = await this.loadingCtrl.create({
    message: 'Enregistrement de vos préférences...',
    spinner: 'crescent'
  });
  
  await loading.present();

  try {
    const centresArray = Array.from(this.selectedCentres);
    
    await this.centreInteretService.saveAbonnements(centresArray).toPromise();
    
    await loading.dismiss();
    this.showToast('Vos centres d\'intérêt ont été enregistrés avec succès!');
    
    // Marquer l'onboarding comme complété et rediriger
    this.authService.completeOnboarding();
    this.navigateToHome();
    
  } catch (error) {
    await loading.dismiss();
    console.error('Erreur lors de l\'enregistrement:', error);
    this.showToast('Erreur lors de l\'enregistrement de vos préférences');
  }
}

  skipSelection() {
  this.authService.completeOnboarding();
  this.navigateToHome();
  }

  private navigateToHome() {
    this.router.navigate(['/home']);
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom'
    });
    
    await toast.present();
  }

  private async showConfirmationToast(): Promise<{ role: string }> {
    return new Promise(async (resolve) => {
      const toast = await this.toastCtrl.create({
        message: 'Souhaitez-vous continuer sans sélectionner de centres d\'intérêt ?',
        position: 'bottom',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            handler: () => resolve({ role: 'cancel' })
          },
          {
            text: 'Continuer',
            role: 'confirm',
            handler: () => resolve({ role: 'confirm' })
          }
        ]
      });
      
      await toast.present();
    });
  }

}
