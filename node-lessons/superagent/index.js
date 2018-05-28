const superagent = require('superagent')

superagent
.get('http+unix://%2Fabsolute%2Fpath%2Fto%2Funix.sock/search')
.end((err,data)=>{
    console.log(err)
})