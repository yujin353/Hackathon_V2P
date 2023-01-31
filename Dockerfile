#FROM node:latest AS base
#
#WORKDIR /app
#
## ---------- Builder ----------
## Creates:
## - node_modules: production dependencies (no dev dependencies)
## - dist: A production build compiled with Babel
#FROM base AS builder
#
#COPY package*.json ./
#
#RUN npm install --
#
#COPY ./ ./
#
#RUN npm run build
#
#RUN npm prune --production # Remove dev dependencies
#
##nginx base image
#FROM nginx:stable-alpine AS release
#
#WORKDIR /etc/nginx/conf.d/
#
#COPY nginx-web.conf default.conf
#
#WORKDIR /usr/share/nginx/html
#
#COPY --from=builder /app/build /usr/share/nginx/html
#
#EXPOSE 80
#
#RUN nginx -t
#
#CMD ["nginx","-g","daemon off;"]
###################################################
#FROM node:latest as builder
#
## 작업 폴더를 만들고 npm 설치
#RUN mkdir /usr/src/app
#WORKDIR /usr/src/app
#ENV PATH /usr/src/app/node_modules/.bin:$PATH
#COPY package.json /usr/src/app/package.json
#RUN npm install --silent
#RUN npm install react-scripts@2.1.3 -g --silent
#
## 소스를 작업폴더로 복사하고 빌드
#COPY . /usr/src/app
#RUN npm run build
#
#
#
#FROM nginx:stable-alpine
## nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
#RUN rm -rf /etc/nginx/conf.d
#COPY conf /etc/nginx
#
## 위에서 생성한 앱의 빌드산출물을 nginx의 샘플 앱이 사용하던 폴더로 이동
#COPY --from=builder /usr/src/app/build /usr/share/nginx/html
#
## 80포트 오픈하고 nginx 실행
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
FROM node:latest as builder

# 작업 폴더를 만들고 npm 설치
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install -g npm@9.4.0
RUN npm install --silent
RUN npm install react-scripts@2.1.3 -g --silent

# 소스를 작업폴더로 복사하고 빌드
COPY . /usr/src/app
RUN npm run build



FROM nginx:stable-alpine
# nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# 위에서 생성한 앱의 빌드산출물을 nginx의 샘플 앱이 사용하던 폴더로 이동
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# 80포트 오픈하고 nginx 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]