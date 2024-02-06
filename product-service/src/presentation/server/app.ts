import express from 'express';
import routes from '../routes/routes';
class App {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.use('/products', routes);
  }

}

export default new App().express;
