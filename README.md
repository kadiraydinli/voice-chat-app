# Voice Chat App

This project is an application using React, NestJS, OpenVidu that allows users to have real-time voice chat with each other.

## Usage

Before using the app, you need to clone the repository to your local machine.

1. Open your terminal and navigate to the directory where you want to clone the repository.
2. Use the following command to clone the repository:

```
git clone https://github.com/kadiraydinli/voice-chat-app.git
```

3. Next, go to the project directory.

```
cd voice-chat-app
```

3. Make sure Docker is installed on your local machine.
4. Run `yarn setup` command to install the node_modules packages for both client and server folders.
5. Use the `yarn up` command to start the application. It may take some time for OpenVidu to run. You can follow the logs of `openvidu` in Docker or at `http://localhost:4443` to check if it is up.
6. Open http://localhost in your browser and start using the app.

## Scripts

- Installs node_modules packages for both client and server folders.

```
yarn setup
```

- Starts the application with Docker.

```
yarn up
```

- Stops the application with Docker.

```
yarn down
```

- Restarts the application.

```
yarn restart
```

## Note

To use the application on a different device in the same network, you must follow the steps below;

1. You need to write the local IP address of the computer where the server is running in the `VITE_SERVER_URL` variable in the `.env` file in the `client` folder.

Example:

```
VITE_SERVER_URL=http://192.168.1.15
```

2. In the `OPENVIDU_IP` variable in the `.env` file in the main directory, you need to write the local IP address of the computer where the server is running.

Example:

```
OPENVIDU_IP=192.168.1.15
```

3. Open the Chrome browser on the other computer.

- Type `chrome://flags/#unsafely-treat-insecure-origin-as-secure` in your browser's address bar and press Enter.
- Set `Unsafe origins treated as secure` to `Enabled.
- Click the `Relaunch` button to save the settings.
- Type `http://{server running pc ip address}` in your browser's address bar and press Enter. You are now ready to use the application.
