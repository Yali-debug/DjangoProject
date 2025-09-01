import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { RegisterData } from 'src/app/models/user';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: false
})
export class LoginPagePage implements OnInit {
  isRegisterMode = false;
  isLoading = false;
  showSplash =true;

  loginCredentials = { 
    username: '', 
    password: '' 
  };

  registerData: RegisterData & { confirmPassword: string } = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    nom: '',
    prenom: '',
    age: 0,
    adresse: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}
  ngOnInit () {
    setTimeout(() => {
      this.showSplash = false;
    }, 2000);
  }

  toggleAuthMode(event: any) {
    this.isRegisterMode = event.detail.value === 'register';
  }

  async login() {
    this.isLoading = true;
    
    const loading = await this.loadingCtrl.create({
      message: 'Connexion...',
      spinner: 'crescent',
      cssClass: 'custom-loading'
    });
    
    await loading.present();

    try {
      await this.authService.login(this.loginCredentials).toPromise();
      
      await loading.dismiss();
      this.isLoading = false;
      
      this.router.navigate(['/home']);
      
    } catch (error: any) {
      await loading.dismiss();
      this.isLoading = false;
      
      let errorMessage = 'Erreur de connexion';
      
      if (error.status === 401) {
        errorMessage = 'Identifiants incorrects';
      } else if (error.status === 0) {
        errorMessage = 'Serveur inaccessible';
      }
      
      this.showToast(errorMessage);
    }
  }

  async register() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.showToast('Les mots de passe ne correspondent pas');
      return;
    }

    this.isLoading = true;
    
    const loading = await this.loadingCtrl.create({
      message: 'Création du compte...',
      spinner: 'crescent',
      cssClass: 'custom-loading'
    });
    
    await loading.present();

    try {
      // Supprimer confirmPassword avant l'envoi
      const { confirmPassword, ...userData } = this.registerData;
      
      await this.authService.register(userData).toPromise();
      
      await loading.dismiss();
      this.isLoading = false;
      
      this.showToast('Compte créé avec succès ! Vous pouvez vous connecter');
      
      // Revenir au mode login
      this.isRegisterMode = false;
      this.resetRegisterForm();
      
    } catch (error: any) {
      await loading.dismiss();
      this.isLoading = false;
      
      let errorMessage = 'Erreur lors de la création du compte';
      
      if (error.status === 400) {
        if (error.error.username) {
          errorMessage = 'Ce nom d\'utilisateur est déjà pris';
        } else if (error.error.email) {
          errorMessage = 'Cet email est déjà utilisé';
        } else {
          errorMessage = 'Données invalides';
        }
      } else if (error.status === 0) {
        errorMessage = 'Serveur inaccessible';
      }
      
      this.showToast(errorMessage);
    }
  }

  private resetRegisterForm() {
    this.registerData = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      nom: '',
      prenom: '',
      age: 0,
      adresse: ''
    };
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'danger',
      buttons: [
        {
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    
    await toast.present();
  }

}
