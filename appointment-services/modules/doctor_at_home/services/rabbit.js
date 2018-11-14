
var amqp    = require('amqp');

var rabbitmqConnection;

function getRabbitMqConnection(callback) {
    var rabbitmqURL = "amqp://rabbitmq:rabbitmq@rabbit:5672/vhost";

    if (rabbitmqConnection) {
        callback(rabbitmqConnection);
    } else {
        var conn = amqp.createConnection({url: rabbitmqURL});
        conn.on('ready', function() {
            rabbitmqConnection = conn;
            callback(rabbitmqConnection);
        });
        conn.on('closed', function() {
            rabbitmqConnection = null;
        });
    }
}

module.exports = {

    subscribeMessage: function(exchangeName, routingKey, callback) {
        getRabbitMqConnection(function(connection) {

            var exchange = {
                name: exchangeName,
                opts: { durable: true, type: 'direct', autoDelete: false}
            };

            var queue = {
                name: '',
                opts: {exclusive: true, durable: true, autoDelete: false}
            };

            var ex = connection.exchange(exchange.name, exchange.opts, function(ex) {
                var q = connection.queue(queue.name, queue.opts, function(q) {
                    q.bind(exchange.name, routingKey);
                    q.on('queueBindOk', function() {
                        q.subscribe(callback);
                    });
                });
            });
        });
    },

    publishMessage(exchangeName, message, routingKey) {
        getRabbitMqConnection(function(connection) {
            var exchange = {
                name: exchangeName,
                opts: { durable: true, type: 'direct', autoDelete: false}
            };

            var ex = connection.exchange(exchange.name, exchange.opts, function(ex) {
                ex.publish(routingKey, message, {deliveryMode: 1});       
                console.log('Published message: ' + message);
            });
        });
    },
};