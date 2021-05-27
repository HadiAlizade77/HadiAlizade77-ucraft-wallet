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

##Tests

**Run tests**
```php artisan test```

**Rollback Database after testng**
```php artisan migrate:fresh --seed```

###Environment Configuration
Feel free to change the Environment configuration
in the .env file

