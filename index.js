#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

const CLASS_EXP = /class(\s+)([a-zA-Z_$][0-9a-zA-Z_$]*)(\s*)\{/;
const COMMENT_EXP = /^(\s*)(\/\/|\/\*).*/;
const OPEN_B_EXP = /\{/g;
const CLOSE_B_EXP = /\}/g;
const METHOD_EXP = /(?:\s*)([a-zA-Z_$][0-9a-zA-Z_$]*)(?:\s*)\((?:.*)\)(?:\s*)\{/;

const argv = process.argv;
const file = argv[2];

if (!file) {
    return console.error('enter a filename!');
}

const fd = fs.createReadStream(file);

fd.on('error', err => console.error(err.message));

const rl = readline.createInterface({
    crlfDelay: Infinity,
    input: fd
});

rl.on('error', err => console.error(err.message));

const lines = [];

rl.on('line', line => lines.push(line));

rl.on('close', () => {
    const member = [];
    const members = {
        'static': {},
        methods: {}
    };

    let brackets = -1;
    let i = 0;
    let isStatic = false;
    let lastBrackets = -1;
    let methodName;

    for (; i < lines.length; i += 1) {
        const line = lines[i];

        if (brackets > 0) {
            if (!COMMENT_EXP.test(line)) {
                const openBrackets = (line.match(OPEN_B_EXP) || []).length;
                const closeBrackets = (line.match(CLOSE_B_EXP) || []).length;

                brackets += openBrackets - closeBrackets;

                if (brackets === 2) {
                    const nameMatches = line.match(METHOD_EXP);

                    if (nameMatches) {
                        methodName = nameMatches[1];
                        isStatic = /^(\s*)static/.test(line);
                    }
                }
            }

            if (brackets > 0) {
                member.push(line);
            } else {
                break;
            }

            if (brackets === 1 && lastBrackets === 2) {
                if (member[0] !== '') {
                    member.unshift('');
                }

                if (isStatic) {
                    members['static'][methodName] = [ ...member ];
                } else {
                    members.methods[methodName] = [ ...member ];
                }

                member.length = 0;
            }
        } else if (CLASS_EXP.test(line)) {
            brackets = 1;
            // log the class declaration
            console.log(line);
        } else {
            // log the beginning lines
            console.log(line);
        }

        lastBrackets = brackets;
    }

    if (members.methods.constructor) {
        const lines = members.methods.constructor;

        if (lines[0].length === 0) {
            lines.shift();
        }

        lines.forEach(line => console.log(line));
        delete members.methods.constructor;
    }

    Object.keys(members.methods).sort().forEach(method => {
        members.methods[method].forEach(line => console.log(line));
    });

    Object.keys(members['static']).sort().forEach(method => {
        members['static'][method].forEach(line => console.log(line));
    });

    for (; i < lines.length; i += 1) {
        console.log(lines[i]);
    }
});
