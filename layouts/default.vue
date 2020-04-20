<template>
    <nuxt />
</template>
<script>
export default {}
</script>
<style>
* {
    margin: 0;
    padding: 0;
}
html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}
html,
body {
    background-image: linear-gradient(
        to right,
        rgb(59, 88, 16),
        rgb(109, 109, 0)
    );
    height: 100vh;
}
*,
*:before,
*:after {
    box-sizing: border-box;
}

::-moz-focus-inner {
    border: 0;
}

::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px transparent;
    background-color: purple;
}

::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px yellow;
}

[data-title]:hover:after {
    opacity: 1;
    transition: all 0.1s ease 0.5s;
    display: block;
}
[data-title]:after {
    content: attr(data-title);
    background-color: #00ff00;
    color: #111;
    font-size: 150%;
    position: absolute;
    padding: 1px 5px 2px 5px;
    bottom: -1.6em;
    left: 70%;
    height: 35px;
    top: 0;
    white-space: nowrap;
    box-shadow: 1px 1px 3px #222222;
    opacity: 0;
    border: 1px solid #111111;
    z-index: 99999;
    display: none;
}
[data-title] {
    position: relative;
}
p {
    margin: 0;
}
.-white {
    color: white !important;
}
.-border-0 {
    border: 0 !important;
}
</style>
