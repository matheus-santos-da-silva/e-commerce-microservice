import app from './presentation/server/app';
import 'dotenv/config';
import './infra/rabbitMQ/consumers';

app.listen(process.env.PORT || 3333, () => {
  console.log('Server is running');
});