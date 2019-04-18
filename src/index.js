import express from 'express';
import bodyParser from 'body-parser';
import 'babel-polyfill';
import authRouter from './server/routes/authRoute';
import accountRouter from './server/routes/accountRoute';

const app = express();
const PORT = process.env.PORT || 13384;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const middleware = {
  logger: (req, res, next) => {
    console.log(`Request: ${req.url}  Time: ${new Date().toString()}  Method: ${req.method}`);
    next();
  },
  verifyToken: (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split('');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.json({
        status: 401,
        error: 'forbidden',
      });
    }
  },
};

app.use(middleware.logger);
app.use('/api/v1', authRouter);
app.use('/api/v1', accountRouter);
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
