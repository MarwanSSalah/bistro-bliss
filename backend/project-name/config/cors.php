<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS Configuration
    |--------------------------------------------------------------------------
    |
    | This file controls Cross-Origin Resource Sharing (CORS) settings.
    | These settings determine which origins, headers, and methods
    | are allowed to interact with your API routes.
    |
    */

    'paths' => [
        'api/*', // Apply CORS only to API routes
        'sanctum/csrf-cookie',
    ],

    /*
    |--------------------------------------------------------------------------
    | Allowed Methods
    |--------------------------------------------------------------------------
    |
    | Define which HTTP methods are allowed for cross-origin requests.
    | Use ['*'] to allow all.
    |
    */

    'allowed_methods' => ['*'],

    /*
    |--------------------------------------------------------------------------
    | Allowed Origins
    |--------------------------------------------------------------------------
    |
    | Add the URLs of your front-end applications here.
    | In development, Next.js usually runs on http://localhost:3000.
    | You can add production URLs when you deploy.
    |
    */

    'allowed_origins' => array_filter([
        'http://localhost:3000',
        env('FRONTEND_URL'),   // set this on Railway to your Vercel URL
    ]),

    /*
    |--------------------------------------------------------------------------
    | Allowed Origins Patterns
    |--------------------------------------------------------------------------
    |
    | Use this if you want to allow wildcard subdomains (e.g., *.example.com).
    | Leave it empty if not needed.
    |
    */

    'allowed_origins_patterns' => [],

    /*
    |--------------------------------------------------------------------------
    | Allowed Headers
    |--------------------------------------------------------------------------
    |
    | Specify which headers your API will accept.
    | Use ['*'] to allow all headers.
    |
    */

    'allowed_headers' => ['*'],

    /*
    |--------------------------------------------------------------------------
    | Exposed Headers
    |--------------------------------------------------------------------------
    |
    | These are the response headers that will be visible to the browser.
    | You can leave this empty unless your frontend needs to read
    | specific headers (like X-RateLimit-Limit).
    |
    */

    'exposed_headers' => [],

    /*
    |--------------------------------------------------------------------------
    | Max Age
    |--------------------------------------------------------------------------
    |
    | Indicates how long (in seconds) the results of a preflight request
    | can be cached by the browser. 3600 = 1 hour.
    |
    */

    'max_age' => 3600,

    /*
    |--------------------------------------------------------------------------
    | Supports Credentials
    |--------------------------------------------------------------------------
    |
    | Set to true if your frontend sends cookies or authorization headers.
    | For example, when using Sanctum or JWT for authentication.
    |
    */

    'supports_credentials' => true,

];
