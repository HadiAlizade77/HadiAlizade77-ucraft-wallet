<?php


namespace Tests;


trait Helpers
{
    /**
     * get request header for authorized and unauthorized users
     * @param null $token
     * @return string[]
     */
    public function getRequestHeader($token = null): array
    {
        return [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $token
        ];
    }
}
