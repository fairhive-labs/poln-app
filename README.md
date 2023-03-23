                         ____      _      __    _          
                        / __/___ _(_)____/ /_  (_)   _____ 
                       / /_/ __ `/ / ___/ __ \/ / | / / _ \
                      / __/ /_/ / / /  / / / / /| |/ /  __/
                     /_/  \__,_/_/_/  /_/ /_/_/ |___/\___/ 
                                                           
[![CI Angular app through Github Actions](https://github.com/fairhive-labs/landing-page/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/fairhive-labs/landing-page/actions/workflows/main.yml)

[![pages-build-deployment](https://github.com/fairhive-labs/landing-page/actions/workflows/pages/pages-build-deployment/badge.svg?branch=gh-pages)](https://github.com/fairhive-labs/landing-page/actions/workflows/pages/pages-build-deployment)

## 🐳 Docker

### 🚀 Local Run the landing-page

```
docker run -p 3000:80 -d --rm --name landing-page fairhivelabs/landing-page
```

You can now reach the landing-page using the URL http://localhost:3000

### 👋 Stop and Clean

```
docker stop landing-page
```
