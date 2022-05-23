// let counter = 0;

// setInterval(() => {
//     counter++;
//     console.log('Hello', counter);
// }, 1000);

// используем пакет http
const http = require('http');
const fs = require('fs');

// промисы
const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            } else if (data) {
                resolve(data);
            }
        });
    });
};
const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('delay');
            resolve();
        }, ms);
    });
};

let reqCounter = 0;
// создали сервер
const server = http.createServer(async (req, res) => {
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
            // задержка без асинхронности
            // const data = new Date();
            // while (new Date() - data < 5000) {
            //     console.log(new Date() - data);
            // }
            // запись в ответ
            // res.write('Main ');
            try {
                const file = await readFile('index.html');
                res.write(file);
            } catch (error) {
                res.write('error');
            }
            res.end();
            break;
        case '/people':
            await delay(3000);
            res.write('John, Dev, Sasha ');
            res.end();
            break;
        default:
            res.write('404, page not found ');
            res.end();
    }
    // задержка с асинхронностью
    // setTimeout(() => {
    // res.write('' + reqCounter);
    // обязательно!
    // res.end();
    // }, 5000)
});
// сервер слушает порт
server.listen(3003);
