module.exports = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>To Do List</title>
</head>
<body>
    <h1>To-Do List</h1>
    <form method='post' action='/'>
        <ul>
            <% items.map(function(item){ %>
                <li><%= item %></li>
            <% })%>
        </ul>
        <p><input type='text' name='item'></input></p>
        <p><input type="submit" value="Add item"></input></p>
    </form>
</body>
</html>`