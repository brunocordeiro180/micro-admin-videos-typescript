FROM node:14.15.4-slim

# USER NODE 

WORKDIR /home/node/app

RUN mkdir -p /usr/share/man/man1 &&  \
  echo 'deb http://ftp.debian.org/debian stretch-backports main' | tee /etc/apt/sources.list.d/stretch-backports.list && \
  apt-get -y update &&  \
  apt-get -y install \
  git \
  default-jre \
  openjdk-11-jre \
  zsh \
  curl \
  wget \
  fonts-powerline \
  procps

ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

CMD [ "sh", "-c", "npm install && tail -f /dev/null"]