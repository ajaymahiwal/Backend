

## Faker Package
   npm i @faker-js/faker
   Link Of [Faker Package](https://www.npmjs.com/package/@faker-js/faker)
   <br>

## MySQL2 Package
   npm i mysql2
   Link Of [MySQL2 Package](https://www.npmjs.com/package/mysql2) 
   <br>

**Other Things:**
We are using that try & catch for connection.query because if some error come because of database we don't want our all main.js code stop executing SO that why we use that.


## How to use MySQL Command Line Client

Link Of WebPage [See Here](https://blog.devart.com/mysql-command-line-client.html)
  <br>
You can also access MySQL Command Line Client from Command Prompt. For this:

1. Open Command Prompt.
2. Navigate to the bin folder. For example: `cd C:\Program Files\MySQL\MySQL Server 8.0\bin`
3. Run the `mysql -u root -p` command
4. Enter the password.


When i was opening MySQL in VS Code Power Shell Then Facing Some Errors
So Write These Commands:
1. `cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"`
2. `.\mysql -u root -p`


For Quitting MySQL Just write `quit` .


**To source a SQL file in MySQL using the command line, you can:**
1. Enter Those 2 commands to enter in MySQL world.
2. Enter password.
3. Type `mysql > use your_database;`.
4. Type `mysql > source file_path_with_file_name.sql`.

Example:
`mysql> use delta_app;`
`mysql> source E:\1LEARN HERE\#1 Course Videos\DELTA\Code\Backend\1.6_Database\schema.sql`

