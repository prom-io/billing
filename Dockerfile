FROM golang:latest

RUN apt-get update \
     && apt-get install -y wget \
     && rm -rf /var/lib/apt/lists/* 

WORKDIR "/opt"

ADD ./ethereum_fork ./go-ethereum
RUN make -C ./go-ethereum geth

ADD ./genesis.json ./genesis.json

EXPOSE 7545
EXPOSE 8546
EXPOSE 30307
