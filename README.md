# sort-class
it's really annoying to sort methods alphabetically in vim, so i made this tool.
it might not work with your coding style, but it doesn't mangle the original
file.

## installation

    # npm install -g sort-class

## example
*test.js*

```javascript
class Test {
    methodB() {
        console.log('this is method b');
    }

    constructor() {
        this.timestamp = Date.now();
    }

    methodA() {
        console.log('this is method a');
    }
}
```

    $ ./sort-class test.js

```javascript
class Test {
    constructor() {
        this.timestamp = Date.now();
    }

    methodA() {
        console.log('this is method a');
    }

    methodB() {
        console.log('this is method b');
    }
}
```

## bugs
don't put bracket characters (`{`, `}`) within block comments.

## license
Copyright (C) 2018 Mister Hat

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
