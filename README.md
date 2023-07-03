                              ____  ____  __    _   __
                             / __ \/ __ \/ /   / | / /
                            / /_/ / / / / /   /  |/ / 
                           / ____/ /_/ / /___/ /|  /  
                          /_/    \____/_____/_/ |_/   
                                                           
[![CI Angular app through Github Actions](https://github.com/fairhive-labs/poln-app/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/fairhive-labs/poln-app/actions/workflows/main.yml)

[![pages-build-deployment](https://github.com/fairhive-labs/poln-app/actions/workflows/pages/pages-build-deployment/badge.svg?branch=gh-pages)](https://github.com/fairhive-labs/poln-app/actions/workflows/pages/pages-build-deployment)

## 🐳 Docker

### 🚀 Local Run the poln-app

```
docker run -p 3000:80 -d --rm --name poln-app fairhivelabs/poln-app
```

You can now reach the poln-app using the URL http://localhost:3000

### 👋 Stop and Clean

```
docker stop poln-app
```
