password='word';
bootnode='';

if [[ "$password" == "" ]]; then
    echoerr "Error: you need to provide a password to continue.";
else
	echo $password > ~/.accountpassword;
	./go-ethereum/build/bin/geth account new --password ~/.accountpassword
	exec ./go-ethereum/build/bin/geth --bootnodes "$bootnode" --datadir ./storage --syncmode "full" --cache 1024 --networkid 817718719871 --port 30307 --nousb --rpc --rpcaddr "0.0.0.0" --rpccorsdomain "*" --ws --wsaddr "0.0.0.0" --mine --keystore /root/.ethereum/keystore/ --rpcapi "web3,admin,db,debug,eth,miner,net,personal,shh,txpool" --rpcport 7545 --allow-insecure-unlock