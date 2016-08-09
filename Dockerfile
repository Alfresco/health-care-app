FROM node:6

RUN echo "unsafe-perm=true" > ~/.npmrc

# Create src directory
RUN mkdir -p /usr/src/alfresco-ng2-components/
      
# Copy source and install app dependencies
COPY assets /usr/src/alfresco-ng2-components/assets
COPY demo-shell-ng2 /usr/src/alfresco-ng2-components/demo-shell-ng2
COPY scripts /usr/src/alfresco-ng2-components/scripts
COPY ng2-components /usr/src/alfresco-ng2-components/ng2-components

WORKDIR /usr/src/alfresco-ng2-components/demo-shell-ng2/
RUN bash -c "/usr/src/alfresco-ng2-components/scripts/npm-link-demo-shell.sh"
RUN npm install

EXPOSE 3000

CMD [ "npm run serve" ]
