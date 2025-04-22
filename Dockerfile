FROM node:20

USER node
WORKDIR /home/node

# Install Volta for the node user
RUN curl https://get.volta.sh | bash
ENV VOLTA_HOME="/home/node/.volta"
ENV PATH="$VOLTA_HOME/bin:$PATH"

# Create project directory
WORKDIR /workspaces/making-typescript-stick

# Copy package.json to read Volta configuration
# (This assumes your package.json is in the build context)
COPY --chown=node:node package.json ./

# Install Node and Yarn based on project's package.json configuration
RUN volta install node yarn

# The rest of your project files will be mounted when the container runs

# Make sure we're in the right working directory
WORKDIR /workspaces/making-typescript-stick