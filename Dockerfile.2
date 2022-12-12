FROM node:16-slim
FROM ubuntu


WORKDIR /code

ADD package.json package-lock.json /code/


RUN apt-get update && apt-get install -y apt-utils

RUN apt-get update -qq && apt-get install -y -qq curl

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get update -qq && apt-get install -y -qq nodejs

RUN npm config set registry https://registry.npm.taobao.org \
    && npm config set disturl https://npm.taobao.org/dist \
    && npm config set puppeteer_download_host https://npm.taobao.org/mirrors



# Suppress an apt-key warning about standard out not being a terminal. Use in this script is safe.
ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=DontWarn
# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
#去除了wget的安装，将wget的安装和chrome的安装都打包成了docker镜像。
#在没有科学上网的设备上，可能因为网络问题无法下载linux_signing_key.pub文件而进度卡住（如服务器搭建不方便搭梯子）

RUN apt-get update \
  && apt-get install -y wget gnupg \
  && wget -q -O - https://gitlab.com/yyc5/test/-/raw/a7ed9e5920614037a6c35a1076c2197dae8f5b0f/linux_signing_key.pub?inline=false | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

ADD . /code
RUN npm i 
RUN npm install -g npm@9.2.0



#此dockerfile文件引导完，需要进一步操作，请看readme文件。引导过程有部分爆红不影响，进度一直向下等待build 好即可。
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteery
