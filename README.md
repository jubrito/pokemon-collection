<div align="center">

![React_Badge](https://img.shields.io/badge/web-react-ff69b4) ![Npm_Badge](https://img.shields.io/badge/npm-6.14.5-red)  ![TypeScript](https://img.shields.io/badge/%3C%2F%3E-typescript-blue)
</div>

<p align="center">
<strong>Pokedex</strong> - A Pokemon Collection where you can find the pieces of information (such as weight, stats and abilities) about your favorites Pokemóns.
</p>

<p align="center">
  <a href="#computer-tecnologies">Tecnologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#hammer-tools">Tools</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#woman_technologist-running-the-application">Running the application</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#octocat-how-to-contribute">How to contribute</a>
</p>

<div align="center">
  <img alt="Pokedex Application" src="./screen.gif">
</div>

## **:computer: TECNOLOGIES**

#### **FRONT-END** ([React](https://pt-br.reactjs.org/) + [TypeScript](https://www.typescriptlang.org/))

  - **[Axios](https://github.com/axios/axios):** HTTP client based on Promises to perform back-end requisitions
  - **[React Router Dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom):** router components for websites
  - **[Node Sass Chokidar](https://github.com/michaelwayman/node-sass-chokidar):** a wrapper around node-sass executable to use chokidar instead of Gaze when watching files.
  - **[Sass](https://sass-lang.com/):** 'Syntactically awesome style sheets' is an extension of CSS that enables you to use things like variables, nested rules, inline imports and more. It also helps to keep things organised and allows you to create style sheets faster (CSS with superpowers)
  - **[React Image Fallback](https://github.com/socialtables/react-image-fallback):** acomponent that allows one or more images to be used as fallback images in the event that the browser couldn't load the previous image
  - **[Jest](https://github.com/facebook/jest):** JavaScript testing framework designed to ensure correctness of any JavaScript codebase.
  - **[React Icons](https://react-icons.github.io/react-icons/):** famous icon fonts
  
  <kbd>[package.json](./package.json)</kbd>


## **:hammer: TOOLS**

- API: **[PokéAPI](https://pokeapi.co/)**
- Fontes: **[Roboto](https://fonts.google.com/specimen/Roboto)**, **[Ubuntu](https://fonts.google.com/specimen/Ubuntu)**
- Editor: **[Visual Studio Code](https://code.visualstudio.com/)**


## **:woman_technologist: RUNNING THE APPLICATION** 

Requirements: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), Editor ([VSCode](https://code.visualstudio.com/))

```sh
# Clone this repository
$ git clone https://github.com/jubrito/Pokemon.git

# Install the website dependencies
$ npm install

# Run the application in development mode
$ npm run start

```
Access [http://localhost:3000](http://localhost:3000) - (the application will open on the port :3000) 

## **:octocat: HOW TO CONTRIBUTE**

  - *[Fork](https://help.github.com/pt/github/getting-started-with-github/fork-a-repo)* the repository;
  - Access your Gihub page and clone locallu your fork;
  - Create a *branch* with the name of your feature: `git chechout -b feature/myFeature`;
  - Save your changes;
  <!-- - Instale as dependências do *commitlint* na raíz do projeto para a verificação dos commits: `npm install` ou `yarn`; -->
  - *Commit* your changes according to the [commit conventions](https://www.conventionalcommits.org/pt-br/v1.0.0-beta.4/), 
  - *Push* your changes with the name of the *branch* you created earlier: `git push origin feature/myFeature`;
  - Submit a *pull request* in the repository where the *fork* was created. After the *merge* your changes will be part of the project;
  - After the *merge* and pull request, your *branch* can be deleted.
