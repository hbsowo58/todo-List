### rest api를 이용해서 서버와 통신하였으므로 상태가 유지된다 (새로고침해도 서버에 있는 data를 가져온다)

![v4 image](https://user-images.githubusercontent.com/48181483/84342870-9ee4af80-abe1-11ea-83e7-fa29a3815619.png)
서버와 통신하여야되기 때문에 링크 존재 x 이미지

```
$ cd ~/Desktop
$ git clone https://github.com/ungmo2/simple-rest-api-server.git
$ cd simple-rest-api-server
$ npm install
# nodemon을 미설치한 경우
$ npm install -g nodemon
$ npm start
```

[demo](https://simple-rest-api-server.ungmo2.now.sh)
