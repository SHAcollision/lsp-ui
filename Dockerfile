# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json to the working directory
COPY package.json ./

# Install the app dependencies
RUN npm install yarn
RUN yarn install
RUN mv node_modules /tmp/node_modules

# Copy the rest of the application code to the working directory
COPY . .

# Entrypoint will drop all deps into the host machine's /node_modules 
# at start up. This way IDE's tooling play well with all dependencies.
ENTRYPOINT [ "/usr/src/app/entrypoint.sh" ]

# The command to run the dev server
CMD [ "yarn", "start" ]