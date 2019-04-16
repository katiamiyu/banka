import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const middleware = {
  logger: (req, res, next) => {
    console.log(`Request: ${req.url}  Time: ${new Date().toString()}  Method: ${req.method}`);
    next();
  },
};

app.use(middleware.logger);

app.listen('3000', () => { console.log('app listening at port 3000'); });

// export app object for testing
export default app;
