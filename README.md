
Please run these commands in order to run the application  
### App  
**Generate application key**  
```php artisan key:generate```  
  
**Install packages**  
```composer install```  
  
**Setup Database**  
```php artisan migrate```  
  
**Seed database**  
```php artisan db:seed```  
### Client  
**Setup packages**  
```npm install```  
  
**Setup Database**  
```npm run prod```  
  
### Tests  
  
**Run tests**  
```php artisan test```  
  
**Rollback Database after testng**  
```php artisan migrate:fresh --seed```  
    
### Serving Hosting the project using nginx  
To run the application you need to simply run ``` php aritisan serve ``` or follow the below description to host the project using Nginx  
  
  
add it to your /etc/hosts  
  
`127.0.0.1       wallet-test.loc`   
`127.0.0.1       www.wallet-test.loc`  
  
  
nginx deploy  
add a file named "wallet-test" in /etc/nginx/sites-available folder  
  
```  
server {  
    listen 80;  
    listen [::]:80;  
     
    server_name  www.wallet-test.loc;  
  
    root /var/www/wallet-test/public;  
    index  index.php index.html index.htm;  
  
    location / {  
        try_files $uri $uri/ /index.php?$query_string;          
    }  
  
    location ~ \.php$ {  
         try_files $uri =404;  
         fastcgi_split_path_info  ^(.+\.php)(/.+)$;  
         fastcgi_index            index.php;  
         fastcgi_pass             unix:/var/run/php/php7.4-fpm.sock;  
         include                  fastcgi_params;  
         fastcgi_param   PATH_INFO       $fastcgi_path_info;  
         fastcgi_param   SCRIPT_FILENAME $document_root$fastcgi_script_name;  
    }  
}  
```  
  
then create a symbolic link for the config file  
  
```  
ln -s /etc/nginx/sites-available/wallet-test /etc/nginx/sites-enabled/wallet-test  
```
### ENV:
### Email Configuration  
  please register at mailtrap.io and modify these keys within your's in .env file :
```MAIL_USERNAME```
```MAIL_PASSWORD```
You can receive emails in mailtrap dashboard.
### Google Configuration  
  youc can modify these keys within your's in .env file for Integrating Google Sign-In into web app :
```GOOGLE_CLIENT_SECRET```
```GOOGLE_CLIENT_ID```


