## Prerequisites

The project requires NodeJS v.4+

To install NodeJS visit [nodejs download page](https://nodejs.org/en/download/) download the appropiate package for your operatin system, click on the downloaded file, open it and follow the installation procees. If you don't know much about it, just click ALL the NEXT and or INSTALL buttons and choose "I agree" when prompted and you should be fine.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

```bash
$ npm i
```

or

```bash
$ npm install
```

Note: if you run into an pngquant-bin error on Windows try running:

```
npm install imagemin-pngquant@5.0.1 -D
npm install pngquant-bin@3.1.1 -D
```

before you run `npm start`

## Usage

To run the project in development mode and open a local server that synchronizes across multiple devices use:

```bash
npm start
```

or

```bash
npm run dev
```

To build the project for production use:

```bash
npm run prod
```


## Auto reset git

If you run `npm i`, the git history will get reset.

To avoid resetting the git history run `npm i --ignore-scripts`


## Orginially came from a Pug starter
Orginal Starter kit here: https://github.com/marianzburlea/pug-starter