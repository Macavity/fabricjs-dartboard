# Fabric.js Dartboard

A clickable Dartboard build in the canvas.

## Usage

``` html
    <canvas id="dartboard-canvas" ></canvas>
    <script>
        $(document).ready(function(){
          new Dartboard("#dartboard-canvas");
        });
    </script>
```

## Local Development

Install [node.js](https://nodejs.org) or [Yarn](https://yarnpkg.com/) and execute `npm install` or `yarn install` in your project directory by personal preference.

### Development server

start the webpack-dev-server

``` text
npm run start
```

Then open this url in your browser: http://localhost:8080/

The webpack-dev-server automatically recompiles and refreshes the page when files are changed.
Also check the [webpack-dev-server documentation](http://webpack.github.io/docs/webpack-dev-server.html).

### Manual build

```
npm run build
```

### Manual Release Build

```
npm run release
```