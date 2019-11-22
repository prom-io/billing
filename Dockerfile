FROM golang:latest

RUN apt-get update \
     && apt-get install -y wget \
     && rm -rf /var/lib/apt/lists/* 

WORKDIR "/opt"

ADD ./go-ethereum ./go-ethereum
RUN make -C ./go-ethereum geth

ADD ./genesis.json ./genesis.json
RUN ./go-ethereum/build/bin/geth init genesis.json

ARG password
ARG privatekey
RUN echo $password > ~/.accountpassword
RUN echo $privatekey > ~/.privatekey
RUN ./go-ethereum/build/bin/geth account import --password ~/.accountpassword  ~/.privatekey

CMD exec ./go-ethereum/build/bin/geth --syncmode "full" --nodiscover --cache 1024 --networkid 817718719871 --port 30307 --nousb --rpc --rpcaddr "0.0.0.0" --rpccorsdomain "*" --mine --etherbase $address --unlock $address --password ~/.accountpassword --rpcapi "web3,admin,db,debug,eth,miner,net,personal,shh,txpool" --rpcport 7545 --allow-insecure-unlock

EXPOSE 7545
EXPOSE 30307