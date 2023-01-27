import { MikroORM } from '@mikro-orm/core';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  private shudownListener$: Subject<void> = new Subject();

  onModuleInit() {
    this.orm.isConnected().then((connected) => {
      if (!connected) {
        this.shuwtDown();
      }
      this.orm.getMigrator().up();
    });
  }

  subscribeToShutdown(shutdownFn: () => void): void {
    this.shudownListener$.subscribe(() => shutdownFn);
  }

  shuwtDown() {
    this.shudownListener$.next();
  }
}
