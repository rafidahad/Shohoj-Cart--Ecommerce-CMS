<?php

namespace App\Exceptions;

use Exception;

class WrongShopException extends Exception
{
    public function __construct(string $message = 'Forbidden: wrong shop', int $code = 403)
    { parent::__construct($message, $code); }
}
