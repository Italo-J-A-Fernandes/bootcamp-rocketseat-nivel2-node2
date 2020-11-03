import { request, response, Router } from 'express';
import { v4 as uuid } from 'uuid';

const appointmentsRouter = Router();

const appointments = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const appointment = {
    provider,
    date,
  };

  return response.json({ message: 'Hello World' });
});

export default appointmentsRouter;
