<?php

namespace App\Exceptions;

use Exception;

class InactiveAccountException extends Exception
{
    public function __construct(string $message = 'Account not active', int $code = 403)
    { parent::__construct($message, $code); }
}
