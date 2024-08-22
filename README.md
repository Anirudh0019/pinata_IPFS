# Sample Hardhat Project

gonna put some steps:
i think u do need a pinata api in my-ipfs folder and secret in .env and u also need an infurain root dir i think
(u also need metamask for this , with sepolia eth)
```shell
cd pinata-updated ( care for spelling on ur onw)
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia

```
u should obtain a deployed contract`s address
(mine takes long i hope this doest mess up hehe
 u should get something like this
  -- IPFSHashStorage deployed to: [REDACTED]
## copy this address
(the one in redacted)
go to ipfs dir
```shell
cd my-ipfs(tab)

```
### open FileUploader.jsx
put new deployed contract address to line 7 = const contractAddress =  "blabla"
now, 
```shell
npm run dev

```
not npm start because vite?( idk bro )


![image](https://github.com/user-attachments/assets/eb8b1a25-08d5-4604-8744-65da9a5fae45)


# sucess baby
![image](https://github.com/user-attachments/assets/371df923-58f8-4743-bcd5-983f23fbead0)


if i missed anything , reach out to me at @anirudhk771k@gmail.com









