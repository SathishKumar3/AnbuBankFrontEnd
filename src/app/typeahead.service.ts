import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class TypeaheadService{

  private names : string[] = ['Arumugam','Govindarajan','Murugan','Ganeshan','Selvi','Senthil'];

  private places : string[] = ['Saliyamangalam','Thirupuvanam','Poondi','Sooliyakkottai','Kalanjeri','Edavakkudi,'];


  typeaheadName(): any{
    return (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => term.length < 2 ? []
          : this.names.filter(v => v.toLowerCase().startsWith(term.toLowerCase())))
      )
  }

  typeaheadPlace(): any{
    return (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => term.length < 2 ? []
          : this.places.filter(v => v.toLowerCase().startsWith(term.toLowerCase())))
      )
  }

}
