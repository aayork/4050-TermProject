# Introduction
This project is a Movie Cinema Booking app for 4050 Software Engineering

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process
  ## Node JS
    Install Node.js
    macOS
    # installs nvm (Node Version Manager)
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

    # download and install Node.js (you may need to restart the terminal)
    nvm install 20

    # verifies the right Node.js version is in the environment
    node -v # should print `v20.17.0`

    # verifies the right npm version is in the environment
    npm -v # should print `10.8.2`

    Windows
    # installs fnm (Fast Node Manager)
    winget install Schniz.fnm

    # configure fnm environment
    fnm env --use-on-cd | Out-String | Invoke-Expression

    # download and install Node.js
    fnm use --install-if-missing 20

    # verifies the right Node.js version is in the environment
    node -v # should print `v20.17.0`

    # verifies the right npm version is in the environment
    npm -v # should print `10.8.2`
  ## React JS
    Utilize Vite.js to install ReactJS
      npm create vite@latest my-app --template react
      cd my-app
      npm install
      npm run dev
  ## Django Framework
    1. Install Django
      pip install Django
2.	Software dependencies
3.	Latest releases
4.	API references

# Build and Test
TODO: Describe and show how to build your code and run the tests.

# Contributor
Team Lead/Frontend: Aidan York
Backend: Preston Brown
Database Engineer: Yushus Komarlu
Frontend: Will Gresham
