import app from './presentation/server/app';
import 'dotenv/config';
import './infra/rabbitMQ/consumer';

app.listen(process.env.PORT || 3333, () => {
  console.log('Server is running');
});