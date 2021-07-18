## Documentation for creating docker image for this project

- Make sure Dockerfile exists in this folder
- create .dockerignore with content below:
     node_modules
     npm-debug.log
     build
    .dockerignore
    **/.git
    **/.DS_Store
    **/node_modules
- docker build -t [image-name]:[tag]