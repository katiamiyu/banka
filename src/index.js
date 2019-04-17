import express from 'express';
import bodyParser from 'body-parser';
import 'babel-polyfill';
import authRouter from './dataFile/routes/authRouter';

const app = express();
const PORT = process.env.PORT || 13384;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const middleware = {
  logger: (req, res, next) => {
    console.log(`Request: ${req.url}  Time: ${new Date().toString()}  Method: ${req.method}`);
    next();
  },
};

app.use(middleware.logger);
app.use('/api/v1/auth', authRouter);
app.use('*', (req, res) => {
  res.status(404).send({
    status: 'bad request',
  });
});

app.listen(PORT, () => {
  console.log(`app listening at PORT: ${PORT}`);
});

// export app object for testing
export default app;
