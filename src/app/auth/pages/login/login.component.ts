import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';
import { CarouselService } from 'src/app/core/services/carousel.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, AfterViewInit {


  @ViewChild('carousel') carousel: ElementRef | undefined | any

  slides = [
    {
      "id": 1,
      "image": "/assets/images/login/Data@2x.png",
      "title": "Marcenas mattis egestas",
      "text": "Erdum et malesuada fames ac ante ileum primmer in faucibus uspendisse porta.",
    },
    {
      "id": 2,
      "image": "/assets/images/login/Data@2x.png",
      "title": "Marcenas mattis egestas",
      "text": "Erdum et malesuada fames ac ante ileum primmer in faucibus uspendisse porta.",
    },
    {
      "id": 3,
      "image": "/assets/images/login/Data@2x.png",
      "title": "Marcenas mattis egestas",
      "text": "Erdum et malesuada fames ac ante ileum primmer in faucibus uspendisse porta.",
    },
    {
      "id": 4,
      "image": "/assets/images/login/Data@2x.png",
      "title": "Marcenas mattis egestas",
      "text": "Erdum et malesuada fames ac ante ileum primmer in faucibus uspendisse porta.",
    },
  ]

  actions: any = {
    signIn: {
      is: 'signIn',
      isChange: 'signUp',
      action: 'Sign in',
      actionChange: 'Create Account',
      actionTitle: 'Welcome to Invision'
    },
    signUp: {
      is: 'signUp',
      isChange: 'signIn',
      action: 'Sign up',
      actionChange: 'Log in',
      actionTitle: 'Getting Started'
    },
    forgot: {
      is: 'forgot',
      isChange: 'signIn',
      action: 'Send recovery email',
      actionChange: 'Go back',
      actionTitle: 'Forgot your password'
    }
  }
  configs = this.actions['signUp']

  loading: boolean = false;

  authForm!: FormGroup;
  authProviders = AuthProvider;

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  private passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(
    readonly carouselService: CarouselService,
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.changeAuthAction('signIn');
  }

  private createForm(): void {
    this.authForm! = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  get name(): FormControl {
    return this.authForm?.get('name') as FormControl
  }

  get email(): FormControl {
    return this.authForm?.get('email') as FormControl
  }

  get password(): FormControl {
    return this.authForm?.get('password') as FormControl
  }

  ngAfterViewInit(): void {
    this.carouselService.init(this.carousel)
  }

  changeAuthAction(is: string): void {
    // this.authForm.reset()
    switch (is) {
      case 'signIn':
        this.authForm.addControl('password', this.passwordControl);
        this.authForm.removeControl('name')
        break;
      case 'signUp':
        this.authForm.addControl('name', this.nameControl)
        break;
      case 'forgot':
        this.authForm.removeControl('name')
        this.authForm.removeControl('password')
        break;
    }
    this.configs = this.actions[is];
  }

  async onSubmit(provider: AuthProvider): Promise<void> {
    this.loading = !this.loading;
    try {
      const credential = await this.authService.authenticate({
        is: this.configs.is,
        user: this.authForm.value,
        provider
      })

      switch (this.configs.is) {
        case 'forgot':
          console.log('Email de recuperação enviado para o email.');
          break;
        case 'signUp':
          console.log('Conta criada com sucesso.');
          break;
        case 'signIn':
          console.log('Você está logado.');
          break;
      }
      this.router.navigate([this.route.snapshot.queryParamMap.get('redirect') || '/dashboard']);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        this.loading = !this.loading;
      }, 1000);
    }
  }

}
