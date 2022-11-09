import { createServer, Model } from 'miragejs';
import mockData from './assets/mock/data.json';

export default function () {
  createServer({
    namespace: '/api',
    models: {
      todo: Model
    },
    seeds(server) {
      mockData.forEach((todo) => {
        server.create('todo', todo);
      });
    },
    routes() {
      this.get('/todo-list', (schema) => {
        return schema.todos.all();
      });
      this.patch('/todo-list', (schema, request) => {
        const body = JSON.parse(request.requestBody);
        return schema.todos.findBy({_id: body.id}).update({completed: body.completed});
      });
      this.passthrough('https://newsapi.org/v2/top-headlines');
    },
  });
}
