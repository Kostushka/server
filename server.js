// let counter = 0;

// setInterval(() => {
//     counter++;
//     console.log('Hello', counter);
// }, 1000);

// используем пакет http
const http = require('http');

let reqCounter = 0;
// создали сервер
const server = http.createServer((req, res) => {
    reqCounter++;
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {
            'Content-Type': 'image/x-icon',
        });
        res.end();
        return;
    }
    // анализ url запроса
    switch (req.url) {
        case '/':
            // запись в ответ
            res.write('Main ');
            break;
        case '/people':
            res.write('John, Dev, Sasha ');
            break;
        default:
            res.write('404, page not found ');
    }

    res.write('' + reqCounter);
    // обязательно!
    res.end();
});
// сервер слушает порт
server.listen(3003);
