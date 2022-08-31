<a name="readme-top"></a>

[![Sidekick][sidekick-shield]][sidekick-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/runsidekick/sidekick">
    <img src="https://4750167.fs1.hubspotusercontent-na1.net/hubfs/4750167/Sidekick%20OS%20repo/logo-1.png" alt="Logo" width="40%" height="40%">
  </a>
  </div>
<div align="center">



  <h3 align="center">Sidekick Example: Embed Sidekick features to your applications </h3>

  <p align="center">
    Example to show how you can control your agents from a React application
    <br />
    <a href="https://github.com/runsidekick/sidekick"><strong>Explore Sidekick »</strong></a>
    <br />
  </p>
</div>


<div align="center">
<a href="https://www.producthunt.com/posts/sidekick-12?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-sidekick&#0045;12" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=357053&theme=light&period=daily" alt="Sidekick - Like&#0032;Chrome&#0032;DevTools&#0032;for&#0032;your&#0032;backend&#0044;&#0032;now&#0032;open&#0032;source | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
</div>


## About the project

This project aims to show how you can develop a custom application to control your Sidekick agents using Sidekick Node.js Client.

#### Built With

React
[Express](https://expressjs.com/)
Socket.io
Electron
[Sidekick Node.js Client](https://www.npmjs.com/package/@runsidekick/sidekick-client)



#### Getting Started

This tutorial consists of 2 parts. First part is a standard web application that we will live debug and the second one is our custom Sidekick control app.


##### Prerequisites

 * Sidekick

        Make sure Sidekick broker is running. (check main Sidekick repo)
        If you have changed the default settings, update token and port values in this tutorial accordingly.

Check out our  [Quick Start Guide](https://medium.com/p/efc0845a2288).



##### Part-1 | Employee System (Main App)


```bash
# Clone Employee System repository
git clone https://github.com/boroskoyo/sidekick-example-employee-management-system
# Go into the repository
cd sidekick-example-employee-management-system
# Install dependencies
npm i --legacy-peer-deps
# Run the app
npm run start
```

UI will start running at http://localhost:3000 and backend will be using the port 8081

- `server/index.js` - This is where we include our Sidekick agent. You can edit the agent settings according to your setup and needs.


##### Part-2 | Control Application

This is the application we have built to control our Sidekick agent.

```bash
# Clone this repository
git clone https://github.com/boroskoyo/sidekick-electron-quick-start
# Go into the repository
cd sidekick-electron-quick-start
# Install dependencies
npm i --legacy-peer-deps
# Run the app
npm run dev-app
```

```bash
# You can also run the browser version - http://localhost:5173/
npm run dev
```


- `server.js` - Contains the main functions for putting Tracepoint.
- `params` - This is where we prepare our params for Sidekick API requests for putting tracepoints.
- `filename` - Filname paramters consists of git address of the file and the commit hash.

## Usage
After running all applications. Go to http://localhost:3000 and check out the employee app. Then use the put tracepoint buttons on the Electron app to put tracepoints on the running application.

1- Visit the home page and capture stack related to employee list endpoint.
2- Delete an employee to collect related data.
3- Check out Electron app to see your collected events.

You can than further edit those apps to explore Sidekick Client's features.



## More resources:

- [runsidekick/sidekick](https://github.com/runsidekick/sidekick) - Main Sidekick Repo
- [Sidekick Docs](https://docs.runsidekick.com/)
- [Getting Started Tutorial](https://medium.com/runsidekick/sidekick-open-source-live-debugger-get-started-in-5-mins-efc0845a2288) - Sidekick Open Source Live Debugger : Get started in 5 mins

## License

[CC0 1.0 (Public Domain)](LICENSE.md)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[sidekick-shield]: https://img.shields.io/badge/USE-SIDEKICK-purple?style=for-the-badge
[sidekick-url]: https://github.com/RunSidekick/sidekick
