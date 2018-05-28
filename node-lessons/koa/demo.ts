import * as Koa from 'koa'
import * as fs from 'fs'
const app = new Koa()

//HTTP Response 的类型
const ExamplesResponseType = ctx => {
    if (ctx.request.accepts('xml')) {
        ctx.response.type = 'xml';
        ctx.response.body = '<data>Hello world</data>';
    }
    else if (ctx.request.accepts('json')) {
        ctx.response.type = 'json';
        ctx.response.body = { data: 'hello world' };
    }
    else if (ctx.request.accepts('html')) {
        ctx.response.type = 'html';
        ctx.response.body = '<p>Hello World</p>'
    }
    else {
        ctx.response.type = 'text';
        ctx.response.body = 'hello world';
    }
}
//实际开发中，返回给用户的网页往往都写成模板文件。我们可以让 Koa 先读取模板文件，然后将这个模板返回给用户
const ExamplesPSD = ctx =>{
    let x = fs.createReadStream('../../..//views/express.html');
    ctx.response.type = 'html';
    ctx.response.body = x;
}

const ExamplesPath = ctx=>{
   console.log( ctx.request.path)
   ctx.response.body = ctx.response
}
app.use(ExamplesPath)
app.listen(3000)
/**
 * hello
 */
function test(){
    
}