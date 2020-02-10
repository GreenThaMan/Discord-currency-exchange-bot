const Discord = require('discord.js');
const fetch = require('node-fetch');
const bot = new Discord.Client();

// You can get your bot token from https://discordapp.com/developers/applications/

const token = '[Your bot token here]';

bot.on('ready', () =>{
    console.log('bots online bros');
})

bot.on('message', message=>{
    if (message.content.slice(0,1) == '!'){
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
        const from_currencyEl = args[1];
        const from_ammountEl = args[2];
        const to_currencyEl = args[3];
        var to_ammountEl;

        switch (cmd) {
            case 'convert':
                if (typeof from_currencyEl == 'string' && !isNaN(from_ammountEl) && typeof to_currencyEl == 'string') {
                calculate();
                } else {
                    message.channel.send("Format must be !convert [from_currency] [amount] [to_currency]");
                }
                break;

            case 'list':
                message.channel.send("Here is the list of support currencies: literally every currency lmaoo (bitcoin n shit included)");
                break;

            default: 
                break;                
        }
        
        function calculate() {
            fetch('https://free.currconv.com/api/v7/convert?q=' + from_currencyEl + '_' + to_currencyEl + '&compact=ultra&apiKey=6635fc3a4ad72b214f5e')
            .then(res => res.json())
            .then(res => {
                var rate = JSON.stringify(res).substring(11,JSON.stringify(res).length-1);
                to_ammountEl = (from_ammountEl * rate).toFixed(2);
                message.channel.send(from_ammountEl + " " + from_currencyEl + " is " + to_ammountEl + " " + to_currencyEl + " | At a rate of " + '1 ' + from_currencyEl + ' = ' + rate + ' ' + to_currencyEl);
            });
        }
    }    
})

bot.login(token);