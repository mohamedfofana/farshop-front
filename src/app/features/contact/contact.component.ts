import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  ControlError,
  UtilsService,
} from '../../core/services/utils/utils/utils.service';
import { emailInputValidator } from '../../core/validators/emailInputValidator';
import { MatInputErrorComponent } from '../../shared/components/common/form/mat-input-error/mat-input-error.component';
import { Router } from '@angular/router';
import { NotifierService } from '../../core/services/utils/notifier/notifier.service';
import { ContactService } from '../../core/services/http/contact/contact.service';
import { HttpErrorHandlerService } from '../../core/services/http/httpErrorHandler/http-error-handler.service';
import { catchError } from 'rxjs';
import { FormInputErrorComponent } from '../../shared/components/common/form-input-error/form-input-error.component';
import { FormErrorComponent } from '../../shared/components/common/form-error/form-error.component';
import { AbstractOnDestroy } from '../../core/directives/unsubscriber/abstract.ondestroy';
import { ROUTE_PATH } from '../../core/config/routes/routesConfig';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputErrorComponent,
    FormInputErrorComponent,
    TranslateModule,
    FormErrorComponent,
  ],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent extends AbstractOnDestroy {
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  private readonly httpErrorHandlerService = inject(HttpErrorHandlerService);
  private readonly utilsService = inject(UtilsService);
  private readonly contactService = inject(ContactService);
  private readonly notifier = inject(NotifierService);
  private readonly formBuilder = inject(FormBuilder);

  readonly MIN_LENGTH_NAME: number = 3;
  readonly MAX_LENGTH_NAME: number = 50;
  readonly MIN_LENGTH_MESSAGE: number = 10;

  contactForm!: FormGroup;
  hasInputError = signal<boolean>(false);
  hasHttpError = signal<boolean>(false);
  errors = signal<ControlError[]>([]);
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.MIN_LENGTH_NAME),
    Validators.maxLength(this.MAX_LENGTH_NAME),
  ]);
  emailFormControl = new FormControl<string>('', [
    Validators.required,
    emailInputValidator,
  ]);
  messageFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.MIN_LENGTH_MESSAGE),
  ]);

  constructor() {
    super();
    this.contactForm = this.formBuilder.group({
      name: this.nameFormControl,
      email: this.emailFormControl,
      message: this.messageFormControl,
    });
  }

  submit() {
    this.hasInputError.set(false);
    this.hasHttpError.set(false);
    if (this.contactForm.valid) {
      let successMessage = '';
      const subMessage = this.translate
        .get('contact.form.success')
        .subscribe((successMsg: string) => {
          successMessage = successMsg;
        });
      this.subscriptions.push(subMessage);
      const contactDto = this.contactForm.value;
      const subSend = this.contactService
        .send(contactDto)
        .pipe(
          catchError((error) => {
            this.hasHttpError.set(true);
            return this.httpErrorHandlerService.handle(error);
          })
        )
        .subscribe(() => {
          this.notifier.success(successMessage);
          this.router.navigateByUrl(ROUTE_PATH.HOME);
        });
      this.subscriptions.push(subSend);
    } else {
      this.hasInputError.set(true);
      this.errors.set(
        this.utilsService.getErrosFromFormGroup(this.contactForm)
      );
    }
  }
}
