import { BehaviorSubject, Observable } from 'rxjs';

export class Store<T> {
  state$: Observable<T>;

  private dispatcher: BehaviorSubject<T>;

  constructor(initialState: T) {
    this.dispatcher = new BehaviorSubject(initialState);

    this.state$ = this.dispatcher.asObservable();
  }

  get state(): T {
    return this.dispatcher.getValue();
  }

  protected setState(nextState: Partial<T>): void {
    const newState = { ...this.state, ...nextState };

    this.dispatcher.next(newState);
  }
}
