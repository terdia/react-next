const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next( { dev });

const handle = app.getRequestHandler();

app.prepare()
.then(() => {
        const server = express();
        
        server.get('/p/:id', (request, response) => {
            const actualPage = '/post';
            const queryParams = { id: request.params.id };
            app.render(request, response, actualPage, queryParams);
        });

        server.get('*', (request, response) => {
            return handle(request, response);
        });

        server.listen(3000, (error) => {
            if(error) throw error;
            console.log('Running on localhost:3000')
        });
})
.catch(ex => {
    console.error(ex.stack)
    process.exit(1)
})