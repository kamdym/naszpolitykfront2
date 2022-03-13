import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  model: any = {};

  constructor(private titleService:Title,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {this.titleService.setTitle("Nasz Polityk - Logowanie i Rejestracja");
  }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  register() {
    if (!this.model.email || !this.model.firstName || !this.model.password || !this.model.confirmPassword) {
      window.alert('Należy wypełnic wszystkie pola!')
      return
    }

    if (this.model.password != this.model.confirmPassword) {
      window.alert('Hasła muszą być takie same!')
      return
    } else {
      let url = 'http://naszpolityk.projektstudencki.pl/api/registration/';
      this.http.post<Observable<boolean>>(url, {
        email: this.model.email,
        password: this.model.password,
        firstName: this.model.firstName,
      }).subscribe(isValid => {
          window.alert('Wysłano mail z linkiem potwierdzającym, sprawdź skrzynkę.')
          this.router.navigate(['login']);
        },
        error => {
          if (error.status === 409) {
            window.alert('Użytkownik już istnieje!')
            return
          }
          window.alert('Błąd po stronie serwera')
        });
    }
  }
}
