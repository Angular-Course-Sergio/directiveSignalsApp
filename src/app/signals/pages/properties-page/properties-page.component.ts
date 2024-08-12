import { Component, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css',
})
export class PropertiesPageComponent {
  public user = signal<User>({
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg',
  });

  public counter = signal(10);

  public fullName = computed<string>(
    () => `${this.user().first_name} ${this.user().last_name}`
  );

  public userChangeEffect = effect(() => {
    console.log(`${this.user().first_name} - ${this.counter()}`);
  });

  onFieldUpdated(field: keyof User, value: string) {
    this.user.update((current) => {
      const updateUser = { ...current };

      switch (field) {
        case 'email':
          updateUser.email = value;
          break;
        case 'first_name':
          updateUser.first_name = value;
          break;
        case 'last_name':
          updateUser.last_name = value;
          break;
        case 'avatar':
          updateUser.avatar = value;
          break;
      }

      return updateUser;
    });
  }

  increaseBy(value: number) {
    this.counter.update((current) => current + value);
  }
}
