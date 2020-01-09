## Angular - Observable

What is an observable?

`An observable` is 'declerative' and can be any `user input`, `HTTP Requests`, or many other data.

We can subscribe to an observable and whenever the observable changes our subscription will now about it and execute the code that we want when the observable changes.

We can create our own observables, let's look at an example:

```typescript
  import { Component, OnInit } from '@angular/core';
  
  // This import is going to provide us an observable.
  // Observables are imported from 'rxjs'
  import { interval } from 'rxjs';

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
  export class HomeComponent implements OnInit {

    constructor() {}

    ngOnInit() {
      // We know that 'interval' is going to provide us an observable.
      // Every 1000ms this 'interval' is going to emit a value.
      // We are subscribing to this 'interval' to be informed about the changes.
      // Getting the value as 'count' in our example,
      // we are logging it to the console.
      interval(period: 1000).subscribe(next: count => {
        console.log(count);
      });
    }
  }
```

 If we look at the console we are going to see this;

```console
  0
  1
  2
  3
  4
  5
  6
  ... and so on
```

Although there are observables that they stop emitting values after a certain thing, you need to unsubscribe to the observable so it doesn't emit the value anymore. Observables don't stop emitting data just because you're not interested in them anymore.

As I mentioned above that we can stop or need to stop subscription because it might cause problems, more memory usage, and eventually slow down our application.

To stop the subscription, we can assign our subscription to a property type `Subscription`.

Now, let's see this in action;

```typescript
  // First we need to import 'subscription' from 'rxjs'
  import { Subscription } from 'rxjs';
  import { OnDestroy } from '@angular/core';

  // In our 'export class' add a private property
  private intervalSubscription: Subscription;

  // And we need to assign our subscription to this variable
  ngOnInit() {
    this.intervalSubscription = interval(1000).subscribe(
      count => {
        console.log(count);
      }
    )
  }

  // Now we need to add 'ngOnDestroy' to our 'export class'
  // Also we need to import 'OnDestroy' from '@angular/core'
  // Now let's unsubscribe from this observable when the component is destroyed.
  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
  }
```

Now let's create our on 'Interval' observable to see how this is actually working.

```typescript
  import { Component, OnInit, OnDestroy } from '@angular/core';
  
  // We need to import Observable from 'rxjs'
  import { interval, Observable, Subscription } from 'rxjs';

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
  export class HomeComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    constructor() {}

    ngOnInit() {
      // Now here we're gonna create our own observable.
      const customIntervalObservable = Observable.create(observer => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          count++;
        }, 1000);
      });

      // Now we have our observable that will emit count every 1000ms
      // We need to subscribe to it
      // The data will be basically the count that will come from our observable.
      this.subscription = customIntervalObservable.subscribe(data => {
        console.log(data);
      });
    }

    ngOnDestroy() {
      this.subcription.unsubcribe();
    }
  }
```

For custom 'observables' there are only other things that you can use.

`observer.complete();` - stops the current subscription.  
`observer.error(new Error('Count is greater than 3!'));` - logs it to subscription's error, so can e displayed or stored.
